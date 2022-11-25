<script lang="ts">
  import { types } from '../lib/stores'
  export let value: Java.Type
</script>

<select class="form-select" bind:value={value.name}>
  <option selected value="none" disabled>-- type --</option>
  {#each $types as t, i (i)}
    <option value={t.name}>{t.name}</option>
  {/each}
</select>