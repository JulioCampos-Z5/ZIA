import Seccion from "./Seccion"

const preguntas = [
  {
    p: '¿Qué incluye exactamente el pago de $6,000?',
    r: 'Tu página web con formulario de contacto, botón de WhatsApp y mapa de Google; tu tarjeta digital; el alta de tu negocio en Google Maps; SEO y metadatos para buscadores, redes sociales y asistentes de IA. Es un pago único con IVA incluido y el primer año de mantenimiento.',
  },
  {
    p: '¿Qué cubre el mantenimiento de $2,000 al año?',
    r: 'Que tu página siga en línea, segura y funcionando. Se paga a partir del segundo año.',
  },
  {
    p: '¿El paquete de apps incluye la página web?',
    r: 'Sí. El paquete Apps a la medida incluye todo lo del paquete Presencia digital, además del sistema que necesites.',
  },
  {
    p: '¿Mi información está segura con la IA?',
    r: 'Si tu información es delicada, podemos instalar la IA en una máquina dentro de tu oficina para que tus documentos no salgan de tu empresa. También existe la opción en la nube si prefieres no comprar equipo.',
  },
  {
    p: '¿Tengo que comprar una computadora para tener mi IA?',
    r: 'Depende del tipo de IA que quieras. En el diagnóstico te decimos si conviene la nube o un equipo propio, y qué equipo exactamente.',
  },
  {
    p: '¿Cómo pago el mantenimiento de la IA?',
    r: 'Puedes pagarlo cada mes o en un solo pago anual.',
  },
]

export default function Preguntas() {
  return (
    <Seccion id="preguntas" numero="005" etiqueta="Preguntas frecuentes" titulo="Lo que más nos preguntan">
      <div className="neu-in reveal mt-12 rounded-[2rem] p-3 sm:p-4">
        {preguntas.map(({ p, r }, i) => (
          <details key={p} className="group rounded-2xl px-4 py-1 open:neu-sm sm:px-6">
            <summary className="flex cursor-pointer list-none items-center gap-4 py-4 font-bold">
              <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1">{p}</span>
              <span className="led group-open:led-on" />
            </summary>
            <p className="max-w-2xl pb-5 pl-9 text-sm leading-relaxed text-muted">{r}</p>
          </details>
        ))}
      </div>
    </Seccion>
  )
}
