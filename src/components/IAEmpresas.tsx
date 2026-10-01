import { useEffect, useState } from 'react'
import { IconArrow, IconCalc, IconDoc, IconFolder, IconPen } from './icons'
import Seccion from './Seccion'
import { whatsapp } from '../lib/contacto'

/**
 * Ejemplos de lo que hace la IA. Es una demostración escrita a mano, no una
 * IA real: se "teclea" en la pantalla para que se entienda la idea.
 */
const modos = [
  {
    id: 'DOCS',
    icon: IconDoc,
    nombre: 'Documentos',
    texto: 'Contratos, oficios y reportes con tu formato y tus datos.',
    pedido: 'Redacta un contrato de arrendamiento para un local comercial',
    respuesta: [
      'CONTRATO DE ARRENDAMIENTO',
      'Que celebran por una parte [ARRENDADOR]',
      'y por la otra [ARRENDATARIO]…',
      'CLÁUSULA PRIMERA. Objeto del contrato.',
      '✓ Listo · 3 páginas · formato de tu despacho',
    ],
  },
  {
    id: 'COTIZA',
    icon: IconCalc,
    nombre: 'Cotizaciones',
    texto: 'Le dices qué pidió el cliente y la arma con tus precios.',
    pedido: 'Cotiza 40 sillas Lisboa con entrega en Zapopan',
    respuesta: [
      'COTIZACIÓN Nº 0142',
      '40 × Silla Lisboa ...... $38,000.00',
      'Entrega Zapopan ........    $850.00',
      'IVA 16% ................  $6,216.00',
      'TOTAL .................. $45,066.00',
    ],
  },
  {
    id: 'ARCHIVOS',
    icon: IconFolder,
    nombre: 'Tus archivos',
    texto: 'Le pasas un Word o un PDF y te responde sobre él.',
    pedido: '¿Cuándo vence contrato_proveedor.pdf?',
    respuesta: [
      'Leí contrato_proveedor.pdf (12 págs.)',
      '→ Vence el 31 de marzo de 2027 (cláusula 9).',
      '→ Se renueva solo por 12 meses más.',
      '→ Cancelar antes cuesta 2 meses de renta.',
    ],
  },
  {
    id: 'REDACTA',
    icon: IconPen,
    nombre: 'Redacción',
    texto: 'Correos y respuestas a clientes, claros y sin hoja en blanco.',
    pedido: 'Dile al cliente que su pedido llega el jueves',
    respuesta: [
      'Hola, Sr. Ramírez:',
      'Le confirmamos que su pedido ya salió',
      'y llegará el jueves por la mañana.',
      'Quedamos atentos. Saludos cordiales.',
    ],
  },
]

const despliegues = {
  NUBE: 'Sin comprar equipo: tu IA vive en servidores y la usas desde donde sea.',
  OFICINA: 'Una máquina armada y configurada a la medida: tu información no sale de tu empresa.',
}
type Despliegue = keyof typeof despliegues

const pasos = [
  {
    n: '01',
    titulo: 'Diagnóstico y equipo',
    texto: 'Vemos qué quieres que haga tu IA y te decimos qué equipo necesitas: la nube o una computadora armada a tu medida.',
  },
  {
    n: '02',
    titulo: 'Desarrollo y entrenamiento',
    texto: 'Preparamos la IA con los documentos, formatos y forma de trabajar de tu empresa.',
  },
  {
    n: '03',
    titulo: 'Mantenimiento',
    texto: 'La cuidamos, la actualizamos y resolvemos dudas. Pago mensual o, si prefieres, uno solo al año.',
  },
]

/** Va mostrando el texto letra por letra; sin animación si el visitante la desactivó */
function useTecleo(texto: string) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(texto.length)
      return
    }
    setN(0)
    const t = setInterval(() => setN((v) => (v >= texto.length ? v : v + 2)), 22)
    return () => clearInterval(t)
  }, [texto])
  return texto.slice(0, n)
}

