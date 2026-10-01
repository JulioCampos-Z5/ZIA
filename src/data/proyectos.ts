/**
 * Proyectos hechos por Zyncosoft.
 *
 * Cada proyecto necesita al menos `nombre`, `categoria`, `resumen` y, si es
 * público, su `url`. Los que no llevan `url` se muestran como trabajo privado
 * del cliente, sin enlace.
 */

export type CategoriaProyecto =
  | 'Página web'
  | 'Venta en línea'
  | 'Catálogo digital'
  | 'Tarjeta digital'
  | 'App móvil'
  | 'App de escritorio'
  | 'Sistema administrativo'

export type Proyecto = {
  /** Identificador corto y estable, se usa como key y como ancla. */
  slug: string
  nombre: string
  /** Nombre del cliente o del negocio. */
  cliente: string
  categoria: CategoriaProyecto
  /** Una o dos líneas: qué se resolvió, en lenguaje de negocio. */
  resumen: string
  /** Enlace público al trabajo. Déjalo vacío si el sistema es privado. */
  url?: string
  /** Año de entrega, para ordenar y dar contexto. */
  anio: number
  /** Tecnologías o piezas visibles, máximo tres o cuatro. */
  etiquetas: string[]
  /** Imagen de portada dentro de /public. Opcional: si falta se dibuja un marcador. */
  imagen?: string
}

export const proyectos: Proyecto[] = [
  {
    slug: 'dr-ricardo-estrada-garcia',
    nombre: 'Dr. Ricardo Estrada García',
    cliente: 'Dr. Ricardo Estrada García',
    categoria: 'Página web',
    resumen:
      'Sitio del consultorio con su especialidad, ubicación y contacto directo, para que un paciente nuevo lo encuentre y le escriba sin intermediarios.',
    url: 'https://dr-ricardo-estrada-garcia.pages.dev/',
    anio: 2025,
    etiquetas: ['Sitio médico', 'Contacto directo'],
  },
  {
    slug: 'tarjeta-dr-ricardo-estrada-garcia',
    nombre: 'Tarjeta digital Dr. Ricardo Estrada García',
    cliente: 'Dr. Ricardo Estrada García',
    categoria: 'Tarjeta digital',
    resumen:
      'Su tarjeta de presentación en un link: consultorios, teléfono y agenda de citas a un toque, lista para compartir por WhatsApp o con un QR.',
    url: 'https://dr-ricardo-estrada-garcia.pages.dev/tarjeta/',
    anio: 2025,
    etiquetas: ['Link compartible', 'QR', 'Agenda de citas'],
  },
  {
    slug: 'tarjeta-zyncosoft',
    nombre: 'Tarjeta digital Zyncosoft',
    cliente: 'Zyncosoft',
    categoria: 'Tarjeta digital',
    resumen:
      'Nuestra propia tarjeta de presentación en un link: datos de contacto listos para compartir en cualquier chat, sin imprimir nada.',
    url: 'https://tarjeta-zincosoft.pages.dev/',
    anio: 2025,
    etiquetas: ['Link compartible', 'QR'],
  },
  {
    slug: 'erp-administrativo',
    nombre: 'ERP administrativo',
    cliente: 'Proyecto privado',
    categoria: 'Sistema administrativo',
    resumen:
      'Inventario, ventas, compras y gastos en un solo sistema, con reportes que antes salían de juntar varios Excel a mano.',
    anio: 2025,
    etiquetas: ['Inventario', 'Ventas', 'Reportes'],
  },
  {
    slug: 'catalogos-digitales',
    nombre: 'Catálogos digitales',
    cliente: 'Proyecto privado',
    categoria: 'Catálogo digital',
    resumen:
      'Productos con foto, precio y existencia en un link que se manda por WhatsApp y se actualiza sin volver a diseñar nada.',
    anio: 2025,
    etiquetas: ['WhatsApp', 'Actualizable'],
  },
  {
    slug: 'tiendas-en-linea',
    nombre: 'Tiendas en línea',
    cliente: 'Proyecto privado',
    categoria: 'Venta en línea',
    resumen:
      'Tienda con carrito y cobro en línea, con los pedidos llegando ordenados y el inventario descontándose solo.',
    anio: 2025,
    etiquetas: ['Carrito', 'Pagos en línea'],
  },
]

/** Orden en que aparecen los filtros de la vista de proyectos. */
export const categorias: CategoriaProyecto[] = [
  'Página web',
  'Venta en línea',
  'Catálogo digital',
  'Tarjeta digital',
  'App móvil',
  'App de escritorio',
  'Sistema administrativo',
]
