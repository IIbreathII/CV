import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function prerender() {
  const distPath  = path.resolve(__dirname, 'dist')
  const ssrPath   = path.resolve(__dirname, '.ssr', 'entry-server.js')
  const htmlPath  = path.resolve(distPath, 'index.html')

  if (!fs.existsSync(htmlPath)) {
    throw new Error('dist/index.html не найден — сначала запусти build:client')
  }
  if (!fs.existsSync(ssrPath)) {
    throw new Error('.ssr/entry-server.js не найден — сначала запусти build:server')
  }

  const template = fs.readFileSync(htmlPath, 'utf-8')

  if (!template.includes('<!--app-html-->')) {
    throw new Error('Плейсхолдер <!--app-html--> не найден в index.html')
  }

  const { render } = await import(ssrPath)
  const appHtml = render()

  const html = template.replace('<!--app-html-->', appHtml)
  fs.writeFileSync(htmlPath, html, 'utf-8')

  console.log('SSG > dist/index.html')
}

prerender().catch((err) => {
  console.error(' Prerender error:', err.message)
  process.exit(1)
})