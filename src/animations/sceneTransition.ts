/**
 * Transición de entrada/salida por sección (revisión pedida por el cliente:
 * "animaciones in-out, fade and slide, que sea notorio por secciones").
 *
 * Reemplaza el enfoque anterior (scrub atado 1:1 al scroll, sin animación de
 * salida) — con scrub puro, si el usuario scrollea rápido la transición pasa
 * en un instante y es imperceptible, y nunca se revierte al salir de la
 * sección. Acá cada elemento tiene una animación CON DURACIÓN PROPIA
 * (fade + slide, ~0.6s) que se dispara al entrar en el viewport y se
 * revierte (fade+slide inverso) al salir — funciona igual en scroll-down que
 * en scroll-up, cumpliendo la continuidad bidireccional pedida en el
 * CLAUDE.md.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { withMotionPreference } from "@/animations/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

export interface SceneRevealOptions {
  /** Sección que actúa de trigger (define cuándo se dispara la animación). */
  section: HTMLElement;
  /** Elementos que entran con stagger (ej. eyebrow, título, cuerpo). */
  elements: Element[];
  /** Desplazamiento vertical inicial en px (por defecto 32 — notorio pero no exagerado). */
  distance?: number;
}

export function applySceneReveal({ section, elements, distance = 32 }: SceneRevealOptions): void {
  withMotionPreference(
    () => {
      gsap.set(elements, { opacity: 0, y: distance });

      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          // "play reverse play reverse": entra al bajar, sale (reversa) al
          // subir por encima del umbral, y vuelve a jugarse si se vuelve a
          // bajar — notorio en ambas direcciones, no solo un fade-in único.
          toggleActions: "play reverse play reverse",
        },
      });
    },
    () => {
      gsap.set(elements, { opacity: 1, y: 0 });
    },
  );
}
