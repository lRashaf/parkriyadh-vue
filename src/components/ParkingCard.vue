<script setup>
import { Star, MapPin, Zap, Car } from 'lucide-vue-next'
import { availBadge, barCl } from '../data.js'
import ParkingVisual from './ParkingVisual.vue'

const props = defineProps({ p: { type: Object, required: true } })
const emit = defineEmits(['select', 'book'])
</script>

<template>
  <div
    class="flex-shrink-0 w-72 rounded-2xl overflow-hidden bg-card border border-border shadow-2xl shadow-black/30 cursor-pointer hover-lift"
    @click="emit('select')"
  >
    <div class="relative h-40 overflow-hidden bg-muted">
      <ParkingVisual :p="p" size="card" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div class="absolute top-3 left-3">
        <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/50 backdrop-blur-sm text-emerald-400 border border-emerald-500/20">● Open</span>
      </div>
      <div :class="`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${availBadge(p.color)}`">
        {{ p.available > 0 ? `${p.available} free` : 'Full' }}
      </div>
      <div class="absolute bottom-3 left-3 flex gap-1.5">
        <span v-if="p.features.includes('ev')" class="w-6 h-6 rounded-full bg-sky-500/20 backdrop-blur-sm border border-sky-500/30 flex items-center justify-center">
          <Zap :size="10" class="text-sky-400" />
        </span>
        <span v-if="p.features.includes('valet')" class="w-6 h-6 rounded-full bg-pink-500/20 backdrop-blur-sm border border-pink-500/30 flex items-center justify-center">
          <Car :size="10" class="text-pink-400" />
        </span>
      </div>
    </div>
    <div class="p-4">
      <div class="flex items-start justify-between mb-1">
        <h3 class="font-bold text-foreground leading-tight">{{ p.name }}</h3>
        <div class="flex items-center gap-1 text-amber-400 shrink-0 ml-2">
          <Star :size="11" fill="currentColor" />
          <span class="text-xs font-bold">{{ p.rating }}</span>
          <span class="text-muted-foreground text-xs">({{ p.ratingCount }})</span>
        </div>
      </div>
      <p class="text-muted-foreground text-xs mb-3 flex items-center gap-1">
        <MapPin :size="10" />
        {{ p.distance }} · {{ p.walkTime }} walk
      </p>
      <div class="mb-3">
        <div class="flex justify-between text-xs text-muted-foreground mb-1.5">
          <span>Availability</span>
          <span class="font-medium">{{ p.available }}/{{ p.total }} spots</span>
        </div>
        <div class="h-1.5 bg-muted rounded-full overflow-hidden">
          <div :class="`h-full rounded-full ${barCl(p.color)}`" :style="{ width: `${(p.available / p.total) * 100}%`, transition: 'width .8s ease-out' }" />
        </div>
      </div>
      <div class="flex items-center justify-between">
        <div>
          <span class="text-xl font-black text-foreground">SAR {{ p.priceHour }}</span>
          <span class="text-muted-foreground text-xs">/hr</span>
        </div>
        <button
          class="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/30 press-scale"
          @click.stop="emit('book')"
        >
          Reserve
        </button>
      </div>
    </div>
  </div>
</template>
