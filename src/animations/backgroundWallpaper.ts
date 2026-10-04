/**
 * Capa de wallpaper ilustrado mezclada sobre el degradé continuo (pedido del
 * cliente: "mezclá el degradé actual con este background... debe ser un 60%
 * del degradado armado y un 40% de este background").
 *
 * Técnica: una capa adicional, encima de `backgroundFlow` pero igual detrás
 * de todo el contenido, del mismo alto que el documento. Usa
 * `/img/abi/background.jpg` con opacidad 0.4 (el 60/40 pedido se logra por
 * opacidad, no por composición de blend-mode — más simple y más previsible
 * en mobile) y `background-size: auto 400vh` (alto fijo a 4 viewports, ancho
 * libre) para que exista un recorrido vertical real y generoso (300vh de
 * desplazamiento posible) — con la imagen escalada al ancho del documento
 * (el bug que se pidió corregir acá) el recorrido vertical quedaba
 * demasiado corto y el movimiento se sentía abrupto en vez de gradual.
 *
 * Movimiento: a medida que el usuario scrollea verticalmente de 0% a 100%
 * del documento, `background-position-y` se mueve de 0% a 100% (sobre ese
 * recorrido de 300vh) — en el footer (final del scroll vertical) la imagen
 * llega exactamente al extremo inferior de su propio recorrido, y el avance
 * se siente gradual/continuo en vez de "saltar" de golpe.
 *
 * Bug real encontrado y corregido: el photobook (ver
 * src/sections/photobook/index.ts) pinea su sección durante ~640% de alto de
 * viewport de scroll "virtual" (4 pasos x 160%) para lograr el crossfade —
 * ese tramo NO mueve la página visualmente (queda pineada en el viewport),
 * pero sí cuenta como avance real de scroll dentro de `document.body`. Atar
 * el wallpaper a un progreso lineal 0→1 de "top top" a "bottom bottom" del
 * documento completo hacía que el álbum por sí solo consumiera la mayor
 * parte del recorrido vertical 0%→100% (el pin infla el scroll real sin
 * mover nada en pantalla), dejando el wallpaper ya "agotado" (cerca de 100%)
 * apenas el usuario salía del álbum, con muy poco recorrido visible en el
 * resto de la web.
 *
 * Fix: en vez de progreso lineal sobre scroll crudo, se usa como referencia
 * la posición real (`offsetTop`) de cada sección narrativa (igual patrón que
 * `backgroundFlow.ts`). El tramo del photobook se "colapsa" a un solo punto
 * en esa escala — dentro del álbum el wallpaper queda fijo, y el resto del
 * recorrido (antes y después) se reparte proporcionalmente al espacio real
 * que ocupan las demás secciones, sin que el pin (que no mueve nada en
 * pantalla) robe proporción del recorrido vertical.
 *
 * Segundo bug real encontrado: un `ScrollTrigger.create({ trigger:
 * document.body, scrub, onUpdate })` adicional —registrado sobre el mismo
 * scroller proxy de Lenis que ya usan el resto de los pines— deja de invocar
 * `onUpdate` una vez que el scroll atraviesa el pin largo del photobook
 * (confirmado con logging: el callback nunca se vuelve a disparar pasado ese
 * punto, sin importar qué fuente de scroll se lea adentro). En vez de pelear
 * con otro ScrollTrigger más sobre el mismo proxy, esta capa escucha
 * directamente el evento nativo `scroll` de `window` (vía el propio
 * `lenis.on("scroll", ...)`, que si dispara de forma confiable en todo el
 * recorrido) y lee `window.scrollY` como fuente de verdad.
 */

import { gsap } from "gsap";
import { withMotionPreference } from "@/animations/reducedMotion";

export interface BackgroundWallpaperHandle {
  layer: HTMLElement;
  refresh: () => void;
}

