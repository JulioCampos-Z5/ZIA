import Header from './components/Header'
import Hero from './components/Hero'
import Bento from './components/Bento'
import Paquetes from './components/Paquetes'
import IAEmpresas from './components/IAEmpresas'
import Proyectos from './components/Proyectos'
import Preguntas from './components/Preguntas'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import Legal from './pages/Legal'
import TarjetaDigital from './pages/TarjetaDigital'
import { useReveal } from './lib/useReveal'

/** Enrutado mínimo: Cloudflare Pages sirve index.html en cualquier ruta (_redirects). */
const ruta = window.location.pathname.replace(/\/+$/, '')

export default function App() {
  useReveal()

  // La tarjeta digital va sola, sin el encabezado ni el pie del sitio
  if (ruta === '/tarjeta' || ruta.startsWith('/tarjeta/'))
    return <TarjetaDigital slug={ruta.slice('/tarjeta/'.length)} />

  const legal = ruta === '/privacidad' ? 'privacidad' : ruta === '/terminos' ? 'terminos' : null

  return (
    <>
      <Header />
      {legal ? (
        <Legal tipo={legal} />
      ) : (
        <main>
          <Hero />
          <Bento />
          <Paquetes />
          <IAEmpresas />
          <Proyectos />
          <Preguntas />
          <Contacto />
        </main>
      )}
      <Footer />
    </>
  )
}
