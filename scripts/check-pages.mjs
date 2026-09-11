import assert from 'node:assert/strict';
import {existsSync, readFileSync, readdirSync} from 'node:fs';
import {resolve} from 'node:path';

const root = resolve('dist-pages');
const base = process.env.PAGES_BASE_PATH || '/avatar-element-quest/';
for (const route of ['', 'heroes','world','words','watch','challenge','quiz','teacher','rescue','expedition']) {
  const html = readFileSync(resolve(root, route, 'index.html'), 'utf8');
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    assert(match[1].startsWith(base), `Route ${route}: invalid URL ${match[1]}`);
    assert(existsSync(resolve(root, match[1].slice(base.length))), `Missing ${match[1]}`);
  }
}
const bundles = readdirSync(resolve(root,'assets')).filter(name=>/\.(css|js)$/.test(name));
for (const name of bundles) {
  const content = readFileSync(resolve(root,'assets',name), 'utf8');
  assert(!/["'`]\/assets\//.test(content), `Unprefixed asset in ${name}`);
  for (const match of content.matchAll(/\/assets\/([a-zA-Z0-9_./-]+\.(?:png|svg|jpg|webp))/g)) {
    assert(existsSync(resolve(root,'assets',match[1])), `Missing artwork ${match[1]}`);
  }
}
console.log('GitHub Pages: all 10 routes, bundles and literal artwork references passed.');
