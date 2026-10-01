/**
 * Recibe el formulario de contacto y manda el correo con Resend.
 *
 * Vive en el servidor de Cloudflare, no en el navegador: por eso la llave
 * de Resend nunca queda expuesta en el código que descarga el visitante.
 *
 * Variables de entorno (panel de Cloudflare → Settings → Environment variables):
 *   RESEND_API_KEY   obligatoria, la llave secreta de Resend
 *   CORREO_DESTINO   a dónde llegan los mensajes (default: zyncosoft@gmail.com)
 *   CORREO_FROM      remitente verificado en Resend
 */

type Env = {
  RESEND_API_KEY: string
  CORREO_DESTINO?: string
  CORREO_FROM?: string
}

/** Firma de una Pages Function, declarada aquí para no depender de @cloudflare/workers-types */
type PagesFunction<E> = (ctx: {
  request: Request
  env: E
}) => Response | Promise<Response>

type Payload = {
  nombre?: string
  correo?: string
  telefono?: string
  empresa?: string
  /** Dónde nos encontró: lo elige de una lista, es opcional */
  origen?: string
  mensaje?: string
  servicios?: string[]
  /** Campo trampa: invisible para las personas, los bots sí lo llenan */
  website?: string
}

const MAX = {
  nombre: 120,
  correo: 160,
  telefono: 40,
  empresa: 160,
  origen: 60,
  mensaje: 4000,
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  })

const limpiar = (v: unknown, max: number) =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

/** Evita que alguien inyecte encabezados extra en el asunto del correo */
const unaLinea = (v: string) => v.replace(/[\r\n]+/g, ' ')

