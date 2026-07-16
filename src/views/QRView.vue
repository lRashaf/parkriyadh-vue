<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { CheckCircle, Download, Share2, Calendar, Phone } from 'lucide-vue-next'
import QRCodeSVG from '../components/QRCodeSVG.vue'

const props = defineProps({ p: { type: Object, required: true }, resId: { type: String, required: true } })
const emit = defineEmits(['home'])

const countdown = ref({ h: 0, m: 45, s: 0 })
let timer = null
onMounted(() => {
  timer = setInterval(() => {
    let { h, m, s } = countdown.value
    s--
    if (s < 0) { s = 59; m-- }
    if (m < 0) { m = 59; h-- }
    if (h < 0) { countdown.value = { h: 0, m: 0, s: 0 }; return }
    countdown.value = { h, m, s }
  }, 1000)
})
onUnmounted(() => clearInterval(timer))

const pad = (n) => String(n).padStart(2, '0')
const actions = [
  { label: 'Download', icon: Download },
  { label: 'Share', icon: Share2 },
  { label: 'Calendar', icon: Calendar },
]
</script>

<template>
  <div class="min-h-screen pt-16 bg-background overflow-y-auto">
    <div class="max-w-md mx-auto px-4 py-6 text-center">
      <div class="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
        <CheckCircle :size="36" class="text-emerald-400" />
      </div>

      <h1 class="text-2xl font-black text-foreground mb-1">Booking Confirmed!</h1>
      <p class="text-muted-foreground text-sm mb-6">Scan this QR at the parking entrance</p>

      <div class="relative inline-block mb-6">
        <div class="p-5 rounded-3xl bg-white shadow-2xl shadow-primary/20 border-4 border-primary/10 relative overflow-hidden">
          <QRCodeSVG :value="resId" :size="220" />
          <div class="absolute left-5 right-5 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full scan-line" />
        </div>
        <div class="mt-3 text-center">
          <div class="text-xs text-muted-foreground">Reservation ID</div>
          <div class="font-black text-foreground tracking-widest text-sm">{{ resId }}</div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-card border border-border mb-4">
        <div class="text-xs text-muted-foreground mb-2">Reservation starts in</div>
        <div class="flex items-center justify-center gap-3">
          <div v-for="t in [{label:'HRS',val:countdown.h},{label:'MIN',val:countdown.m},{label:'SEC',val:countdown.s}]" :key="t.label" class="text-center">
            <div class="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center">
              <span class="text-2xl font-black text-primary">{{ pad(t.val) }}</span>
            </div>
            <span class="text-[10px] text-muted-foreground font-medium mt-1 block">{{ t.label }}</span>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-card border border-border text-left mb-4 space-y-2">
        <div class="flex justify-between text-sm"><span class="text-muted-foreground">Parking</span><span class="text-foreground font-semibold">{{ p.name }}</span></div>
        <div class="flex justify-between text-sm"><span class="text-muted-foreground">Address</span><span class="text-foreground font-semibold">{{ p.address }}</span></div>
        <div class="flex justify-between text-sm"><span class="text-muted-foreground">Time</span><span class="text-foreground font-semibold">14:00 – 16:00</span></div>
      </div>

      <div class="grid grid-cols-3 gap-3 mb-4">
        <button v-for="a in actions" :key="a.label"
          class="p-3 rounded-2xl bg-card border border-border flex flex-col items-center gap-1.5 text-foreground hover:border-primary hover:text-primary transition-colors">
          <component :is="a.icon" :size="18" />
          <span class="text-xs font-medium">{{ a.label }}</span>
        </button>
      </div>

      <div class="p-3 rounded-2xl bg-card border border-border flex items-center gap-3 mb-6">
        <div class="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
          <Phone :size="16" class="text-primary" />
        </div>
        <div class="text-left flex-1">
          <div class="text-xs text-muted-foreground">Need help?</div>
          <div class="text-sm font-semibold text-foreground">Emergency support: 920 012 345</div>
        </div>
      </div>

      <button @click="emit('home')"
        class="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/30 mb-8 press-scale">
        Back to Home
      </button>
    </div>
  </div>
</template>
