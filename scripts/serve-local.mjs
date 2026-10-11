import { createServer } from 'node:http';
import { readFileSync, realpathSync, statSync } from 'node:fs';
import { dirname, extname, isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2',
  '.pdf': 'application/pdf', '.pdb': 'chemical/x-pdb', '.svg': 'image/svg+xml'
};
const isInside = (root, target) => {
  const path = relative(root, target);
  return path === '' || (!isAbsolute(path) && path !== '..' && !path.startsWith('../') && !path.startsWith('..\\'));
};
export function resolveAsset(root, requestPath) {
  const path = decodeURIComponent(requestPath.split('?')[0]);
  if (!path.startsWith('/') || /[\\\0]/.test(path) || path.split('/').includes('..')) return null;
  const realRoot = realpathSync(root);
  let target = resolve(realRoot, '.' + path);
  if (!isInside(realRoot, target)) return null;
  target = realpathSync(target);
  if (!isInside(realRoot, target)) return null;
  if (statSync(target).isDirectory()) target = realpathSync(resolve(target, 'index.html'));
  return isInside(realRoot, target) && statSync(target).isFile() ? target : null;
}
export function createPreviewServer() {
  const headers = JSON.parse(readFileSync(resolve(repo, 'vercel.json'), 'utf8')).headers[0].headers;
  return createServer((req, res) => {
    try {
      const target = resolveAsset(resolve(repo, 'dist'), req.url || '/');
      if (!target) { res.writeHead(404); return res.end('Not found'); }
      for (const { key, value } of headers) {
        res.setHeader(key, key === 'Content-Security-Policy' ? value.replace('; upgrade-insecure-requests', '') : value);
      }
      res.setHeader('Content-Type', types[extname(target)] || 'application/octet-stream');
      res.end(readFileSync(target));
    } catch (error) {
      res.writeHead(error instanceof URIError ? 400 : 404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(error instanceof URIError ? 'Bad request' : 'Not found');
    }
  });
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  createPreviewServer().listen(4321, '127.0.0.1', () => console.log('Local preview: http://127.0.0.1:4321/'));
}
