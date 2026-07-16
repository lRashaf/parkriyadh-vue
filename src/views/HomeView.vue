<script setup>
import { ref, computed } from 'vue'
import { Search, X, Filter, ZoomIn, ZoomOut, Navigation,
  CheckCircle, Zap, Shield, Camera, Activity, Car, DollarSign, MapPin, Star } from 'lucide-vue-next'
import RealMap from '../components/RealMap.vue'
import { PARKING_DATA, FILTERS } from '../data.js'

const props = defineProps({ isDark: { type: Boolean, default: true } })
const emit = defineEmits(['select-parking', 'book'])

const iconMap = { CheckCircle, Zap, Shield, Camera, Activity, Car, DollarSign, MapPin, Star }

const activeFilters = ref([])
const searchVal = ref('')
const mapSelected = ref(null)
const mapRef = ref(null)

function toggleFilter(id) {
  const i = activeFilters.value.indexOf(id)
  if (i === -1) activeFilters.value.push(id)
  else activeFilters.value.splice(i, 1)
}

const filtered = computed(() => PARKING_DATA.filter(p => {
  if (searchVal.value && !p.name.toLowerCase().includes(searchVal.value.toLowerCase())) return false
  if (activeFilters.value.includes('available') && p.available === 0) return false
  if (activeFilters.value.includes('ev') && !p.features.includes('ev')) return false
  if (activeFilters.value.includes('covered') && !p.features.includes('covered')) return false
  if (activeFilters.value.includes('cameras') && !p.features.includes('cameras')) return false
  if (activeFilters.value.includes('valet') && !p.features.includes('valet')) return false
  return true
}))

function handleMapSelect(p) {
  mapSelected.value = p.id
  emit('select-parking', p)
}
</script>

<template>
  <div class="h-screen flex flex-col pt-16 bg-background relative overflow-hidden">
    <div class="relative flex-1 min-h-0">
      <RealMap ref="mapRef" :parkings="filtered" :selectedId="mapSelected" :isDark="isDark" @select="handleMapSelect" />

      <div class="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-lg px-4">
        <div class="flex items-center gap-2 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 px-4 py-3">
          <Search :size="16" class="text-white/50 shrink-0" />
          <input
            v-model="searchVal"
            placeholder="Search areas, malls, hospitals, airports..."
            class="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
          />
          <button v-if="searchVal" @click="searchVal = ''" class="text-white/40 hover:text-white/80 transition-colors">
            <X :size="14" />
          </button>
          <div class="w-px h-4 bg-white/15" />
          <button class="flex items-center gap-1.5 text-xs text-white/60 hover:text-white/90 transition-colors">
            <Filter :size="13" />
            Filter
          </button>
        </div>
      </div>

      <div class="absolute top-20 left-0 right-0 z-10 overflow-x-auto scrollbar-none">
        <div class="flex gap-2 px-4 pb-2" style="width:max-content">
          <button v-for="f in FILTERS" :key="f.id" @click="toggleFilter(f.id)"
            :class="`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-md transition-all whitespace-nowrap press-scale ${
              activeFilters.includes(f.id)
                ? 'bg-primary text-primary-foreground border-primary/50 shadow-lg shadow-primary/30'
                : 'bg-black/60 text-white/70 border-white/10 hover:bg-white/10'
            }`">
            <component :is="iconMap[f.icon]" :size="11" />
            {{ f.label }}
          </button>
        </div>
      </div>

      <div class="absolute right-4 bottom-36 z-10 flex flex-col gap-2">
        <button @click="mapRef?.zoomIn()" class="w-10 h-10 rounded-xl bg-black/70 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/80 hover:text-white shadow-lg press-scale">
          <ZoomIn :size="16" />
        </button>
        <button @click="mapRef?.zoomOut()" class="w-10 h-10 rounded-xl bg-black/70 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/80 hover:text-white shadow-lg press-scale">
          <ZoomOut :size="16" />
        </button>
        <button @click="mapRef?.recenter()" class="w-10 h-10 rounded-xl bg-primary/80 backdrop-blur-xl border border-primary/50 flex items-center justify-center text-white shadow-lg shadow-primary/30 press-scale">
          <Navigation :size="16" />
        </button>
      </div>

      <div class="absolute left-4 bottom-36 z-10">
        <div class="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/70 backdrop-blur-xl border border-white/10 text-xs text-white/70">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live
          <span class="text-white/40">·</span>
          {{ filtered.length }} locations
        </div>
      </div>
    </div>
  </div>
</template>
