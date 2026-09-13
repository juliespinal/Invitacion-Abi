/**
 * Sección: Fiesta (Etapa 5b, CLAUDE.md §12).
 *
 * Misma estructura que Bendición (componentes reutilizados: createDetailRow,
 * createButton, openDirectionsModal), datos distintos, escena de día.
 */

import { eventConfig } from "@/config/event.config";
import { createDetailRow } from "@/components/eventDetails";
import { createButton } from "@/components/button";
import { openDirectionsModal } from "@/components/directionsModal";
import { applySceneReveal } from "@/animations/sceneTransition";

export function renderParty(container: HTMLElement): void {
  const section = document.createElement("section");
  section.dataset.section = "party";
  section.className = "relative flex min-h-screen flex-col items-center justify-center px-6 py-section";

  const { party } = eventConfig;

  section.innerHTML = `
    <div class="party-content flex w-full max-w-sm flex-col items-center text-center">
      <p class="party-eyebrow text-small font-medium uppercase tracking-[0.25em]" style="color: var(--color-primary);">
        Después, la celebración
      </p>
      <h2 class="party-title mt-3 text-h1" style="color: var(--color-foreground);">
        La fiesta
      </h2>
      <p class="party-body mt-4 text-body" style="color: var(--color-muted-foreground);">
        Con música, baile y mucha alegría, quiero cerrar esta noche rodeada de las personas
        que hacen que valga la pena celebrar.
      </p>

      <div class="party-details mt-8 flex w-full flex-col gap-4 text-left"></div>

      <div class="party-cta mt-8 w-full"></div>
    </div>
  `;

  container.appendChild(section);

  const detailsWrapper = section.querySelector<HTMLDivElement>(".party-details")!;
  detailsWrapper.append(
    createDetailRow("date", "Fecha", party.date),
    createDetailRow("time", "Hora", party.time),
    createDetailRow("location", "Lugar", party.location),
  );

  const ctaWrapper = section.querySelector<HTMLDivElement>(".party-cta")!;
  const directionsButton = createButton({ label: "Cómo llegar", variant: "secondary" });
  directionsButton.classList.add("w-full");
  directionsButton.addEventListener("click", () => {
    openDirectionsModal(party, "party-directions-title");
  });
  ctaWrapper.appendChild(directionsButton);

  applySceneReveal({
    section,
    elements: Array.from(section.querySelectorAll(".party-content > *")),
  });
}
