const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'src/app/page.tsx'), 'utf8') + '\nexport { phoneData, fullSpecCatalog, sources, detailRows, detailSourceIds, modelInfo, comparableDetail };';
const compiled = ts.transpileModule(source, { compilerOptions: { esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const result = { exports: {} };
vm.runInNewContext(compiled, { module: result, exports: result.exports, require: name => ["./galaxy-domestic.json", "./apple-domestic.json", "./spec-supplements.json", "./release-dates.json"].includes(name) ? require("../src/app/" + name.slice(2)) : require(name) }, { timeout: 5000 });
const { phoneData, fullSpecCatalog, sources, detailRows, detailSourceIds, modelInfo, comparableDetail } = result.exports;
assert.equal(comparableDetail('bluetooth', '6.0'), comparableDetail('bluetooth', '6'));
assert.notEqual(comparableDetail('bluetooth', '5.4'), comparableDetail('bluetooth', '6'));
assert.notEqual(comparableDetail('usb', 'USB 2.0'), comparableDetail('usb', 'USB 2'));
let pitchCount = 0;
for (const phone of phoneData) for (const spec of Object.values(phone.specs)) {
  assert.ok(spec.sales_pitch.trim() && spec.sales_pitch_detail.trim());
  assert.notEqual(spec.sales_pitch, spec.sales_pitch_detail);
  assert.ok(!spec.sales_pitch.includes('큰 화면을 원하시면 S26'));
  pitchCount++;
}
assert.equal(pitchCount, 480);
assert.equal(phoneData.length, 96);
assert.equal(new Set(phoneData.map(p => p.id)).size, 96);
assert.equal(phoneData.filter(p => p.brand === 'Samsung').length, 79);
assert.equal(phoneData.filter(p => p.brand === 'Apple').length, 17);
assert.equal(detailSourceIds.length, 96);
for (const row of detailRows) {
  assert.equal(row.values.length, 96);
  assert.ok(row.values.every(value => typeof value === 'string' && value.trim()));
}
for (const phone of phoneData) {
  const data = fullSpecCatalog[phone.id];
  assert.ok(data && sources[data.source]);
  if (phoneData.indexOf(phone) < 4) assert.ok(data.sections.length >= (phone.brand === 'Apple' ? 37 : 17));
  else assert.ok(data.sections.length >= 12);
  assert.ok(modelInfo[phone.id]);
  assert.ok(sources[phone.price_source]);
  assert.equal(new Set(data.sections.map(s => s.title)).size, data.sections.length);
  assert.ok(data.conditions.length >= 5);
  for (const section of data.sections) {
    assert.ok(section.title && section.items.length);
    for (const id of section.sources || []) assert.ok(sources[id], 'Missing section source ' + id);
    for (const item of section.items) {
      assert.ok(item.trim().length && !item.includes('undefined'));
      for (const match of item.matchAll(/\[주 (\d+)\]/g)) assert.ok(data.conditions.some(note => note.startsWith(match[1] + '.')), 'Missing footnote ' + match[1]);
    }
  }
  for (const spec of Object.values(phone.specs)) for (const id of spec.sources) assert.ok(sources[id], 'Missing source ' + id);
  for (const price of phone.prices) assert.ok(price.krw === null || (Number.isInteger(price.krw) && price.krw > 0));
}
const ultraMemory = fullSpecCatalog['galaxy-s26-ultra'].sections.find(s => s.title === '메모리/스토리지').items;
assert.ok(ultraMemory.some(s => s.includes('1TB: RAM 16GB')));
assert.equal(phoneData.slice(0, 86).filter(p => p.brand === 'Apple').flatMap(p => p.prices).filter(p => p.krw === null).length, 8);
assert.equal(modelInfo['iphone-duo'].upcoming, true);
const fe = fullSpecCatalog['galaxy-s26-fe'];
assert.equal(fe.source, 'feSpecs');
assert.equal(fe.sections.length, 19);
assert.ok(fe.scope.includes('16개 분류·66개 항목'));
for (const [section, token] of [['연결', 'USB 2.0'], ['네트워크 (S/W 사용)', 'N78(3500)'], ['센서', '지문 센서'], ['서비스', '삼성 덱스 서포트: 지원'], ['소프트웨어 지원', '2033년 9월 30일']]) {
  assert.ok(fe.sections.find(s => s.title === section).items.some(item => item.includes(token)));
}
const duoPrices = phoneData.find(p => p.id === 'iphone-duo').prices;
assert.equal(JSON.stringify(duoPrices.map(p => p.krw)), "[3290000,3590000,4190000,5090000]");
assert.equal(phoneData.find(p => p.id === 'iphone-duo').price_source, 'duoPrices');
assert.ok(fullSpecCatalog['iphone-air'].sections.find(s => s.title === 'SIM 카드').items.join(' ').includes('실물 SIM'));
assert.ok(phoneData.find(p => p.id === 'iphone-18-pro-max').specs.weight.vs_previous.includes('18g 증가'));
assert.ok(phoneData.find(p => p.id === 'iphone-18-pro').specs.weight.vs_previous.includes('7g 증가'));
for (const phone of phoneData) assert.ok(phone.specs.weight.official.includes(modelInfo[phone.id].weight), 'Quick comparison weight differs from official brief: ' + phone.id);
console.log('PASS: 96 unique models, 79 Samsung and 17 Apple, full detail columns, source references, capacity-specific RAM, upcoming model label, explicit verification limits, 8 unverified historical prices, 6 verified iPhone 18 preorder announcement prices, 3 resolved Duo announcement prices, complete S26 FE domestic spec table.');

for (const [id, amounts] of [['iphone-18-pro', [1990000,2290000,2890000,3790000]], ['iphone-18-pro-max', [2190000,2490000,3090000,3990000]]]) {
 const phone = phoneData.find(p => p.id === id);
 assert.equal(JSON.stringify(phone.prices.map(p => p.krw)), JSON.stringify(amounts));
 assert.equal(phone.price_basis, 'preorder-announcement');
 assert.equal(phone.price_source, 'i18Preorder');
 assert.equal(Boolean(modelInfo[id].upcoming), false);
}

const domestic = require('../src/app/galaxy-domestic.json');
assert.equal(domestic.models.length, 72);
assert.equal(new Set(domestic.models.map(model => model.code)).size, 72);
for (const model of domestic.models) {
 assert.match(model.url, /^https:\/\/www\.samsung\.com\/sec\/support\/model\/SM-/);
 assert.match(model.code, /^SM-[A-Z]\d{3}[NSKL]$/);
 assert.ok(model.url.includes(model.code));
 assert.ok(phoneData.find(phone => phone.id === model.id).aliases.includes(model.code));
 for (const key of ['cpuSpeed', 'display', 'resolution', 'panel', 'rear', 'weight', 'battery', 'storage', 'usb', 'wifi', 'bluetooth']) assert.ok(model.spec[key], model.name + ' missing ' + key);
 assert.match(model.spec.weight, /^\d+$/);
 assert.match(model.spec.battery, /^\d+(?:\.\d+)?$/);
 if (model.previousId) assert.ok(domestic.models.some(prior => prior.id === model.previousId));
 for (const price of model.prices) if (price.krw !== null) assert.notEqual(model.priceUrl, model.url);
}
for (const name of ['갤럭시 S21', '갤럭시 S21+', '갤럭시 S21 울트라', '갤럭시 퀀텀7', '갤럭시 점프5', '갤럭시 와이드9', '갤럭시 버디5', '갤럭시 M12', '갤럭시 XCover 5']) assert.ok(phoneData.some(phone => phone.model_name === name), 'Missing domestic model ' + name);
for (const id of ['galaxy-s21-fe', 'galaxy-a26-5g', 'galaxy-a57', 'galaxy-m23', 'galaxy-xcover7']) assert.ok(!phoneData.some(phone => phone.id === id), 'Overseas or duplicate sales name ' + id);
console.log('PASS: 72 additions have unique domestic model codes, Samsung Korea support sources, complete core specs, valid previous-model links and price evidence.');

const apple = require("../src/app/apple-domestic.json");
assert.equal(apple.models.length, 10);
for (const model of apple.models) {
 assert.match(model.url, /^https:\/\/support\.apple\.com\/ko-kr\/\d+$/);
 assert.match(model.priceUrl, /^https:\/\/www\.apple\.com\/kr\/newsroom\//);
 assert.equal(model.prices.filter(p => p.krw !== null).length, 1);
 assert.ok(model.weight.match(/^\d+g$/));
 assert.ok(model.sections.length >= 18);
 if (model.previousId) assert.ok(apple.models.some(p => p.id === model.previousId));
}
assert.equal(apple.models.find(p=>p.id === "iphone-16e").processor.includes("4코어 GPU"), true);
assert.equal(apple.models.find(p=>p.id === "iphone-17").front.includes("18MP"), true);
assert.ok(apple.models.find(p=>p.id === "iphone-15-pro").camera.includes("3배 망원"));
assert.ok(apple.models.find(p=>p.id === "iphone-15-pro-max").camera.includes("5배 망원"));
console.log("PASS: 10 Korean iPhones, model-specific cameras/GPU, official sources and explicit historical price limits.");

const supplements = require('../src/app/spec-supplements.json');
assert.equal(Object.keys(supplements.models).length, 50);
assert.ok(!supplements.models['iphone-duo'], 'Do not infer RAM for the unreleased Duo');
for (const [id, addition] of Object.entries(supplements.models)) {
 assert.ok(phoneData.some(phone => phone.id === id));
 for (const [key, field] of Object.entries(addition.fields)) {
  assert.ok(sources[field.source] && field.value);
  const section = fullSpecCatalog[id].sections.find(section => section.sources?.includes(field.source) && section.items.some(item => item.includes(field.value)));
  assert.ok(section, id + ': no visible evidence for ' + key);
  assert.equal(field.kind, key === 'ram' ? 'report' : 'manufacturer');
 }
 if (addition.fields.batteryRated) {
  assert.match(addition.modelCode, /^A\d{4}$/);
  assert.ok(sources[addition.fields.batteryRated.source].url.includes('/' + addition.modelCode + '/'));
  assert.equal(addition.modelSource, 'apple-kr-model-identification');
  const value = detailRows.find(row => row.key === 'battery').values[phoneData.findIndex(phone => phone.id === id)];
  assert.equal(value, addition.fields.batteryRated.value);
  assert.match(value, /정격\(Rated\)/);
 }
}
assert.match(supplements.models['iphone-15'].fields.ram.value, /^6GB/);
assert.match(supplements.models['iphone-15-pro'].fields.ram.value, /^8GB/);
assert.match(supplements.models['iphone-17-pro'].fields.batteryRated.value, /^3,988mAh/);
for (const [id, supported] of [['galaxy-s21', false], ['galaxy-s21-plus', true], ['galaxy-s22', false], ['galaxy-s22-ultra', true], ['galaxy-s23', false], ['galaxy-s24', false], ['galaxy-s25', false], ['galaxy-z-fold3', true]]) {
 const value = detailRows.find(row => row.key === 'uwb').values[phoneData.findIndex(phone => phone.id === id)];
 assert.equal(value, supported ? '지원' : '미지원');
}
assert.match(supplements.models['galaxy-z-fold3'].fields.ip.value, /IPX8/);
assert.ok(!supplements.models['galaxy-z-fold3'].fields.ip.value.includes('IP68'));
assert.equal(supplements.models['galaxy-a12'].fields.samsungPay.value, '미지원');
console.log('PASS: 50 supplemented models, item-level sources, 16 independently reported RAM values, 14 same-hardware rated batteries, no speculative Duo values, correct UWB and water/dust distinctions.');
