<script setup>
import { Star } from 'lucide-vue-next'
const props = defineProps({
  rating: { type: Number, required: true },
  size: { type: Number, default: 12 },
})
</script>

<template>
  <div class="flex items-center gap-0.5">
    <Star v-for="i in [1,2,3,4,5]" :key="i" :size="size"
      :fill="i <= Math.round(rating) ? '#F59E0B' : 'none'"
      :class="i <= Math.round(rating) ? 'text-amber-400' : 'text-muted-foreground/40'" />
  </div>
</template>
