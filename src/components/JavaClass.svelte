<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import JavaMethod from './JavaMethod.svelte'
  import JavaProperty from './JavaProperty.svelte'
  import { types } from '../lib/stores'

  export let value: Java.Class
  export let onRemove: () => any

  const onNameChange = () => {
    types.set([...$types.filter(t => t.id !== value.id), {
      id: value.id,
      name: value.name
    }])
  }

  onMount(() => {
    $types = [...$types, {
      id: value.id,
      name: value.name
    }]
  })

  onDestroy(() => remove())

  const remove = () => {
    $types == $types.filter(t => t.id !== value.id)
    onRemove()
  }

  const addMethod = () => {
    value.methods = [...value.methods, {
      id: Math.random(),
      name: '',
      description: '',
      parameters: [],
      type: {
        id: '@primitive',
        name: 'void'
      }
    }]
  }

  const removeMethod = (id: number) => {
    value.methods = value.methods.filter(m => m.id !== id)
  }

  const addProperty = () => {
    value.properties = [...value.properties, {
      id: Math.random(),
      name: '',
      description: '',
      type: {
        id: '@primitive',
        name: 'int'
      }
    }]
  }

  const removeProperty = (id: number) => {
    value.properties = value.properties.filter(p => p.id !== id)
  }
</script>

<div class="mt-4">
  <strong>Class</strong>

  <div class="form-floating mb-3">
    <input type="email" class="form-control" id="floatingInput" bind:value={value.name} on:change={onNameChange} />
    <label for="floatingInput">Class name</label>
  </div>

  <div class="form-floating mb-3">
    <textarea class="form-control" id="floatingTextarea2" bind:value={value.description}></textarea>
    <label for="floatingTextarea2">Class description</label>
  </div>

  <div class="text-end">
    <button type="button" class="btn btn-secondary btn-sm me-2" on:click={addProperty}>Add property</button>
    <button type="button" class="btn btn-success btn-sm me-2" on:click={addMethod}>Add method</button>
    <button type="button" class="btn btn-danger btn-sm" on:click={remove}>Remove</button>
  </div>

  <div class="ms-3 mt-3">
    {#each value.properties as p (p.id)}
      <JavaProperty bind:value={p} onRemove={() => removeProperty(p.id)} />
    {/each}
  </div>

  <div class="ms-3 mt-3">
    {#each value.methods as m (m.id)}
      <JavaMethod bind:value={m} onRemove={() => removeMethod(m.id)} />
    {/each}
  </div>
</div>