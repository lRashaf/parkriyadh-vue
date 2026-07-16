<script setup>
import { CheckCircle, AlertCircle, Info, X } from 'lucide-vue-next'
import { NOTIFICATIONS } from '../data.js'

const emit = defineEmits(['close'])
const iconMap = {
  success: { icon: CheckCircle, cls: 'text-emerald-400 bg-emerald-500/15' },
  warning: { icon: AlertCircle, cls: 'text-amber-400 bg-amber-500/15' },
  info: { icon: Info, cls: 'text-sky-400 bg-sky-500/15' },
}
</script>

<template>
  <div class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" @click="emit('close')">
    <div
      class="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-card border-l border-border shadow-2xl overflow-y-auto"
      @click.stop
    >
      <div class="sticky top-0 bg-card border-b border-border px-4 py-4 flex items-center justify-between z-10">
        <div>
          <h2 class="font-bold text-foreground">Notifications</h2>
          <p class="text-xs text-muted-foreground">2 unread</p>
        </div>
        <button @click="emit('close')" class="w-8 h-8 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground">
          <X :size="15" />
        </button>
      </div>
      <div class="p-4 space-y-3">
        <div v-for="n in NOTIFICATIONS" :key="n.id"
          :class="`p-3 rounded-2xl border flex items-start gap-3 cursor-pointer transition-colors hover:translate-x-1 ${
            !n.read ? 'border-primary/20 bg-primary/5' : 'border-border bg-background'
          }`" style="transition: transform .2s ease">
          <div :class="`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconMap[n.type].cls}`">
            <component :is="iconMap[n.type].icon" :size="16" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
              <p class="text-sm font-semibold text-foreground">{{ n.title }}</p>
              <div v-if="!n.read" class="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
            </div>
            <p class="text-xs text-muted-foreground mt-0.5">{{ n.body }}</p>
            <p class="text-[10px] text-muted-foreground/70 mt-1">{{ n.time }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
