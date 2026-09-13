/**
 * Sección: Hero / Landing (Etapa 4, revisada — light mode único, sin escenas).
 *
 * Pantalla de entrada independiente (CLAUDE.md §6): foto de fondo de Abi,
 * H1 "Abi" (script), H2 "Mis quince", y la card de acceso por código.
 *
 * Al validar un código correcto:
 *  - se guarda la sesión del invitado (invitationSystem.validateAccessCode)
 *  - se emite el evento "guest:validated" en window
 *  - main.ts escucha ese evento y ELIMINA esta sección del DOM por completo
 *    (no solo hace scroll lejos de ella) — pedido explícito del cliente:
 *    la pantalla de código no debe poder verse de nuevo bajo ninguna
 *    circunstancia una vez validado el acceso.
 */

import { validateAccessCode } from "@/services/invitationSystem";
import { createButton, setButtonLoading } from "@/components/button";
import type { Guest } from "@/config/guests.config";

export const GUEST_VALIDATED_EVENT = "guest:validated";

export interface GuestValidatedDetail {
  guest: Guest;
}

export function renderHero(container: HTMLElement): void {
  const section = document.createElement("section");
  section.dataset.section = "hero";
  section.className =
    "relative min-h-[100svh] flex items-center justify-center overflow-hidden px-4 py-12";

  section.innerHTML = `
    <div class="absolute inset-0">
      <img
        src="${import.meta.env.BASE_URL}img/abi/hero.jpg"
        alt=""
        aria-hidden="true"
        class="h-full w-full object-cover object-[center_25%] scale-105 blur-[2px]"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/95"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
    </div>

    <div class="relative z-10 flex w-full max-w-md flex-col items-center text-center">
      <h1
        class="font-script leading-none drop-shadow-[0_4px_16px_rgba(59,36,23,0.15)]"
        style="font-size: var(--text-display); color: var(--color-foreground);"
      >
        Abi
      </h1>
      <h2
        class="mt-1 tracking-[0.2em] uppercase"
        style="font-size: var(--text-h3); color: var(--color-accent);"
      >
        Mis quince
      </h2>

      <div
        class="access-card mt-10 w-full rounded-lg p-6"
        style="
          background: var(--color-surface);
          box-shadow: var(--shadow-lg);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
        "
      >
        <p class="text-small" style="color: var(--color-muted-foreground);">
          Esta invitación es personal. Ingresá tu código para continuar.
        </p>

        <form class="access-form mt-4 flex flex-col gap-3" novalidate>
          <label for="access-code" class="sr-only">Código de invitación</label>
          <input
            id="access-code"
            name="code"
            type="text"
            inputmode="text"
            autocomplete="off"
            autocapitalize="characters"
            spellcheck="false"
            placeholder="Tu código"
            class="access-input w-full rounded-sm border-[1.5px] px-4 py-3.5 text-center text-h3 uppercase tracking-[0.15em] outline-none transition-colors duration-200"
            style="
              border-color: var(--color-border);
              color: var(--color-foreground);
              background: var(--color-surface);
              border-radius: var(--radius-sm);
              min-height: 48px;
            "
            aria-describedby="access-error"
          />
          <p
            id="access-error"
            class="access-error hidden text-small"
            style="color: var(--color-error);"
            role="alert"
          ></p>

          <div class="access-submit-slot"></div>
        </form>
      </div>
    </div>
  `;

  container.appendChild(section);

  const form = section.querySelector<HTMLFormElement>(".access-form")!;
  const input = section.querySelector<HTMLInputElement>("#access-code")!;
  const errorEl = section.querySelector<HTMLParagraphElement>(".access-error")!;
  const submitSlot = section.querySelector<HTMLDivElement>(".access-submit-slot")!;

  const submitButton = createButton({ label: "Ingresar", variant: "primary", type: "submit" });
  submitButton.classList.add("w-full");
  submitSlot.appendChild(submitButton);

  function showError(message: string): void {
    errorEl.textContent = message;
    errorEl.classList.remove("hidden");
    input.setAttribute("aria-invalid", "true");
    input.style.borderColor = "var(--color-error)";
  }

  function clearError(): void {
    errorEl.textContent = "";
    errorEl.classList.add("hidden");
    input.removeAttribute("aria-invalid");
    input.style.borderColor = "var(--color-border)";
  }

  input.addEventListener("input", () => {
    if (!errorEl.classList.contains("hidden")) clearError();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearError();
    setButtonLoading(submitButton, true, "Validando…");

    // Pequeño delay artificial: la validación es instantánea (es solo un
    // lookup local), pero sin feedback de carga el "click" se siente roto
    // (regla de la skill: Submit Feedback / Loading -> Success).
    await new Promise((resolve) => setTimeout(resolve, 400));

    const result = validateAccessCode(input.value);
    setButtonLoading(submitButton, false);

    if (!result.ok) {
      showError(
        result.reason === "empty"
          ? "Ingresá tu código para continuar."
          : "No encontramos ese código. Revisá que esté bien escrito.",
      );
      input.focus();
      return;
    }

    input.disabled = true;
    submitButton.disabled = true;

    window.dispatchEvent(
      new CustomEvent<GuestValidatedDetail>(GUEST_VALIDATED_EVENT, {
        detail: { guest: result.guest },
      }),
    );
  });
}
