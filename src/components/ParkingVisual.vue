<script setup>
import { computed } from 'vue'
import { ShoppingBag, Building2, Briefcase, LayoutGrid, Car } from 'lucide-vue-next'

const props = defineProps({
  p: { type: Object, required: true },
  size: { type: String, default: 'card' }, // 'hero' | 'card' | 'thumb'
})

const TYPE_MAP = {
  Mall: { icon: ShoppingBag, from: '#7B62FF', to: '#4C3AB8', label: 'مول' },
  Tower: { icon: Building2, from: '#4CC9F0', to: '#2A7FA8', label: 'برج' },
  Business: { icon: Briefcase, from: '#F59E0B', to: '#B4740A', label: 'أعمال' },
  Complex: { icon: LayoutGrid, from: '#EC4899', to: '#A83A70', label: 'مجمع' },
}

const conf = computed(() => TYPE_MAP[props.p.type] || TYPE_MAP.Mall)

// deterministic "floor levels" decoration derived from the id, purely visual
const levels = computed(() => {
  const seed = props.p.id.charCodeAt(props.p.id.length - 1)
  const n = 3 + (seed % 3)
  return Array.from({ length: n }, (_, i) => `P${i + 1}`)
})
</script>

<template>
  <div
    class="relative w-full h-full overflow-hidden"
    :style="{ background: `linear-gradient(135deg, ${conf.from}, ${conf.to})` }"
  >
    <!-- dot grid texture -->
    <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px); background-size: 14px 14px;" />
    <!-- diagonal sheen -->
    <div class="absolute -inset-y-10 -left-10 w-1/2 opacity-10 bg-white" style="transform: skewX(-20deg);" />

    <template v-if="size !== 'thumb'">
      <!-- floor level chips -->
      <div class="absolute top-3 right-3 flex gap-1">
        <span v-for="lvl in levels" :key="lvl"
          class="px-1.5 py-0.5 rounded-md bg-black/25 text-white/80 text-[9px] font-bold font-mono backdrop-blur-sm">
          {{ lvl }}
        </span>
      </div>

      <!-- barrier stripe motif -->
      <div class="absolute bottom-0 inset-x-0 h-2 opacity-70"
        style="background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.9) 0 10px, rgba(200,30,30,0.9) 10px 20px);" />
    </template>

    <div class="absolute inset-0 flex items-center justify-center">
      <div :class="size === 'hero' ? 'w-24 h-24' : size === 'card' ? 'w-16 h-16' : 'w-8 h-8'"
        class="rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center">
        <component :is="conf.icon" :size="size === 'hero' ? 40 : size === 'card' ? 26 : 14" class="text-white" />
      </div>
    </div>

    <div v-if="size !== 'thumb'" class="absolute bottom-2 left-3 flex items-center gap-1.5">
      <Car :size="11" class="text-white/70" />
      <span class="text-white/70 text-[10px] font-semibold">{{ conf.label }}<template v-if="p.total"> · {{ p.total }} موقف</template></span>
    </div>
  </div>
</template>
