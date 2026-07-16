<script setup>
import { ref } from 'vue'
import { Sun, Moon, Bell, Menu } from 'lucide-vue-next'

const props = defineProps({
  isDark: { type: Boolean, required: true },
  view: { type: String, required: true },
  unread: { type: Number, default: 0 },
})
const emit = defineEmits(['toggle-dark', 'navigate', 'notif-click'])

const mobileOpen = ref(false)
const links = [
  { label: 'Map', view: 'home' },
  { label: 'Reservations', view: 'reservations' },
  { label: 'Dashboard', view: 'dashboard' },
  { label: 'Admin', view: 'admin' },
]
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 h-16">
    <div class="h-full bg-card/80 backdrop-blur-xl border-b border-border flex items-center px-4 gap-4">
      <div class="flex items-center gap-2 shrink-0">
        <div class="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/40">
          <span class="text-white font-black text-sm">P</span>
        </div>
        <span class="font-black text-foreground text-base hidden sm:block">ParkRiyadh</span>
      </div>

      <nav class="hidden md:flex items-center gap-1 ml-4 flex-1">
        <button v-for="l in links" :key="l.view" @click="emit('navigate', l.view)"
          :class="`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${
            view === l.view ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`">
          {{ l.label }}
        </button>
      </nav>

      <div class="flex-1 md:flex-none" />

      <div class="flex items-center gap-2">
        <button @click="emit('toggle-dark')" class="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors press-scale">
          <Sun v-if="isDark" :size="16" />
          <Moon v-else :size="16" />
        </button>

        <button @click="emit('notif-click')"
          class="relative w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <Bell :size="16" />
          <span v-if="unread > 0" class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-black flex items-center justify-center">
            {{ unread }}
          </span>
        </button>

        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-violet-700 flex items-center justify-center text-white font-black text-sm cursor-pointer">
          A
        </div>

        <button @click="mobileOpen = !mobileOpen"
          class="md:hidden w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground">
          <Menu :size="16" />
        </button>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="mobileOpen"
        class="absolute top-full left-0 right-0 bg-card/95 backdrop-blur-xl border-b border-border p-3 flex flex-col gap-1 md:hidden">
        <button v-for="l in links" :key="l.view" @click="emit('navigate', l.view); mobileOpen = false"
          :class="`px-4 py-2.5 rounded-xl text-sm font-semibold text-left transition-colors ${
            view === l.view ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`">
          {{ l.label }}
        </button>
      </div>
    </Transition>
  </header>
</template>
