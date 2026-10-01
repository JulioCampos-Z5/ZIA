/**
 * Service worker de las tarjetas digitales.
 *
 * Solo controla /tarjeta (se registra con ese alcance), así que el resto del
 * sitio se comporta igual que siempre. Con él la tarjeta se puede instalar en
 * el teléfono y abre aunque no haya internet.
 *
 * - Páginas: primero la red, para mostrar siempre los datos más nuevos; si no
 *   hay conexión, la última copia guardada.
 * - Archivos de /assets/: llevan un hash en el nombre y nunca cambian, así que
 *   se sirven desde la copia guardada.
 * - Lo demás (íconos, manifest, fuentes): la copia guardada al instante y se
 *   actualiza por detrás para la próxima vez.
 *
 * Si cambias este archivo, sube la VERSION para que los teléfonos borren lo
 * guardado antes.
 */
const VERSION = 'v1'
const CACHE = `zia-tarjetas-${VERSION}`

// Todas las rutas sirven el mismo index.html, la app decide qué tarjeta pintar
const CASCARON = '/tarjeta'

// El servidor puede mandar Vary (Origin, Accept-Encoding) y el navegador pide
// el JS con encabezados distintos a los de la copia: se ignora para encontrarla
const SIN_VARY = { ignoreVary: true }

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE)
      // Guarda el HTML y los JS/CSS que pide, para que la primera vez sin
      // internet ya funcione aunque la página se haya abierto una sola vez
      const res = await fetch(CASCARON, { cache: 'no-cache' })
      const html = await res.clone().text()
      const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((m) => m[1])
      await cache.put(CASCARON, res)
      await cache.addAll([...new Set(assets), '/icons/icono-192.png', '/icons/icono-512.png'])
      await self.skipWaiting()
    })(),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const nombres = await caches.keys()
      await Promise.all(
        nombres.filter((n) => n.startsWith('zia-tarjetas-') && n !== CACHE).map((n) => caches.delete(n)),
      )
      await self.clients.claim()
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)

  if (request.mode === 'navigate') {
    event.respondWith(primeroRed(request))
  } else if (url.origin === location.origin && url.pathname.startsWith('/assets/')) {
    event.respondWith(primeroCache(request))
  } else if (url.origin === location.origin || url.hostname.endsWith('fonts.googleapis.com') || url.hostname.endsWith('fonts.gstatic.com')) {
    event.respondWith(cacheYActualiza(event, request))
  }
})

async function primeroRed(request) {
  const cache = await caches.open(CACHE)
  try {
    const res = await fetch(request)
    if (res.ok) cache.put(request, res.clone())
    return res
  } catch {
    // Sin internet: la copia de esta tarjeta, o el cascarón que pinta cualquiera
    return (await cache.match(request, SIN_VARY)) || (await cache.match(CASCARON, SIN_VARY)) || Response.error()
  }
}

async function primeroCache(request) {
  const cache = await caches.open(CACHE)
  const guardado = await cache.match(request, SIN_VARY)
  if (guardado) return guardado
  const res = await fetch(request)
  if (res.ok) cache.put(request, res.clone())
  return res
}

async function cacheYActualiza(event, request) {
  const cache = await caches.open(CACHE)
  const guardado = await cache.match(request, SIN_VARY)
  const red = fetch(request)
    .then((res) => {
      // Las fuentes de Google llegan "opaque" (status 0): también sirven
      if (res.ok || res.type === 'opaque') cache.put(request, res.clone())
      return res
    })
    .catch(() => guardado || Response.error())
  if (guardado) {
    event.waitUntil(red)
    return guardado
  }
  return red
}
