# Sistema Visual — Abi, Mis Quince (Tangled reinterpretado)

Etapa 1 del plan aprobado. Este documento es la fuente de verdad visual: todo lo que se
implemente en etapas siguientes debe usar estos tokens, no valores sueltos.

Procedencia: valores marcados **[skill]** vienen de una búsqueda verificada en
`ui-ux-pro-max` (ver sesión anterior). Valores marcados **[criterio propio]** son
decisiones de diseño donde la base de datos de la skill no tuvo match (confirmado tras
reintentar) y se resolvieron con juicio propio, siguiendo igual las reglas generales de
accesibilidad/motion de la skill (contraste 4.5:1, transform/opacity only, reduced-motion).

---

## 1. Paleta de color

**Revisión (post Etapa 6)**: el feedback del cliente fue que la web se sentía con poco
contraste y sin la "nitidez premium tipo Apple" buscada — el violeta apagado usado en todo
el texto (incluso pasando el check numérico de contraste) daba sensación de "todo lavado".
Se oscureció el texto principal y secundario a un violeta casi negro, y el fondo pasó a
blanco puro (antes lavanda muy claro). Además se agregó un verde de naturaleza/follaje
(motivo recurrente de Tangled) como acento **puramente decorativo/ilustrativo** — nunca en
texto, botones o UI funcional, para no arriesgar el contraste ya validado de violeta+dorado.

Dirección vigente: **claro con acentos nocturnos** — base clara en la mayoría del sitio
(mejor legibilidad en mobile/exteriores), con violeta y dorado como acentos funcionales,
verde como acento decorativo de naturaleza, y secciones puntuales (bendición, book, cierre
del hero) que pasan a fondo oscuro para el efecto "noche mágica".

### Modo claro (base — la mayoría de las secciones)

| Token | Valor | Uso |
|---|---|---|
| `--color-background` | `#FFFFFF` | fondo general (blanco puro — antes `#FAF7FF`, ajustado por contraste) |
| `--color-surface` | `#FFFFFF` | cards, inputs, modal |
| `--color-surface-alt` | `#F3EDFF` | fondos alternos de sección, franjas |
| `--color-foreground` | `#160F26` | texto principal (violeta casi negro — antes `#241B3D`, oscurecido) |
| `--color-muted-foreground` | `#4A4458` | texto secundario (antes `#5B4E7A`, oscurecido y más definido) |
| `--color-primary` | `#7C3AED` | violeta — enlaces, iconos activos, bordes de foco |
| `--color-primary-hover` | `#6D28D9` | hover/active de primary |
| `--color-secondary` | `#C4B5FD` | lavanda suave — decorativo, chips, fondos de icono |
| `--color-accent` | `#96700A` | dorado oscuro — CTAs, detalles premium (recalibrado: el `#B8860B` original solo daba 3.25:1 sobre fondo blanco puro, quedó por debajo de AA al oscurecer el fondo) |
| `--color-accent-hover` | `#7D5B07` | hover/active de accent |
| `--color-on-accent` | `#FFFFFF` | color de texto/icono sobre `--color-accent` (blanco en día; se invierte a oscuro en modo noche, ver abajo — el dorado cambia de tono claro/oscuro entre escenas) |
| `--color-border` | `#E4D9FA` | bordes sutiles |
| `--color-success` | `#15803D` | confirmaciones (con icono, no solo color — regla `color-not-decorative-only`) |
| `--color-error` | `#B91C1C` | errores de formulario (con icono + texto) |
| `--color-nature` | `#2F6B4F` | verde bosque — **solo decorativo/ilustrativo** (hojas, enredaderas, detalles del asset hero). Nunca en texto ni botones. |
| `--color-nature-light` | `#4F9470` | variante clara del verde, para capas/profundidad dentro de la misma ilustración |

### Modo nocturno (secciones "escena de noche": cierre de hero, bendición, book, fiesta)

