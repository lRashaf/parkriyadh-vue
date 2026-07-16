<script setup>
import { siApplepay, siVisa, siMastercard } from 'simple-icons'

const ICONS = { siApplepay, siVisa, siMastercard }

const props = defineProps({
  name: { type: String, required: true }, // e.g. 'siApplepay'
  size: { type: Number, default: 22 },
  color: { type: String, default: '' }, // override; default uses brand hex
})

const icon = ICONS[props.name]
</script>

<template>
  <svg v-if="icon" :width="size" :height="size" viewBox="0 0 24 24" :fill="color || `#${icon.hex}`">
    <path :d="icon.path" />
  </svg>
</template>
