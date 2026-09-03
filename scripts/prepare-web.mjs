import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'dist');
const skip = new Set(['.git', '.github', 'dist', 'node_modules', 'ios', 'scripts']);
const skipFiles = new Set(['package.json', 'package-lock.json', 'capacitor.config.json']);

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

function copyDir(src, dst) {
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (skip.has(entry.name) || skipFiles.has(entry.name)) continue;
    const from = path.join(src, entry.name);
    const to = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(to, { recursive: true });
      copyDir(from, to);
    } else if (entry.isFile()) {
      fs.copyFileSync(from, to);
    }
  }
}

copyDir(root, out);
console.log('Prepared bundled web assets in dist/');
