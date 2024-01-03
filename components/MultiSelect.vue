<script setup lang="ts">
import { computed, ref } from 'vue'

import Tag from './Tag.vue'

const props = defineProps<{ id: string, options: string[] }>()

const selected = defineModel<string[]>()
const unselected = computed(() => props.options.filter(o => !selected.value?.includes(o)))

const optionInput = ref<HTMLInputElement | null>(null)
const freeTagInput = ref('')
function freeSelect() {
  if (freeTagInput.value) {
    selected.value?.push(freeTagInput.value)
  }
  freeTagInput.value = ''
  optionInput.value?.focus()
}

function deselect(option: string) {
  const index = selected.value?.indexOf(option) ?? -1
  if (index !== -1) {
    selected.value?.splice(index, 1)
  }
  optionInput.value?.focus()
}

function keypress(event: KeyboardEvent) {
  if (event.key === 'Backspace' && !freeTagInput.value) {
    selected.value?.pop()
    return
  }
  if (event.key === ' ' || event.key === ',' || event.key === ';') {
    freeSelect()
    event.preventDefault()
  }
}
</script>

<template>
  <div>
    <div :id="id" class="select" @click="optionInput?.focus">
      <datalist :id="`${id}-options`">
        <template v-for="option in unselected" :key="option">
          <option :value="option" />
        </template>
      </datalist>

      <div class="selected">
        <template v-for="s in selected" :key="s">
          <Tag :name="s" @click="deselect(s)" />
        </template>
        <form @submit.prevent="freeSelect">
          <input ref="optionInput" v-model="freeTagInput" type="search" :list="`${id}-options`" @keydown="keypress">
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.selected {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25rem;

  padding: 0.25rem;
  border: 1px solid #fff;
  border-radius: 8px;
}

form {
  flex-grow: 999;
  flex-basis: 5rem;
}

input[type="search"] {
  border: none;
  outline: none;
  width: 100%;
}
</style>
