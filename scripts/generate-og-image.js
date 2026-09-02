/* Generates a minimal valid 1200x630 OG image (dark bg with accent bar) using only Node's zlib.
   Run: node scripts/generate-og-image.js */
const fs = require("fs");
const zlib = require("zlib");
const path = require("path");

const W = 1200, H = 630;

// Build raw RGBA pixels
const rows = Buffer.alloc(H * (W * 4 + 1));
for (let y = 0; y < H; y++) {
  rows[y * (W * 4 + 1)] = 0; // filter type 0
  for (let x = 0; x < W; x++) {
    const idx = y * (W * 4 + 1) + 1 + x * 4;
    // vertical gradient from #0B0B0F to #050505
    const t = y / H;
    const r = Math.round(11 + (5 - 11) * t);
    const g = Math.round(11 + (5 - 11) * t);
    const b = Math.round(15 + (5 - 15) * t);
    // Accent glow band in the middle zone following a soft arc
    const dx = Math.abs(x - W * 0.5);
    const glow = Math.max(0, 1 - dx / (W * 0.18));
    const bandY = Math.round(H * (0.5 + 0.08 * Math.sin(x / 300)));
    const nearBand = Math.max(
      0,
      1 - Math.abs(y - bandY) / (H * 0.02 + glow * H * 0.04)
    );
    const accent = glow * nearBand * 255;
    rows[idx] = Math.min(255, r + accent * 0.25);
    rows[idx + 1] = Math.min(255, g + accent * 0.6);
    rows[idx + 2] = Math.min(255, b + accent);
    rows[idx + 3] = 255;
  }
}

// Chunk helpers
function crc32(buf) {
  let c;
  const table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 6; // color type RGBA
// compression, filter, interlace = 0

const idat = zlib.deflateSync(rows);
const png = Buffer.concat([
  sig,
  chunk("IHDR", ihdr),
  chunk("IDAT", idat),
  chunk("IEND", Buffer.alloc(0)),
]);

fs.mkdirSync(path.join(__dirname, "..", "public"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "..", "public", "og-image.png"), png);
console.log("og-image.png written:", png.length, "bytes");