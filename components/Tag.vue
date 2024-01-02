<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ name: string }>()

const hue = computed(() =>
  props.name.split('').map(c => c.charCodeAt(0)).reduce((acc, x) => acc + x) % 360
)
</script>

<template>
  <span :style="`--hue:${hue}deg;`">{{ name }}</span>
</template>

<style scoped>
span {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background-color: hsl(var(--hue) 75% 40%);

  transition: background-color 175ms ease-in-out;
}

span:hover {
  background-color: hsl(var(--hue) 75% 30%);
}
</style>