| Token | Valor | Uso |
|---|---|---|
| `--color-night-background` | `#1A1030` | fondo noche profunda |
| `--color-night-surface` | `#241B3D` | cards sobre fondo noche (glass sutil) |
| `--color-night-foreground` | `#F8F5FF` | texto sobre noche |
| `--color-night-muted` | `#C9BFE0` | texto secundario sobre noche |
| `--color-night-primary` | `#A78BFA` | violeta claro sobre noche (mejor contraste que `#7C3AED`) |
| `--color-night-accent` | `#F5B942` | dorado cálido — luces, brillo, CTA sobre noche |
| `--color-night-on-accent` | `#160F26` | texto/icono sobre el dorado de noche (que es claro, no oscuro como en día) |

Todos los pares texto/fondo fueron chequeados contra el umbral 4.5:1 (`color-accessible-pairs`, **[skill]**) —
**incluyendo el par botón (texto sobre fondo del botón), no solo texto sobre el fondo de
página**, que es donde se detectó la regresión real durante la revisión de la Etapa 6b:

- `#160F26` sobre `#FFFFFF` → ~18.7:1 ✅
- `#4A4458` sobre `#FFFFFF` → ~8.9:1 ✅ (antes 7.04:1 — ya pasaba AA/AAA, pero se oscureció igual por percepción, no solo por el número)
- `#96700A` (accent) sobre `#FFFFFF` (fondo de página, uso ocasional como texto) → ~4.55:1 ✅
- texto blanco sobre `#96700A` (fondo real del botón primario) → ~4.55:1 ✅ — el valor original `#B8860B` daba solo 3.25:1 acá, mismo problema que abajo
- texto blanco sobre `#F5B942` (dorado de **noche** como fondo de botón) → **1.76:1 ❌** — bug real encontrado: el dorado de noche es claro, así que el texto encima debe ser oscuro, no blanco fijo. Corregido con el token `--color-on-accent` (se invierte por escena)
- `#160F26` sobre `#F5B942` (texto oscuro sobre dorado de noche, ya corregido) → ~10.5:1 ✅
- `#F8F5FF` sobre `#1A1030` → ~15.5:1 ✅
- `#F5B942` sobre `#1A1030` → ~9.8:1 ✅

**[criterio propio]**: la transición entre modo claro/nocturno se hace por sección completa
(`data-scene="day" | "night"` en cada `<section>`), nunca mezclando ambos fondos en una
misma vista — así se evita el anti-patrón de mezclar temas sin criterio.

---

## 2. Tipografía

Aprobado: **Great Vibes** (script) + **Cormorant Infant** (serif) — par verificado en la
skill para "wedding/invitation/romance" **[skill]**.

```css
--font-script: 'Great Vibes', cursive;   /* SOLO: "Abi" en el hero, y acentos puntuales (ej. firma en footer) */
--font-serif: 'Cormorant Infant', serif; /* headings de sección (H2/H3) y body */
```

Regla de uso (**[criterio propio]**, para que no se abuse del script — es difícil de leer
en párrafos):
- `Great Vibes` únicamente en: el nombre "Abi" del hero, y como máximo 1 acento más por
  sección (ej. una palabra clave en el book). Nunca en párrafos ni en botones.
- `Cormorant Infant` para todo lo demás: H2/H3, body, labels, botones.

### Escala tipográfica (mobile-first, rem con base 16px)

| Token | clamp() | Uso |
|---|---|---|
| `--text-display` | `clamp(3.5rem, 18vw, 6rem)` | "Abi" en hero (script) |
| `--text-h1` | `clamp(1.75rem, 7vw, 2.75rem)` | H2 tipo "Mis quince", títulos de sección |
| `--text-h2` | `clamp(1.375rem, 5vw, 1.875rem)` | subtítulos de sección |
| `--text-h3` | `clamp(1.125rem, 4vw, 1.375rem)` | títulos de card |
| `--text-body-lg` | `1.125rem` (18px) | texto destacado/intro de sección |
| `--text-body` | `1rem` (16px) | body — nunca bajar de 16px en mobile (evita zoom automático de iOS en inputs) |
| `--text-small` | `0.875rem` (14px) | helper text, labels |
| `--text-caption` | `0.75rem` (12px) | pies de foto, legal — uso mínimo |

Line-height: `1.5` en body, `1.15` en headings (regla general de la skill, **[skill]**
prioridad 6).

---

## 3. Espaciado, radios, sombras

Densidad: estándar/marketing (no dashboard) → escala amplia, acorde a `--density` bajo-medio
de la skill para páginas de marca/evento.

