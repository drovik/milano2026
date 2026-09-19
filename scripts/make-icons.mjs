// Generates the PWA icons (public/icons/icon-192.png, icon-512.png) without
// any native image tooling: pixels are rendered in JS and encoded as PNG with
// zlib. Rerun with `npm run icons` if the artwork changes; the PNGs are
// committed so builds never depend on this script. Same approach as
// My Piemonte's icon script — artwork swapped for the Duomo in gold on navy.
import { deflateSync } from 'node:zlib'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

// ---- PNG encoding --------------------------------------------------------
const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()
function crc32(buf) {
  let c = 0xffffffff
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}
function encodePng(size, rgba) {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // colour type: RGBA
  const raw = Buffer.alloc(size * (size * 4 + 1))
  for (let y = 0; y < size; y++) {
    const row = y * (size * 4 + 1)
    raw[row] = 0
    rgba.copy(raw, row + 1, y * size * 4, (y + 1) * size * 4)
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

// ---- Artwork: gold Duomo silhouette on a midnight-navy rounded square ----
// All geometry in normalised [0,1] coords; 3×3 supersampling for smooth
// edges. u is horizontal, v vertical (0 = top).
function inTriangle(u, v, cx, tipV, baseV, halfW) {
  if (v < tipV || v > baseV) return false
  const w = (halfW * (v - tipV)) / (baseV - tipV)
  return Math.abs(u - cx) <= w
}
function shade(u, v) {
  // Rounded-square mask.
  const r = 0.16
  const cx = Math.max(r - u, u - (1 - r), 0)
  const cy = Math.max(r - v, v - (1 - r), 0)
  if (cx * cx + cy * cy > r * r) return null

  // Background: vertical navy gradient with a soft gold moon-glow up top.
  let R = 0x1d + (0x0d - 0x1d) * v
  let G = 0x2b + (0x15 - 0x2b) * v
  let B = 0x4a + (0x26 - 0x4a) * v
  const glow = Math.max(0, 1 - Math.hypot(u - 0.5, v - 0.14) * 1.7)
  R += 60 * glow * glow
  G += 44 * glow * glow
  B += 16 * glow * glow

  // Duomo silhouette: five spires, a stepped facade, and the Madonnina star.
  const spires =
    inTriangle(u, v, 0.5, 0.24, 0.56, 0.034) ||
    inTriangle(u, v, 0.39, 0.34, 0.58, 0.03) ||
    inTriangle(u, v, 0.61, 0.34, 0.58, 0.03) ||
    inTriangle(u, v, 0.28, 0.42, 0.6, 0.028) ||
    inTriangle(u, v, 0.72, 0.42, 0.6, 0.028)
  const facade =
    (v >= 0.62 && v <= 0.74 && u >= 0.2 && u <= 0.8) ||
    (v >= 0.58 && v < 0.62 && u >= 0.34 && u <= 0.66) ||
    (v >= 0.54 && v < 0.58 && u >= 0.44 && u <= 0.56)
  // Portal arch cut out of the facade.
  const portal = v >= 0.66 && v <= 0.74 && Math.abs(u - 0.5) <= 0.04 && (v >= 0.7 || Math.hypot((u - 0.5) / 0.04, (v - 0.7) / 0.04) <= 1)
  // Madonnina: 4-point star above the main spire.
  const sd = Math.abs(u - 0.5) + Math.abs(v - 0.2)
  const star = sd <= 0.045 && Math.abs(u - 0.5) * Math.abs(v - 0.2) <= 0.00045

  if ((spires || facade || star) && !portal) {
    // Gold with a soft vertical sheen.
    const t = Math.min(1, Math.max(0, (v - 0.13) / 0.61))
    R = 0xf2 + (0xd9 - 0xf2) * t
    G = 0xc2 + (0x9a - 0xc2) * t
    B = 0x6a + (0x2f - 0x6a) * t
  }
  return [R, G, B]
}

function render(size) {
  const rgba = Buffer.alloc(size * size * 4)
  const SS = 3
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let rr = 0, gg = 0, bb = 0, aa = 0
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const u = (x + (sx + 0.5) / SS) / size
          const v = (y + (sy + 0.5) / SS) / size
          const px = shade(u, v)
          if (px) {
            rr += px[0]
            gg += px[1]
            bb += px[2]
            aa += 255
          }
        }
      }
      const n = SS * SS
      const o = (y * size + x) * 4
      rgba[o] = Math.round(rr / n)
      rgba[o + 1] = Math.round(gg / n)
      rgba[o + 2] = Math.round(bb / n)
      rgba[o + 3] = Math.round(aa / n)
    }
  }
  return rgba
}

const outDir = join(root, 'public', 'icons')
mkdirSync(outDir, { recursive: true })
for (const size of [192, 512]) {
  writeFileSync(join(outDir, `icon-${size}.png`), encodePng(size, render(size)))
  console.log(`icon-${size}.png`)
}
