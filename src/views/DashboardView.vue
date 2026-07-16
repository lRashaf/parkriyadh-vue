<script setup>
import { Settings, Calendar, Wallet, Clock, Award, Gift, Heart, Plus, Car } from 'lucide-vue-next'
import ParkingVisual from '../components/ParkingVisual.vue'
import { PARKING_DATA } from '../data.js'

const stats = [
  { label: 'Total Bookings', value: '47', delta: '+3 this month', icon: Calendar, color: 'bg-violet-500/20 text-violet-400' },
  { label: 'Amount Spent', value: 'SAR 2,840', delta: 'SAR 340 this month', icon: Wallet, color: 'bg-sky-500/20 text-sky-400' },
  { label: 'Hours Parked', value: '138h', delta: '12h this week', icon: Clock, color: 'bg-emerald-500/20 text-emerald-400' },
  { label: 'Loyalty Points', value: '4,250 pts', delta: '+120 today', icon: Award, color: 'bg-amber-500/20 text-amber-400' },
]
const favs = PARKING_DATA.slice(0, 3)
const myVehicles = [
  { plate: 'RYD 4521', make: 'Toyota Camry 2022', color: 'White' },
  { plate: 'ABC 7823', make: 'GMC Yukon 2023', color: 'Black' },
]
</script>

<template>
  <div class="min-h-screen pt-16 bg-background">
    <div class="max-w-2xl mx-auto px-4 py-4">
      <div class="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border mb-6">
        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-violet-700 flex items-center justify-center text-white text-xl font-black">A</div>
        <div class="flex-1">
          <h2 class="font-black text-foreground text-lg">Ahmed Al-Rashid</h2>
          <p class="text-muted-foreground text-sm">ahmed@example.com</p>
          <div class="flex items-center gap-1 mt-0.5">
            <Award :size="12" class="text-amber-400" />
            <span class="text-xs text-amber-400 font-semibold">Gold Member</span>
          </div>
        </div>
        <button class="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground transition-colors">
          <Settings :size="16" />
        </button>
      </div>

      <div class="grid grid-cols-2 gap-3 mb-6">
        <div v-for="s in stats" :key="s.label" class="p-4 rounded-2xl bg-card border border-border">
          <div :class="`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`">
            <component :is="s.icon" :size="18" />
          </div>
          <div class="text-xl font-black text-foreground">{{ s.value }}</div>
          <div class="text-xs text-muted-foreground">{{ s.label }}</div>
          <div class="text-xs text-emerald-400 font-medium mt-1">{{ s.delta }}</div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-gradient-to-r from-primary/20 to-violet-600/20 border border-primary/20 mb-6">
        <div class="flex items-center justify-between mb-3">
          <div>
            <div class="font-bold text-foreground">Loyalty Rewards</div>
            <div class="text-xs text-muted-foreground">4,250 / 5,000 pts to Platinum</div>
          </div>
          <div class="w-10 h-10 rounded-xl bg-primary/30 flex items-center justify-center">
            <Gift :size="18" class="text-primary" />
          </div>
        </div>
        <div class="h-2 bg-black/30 rounded-full overflow-hidden mb-2">
          <div class="h-full bg-gradient-to-r from-primary to-violet-400 rounded-full" style="width:85%; transition: width 1.2s ease-out" />
        </div>
        <div class="text-xs text-muted-foreground">750 pts away from Platinum · Redeem for free parking</div>
      </div>

      <div class="mb-6">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-bold text-foreground">Favorite Locations</h3>
          <button class="text-xs text-primary font-semibold">View all</button>
        </div>
        <div class="space-y-2">
          <div v-for="p in favs" :key="p.id" class="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border">
            <div class="w-12 h-12 rounded-xl overflow-hidden relative shrink-0">
              <ParkingVisual :p="p" size="thumb" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-foreground text-sm">{{ p.name }}</div>
              <div class="text-xs text-muted-foreground truncate">{{ p.address }}</div>
            </div>
            <div class="text-right shrink-0">
              <div class="font-bold text-foreground text-sm">SAR {{ p.priceHour }}/hr</div>
              <div :class="`text-xs font-medium ${p.available > 0 ? 'text-emerald-400' : 'text-red-400'}`">
                {{ p.available > 0 ? `${p.available} free` : 'Full' }}
              </div>
            </div>
            <Heart :size="14" class="text-red-400 fill-red-400 shrink-0" />
          </div>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-bold text-foreground">My Vehicles</h3>
          <button class="text-xs text-primary font-semibold flex items-center gap-1"><Plus :size="12" /> Add</button>
        </div>
        <div v-for="v in myVehicles" :key="v.plate" class="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border mb-2">
          <div class="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <Car :size="18" class="text-muted-foreground" />
          </div>
          <div class="flex-1">
            <div class="font-semibold text-foreground text-sm">{{ v.make }}</div>
            <div class="text-xs text-muted-foreground">{{ v.color }}</div>
          </div>
          <div class="font-black text-foreground text-xs tracking-wider bg-muted px-2.5 py-1 rounded-lg">{{ v.plate }}</div>
        </div>
      </div>

      <div class="p-4 rounded-2xl border border-primary/20 bg-primary/5 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <div class="font-bold text-foreground">Monthly Subscription</div>
            <div class="text-xs text-muted-foreground">Kingdom Centre · SAR 800/mo</div>
            <div class="text-xs text-emerald-400 font-medium mt-1">Renews Jul 31, 2024</div>
          </div>
          <button class="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold">Manage</button>
        </div>
      </div>
    </div>
  </div>
</template>
