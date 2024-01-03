<script setup lang="ts">
import { ref, watch } from 'vue'

import MultiSelect from '~/components/MultiSelect.vue'
import type { Task, Status } from '~/utils/types'

const props = defineProps<{
  open: boolean,
  availableStatuses: Status[],
  availableTags: string[],
}>()
const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'createTask', Task: Omit<Task, 'id'>): void
}>()

const modal = ref<HTMLDialogElement | undefined>()

watch(() => props.open, (open) => {
  if (open) {
    modal.value?.showModal()
  } else {
    modal.value?.close()
  }
})

function keydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
  }
}

const title = ref('')
const status = ref('')
const tags = ref<string[]>([])

function submit() {
  emit('createTask', {
    title: title.value,
    tags: tags.value,
    status: status.value
  })
  emit('close')

  title.value = ''
  status.value = ''
  tags.value = []
}
</script>

<template>
  <dialog ref="modal" @keydown="keydown">
    <datalist id="statuses">
      <template v-for="s in availableStatuses" :key="s">
        <option :value="s.name" />
      </template>
    </datalist>
    <form @submit.prevent="submit">
      <label for="title">
        Title
      </label>
      <input id="title" v-model="title" type="text">

      <label for="status">
        Status
      </label>
      <input id="status" v-model="status" type="search" list="statuses">

      <label for="tags">
        Tags
      </label>
      <MultiSelect id="tags" v-model="tags" :options="availableTags" />

      <div />

      <button type="submit">
        Create
      </button>
    </form>
  </dialog>
</template>

<style scoped>
::backdrop {
  background-color: #0008;
}

dialog {
  color: white;
  background-color: #000;
  border: none;
  border-radius: 8px;
  outline: none;
  padding: 0;
}

form {
  background-color: #fff2;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem 0.5rem;
  place-items: center;
}

input {
  padding: 0.25rem;
  border: 1px solid hsl(0 0% 100%);
  border-radius: 8px;
  outline: none;
}

button[type="submit"] {
  color: hsl(0 0% 100%);
  background-color: #fff0;
  margin-left: auto;
  border: none;
  border-radius: 4px;
  outline: 1px solid #fff;
  cursor: pointer;

  transition: background-color 250ms ease-in-out, color 250ms ease-in-out;
}

button[type="submit"]:hover {
  color: hsl(0 0% 0%);
  background-color: #ffff;
}

button[type="submit"]:is(:focus, :focus-visible, :focus-within) {
  outline-width: 4px;
}
</style>
