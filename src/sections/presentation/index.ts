/**
 * Sección: Presentación (Etapa 5a).
 *
 * Inmediatamente después de la card de acceso — transmite que llegó el gran
 * día, con un texto breve personalizado por invitado (CLAUDE.md §9).
 * El texto exacto es un placeholder editorial (confirmado con el cliente
 * como "borrador razonable"); se ajusta editando PRESENTATION_COPY abajo.
 */

import { GUEST_VALIDATED_EVENT, type GuestValidatedDetail } from "@/sections/hero";
import { personalize, firstName } from "@/utils/personalize";
import { applySceneReveal } from "@/animations/sceneTransition";

/**
 * Placeholder editorial — 2 líneas, tono cálido/celebratorio, personalizado
 * con el nombre del invitado. Ajustar el texto en sí es un cambio de una
 * sola línea acá, no toca estructura ni animación.
 */
const PRESENTATION_COPY = {
  eyebrow: "Un capítulo nuevo",
  lead: "Después de quince años de historia, llegó el día que estábamos esperando.",
  body: "{{name}}, quiero compartir con vos esta noche tan especial: una celebración de todo lo vivido, y de todo lo que todavía está por venir.",
};

export function renderPresentation(container: HTMLElement): void {
  const section = document.createElement("section");
  section.dataset.section = "presentation";
  section.className =
    "relative flex min-h-screen flex-col items-center justify-center px-6 py-section text-center";

  section.innerHTML = `
    <p class="presentation-eyebrow text-small font-medium uppercase tracking-[0.25em]" style="color: var(--color-primary);">
      ${PRESENTATION_COPY.eyebrow}
    </p>
    <h2 class="presentation-lead mt-4 max-w-md text-h1" style="color: var(--color-foreground);">
      ${PRESENTATION_COPY.lead}
    </h2>
    <p class="presentation-body mt-6 max-w-sm text-body-lg" style="color: var(--color-muted-foreground);">
      <!-- se completa al validar el invitado -->
    </p>
  `;

  container.appendChild(section);

  const bodyEl = section.querySelector<HTMLParagraphElement>(".presentation-body")!;
  const eyebrowEl = section.querySelector<HTMLParagraphElement>(".presentation-eyebrow")!;
  const leadEl = section.querySelector<HTMLHeadingElement>(".presentation-lead")!;

  window.addEventListener(GUEST_VALIDATED_EVENT, ((event: CustomEvent<GuestValidatedDetail>) => {
    const guest = event.detail.guest;
    bodyEl.textContent = personalize(PRESENTATION_COPY.body, {
      ...guest,
      name: firstName(guest),
    });
  }) as EventListener);

  applySceneReveal({ section, elements: [eyebrowEl, leadEl, bodyEl] });
}
