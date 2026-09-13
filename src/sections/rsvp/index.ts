/**
 * Sección: Confirmación de asistencia (Etapa 6, CLAUDE.md §16-22 — revisada
 * a formulario tradicional con radio buttons nativos, sin cards grandes).
 *
 * Estructura:
 *  - Nombre y apellido (obligatorio, siempre visible).
 *  - Asistencia (radio nativo): si "No puedo asistir", oculta todo lo demás
 *    (tarjeta, acompañantes, alimentación, comentarios) y deja solo el botón.
 *  - Tarjeta (solo si el invitado activo tiene paysCard=true Y asiste).
 *  - Acompañantes (solo si asiste): solo/acompañado -> campo de nombres.
 *  - Alimentación (solo si asiste): select -> "Otro" revela detalle.
 *  - Comentarios (solo si asiste).
 *  - Envío con estados normal/loading/éxito/error.
 */

import { GUEST_VALIDATED_EVENT, type GuestValidatedDetail } from "@/sections/hero";
import { getActiveCode } from "@/services/invitationSystem";
import { submitRsvp, type RsvpPayload } from "@/services/sheetsApi";
import { applySceneReveal } from "@/animations/sceneTransition";
import { createTextField, type TextFieldHandle } from "@/components/textField";
import { createRadioGroup } from "@/components/radioGroup";
import { createButton, setButtonLoading } from "@/components/button";
import { createIcon } from "@/components/icon";
import { gsap } from "gsap";
import type { Guest } from "@/config/guests.config";

const DIET_OPTIONS = ["Ninguna", "Vegetariano", "Vegano", "Celíaco", "Diabético", "Otro"];