```css
--space-1: 0.5rem;   /* 8px */
--space-2: 1rem;     /* 16px */
--space-3: 1.5rem;   /* 24px */
--space-4: 2rem;     /* 32px */
--space-5: 3rem;     /* 48px */
--space-6: 4rem;     /* 64px */
--space-7: 6rem;     /* 96px */
--space-section: clamp(4rem, 12vh, 8rem); /* padding vertical entre "escenas" */
```

Radios (**[criterio propio]** — nada de esquinas duras tipo Bootstrap, pero tampoco
pill-shape genérico en todo):

```css
--radius-sm: 0.5rem;   /* inputs, chips */
--radius-md: 1rem;     /* cards */
--radius-lg: 1.5rem;   /* card principal (código de acceso), modal */
--radius-full: 999px;  /* botón CTA principal, avatar */
```

Sombras — suaves y cálidas, no grises frías (**[criterio propio]**, evitando el anti-patrón
"exceso de sombras" del CLAUDE.md):

```css
--shadow-sm: 0 1px 3px rgba(36, 27, 61, 0.08);
--shadow-md: 0 8px 24px rgba(36, 27, 61, 0.12);
--shadow-lg: 0 16px 48px rgba(36, 27, 61, 0.16);
--shadow-glow-gold: 0 0 32px rgba(245, 185, 66, 0.35); /* solo modo noche, para CTA/luces */
```

Blur (glass, uso moderado — el CLAUDE.md pide evitar "exceso de glassmorphism"):
- Uso permitido: overlay del modal de Maps (`backdrop-filter: blur(12px)`), y la card de
  código de acceso sobre la foto del hero (`backdrop-filter: blur(16px)` + fondo semi-opaco).
- No usar glass en cards de contenido general (book, bendición, fiesta) — ahí van
  superficies sólidas (`--color-surface` / `--color-night-surface`).

---

## 4. Botones

**[criterio propio]** — no hubo match útil en la DB para "botón premium"; diseño propio
respetando reglas generales de touch target (44×44px mínimo, **[skill]** prioridad 2) y
transición 150-300ms (**[skill]**, regla html-tailwind verificada).

- **Primario (CTA)**: fondo `--color-accent` (o `--color-night-accent` en modo noche),
  texto sobre accent con contraste verificado, `border-radius: var(--radius-full)`,
  padding `0.875rem 2rem`, min-height 48px. Hover: `--color-accent-hover` +
  `transition-colors duration-200` + leve `scale(1.02)` (transform, no layout).
  En modo noche: además `box-shadow: var(--shadow-glow-gold)`.
- **Secundario**: outline `1.5px solid var(--color-primary)`, texto `--color-primary`,
  fondo transparente, mismo radius/padding. Hover: fondo `--color-secondary` al 15% opacity.
