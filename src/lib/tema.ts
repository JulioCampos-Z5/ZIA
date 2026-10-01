import { useEffect, useState } from 'react'

export type Tema = 'light' | 'dark'

/**
 * El sitio arranca en blanco; el visitante puede cambiar a oscuro y se
 * recuerda en su navegador. index.html aplica el tema guardado antes de
 * pintar para que no parpadee.
 */
export function useTema() {
  const [tema, setTema] = useState<Tema>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = tema
    try {
      localStorage.setItem('zia-tema', tema)
    } catch {
      /* navegación privada: no pasa nada si no se guarda */
    }
  }, [tema])

  return { tema, alternar: () => setTema((t) => (t === 'dark' ? 'light' : 'dark')) }
}