export function renderRsvp(container: HTMLElement): void {
  const section = document.createElement("section");
  section.dataset.section = "rsvp";
  section.className = "relative flex min-h-screen flex-col items-center px-6 py-section";

  section.innerHTML = `
    <div class="rsvp-content flex w-full max-w-sm flex-col items-center text-center">
      <p class="rsvp-eyebrow text-small font-medium uppercase tracking-[0.25em]" style="color: var(--color-primary);">
        Tu lugar te espera
      </p>
      <h2 class="rsvp-title mt-3 text-h1" style="color: var(--color-foreground);">
        Confirmá tu asistencia
      </h2>
      <p class="rsvp-body mt-4 text-body" style="color: var(--color-muted-foreground);">
        Necesito saber si vas a estar ese día — contame los detalles para que todo salga perfecto.
      </p>

      <form class="rsvp-form mt-8 flex w-full flex-col gap-6 text-left" novalidate>
        <div class="rsvp-name-field"></div>
        <div class="rsvp-attendance"></div>

        <div class="rsvp-conditional flex flex-col gap-6">
          <div class="rsvp-card-block hidden flex-col gap-2"></div>
          <div class="rsvp-companions"></div>
          <div class="rsvp-companions-field hidden"></div>

          <div class="flex flex-col gap-1.5">
            <label for="rsvp-diet" class="text-small font-medium" style="color: var(--color-muted-foreground);">
              Alimentación
            </label>
            <select
              id="rsvp-diet"
              name="diet"
              class="w-full min-h-12 rounded-sm border-[1.5px] px-4 py-3.5 text-body outline-none transition-colors duration-200"
              style="border-color: var(--color-border); color: var(--color-foreground); background: var(--color-surface); border-radius: var(--radius-sm);"
            >
              ${DIET_OPTIONS.map((opt) => `<option value="${opt}">${opt}</option>`).join("")}
            </select>
            <div class="rsvp-diet-details-field hidden mt-2"></div>
          </div>

          <div class="rsvp-comments-field"></div>
        </div>

        <div class="rsvp-submit-slot"></div>
        <div class="rsvp-feedback" role="status" aria-live="polite"></div>
      </form>
    </div>
  `;

  container.appendChild(section);

  let activeGuest: Guest | null = null;

  window.addEventListener(GUEST_VALIDATED_EVENT, ((event: CustomEvent<GuestValidatedDetail>) => {
    activeGuest = event.detail.guest;
  }) as EventListener);

  // --- Nombre y apellido (obligatorio) ---
  const nameField = createTextField({ id: "rsvp-name", label: "Nombre y apellido", required: true });
  section.querySelector(".rsvp-name-field")!.appendChild(nameField.wrapper);

  // --- Asistencia ---
  const conditionalBlock = section.querySelector<HTMLDivElement>(".rsvp-conditional")!;
  let attending = true;

  const attendanceGroup = createRadioGroup({
    name: "rsvp-attendance",
    legend: "¿Vas a poder acompañarnos?",
    options: [
      { value: "yes", label: "Asistiré" },
      { value: "no", label: "No puedo asistir" },
    ],
    initialValue: "yes",
    onChange: (value) => {
      attending = value === "yes";
      toggleConditionalBlock(conditionalBlock, attending);
    },
  });
  section.querySelector(".rsvp-attendance")!.appendChild(attendanceGroup);

  // --- Tarjeta (condicional a guest.paysCard, se decide al validar el código) ---
  const cardBlock = section.querySelector<HTMLDivElement>(".rsvp-card-block")!;
  let cardChoice: "Si" | "Contactar" | null = null;

  window.addEventListener(GUEST_VALIDATED_EVENT, ((event: CustomEvent<GuestValidatedDetail>) => {
    const guest = event.detail.guest;
    if (!guest.paysCard) return;

    cardBlock.classList.remove("hidden");
    cardBlock.classList.add("flex");

    const messageEl = document.createElement("p");
    messageEl.className = "text-body";
    messageEl.style.color = "var(--color-muted-foreground)";
    messageEl.textContent =
      "Realmente queremos que estés presente en este día tan especial. Si está dentro de tus posibilidades ayudarnos con el valor de tu tarjeta, el mismo es de $" +
      guest.amount.toLocaleString("es-AR") +
      " por persona.";

    const cardGroup = createRadioGroup({
      name: "rsvp-card",
      legend: "",
      options: [
        { value: "Si", label: "Puedo abonarlo" },
        { value: "Contactar", label: "Quiero conversarlo" },
      ],
      onChange: (value) => {
        cardChoice = value as "Si" | "Contactar";
      },
    });
    cardGroup.querySelector("legend")?.remove();

    cardBlock.replaceChildren(messageEl, cardGroup);
  }) as EventListener);

  // --- Acompañantes ---
  const companionsField = createTextField({
    id: "rsvp-companions",
    label: "Nombres de los acompañantes",
    placeholder: "Ej: Ana Gómez, Pedro Ruiz",
  });
  const companionsFieldWrapper = section.querySelector<HTMLDivElement>(".rsvp-companions-field")!;
  companionsFieldWrapper.appendChild(companionsField.wrapper);

  const companionsChoiceGroup = createRadioGroup({
    name: "rsvp-companions-choice",
    legend: "¿Vas solo/a o acompañado/a?",
    options: [
      { value: "solo", label: "Voy solo/a" },
      { value: "accompanied", label: "Voy acompañado/a" },
    ],
    initialValue: "solo",
    onChange: (value) => {
      const goingAccompanied = value === "accompanied";
      toggleVisibility(companionsFieldWrapper, goingAccompanied);
      if (!goingAccompanied) (companionsField.input as HTMLInputElement).value = "";
    },
  });
  section.querySelector(".rsvp-companions")!.appendChild(companionsChoiceGroup);

  // --- Alimentación ---
  const dietSelect = section.querySelector<HTMLSelectElement>("#rsvp-diet")!;
  const dietDetailsWrapper = section.querySelector<HTMLDivElement>(".rsvp-diet-details-field")!;
  const dietDetailsField = createTextField({
    id: "rsvp-diet-details",
    label: "Ingresá detalles sobre tu alimentación que debamos saber",
    multiline: true,
  });
  dietDetailsWrapper.appendChild(dietDetailsField.wrapper);

  dietSelect.addEventListener("change", () => {
    const isOther = dietSelect.value === "Otro";
    toggleVisibility(dietDetailsWrapper, isOther);
    if (!isOther) (dietDetailsField.input as HTMLTextAreaElement).value = "";
  });

  // --- Comentarios ---
  const commentsField = createTextField({
    id: "rsvp-comments",
    label: "Comentarios para Abi",
    multiline: true,
    placeholder: "Dejale un mensaje a Abi para este día tan especial…",
  });
  section.querySelector(".rsvp-comments-field")!.appendChild(commentsField.wrapper);

  // --- Envío ---
  const form = section.querySelector<HTMLFormElement>(".rsvp-form")!;
  const submitSlot = section.querySelector<HTMLDivElement>(".rsvp-submit-slot")!;
  const feedbackEl = section.querySelector<HTMLDivElement>(".rsvp-feedback")!;

  const submitButton = createButton({ label: "Enviar confirmación", variant: "primary", type: "submit" });
  submitButton.classList.add("w-full");
  submitButton.prepend(createIcon("send", { decorative: true }));
  submitSlot.appendChild(submitButton);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    feedbackEl.replaceChildren();

    if (!validateRequiredFields(nameField)) return;

    if (!activeGuest) {
      showFeedback(feedbackEl, "error", "No pudimos identificar tu invitación. Volvé a ingresar tu código.");
      return;
    }

    const payload: RsvpPayload = {
      code: getActiveCode() ?? "",
      fullName: (nameField.input as HTMLInputElement).value.trim(),
      attending,
      canPayCard: attending && activeGuest.paysCard ? cardChoice : null,
      companions: attending ? (companionsField.input as HTMLInputElement).value.trim() : "",
      diet: attending ? dietSelect.value : "",
      dietDetails:
        attending && dietSelect.value === "Otro"
          ? (dietDetailsField.input as HTMLTextAreaElement).value.trim()
          : "",
      comments: attending ? (commentsField.input as HTMLTextAreaElement).value.trim() : "",
    };

    setButtonLoading(submitButton, true, "Enviando…");

    try {
      const response = await submitRsvp(payload);
      setButtonLoading(submitButton, false);

      if (response.success) {
        showSuccessState(section, activeGuest, attending);
      } else {
        showFeedback(feedbackEl, "error", "No pudimos registrar tu confirmación. Probá de nuevo en unos minutos.");
      }
    } catch (err) {
      console.error("[rsvp] error al enviar confirmación:", err);
      setButtonLoading(submitButton, false);
      showFeedback(feedbackEl, "error", "Hubo un problema al enviar tu confirmación. Probá de nuevo en unos minutos.");
    }
  });

  applySceneReveal({
    section,
    elements: [
      section.querySelector(".rsvp-eyebrow")!,
      section.querySelector(".rsvp-title")!,
      section.querySelector(".rsvp-body")!,
      form,
    ],
  });
}

