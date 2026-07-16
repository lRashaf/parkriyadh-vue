<script setup>
import { ref, computed } from 'vue'
import { Calendar, RefreshCw, Download, Map } from 'lucide-vue-next'
import ParkingVisual from '../components/ParkingVisual.vue'
import { MY_RESERVATIONS, statusBadge } from '../data.js'

const tab = ref('upcoming')
const tabs = ['upcoming', 'past', 'cancelled']

const filtered = computed(() => MY_RESERVATIONS.filter(r =>
  tab.value === 'upcoming' ? r.status === 'active' :
  tab.value === 'past' ? r.status === 'completed' : r.status === 'cancelled'
))
</script>

<template>
  <div class="min-h-screen pt-16 bg-background">
    <div class="max-w-2xl mx-auto">
      <div class="px-4 pt-4 pb-2">
        <h1 class="text-2xl font-black text-foreground mb-4">My Reservations</h1>
        <div class="flex gap-1 p-1 rounded-2xl bg-muted">
          <button v-for="t in tabs" :key="t" @click="tab = t"
            :class="`flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
              tab === t ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
            }`">
            {{ t }}
          </button>
        </div>
      </div>

      <div class="px-4 py-4 space-y-4">
        <div v-if="filtered.length === 0" class="text-center py-16">
          <div class="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Calendar :size="28" class="text-muted-foreground" />
          </div>
          <p class="text-foreground font-semibold">No {{ tab }} reservations</p>
          <p class="text-muted-foreground text-sm mt-1">Your bookings will appear here</p>
        </div>

        <div v-for="r in filtered" :key="r.id" class="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
          <div class="flex">
            <div class="w-28 h-28 shrink-0 relative">
              <ParkingVisual :p="r" size="card" />
            </div>
            <div class="p-3 flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2 mb-1">
                <h3 class="font-bold text-foreground text-sm leading-tight truncate">{{ r.parking }}</h3>
                <span :class="`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${statusBadge(r.status)}`">{{ r.status }}</span>
              </div>
              <p class="text-xs text-muted-foreground truncate">{{ r.address }}</p>
              <p class="text-xs text-muted-foreground mt-1">{{ r.date }} · {{ r.time }}</p>
              <p class="text-sm font-black text-foreground mt-1">SAR {{ r.price }}</p>
            </div>
          </div>
          <div v-if="r.status === 'active'" class="flex gap-2 px-3 pb-3">
            <button class="flex-1 py-2 rounded-xl bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center gap-1">
              <RefreshCw :size="12" /> Extend
            </button>
            <button class="flex-1 py-2 rounded-xl border border-red-500/20 text-red-400 text-xs font-semibold">
              Cancel
            </button>
          </div>
          <div v-else-if="r.status === 'completed'" class="flex gap-2 px-3 pb-3">
            <button class="flex-1 py-2 rounded-xl bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center gap-1">
              <Download :size="12" /> Receipt
            </button>
            <button class="flex-1 py-2 rounded-xl border border-border text-foreground text-xs font-semibold flex items-center justify-center gap-1">
              <Map :size="12" /> Rebook
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
