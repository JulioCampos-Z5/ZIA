import { IconArrow } from './icons'

/** Botón redondo de la esquina de cada tarjeta */
function Esquina({ clase }: { clase: string }) {
  return (
    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform group-hover:-rotate-45 ${clase}`}>
      <IconArrow className="h-5 w-5" />
    </span>
  )
}

/** Ventana de navegador con un pin de mapa: la página web y Google Maps */
function VisualWeb() {
  return (
    <svg viewBox="0 0 220 120" className="h-full w-full" aria-hidden>
      <rect x="1.5" y="1.5" width="170" height="104" rx="8" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M1.5 24 H171.5" stroke="currentColor" strokeWidth="3" />
      <circle cx="14" cy="13" r="3" fill="currentColor" />
      <circle cx="24" cy="13" r="3" fill="currentColor" />
      <rect x="16" y="40" width="70" height="9" rx="2" fill="currentColor" />
      <rect x="16" y="56" width="105" height="5" rx="2" fill="currentColor" opacity=".55" />
      <rect x="16" y="66" width="90" height="5" rx="2" fill="currentColor" opacity=".55" />
      <rect x="16" y="82" width="40" height="12" rx="6" fill="currentColor" />
      {/* Pin de Google Maps saliéndose de la ventana */}
      <path d="M182 50 c-15 0 -26 11 -26 25 c0 19 26 43 26 43 s26 -24 26 -43 c0 -14 -11 -25 -26 -25 Z" fill="#141416" />
      <circle cx="182" cy="75" r="9" fill="var(--accent)" />
    </svg>
  )
}

/** Escritorio, ventana y celular: las tres plataformas */
function VisualApps() {
  return (
    <svg viewBox="0 0 220 120" className="h-full w-full" aria-hidden>
      <rect x="1.5" y="8" width="120" height="80" rx="6" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M45 104 H78 M61.5 88 V104" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <rect x="90" y="30" width="80" height="58" rx="5" fill="var(--bg)" stroke="currentColor" strokeWidth="3" />
      <path d="M90 44 H170" stroke="currentColor" strokeWidth="3" />
      <rect x="100" y="54" width="28" height="24" rx="2" fill="var(--accent)" />
      <rect x="134" y="54" width="26" height="5" rx="2" fill="currentColor" opacity=".55" />
      <rect x="134" y="64" width="20" height="5" rx="2" fill="currentColor" opacity=".55" />
      <rect x="176" y="40" width="40" height="74" rx="8" fill="var(--bg)" stroke="currentColor" strokeWidth="3" />
      <path d="M190 106 H202" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="196" cy="70" r="7" fill="var(--accent)" />
    </svg>
  )
}

/** Hojas apiladas; la de enfrente se "escribe" con renglones rojos */
function VisualIA() {
  const rojos = [90, 76, 48]
  return (
    <svg viewBox="40 0 190 170" className="h-full w-full" aria-hidden>
      <rect x="60" y="6" width="120" height="150" rx="6" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="2" transform="rotate(-8 120 81)" />
      <rect x="70" y="10" width="120" height="150" rx="6" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="2" transform="rotate(-3 130 85)" />
      <rect x="84" y="14" width="120" height="150" rx="6" fill="#ececf1" />
      <rect x="98" y="30" width="56" height="8" rx="2" fill="#141416" />
      {[50, 62, 74, 86].map((y, i) => (
        <rect key={y} x="98" y={y} width={[88, 80, 92, 64][i]} height="5" rx="2" fill="#141416" opacity=".35" />
      ))}
      {[104, 116, 128].map((y, i) => (
        <rect key={y} x="98" y={y} width={rojos[i]} height="5" rx="2" fill="var(--accent)">
          <animate attributeName="width" from="0" to={rojos[i]} dur="1.2s" begin={`${i * 0.5}s`} fill="freeze" />
        </rect>
      ))}
      <rect x="148" y="126" width="3" height="9" fill="var(--accent)" className="cursor" />
    </svg>
  )
}

/**
 * Las tres líneas de negocio en tarjetas tipo bento con los colores de ZIA:
 * rojo, papel en relieve y tinta. Los gráficos son decorativos: no muestran
 * datos reales.
 */
export default function Bento() {
  return (
    <section className="pb-24" aria-label="Lo que hacemos">
      <div className="container-x">
        <div className="neu grid gap-2 rounded-[2rem] p-2 md:grid-cols-2">
          <a href="#paquetes" className="reveal group relative flex min-h-72 flex-col overflow-hidden rounded-[1.6rem] bg-accent p-6 text-on-accent">
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <h3 className="font-mono text-2xl font-bold tracking-tight">Presencia digital</h3>
                <p className="mt-1 font-mono text-sm opacity-75">Web · Tarjeta · Maps</p>
              </div>
              <Esquina clase="bg-on-accent text-accent" />
            </div>
            <div className="relative z-10 my-5 h-28">
              <VisualWeb />
            </div>
            <div className="relative z-10 mt-auto">
              <p className="font-mono text-3xl font-bold">$6,000</p>
              <p className="font-mono text-sm opacity-75">Pago único · IVA incluido</p>
            </div>
          </a>

          <a href="#paquetes" className="neu-in reveal group flex min-h-72 flex-col rounded-[1.6rem] p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-mono text-2xl font-bold tracking-tight">Apps a la medida</h3>
                <p className="mt-1 font-mono text-sm text-muted">Incluye presencia digital</p>
              </div>
              <Esquina clase="bg-fg text-bg" />
            </div>
            <div className="my-5 h-28 text-fg">
              <VisualApps />
            </div>
            <div className="flex items-end justify-between font-mono">
              <div>
                <p className="text-3xl font-bold">$12,000</p>
                <p className="text-sm text-muted">Desde</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">Web · Móvil</p>
                <p className="text-sm text-muted">Escritorio</p>
              </div>
            </div>
          </a>

          <a href="#ia" className="reveal group flex flex-col gap-6 rounded-[1.6rem] bg-screen p-6 text-screen-fg md:col-span-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-sm text-accent">Infraestructura de IA · Documentos · Cotizaciones</p>
              <h3 className="mt-5 max-w-md font-mono text-3xl font-bold leading-tight tracking-tight">
                Una IA que hace el papeleo por ti 🦊
              </h3>
            </div>
            <div className="h-36 shrink-0 md:h-40 md:w-56">
              <VisualIA />
            </div>
            <div className="flex flex-col items-start gap-4 md:items-end">
              <span className="flex rounded-full bg-white/10 p-1 font-mono text-xs" aria-hidden>
                <span className="rounded-full px-3 py-1 opacity-70">Nube</span>
                <span className="rounded-full bg-accent px-3 py-1 text-on-accent">Oficina</span>
              </span>
              <div className="md:text-right">
                <p className="font-mono text-4xl font-bold">A la medida</p>
                <p className="font-mono text-sm text-accent">Por cotización</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