const escapar = (v: string) =>
  v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.RESEND_API_KEY) {
    console.error('Falta la variable RESEND_API_KEY')
    return json({ ok: false, error: 'config' }, 500)
  }

  let body: Payload
  try {
    body = (await request.json()) as Payload
  } catch {
    return json({ ok: false, error: 'json' }, 400)
  }

  // Bot detectado: le respondemos "ok" para que no insista ni aprenda
  if (limpiar(body.website, 200)) return json({ ok: true })

  const nombre = limpiar(body.nombre, MAX.nombre)
  const correo = limpiar(body.correo, MAX.correo)
  const telefono = limpiar(body.telefono, MAX.telefono)
  const empresa = limpiar(body.empresa, MAX.empresa)
  const origen = limpiar(body.origen, MAX.origen)
  const mensaje = limpiar(body.mensaje, MAX.mensaje)
  const servicios = Array.isArray(body.servicios)
    ? body.servicios.slice(0, 20).map((s) => limpiar(s, 60)).filter(Boolean)
    : []

  if (!nombre || !correo) return json({ ok: false, error: 'faltan' }, 400)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo))
    return json({ ok: false, error: 'correo' }, 400)

  const destino = env.CORREO_DESTINO || 'zyncosoft@gmail.com'
  const remitente = env.CORREO_FROM || 'ZIA <onboarding@resend.dev>'

  const fecha = new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'America/Mexico_City',
  }).format(new Date())

  const filas: [string, string][] = [
    ['Nombre', nombre],
    ['Empresa', empresa || 'No la indicó'],
    ['Correo', correo],
    ['Teléfono', telefono || 'No lo indicó'],
    ['Le interesa', servicios.length ? servicios.join(' · ') : 'No eligió nada'],
    ['Nos ubicó en', origen || 'No lo dijo'],
    ['Recibido', fecha],
  ]

  // Enlace directo de WhatsApp: si vienen 10 dígitos asumimos México (52)
  const digitos = telefono.replace(/\D/g, '')
  const waNumero =
    digitos.length === 10
      ? `52${digitos}`
      : digitos.length >= 11 && digitos.length <= 15
        ? digitos
        : ''

  // Estilos en línea: los clientes de correo ignoran las hojas de estilo
  const celdaEtiqueta =
    'padding:10px 16px 10px 0;color:#8a8a8a;font-size:13px;white-space:nowrap;vertical-align:top'
  const celdaValor = 'padding:10px 0;font-size:15px;color:#111'

  const html = `<!doctype html>
<html lang="es"><body style="margin:0;padding:24px 12px;background:#f2f2f2">
  <!-- Resumen que aparece en la bandeja, antes de abrir -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapar(
    `${nombre}${empresa ? ` (${empresa})` : ''}: ${mensaje || 'sin mensaje'}`,
  ).slice(0, 140)}</div>

  <table role="presentation" width="100%" style="border-collapse:collapse">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;border-collapse:collapse;background:#fff;border-radius:14px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">

        <tr><td style="background:#0a0a0a;padding:20px 28px">
          <p style="margin:0;color:#8b5cf6;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase">ZIA</p>
          <p style="margin:4px 0 0;color:#fff;font-size:19px;font-weight:600">Nuevo contacto desde el sitio</p>
        </td></tr>

        <tr><td style="padding:24px 28px 8px">
          <table role="presentation" style="border-collapse:collapse;width:100%">
            ${filas
              .map(
                ([k, v], i) =>
                  `<tr${i ? ' style="border-top:1px solid #f0f0f0"' : ''}>
                     <td style="${celdaEtiqueta}">${k}</td>
                     <td style="${celdaValor}"><strong>${escapar(v)}</strong></td>
                   </tr>`,
              )
              .join('')}
          </table>
        </td></tr>

        <tr><td style="padding:16px 28px 0">
          <p style="margin:0 0 8px;color:#8a8a8a;font-size:13px">Su mensaje</p>
          <div style="white-space:pre-wrap;padding:16px 18px;background:#fafafa;border-left:3px solid #8b5cf6;border-radius:0 8px 8px 0;font-size:15px;line-height:1.6;color:#111">${
            escapar(mensaje) ||
            '<span style="color:#aaa">No escribió mensaje.</span>'
          }</div>
        </td></tr>

        <tr><td style="padding:24px 28px 28px">
          <a href="mailto:${escapar(correo)}?subject=${encodeURIComponent(`Re: tu mensaje a ZIA`)}"
             style="display:inline-block;background:#8b5cf6;color:#ffffff;font-weight:700;font-size:15px;text-decoration:none;padding:13px 26px;border-radius:999px">
            Responder a ${escapar(nombre.split(' ')[0])}
          </a>
          ${
            waNumero
              ? `<a href="https://wa.me/${waNumero}"
             style="display:inline-block;margin-left:10px;background:#25D366;color:#0a0a0a;font-weight:700;font-size:15px;text-decoration:none;padding:13px 26px;border-radius:999px">
            WhatsApp
          </a>`
              : ''
          }
          <p style="margin:14px 0 0;color:#9a9a9a;font-size:12px;line-height:1.5">
            También puedes contestar este correo directamente: la respuesta le llega a ${escapar(correo)}.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`

  // Versión en texto: mejora la entrega y es lo que se ve en relojes y modo sin imágenes
  const texto = [
    'NUEVO CONTACTO DESDE ZIA',
    '',
    ...filas.map(([k, v]) => `${k}: ${v}`),
    '',
    'Mensaje:',
    mensaje || '(no escribió mensaje)',
    '',
    `Responde a este correo y le llega a ${correo}.`,
  ].join('\n')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: remitente,
      to: [destino],
      // Así, al responder el correo le contestas directo al cliente
      reply_to: correo,
      subject: `Nuevo contacto: ${unaLinea(nombre)}${empresa ? ` — ${unaLinea(empresa)}` : ''}`,
      html,
      text: texto,
    }),
  })

  if (!res.ok) {
    console.error('Resend respondió', res.status, await res.text())
    return json({ ok: false, error: 'envio' }, 502)
  }

  return json({ ok: true })
}
