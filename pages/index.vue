<script setup lang="ts">
import ListView from '~/components/ListView.vue'
import MultiSelect from '~/components/MultiSelect.vue'
import IconAdd from '~/components/icons/add.vue'
import NewTaskModal from '~/components/modals/NewTask.vue'

import { useStore } from '~/utils/storage'
import type { Task } from '~/utils/types'

const statuses = useStore('statuses')
const list = useStore('tasks')

const year = computed(() => new Date().getFullYear())

const tags = computed(() => {
  const tags: string[] = []
  list.forEach(task => task.tags.forEach(
    tag => tags.includes(tag) ? undefined : tags.push(tag))
  )
  return tags
})
const activeTags = reactive<string[]>([])

const tasksByStatus = computed(() => {
  const tasksByStatus: Record<string, Task[]> = {}
  for (const task of list) {
    if (!tasksByStatus[task.status]) {
      tasksByStatus[task.status] = []
    }
    if (activeTags.length === 0 || activeTags.map(tag => task.tags.includes(tag)).reduce((a, b) => a || b, false)) {
      tasksByStatus[task.status].push(task)
    }
  }
  return tasksByStatus
})

function deleteTask(id: string) {
  const index = list.findIndex(task => task.id === id)
  if (index !== -1) {
    list.splice(index, 1)
  }
}

const showNewTask = ref(false)
function createTask({ status, ...partial }: Omit<Task, 'id'>) {
  let statusId = statuses.find(s => s.name === status)?.id
  if (!statusId) {
    statusId = crypto.randomUUID()
    statuses.push({ id: statusId, name: status })
  }
  list.push({ ...partial, status: statusId, id: crypto.randomUUID() })
}
</script>

<template>
  <main>
    <div class="controls">
      <IconAdd class="add" :data-open="showNewTask" @click.prevent="showNewTask = !showNewTask" />

      <div class="tag-filter">
        <label for="filter-tags">Tags</label>
        <MultiSelect id="filter-tags" v-model="activeTags" :options="tags" />
      </div>
    </div>

    <div v-if="list.length === 0" class="blank-board">
      <p>
        No tasks to show
      </p>
    </div>
    <div v-else class="board">
      <template v-for="status in statuses" :key="status">
        <template v-if="tasksByStatus[status.id]?.length > 0">
          <ListView :title="status.name" :tasks="tasksByStatus[status.id]" @delete-task="deleteTask" />
        </template>
      </template>
    </div>

    <NewTaskModal :open="showNewTask" :available-tags="tags" :available-statuses="statuses" @close="showNewTask = false"
      @create-task="createTask" />

    <footer>
      <p>
        This site uses cookies to store your to-do list
      </p>
      <p>
        &copy; Jonathan Leeming {{ year }}
      </p>
    </footer>
  </main>
</template>

<style scoped>
main {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;

  width: 100vw;
  height: 100vh;
}

footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  padding-block: 0.5rem;
}

footer>* {
  margin-block: 0.5rem 0;
  margin-inline: auto;
}

.controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  padding: 1rem;
}

.tag-filter {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
}

.add {
  cursor: pointer;
  fill: hsl(0 70% 100%);
  transform: rotate(0deg);
  transition: transform 175ms ease-in-out, opacity 175ms ease-in-out;
}

.add:hover {
  fill: hsl(120deg 70% 70%);
  transform: rotate(180deg);
}

.add[data-open="true"] {
  opacity: 0;
}

.blank-board {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  flex-grow: 999;

  font-size: 2rem;
}

.board {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  gap: 1.5rem;

  flex-grow: 999;
  margin-top: 2rem;
  padding-inline: 1rem;
  padding-bottom: 1rem;
  overflow-x: scroll;
}

.board>* {
  flex-basis: 15rem;
  min-width: 15rem;
}
</style>

<style>
body {
  background-color: #000;
  color: #fff;

  margin: 0;
}

input,
button,
textarea {
  font: inherit;
  background: transparent;
  color: currentColor;
}
</style>
