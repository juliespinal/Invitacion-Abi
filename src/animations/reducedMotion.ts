/**
 * Helper único para ramificar animaciones GSAP según prefers-reduced-motion.
 * Cada módulo de animaciones (Etapa 8) debe usar esto en vez de chequear
 * window.matchMedia manualmente, para mantener el criterio consistente.
 */

import { gsap } from "gsap";

export function withMotionPreference(
  fullMotion: gsap.ContextFunc,
  reducedMotion: gsap.ContextFunc,
): gsap.MatchMedia {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", fullMotion);
  mm.add("(prefers-reduced-motion: reduce)", reducedMotion);

  return mm;
}
