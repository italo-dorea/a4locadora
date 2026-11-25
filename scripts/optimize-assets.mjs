// Gera versões otimizadas (webp) das imagens originais e os arquivos de ícone/OG.
// Uso: npm run assets   (originais ficam em assets-src/)
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const src = "assets-src";
const out = "public/assets";
mkdirSync(out, { recursive: true });

const jobs = [
  ["logo-a4.png", "logo-a4.webp", 640],
  ["hb20-2024.webp", "hb20-2024.webp", 900],
  ["onix-2024.jpg", "onix-2024.webp", 900],
  ["factor-2025.png", "factor-2025.webp", 900],
  ["crosser-2025.png", "crosser-2025.webp", 900],
];
for (const [from, to, width] of jobs) {
  const info = await sharp(`${src}/${from}`).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`${out}/${to}`);
  console.log(to, info.width + "x" + info.height, Math.round(info.size / 1024) + "KB");
}

// Favicon (App Router detecta src/app/icon.png)
await sharp(`${src}/logo-a4-icon.png`).resize(64, 64).png({ palette: true, quality: 80, compressionLevel: 9 }).toFile("src/app/icon.png");
await sharp(`${src}/logo-a4-icon.png`).resize(180, 180).png({ palette: true, quality: 80, compressionLevel: 9 }).toFile("src/app/apple-icon.png");

// Imagem de compartilhamento 1200x630: logo centralizada sobre fundo claro
const logo = await sharp(`${src}/logo-a4.png`).resize({ width: 760 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: "#f9f9fc" } })
  .composite([{ input: logo, gravity: "center" }])
  .png()
  .toFile("src/app/opengraph-image.png");
console.log("icon.png e opengraph-image.png gerados");
