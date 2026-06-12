import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { mockAisles, mockProductsByAisle } from '../src/data.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data: Record<string, any[]> = {};

// Sort aisles by number
const sortedAisles = [...mockAisles].sort((a, b) => a.number - b.number);

for (const aisle of sortedAisles) {
  const key = `PASILLO N° ${aisle.number}`;
  const products = mockProductsByAisle[aisle.number] || [];
  data[key] = products.map(p => ({
    producto: p.name,
    und_x_caja: 0
  }));
}

const outputPath = path.join(__dirname, '../public/datos act.json');
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
console.log('JSON file successfully generated at:', outputPath);
