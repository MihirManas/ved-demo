import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const serverEntryPath = toAbsolute('dist-server/entry-server.js')

let render;
try {
  const module = await import(pathToFileURL(serverEntryPath).href)
  render = module.render
} catch (e) {
  console.error("Failed to load SSR entry:", e)
  process.exit(1)
}

// List all routes you want to pre-render
const routesToPrerender = [
  '/',
  '/about',
  '/courses',
  '/verify',
  '/apply',
  '/contact',
  '/faq',
  '/privacy-policy',
  '/terms-of-service',
  '/refund-policy',
  '/domains/applied-data-science-ai',
  '/domains/full-stack-development',
  '/domains/vlsi-design',
  '/domains/embedded-systems',
  '/domains/mongodb-django',
  '/domains/react-native'
]

;(async () => {
  for (const url of routesToPrerender) {
    try {
      const helmetContext = {}
      const appHtml = render(url, helmetContext)

      const { helmet } = helmetContext
      const headTags = `
        ${helmet ? helmet.title.toString() : ''}
        ${helmet ? helmet.meta.toString() : ''}
        ${helmet ? helmet.link.toString() : ''}
        ${helmet ? helmet.script.toString() : ''}
      `

      // Minifier-proof replacements
      const html = template
        .replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`)
        .replace(`</head>`, `${headTags}</head>`)

      const filePath = `dist${url === '/' ? '/index' : url}.html`
      const fileDir = path.dirname(toAbsolute(filePath))
      
      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true })
      }
      
      fs.writeFileSync(toAbsolute(filePath), html)
      console.log('pre-rendered:', filePath)
    } catch (e) {
      console.error(`Error rendering ${url}:`, e)
      process.exit(1)
    }
  }

  // Generate Production Sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routesToPrerender.map(url => `  <url>
    <loc>https://vedupskilling.in${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`
  fs.writeFileSync(toAbsolute('dist/sitemap.xml'), sitemap)
  console.log('generated sitemap.xml')

  // Generate Demo Sitemap for GSC Testing
  const sitemapDemo = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routesToPrerender.map(url => `  <url>
    <loc>https://www.ved-demo.vercel.app${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`
  fs.writeFileSync(toAbsolute('dist/sitemap-demo.xml'), sitemapDemo)
  console.log('generated sitemap-demo.xml')

  // Generate robots.txt
  const robots = `User-agent: *
Allow: /

Sitemap: https://vedupskilling.in/sitemap.xml`
  fs.writeFileSync(toAbsolute('dist/robots.txt'), robots)
  console.log('generated robots.txt')
})()
