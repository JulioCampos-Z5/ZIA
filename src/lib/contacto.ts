/**
 * Datos de contacto en un solo lugar. ZIA es la misma empresa que Zyncosoft,
 * así que por ahora comparte teléfono y correo; si ZIA estrena los suyos,
 * se cambian aquí y en functions/api/contacto.ts (CORREO_DESTINO).
 */
export const TELEFONO = '3339057215'
export const TELEFONO_VISIBLE = '333 905 7215'
const WHATSAPP_INTL = `52${TELEFONO}`

export const whatsapp = (mensaje = '¡Hola! Vengo de la página de ZIA y me gustaría más información.') =>
  `https://wa.me/${WHATSAPP_INTL}?text=${encodeURIComponent(mensaje)}`

export const CORREO = 'zyncosoft@gmail.com'

/** Pendiente: cambiar cuando ZIA tenga dominio propio (también en index.html, robots.txt, sitemap.xml y llms.txt). */
export const SITIO_URL = 'https://zia.pages.dev/'
