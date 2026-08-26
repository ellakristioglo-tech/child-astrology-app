import fs from 'node:fs';
import path from 'node:path';

const source = process.argv[2];
const destination = process.argv[3] || 'assets/cities-15000.min.json';
if (!source) throw new Error('Usage: node scripts/generate-cities.mjs /path/to/cities15000.tsv [destination]');

const records = fs.readFileSync(source, 'utf8').trim().split('\n').map((line) => {
  const columns = line.split('\t');
  const aliases = (columns[3] || '').split(',')
    .filter((name) => name && name !== columns[1] && name !== columns[2])
    .filter((name) => /[\u0400-\u052f]/.test(name) || /^[\x00-\x7f]+$/.test(name))
    .slice(0, 12);
  return [Number(columns[0]), columns[1], columns[2], aliases, columns[8], Number(columns[4]), Number(columns[5]), columns[17], Number(columns[14])];
});

fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, JSON.stringify(records));
console.log(`Wrote ${records.length} cities to ${destination}`);