export function setupBackgroundWallpaper(
  backgroundFlowLayer: HTMLElement,
): BackgroundWallpaperHandle {
  const base = import.meta.env.BASE_URL;

  const layer = document.createElement("div");
  layer.dataset.backgroundWallpaper = "true";
  layer.setAttribute("aria-hidden", "true");
  // absolute, dentro de la misma capa de fondo (backgroundFlowLayer) para
  // heredar su mismo alto real de documento sin duplicar esa lógica.
  layer.className = "absolute left-0 top-0 right-0 pointer-events-none";
  layer.style.backgroundImage = `url("${base}img/abi/background.jpg")`;
  layer.style.backgroundRepeat = "no-repeat";
  // Bug real encontrado (sentido vertical): con "100% auto" el navegador
  // escala la imagen al ANCHO del layer (el ancho del documento, ~390px en
  // mobile) y el alto queda atado a esa proporción — como background.jpg es
  // panorámica (1600x1076), su alto resultante termina siendo de apenas
  // ~260px, muchísimo menor que el alto del documento. Con tan poco
  // recorrido vertical disponible, el movimiento se siente abrupto/casi
  // nulo en vez de "ir scrolleando de a poco".
  // Fix: fijar el ALTO de la imagen a un múltiplo del viewport (acá 400vh,
  // ajustable) y dejar el ancho libre — así hay un recorrido vertical real y
  // generoso para repartir en todo el scroll de la página.
  layer.style.backgroundSize = "auto 400vh";
  layer.style.backgroundPosition = "center 0%";
  layer.style.opacity = "0.4"; // 40% wallpaper / 60% degradé (debajo, visible)
  layer.style.width = "100%";
  layer.style.height = "100%";

  backgroundFlowLayer.appendChild(layer);

  function refresh(): void {
    layer.style.height = `${backgroundFlowLayer.offsetHeight}px`;
  }

  refresh();

  // Orden narrativo real de secciones (igual que SECTION_COLORS en
  // backgroundFlow.ts). "photobook" es la única pineada — se excluye su alto
  // real (inflado por el pin-spacer) del total y se trata como un tramo de
  // ancho CERO en la escala de progreso: el wallpaper no avanza mientras el
  // usuario está dentro, y no "paga" con proporción del recorrido por ese
  // tiempo extra de scroll que no mueve nada en pantalla.
  const PINNED_SECTIONS = new Set(['[data-section="photobook"]']);
  const SECTION_SELECTORS = [
    '[data-section="presentation"]',
    '[data-section="photobook"]',
    '[data-section="blessing"]',
    '[data-section="party"]',
    '[data-section="spotify"]',
    '[data-section="dresscode"]',
    '[data-section="rsvp"]',
    '[data-section="footer"]',
  ];

  function computeProgress(): number {
    const sections = SECTION_SELECTORS.map((selector) => {
      const el = document.querySelector<HTMLElement>(selector);
      if (!el) return null;
      const pinned = PINNED_SECTIONS.has(selector);
      // Bug real encontrado: una sección con `pin: true` sale del flujo
      // normal del documento — su propio offsetTop/offsetHeight queda
      // "congelado" en su tamaño de 1 viewport original (acá: top 0,
      // height 844px) y NO refleja el espacio real que ocupa en el
      // documento mientras scrollea (acá: ~6200px). Ese espacio real lo
      // ocupa el `pin-spacer` que GSAP inserta como padre del elemento
      // pineado — hay que medir ESE elemento, no la sección.
      const measureEl = pinned ? (el.parentElement ?? el) : el;
      return {
        pinned,
        top: measureEl.offsetTop,
        bottom: measureEl.offsetTop + measureEl.offsetHeight,
      };
    }).filter((s): s is { pinned: boolean; top: number; bottom: number } => s !== null);

    if (sections.length < 2) return 0;

    // El último tramo real de scroll termina en (docHeight - viewport), no
    // en `footer.bottom` (= docHeight) — por eso se recorta el último tramo
    // no-pineado a ese tope real, o el progreso nunca llega a 100% (el
    // usuario físicamente no puede scrollear más allá de ese punto).
    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    const lastSection = sections[sections.length - 1];
    if (!lastSection.pinned) {
      lastSection.bottom = Math.min(lastSection.bottom, maxScroll);
    }

    // Alto "efectivo" total: suma de los tramos no-pineados nada más (el
    // tramo pineado cuenta como 0 de longitud en esta escala).
    const effectiveTotal = sections.reduce(
      (sum, s) => sum + (s.pinned ? 0 : s.bottom - s.top),
      0,
    );
    if (effectiveTotal <= 0) return 0;

    const currentScroll = Math.min(window.scrollY, maxScroll);
    let effectiveBefore = 0;

    for (const s of sections) {
      if (s.pinned) {
        if (currentScroll >= s.top && currentScroll <= s.bottom) {
          // Dentro del álbum: progreso congelado en el punto donde entró,
          // sin sumar nada del tramo pineado.
          return effectiveBefore / effectiveTotal;
        }
        if (currentScroll > s.bottom) {
          // Ya pasó el álbum: no suma longitud (es 0 en esta escala),
          // simplemente se continúa al siguiente tramo.
          continue;
        }
        // Todavía no llegó al álbum: termina la acumulación acá.
        return effectiveBefore / effectiveTotal;
      }

      if (currentScroll <= s.bottom) {
        effectiveBefore += Math.max(0, currentScroll - s.top);
        return effectiveBefore / effectiveTotal;
      }

      effectiveBefore += s.bottom - s.top;
    }

    // Scroll más allá de la última sección conocida.
    return 1;
  }

  withMotionPreference(
    () => {
      let ticking = false;

      function update(): void {
        const progress = computeProgress();
        gsap.set(layer, { backgroundPositionY: `${Math.min(100, Math.max(0, progress * 100))}%` });
        ticking = false;
      }

      update();

      // Se escucha el evento nativo de scroll (siempre confiable, sin
      // importar scrollerProxy) en vez de un ScrollTrigger propio — ver nota
      // del "segundo bug" arriba. Throttled a un frame con rAF.
      window.addEventListener(
        "scroll",
        () => {
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
          }
        },
        { passive: true },
      );
    },
    () => {
      // Reduced motion: wallpaper estático, sin desplazamiento.
      layer.style.backgroundPositionY = "0%";
    },
  );

  return { layer, refresh };
}