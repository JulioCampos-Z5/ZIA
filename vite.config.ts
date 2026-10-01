import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tarjetas, type Tarjeta } from './src/data/tarjetas'

/** Dirección de la tarjeta: la de ZIA vive en /tarjeta a secas */
const rutaTarjeta = (t: Tarjeta) => (t.slug === 'zia' ? '/tarjeta' : `/tarjeta/${t.slug}`)

/**
 * Manifest de cada tarjeta: es lo que deja instalarla en el teléfono como
 * app, con su propio nombre y abriendo directo en esa tarjeta.
 */
function manifest(t: Tarjeta) {
  const ruta = rutaTarjeta(t)
  return {
    id: ruta,
    name: t.slug === 'zia' ? 'ZIA · Tarjeta digital' : `${t.nombre} · ${t.empresa}`,
    short_name: t.nombre.split(/\s+/)[0],
    description: `Tarjeta digital de ${t.nombre}: ${t.cargo}.`,
    lang: 'es-MX',
    start_url: ruta,
    scope: ruta,
    display: 'standalone',
    background_color: '#ebebef',
    theme_color: '#ebebef',
    icons: [
      { src: '/icons/icono-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icono-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icono-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}

/** Genera /manifest/<slug>.webmanifest al compilar y lo sirve en desarrollo */
function manifestsDeTarjetas(): Plugin {
  const archivos = new Map(
    tarjetas.map((t) => [`manifest/${t.slug}.webmanifest`, JSON.stringify(manifest(t), null, 2)]),
  )
  return {
    name: 'manifests-de-tarjetas',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const contenido = archivos.get((req.url ?? '').split('?')[0].slice(1))
        if (!contenido) return next()
        res.setHeader('Content-Type', 'application/manifest+json; charset=utf-8')
        res.end(contenido)
      })
    },
    generateBundle() {
      for (const [fileName, source] of archivos) this.emitFile({ type: 'asset', fileName, source })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), manifestsDeTarjetas()],
})
