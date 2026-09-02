/**
 * Build script: optimizes the SURAGVERSE brand photographs.
 *
 * Reads source photos from `Photos-1-001/` and writes optimized WebP files
 * into `public/images/brand/` with deterministic dimensions, so components can
 * pass explicit width/height to next/image and avoid layout shift.
 *
 * Usage: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { mkdir, writeFile, readdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "Photos-1-001");
const OUT_DIR = path.join(ROOT, "public", "images", "brand");

/**
 * Each entry: [outName, sourceFile, maxWidth]
 * maxWidth=null keeps the source's width (only re-encodes to WebP).
 */
const IMAGES = [
  // ——— Featured / critical ———
  ["hero", "IMG_20250929_192438_910.webp", 1200],
  ["poster", "IMG_20260422_180205.png", 1600],
  ["avatar", "IMG_20251224_105206.jpg", 800],
  ["creative", "IMG_20251224_125003_658.jpg", 1400],
  ["about-bw", "IMG_20260118_220620.jpg", 1400],
  ["about-ai", "file_000000003b248207acd41d90ae27a043.png", 1000],
  ["cta", "file_000000007cd48211a5e3dcf29254392c.png", 1100],
  ["professional", "1761022349140.jpg", 800],
  ["passport", "Pi7_Passport_Photo (2).jpeg", 500],
  // ——— Workspace story chapters ———
  ["ws-01", "IMG_20260117_120106147_HDR_PORTRAIT.jpg", 1600],
  ["ws-02", "IMG_20260117_120200851_HDR_PORTRAIT.jpg", 1600],
  ["ws-03", "IMG_20260117_123839449_HDR_AE.jpg", 1600],
  ["ws-04", "IMG_20260117_120919107_HDR.jpg", 1600],
  // ——— Gallery (large + thumb) ———
  ["g01", "IMG_20260117_120111318_HDR_PORTRAIT.jpg", 1400],
  ["g02", "IMG_20260117_120121566_HDR_PORTRAIT.jpg", 1400],
  ["g03", "IMG_20260117_120130157_HDR_PORTRAIT.jpg", 1400],
  ["g04", "IMG_20260117_120132407_HDR_PORTRAIT.jpg", 1400],
  ["g05", "IMG_20260117_120145958_HDR_PORTRAIT.jpg", 1400],
  ["g06", "IMG_20260117_120931457_HDR_AE.jpg", 1400],
  ["g07", "IMG_20260117_121216365_AE.jpg", 1400],
  ["g08", "IMG_20260117_123832628_HDR_AE.jpg", 1400],
  ["g09", "IMG_20260117_123855242_HDR.jpg", 1400],
  ["g10", "IMG_20260117_124026483_HDR.jpg", 1400],
  ["g11", "IMG_20260117_124029258_HDR.jpg", 1400],
  ["g12", "IMG_20250719_182427_593.webp", 1200],
  ["g13", "IMG_20250917_182135_503.webp", 1100],
  ["g14", "IMG_20251022_085824_545.webp", 1100],
  ["g15", "IMG_20260504_114128_579.webp", 1100],
];

const THUMB_WIDTH = 700; // gallery thumbnails

await mkdir(OUT_DIR, { recursive: true });

const dims = {};

async function encode(outName, srcFile, maxWidth, suffix) {
  const src = path.join(SRC_DIR, srcFile);
  let pipeline = sharp(src).rotate();
  if (maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }
  const meta = await pipeline
    .webp({ quality: suffix === "-thumb" ? 70 : 82, effort: 4 })
    .toFile(path.join(OUT_DIR, `${outName}${suffix}.webp`));
  return meta;
}

for (const [outName, srcFile, maxWidth] of IMAGES) {
  const main = await encode(outName, srcFile, maxWidth, "");
  dims[outName] = { w: main.width, h: main.height };
  // Thumbs for gallery images only (and the poster for quick reveal)
  if (outName.startsWith("g") || outName === "poster") {
    const thumb = await encode(outName, srcFile, THUMB_WIDTH, "-thumb");
    dims[`${outName}-thumb`] = { w: thumb.width, h: thumb.height };
  }
  console.log(
    `${outName}.webp  ${main.width}x${main.height}  ${(main.size / 1024).toFixed(0)}kb`
  );
}

await writeFile(
  path.join(ROOT, "scripts", "brand-dims.json"),
  JSON.stringify(dims, null, 2)
);
console.log("\nWrote scripts/brand-dims.json");
