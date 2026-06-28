import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outDir = join(__dirname, '..', 'public', 'og');
await mkdir(outDir, { recursive: true });

const targets = [
  { name: 'home', title: 'Raíz Interna', subtitle: 'memorias de criar y pensar en voz alta' },
  { name: 'autor', title: 'Sobre el autor', subtitle: 'René García' },
  { name: 'memorias', title: 'Memorias', subtitle: 'Raíz Interna' },
];

const WIDTH = 1200;
const HEIGHT = 630;
const BG = '#faf7f2';
const INK = '#1e1810';
const UMBER = '#5a4e3a';
const LINE = '#e4dace';

const svg = ({ title, subtitle }) => `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${BG}"/>
  <line x1="${WIDTH / 2 - 40}" y1="${HEIGHT / 2 - 80}" x2="${WIDTH / 2 + 40}" y2="${HEIGHT / 2 - 80}" stroke="${LINE}" stroke-width="1"/>
  <text
    x="50%"
    y="50%"
    text-anchor="middle"
    dominant-baseline="middle"
    font-family="Georgia, 'Playfair Display', serif"
    font-size="72"
    font-weight="400"
    fill="${INK}"
    letter-spacing="2"
  >${title}</text>
  <text
    x="50%"
    y="50%"
    dy="80"
    text-anchor="middle"
    dominant-baseline="middle"
    font-family="Georgia, 'Lora', serif"
    font-size="24"
    font-weight="400"
    fill="${UMBER}"
    font-style="italic"
  >${subtitle}</text>
  <text
    x="50%"
    y="${HEIGHT - 60}"
    text-anchor="middle"
    font-family="'Work Sans', Inter, sans-serif"
    font-size="14"
    fill="${UMBER}"
    letter-spacing="3"
  >PLACEHOLDER</text>
</svg>
`;

for (const t of targets) {
  const out = join(outDir, `${t.name}.png`);
  await sharp(Buffer.from(svg(t)))
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`wrote ${out}`);
}
