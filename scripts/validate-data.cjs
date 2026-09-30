const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'src/app/page.tsx'), 'utf8') + '\nexport { phoneData, fullSpecCatalog, sources };';
const compiled = ts.transpileModule(source, { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const result = { exports: {} };
vm.runInNewContext(compiled, { module: result, exports: result.exports, require }, { timeout: 5000 });
const { phoneData, fullSpecCatalog, sources } = result.exports;
assert.equal(phoneData.length, 4);
assert.equal(new Set(phoneData.map(p => p.id)).size, 4);
for (const phone of phoneData) {
  const data = fullSpecCatalog[phone.id];
  assert.ok(data && sources[data.source]);
  assert.equal(data.sections.length, phone.brand === 'Apple' ? 37 : 17);
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
assert.equal(phoneData.filter(p => p.brand === 'Apple').flatMap(p => p.prices).filter(p => p.krw === null).length, 5);
console.log('PASS: 4 model identities, section counts, nonempty facts, footnote/source references, capacity-specific RAM, 5 explicitly unverified launch prices.');
