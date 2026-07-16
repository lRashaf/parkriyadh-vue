<script setup>
import { computed, ref } from 'vue'

const props = defineProps({ data: { type: Array, required: true } })

const W = 640, H = 180, PAD = 28
const hovered = ref(null)

const maxRev = computed(() => Math.max(...props.data.map(d => d.revenue)) * 1.15)
const maxBook = computed(() => Math.max(...props.data.map(d => d.bookings)) * 1.15)

function xAt(i) {
  return PAD + (i * (W - PAD * 2)) / (props.data.length - 1)
}
function yAt(v, max) {
  return H - PAD - (v / max) * (H - PAD * 2 - 10)
}

const revPoints = computed(() => props.data.map((d, i) => [xAt(i), yAt(d.revenue, maxRev.value)]))
const bookPoints = computed(() => props.data.map((d, i) => [xAt(i), yAt(d.bookings, maxBook.value)]))

function toPath(points) {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')
}
function toArea(points) {
  return `${toPath(points)} L${points[points.length - 1][0]},${H - PAD} L${points[0][0]},${H - PAD} Z`
}
</script>

<template>
  <div class="relative">
    <svg :viewBox="`0 0 ${W} ${H}`" class="w-full h-[180px]">
      <defs>
        <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#7B62FF" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#7B62FF" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="bkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4CC9F0" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#4CC9F0" stop-opacity="0" />
        </linearGradient>
      </defs>
      <line v-for="i in 4" :key="i" x1="0" :x2="W" :y1="PAD + i * (H - PAD * 2) / 4" :y2="PAD + i * (H - PAD * 2) / 4"
        stroke="var(--border)" stroke-dasharray="3 3" stroke-width="1" />

      <path :d="toArea(bookPoints)" fill="url(#bkGrad)" />
      <path :d="toPath(bookPoints)" fill="none" stroke="#4CC9F0" stroke-width="2" />
      <path :d="toArea(revPoints)" fill="url(#revGrad)" />
      <path :d="toPath(revPoints)" fill="none" stroke="#7B62FF" stroke-width="2" />

      <g v-for="(d, i) in data" :key="d.month">
        <circle :cx="xAt(i)" :cy="yAt(d.revenue, maxRev)" r="9" fill="transparent"
          @mouseenter="hovered = i" @mouseleave="hovered = null" style="cursor:pointer" />
        <circle v-if="hovered === i" :cx="xAt(i)" :cy="yAt(d.revenue, maxRev)" r="3.5" fill="#7B62FF" />
        <circle v-if="hovered === i" :cx="xAt(i)" :cy="yAt(d.bookings, maxBook)" r="3.5" fill="#4CC9F0" />
        <text :x="xAt(i)" :y="H - 6" text-anchor="middle" font-size="10" fill="var(--muted-foreground)" font-family="Manrope">{{ d.month }}</text>
      </g>
    </svg>
    <div v-if="hovered !== null" class="absolute bg-card border border-border rounded-xl p-3 shadow-xl text-sm pointer-events-none"
      :style="{ left: `${(xAt(hovered) / W) * 100}%`, top: '0px', transform: 'translateX(-50%)' }">
      <p class="text-muted-foreground mb-1 text-xs">{{ data[hovered].month }}</p>
      <p class="font-bold" style="color:#7B62FF">revenue: SAR {{ data[hovered].revenue }}K</p>
      <p class="font-bold" style="color:#4CC9F0">bookings: {{ data[hovered].bookings.toLocaleString() }}</p>
    </div>
  </div>
</template>
