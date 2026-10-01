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
      <p className="mt-2 text-5xl font-bold tracking-tight">{precio}</p>
      <p className="mt-1 text-[0.7rem] uppercase tracking-[0.12em] opacity-50">{abajo}</p>
    </div>
  )
}

export default function Paquetes() {
  return (
    <Seccion
      id="paquetes"
      numero="002"
      etiqueta="Paquetes"
      titulo="Elige cómo quieres crecer"
      bajada="Empieza por estar en internet y, cuando lo necesites, da el salto a tus propias aplicaciones."
    >
      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <article className="neu reveal flex flex-col rounded-[2rem] p-7 sm:p-9">
          <div className="flex items-center justify-between">
            <p className="label">Paquete 01</p>
            <span className="label">Solo página web</span>
          </div>
          <h3 className="mt-4 text-3xl">Presencia digital</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Para que tus clientes te encuentren, te conozcan y te escriban.
          </p>
          <Pantalla arriba="Pago único" precio="$6,000" abajo="IVA incluido" />
          <p className="neu-in mt-6 rounded-2xl px-5 py-4 text-sm text-muted">
            Mantenimiento de <strong className="text-fg">$2,000 al año</strong> a partir del segundo año. El primero
            ya va incluido.
          </p>
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
          <Pantalla arriba="Desde" precio="$12,000" abajo="Según complejidad y módulos" />
          <Lista items={apps} />
          <a href="#contacto" className="btn btn-accent mt-auto w-full">
            Cotizar mi app <IconArrow />
          </a>
        </article>
      </div>
    </Seccion>
  )
}
