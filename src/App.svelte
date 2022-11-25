<script lang="ts">
  import yaml from 'js-yaml'
  import jsPDF from 'jspdf'
  import { convertToHtml } from './lib/view'
  import Editor from './components/Editor.svelte';
  import JavaClass from './components/JavaClass.svelte'

  let importEl: HTMLInputElement
  let data: ExamQuestion = {
    title: '',
    description: '',
    classes: [],
    input: '',
    output: '',
    samples: []
  }

  const getData = () => {
    return {
      ...data,
      //description: getDescription?.call(null) ?? data.description
    } as ExamQuestion
  }

  const addClass = () => {
    if (!Array.isArray(data.classes))
      data.classes = []

    data.classes = [...data.classes, {
      id: Math.random(),
      methods: [],
      properties: [],
      name: '',
      description: ''
    }]
  }

  const removeClass = (id: number) => {
    if (Array.isArray(data.classes))
      data.classes = data.classes.filter(c => c.id !== id)
  }

  const addSample = () => {
    if (!Array.isArray(data.samples))
      data.samples = []

    data.samples = [...data.samples, {
      input: '',
      output: '',
    }]
  }

  const removeSample = () => {
    if (Array.isArray(data.samples)) {
      data.samples.pop()
      data.samples = data.samples
    }
  }

  const syncView = () => {
    const el = document.querySelector('#markdown-content')
    el!.innerHTML = convertToHtml(getData())
  }

  const getPdf = () => {
    syncView()
    new jsPDF('p', 'pt', 'letter').html(document.getElementById('markdown-content'), {
      callback: (doc) => {
        doc.save('example-question.pdf')
      },
      image: {
        type: 'jpeg',
        quality: 10
      }
    })
  }

  const importData = () => {
    importEl?.click()
  }

  const onFileChange = () => {
    const file = importEl.files[0]
    if (file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        const content = e.target.result as string;
        try {
          data = yaml.load(content) as ExamQuestion
          //setDescription(data.description)
        } catch (err) {
          console.error('failed to import raw data', err)
        }
      };
      reader.readAsText(file);
    }
  }

  const exportData = () => {
    const exported = yaml.dump(getData())
    const a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(exported));
    a.setAttribute('download', 'exam-question.yml');
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
</script>

<main>
  <div class="text-end p-2">
      <button type="button" class="btn btn-success btn-sm me-2" on:click={syncView}>Sync view</button>
      <button type="button" class="btn btn-secondary btn-sm me-2" on:click={getPdf}>Get PDF</button>
      <button type="button" class="btn btn-warning btn-sm me-2" on:click={importData}>Import</button>
      <button type="button" class="btn btn-dark btn-sm" on:click={exportData}>Export</button>

      <input bind:this={importEl} type="file" hidden on:change={onFileChange} multiple={false} />
  </div>
    <div class="row">
      <div class="col left-side">
        <div class="form-input mb-3">
          Title
          <input class="form-control" bind:value={data.title} />
        </div>

        <div class="form-input mb-3">
          Description
          <Editor bind:data={data.description} />
        </div>

        <!-- <div class="form-input mb-3">
          Output
          <textarea class="form-control" bind:value={data.output}></textarea>
        </div> -->

        <div class="text-end">
          <button type="button" class="btn btn-primary btn-sm me-2" on:click={addClass}>Add class</button>
        </div>

        <div>
          {#each data.classes as c (c.id)}
            <JavaClass bind:value={c} onRemove={() => removeClass(c.id)} />
          {/each}
        </div>

        <div class="form-input mb-3">
          Input
          <Editor bind:data={data.input} />
        </div>

        <div class="form-input mb-3">
          Output
          <Editor bind:data={data.output} />
        </div>
 
        <div class="text-end">
          <button type="button" class="btn btn-primary btn-sm me-2" on:click={addSample}>Add sample</button>
          {#if (data.samples?.length)}
            <button type="button" class="btn btn-warning btn-sm me-2" on:click={removeSample}>Remove sample</button>
          {/if}
        </div>

        {#if Array.isArray(data.samples)}
          {#each data.samples as sample, i (i)}
            <div>
              <h6>Sample #{i+1}</h6>
              <div class="form-input mb-3">
                Input
                <textarea class="form-control" bind:value={sample.input}></textarea>
              </div>
              <div class="form-input mb-3">
                Output
                <textarea class="form-control" bind:value={sample.output}></textarea>
              </div>
            </div>
          {/each}
        {/if}

      </div>
      <div class="col right-side ms-3">
        <article class="markdown-body p-3" id="markdown-content">
        </article>
      </div>
    </div>
</main>

<style>

</style>