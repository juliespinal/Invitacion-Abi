/**
 * Sección: Book de fotos (Etapa 5a).
 *
 * Secuencia cinematográfica a pantalla completa (CLAUDE.md §10, decisión
 * confirmada): cada foto ocupa el viewport, con crossfade + leve zoom atado
 * al scroll (scrub), y una línea de texto breve por foto. Placeholders en
 * /img/abi/book-0N.jpg — reemplazables sin tocar este archivo (solo
 * PHOTOBOOK_ITEMS abajo).
 *
 * Técnica: una sola sección "pineada" (ScrollTrigger pin) del alto de N
 * viewports, con capas de foto apiladas absolutas que hacen crossfade según
 * el progreso del scroll. Es el único pin de toda la web (regla de la skill:
 * máximo 1-2 secciones pineadas para no pelear con el scroll nativo mobile).
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { withMotionPreference } from "@/animations/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface PhotobookItem {
  src: string;
  caption: string;
}

const PHOTOBOOK_ITEMS: PhotobookItem[] = [
  { src: "book-01.jpg", caption: "Donde empezó todo" },
  { src: "book-02.jpg", caption: "Los primeros pasos" },
  { src: "book-03.jpg", caption: "Descubriendo el mundo" },
  { src: "book-04.jpg", caption: "Creciendo" },
  { src: "book-05.jpg", caption: "Hoy, sus quince" },
];

export function renderPhotobook(container: HTMLElement): void {
  const section = document.createElement("section");
  section.dataset.section = "photobook";
  section.className = "relative h-screen overflow-hidden";

  const base = import.meta.env.BASE_URL;

  section.innerHTML = `
    <div class="photobook-track absolute inset-0">
      ${PHOTOBOOK_ITEMS.map(
        (item, index) => `
        <figure
          class="photobook-frame absolute inset-0"
          style="opacity: ${index === 0 ? 1 : 0};"
          data-index="${index}"
        >
          <img
            src="${base}img/abi/${item.src}"
            alt=""
            aria-hidden="true"
            class="h-full w-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#1A1030]/85 via-transparent to-[#1A1030]/30"></div>
          <figcaption
            class="absolute bottom-16 left-0 right-0 px-6 text-center text-h2"
            style="color: #ffffff;"
          >
            ${item.caption}
          </figcaption>
        </figure>
      `,
      ).join("")}
    </div>

    <div class="photobook-progress absolute bottom-6 left-0 right-0 flex justify-center gap-2">
      ${PHOTOBOOK_ITEMS.map(
        (_, index) => `
        <span
          class="photobook-dot h-1.5 w-1.5 rounded-full transition-opacity duration-300"
          data-dot="${index}"
          style="background: var(--color-accent); opacity: ${index === 0 ? 1 : 0.35};"
        ></span>
      `,
      ).join("")}
    </div>
  `;

  container.appendChild(section);

  const frames = Array.from(section.querySelectorAll<HTMLElement>(".photobook-frame"));
  const dots = Array.from(section.querySelectorAll<HTMLElement>(".photobook-dot"));

  withMotionPreference(
    () => {
      // Una sección pineada de (N-1) tramos de scroll virtual: el progreso
      // 0..1 se reparte en (N-1) tramos, cada uno hace crossfade entre la
      // foto actual y la siguiente. Cada tramo mide 160% del viewport (no
      // 100%) — con el 100% original, varios gestos de scroll seguidos
      // podían "cruzar" el pin entero antes de que el usuario viera el
      // crossfade (bug real encontrado); más longitud + wheelMultiplier
      // reducido en Lenis (ver lenisSetup.ts) evita que se salte de largo.
      const steps = frames.length - 1;
      const viewportPercentPerStep = 160;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${steps * viewportPercentPerStep}%`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress * steps; // 0..steps (float)
          const currentIndex = Math.min(Math.floor(progress), steps - 1);
          const localProgress = progress - currentIndex;

          frames.forEach((frame, index) => {
            let opacity = 0;
            if (index === currentIndex) {
              opacity = 1 - localProgress;
            } else if (index === currentIndex + 1) {
              opacity = localProgress;
            } else if (index === frames.length - 1 && progress >= steps) {
              opacity = 1;
            }
            frame.style.opacity = String(opacity);
          });

          const nearestIndex = Math.round(progress);
          dots.forEach((dot, index) => {
            dot.style.opacity = index === nearestIndex ? "1" : "0.35";
          });
        },
      });
    },
    () => {
      // Reduced motion: sin pin ni scrub — se muestra solo la última foto
      // (estado final legible), sin animación de por medio.
      frames.forEach((frame, index) => {
        frame.style.opacity = index === frames.length - 1 ? "1" : "0";
      });
      dots.forEach((dot, index) => {
        dot.style.opacity = index === dots.length - 1 ? "1" : "0.35";
      });
    },
  );
}
