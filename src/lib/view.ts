import { marked } from 'marked'

function markdownToHtml(markdown: string) {
  return marked.parse(markdown)
}

export function convertToHtml(data: ExamQuestion): string {
  const contents: string[] = []

  contents.push(`# ${data.title}`)
  contents.push(data.description)

  contents.push('\n')

  if (data?.classes.length) {
    contents.push(`## Classes`)
  }

  for (const klass of data.classes) {
    contents.push(`### ${klass.name}`)
    contents.push(klass.description)

    contents.push(`#### Properties:`)
    for (const prop of klass.properties) {
      contents.push(`- **${prop.name}**: ${prop.description}`)
    }

    contents.push(`#### Methods:`)
    for (const method of klass.methods) {
      contents.push(`- ${method.name}`)
      contents.push('\t' + method.description)
    }
  }

  contents.push('\n')

  if (data.input) {
    contents.push(`## Input`)
    contents.push(data.input)
  }

  if (data.output) {
    contents.push(`## Output`)
    contents.push(data.output)
  }

  if (data.samples) {
    let count = 1
    for (const sample of data.samples) {
      contents.push(`### Sample #${count++}\n`)
      contents.push(`
<table>
<tr>
<th style="min-width: 220px"> Input</th>
<th style="min-width: 220px"> Output </th>
</tr>
<tr>
<td>

\`\`\`
${sample.input}
\`\`\`

</td>
<td>

\`\`\`
${sample.output}
\`\`\`

</td>
</tr>
</table>`)
    }
  }

  const final = contents.join('\n\n')
  return markdownToHtml(final)
}