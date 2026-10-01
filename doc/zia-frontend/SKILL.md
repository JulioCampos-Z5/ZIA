---
name: zia-frontend
description: Cómo está hecho y cómo se modifica el front del sitio de ZIA (Vite + React + Tailwind v4 en Cloudflare Pages). Úsala antes de tocar cualquier sección, estilo, texto, precio, proyecto o tarjeta digital del sitio, para respetar la identidad visual (papel neumórfico, póster suizo, un solo rojo) y las convenciones del código.
---

# Front de ZIA

ZIA es la imagen comercial de Zyncosoft (misma empresa). El sitio es una
landing en español de México con tres líneas de negocio:

| Línea | Precio | Notas |
|---|---|---|
| Presencia digital | **$6,000 MXN**, pago único, **IVA incluido** | Mantenimiento **$2,000/año** a partir del 2.º año. Solo página web, sin apps. |
| Apps a la medida | **desde $12,000 MXN** | Web, móvil y escritorio. Incluye Presencia digital. |
| Infraestructura de IA | Por cotización | En la nube u oficina. Se cobra: diagnóstico y equipo → desarrollo y entrenamiento → mantenimiento mensual o anual. Para despachos y comercios. |

Eslogan: **"Hecho con astucia. 🦊"** (el mismo de Zyncosoft). No inventar otro.

## Stack y comandos

- Vite 6 + React 18 + TypeScript estricto + Tailwind CSS v4 (`@tailwindcss/vite`).
- Paquetes con **pnpm**. Node 20 (`.node-version`).
- Sin router: `src/App.tsx` mira `window.location.pathname`. Cloudflare Pages
  sirve `index.html` en cualquier ruta (`public/_redirects`).

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # tsc -b && vite build → dist/
```

`pnpm build` debe pasar sin errores antes de subir cualquier cambio.

## Estructura

```
src/
  App.tsx              rutas: /, /privacidad, /terminos, /tarjeta[/slug]
  index.css            TODO el sistema de diseño (tokens, utilidades, animaciones)
  components/
    Header.tsx         barra flotante en relieve + selector Claro/Oscuro
    Hero.tsx           portada tipo póster (círculo rojo + Z)
    Bento.tsx          las 3 líneas de negocio en tarjetas
    Seccion.tsx        encabezado común de sección (filete + Nº 00X)
    Paquetes.tsx       Nº 002
    IAEmpresas.tsx     Nº 003 · "aparato" IA-01 con pantalla y teclas
    Proyectos.tsx      Nº 004
    Preguntas.tsx      Nº 005
    Contacto.tsx       Nº 006 · formulario → /api/contacto
    Footer.tsx, Logo.tsx, icons.tsx
  pages/
    Legal.tsx          aviso de privacidad y términos
    TarjetaDigital.tsx tarjeta digital (vCard, QR, compartir)
  data/
    proyectos.ts       portafolio (los mismos de Zyncosoft)
    tarjetas.ts        tarjetas digitales, una por slug
  lib/
    contacto.ts        teléfono, WhatsApp, correo, URL del sitio
    tema.ts            hook useTema (claro/oscuro)
    useReveal.ts       animación de entrada (.reveal)
functions/api/contacto.ts   Pages Function: manda el formulario por Resend
public/                     logo, favicon, llms.txt, robots, sitemap, _headers
```

## Identidad visual (no negociable)

Mezcla de tres referencias: **sintetizador neumórfico** (papel perla, relieves
suaves, LED rojos, pantalla oscura), **póster suizo** (retícula, filetes negros,
números grandes, un solo rojo) y la **estructura bento de 0xCal** solo en el
bloque de las tres líneas.

- **Un solo color de acento: rojo `--accent`.** Nada de degradados, brillos,
  violetas, cianes ni pasteles (fueron rechazados).
- Fondo papel `#ebebef` en claro y `#1d1e22` en oscuro. El sitio abre en
  **claro**; el oscuro es opcional y se recuerda en `localStorage` (`zia-tema`).
- Tipografía: **Archivo** (títulos peso 800, `letter-spacing` negativo) y
  **Space Mono** (etiquetas, números, precios).
- Logo: zorro geométrico con una Z y nodos (`Logo.tsx`, `public/favicon.svg`).
  **No cambiar la forma**; solo puede tomar los colores del tema.
- El bloque `Bento.tsx` conserva su estructura (2 tarjetas arriba + 1 ancha).
  Si se pide un cambio ahí, se ajustan colores o dibujos, no la estructura.

### Tokens (en `src/index.css`)

Los colores son variables CSS en `:root` y se redefinen en
`[data-theme='dark']`. Tailwind los expone así:

| Clase | Uso |
|---|---|
| `bg-bg` / `text-fg` | fondo papel / tinta |
| `text-muted`, `border-line` | texto secundario, filetes finos |
| `bg-accent`, `text-accent`, `text-on-accent` | el rojo y el texto encima de él |
| `bg-screen`, `text-screen-fg` | pantallas oscuras (igual en ambos temas) |
| `bg-ink` | tinta fija, no cambia con el tema |

