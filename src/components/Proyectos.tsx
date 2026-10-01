import { proyectos } from '../data/proyectos'
import { IconArrow } from './icons'
import Seccion from './Seccion'

export default function Proyectos() {
  return (
    <Seccion
      id="proyectos"
      numero="004"
      etiqueta="Proyectos"
      titulo="Trabajo que ya funciona"
      bajada="Algunos son públicos y puedes abrirlos; otros son sistemas privados de nuestros clientes."
    >
      <ul className="mt-12">
        {proyectos.map((p, i) => {
          const fila = (
            <>
              <span className="font-mono text-sm font-bold sm:w-14 sm:shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <span className="label sm:w-48 sm:shrink-0">{p.categoria}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-xl font-bold tracking-tight">{p.nombre}</span>
                <span className="mt-1 block max-w-xl text-sm leading-relaxed text-muted">{p.resumen}</span>
              </span>
              <span className="sm:shrink-0">
                {p.url ? (
                  <span className="neu-sm flex h-11 w-11 items-center justify-center rounded-full text-accent transition-transform group-hover:-rotate-45">
                    <IconArrow className="h-5 w-5" />
                  </span>
                ) : (
                  <span className="label">Privado</span>
                )}
              </span>
            </>
          )
          const clase = 'reveal flex flex-col gap-2 border-b border-line py-7 sm:flex-row sm:items-center sm:gap-6'
          return (
            <li key={p.slug}>
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className={`group ${clase}`}>
                  {fila}
                </a>
              ) : (
                <div className={clase}>{fila}</div>
              )}
            </li>
          )
        })}
      </ul>
    </Seccion>
  )
}
