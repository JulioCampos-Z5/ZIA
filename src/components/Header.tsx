import { useState } from 'react'
import Logo from './Logo'
import { useTema } from '../lib/tema'

const links = [
  { href: '/#paquetes', label: 'Paquetes' },
  { href: '/#ia', label: 'IA' },
  { href: '/#proyectos', label: 'Proyectos' },
  { href: '/#preguntas', label: 'Preguntas' },
]

/** Interruptor Claro / Oscuro en forma de píldora, como el Weekly / Monthly de 0xCal */
function SelectorTema() {
  const { tema, alternar } = useTema()
  const oscuro = tema === 'dark'
  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="relative flex rounded-full bg-ink p-1 font-mono text-[0.68rem] font-bold uppercase tracking-wider text-white"
    >
      <span
        className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-accent transition-transform duration-300"
        style={{ transform: oscuro ? 'translateX(100%)' : 'none' }}
        aria-hidden
      />
      <span className={`relative px-3 py-1 ${oscuro ? "opacity-60" : ""}`}>Claro</span>
      <span className={`relative px-3 py-1 ${oscuro ? "" : "opacity-60"}`}>Oscuro</span>
    </button>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <div className="neu mx-auto flex h-14 max-w-[74rem] items-center justify-between gap-3 rounded-full pl-4 pr-2">
        <a href="/" className="flex items-center gap-2" aria-label="ZIA, inicio">
          <Logo />
          <span className="text-lg font-extrabold tracking-tight">ZIA</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="label !text-fg transition-colors hover:!text-accent">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <SelectorTema />
          <a href="/#contacto" className="btn btn-accent hidden !py-2.5 md:inline-flex">
            Cotizar
          </a>
          <button
            className="btn-neu flex h-10 w-10 items-center justify-center rounded-full md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M5 9h14M5 15h14" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="neu mx-auto mt-3 flex max-w-[74rem] flex-col rounded-3xl p-5 md:hidden" aria-label="Móvil">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-line py-3 font-mono text-sm uppercase tracking-wider">
              {l.label}
            </a>
          ))}
          <a href="/#contacto" onClick={() => setOpen(false)} className="btn btn-accent mt-5">
            Cotizar
          </a>
        </nav>
      )}
    </header>
  )
}