Nunca escribas un color en hexadecimal dentro de un componente si existe un
token. Si hace falta un color nuevo, se agrega como variable en los dos temas.

### Utilidades propias

| Utilidad | Qué es |
|---|---|
| `neu` / `neu-sm` | superficie en relieve (grande / chica) |
| `neu-in` | superficie hundida (campos, contenedores, tecla activa) |
| `screen` | pantalla oscura con marco, para precios, demos y QR |
| `label` | etiqueta mono, mayúsculas, espaciada, gris |
| `btn` + `btn-accent` | botón principal rojo |
| `btn` + `btn-neu` | botón secundario en relieve |
| `led` / `led-on` | puntito tipo LED; encendido = rojo con brillo |
| `container-x` | ancho máximo y márgenes laterales |
| `reveal` | aparece al entrar en pantalla (lo activa `useReveal`) |
| `cursor`, `draw` | cursor que parpadea / trazo que se dibuja |

## Cómo se hacen las cosas

### Una sección nueva

Usa `Seccion` para que tenga el filete y el número suizo. Numera en orden
(`Nº 007`, …) y agrégala en `App.tsx`.

```tsx
<Seccion id="algo" numero="007" etiqueta="Etiqueta" titulo="Título corto" bajada="Una línea que explique.">
  <div className="mt-14 grid gap-8 lg:grid-cols-2">
    <article className="neu reveal rounded-[2rem] p-7 sm:p-9">…</article>
  </div>
</Seccion>
```

- Tarjetas: `neu` + `rounded-[2rem]`. Listas con `led led-on` como viñeta.
- Precios o datos destacados: dentro de `screen`, en `font-mono`.
- Opciones elegibles: teclas `neu-sm` que pasan a `neu-in` con `led-on` al
  activarse, con `aria-pressed`.
- Si va en el menú, agrégala a `links` en `Header.tsx`.

### Textos

- Español de México, de tú, claro y sin tecnicismos ("te armamos", no
  "implementamos soluciones").
- Títulos cortos que pueden cerrar con un punto rojo:
  `Hablemos<span className="text-accent">.</span>`.
- No inventar cifras, clientes ni testimonios. Los ejemplos de la IA en
  `IAEmpresas.tsx` están marcados como "Ejemplo" y deben seguir así.
- Si cambia un precio, cámbialo también en `index.html` (JSON-LD),
  `public/llms.txt`, `Preguntas.tsx`, `Legal.tsx` y `data/tarjetas.ts`.

### Datos que se editan seguido

- **Contacto** (teléfono, correo, WhatsApp): solo en `src/lib/contacto.ts`
  (y `CORREO_DESTINO` en Cloudflare para el formulario).
- **Proyectos**: agregar un objeto en `src/data/proyectos.ts`. Sin `url` se
  muestra como "Privado".
- **Tarjetas digitales**: copiar un bloque en `src/data/tarjetas.ts` con un
  `slug` nuevo; queda en `/tarjeta/<slug>`. La de slug `zia` también responde
  en `/tarjeta`. Los campos vacíos no se muestran.
- **Dominio**: hoy es `zia.pages.dev`. Al cambiarlo, actualizar `index.html`,
  `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt` y
  `src/lib/contacto.ts`.

### Formulario de contacto

`Contacto.tsx` hace `POST /api/contacto`; lo atiende
`functions/api/contacto.ts` y manda el correo con Resend. Variables en
Cloudflare Pages → Settings → Environment variables:

- `RESEND_API_KEY` (obligatoria, secreta; nunca en el código)
- `CORREO_DESTINO` (por defecto zyncosoft@gmail.com)
- `CORREO_FROM` (remitente verificado en Resend)

Para probarlo en local se usa Wrangler con un `.dev.vars` (está en `.gitignore`).

## Antes de dar algo por terminado

1. `pnpm build` sin errores.
2. Revisar en **claro y en oscuro** (el selector del encabezado).
3. Revisar a **375 px de ancho**: sin scroll horizontal
   (`document.documentElement.scrollWidth === innerWidth`).
4. Que todo lo nuevo use tokens y utilidades, no colores sueltos.
5. Respetar `prefers-reduced-motion`: las animaciones nuevas deben apagarse
   (las reglas globales de `index.css` ya cubren transiciones y animaciones CSS).

## Pendientes conocidos

- Dominio propio y correo propio de ZIA.
- Confirmar si "desde $12,000" lleva IVA y si las apps tienen mantenimiento anual.
- Domicilio fiscal en el aviso de privacidad (`[domicilio fiscal]` en `Legal.tsx`) y revisión legal.
- Imagen PNG 1200×630 para compartir en redes (`og:image` hoy apunta al SVG).
- Quitar o reemplazar la tarjeta `ejemplo` de `data/tarjetas.ts` antes de publicar.
