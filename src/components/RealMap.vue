<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  parkings: { type: Array, required: true },
  selectedId: { type: String, default: null },
  isDark: { type: Boolean, default: true },
})
const emit = defineEmits(['select'])

const mapEl = ref(null)
let map = null
let tileLayer = null
let markersLayer = null
const live = reactive({})

const RIYADH_CENTER = [24.7255, 46.6850]

const TILES = {
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
  },
  light: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
  },
}

function markerColor(p) {
  const av = live[p.id] ?? p.available
  if (av === 0) return '#EF4444'
  if (av / p.total < 0.2) return '#F59E0B'
  return '#22C55E'
}

function buildIcon(p, selected) {
  const c = markerColor(p)
  const av = live[p.id] ?? p.available
  const size = selected ? 40 : 30
  return L.divIcon({
    className: '',
    html: `
      <div style="position:relative; width:${size}px; height:${size}px;">
        <div style="position:absolute; inset:0; border-radius:50%; background:${c}; opacity:0.25; animation:parkPulse 2.2s ease-out infinite;"></div>
        <div style="position:absolute; inset:${selected ? 5 : 4}px; border-radius:50%; background:#0A0F18; opacity:0.85;"></div>
        <div style="position:absolute; inset:${selected ? 5 : 4}px; border-radius:50%; border:2px solid ${c};"></div>
        <div style="position:absolute; inset:${selected ? 10 : 8}px; border-radius:50%; background:${c};"></div>
        <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:white; font-weight:800; font-family:Manrope,sans-serif; font-size:${selected ? 13 : 10}px;">P</div>
        ${!selected ? `<div style="position:absolute; top:-6px; right:-10px; background:rgba(10,15,24,0.92); color:${c}; border:1px solid ${c}; border-radius:8px; padding:1px 5px; font-size:9px; font-weight:700; font-family:Manrope,sans-serif; white-space:nowrap;">${av}</div>` : ''}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

function renderMarkers() {
  if (!map) return
  markersLayer.clearLayers()
  props.parkings.forEach(p => {
    const marker = L.marker([p.lat, p.lng], { icon: buildIcon(p, props.selectedId === p.id) })
    marker.on('click', (e) => {
      L.DomEvent.stopPropagation(e)
      emit('select', p)
    })
    marker.bindTooltip(p.name, { direction: 'top', offset: [0, -size(p)] })
    marker.addTo(markersLayer)
  })
}
function size(p) { return props.selectedId === p.id ? 20 : 15 }

function seedLive() {
  props.parkings.forEach(p => { if (live[p.id] === undefined) live[p.id] = p.available })
}

let timer = null

function handleMapClick(e) {
  const nearby = props.parkings.some(p => map.distance(e.latlng, [p.lat, p.lng]) < 250)
  if (nearby) return
  L.popup({ closeButton: true, className: 'undeveloped-popup' })
    .setLatLng(e.latlng)
    .setContent(`
      <div style="font-family:Manrope,sans-serif; font-size:12.5px; line-height:1.5; max-width:180px;">
        <div style="font-weight:800; margin-bottom:2px;">🚧 لسه ما شملته الخدمة</div>
        <div style="opacity:.75;">هذا الموقع تحت التطوير، بنضيفه قريباً.</div>
      </div>
    `)
    .openOn(map)
}

function applyTiles() {
  if (tileLayer) map.removeLayer(tileLayer)
  const t = props.isDark ? TILES.dark : TILES.light
  tileLayer = L.tileLayer(t.url, { attribution: t.attribution, subdomains: 'abcd', maxZoom: 19 })
  tileLayer.addTo(map)
}

onMounted(() => {
  seedLive()
  map = L.map(mapEl.value, {
    center: RIYADH_CENTER,
    zoom: 12,
    zoomControl: false,
    attributionControl: true,
  })
  applyTiles()
  markersLayer = L.layerGroup().addTo(map)
  renderMarkers()
  map.on('click', handleMapClick)

  timer = setInterval(() => {
    props.parkings.forEach(p => {
      const d = Math.floor(Math.random() * 5) - 2
      const cur = live[p.id] ?? p.available
      live[p.id] = Math.max(0, Math.min(p.total, cur + d))
    })
    renderMarkers()
  }, 3500)
})

onBeforeUnmount(() => {
  clearInterval(timer)
  if (map) map.remove()
})

watch(() => props.parkings, () => { seedLive(); renderMarkers() })
watch(() => props.selectedId, () => renderMarkers())
watch(() => props.isDark, () => applyTiles())

function zoomIn() { map && map.zoomIn() }
function zoomOut() { map && map.zoomOut() }
function recenter() { map && map.flyTo(RIYADH_CENTER, 12) }

defineExpose({ zoomIn, zoomOut, recenter })
</script>

<template>
  <div class="absolute inset-0 overflow-hidden bg-[#0A0F18]">
    <div ref="mapEl" class="w-full h-full"></div>
    <div class="absolute bottom-2 right-4 text-[10px] text-white/30 select-none pointer-events-none z-[500]">ParkRiyadh · بيانات تجريبية</div>
  </div>
</template>

<style>
@keyframes parkPulse {
  0% { transform: scale(0.8); opacity: 0.35; }
  70% { transform: scale(1.7); opacity: 0; }
  100% { opacity: 0; }
}
.leaflet-container { background: #0A0F18; font-family: 'Manrope', sans-serif; }
.leaflet-popup-content-wrapper { background: var(--card); color: var(--foreground); border-radius: 14px; }
.leaflet-popup-tip { background: var(--card); }
.leaflet-control-attribution { background: rgba(10,15,24,0.6) !important; color: rgba(255,255,255,0.4) !important; }
.leaflet-control-attribution a { color: rgba(255,255,255,0.6) !important; }
.leaflet-tooltip { background: rgba(10,15,24,0.92); color: white; border: none; font-size: 11px; font-family: 'Manrope', sans-serif; }
.leaflet-tooltip:before { border-top-color: rgba(10,15,24,0.92) !important; }
</style>
