import { IconArrow } from './icons'

/**
 * Composición tipo póster suizo: círculo rojo con anillo y punto, una Z
 * gruesa encima (la Z de ZIA) y un cuarto de círculo en tinta.
 */
function Poster() {
  return (
    <svg viewBox="0 0 400 420" className="h-full w-full" aria-hidden>
      <circle cx="250" cy="165" r="135" fill="var(--accent)" />
      <circle cx="250" cy="165" r="92" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="1.5" />
      <circle cx="250" cy="165" r="9" fill="var(--fg)" />
      <path
        d="M150 110 H350 L170 300 H370"
        fill="none"
        stroke="var(--fg)"
        strokeWidth="46"
        strokeLinejoin="miter"
        pathLength={1}
        className="draw"
      />
      <path d="M20 420 V270 A150 150 0 0 1 170 420 Z" fill="var(--fg)" />
      <text x="196" y="414" className="fill-[var(--muted)] font-mono" fontSize="11" letterSpacing="2">
        Nº 001 — ZIA
      </text>
    </svg>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-16 sm:pt-36">
      {/* Texto vertical en el margen, como en el póster */}
      <p
        className="label pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 -rotate-180 xl:block"
        style={{ writingMode: 'vertical-rl' }}
      >
        ZIA · Tecnología con instinto · Jalisco, MX · Edición 2026
      </p>

      <div className="container-x">
        {/* Fila superior estilo cartel: meta en columnas y un bloque rojo */}
        <div className="grid gap-4 border-b-2 border-fg pb-4 sm:grid-cols-12">
          <p className="text-lg font-extrabold leading-tight sm:col-span-4">
            Hecho con astucia<span className="text-accent">.</span> 🦊
          </p>
          <div className="bg-accent px-4 py-3 font-bold leading-tight text-on-accent sm:col-span-3">
            Paquetes desde
            <br />
            $6,000 MXN
          </div>
          <p className="text-sm leading-snug text-muted sm:col-span-5">
            Ponemos a tu negocio en internet, construimos las aplicaciones que necesitas y armamos una inteligencia
            artificial a la medida de tu empresa.
          </p>
        </div>

        <div className="grid items-center gap-10 pt-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="label">Nº 001 · Despachos, comercios y negocios</p>
            <h1 className="mt-5 text-[3.4rem] sm:text-7xl lg:text-[5.6rem]">
              Tecnología
              <br />
              con instinto<span className="text-accent">.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              La astucia del zorro con la inteligencia artificial de tu lado.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#paquetes" className="btn btn-accent">
                Ver paquetes <IconArrow />
              </a>
              <a href="#ia" className="btn btn-neu">
                IA para mi empresa
              </a>
            </div>
          </div>
          <div className="mx-auto aspect-[40/42] w-full max-w-md lg:col-span-6 lg:max-w-none">
            <Poster />
          </div>
        </div>
      </div>
    </section>
  )
}
