/**
 * Capa de wallpaper ilustrado mezclada sobre el degradé continuo (pedido del
 * cliente: "mezclá el degradé actual con este background... debe ser un 80%
 * del degradado armado y un 20% de este background").
 *
 * Técnica: una capa adicional, encima de `backgroundFlow` pero igual detrás
 * de todo el contenido, del mismo alto que el documento. Usa
 * `/img/abi/background.jpg` con opacidad 0.2 (el 80/20 pedido se logra por
 * opacidad, no por composición de blend-mode — más simple y más previsible
 * en mobile) y `background-size: auto 100%` (alto fijo al viewport-del-track,
 * ancho libre) para que exista recorrido horizontal real de la imagen.
 *
 * Movimiento: a medida que el usuario scrollea verticalmente de 0% a 100%
 * del documento, `background-position-x` se mueve de 0% a 100% — en el
 * footer (final del scroll vertical) la imagen llega exactamente al extremo
 * derecho de su propio recorrido horizontal, tal como se pidió.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { withMotionPreference } from "@/animations/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

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
  // Alto fijo al 100% de la capa (alto real del documento), ancho libre —
  // así la imagen es más ancha que el viewport y existe recorrido horizontal
  // real para animar vía background-position-x.
  layer.style.backgroundSize = "auto 100%";
  layer.style.backgroundPosition = "0% center";
  layer.style.opacity = "0.2"; // 20% wallpaper / 80% degradé (debajo, visible)
  layer.style.width = "100%";
  layer.style.height = "100%";

  backgroundFlowLayer.appendChild(layer);

  function refresh(): void {
    layer.style.height = `${backgroundFlowLayer.offsetHeight}px`;
  }

  refresh();

  withMotionPreference(
    () => {
      gsap.fromTo(
        layer,
        { backgroundPositionX: "0%" },
        {
          backgroundPositionX: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        },
      );
    },
    () => {
      // Reduced motion: wallpaper estático, sin desplazamiento.
      layer.style.backgroundPositionX = "0%";
    },
  );

  return { layer, refresh };
}
