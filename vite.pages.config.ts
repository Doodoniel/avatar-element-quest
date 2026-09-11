import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import {fileURLToPath} from 'node:url';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';

const project = fileURLToPath(new URL('.', import.meta.url));
const base = process.env.PAGES_BASE_PATH || '/avatar-element-quest/';
if (!/^\/(?:[A-Za-z0-9._-]+\/)*$/.test(base)) throw new Error('PAGES_BASE_PATH must start and end with /');
const routes = ['heroes','world','words','watch','challenge','quiz','teacher','rescue','expedition'];

export default defineConfig({
  root: resolve(project, 'pages'),
  base,
  publicDir: resolve(project, 'public'),
  resolve: {alias: {'@': project}},
  define: {__PAGES_BASE__: JSON.stringify(base)},
  css: {postcss: {plugins: [tailwindcss()]}},
  plugins: [{
    name: 'pages-local-paths',
    enforce: 'pre',
    transform(source, id) {
      const path = id.replaceAll('\\', '/');
      if (!/\/(components|data|app)\//.test(path) || !/\.(tsx?|css)$/.test(path)) return;
      // Rebase existing root-relative assets and native links only for this build.
      // This also handles '/'+id and template-literal asset URLs.
      return source.replace(/(["'`])\/(?=assets\/|heroes\b|world\b|words\b|watch\b|challenge\b|quiz\b|teacher\b|rescue\b|expedition\b|["'`])/g, '$1'+base)
        .replace(/url\(\/assets\//g, 'url('+base+'assets/');
    },
    closeBundle() {
      const output = resolve(project, 'dist-pages');
      const html = readFileSync(resolve(output, 'index.html'), 'utf8');
      for (const route of routes) {
        mkdirSync(resolve(output, route), {recursive: true});
        writeFileSync(resolve(output, route, 'index.html'), html);
      }
      writeFileSync(resolve(output, '.nojekyll'), '');
    }
  }, react()],
  build: {outDir: resolve(project, 'dist-pages'), emptyOutDir: true},
});
