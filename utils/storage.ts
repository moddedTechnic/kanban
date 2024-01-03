import type { Task, Status } from './types'

type Stores = 'tasks' | 'statuses'

export function save(store: 'tasks', value: Task[]): void;
export function save(store: 'statuses', value: Status[]): void;
export function save(store: Stores, value: any) {
  if (process.client) {
    localStorage.setItem(store, JSON.stringify(value))
  }
}

export function load(store: 'tasks'): Task[];
export function load(store: 'statuses'): Status[];
export function load(store: Stores) {
  if (process.server) {
    throw new Error('Cannot load from store on the server')
  }
  let orelse
  switch (store) {
    case 'statuses':
      orelse = [] as Status[]
      break
    case 'tasks':
      orelse = [] as Task[]
      break
  }
  return JSON.parse(
    localStorage.getItem(store) ?? 'null'
  ) ?? orelse
}

export function useStore(name: 'tasks'): Task[];
export function useStore(name: 'statuses'): Status[];
export function useStore(name: Stores): Task[] | Status[] {
  // @ts-ignore
  const store = reactive(load(name))
  // @ts-ignore
  watch(store, value => save(name, value))
  return store
}
