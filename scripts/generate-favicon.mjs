import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const sourcePath = join(__dirname, '..', 'logo.jpeg');
const publicDir = join(__dirname, '..', 'public');

const targets = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
];

async function generate() {
  const source = await readFile(sourcePath);

  for (const { name, size } of targets) {
    await sharp(source)
      .resize(size, size, { fit: 'cover' })
      .png({ compressionLevel: 9, palette: size <= 32 })
      .toFile(join(publicDir, name));
    console.log(`✓ ${name} (${size}x${size})`);
  }

  // Generar favicon.ico a partir del PNG de 32x32
  // (muchos browsers aceptan un PNG con extensión .ico, y es más liviano que un ICO multi-imagen)
  const png32 = await sharp(source)
    .resize(32, 32, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await sharp(png32).toFile(join(publicDir, 'favicon.ico'));
  console.log('✓ favicon.ico (32x32)');
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