- **Texto/link**: sin fondo, subrayado en hover, usado para acciones terciarias ("Quiero
  conversarlo" como radio, no aplica aquí).
- Todos con `cursor: pointer`, `:focus-visible` con ring de 2px en `--color-primary` (nunca
  quitar el outline sin reemplazo — regla crítica de accesibilidad **[skill]**).
- Estado loading: spinner inline (SVG, no librería de iconos emoji) + texto cambia a
  "Enviando…", botón `disabled` pero visualmente no se apaga a gris puro (mantiene color
  con opacity 0.7) para no parecer roto.

---

## 5. Inputs

**[criterio propio]**, con reglas de accesibilidad de formularios ya verificadas **[skill]**
(label asociado siempre, no placeholder-only; error inline con `aria-describedby`; validar
on-blur).

- Fondo `--color-surface`, borde `1.5px solid var(--color-border)`, radius `--radius-sm`,
  padding `0.875rem 1rem`, altura mínima 48px (target táctil).
- Focus: borde `--color-primary` + ring sutil, sin remover outline.
- Label siempre visible arriba del input (no floating-label que se confunda con
  placeholder), tipografía `--text-small`, color `--color-muted-foreground`.
- Error: borde `--color-error`, texto de error debajo del input en `--text-small` +
  `--color-error`, con icono de alerta (Phosphor `warning-circle`), vinculado por
  `aria-describedby`.
- Inputs numéricos (si aplica) con `inputmode="numeric"` (regla verificada **[skill]**).
- Input de código de acceso (hero): tratamiento especial — texto centrado, letras
  espaciadas (`letter-spacing: 0.15em`), `text-transform: uppercase`, tamaño `--text-h3`,
  para que se sienta como "ingresar un código mágico", no un input de login genérico.

---

## 6. Cards

**[criterio propio]** — sin match en DB para "card style"; se define desde cero, evitando
explícitamente "cards genéricas de Bootstrap" (regla del CLAUDE.md).

- **Card de código de acceso** (hero): superficie glass sobre la foto (`blur(16px)` +
  `rgba(255,255,255,0.85)` en modo claro), `--radius-lg`, `--shadow-lg`, borde sutil
  `1px solid rgba(255,255,255,0.4)`, padding `--space-4`. Es la única card con glass.
- **Cards de contenido** (evento, dress code, item de book si aplica): superficie sólida
  `--color-surface` / `--color-night-surface`, `--radius-md`, `--shadow-md`, sin glass.
  Borde opcional `1px solid var(--color-border)` en vez de sombra fuerte cuando estén una
  al lado de otra (evita "muro de sombras").
- Hover (solo donde la card es clickable, ej. abrir modal de Maps): `--shadow-lg` +
  transform `translateY(-2px)`, `transition duration-200`.

---

## 7. Modales

Aplica a: modal de Google Maps ("cómo llegar"). Basado en reglas de UX verificadas
**[skill]** (focus visible dentro del modal, cerrar accesible, bloqueo de scroll).

- Overlay: `rgba(26,16,48,0.6)` + `backdrop-filter: blur(8px)` sobre el contenido de fondo.
- Entrada: fade del overlay (200ms) + scale-in del modal desde 0.96→1 (250ms,
  `power2.out`), nunca desde 0 (evita "pop" brusco).
- Salida: inverso, más corto (150ms) — regla `exit-faster-than-enter` **[skill]**.
- Cierre: botón X visible (44×44px táctil) + click en overlay + tecla `Escape`. Foco vuelve
  al elemento que abrió el modal al cerrar.
- Contenido: `--color-surface`, `--radius-lg`, `--shadow-lg`, max-width ~480px en mobile
  (casi full-width con margen), scroll interno si el contenido excede el viewport.
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` al título del modal.
- Body con `overflow: hidden` mientras el modal está abierto; se restaura al cerrar.

---

## 8. Iconografía

Librería: **Phosphor Icons**, estilo **outline**, weight `regular` — resultados verificados
en la skill para calendar/location/clock/music/map **[skill]**.

| Uso | Icono Phosphor |
|---|---|
| Fecha | `Calendar` |
| Hora | `Clock` |
| Ubicación | `MapPin` |
| Cómo llegar / navegación | `MapTrifold` o `Compass` |
| Spotify (CTA) | icono oficial de Spotify (marca, no Phosphor) |
| Sonido/música genérica | `SpeakerHigh` |
| Error de formulario | `WarningCircle` |
| Éxito | `CheckCircle` |
| Cerrar modal | `X` |
| Abrir en Maps (dentro del botón) | `ArrowSquareOut` |

Regla de accesibilidad (**[skill]**): icono decorativo junto a texto visible →
`aria-hidden="true"`; icono sin texto equivalente (ej. botón de cerrar solo-icono) → debe
tener `aria-label` en el elemento interactivo.

Tamaño estándar: 20px inline con texto, 24px en botones solitarios, `stroke-width` por
defecto de Phosphor (no engrosar/adelgazar sin motivo — consistencia).

---

## 9. Sistema de animación (resumen — detalle completo en Etapa 8)

Motor: **GSAP + ScrollTrigger + Lenis**, presets verificados **[skill]**:

- **Scroll reveal** de entrada de sección: `opacity: 0, y: 24` → visible, `stagger: 0.08`
  en hijos, `toggleActions: 'play none none reverse'` (para que funcione igual en scroll-up
  que scroll-down, cumpliendo el requisito de "continuidad bidireccional" del CLAUDE.md).
- **Parallax** solo en capas decorativas de fondo (luces flotantes, textura), nunca en
  texto ni controles — `yPercent` pequeño (5-15), `will-change: transform` solo durante el
  scroll activo.
- **Pin + scrub** reservado para el book de fotos únicamente (máximo 1-2 secciones pineadas
  en toda la web, regla explícita **[skill]** para no pelear con el scroll nativo en mobile).
- **SplitText** solo en headlines cortos (ej. "Mis quince"), nunca en párrafos.
- Toda animación no esencial se salta bajo `prefers-reduced-motion: reduce`
  (`gsap.matchMedia`), renderizando el estado final directamente.
- Máximo 1-2 elementos animándose simultáneamente por vista (regla `excessive-motion`
  **[skill]**), para no caer en "animaciones aleatorias" que pide evitar el CLAUDE.md.

---

## 10. Resumen de tokens (para implementación directa en Tailwind/CSS variables — Etapa 2)

Este bloque se traducirá 1:1 a `tailwind.config` + `tokens.css` en la Etapa 2:

```css
:root {
  /* color - día */
  --color-background: #FAF7FF;
  --color-surface: #FFFFFF;
  --color-surface-alt: #F3EDFF;
  --color-foreground: #241B3D;
  --color-muted-foreground: #5B4E7A;
  --color-primary: #7C3AED;
  --color-primary-hover: #6D28D9;
  --color-secondary: #C4B5FD;
  --color-accent: #B8860B;
  --color-accent-hover: #96700A;
  --color-border: #E4D9FA;
  --color-success: #15803D;
  --color-error: #B91C1C;

  /* color - noche */
  --color-night-background: #1A1030;
  --color-night-surface: #241B3D;
  --color-night-foreground: #F8F5FF;
  --color-night-muted: #C9BFE0;
  --color-night-primary: #A78BFA;
  --color-night-accent: #F5B942;

  /* tipografía */
  --font-script: 'Great Vibes', cursive;
  --font-serif: 'Cormorant Infant', serif;
  --text-display: clamp(3.5rem, 18vw, 6rem);
  --text-h1: clamp(1.75rem, 7vw, 2.75rem);
  --text-h2: clamp(1.375rem, 5vw, 1.875rem);
  --text-h3: clamp(1.125rem, 4vw, 1.375rem);
  --text-body-lg: 1.125rem;
  --text-body: 1rem;
  --text-small: 0.875rem;
  --text-caption: 0.75rem;

  /* espaciado */
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --space-5: 3rem;
  --space-6: 4rem;
  --space-7: 6rem;
  --space-section: clamp(4rem, 12vh, 8rem);

  /* radios */
  --radius-sm: 0.5rem;
  --radius-md: 1rem;
  --radius-lg: 1.5rem;
  --radius-full: 999px;

  /* sombras */
  --shadow-sm: 0 1px 3px rgba(36, 27, 61, 0.08);
  --shadow-md: 0 8px 24px rgba(36, 27, 61, 0.12);
  --shadow-lg: 0 16px 48px rgba(36, 27, 61, 0.16);
  --shadow-glow-gold: 0 0 32px rgba(245, 185, 66, 0.35);
}
```

---

## 11. Breakpoints (detalle completo en Etapa 9, definidos ahora para no romper el sistema)

No solo mobile/tablet/desktop — pensados por composición visual (regla del CLAUDE.md §36):

| Breakpoint | Rango | Comportamiento |
|---|---|---|
| `base` | 360–430px | experiencia principal, diseño vertical puro, 1 columna |
| `sm` | ≥431px | ajustes menores de padding, sin cambio estructural |
| `md` | ≥768px (tablet) | book de fotos puede mostrar composición a 2 fotos en vez de 1; dress code en grid |
| `lg` | ≥1024px (desktop) | aparece mayor profundidad/parallax en hero y secciones; contenido con `max-width: 1120px` centrado |
| `xl` | ≥1440px | solo se limita `max-width`, no se estira contenido — evita "estirar innecesariamente" (regla CLAUDE.md) |

---

## Pendiente de tu revisión

Antes de pasar a la Etapa 2 (setup técnico), confirmame si:
1. La paleta día/noche por sección te cierra, o preferís que **todo** el sitio sea de un
   solo modo (sin alternar día/noche entre secciones).
2. El uso de Great Vibes limitado solo a "Abi" + 1 acento por sección te parece bien, o
   querés más presencia del script en otros títulos.
