<script lang="ts">
  import TypeSelector from './TypeSelector.svelte';

  export let value: Java.Method
  export let onRemove: () => any

  const addParam = () => {
    value.parameters = [...value.parameters, {
      id: '@primitive',
      name: 'char'
    }]
  }

  const removeParam = () => {
    value.parameters.pop()
    value.parameters = value.parameters
  }
</script>

<div>
  <strong>Method</strong>

  <div class="form-floating mb-3">
    <input type="email" class="form-control" id="floatingInput" bind:value={value.name} />
    <label for="floatingInput">Method name</label>
  </div>

  <div class="form-floating mb-3">
    <textarea class="form-control" id="floatingTextarea2" bind:value={value.description}></textarea>
    <label for="floatingTextarea2">Method description</label>
  </div>

  <div class="mb-3">
    <span>Return type</span>
    <TypeSelector bind:value={value.type} />
  </div>

  <div class="mb-3">
    {#if value.parameters.length}
      <span>Parameters</span>
      {#each value.parameters as p, i (i)}
        <TypeSelector bind:value={p} />
      {/each}
    {/if}
  </div>

  <div class="text-end">
    <button type="button" class="btn btn-info btn-sm me-2" on:click={addParam}>Add param</button>
    {#if value?.parameters.length}
      <button type="button" class="btn btn-warning btn-sm me-2" on:click={removeParam}>Remove param</button>
    {/if}
    <button type="button" class="btn btn-danger btn-sm" on:click={onRemove}>Remove</button>
  </div>
</div>