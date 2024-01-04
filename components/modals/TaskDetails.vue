<script setup lang="ts">
import { ref, watch } from 'vue'

import MultiSelect from '~/components/MultiSelect.vue'
import IconClose from '~/components/icons/close.vue'
import type { Task, Status } from '~/utils/types'

const props = defineProps<{
  task: Task | undefined,
  availableStatuses: Status[],
  availableTags: string[],
}>()
const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'updateTask', task: Task): void
}>()

const modal = ref<HTMLDialogElement | undefined>()

const title = ref('')
const status = ref('')
const tags = ref<string[]>([])

watch(() => props.task, (task) => {
  if (task) {
    modal.value?.showModal()
    title.value = task.title
    status.value = props.availableStatuses.find(status => task.status === status.id)?.name ?? ''
    tags.value = task.tags
  } else {
    modal.value?.close()
  }
})

function keydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
  }
}

function submit() {
  if (!props.task) {
    return
  }
  emit('updateTask', {
    id: props.task.id,
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

    <div class="wrapper">
      <IconClose class="close" @click.prevent="$emit('close')" />

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
        <MultiSelect id="tags" v-model="tags" class="select" :options="availableTags" />

        <div />

        <button type="submit">
          Update
        </button>
      </form>
    </div>
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

dialog>.wrapper {
  background-color: #fff2;
  padding: 1rem;
  padding-top: 0.25rem;
}

.close {
  display: block;

  height: 2rem;
  margin-bottom: 0.5rem;
  margin-left: auto;
  transform: rotate(0deg);

  cursor: pointer;
  fill: hsl(0 70% 100%);

  transition: fill 175ms ease-in-out, transform 175ms ease-in-out;
}

.close:hover {
  transform: rotate(180deg);
  fill: hsl(0 70% 70%);
}

form {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem 0.75rem;
  place-items: center;
}

form> :nth-child(2n) {
  justify-self: start;
}

form> :nth-child(2n + 1) {
  justify-self: end;
}

input,
.select {
  width: 20rem;
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
