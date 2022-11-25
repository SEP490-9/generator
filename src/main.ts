import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'github-markdown-css/github-markdown-light.css'
import './style.scss'

import App from './App.svelte'

const app = new App({
  target: document.getElementById('root')
})

export default app