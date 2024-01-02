<script setup lang="ts">
import Tag from './Tag.vue'

import { type Item } from '~/utils/types'

defineProps<Item>()
defineEmits<{
  (e: 'delete', id: string): void
}>()
</script>

<template>
  <article>
    <p class="delete" @click.prevent="$emit('delete', id)">
      X
    </p>
    <h3>{{ title }}</h3>
    <div class="tags">
      <template v-for="tag in tags" :key="tag">
        <Tag :name="tag" />
      </template>
    </div>
  </article>
</template>

<style scoped>
article {
  padding: 0.5rem 1rem;

  background-color: #fff2;
  border-radius: 4px;
}

article:hover {
  background-color: #fff4;
}

h3 {
  margin: 0;
  margin-bottom: 0.5rem;
}

.tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
}

.delete {
  cursor: pointer;
}
</style>
