/**
 * Fondo continuo único (revisión pedida por el cliente: "que el fondo sea
 * uno solo, como el cabello de Rapunzel, y toda la web se desarrolle
 * deslizándose sobre él — eso da la idea de infinito". Decisión acordada:
 * gradiente continuo sin textura literal de cabello).
 *
 * Reemplaza los `background` sólidos por sección (que producían un corte
 * horizontal duro, visible en captura, entre p.ej. verde salvia y durazno).
 * Ahora hay una ÚNICA capa fija (position: fixed, detrás de todo) que
 * muestra un gradiente lineal continuo — mucho más alto que el viewport,
 * del tamaño real del documento — y se desliza verticalmente en sync con el
 * scroll (Lenis) via `background-position`. Como es un solo `linear-gradient`
 * de punta a punta, la transición entre colores es tan gradual como el
 * degradé lo permita: nunca hay un borde recto entre dos secciones.
 *
 * Los stops del gradiente se ubican en el punto medio de cada sección (no en
 * sus bordes), calculado a partir del alto real del documento — así el color
 * de cada sección ya se ve "asentado" en su tramo central, y la mezcla pasa
 * en las zonas de transición entre secciones consecutivas.
 */

export interface BackgroundFlowHandle {
  layer: HTMLElement;
  /** Recalcula el gradiente a partir del alto real del documento — llamar tras revelar/agregar secciones. */
  refresh: () => void;
}

interface SectionColor {
  selector: string;
  color: string;
}

// Un color por sección, en el orden narrativo real (ver main.ts). No
// depende de `data-bg`/`data-scene` (ya eliminados) — la paleta se define
// acá, una sola vez, como la fuente de verdad del recorrido de color.
const SECTION_COLORS: SectionColor[] = [
  { selector: '[data-section="hero"]', color: "#fbe6d8" }, // durazno pálido, detrás de la foto
  { selector: '[data-section="presentation"]', color: "#ffffff" },
  { selector: '[data-section="photobook"]', color: "#1a1030" }, // tapado por las fotos, ancla oscura del recorrido
  { selector: '[data-section="blessing"]', color: "#e8f0e0" }, // verde salvia
  { selector: '[data-section="party"]', color: "#fbe6d8" }, // durazno
  { selector: '[data-section="spotify"]', color: "#ede0f7" }, // lila
  { selector: '[data-section="dresscode"]', color: "#ffffff" },
  { selector: '[data-section="rsvp"]', color: "#ffffff" },
  { selector: '[data-section="footer"]', color: "#e8f0e0" }, // cierra en verde salvia
];

export function setupBackgroundFlow(): BackgroundFlowHandle {
  const layer = document.createElement("div");
  layer.dataset.backgroundFlow = "true";
  layer.setAttribute("aria-hidden", "true");
  // absolute (no fixed): la capa mide el alto REAL de todo el documento y
  // vive pegada a él — así el gradiente completo se desplaza junto con el
  // contenido durante el scroll, sin necesitar sincronizar `background-position`
  // a mano en cada frame (evita otro punto de desincronización con Lenis,
  // que ya nos costó dos bugs reales en revisiones anteriores).
  layer.className = "absolute left-0 top-0 right-0 -z-10 overflow-hidden";
  layer.style.backgroundRepeat = "no-repeat";
  layer.style.backgroundSize = "100% 100%";
  // Bug real encontrado: overflow-x:hidden en html/body NO alcanza para
  // contener elementos position:absolute con left/right negativos dentro de
  // esta capa (floatingShapes.ts) — el navegador seguía permitiendo 39px de
  // scroll horizontal real (window.scrollX llegaba a moverse). `overflow:
  // hidden` directamente en el contenedor de las formas sí lo contiene.
  layer.style.width = "100%";

  document.body.prepend(layer);

  function refresh(): void {
    const docHeight = document.documentElement.scrollHeight;
    if (docHeight === 0) return;

    const stops = SECTION_COLORS.map(({ selector, color }) => {
      const el = document.querySelector<HTMLElement>(selector);
      if (!el) return null;
      // Punto medio de la sección, como % del alto total del documento.
      const midpoint = el.offsetTop + el.offsetHeight / 2;
      const percent = Math.min(100, Math.max(0, (midpoint / docHeight) * 100));
      return `${color} ${percent.toFixed(2)}%`;
    }).filter((s): s is string => s !== null);

    layer.style.background = `linear-gradient(to bottom, ${stops.join(", ")})`;
    layer.style.height = `${docHeight}px`;
  }

  refresh();

  return { layer, refresh };
}
