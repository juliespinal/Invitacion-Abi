/**
 * Formas decorativas flotantes con movimiento lateral (revisión pedida por
 * el cliente: "si querés animar algo para que vaya de izquierda a derecha
 * mientras el scroll es vertical, hacelo — que se sienta como que scrollean
 * hacia los lados de forma infinita").
 *
 * Son círculos suaves (blur alto, opacidad baja) con los colores de la
 * paleta, ubicados sobre la capa de fondo continuo. Cada uno se desplaza
 * horizontalmente (izquierda↔derecha, oscilando con una onda seno) atado al
 * progreso de scroll vertical vía ScrollTrigger scrub — el scroll sigue
 * siendo vertical, pero el fondo detrás se mueve también en diagonal/lateral,
 * dando la sensación de deslizamiento "hacia los costados" pedida.
 *
 * Puramente decorativo (aria-hidden, no interactivo) y desactivado bajo
 * prefers-reduced-motion.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { withMotionPreference } from "@/animations/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface ShapeConfig {
  color: string;
  size: number; // px
  topPercent: number; // posición vertical, % del alto del documento
  side: "left" | "right";
  amplitude: number; // px de recorrido horizontal
}

const SHAPES: ShapeConfig[] = [
  { color: "#c9a8e8", size: 340, topPercent: 8, side: "left", amplitude: 90 },
  { color: "#8fbc7a", size: 260, topPercent: 22, side: "right", amplitude: 70 },
  { color: "#e8a87c", size: 300, topPercent: 40, side: "left", amplitude: 100 },
  { color: "#c9a8e8", size: 220, topPercent: 58, side: "right", amplitude: 60 },
  { color: "#8fbc7a", size: 280, topPercent: 74, side: "left", amplitude: 80 },
  { color: "#e8a87c", size: 260, topPercent: 90, side: "right", amplitude: 90 },
];

export function setupFloatingShapes(backgroundLayer: HTMLElement): void {
  const shapeElements = SHAPES.map((config) => {
    const shape = document.createElement("div");
    shape.className = "absolute rounded-full";
    shape.style.width = `${config.size}px`;
    shape.style.height = `${config.size}px`;
    shape.style.background = config.color;
    shape.style.opacity = "0.35";
    shape.style.filter = "blur(60px)";
    shape.style.top = `${config.topPercent}%`;
    shape.style[config.side] = "-10%";
    backgroundLayer.appendChild(shape);
    return { el: shape, config };
  });

  withMotionPreference(
    () => {
      shapeElements.forEach(({ el, config }) => {
        const direction = config.side === "left" ? 1 : -1;
        gsap.to(el, {
          x: direction * config.amplitude,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        });
      });
    },
    () => {
      // Reduced motion: las formas quedan estáticas en su posición inicial.
    },
  );
}
