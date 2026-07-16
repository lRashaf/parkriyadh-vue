<script setup>
import { computed } from 'vue'

const props = defineProps({ data: { type: Array, required: true } })

const size = 120
const cx = size / 2, cy = size / 2
const rOuter = 55, rInner = 35

const arcs = computed(() => {
  const total = props.data.reduce((s, d) => s + d.value, 0)
  let angle = -90
  return props.data.map(d => {
    const sweep = (d.value / total) * 360
    const start = angle
    const end = angle + sweep
    angle = end
    return { ...d, start, end }
  })
})

function polar(r, deg) {
  const rad = (deg * Math.PI) / 180
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
}
function arcPath(a) {
  const [x1, y1] = polar(rOuter, a.start)
  const [x2, y2] = polar(rOuter, a.end)
  const [x3, y3] = polar(rInner, a.end)
  const [x4, y4] = polar(rInner, a.start)
  const large = a.end - a.start > 180 ? 1 : 0
  return `M${x1},${y1} A${rOuter},${rOuter} 0 ${large} 1 ${x2},${y2} L${x3},${y3} A${rInner},${rInner} 0 ${large} 0 ${x4},${y4} Z`
}
</script>

<template>
  <svg :viewBox="`0 0 ${size} ${size}`" :width="size" :height="size">
    <path v-for="(a, i) in arcs" :key="i" :d="arcPath(a)" :fill="a.color" />
  </svg>
</template>
