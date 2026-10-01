/**
 * Deja la tarjeta lista para instalarse en el teléfono ("Agregar a la
 * pantalla de inicio"): su manifest, el ícono para iPhone y el service worker.
 *
 * Las etiquetas van solo en las tarjetas, no en index.html, porque cada
 * tarjeta es una app distinta con su propio nombre.
 */
function etiqueta(selector: string, crear: () => HTMLElement) {
  if (!document.head.querySelector(selector)) document.head.appendChild(crear())
}

export function hacerInstalable(slug: string, nombreCorto: string) {
  etiqueta('link[rel="manifest"]', () =>
    Object.assign(document.createElement('link'), { rel: 'manifest', href: `/manifest/${slug}.webmanifest` }),
  )
  // iPhone no usa los íconos del manifest: toma este
  etiqueta('link[rel="apple-touch-icon"]', () =>
    Object.assign(document.createElement('link'), { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' }),
  )
  etiqueta('meta[name="apple-mobile-web-app-capable"]', () =>
    Object.assign(document.createElement('meta'), { name: 'apple-mobile-web-app-capable', content: 'yes' }),
  )
  etiqueta('meta[name="apple-mobile-web-app-title"]', () =>
    Object.assign(document.createElement('meta'), { name: 'apple-mobile-web-app-title', content: nombreCorto }),
  )

  // En desarrollo no: guardaría versiones viejas mientras editas
  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/tarjeta' }).catch((e) => {
      console.error('No se pudo registrar el service worker', e)
    })
  }
}
