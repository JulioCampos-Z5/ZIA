import Logo from './Logo'
import { CORREO, TELEFONO_VISIBLE } from '../lib/contacto'

/** Barra inferior a la suiza: todo en una línea, chico y monoespaciado */
export default function Footer() {
  return (
    <footer className="pb-10">
      <div className="container-x">
        <div className="flex flex-col gap-10 border-t-2 border-fg pt-8 md:flex-row md:items-end md:justify-between">
          <div>
            <a href="/" className="flex items-center gap-3">
              <Logo className="h-10 w-10" />
              <span className="text-4xl font-extrabold tracking-tighter">ZIA</span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-muted">Tecnología con instinto. Presencia digital, apps y IA para empresas.</p>
          </div>
          <div className="grid gap-2 font-mono text-xs uppercase tracking-wider text-muted sm:grid-cols-2 sm:gap-x-10">
            <a href={`mailto:${CORREO}`} className="normal-case hover:text-accent">{CORREO}</a>
            <a href="/privacidad" className="hover:text-accent">Aviso de privacidad</a>
            <span>{TELEFONO_VISIBLE}</span>
            <a href="/terminos" className="hover:text-accent">Términos</a>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted">
          <span>
            <span className="mr-2 inline-block h-2 w-2 bg-accent align-middle" />
            ZIA · Hecho con astucia. 🦊
          </span>
          <span>© {new Date().getFullYear()} · Jalisco, MX</span>
        </div>
      </div>
    </footer>
  )
}
