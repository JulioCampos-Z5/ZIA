/**
 * Zorro geométrico de ZIA dibujado en línea para que tome los colores del
 * tema (claro u oscuro). El favicon (public/favicon.svg) es la misma figura.
 */
export default function Logo({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="8 6 48 52" fill="none" className={className} aria-hidden>
      <path
        d="M12 10 L25 24 H39 L52 10 L50 33 L32 54 L14 33 Z"
        className="fill-[var(--bg)] stroke-fg"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <path d="M21 31 H43 L21 44 H40" className="stroke-accent" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="21" cy="31" r="2.7" className="fill-accent" />
      <circle cx="43" cy="31" r="2.7" className="fill-accent" />
      <circle cx="32" cy="54" r="2.5" className="fill-fg" />
    </svg>
  )
}
