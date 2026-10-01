import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import Logo from '../components/Logo'
import { useTema } from '../lib/tema'
import { tarjetaPorSlug, type Tarjeta } from '../data/tarjetas'
import {
  IconArrow,
  IconDownload,
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconMail,
  IconPhone,
  IconPin,
  IconShare,
  IconWhatsapp,
} from '../components/icons'

/** Contacto en formato vCard: el celular lo agrega a la agenda con un toque */
function vcard(t: Tarjeta) {
  const partes = t.nombre.trim().split(/\s+/)
  const sinEmoji = (s: string) => s.replace(/[^\x20-\x7EÀ-ſ]/g, '').trim()
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${partes.slice(1).join(' ')};${partes[0]};;;`,
    `FN:${t.nombre}`,
    `ORG:${t.empresa}`,
    t.cargo && `TITLE:${t.cargo}`,
    t.telefono && `TEL;TYPE=CELL:+52${t.telefono}`,
    t.correo && `EMAIL;TYPE=WORK:${t.correo}`,
    t.web && `URL:${t.web}`,
    t.direccion && `ADR;TYPE=WORK:;;${t.direccion};;;;`,
    t.lema && `NOTE:${sinEmoji(t.lema)}`,
    'END:VCARD',
  ]
    .filter(Boolean)
    .join('\r\n')
}

function guardarContacto(t: Tarjeta) {
  const blob = new Blob([vcard(t)], { type: 'text/vcard;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${t.slug}.vcf`
  a.click()
  URL.revokeObjectURL(url)
}

function SelectorTema() {
  const { tema, alternar } = useTema()
  const oscuro = tema === 'dark'
  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="relative flex rounded-full bg-ink p-1 font-mono text-[0.62rem] font-bold uppercase tracking-wider text-white"
    >
      <span
        className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-accent transition-transform duration-300"
        style={{ transform: oscuro ? 'translateX(100%)' : 'none' }}
        aria-hidden
      />
      <span className={`relative px-2.5 py-0.5 ${oscuro ? 'opacity-60' : ''}`}>Claro</span>
      <span className={`relative px-2.5 py-0.5 ${oscuro ? '' : 'opacity-60'}`}>Oscuro</span>
    </button>
  )
}

