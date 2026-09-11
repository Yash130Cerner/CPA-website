import { defineConfig, loadEnv } from 'vite'
import type { Plugin } from 'vite'
import type { IncomingMessage } from 'node:http'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function readBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve) => {
    let raw = ''
    req.on('data', (chunk) => {
      raw += chunk
    })
    req.on('end', () => {
      if (!raw) return resolve({})
      try {
        resolve(JSON.parse(raw))
      } catch {
        resolve(raw)
      }
    })
    req.on('error', () => resolve({}))
  })
}

/**
 * Runs the serverless functions in /api during `npm run dev`.
 * Vite only serves static files on its own, so without this the contact form
 * would 404 locally. Production is untouched - Vercel runs /api itself.
 */
function devApi(env: Record<string, string>): Plugin {
  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split('?')[0]
        if (!path?.startsWith('/api/')) return next()

        // Make .env.local values visible to the handler, as Vercel would.
        for (const [key, value] of Object.entries(env)) {
          if (process.env[key] === undefined) process.env[key] = value
        }

        void (async () => {
          try {
            const mod = await server.ssrLoadModule(`.${path}.ts`)
            const handler = mod.default as (
              req: unknown,
              res: unknown,
            ) => Promise<void>

            const body = await readBody(req)
            const shim = {
              setHeader: (key: string, value: string) => res.setHeader(key, value),
              status(code: number) {
                res.statusCode = code
                return this
              },
              json(payload: unknown) {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(payload))
                return this
              },
            }

            await handler(Object.assign(req, { body }), shim)
            if (!res.writableEnded) res.end()
          } catch (error) {
            server.config.logger.error(`[dev-api] ${path} failed: ${String(error)}`)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Local API handler threw. See terminal.' }))
          }
        })()
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // Prefix '' loads every key from .env.local. These stay server-side: they are
  // handed to the dev middleware only, never to `define` or import.meta.env.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss(), devApi(env)],
  }
})
