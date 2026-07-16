<script setup>
import { ref, computed } from 'vue'
import { ChevronLeft, Check, Clock, Car, Plus, ArrowRight, CreditCard } from 'lucide-vue-next'
import BrandIcon from '../components/BrandIcon.vue'

const props = defineProps({ p: { type: Object, required: true } })
const emit = defineEmits(['back', 'complete'])

const step = ref(1)
const date = ref('2024-07-14')
const arrival = ref('14:00')
const departure = ref('16:00')
const selectedVehicle = ref(0)
const selectedPayment = ref(0)
const plate = ref('')
const addingVehicle = ref(false)

const vehicles = [
  { plate: 'RYD 4521', type: 'Sedan', color: 'White', make: 'Toyota Camry' },
  { plate: 'ABC 7823', type: 'SUV', color: 'Black', make: 'GMC Yukon' },
]
const payments = [
  { name: 'Apple Pay', brand: 'siApplepay', last: '' },
  { name: 'Mada', brand: null, last: '3421' },
  { name: 'Visa', brand: 'siVisa', last: '8874' },
]
const steps = ['Date & Time', 'Vehicle', 'Payment', 'Confirm']
const quickSelect = ['1 hour', '2 hours', '3 hours', '4 hours', 'All day']

const hours = computed(() => {
  const [ah, am] = arrival.value.split(':').map(Number)
  const [dh, dm] = departure.value.split(':').map(Number)
  const diff = (dh * 60 + dm) - (ah * 60 + am)
  return Math.max(1, diff / 60)
})
const total = computed(() => (props.p.priceHour * hours.value).toFixed(0))
const grandTotal = computed(() => (Number(total.value) + 2 + Number(total.value) * 0.15).toFixed(0))

function next() {
  if (step.value < 4) step.value++
  else emit('complete')
}
</script>