/** Tecla de acción con LED, como las del sintetizador */
function Tecla({ href, icon: Icon, nombre, detalle }: { href: string; icon: typeof IconPhone; nombre: string; detalle: string }) {
  const externo = href.startsWith('http')
  return (
    <a
      href={href}
      {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="neu-sm group flex flex-col gap-3 rounded-2xl p-4 active:shadow-none"
    >
      <span className="flex items-center justify-between">
        <Icon className="h-5 w-5 transition-colors group-hover:text-accent" />
        <span className="led transition-all group-hover:led-on" />
      </span>
      <span>
        <span className="block text-sm font-bold">{nombre}</span>
        <span className="mt-0.5 block truncate font-mono text-[0.68rem] text-muted">{detalle}</span>
      </span>
    </a>
  )
}

/**
 * QR que, al tocarlo, crece hacia el centro de la pantalla para escanearlo
 * más fácil. La copia grande arranca encima del QR chico y se transforma
 * hasta el centro; al cerrar hace el camino de regreso.
 */
function QrAmpliable({ svg }: { svg: string }) {
  const ref = useRef<HTMLButtonElement>(null)
  const [fase, setFase] = useState<'cerrado' | 'abriendo' | 'abierto' | 'cerrando'>('cerrado')
  const [lado, setLado] = useState(0)
  const [desde, setDesde] = useState('')

  /** Transformación que encima la copia grande sobre el QR chico */
  const medir = () => {
    const r = ref.current!.getBoundingClientRect()
    const grande = Math.min(window.innerWidth, window.innerHeight, 440) * 0.82
    const dx = r.left + r.width / 2 - window.innerWidth / 2
    const dy = r.top + r.height / 2 - window.innerHeight / 2
    setLado(grande)
    setDesde(`translate(${dx}px, ${dy}px) scale(${r.width / grande})`)
  }

  const abrir = () => {
    medir()
    setFase('abriendo')
    // Dos cuadros: uno para pintar la posición inicial y otro para animar
    requestAnimationFrame(() => requestAnimationFrame(() => setFase('abierto')))
  }

  const cerrar = () => {
    medir()
    setFase('cerrando')
    setTimeout(() => setFase('cerrado'), 350)
  }

  useEffect(() => {
    if (fase !== 'abierto') return
    const alTeclear = (e: KeyboardEvent) => e.key === 'Escape' && cerrar()
    window.addEventListener('keydown', alTeclear)
    return () => window.removeEventListener('keydown', alTeclear)
  }, [fase])

  const visible = fase === 'abierto'
  const qrClase = 'overflow-hidden rounded-xl bg-white p-1.5 [&_svg]:h-full [&_svg]:w-full'

  return (
    <>
      <button
        ref={ref}
        type="button"
        onClick={abrir}
        aria-label="Ampliar código QR de esta tarjeta"
        // Crece con el ancho de la tarjeta: chico en celular, más grande en pantallas anchas
        className={`aspect-square w-[clamp(4rem,30cqw,8rem)] shrink-0 cursor-zoom-in transition-transform hover:scale-105 ${qrClase} ${fase === 'cerrado' ? '' : 'opacity-0'}`}
        dangerouslySetInnerHTML={{ __html: svg }}
      />

      {fase !== 'cerrado' && (
        <div
          className={`fixed inset-0 z-50 cursor-zoom-out bg-black/70 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${visible ? 'opacity-100' : 'opacity-0'}`}
          onClick={cerrar}
          role="dialog"
          aria-modal="true"
          aria-label="Código QR ampliado"
        >
          <div
            className={`fixed left-1/2 top-1/2 shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none ${qrClase}`}
            style={{
              width: lado,
              height: lado,
              // Proporcionales al QR chico para que el crecimiento no brinque
              padding: lado * 0.055,
              borderRadius: lado * 0.1,
              marginLeft: -lado / 2,
              marginTop: -lado / 2,
              transform: visible ? 'none' : desde,
            }}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>
      )}
    </>
  )
}

export default function TarjetaDigital({ slug }: { slug: string }) {
  const t = tarjetaPorSlug(slug)
  const [qr, setQr] = useState('')
  const [aviso, setAviso] = useState('')
  const url = window.location.origin + window.location.pathname

  useEffect(() => {
    if (!t) return
    document.title = `${t.nombre} · Tarjeta digital`
    QRCode.toString(url, { type: 'svg', margin: 1, color: { dark: '#141416', light: '#ffffff' } }).then(setQr)
  }, [t, url])

  if (!t) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 text-center">
        <p className="label">Nº 404</p>
        <h1 className="text-5xl">Esta tarjeta no existe<span className="text-accent">.</span></h1>
        <a href="/" className="btn btn-accent">Ir a ZIA <IconArrow /></a>
      </main>
    )
  }

  const wa = t.whatsapp || t.telefono
  const compartir = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: t.nombre, text: `${t.nombre} · ${t.cargo}`, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setAviso('Enlace copiado')
      setTimeout(() => setAviso(''), 2000)
    } catch {
      /* el usuario canceló el menú de compartir */
    }
  }

  const redes = [
    t.instagram && { href: t.instagram, icon: IconInstagram, label: 'Instagram' },
    t.facebook && { href: t.facebook, icon: IconFacebook, label: 'Facebook' },
    t.linkedin && { href: t.linkedin, icon: IconLinkedin, label: 'LinkedIn' },
  ].filter(Boolean) as { href: string; icon: typeof IconPhone; label: string }[]

  return (
    <main className="flex min-h-screen justify-center px-4 py-6 sm:py-12">
      <div className="w-full max-w-md">
        {/* Barra superior */}
        <div className="flex items-center justify-between px-1">
          <a href="/" className="flex items-center gap-2" aria-label="Ir al sitio de ZIA">
            <Logo className="h-6 w-6" />
            <span className="font-extrabold tracking-tight">ZIA</span>
          </a>
          <SelectorTema />
        </div>

        {/* La tarjeta */}
        <article className="neu mt-5 overflow-hidden rounded-[2rem]">
          {/* Cabecera estilo póster: bloque rojo con círculo y número */}
          <div className="relative h-40 overflow-hidden bg-accent text-on-accent">
            <svg viewBox="0 0 400 160" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMaxYMid slice" aria-hidden>
              <circle cx="330" cy="40" r="110" fill="rgba(0,0,0,.14)" />
              <circle cx="330" cy="40" r="70" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="1.5" />
              <circle cx="330" cy="40" r="6" fill="#141416" />
              <path d="M-10 160 V90 A70 70 0 0 1 60 160 Z" fill="#141416" />
            </svg>
            {/* 
            <p className="absolute left-6 top-5 font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-80">
              Nº 001 · Tarjeta digital
            </p>
             */}
          </div>

          <div className="@container relative px-6 pb-7">
            {/* Insignia con el logo, encima del corte rojo */}
            <div className="neu -mt-10 flex h-20 w-20 items-center justify-center rounded-3xl">
              <Logo className="h-12 w-12" />
            </div>

            {/* Con espacio, el QR se alinea arriba con el cargo. En celular el
                cargo ocupa todo el ancho y el QR baja junto al nombre, para no
                partir el cargo en dos renglones. La tercera fila vacía absorbe
                lo que el QR mide de más, así no separa el cargo del nombre. */}
            <div className="mt-5 grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 @min-[23rem]:grid-rows-[auto_auto_1fr]">
              <p className="label col-span-2 @min-[23rem]:col-span-1">{t.cargo}</p>
              <div className="min-w-0">
                <h1 className="text-4xl">
                  {t.nombre}
                  <span className="text-accent">.</span>
                </h1>
                {t.lema && <p className="mt-2 text-sm text-muted">{t.lema}</p>}
              </div>
              <div className="col-start-2 row-start-2 @min-[23rem]:row-span-3 @min-[23rem]:row-start-1 @min-[23rem]:self-start">
                <QrAmpliable svg={qr} />
              </div>
            </div>

            {/* Acciones principales */}
            <div className="mt-7 grid grid-cols-2 gap-3">
              {t.telefono && <Tecla href={`tel:+52${t.telefono}`} icon={IconPhone} nombre="Llamar" detalle={t.telefono.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')} />}
              {wa && (
                <Tecla
                  href={`https://wa.me/52${wa}?text=${encodeURIComponent(`¡Hola! Vi tu tarjeta digital de ${t.empresa}.`)}`}
                  icon={IconWhatsapp}
                  nombre="WhatsApp"
                  detalle="Escríbeme"
                />
              )}
              {t.correo && <Tecla href={`mailto:${t.correo}`} icon={IconMail} nombre="Correo" detalle={t.correo} />}
              {t.web && <Tecla href={t.web} icon={IconArrow} nombre="Sitio web" detalle={t.web.replace(/^https?:\/\//, '').replace(/\/$/, '')} />}
              {t.direccion && (
                <Tecla
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.direccion)}`}
                  icon={IconPin}
                  nombre="Ubicación"
                  detalle={t.direccion}
                />
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button type="button" onClick={() => guardarContacto(t)} className="btn btn-accent flex-1">
                <IconDownload className="h-4 w-4" /> Guardar contacto
              </button>
              <button type="button" onClick={compartir} className="btn btn-neu !px-4" aria-label="Compartir tarjeta">
                <IconShare className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 h-4 text-center font-mono text-xs text-accent" aria-live="polite">{aviso}</p>

            {redes.length > 0 && (
              <div className="mt-4 flex justify-center gap-3">
                {redes.map((r) => (
                  <a
                    key={r.label}
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={r.label}
                    className="btn-neu flex h-11 w-11 items-center justify-center rounded-full"
                  >
                    <r.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            )}

            {t.servicios && t.servicios.length > 0 && (
              <div className="mt-8 border-t-2 border-fg pt-4">
                <p className="label">Lo que hacemos</p>
                <ul className="mt-3">
                  {t.servicios.map((s, i) => (
                    <li key={s.nombre} className="flex gap-4 border-b border-line py-3.5 last:border-0">
                      <span className="font-mono text-xs font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
                      <span>
                        <span className="block text-sm font-bold">{s.nombre}</span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-muted">{s.detalle}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </article>

        <p className="mt-6 text-center font-mono text-[0.62rem] uppercase tracking-[0.15em] text-muted">
          <span className="mr-2 inline-block h-2 w-2 bg-accent align-middle" />
          Tarjeta hecha por{' '}
          <a href="/" className="underline underline-offset-2 hover:text-accent">
            ZIA
          </a>{' '}
          · Hecho con astucia
        </p>
      </div>
    </main>
  )
}
