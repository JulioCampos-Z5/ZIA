type P = { className?: string }
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export const IconCheck = ({ className = 'h-5 w-5' }: P) => (
  <svg {...base} className={className}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
)
export const IconArrow = ({ className = 'h-4 w-4' }: P) => (
  <svg {...base} className={className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const IconWhatsapp = ({ className = 'h-5 w-5' }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
  </svg>
)
export const IconMail = ({ className = 'h-5 w-5' }: P) => (
  <svg {...base} className={className}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
)
export const IconGlobe = ({ className = 'h-6 w-6' }: P) => (
  <svg {...base} className={className}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3Z" /></svg>
)
export const IconApps = ({ className = 'h-6 w-6' }: P) => (
  <svg {...base} className={className}><rect x="3" y="4" width="13" height="10" rx="1.5" /><path d="M7 18h5" /><rect x="15" y="9" width="6" height="11" rx="1.5" /></svg>
)
export const IconSpark = ({ className = 'h-6 w-6' }: P) => (
  <svg {...base} className={className}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /><circle cx="12" cy="12" r="2.2" /></svg>
)
export const IconDoc = ({ className = 'h-6 w-6' }: P) => (
  <svg {...base} className={className}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg>
)
export const IconCalc = ({ className = 'h-6 w-6' }: P) => (
  <svg {...base} className={className}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01" /></svg>
)
export const IconFolder = ({ className = 'h-6 w-6' }: P) => (
  <svg {...base} className={className}><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /><path d="M8 13h8" /></svg>
)
export const IconPen = ({ className = 'h-6 w-6' }: P) => (
  <svg {...base} className={className}><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16Z" /><path d="m13.5 6.5 4 4" /></svg>
)
export const IconCloud = ({ className = 'h-6 w-6' }: P) => (
  <svg {...base} className={className}><path d="M7 18a4 4 0 0 1-.6-8A6 6 0 0 1 18 9.5a4.3 4.3 0 0 1-.5 8.5Z" /></svg>
)
export const IconServer = ({ className = 'h-6 w-6' }: P) => (
  <svg {...base} className={className}><rect x="4" y="3" width="16" height="7" rx="1.5" /><rect x="4" y="14" width="16" height="7" rx="1.5" /><path d="M8 6.5h.01M8 17.5h.01" /></svg>
)
export const IconSun = ({ className = 'h-4 w-4' }: P) => (
  <svg {...base} className={className}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
)
export const IconMoon = ({ className = 'h-4 w-4' }: P) => (
  <svg {...base} className={className}><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /></svg>
)
export const IconPhone = ({ className = 'h-5 w-5' }: P) => (
  <svg {...base} className={className}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
)
export const IconPin = ({ className = 'h-5 w-5' }: P) => (
  <svg {...base} className={className}><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
)
export const IconShare = ({ className = 'h-5 w-5' }: P) => (
  <svg {...base} className={className}><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4" /></svg>
)
export const IconDownload = ({ className = 'h-5 w-5' }: P) => (
  <svg {...base} className={className}><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" /></svg>
)
export const IconInstagram = ({ className = 'h-5 w-5' }: P) => (
  <svg {...base} className={className}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17 7h.01" /></svg>
)
export const IconFacebook = ({ className = 'h-5 w-5' }: P) => (
  <svg {...base} className={className}><path d="M14 21v-8h3l.5-3.5H14V7.5c0-1 .4-1.7 1.8-1.7H18V2.7A22 22 0 0 0 15.3 2.5C12.6 2.5 11 4.1 11 7v2.5H8V13h3v8" /></svg>
)
export const IconLinkedin = ({ className = 'h-5 w-5' }: P) => (
  <svg {...base} className={className}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10.5V17M8 7.5h.01M12 17v-6.5M12 13.5c0-2 1.2-3 2.6-3S17 11.2 17 13v4" /></svg>
)