function Pantalla({ modo, despliegue }: { modo: (typeof modos)[number]; despliegue: Despliegue }) {
  const completo = `> ${modo.pedido}\n\n${modo.respuesta.join('\n')}`
  const visible = useTecleo(completo)
  const listo = visible.length >= completo.length

  return (
    <div className="screen flex min-h-[22rem] flex-col rounded-2xl p-5 font-mono text-[0.8rem] sm:text-sm">
      <div className="flex justify-between text-[0.65rem] uppercase tracking-[0.15em]">
        <span className="text-accent">● Ejemplo · {modo.id}</span>
        <span className="opacity-50">ZIA · IA-01</span>
      </div>
      <pre className="mt-5 flex-1 whitespace-pre-wrap leading-relaxed" aria-live="polite">
        {visible}
        <span className="cursor text-accent">▍</span>
      </pre>
      {/* Onda roja de "actividad", como el osciloscopio del sintetizador */}
      <svg viewBox="0 0 300 40" className="mt-4 h-10 w-full" preserveAspectRatio="none" aria-hidden>
        <path
          d={
            listo
              ? 'M0 20 H300'
              : 'M0 20 L30 20 L40 6 L48 34 L56 20 L110 20 L120 4 L128 36 L136 20 L190 20 L200 8 L208 32 L216 20 L300 20'
          }
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.6"
          style={{ filter: 'drop-shadow(0 0 4px var(--accent))', transition: 'd .3s' }}
        />
      </svg>
      <div className="mt-3 flex flex-wrap justify-between gap-2 border-t border-white/10 pt-3 text-[0.65rem] uppercase tracking-[0.15em] opacity-60">
        <span>Modo {modo.id}</span>
        <span>{despliegue}</span>
        <span>{listo ? 'Listo' : 'Escribiendo…'}</span>
      </div>
    </div>
  )
}

export default function IAEmpresas() {
  const [activo, setActivo] = useState(0)
  const [despliegue, setDespliegue] = useState<Despliegue>('NUBE')
  const modo = modos[activo]

  return (
    <Seccion
      id="ia"
      numero="003"
      etiqueta="Infraestructura de IA"
      titulo={
        <>
          Una IA hecha para <span className="text-accent">tu empresa</span>
        </>
      }
      bajada="No es un chat genérico: es una inteligencia artificial configurada con la información de tu negocio que le quita a tu equipo el papeleo. Pensada para despachos y comercios."
    >
      {/* El "aparato": pantalla a la izquierda, controles a la derecha */}
      <div className="neu reveal mt-14 rounded-[2rem] p-5 sm:p-8">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-extrabold tracking-[0.25em]">ZIA · IA-01</p>
          <p className="label">
            <span className="text-accent">Asistente para empresas</span> · Toca un modo para ver un ejemplo
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Pantalla modo={modo} despliegue={despliegue} />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5">
            <div>
              <p className="label">Modos</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {modos.map((m, i) => {
                  const on = i === activo
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setActivo(i)}
                      aria-pressed={on}
                      className={`rounded-2xl p-4 text-left transition-shadow ${on ? 'neu-in' : 'neu-sm hover:text-accent'}`}
                    >
                      <span className="flex items-center justify-between">
                        <m.icon className={`h-5 w-5 ${on ? 'text-accent' : ''}`} />
                        <span className={`led ${on ? 'led-on' : ''}`} />
                      </span>
                      <span className="mt-3 block text-sm font-bold">{m.nombre}</span>
                      <span className="mt-1 block text-xs leading-snug text-muted">{m.texto}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <p className="label">¿Dónde vive tu IA?</p>
              <div className="neu-in mt-3 flex rounded-full p-1.5">
                {(Object.keys(despliegues) as Despliegue[]).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDespliegue(d)}
                    aria-pressed={despliegue === d}
                    className={`flex-1 rounded-full py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                      despliegue === d ? 'neu-sm text-accent' : 'text-muted'
                    }`}
                  >
                    {d === 'NUBE' ? 'En la nube' : 'En tu oficina'}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{despliegues[despliegue]}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="reveal mt-20 grid gap-6 lg:grid-cols-12">
        <h3 className="text-3xl lg:col-span-4">¿Cómo se cobra?</h3>
        <p className="leading-relaxed text-muted lg:col-span-8">
          Cada IA es distinta, por eso se cotiza a la medida, en tres partes para que siempre sepas qué estás pagando.
        </p>
      </div>

      <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-6">
        {pasos.map((p) => (
          <li key={p.n} className="reveal border-t-2 border-fg pt-4">
            <span className="block text-7xl font-extrabold tracking-tighter text-accent">{p.n}</span>
            <h4 className="mt-4 text-xl">{p.titulo}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.texto}</p>
          </li>
        ))}
      </ol>

      <div className="reveal mt-14 flex flex-col gap-4 sm:flex-row">
        <a href="#contacto" className="btn btn-accent">
          Solicitar cotización <IconArrow />
        </a>
        <a
          href={whatsapp('¡Hola! Me interesa una IA para mi empresa. ¿Me pueden dar más información?')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-neu"
        >
          Preguntar por WhatsApp
        </a>
      </div>
    </Seccion>
  )
}
