<script setup>
import { computed } from 'vue'
import { ChevronLeft, MapPin, Clock, Car, DollarSign, CreditCard, CheckCircle,
  Navigation, QrCode, Zap, Shield, Camera, Activity } from 'lucide-vue-next'
import Stars from '../components/Stars.vue'
import MiniMap from '../components/MiniMap.vue'
import ParkingVisual from '../components/ParkingVisual.vue'
import { PARKING_DATA, availBadge, barCl, featureMap } from '../data.js'

const props = defineProps({ p: { type: Object, required: true }, isDark: { type: Boolean, default: true } })
const emit = defineEmits(['back', 'book', 'switch'])

const iconMap = { Zap, Shield, Camera, Activity, Car }

const barW = computed(() => `${(props.p.available / props.p.total) * 100}%`)
const nearby = computed(() => PARKING_DATA.filter(x => x.id !== props.p.id).slice(0, 5))

const infoGrid = computed(() => [
  { label: 'Hours', value: props.p.hours, icon: Clock },
  { label: 'Height Limit', value: props.p.heightLimit, icon: Car },
  { label: 'Daily Rate', value: `SAR ${props.p.priceDay}`, icon: DollarSign },
  { label: 'Monthly', value: `SAR ${props.p.priceMonth}`, icon: CreditCard },
])
</script>

<template>
  <div class="h-screen flex flex-col pt-16 overflow-y-auto bg-background">
    <div class="relative h-72 bg-muted shrink-0 overflow-hidden">
      <MiniMap :p="p" :isDark="isDark" :interactive="true" />
      <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
      <button @click="emit('back')"
        class="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white z-[500]">
        <ChevronLeft :size="18" />
      </button>
      <div class="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white text-xs font-semibold flex items-center gap-1.5 z-[500]">
        <Navigation :size="11" /> اسحب الخريطة للاستكشاف
      </div>
      <div class="absolute bottom-3 inset-x-3 flex items-center justify-between z-[500]">
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white text-xs font-semibold">
          <MapPin :size="11" />
          {{ p.distance }} · {{ p.walkTime }} مشي
        </div>
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/80 backdrop-blur-sm border border-primary/50 text-white text-xs font-semibold">
          <Navigation :size="11" /> الاتجاهات
        </div>
      </div>
    </div>

    <div class="flex-1 px-4 py-4 max-w-2xl mx-auto w-full">
      <div class="flex items-start justify-between mb-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/15 text-primary">{{ p.type }}</span>
            <span class="text-xs text-muted-foreground">{{ p.distance }} away</span>
          </div>
          <h1 class="text-2xl font-black text-foreground">{{ p.name }}</h1>
          <p class="text-muted-foreground text-sm flex items-center gap-1 mt-1">
            <MapPin :size="13" class="shrink-0" />
            {{ p.address }}
          </p>
        </div>
        <div class="text-right">
          <div class="text-2xl font-black text-foreground">SAR {{ p.priceHour }}</div>
          <div class="text-xs text-muted-foreground">/hour</div>
        </div>
      </div>

      <div class="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border mb-4">
        <div class="text-center">
          <div class="text-3xl font-black text-foreground">{{ p.rating }}</div>
          <Stars :rating="p.rating" />
          <div class="text-xs text-muted-foreground mt-0.5">{{ p.ratingCount }} reviews</div>
        </div>
        <div class="w-px h-12 bg-border" />
        <div class="flex-1 space-y-1">
          <div v-for="s in [5,4,3,2,1]" :key="s" class="flex items-center gap-2">
            <span class="text-xs text-muted-foreground w-2">{{ s }}</span>
            <div class="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div class="h-full bg-amber-400 rounded-full"
                :style="{ width: s === 5 ? '65%' : s === 4 ? '22%' : s === 3 ? '8%' : '3%' }" />
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-card border border-border mb-4">
        <div class="flex items-center justify-between mb-2">
          <span class="font-semibold text-foreground text-sm">Availability</span>
          <span :class="`px-2.5 py-0.5 rounded-full text-xs font-bold ${availBadge(p.color)}`">
            {{ p.available > 0 ? `${p.available} available` : 'Full' }}
          </span>
        </div>
        <div class="h-2 bg-muted rounded-full overflow-hidden mb-1">
          <div :class="`h-full rounded-full ${barCl(p.color)}`" :style="{ width: barW, transition: 'width 1s ease-out' }" />
        </div>
        <div class="flex justify-between text-xs text-muted-foreground">
          <span>{{ p.available }} free</span><span>{{ p.total }} total</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 mb-4">
        <div v-for="item in infoGrid" :key="item.label" class="p-3 rounded-2xl bg-card border border-border flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <component :is="item.icon" :size="16" class="text-primary" />
          </div>
          <div>
            <div class="text-xs text-muted-foreground">{{ item.label }}</div>
            <div class="text-sm font-bold text-foreground">{{ item.value }}</div>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <h3 class="font-bold text-foreground mb-3">Amenities</h3>
        <div class="flex flex-wrap gap-2">
          <template v-for="f in p.features" :key="f">
            <div v-if="featureMap[f]" class="flex items-center gap-2 px-3 py-2 rounded-xl bg-card border border-border">
              <component :is="iconMap[featureMap[f].icon]" :size="14" :class="featureMap[f].color" />
              <span class="text-xs font-medium text-foreground">{{ featureMap[f].label }}</span>
            </div>
          </template>
        </div>
      </div>

      <div v-if="p.reviews.length > 0" class="mb-6">
        <h3 class="font-bold text-foreground mb-3">Reviews</h3>
        <div class="space-y-3">
          <div v-for="(r, i) in p.reviews" :key="i" class="p-4 rounded-2xl bg-card border border-border">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                  {{ r.user[0] }}
                </div>
                <div>
                  <div class="text-sm font-semibold text-foreground flex items-center gap-1.5">
                    {{ r.user }}
                    <CheckCircle v-if="r.verified" :size="11" class="text-emerald-500" />
                  </div>
                  <div class="text-xs text-muted-foreground">{{ r.time }}</div>
                </div>
              </div>
              <Stars :rating="r.rating" :size="11" />
            </div>
            <p class="text-sm text-foreground/80">{{ r.text }}</p>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="font-bold text-foreground mb-3">مواقف بديلة قريبة</h3>
        <div class="flex gap-3 overflow-x-auto scrollbar-none pb-1">
          <div v-for="alt in nearby" :key="alt.id" @click="emit('switch', alt)"
            class="flex-shrink-0 w-40 rounded-2xl overflow-hidden bg-card border border-border cursor-pointer hover-lift">
            <div class="relative h-20">
              <ParkingVisual :p="alt" size="card" />
              <div :class="`absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${availBadge(alt.color)}`">
                {{ alt.available > 0 ? alt.available : 'ممتلئ' }}
              </div>
            </div>
            <div class="p-2.5">
              <div class="text-xs font-bold text-foreground truncate">{{ alt.name }}</div>
              <div class="text-[10px] text-muted-foreground">{{ alt.distance }} · SAR {{ alt.priceHour }}/hr</div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-3 pb-8">
        <button
          class="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-base shadow-xl shadow-primary/30 press-scale"
          @click="emit('book')">
          <QrCode :size="18" />
          Reserve Now — SAR {{ p.priceHour }}/hr
        </button>
      </div>
    </div>
  </div>
</template>
