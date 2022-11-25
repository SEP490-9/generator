<script lang="ts">
    import "../style.scss";

    import Char from './Char.svelte'
    import MatrixChar from "./MatrixChar.svelte";
    import MatrixNumber from "./MatrixNumber.svelte";
    import Number from "./Number.svelte";

    let selectedType: string
</script>

<select class="form-select" aria-label="Default select example" bind:value={selectedType}>
    <option selected>--- Select type ---</option>
    <option value="0">Whitespace</option>
    <option value="1">Newline</option>
    <option value="2">Character</option>
    <option value="3">Number</option>
    <option value="4">String</option>
    <option value="5">Name (string)</option>
    <option value="6">Email (string)</option>
    <option value="7">Character matrix</option>
    <option value="8">Number matrix</option>
</select>

<button class="btn btn-primary mt-2">Add type</button>

<Char />
<Number />
<MatrixChar />
<MatrixNumber />

<style>
    :global(body) {
        max-width: 800px;
        margin: 20px auto;
    }
</style>