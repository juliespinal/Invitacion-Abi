/**
 * Smooth scroll global con Lenis, sincronizado con GSAP ScrollTrigger.
 *
 * Integración completa (no solo "lenis.raf + ScrollTrigger.update"): hay que
 * decirle a ScrollTrigger que lea/escriba scroll a través de Lenis
 * (scrollerProxy) y desactivar su manejo nativo de eventos de scroll/resize
 * en window, o los dos motores compiten por la misma posición y ScrollTrigger
 * ve saltos en vez de una progresión suave — eso es lo que causaba que un pin
 * (photobook) se "resolviera" casi de inmediato en vez de seguir el scroll.
 */

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setupSmoothScroll(): Lenis {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const lenis = new Lenis({
    duration: prefersReducedMotion ? 0 : 1.1,
    smoothWheel: !prefersReducedMotion,
    // Bug real encontrado: con el multiplier por default, varios gestos de
    // rueda/trackpad seguidos y rápidos acumulan momentum y el scroll
    // virtual "salta" de largo el pin del photobook (que solo mide unos
    // pocos viewports) en una fracción de segundo — el usuario nunca ve el
    // crossfade, aterriza directo en la última foto. Bajar el multiplier
    // reduce cuánto avanza el scroll por cada gesto, dando más margen.
    wheelMultiplier: 0.7,
    touchMultiplier: 0.9,
  });

  // ScrollTrigger debe leer/escribir posición a través de Lenis, no de
  // window.scrollY directamente (patrón oficial GSAP + Lenis).
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (typeof value === "number") {
        lenis.scrollTo(value, { immediate: true });
        return;
      }
      return window.scrollY;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  lenis.on("scroll", ScrollTrigger.update);

  // Deja que ScrollTrigger reordene/recalcule sus pines en cada tick de Lenis
  // en vez de solo en los eventos nativos de scroll/resize del navegador.
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Todo ScrollTrigger creado de acá en adelante (en cualquier sección) debe
  // usar el mismo scroller que registramos arriba, o queda desincronizado.
  ScrollTrigger.defaults({ scroller: document.body });

  ScrollTrigger.addEventListener("refresh", () => lenis.resize());
  ScrollTrigger.refresh();

  return lenis;
}
