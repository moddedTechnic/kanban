<script setup lang="ts">
import ItemView from '~/components/ItemView.vue'
import { type Item } from '~/utils/types'

defineProps<{ title: string, items: Item[] }>()
defineEmits<{
  (e: 'deleteItem', id: string): void
}>()
</script>

<template>
  <section class="list">
    <h2>{{ title }}</h2>
    <ul>
      <template v-for="item in items" :key="item.id">
        <li>
          <ItemView v-bind="item" @delete="id => $emit('deleteItem', id)" />
        </li>
      </template>
    </ul>
  </section>
</template>

<style scoped>
h2 {
  margin: 0;
}

ul {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
  margin-top: 1rem;
}

.list {
  background-color: #fff2;
  border-radius: 8px;
  padding: 0.5rem;
}
</style>
