<script setup lang="ts">
import IconClose from '~/components/icons/close.vue'
import Tag from '~/components/Tag.vue'

import type { Task } from '~/utils/types'

defineProps<Task>()
defineEmits<{
  (e: 'delete', id: string): void
}>()
</script>

<template>
  <article>
    <div class="title-line">
      <h3>{{ title }}</h3>
      <IconClose class="delete" @click.prevent="$emit('delete', id)" />
    </div>
    <div class="tags">
      <template v-for="tag in tags" :key="tag">
        <Tag :name="tag" />
      </template>
    </div>
  </article>
</template>

<style scoped>
article {
  position: relative;
  padding: 0.5rem 0.1rem 0.5rem 1rem;

  background-color: #fff2;
  border-radius: 4px;

  transition: background-color 175ms ease-in-out;
}

article:hover {
  background-color: #fff4;
}

.title-line {
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  justify-content: space-between;
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
  /* position: absolute; */
  /* top: 0.5rem; */
  /* right: 0.125rem; */
  height: 1.5rem;
  transform: rotate(0deg);

  cursor: pointer;
  fill: hsl(0 70% 100%);

  transition: fill 175ms ease-in-out, transform 175ms ease-in-out;
}

.delete:hover {
  transform: rotate(180deg);
  fill: hsl(0 70% 70%);
}
</style>
