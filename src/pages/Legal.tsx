import { CORREO } from '../lib/contacto'

/**
 * Textos base del aviso de privacidad y los términos.
 * PENDIENTE antes de publicar: completar los datos marcados con [ ] y pedir
 * a un abogado que lo revise (LFPDPPP).
 */
const privacidad = [
  {
    t: 'Responsable',
    p: `ZIA (marca comercial de Zyncosoft), con domicilio en [domicilio fiscal], es responsable del tratamiento de tus datos personales. Contacto: ${CORREO}.`,
  },
  {
    t: 'Datos que recabamos',
    p: 'Nombre, empresa, correo electrónico, teléfono y la información que nos compartas en el formulario de contacto o por WhatsApp.',
  },
  {
    t: 'Para qué los usamos',
    p: 'Para responder tu solicitud, preparar cotizaciones, prestar los servicios contratados y darte seguimiento. No vendemos ni compartimos tus datos con terceros para fines publicitarios.',
  },
  {
    t: 'Información de tu empresa en servicios de IA',
    p: 'Los documentos y datos que nos entregues para configurar tu inteligencia artificial se usan exclusivamente para ese fin, se tratan como confidenciales y no se usan para entrenar servicios de otros clientes. Al terminar la relación se devuelven o eliminan según lo acordado por escrito.',
  },
  {
    t: 'Derechos ARCO',
    p: `Puedes solicitar el acceso, rectificación, cancelación u oposición al uso de tus datos escribiendo a ${CORREO}. Te responderemos en un plazo máximo de 20 días hábiles.`,
  },
  {
    t: 'Cambios a este aviso',
    p: 'Cualquier cambio se publicará en esta página.',
  },
]

const terminos = [
  {
    t: 'Paquete Presencia digital',
    p: 'Pago único de $6,000 MXN con IVA incluido. Incluye el primer año de mantenimiento; a partir del segundo año el mantenimiento cuesta $2,000 MXN anuales. No incluye aplicaciones web.',
  },
  {
    t: 'Paquete Apps a la medida',
    p: 'Desde $12,000 MXN; el precio final se fija en una cotización por escrito según la complejidad y los módulos solicitados. Incluye todo lo del paquete Presencia digital.',
  },
  {
    t: 'Infraestructura de IA',
    p: 'Se cotiza por etapas: diagnóstico y definición del equipo (cuya compra corre por cuenta del cliente), desarrollo y entrenamiento, y mantenimiento mensual o anual.',
  },
  {
    t: 'Cambios y alcance',
    p: 'El alcance de cada proyecto es el que se acuerda en la cotización. Lo que quede fuera se cotiza por separado.',
  },
  {
    t: 'Contacto',
    p: `Para cualquier duda sobre estos términos escríbenos a ${CORREO}.`,
  },
]

export default function Legal({ tipo }: { tipo: 'privacidad' | 'terminos' }) {
  const secciones = tipo === 'privacidad' ? privacidad : terminos
  const titulo = tipo === 'privacidad' ? 'Aviso de privacidad' : 'Términos y condiciones'
  return (
    <main className="container-x max-w-3xl pt-36 pb-24">
      <h1 className="text-4xl sm:text-6xl">{titulo}</h1>
      <p className="mt-2 text-sm text-muted">Última actualización: septiembre de 2026</p>
      <div className="mt-10 space-y-8">
        {secciones.map((s) => (
          <section key={s.t}>
            <h2 className="text-lg">{s.t}</h2>
            <p className="mt-2 leading-relaxed text-muted">{s.p}</p>
          </section>
        ))}
      </div>
    </main>
  )
}
