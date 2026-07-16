<script setup>
import { ref } from 'vue'
import { Download, DollarSign, Activity, Users, BarChart3, TrendingUp } from 'lucide-vue-next'
import RevenueAreaChart from '../components/RevenueAreaChart.vue'
import DonutChart from '../components/DonutChart.vue'
import { REVENUE_DATA, PIE_DATA, OCCUPANCY_DATA } from '../data.js'

const activeTab = ref('overview')
const tabs = ['overview', 'bookings', 'locations']

const kpis = [
  { label: 'Total Revenue', value: 'SAR 228K', delta: '+6.5%', icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
  { label: 'Active Bookings', value: '4,560', delta: '+8.1%', icon: Activity, color: 'text-sky-400', bg: 'bg-sky-500/15' },
  { label: 'Total Users', value: '38,421', delta: '+12.3%', icon: Users, color: 'text-violet-400', bg: 'bg-violet-500/15' },
  { label: 'Occupancy Rate', value: '81%', delta: '+3.2%', icon: BarChart3, color: 'text-amber-400', bg: 'bg-amber-500/15' },
]

const recentBookings = [
  { id: 'PRK-4521', user: 'Ahmed K.', parking: 'Kingdom Centre', time: '14:00–16:00', amount: 'SAR 30', status: 'active' },
  { id: 'PRK-4520', user: 'Sara M.', parking: 'KAFD Tower', time: '09:00–18:00', amount: 'SAR 180', status: 'completed' },
  { id: 'PRK-4519', user: 'Khalid R.', parking: 'Granada Mall', time: '11:00–14:00', amount: 'SAR 24', status: 'completed' },
  { id: 'PRK-4518', user: 'Noura A.', parking: 'Riyadh Park', time: '15:00–17:00', amount: 'SAR 20', status: 'cancelled' },
]
function statusCls(s) {
  return s === 'active' ? 'bg-emerald-500/15 text-emerald-400'
    : s === 'completed' ? 'bg-blue-500/15 text-blue-400'
    : 'bg-red-500/15 text-red-400'
}
</script>

<template>
  <div class="min-h-screen pt-16 bg-background">
    <div class="max-w-4xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-black text-foreground">Admin Dashboard</h1>
          <p class="text-muted-foreground text-sm">ParkRiyadh Operations · July 2024</p>
        </div>
        <button class="px-4 py-2 rounded-xl border border-border text-sm text-foreground font-semibold flex items-center gap-2">
          <Download :size="14" /> Export
        </button>
      </div>

      <div class="flex gap-1 p-1 rounded-2xl bg-muted mb-6">
        <button v-for="t in tabs" :key="t" @click="activeTab = t"
          :class="`flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
            activeTab === t ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
          }`">
          {{ t }}
        </button>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div v-for="k in kpis" :key="k.label" class="p-4 rounded-2xl bg-card border border-border">
          <div :class="`w-10 h-10 rounded-xl ${k.bg} flex items-center justify-center mb-3`">
            <component :is="k.icon" :size="18" :class="k.color" />
          </div>
          <div class="text-xl font-black text-foreground">{{ k.value }}</div>
          <div class="text-xs text-muted-foreground">{{ k.label }}</div>
          <div class="text-xs text-emerald-400 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp :size="10" /> {{ k.delta }}
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-card border border-border mb-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-foreground">Revenue &amp; Bookings</h3>
          <span class="text-xs text-muted-foreground px-2.5 py-1 rounded-lg bg-muted">Last 7 months</span>
        </div>
        <RevenueAreaChart :data="REVENUE_DATA" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="p-4 rounded-2xl bg-card border border-border">
          <h3 class="font-bold text-foreground text-sm mb-4">Occupancy by Location</h3>
          <div class="space-y-3">
            <div v-for="o in OCCUPANCY_DATA" :key="o.name">
              <div class="flex justify-between text-xs text-muted-foreground mb-1">
                <span class="truncate">{{ o.name }}</span>
                <span class="font-semibold">{{ o.pct }}%</span>
              </div>
              <div class="h-2 bg-muted rounded-full overflow-hidden">
                <div :class="`h-full rounded-full ${o.pct >= 90 ? 'bg-red-500' : o.pct >= 70 ? 'bg-amber-500' : 'bg-emerald-500'}`"
                  :style="{ width: `${o.pct}%`, transition: 'width .8s ease-out' }" />
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 rounded-2xl bg-card border border-border">
          <h3 class="font-bold text-foreground text-sm mb-4">Booking Type Split</h3>
          <div class="flex items-center gap-4">
            <DonutChart :data="PIE_DATA" />
            <div class="space-y-2">
              <div v-for="d in PIE_DATA" :key="d.name" class="flex items-center gap-2">
                <div class="w-2.5 h-2.5 rounded-full" :style="{ background: d.color }" />
                <span class="text-xs text-muted-foreground">{{ d.name }}</span>
                <span class="text-xs font-bold text-foreground ml-auto">{{ d.value }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-2xl bg-card border border-border overflow-hidden mb-6">
        <div class="px-4 py-3 border-b border-border flex items-center justify-between">
          <h3 class="font-bold text-foreground text-sm">Recent Bookings</h3>
          <button class="text-xs text-primary font-semibold">View all</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-border">
                <th v-for="h in ['Booking ID','User','Parking','Time','Amount','Status']" :key="h"
                  class="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">{{ h }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in recentBookings" :key="row.id" class="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td class="px-4 py-3 text-xs font-mono font-semibold text-primary">{{ row.id }}</td>
                <td class="px-4 py-3 text-xs text-foreground font-medium">{{ row.user }}</td>
                <td class="px-4 py-3 text-xs text-foreground">{{ row.parking }}</td>
                <td class="px-4 py-3 text-xs text-muted-foreground">{{ row.time }}</td>
                <td class="px-4 py-3 text-xs text-foreground font-semibold">{{ row.amount }}</td>
                <td class="px-4 py-3">
                  <span :class="`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusCls(row.status)}`">{{ row.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
