import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { createPreviewServer, resolveAsset } from './serve-local.mjs';

test('preview serves built pages and assets, while blocking traversal and malformed URLs', () => {
  const server = createPreviewServer();
  const handler = server.listeners('request')[0];
  const request = url => {
    const result = { status: 200, headers: {}, body: null };
    handler({ url }, {
      setHeader(key, value) { result.headers[key] = value; },
      writeHead(status) { result.status = status; },
      end(body) { result.body = body; }
    });
    return result;
  };
  for (const url of ['/', '/tr/', '/research/structure-based-drug-design/']) {
    const result = request(url);
    assert.equal(result.status, 200);
    assert.match(String(result.body), /<!DOCTYPE html>/i);
    assert.match(result.headers['Content-Type'], /text\/html/);
    assert.ok(!result.headers['Content-Security-Policy'].includes('upgrade-insecure-requests'));
  }
  assert.equal(request('/structures/cxcr4-fluoro-deoxy-amentoflavone.pdb').status, 200);
  for (const url of ['/../package.json', '/%2e%2e/package.json', '/%2e%2e%2fpackage.json', '/..%5cpackage.json', '//../package.json', '/C:/Windows/win.ini', '/%00', '/missing']) {
    const result = request(url);
    assert.equal(result.status, 404, url);
    assert.equal(String(result.body), 'Not found');
  }
  assert.equal(request('/%').status, 400);
  assert.equal(request('/').status, 200, 'malformed request must not stop the server');
});

test('preview rejects symlink and directory junction targets outside the published root', () => {
  const fixture = mkdtempSync(join(tmpdir(), 'portfolio-preview-'));
  const root = join(fixture, 'dist');
  const outside = join(fixture, 'private');
  mkdirSync(root); mkdirSync(outside);
  writeFileSync(join(root, 'index.html'), 'public');
  writeFileSync(join(outside, 'index.html'), 'private');
  symlinkSync(outside, join(root, 'escape'), process.platform === 'win32' ? 'junction' : 'dir');
  assert.equal(resolveAsset(root, '/'), resolve(root, 'index.html'));
  assert.equal(resolveAsset(root, '/escape/'), null);
  assert.equal(resolveAsset(root, '/escape/index.html'), null);
});
