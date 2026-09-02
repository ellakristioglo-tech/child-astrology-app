import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const out = path.join(here, 'www');

const excluded = new Set([
  '.git', '.github', 'mobile', 'tests', 'scripts', 'founder-pack', 'compliance',
  'node_modules', 'dist', 'www', 'README.md', 'SECURITY.md', 'LICENSE',
  'THIRD_PARTY_NOTICES.md', 'package.json', '.gitignore'
]);

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

for (const entry of await readdir(root)) {
  if (excluded.has(entry)) continue;
  const src = path.join(root, entry);
  const dst = path.join(out, entry);
  const info = await stat(src);
  if (info.isDirectory()) await cp(src, dst, { recursive: true });
  else await cp(src, dst);
}

console.log(`Prepared Child Astrology web assets in ${out}`);
