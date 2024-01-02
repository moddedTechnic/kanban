<script setup lang="ts">
import ListView from '~/components/ListView.vue'
import MultiSelect from '~/components/MultiSelect.vue'
import { type Item } from '~/utils/types'

const statuses = [
  'To Do',
  'In Progress',
  'Done',
]

const list: Item[] = reactive([
  {
    status: 'To Do',
    title: 'Serialize',
    id: '0000',
    tags: ['backend', 'filesystem']
  },
  {
    status: 'In Progress',
    title: 'Display KanBan',
    id: '0001',
    tags: ['frontend', 'board']
  },
  {
    status: 'Done',
    title: 'Create test items',
    id: '0002',
    tags: ['test']
  },
  {
    status: 'To Do',
    title: 'Vary tag colours more',
    id: '0003',
    tags: ['frontend', 'colours']
  }
])

const tags = computed(() => {
  const tags: string[] = []
  list.forEach(item => item.tags.forEach(
    tag => tags.includes(tag) ? undefined : tags.push(tag))
  )
  return tags
})
const activeTags = reactive<string[]>([])

const itemsByStatus = computed(() => {
  const itemsByStatus: Record<string, Item[]> = {}
  for (const item of list) {
    if (!itemsByStatus[item.status]) {
      itemsByStatus[item.status] = []
    }
    if (activeTags.length === 0 || activeTags.map(tag => item.tags.includes(tag)).reduce((a, b) => a || b, false)) {
      itemsByStatus[item.status].push(item)
    }
  }
  return itemsByStatus
})

function deleteItem(id: string) {
  const index = list.findIndex(item => item.id === id)
  if (index !== -1) {
    list.splice(index, 1)
  }
}
</script>

<template>
  <main>
    <div class="controls">
      <div class="tag-filter">
        <label for="filter-tags">Tags</label>
        <MultiSelect id="filter-tags" v-model="activeTags" :options="tags" />
      </div>
    </div>

    <div v-if="list.length === 0" class="blank-board">
      <p>
        No items to show
      </p>
    </div>
    <div v-else class="board">
      <template v-for="status in statuses" :key="status">
        <template v-if="itemsByStatus[status]?.length > 0">
          <ListView :title="status" :items="itemsByStatus[status]" @delete-item="deleteItem" />
        </template>
      </template>
    </div>
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
