<script setup lang="ts">
import ListView from '~/components/ListView.vue'
import MultiSelect from '~/components/MultiSelect.vue'
import IconAdd from '~/components/icons/add.vue'
import NewItemModal from '~/components/modals/NewItem.vue'

import { useStore } from '~/utils/storage'
import { type Item } from '~/utils/types'

const statuses = useStore('statuses')
const list = useStore('tasks')

const year = computed(() => new Date().getFullYear())

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

const showNewItem = ref(false)
function createItem({ status, ...partial }: Omit<Item, 'id'>) {
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
      <IconAdd class="add" :data-open="showNewItem" @click.prevent="showNewItem = !showNewItem" />

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
        <template v-if="itemsByStatus[status.id]?.length > 0">
          <ListView :title="status.name" :items="itemsByStatus[status.id]" @delete-item="deleteItem" />
        </template>
      </template>
    </div>

    <NewItemModal :open="showNewItem" :available-tags="tags" :available-statuses="statuses" @close="showNewItem = false"
      @create-item="createItem" />

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
