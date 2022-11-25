import { writable } from 'svelte/store'

export const types = writable<Java.Type[]>([
  {
    id: '@primitive',
    name: 'void'
  },
  {
    id: '@primitive',
    name: 'char'
  },
  {
    id: '@primitive',
    name: 'int'
  },
  {
    id: '@primitive',
    name: 'double'
  },
  {
    id: '@primitive',
    name: 'boolean'
  },
  {
    id: '@primitive',
    name: 'string'
  },
  {
    id: '@primitive',
    name: 'float'
  },
  {
    id: '@primitive',
    name: 'long'
  },
  {
    id: '@primitive',
    name: 'byte'
  },
  {
    id: '@primitive',
    name: 'short'
  },
])