/**
 * Sección: Código de vestimenta (Etapa 5c, CLAUDE.md §15).
 *
 * Etiqueta del dress code + paleta de colores como círculos con nombre
 * debajo (no una lista de hexadecimales) — swatch grande tipo "muestra de
 * tela", fila horizontal centrada.
 */

import { eventConfig } from "@/config/event.config";
import { applySceneReveal } from "@/animations/sceneTransition";

export function renderDresscode(container: HTMLElement): void {
  const section = document.createElement("section");
  section.dataset.section = "dresscode";
  section.className =
    "relative flex min-h-screen flex-col items-center justify-center px-6 py-section text-center";

  const { dressCode } = eventConfig;

  section.innerHTML = `
    <div class="dresscode-content flex w-full max-w-sm flex-col items-center">
      <p class="dresscode-eyebrow text-small font-medium uppercase tracking-[0.25em]" style="color: var(--color-primary);">
        Código de vestimenta
      </p>
      <h2 class="dresscode-label mt-3 text-h1" style="color: var(--color-foreground);">
        ${dressCode.label}
      </h2>
      <p class="dresscode-body mt-4 text-body" style="color: var(--color-muted-foreground);">
        Para acompañar la noche, esta es la paleta que va a estar presente en la
        decoración — es solo una guía, no hace falta que combine exacto.
      </p>

      <div class="dresscode-swatches mt-8 flex w-full flex-wrap items-start justify-center gap-5"></div>
    </div>
  `;

  container.appendChild(section);

  const swatchesWrapper = section.querySelector<HTMLDivElement>(".dresscode-swatches")!;
  dressCode.colors.forEach((color) => {
    swatchesWrapper.appendChild(createSwatch(color.hex, color.name));
  });

  applySceneReveal({
    section,
    elements: Array.from(section.querySelectorAll(".dresscode-content > *")),
  });
}

function createSwatch(hex: string, name: string): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-col items-center gap-2";

  const circle = document.createElement("span");
  circle.className = "h-14 w-14 rounded-full";
  circle.style.background = hex;
  circle.style.boxShadow = "var(--shadow-sm)";
  circle.style.border = "1px solid var(--color-border, #E4D9FA)";

  const label = document.createElement("span");
  label.className = "text-caption";
  label.style.color = "var(--color-muted-foreground, #4A4458)";
  label.textContent = name;

  wrapper.append(circle, label);
  return wrapper;
}
