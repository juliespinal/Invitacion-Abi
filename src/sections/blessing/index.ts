/**
 * Sección: Bendición (Etapa 5b, CLAUDE.md §11 — revisada a light mode único).
 *
 * Texto introductorio + fecha/hora/lugar (con iconos, sin emojis) + botón
 * "Cómo llegar" que abre el modal de Google Maps. Fondo verde salvia (de la
 * paleta de referencia) para diferenciarla de las demás secciones claras,
 * ya sin el sistema día/noche anterior.
 */

import { eventConfig } from "@/config/event.config";
import { createDetailRow } from "@/components/eventDetails";
import { createButton } from "@/components/button";
import { openDirectionsModal } from "@/components/directionsModal";
import { applySceneReveal } from "@/animations/sceneTransition";

export function renderBlessing(container: HTMLElement): void {
  const section = document.createElement("section");
  section.dataset.section = "blessing";
  section.className =
    "relative flex min-h-screen flex-col items-center justify-center px-6 py-section";

  const { blessing } = eventConfig;

  section.innerHTML = `
    <div class="blessing-content flex w-full max-w-sm flex-col items-center text-center">
      <p class="blessing-eyebrow text-small font-medium uppercase tracking-[0.25em]" style="color: var(--color-accent);">
        Antes de la fiesta
      </p>
      <h2 class="blessing-title mt-3 text-h1" style="color: var(--color-foreground);">
        La bendición
      </h2>
      <p class="blessing-body mt-4 text-body" style="color: var(--color-muted-foreground);">
        Quiero empezar este día agradeciendo, junto a mi familia y las personas que más quiero,
        por todo lo vivido hasta hoy.
      </p>

      <div class="blessing-details mt-8 flex w-full flex-col gap-4 text-left"></div>

      <div class="blessing-cta mt-8 w-full"></div>
    </div>
  `;

  container.appendChild(section);

  const detailsWrapper = section.querySelector<HTMLDivElement>(".blessing-details")!;
  detailsWrapper.append(
    createDetailRow("date", "Fecha", blessing.date),
    createDetailRow("time", "Hora", blessing.time),
    createDetailRow("location", "Lugar", blessing.location),
  );

  const ctaWrapper = section.querySelector<HTMLDivElement>(".blessing-cta")!;
  const directionsButton = createButton({ label: "Cómo llegar", variant: "secondary" });
  directionsButton.classList.add("w-full");
  directionsButton.addEventListener("click", () => {
    openDirectionsModal(blessing, "blessing-directions-title");
  });
  ctaWrapper.appendChild(directionsButton);

  applySceneReveal({
    section,
    elements: Array.from(section.querySelectorAll(".blessing-content > *")),
  });
}
