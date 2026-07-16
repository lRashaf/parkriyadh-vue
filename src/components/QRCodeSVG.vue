<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: String, required: true },
  size: { type: Number, default: 220 },
})

const M = 25
const cell = computed(() => props.size / M)

function finderCell(r, c, or_, oc) {
  const lr = r - or_
  const lc = c - oc
  if (lr < 0 || lr > 6 || lc < 0 || lc > 6) return null
  const outer = lr === 0 || lr === 6 || lc === 0 || lc === 6
  const inner = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4
  return outer || inner
}

const cells = computed(() => {
  const seed = props.value.split('').reduce((a, c, i) => (a * 31 + c.charCodeAt(0) * (i + 1)) | 0, 7)
  const out = []
  const cs = cell.value
  for (let r = 0; r < M; r++) {
    for (let c = 0; c < M; c++) {
      const tl = finderCell(r, c, 0, 0)
      const tr = finderCell(r, c, 0, M - 7)
      const bl = finderCell(r, c, M - 7, 0)
      const fp = tl ?? tr ?? bl
      const dark = fp !== null ? fp : ((r * 97 + c * 13 + seed + r * c) % 5) < 3
      if (dark) {
        out.push({ key: `${r}-${c}`, x: c * cs + 0.5, y: r * cs + 0.5, w: cs - 1, h: cs - 1, rx: cs * 0.18 })
      }
    }
  }
  return out
})
</script>

<template>
  <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
    <rect :width="size" :height="size" fill="white" rx="16" />
    <rect v-for="c in cells" :key="c.key" :x="c.x" :y="c.y" :width="c.w" :height="c.h" fill="#0C0B1A" :rx="c.rx" />
    <rect :x="size / 2 - 18" :y="size / 2 - 18" width="36" height="36" fill="white" rx="6" />
    <rect :x="size / 2 - 14" :y="size / 2 - 14" width="28" height="28" fill="#5B3DF5" rx="5" />
    <text :x="size / 2" :y="size / 2 + 6" text-anchor="middle" fill="white" font-size="14" font-weight="800" font-family="Manrope">P</text>
  </svg>
</template>
