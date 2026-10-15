import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tarjetas, type Tarjeta } from './src/data/tarjetas'
import { SITIO_URL } from './src/lib/contacto'

/** Sin la diagonal final, para pegarle rutas */
const SITIO = SITIO_URL.replace(/\/$/, '')

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

/** Texto para la vista previa al compartir la tarjeta (WhatsApp, Facebook…) */
function vistaPrevia(t: Tarjeta) {
  if (t.slug === 'zia') {
    return {
      titulo: 'ZIA · Tarjeta digital',
      descripcion:
        'Presencia digital, apps a la medida e inteligencia artificial. Llámanos, escríbenos por WhatsApp o guarda nuestro contacto con un toque.',
    }
  }
  const medios = [
    t.telefono && 'teléfono',
    (t.whatsapp || t.telefono) && 'WhatsApp',
    t.correo && 'correo',
    t.linkedin && 'LinkedIn',
  ].filter(Boolean) as string[]
  const lista = medios.length > 1 ? `${medios.slice(0, -1).join(', ')} y ${medios.at(-1)}` : medios[0]
  return {
    titulo: `${t.nombre} · ${t.cargo} en ${t.empresa}`,
    descripcion: `Tarjeta digital de ${t.nombre}, ${t.cargo} en ${t.empresa}.${lista ? ` Su ${lista} a un toque` : ''}; guarda su contacto en tu teléfono.`,
  }
}

const escapar = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/**
 * Un HTML por tarjeta (tarjeta.html y tarjeta/<slug>.html) con su título,
 * descripción y enlace. Los que arman la vista previa al compartir no corren
 * JavaScript: leen el HTML tal cual llega, por eso tiene que venir escrito.
 * Cloudflare Pages sirve /tarjeta/juan desde tarjeta/juan.html.
 */
function htmlDeTarjetas(): Plugin {
  return {
    name: 'html-de-tarjetas',
    // Después del plugin de Vite que arma index.html, para partir del ya compilado
    enforce: 'post',
    generateBundle(_, bundle) {
      const base = bundle['index.html']
      if (base?.type !== 'asset') return
      const html = String(base.source)
      for (const t of tarjetas) {
        const { titulo, descripcion } = vistaPrevia(t)
        const url = SITIO + rutaTarjeta(t)
        const meta = (clave: string, valor: string) => (h: string) =>
          h.replace(new RegExp(`(<meta\\s+(?:name|property)="${clave}"\\s+content=")[^"]*"`), `$1${escapar(valor)}"`)
        const cambios = [
          (h: string) => h.replace(/<title>[^<]*<\/title>/, `<title>${escapar(titulo)}</title>`),
          (h: string) => h.replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`),
          meta('description', descripcion),
          meta('og:url', url),
          meta('og:title', titulo),
          meta('og:description', descripcion),
          meta('og:image:alt', `Tarjeta digital de ${t.nombre} · ZIA`),
        ]
        this.emitFile({
          type: 'asset',
          fileName: `${rutaTarjeta(t).slice(1)}.html`,
          source: cambios.reduce((h, cambio) => cambio(h), html),
        })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), manifestsDeTarjetas(), htmlDeTarjetas()],
})
