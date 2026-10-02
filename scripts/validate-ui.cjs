const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://example.com/phone/' });
for (const key of ['window', 'document', 'HTMLElement', 'Node', 'MutationObserver']) global[key] = dom.window[key];
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, configurable: true });
const React = require('react');
const { render, fireEvent, cleanup } = require('@testing-library/react');
const source = fs.readFileSync('src/app/page.tsx', 'utf8') + '\nexport { phoneData };';
const compiled = ts.transpileModule(source, { compilerOptions: { esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const result = { exports: {} };
vm.runInNewContext(compiled, { module: result, exports: result.exports, require: name => name === "./galaxy-domestic.json" ? require("../src/app/galaxy-domestic.json") : require(name), window, document, navigator, URLSearchParams, URL, setTimeout }, { timeout: 5000 });
const { default: Page, phoneData } = result.exports;
const ui = render(React.createElement(Page));
const select = (slot, id) => fireEvent.change(document.querySelector('#selected-' + slot), { target: { value: id } });
let pairs = 0;
const legacy = phoneData.slice(0, 14);
const pairCases = legacy.flatMap(a => legacy.filter(b => b.id !== a.id).map(b => [a, b]));
for (const phone of phoneData.slice(14)) pairCases.push([phone, legacy[0]], [legacy[3], phone]);
for (const [a, b] of pairCases) {
  if (a.id === b.id) continue;
  select(0, a.id); select(1, b.id);
  assert.equal(document.querySelectorAll('#comparison article').length, 10);
  const prices = document.querySelector('#prices dl');
  assert.equal(prices.querySelectorAll('dd').length, prices.querySelectorAll('dt').length * 2);
  for (const version of ['짧게 안내', '풀어서 안내']) {
    fireEvent.click(ui.getByRole('button', { name: version, exact: true }));
    const articles = [...document.querySelectorAll('#comparison article')];
    for (let slot = 0; slot < 2; slot++) {
      const phone = slot ? b : a;
      Object.values(phone.specs).forEach((spec, i) => assert.ok(articles[i * 2 + slot].textContent.includes(version === '짧게 안내' ? spec.sales_pitch : spec.sales_pitch_detail)));
    }
  }
  pairs++;
}
fireEvent.change(ui.getByLabelText('제조사'), { target: { value: 'Samsung' } });
fireEvent.click(ui.getByRole('button', { name: 'Pro', exact: true }));
assert.equal(ui.getByLabelText('제조사').value, 'Apple');
fireEvent.change(ui.getByLabelText('제조사'), { target: { value: 'Samsung' } });
assert.equal(ui.getByRole('button', { name: '모든 시리즈' }).getAttribute('aria-pressed'), 'true');
fireEvent.change(ui.getByLabelText('기종 이름 검색'), { target: { value: '찾을수없는모델' } });
assert.ok(ui.getByText(/맞는 기종을 찾지 못했어요/));
fireEvent.click(ui.getByRole('button', { name: '검색 조건 지우기' }));
assert.equal(ui.getByLabelText('기종 이름 검색').value, '');
assert.equal(ui.getByLabelText('제조사').value, 'all');
for (const [family, query, id] of [['S 시리즈', 'S21+', 'galaxy-s21-plus'], ['퀀텀', 'SM-A576S', 'galaxy-quantum7'], ['점프', '점프5', 'galaxy-jump5'], ['와이드', '와이드9', 'galaxy-wide9'], ['버디', '버디5', 'galaxy-buddy5'], ['M 시리즈', 'M12', 'galaxy-m12'], ['XCover', 'XCover 5', 'galaxy-xcover-5']]) {
 fireEvent.click(ui.getByRole('button', { name: family, exact: true }));
 fireEvent.change(ui.getByLabelText('기종 이름 검색'), { target: { value: query } });
 assert.equal(ui.getByLabelText('제조사').value, 'Samsung');
 assert.ok(document.querySelector('button[data-model-id="' + id + '"]') || ui.getAllByText(phoneData.find(p => p.id === id).model_name, { exact: true }).length);
 fireEvent.click(ui.getByRole('button', { name: '검색 조건 지우기' }));
}
fireEvent.click(ui.getByRole('button', { name: '비교 주소 복사' }));
select(0, 'galaxy-s26-ultra'); select(1, 'iphone-18-pro');
fireEvent(window, new window.PopStateEvent('popstate'));
assert.equal(document.querySelector('#selected-0').value, 'galaxy-s26-ultra');
assert.equal(document.querySelector('#selected-1').value, 'iphone-18-pro');
fireEvent.change(ui.getByLabelText('세부 항목 검색'), { target: { value: 'Bluetooth' } });
fireEvent.click(ui.getByRole('button', { name: '다른 값만 보기' }));
assert.equal(document.querySelectorAll('.detail-table tbody tr').length, 0);
cleanup();
console.log(`PASS: ${pairs} ordered model pairs, both friendly pitches, aligned storage prices, filter reset and compatibility, equivalent Bluetooth values.`);
