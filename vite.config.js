import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Lightweight mock for /api/register
    middlewareMode: false,
  },
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.method === 'POST' && req.url === '/api/register') {
        let body = ''
        req.on('data', (chunk) => (body += chunk))
        req.on('end', () => {
          try {
            const data = JSON.parse(body || '{}')
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true, id: Date.now(), data }))
          } catch {
            res.statusCode = 400
            res.end(JSON.stringify({ ok: false }))
          }
        })
        return
      }
      next()
    })
  },
})
