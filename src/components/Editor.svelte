<script lang="ts">
    import { onMount } from 'svelte'
    import 'ckeditor'

    export let data: string = ''

    let data2 = data
    let editor: HTMLElement
    let ck: CKEDITOR.editor

    $: if (data !== data2) {
        ck?.setData(data)
        data2 = data
    }

    onMount(async () => {
        ck = CKEDITOR.replace(editor as HTMLTextAreaElement)
        ck.setData(data)
        ck.on('change', () => {
            data = data2 = ck.getData()
        })
    })
</script>

<div bind:this={editor}>
</div>