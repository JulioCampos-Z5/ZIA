/**
 * Tarjetas digitales de ZIA.
 *
 * Cada entrada es una tarjeta y se ve en /tarjeta/<slug>. La que tiene el
 * slug 'zia' es la de la empresa y también responde en /tarjeta a secas.
 *
 * Para hacer una tarjeta nueva (un empleado o un cliente del paquete
 * Presencia digital): copia el bloque de ejemplo, cambia el slug y los datos,
 * y listo. Los campos opcionales que dejes vacíos no se muestran.
 */

export type Tarjeta = {
  /** Lo que va en la URL: minúsculas y guiones, sin acentos */
  slug: string
  /** Nombre grande de la tarjeta: la persona o el negocio */
  nombre: string
  /** Puesto o giro, va en la etiqueta de arriba */
  cargo: string
  /** Empresa que sale en el contacto guardado */
  empresa: string
  /** Frase corta debajo del nombre */
  lema?: string
  /**
   * Si la pones, la tarjeta usa el estilo lista: el nombre hasta arriba y
   * debajo el lema y estas etiquetas, una por renglón. El cargo ya no se ve
   * en la tarjeta, pero sigue yendo en el contacto guardado.
   */
  etiquetas?: string[]
  /** Teléfono a 10 dígitos, sin espacios */
  telefono?: string
  /** WhatsApp a 10 dígitos; si falta se usa el teléfono */
  whatsapp?: string
  correo?: string
  web?: string
  /** Dirección en una línea; se abre en Google Maps */
  direccion?: string
  instagram?: string
  facebook?: string
  linkedin?: string
  /** Lista corta de lo que ofrece (máximo 4 se ven bien) */
  servicios?: { nombre: string; detalle: string }[]
}

/** "Lo que hacemos": lo comparten la tarjeta de ZIA y las de su equipo */
const serviciosZIA = [
  { nombre: 'Presencia digital', detalle: 'Página web, tarjeta digital y Google Maps desde $6,000.' },
  { nombre: 'Apps a la medida', detalle: 'Web, móvil y escritorio desde $12,000.' },
  { nombre: 'IA para tu empresa', detalle: 'Documentos, cotizaciones y papeleo. Por cotización.' },
]

export const tarjetas: Tarjeta[] = [
  {
    slug: 'zia',
    nombre: 'ZIA',
    cargo: 'Presencia digital · Apps · IA',
    empresa: 'ZIA',
    lema: 'Hecho con astucia. 🦊',
    telefono: '3339057215',
    correo: 'zyncosoft@gmail.com',
    web: 'https://zia-ia.pages.dev/',
    servicios: serviciosZIA,
  },
  // Juan: /tarjeta/juan (datos de su tarjeta anterior de Zyncosoft)
  {
    slug: 'juan',
    nombre: 'Juan Rodriguez',
    cargo: 'Project Manager',
    empresa: 'ZIA',
    lema: 'Hecho con astucia. 🦊',
    etiquetas: ['Presencia digital', 'Apps', 'IA'],
    whatsapp: '3521165602',
    correo: 'zyncosoft@gmail.com',
    web: 'https://zia-ia.pages.dev/',
    instagram: 'https://www.instagram.com/zyncosoft.oficial',
    linkedin: 'https://www.linkedin.com/in/ju4d/?locale=es-ES',
    servicios: serviciosZIA,
  },
  // Ejemplo de tarjeta personal: /tarjeta/ejemplo
  // Bórralo o cámbialo por la de alguien real.
  {
    slug: 'ejemplo',
    nombre: 'Nombre Apellido',
    cargo: 'Puesto en la empresa',
    empresa: 'ZIA',
    lema: 'Hecho con astucia. 🦊',
    telefono: '3339057215',
    correo: 'zyncosoft@gmail.com',
    web: 'https://zia-ia.pages.dev/',
    direccion: 'Guadalajara, Jalisco',
  },
]

export const tarjetaPorSlug = (slug: string) =>
  tarjetas.find((t) => t.slug === (slug || 'zia'))
