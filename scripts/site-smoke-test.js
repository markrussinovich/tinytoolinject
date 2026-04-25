import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../public/index.html', import.meta.url), 'utf8');
const app = await readFile(new URL('../public/app.js', import.meta.url), 'utf8');

assert.match(html, /TinyToolInject/);
assert.match(html, /vulnerable-summary/);
assert.match(app, /Geoffrey/);
assert.match(app, /parseVulnerableResponse/);
assert.match(app, /parseHardenedResponse/);

console.log('Site smoke test passed');