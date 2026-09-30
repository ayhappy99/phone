const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'src/app/page.tsx'), 'utf8') + '\nexport { phoneData, fullSpecCatalog, sources, detailRows, detailSourceIds, modelInfo };';
const compiled = ts.transpileModule(source, { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const result = { exports: {} };
vm.runInNewContext(compiled, { module: result, exports: result.exports, require }, { timeout: 5000 });
const { phoneData, fullSpecCatalog, sources, detailRows, detailSourceIds, modelInfo } = result.exports;
assert.equal(phoneData.length, 14);
assert.equal(new Set(phoneData.map(p => p.id)).size, 14);
assert.equal(phoneData.filter(p => p.brand === 'Samsung').length, 7);
assert.equal(phoneData.filter(p => p.brand === 'Apple').length, 7);
assert.equal(detailSourceIds.length, 14);
for (const row of detailRows) {
  assert.equal(row.values.length, 14);
  assert.ok(row.values.every(value => typeof value === 'string' && value.trim()));
}
for (const phone of phoneData) {
  const data = fullSpecCatalog[phone.id];
  assert.ok(data && sources[data.source]);
  if (phoneData.indexOf(phone) < 4) assert.equal(data.sections.length, phone.brand === 'Apple' ? 37 : 17);
  else assert.ok(data.sections.length >= 12);
  assert.ok(modelInfo[phone.id]);
  assert.ok(sources[phone.price_source]);
  assert.equal(new Set(data.sections.map(s => s.title)).size, data.sections.length);
  assert.ok(data.conditions.length >= 5);
  for (const section of data.sections) {
    assert.ok(section.title && section.items.length);
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
assert.equal(phoneData.filter(p => p.brand === 'Apple').flatMap(p => p.prices).filter(p => p.krw === null).length, 14);
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
console.log('PASS: 14 unique models, 7 per brand, full detail columns, source references, capacity-specific RAM, upcoming model label, explicit verification limits, 14 unverified historical prices, 3 resolved Duo announcement prices, complete S26 FE domestic spec table.');
