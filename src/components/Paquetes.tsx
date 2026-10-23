import { useState } from 'react'
import { IconArrow } from './icons'
import Seccion from './Seccion'
import { whatsapp } from '../lib/contacto'

const presencia = [
  'Página web profesional, rápida y lista para celular',
  'Formulario de contacto que te llega al correo',
  'Botón de WhatsApp directo',
  'Mapa de Google con tu ubicación',
  'Tarjeta de presentación digital con QR',
  'Tu negocio marcado en Google Maps',
  'SEO para aparecer en Google',
  'Metadatos para que se vea bien al compartirla en redes',
  'Metadatos para IA: que ChatGPT, Gemini y otros asistentes entiendan y recomienden tu negocio',
]

const apps = [
  'Todo lo del paquete Presencia digital',
  'Aplicaciones web a la medida',
  'Apps móviles (Android y iPhone)',
  'Programas de escritorio',
  'Módulos según tu negocio: inventario, ventas, clientes, cotizaciones…',
  'Bases de datos',
  'Capacitación para tu equipo',
]

function Lista({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 mb-10 space-y-3.5">
      {items.map((i) => (
        <li key={i} className="flex gap-3 text-sm leading-relaxed">
          <span className="led led-on mt-1.5 shrink-0" />
          {i}
        </li>
      ))}
    </ul>
  )
}

/** Precio en la pantalla oscura, como el display del sintetizador */
function Pantalla({ arriba, precio, abajo }: { arriba: string; precio: string; abajo: string }) {
  return (
    <div className="screen mt-7 rounded-2xl px-5 py-4 font-mono">
      <div className="flex justify-between text-[0.65rem] uppercase tracking-[0.15em]">
        <span className="text-accent">● {arriba}</span>
        <span className="opacity-50">MXN</span>
      </div>
      {/* key: al cambiar el precio se vuelve a montar y entra con la animación del display */}
      <p key={precio} className="cambio mt-2 text-5xl font-bold tracking-tight">
        {precio}
      </p>
      <p key={abajo} className="cambio mt-1 text-[0.7rem] uppercase tracking-[0.12em] opacity-50">
        {abajo}
      </p>
    </div>
  )
}

type Plazo = 'MENSUAL' | 'ANUAL'

/** Mensualidad y pago anual de cada paquete; el anual sale más barato que 12 mensualidades */
const precios = {
  presencia: { mes: 599, anio: 6000 },
  apps: { mes: 1199, anio: 12000 },
}

const pesos = (n: number) => `$${n.toLocaleString('en-US')}`

function pantallaDe({ mes, anio }: { mes: number; anio: number }, plazo: Plazo) {
  return plazo === 'MENSUAL'
    ? { precio: pesos(mes), abajo: 'Al mes' }
    : { precio: pesos(anio), abajo: `Al año · ahorras ${pesos(mes * 12 - anio)}` }
}

export default function Paquetes() {
  const [plazo, setPlazo] = useState<Plazo>('ANUAL')
  const presenciaPrecio = pantallaDe(precios.presencia, plazo)
  const appsPrecio = pantallaDe(precios.apps, plazo)

  return (
    <Seccion
      id="paquetes"
      numero="002"
      etiqueta="Paquetes"
      titulo="Elige cómo quieres crecer"
      bajada="Empieza por estar en internet y, cuando lo necesites, da el salto a tus propias aplicaciones."
    >
      <div className="reveal mt-12 flex flex-col items-center gap-3">
        <div className="neu-in relative flex w-full max-w-xs rounded-full p-1.5">
          {/* Tecla que se desliza bajo la opción elegida */}
          <span
            aria-hidden
            className={`neu-sm absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] ${
              plazo === 'ANUAL' ? 'translate-x-full' : ''
            }`}
          />
          {(['MENSUAL', 'ANUAL'] as Plazo[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPlazo(p)}
              aria-pressed={plazo === p}
              className={`relative z-10 flex-1 rounded-full py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                plazo === p ? 'text-accent' : 'text-muted'
              }`}
            >
              {p === 'MENSUAL' ? 'Mensual' : 'Anual'}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted">Pagando el año completo pagas menos que mes a mes.</p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <article className="neu reveal flex flex-col rounded-[2rem] p-7 sm:p-9">
          <div className="flex items-center justify-between">
            <p className="label">Paquete 01</p>
            <span className="label">Solo página web</span>
          </div>
          <h3 className="mt-4 text-3xl">Presencia digital</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Para que tus clientes te encuentren, te conozcan y te escriban.
          </p>
          <Pantalla arriba={plazo === 'MENSUAL' ? 'Mensual' : 'Anual'} {...presenciaPrecio} />
          <Lista items={presencia} />
          <a
            href={whatsapp('¡Hola! Me interesa el paquete Presencia digital de ZIA.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-neu mt-auto w-full"
          >
            Lo quiero <IconArrow />
          </a>
        </article>

        <article className="neu reveal relative flex flex-col rounded-[2rem] p-7 sm:p-9">
          <div className="flex items-center justify-between">
            <p className="label">Paquete 02</p>
            <span className="rounded-full bg-accent px-3 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-wider text-on-accent">
              Incluye paquete 01
            </span>
          </div>
          <h3 className="mt-4 text-3xl">Apps a la medida</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Tu presencia digital más el sistema que tu negocio necesita: web, móvil, escritorio o los tres.
          </p>
          <Pantalla arriba={plazo === 'MENSUAL' ? 'Desde · mensual' : 'Desde · anual'} {...appsPrecio} />
          <p className="mt-3 text-xs text-muted">El precio final depende de la complejidad y los módulos.</p>
          {plazo === 'MENSUAL' && (
            <p className="cambio mt-1 text-xs text-muted">
              Los costos de publicar tus apps en App Store y Play Store se pagan aparte.
            </p>
          )}
          <Lista items={apps} />
          <a href="#contacto" className="btn btn-accent mt-auto w-full">
            Cotizar mi app <IconArrow />
          </a>
        </article>
      </div>
    </Seccion>
  )
}