function toggleConditionalBlock(block: HTMLElement, visible: boolean): void {
  if (visible) {
    block.classList.remove("hidden");
    gsap.fromTo(block, { opacity: 0, height: 0 }, { opacity: 1, height: "auto", duration: 0.4, ease: "power2.out" });
  } else {
    gsap.to(block, {
      opacity: 0,
      height: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => block.classList.add("hidden"),
    });
  }
}

function toggleVisibility(el: HTMLElement, visible: boolean): void {
  if (visible) {
    el.classList.remove("hidden");
    gsap.fromTo(el, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
  } else {
    gsap.to(el, {
      opacity: 0,
      y: -8,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => el.classList.add("hidden"),
    });
  }
}

function validateRequiredFields(nameField: TextFieldHandle): boolean {
  const nameValue = (nameField.input as HTMLInputElement).value.trim();
  if (nameValue.length === 0) {
    nameField.showError("Este campo es obligatorio.");
    nameField.input.focus();
    return false;
  }
  return true;
}

function showFeedback(el: HTMLElement, type: "error" | "success", message: string): void {
  el.replaceChildren();
  const wrapper = document.createElement("p");
  wrapper.className = "mt-2 flex items-center justify-center gap-2 text-small";
  wrapper.style.color = type === "error" ? "var(--color-error)" : "var(--color-success)";
  wrapper.appendChild(createIcon(type === "error" ? "error" : "success", { decorative: true }));
  const text = document.createElement("span");
  text.textContent = message;
  wrapper.appendChild(text);
  el.appendChild(wrapper);
}

function showSuccessState(section: HTMLElement, guest: Guest, attending: boolean): void {
  const content = section.querySelector<HTMLElement>(".rsvp-content")!;
  const firstNameOnly = guest.name.trim().split(/\s+/)[0] ?? guest.name;

  content.innerHTML = `
    <div class="rsvp-success flex flex-col items-center text-center">
      <p class="text-small font-medium uppercase tracking-[0.25em]" style="color: var(--color-primary);">
        ${attending ? "¡Nos vemos pronto!" : "Gracias por avisar"}
      </p>
      <h2 class="mt-3 text-h1" style="color: var(--color-foreground);">
        ${attending ? `Gracias, ${firstNameOnly}` : `Vamos a extrañarte, ${firstNameOnly}`}
      </h2>
      <p class="mt-4 max-w-sm text-body" style="color: var(--color-muted-foreground);">
        ${
          attending
            ? "Tu confirmación quedó registrada. Contar con vos hace que este día sea todavía más especial — nos vemos muy pronto para celebrar juntos."
            : "Lamento que no puedas acompañarme, pero de corazón agradezco que te hayas tomado el tiempo de avisarme. Vas a estar presente igual, a tu manera."
        }
      </p>
    </div>
  `;

  gsap.from(content.querySelector(".rsvp-success"), {
    opacity: 0,
    y: 16,
    duration: 0.5,
    ease: "power2.out",
  });
}
