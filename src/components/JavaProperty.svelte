<script lang="ts">
  import TypeSelector from './TypeSelector.svelte'
  export let value: Java.Property
  export let onRemove: () => any
</script>

<div>
  <strong>Property</strong>

  <div class="form-floating mb-3">
    <input type="email" class="form-control" id="floatingInput" bind:value={value.name} />
    <label for="floatingInput">Property name</label>
  </div>

  <div class="form-floating mb-3">
    <textarea class="form-control" id="floatingTextarea2" bind:value={value.description}></textarea>
    <label for="floatingTextarea2">Property description</label>
  </div>

  <div class="mb-3">
    <TypeSelector bind:value={value.type} />
  </div>

  <div class="text-end">
    <button type="button" class="btn btn-danger btn-sm" on:click={onRemove}>Remove</button>
  </div>
</div>