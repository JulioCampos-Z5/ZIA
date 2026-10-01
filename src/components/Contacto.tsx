import { useState } from 'react'
import { CORREO, TELEFONO_VISIBLE, whatsapp } from '../lib/contacto'
import { IconArrow, IconMail, IconWhatsapp } from './icons'

const intereses = ['Presencia digital', 'Apps a la medida', 'IA para mi empresa', 'Todavía no sé']

const CORREO_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Estado = 'listo' | 'enviando' | 'enviado' | 'error'

export default function Contacto() {
  const [interes, setInteres] = useState<string[]>([])
  const [estado, setEstado] = useState<Estado>('listo')
  const [aviso, setAviso] = useState<string | null>(null)

  const toggle = (i: string) => setInteres((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]))

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const datos = Object.fromEntries(f.entries()) as Record<string, string>
    if (!datos.nombre?.trim()) return setAviso('Escribe tu nombre.')
    if (!CORREO_RE.test(datos.correo?.trim() ?? '')) return setAviso('Revisa tu correo.')
    if (!f.get('acepto')) return setAviso('Acepta el aviso de privacidad para continuar.')
    setAviso(null)
    setEstado('enviando')
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...datos, servicios: interes }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setEstado('enviado')
    } catch {
      setEstado('error')
    }
  }

  const campo =
    'neu-in w-full rounded-2xl px-5 py-3.5 text-sm text-fg placeholder:text-muted/80 outline-none focus:ring-2 focus:ring-accent/40'

  return (
    <section id="contacto" className="py-20 sm:py-28">
      <div className="container-x">
        <div className="reveal border-t-2 border-fg pt-5">
          <div className="flex items-baseline justify-between gap-4">
            <p className="label">Contacto</p>
            <p className="font-mono text-sm font-bold">Nº 006</p>
          </div>
        </div>

        <div className="mt-8 grid gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <h2 className="text-4xl sm:text-6xl">
              Hablemos<span className="text-accent">.</span>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted">
              Te respondemos con una propuesta y su precio. Si lo tuyo es la IA, primero platicamos para entender tu
              negocio.
            </p>

            <div className="mt-10 space-y-5">
              <a
                href={whatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                className="neu-sm group flex items-center gap-4 rounded-2xl p-5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-on-accent">
                  <IconWhatsapp className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="label">WhatsApp</p>
                  <p className="mt-1 font-mono font-bold">{TELEFONO_VISIBLE}</p>
                </div>
                <IconArrow className="h-5 w-5 text-accent transition-transform group-hover:translate-x-1" />
              </a>
              <a href={`mailto:${CORREO}`} className="neu-sm group flex items-center gap-4 rounded-2xl p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-fg text-bg">
                  <IconMail className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="label">Correo</p>
                  <p className="mt-1 truncate font-mono font-bold">{CORREO}</p>
                </div>
                <IconArrow className="h-5 w-5 text-accent transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="neu reveal rounded-[2rem] p-6 sm:p-9 lg:col-span-7">
            {estado === 'enviado' ? (
              <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                <span className="led led-on !h-4 !w-4" />
                <p className="mt-6 text-3xl font-extrabold">¡Gracias! Ya nos llegó</p>
                <p className="mt-2 text-muted">En breve te contactamos.</p>
              </div>
            ) : (
              <form onSubmit={enviar} noValidate className="space-y-5">
                <fieldset>
                  <legend className="label">¿Qué te interesa?</legend>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {intereses.map((i) => {
                      const on = interes.includes(i)
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => toggle(i)}
                          aria-pressed={on}
                          className={`flex flex-col items-start gap-3 rounded-2xl p-3.5 text-left text-xs font-bold leading-tight ${
                            on ? 'neu-in text-accent' : 'neu-sm'
                          }`}
                        >
                          <span className={`led ${on ? 'led-on' : ''}`} />
                          {i}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="nombre" placeholder="Tu nombre *" autoComplete="name" className={campo} />
                  <input name="empresa" placeholder="Empresa o negocio" autoComplete="organization" className={campo} />
                  <input name="correo" type="email" placeholder="Correo *" autoComplete="email" className={campo} />
                  <input name="telefono" type="tel" placeholder="Teléfono" autoComplete="tel" className={campo} />
                </div>
                <textarea name="mensaje" rows={4} placeholder="Cuéntanos tu idea o qué te quita más tiempo" className={campo} />
                {/* Campo trampa para bots */}
                <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                <label className="flex items-start gap-3 text-xs text-muted">
                  <input type="checkbox" name="acepto" className="mt-0.5 accent-[var(--accent)]" />
                  <span>
                    Acepto el{' '}
                    <a href="/privacidad" className="text-fg underline underline-offset-2">
                      aviso de privacidad
                    </a>
                    .
                  </span>
                </label>
                {aviso && <p className="text-sm font-medium text-accent">{aviso}</p>}
                {estado === 'error' && (
                  <p className="text-sm font-medium text-accent">
                    No se pudo enviar. Escríbenos por WhatsApp y te atendemos de inmediato.
                  </p>
                )}
                <button type="submit" disabled={estado === 'enviando'} className="btn btn-accent w-full disabled:opacity-60">
                  {estado === 'enviando' ? 'Enviando…' : 'Enviar'} <IconArrow />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