<template>
  <div class="h-screen flex flex-col pt-16 bg-background overflow-hidden">
    <div class="px-4 py-4 border-b border-border shrink-0">
      <div class="flex items-center gap-3 mb-4">
        <button @click="emit('back')" class="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-foreground">
          <ChevronLeft :size="18" />
        </button>
        <div class="flex-1">
          <h2 class="font-bold text-foreground">Reserve Parking</h2>
          <p class="text-xs text-muted-foreground">{{ p.name }}</p>
        </div>
        <div class="text-right">
          <div class="text-xs text-muted-foreground">Estimated</div>
          <div class="font-black text-foreground">SAR {{ total }}</div>
        </div>
      </div>
      <div class="flex items-center gap-0">
        <div v-for="(s, i) in steps" :key="i" class="flex items-center flex-1 last:flex-none">
          <div class="flex flex-col items-center gap-1">
            <div :class="`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
              i + 1 < step ? 'bg-primary border-primary text-primary-foreground' :
              i + 1 === step ? 'border-primary text-primary' :
              'border-border text-muted-foreground'
            }`">
              <Check v-if="i + 1 < step" :size="12" />
              <template v-else>{{ i + 1 }}</template>
            </div>
            <span :class="`text-[10px] font-medium ${i + 1 === step ? 'text-primary' : 'text-muted-foreground'}`">{{ s }}</span>
          </div>
          <div v-if="i < steps.length - 1" :class="`flex-1 h-0.5 mx-1 rounded-full mb-4 transition-all ${i + 1 < step ? 'bg-primary' : 'bg-border'}`" />
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto px-4 py-4">
      <Transition name="slide-x" mode="out-in">
        <div v-if="step === 1" key="s1" class="space-y-4">
          <h3 class="text-lg font-bold text-foreground">Choose Date & Time</h3>
          <div class="p-4 rounded-2xl bg-card border border-border space-y-4">
            <div>
              <label class="text-xs text-muted-foreground font-medium mb-2 block">Date</label>
              <input type="date" v-model="date"
                class="w-full p-3 rounded-xl bg-muted border border-border text-foreground text-sm outline-none focus:border-primary transition-colors" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-xs text-muted-foreground font-medium mb-2 block">Arrival</label>
                <input type="time" v-model="arrival"
                  class="w-full p-3 rounded-xl bg-muted border border-border text-foreground text-sm outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label class="text-xs text-muted-foreground font-medium mb-2 block">Departure</label>
                <input type="time" v-model="departure"
                  class="w-full p-3 rounded-xl bg-muted border border-border text-foreground text-sm outline-none focus:border-primary transition-colors" />
              </div>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-primary/10 border border-primary/20">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Clock :size="16" class="text-primary" />
                <span class="text-sm font-semibold text-foreground">Duration: {{ hours }} hour{{ hours !== 1 ? 's' : '' }}</span>
              </div>
              <div class="text-right">
                <span class="text-xs text-muted-foreground">SAR {{ p.priceHour }}/hr × {{ hours }}h</span>
                <div class="font-black text-foreground">= SAR {{ total }}</div>
              </div>
            </div>
          </div>

          <div>
            <p class="text-xs text-muted-foreground mb-2">Quick select</p>
            <div class="flex gap-2 flex-wrap">
              <button v-for="opt in quickSelect" :key="opt"
                class="px-3 py-1.5 rounded-xl border border-border text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors">
                {{ opt }}
              </button>
            </div>
          </div>
        </div>

        <div v-else-if="step === 2" key="s2" class="space-y-4">
          <h3 class="text-lg font-bold text-foreground">Choose Vehicle</h3>
          <div v-for="(v, i) in vehicles" :key="i" @click="selectedVehicle = i"
            :class="`p-4 rounded-2xl border cursor-pointer transition-all press-scale ${
              selectedVehicle === i ? 'border-primary bg-primary/5' : 'border-border bg-card'
            }`">
            <div class="flex items-center gap-3">
              <div :class="`w-12 h-12 rounded-2xl flex items-center justify-center ${selectedVehicle === i ? 'bg-primary/20' : 'bg-muted'}`">
                <Car :size="22" :class="selectedVehicle === i ? 'text-primary' : 'text-muted-foreground'" />
              </div>
              <div class="flex-1">
                <div class="font-bold text-foreground">{{ v.make }}</div>
                <div class="text-xs text-muted-foreground">{{ v.type }} · {{ v.color }}</div>
              </div>
              <div class="flex flex-col items-end gap-1">
                <div class="text-sm font-black text-foreground tracking-wider">{{ v.plate }}</div>
                <div v-if="selectedVehicle === i" class="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check :size="11" class="text-white" />
                </div>
              </div>
            </div>
          </div>
          <button @click="addingVehicle = !addingVehicle"
            class="w-full p-4 rounded-2xl border border-dashed border-border flex items-center justify-center gap-2 text-muted-foreground hover:text-primary hover:border-primary transition-colors">
            <Plus :size="16" /> Add New Vehicle
          </button>
          <div v-if="addingVehicle" class="p-4 rounded-2xl bg-card border border-border space-y-3">
            <input placeholder="Plate number (e.g. RYD 1234)" v-model="plate"
              class="w-full p-3 rounded-xl bg-muted border border-border text-foreground text-sm outline-none focus:border-primary" />
            <div class="grid grid-cols-2 gap-3">
              <select class="p-3 rounded-xl bg-muted border border-border text-foreground text-sm outline-none">
                <option>Sedan</option><option>SUV</option><option>Pickup</option><option>Van</option>
              </select>
              <select class="p-3 rounded-xl bg-muted border border-border text-foreground text-sm outline-none">
                <option>White</option><option>Black</option><option>Silver</option><option>Red</option><option>Blue</option>
              </select>
            </div>
          </div>
        </div>

        <div v-else-if="step === 3" key="s3" class="space-y-4">
          <h3 class="text-lg font-bold text-foreground">Payment Method</h3>
          <div v-for="(pay, i) in payments" :key="i" @click="selectedPayment = i"
            :class="`p-4 rounded-2xl border cursor-pointer transition-all press-scale ${
              selectedPayment === i ? 'border-primary bg-primary/5' : 'border-border bg-card'
            }`">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                <BrandIcon v-if="pay.brand" :name="pay.brand" :size="22" />
                <CreditCard v-else :size="20" class="text-emerald-600" />
              </div>
              <div class="flex-1">
                <div class="font-bold text-foreground">{{ pay.name }}</div>
                <div v-if="pay.last" class="text-xs text-muted-foreground">···· {{ pay.last }}</div>
              </div>
              <div v-if="selectedPayment === i" class="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Check :size="11" class="text-white" />
              </div>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-card border border-border space-y-2">
            <h4 class="font-semibold text-foreground text-sm mb-3">Price Breakdown</h4>
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">Parking ({{ hours }}h × SAR {{ p.priceHour }})</span>
              <span class="text-foreground font-medium">SAR {{ total }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">Service fee</span>
              <span class="text-foreground font-medium">SAR 2</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">VAT (15%)</span>
              <span class="text-foreground font-medium">SAR {{ (Number(total) * 0.15).toFixed(0) }}</span>
            </div>
            <div class="pt-2 border-t border-border flex justify-between font-black text-foreground">
              <span>Total</span>
              <span>SAR {{ grandTotal }}</span>
            </div>
          </div>
        </div>

        <div v-else key="s4" class="text-center py-6 space-y-5">
          <div class="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center mx-auto">
            <Check :size="28" class="text-primary" />
          </div>
          <div>
            <h3 class="text-xl font-black text-foreground">Booking Ready!</h3>
            <p class="text-muted-foreground text-sm mt-1">Please review and confirm your reservation</p>
          </div>
          <div class="p-4 rounded-2xl bg-card border border-border text-left space-y-3">
            <div class="flex justify-between text-sm"><span class="text-muted-foreground">Parking</span><span class="text-foreground font-semibold">{{ p.name }}</span></div>
            <div class="flex justify-between text-sm"><span class="text-muted-foreground">Address</span><span class="text-foreground font-semibold">{{ p.address }}</span></div>
            <div class="flex justify-between text-sm"><span class="text-muted-foreground">Date</span><span class="text-foreground font-semibold">{{ date }}</span></div>
            <div class="flex justify-between text-sm"><span class="text-muted-foreground">Time</span><span class="text-foreground font-semibold">{{ arrival }} – {{ departure }}</span></div>
            <div class="flex justify-between text-sm"><span class="text-muted-foreground">Duration</span><span class="text-foreground font-semibold">{{ hours }} hour{{ hours !== 1 ? 's' : '' }}</span></div>
            <div class="flex justify-between text-sm"><span class="text-muted-foreground">Vehicle</span><span class="text-foreground font-semibold">{{ vehicles[selectedVehicle]?.plate || '–' }}</span></div>
            <div class="flex justify-between text-sm"><span class="text-muted-foreground">Payment</span><span class="text-foreground font-semibold">{{ payments[selectedPayment]?.name || '–' }}</span></div>
            <div class="pt-2 border-t border-border flex justify-between font-black text-foreground text-base">
              <span>Total</span><span>SAR {{ grandTotal }}</span>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <div class="px-4 py-4 border-t border-border shrink-0 flex gap-3">
      <button v-if="step > 1" @click="step--"
        class="px-5 py-3.5 rounded-2xl border border-border text-foreground font-semibold text-sm">
        Back
      </button>
      <button
        class="flex-1 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-base shadow-xl shadow-primary/30 press-scale"
        @click="next">
        {{ step === 4 ? 'Confirm & Pay' : 'Continue' }}
        <ArrowRight v-if="step < 4" :size="16" class="inline ml-2" />
      </button>
    </div>
  </div>
</template>
