<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  p: { type: Object, required: true },
  isDark: { type: Boolean, default: true },
  interactive: { type: Boolean, default: true },
})

const el = ref(null)
let map = null
let tileLayer = null

const TILES = {
  dark: { url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' },
  light: { url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png' },
}

function markerColor() {
  const av = props.p.available
  if (av === 0) return '#EF4444'
  if (av / props.p.total < 0.2) return '#F59E0B'
  return '#22C55E'
}

function icon() {
  const c = markerColor()
  return L.divIcon({
    className: '',
    html: `
      <div style="position:relative; width:44px; height:44px;">
        <div style="position:absolute; inset:0; border-radius:50%; background:${c}; opacity:0.25; animation:parkPulse 2.2s ease-out infinite;"></div>
        <div style="position:absolute; inset:6px; border-radius:50%; background:#0A0F18; opacity:0.9;"></div>
        <div style="position:absolute; inset:6px; border-radius:50%; border:2.5px solid ${c};"></div>
        <div style="position:absolute; inset:12px; border-radius:50%; background:${c};"></div>
        <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:white; font-weight:800; font-family:Manrope,sans-serif; font-size:14px;">P</div>
      </div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  })
}

function applyTiles() {
  if (tileLayer) map.removeLayer(tileLayer)
  const t = props.isDark ? TILES.dark : TILES.light
  tileLayer = L.tileLayer(t.url, { subdomains: 'abcd', maxZoom: 19, attribution: '' })
  tileLayer.addTo(map)
}

onMounted(() => {
  map = L.map(el.value, {
    center: [props.p.lat, props.p.lng],
    zoom: 15,
    zoomControl: false,
    attributionControl: false,
    dragging: props.interactive,
    scrollWheelZoom: false,
    doubleClickZoom: props.interactive,
    touchZoom: props.interactive,
  })
  applyTiles()
  L.marker([props.p.lat, props.p.lng], { icon: icon() }).addTo(map)
})

onBeforeUnmount(() => { if (map) map.remove() })
watch(() => props.isDark, applyTiles)
watch(() => props.p.id, () => {
  if (map) {
    map.setView([props.p.lat, props.p.lng], 15)
    applyTiles()
  }
})
</script>

<template>
  <div class="absolute inset-0">
    <div ref="el" class="w-full h-full"></div>
  </div>
</template>

<style>
@keyframes parkPulse {
  0% { transform: scale(0.8); opacity: 0.35; }
  70% { transform: scale(1.7); opacity: 0; }
  100% { opacity: 0; }
}
</style>
