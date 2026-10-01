import type { ReactNode } from 'react'

/**
 * Encabezado de sección a la suiza: filete grueso, número grande y título
 * alineado a la izquierda, con la bajada en otra columna.
 */
export default function Seccion({
  id,
  numero,
  etiqueta,
  titulo,
  bajada,
  children,
}: {
  id: string
  numero: string
  etiqueta: string
  titulo: ReactNode
  bajada?: ReactNode
  children: ReactNode
}) {
  return (
    <section id={id} className="py-20 sm:py-28">
      <div className="container-x">
        <div className="reveal border-t-2 border-fg pt-5">
          <div className="flex items-baseline justify-between gap-4">
            <p className="label">{etiqueta}</p>
            <p className="font-mono text-sm font-bold">Nº {numero}</p>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 className="text-4xl sm:text-6xl lg:col-span-7">{titulo}</h2>
            {bajada && <p className="max-w-md leading-relaxed text-muted lg:col-span-5">{bajada}</p>}
          </div>
        </div>
        {children}
      </div>
    </section>
  )
}
