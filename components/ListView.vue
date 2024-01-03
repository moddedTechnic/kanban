<script setup lang="ts">
import TaskView from '~/components/TaskView.vue'
import type { Task } from '~/utils/types'

defineProps<{ title: string, tasks: Task[] }>()
defineEmits<{
  (e: 'deleteTask', id: string): void
}>()
</script>

<template>
  <section class="list">
    <h2>{{ title }}</h2>
    <ul>
      <template v-for="task in tasks" :key="task.id">
        <li>
          <TaskView v-bind="task" @delete="id => $emit('deleteTask', id)" />
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
