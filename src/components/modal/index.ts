/**
 * Modal reutilizable (usado por "Cómo llegar" → Google Maps, CLAUDE.md §13/§29).
 * Comportamiento según docs/design-system.md §7:
 *  - overlay con blur, bloqueo de scroll del fondo.
 *  - entrada: fade del overlay + scale-in del modal (0.96 -> 1).
 *  - salida: inversa, más corta (exit-faster-than-enter).
 *  - cierre: botón X, click en overlay, tecla Escape.
 *  - foco: se mueve al modal al abrir, se restaura al elemento que lo abrió
 *    al cerrar (accesibilidad — no solo visual).
 */

import { gsap } from "gsap";
import { createIcon } from "@/components/icon";

export interface ModalOptions {
  titleId: string;
  title: string;
  content: HTMLElement;
  onClose?: () => void;
}

let activeModal: {
  overlay: HTMLElement;
  triggerEl: HTMLElement | null;
  onClose?: () => void;
} | null = null;

export function openModal(options: ModalOptions): void {
  if (activeModal) return; // ya hay un modal abierto — evita apilar

  const triggerEl = document.activeElement as HTMLElement | null;

  const overlay = document.createElement("div");
  overlay.className =
    "modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4";
  overlay.style.background = "rgba(26, 16, 48, 0.6)";
  overlay.style.backdropFilter = "blur(8px)";
  overlay.style.opacity = "0";

  const dialog = document.createElement("div");
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-labelledby", options.titleId);
  dialog.tabIndex = -1;
  dialog.className =
    "modal-dialog relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-lg p-5";
  dialog.style.background = "var(--color-surface, #FFFFFF)";
  dialog.style.boxShadow = "var(--shadow-lg)";
  dialog.style.borderRadius = "var(--radius-lg)";
  dialog.style.transform = "scale(0.96)";
  dialog.style.opacity = "0";

  const header = document.createElement("div");
  header.className = "mb-4 flex items-center justify-between gap-4";

  const title = document.createElement("h3");
  title.id = options.titleId;
  title.className = "text-h3";
  title.style.color = "var(--color-foreground, #160F26)";
  title.textContent = options.title;

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Cerrar");
  closeButton.className =
    "modal-close flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-200";
  closeButton.style.color = "var(--color-muted-foreground, #4A4458)";
  closeButton.appendChild(createIcon("close", { decorative: false, label: "Cerrar" }));
  closeButton.addEventListener("mouseenter", () => {
    closeButton.style.background = "var(--color-surface-alt, #F3EDFF)";
  });
  closeButton.addEventListener("mouseleave", () => {
    closeButton.style.background = "transparent";
  });

  header.append(title, closeButton);
  dialog.append(header, options.content);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  document.body.style.overflow = "hidden";

  activeModal = { overlay, triggerEl, onClose: options.onClose };

  function handleKeydown(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      closeModal();
      return;
    }
    if (event.key === "Tab") {
      trapFocus(event, dialog);
    }
  }

  function handleOverlayClick(event: MouseEvent): void {
    if (event.target === overlay) closeModal();
  }

  overlay.addEventListener("click", handleOverlayClick);
  closeButton.addEventListener("click", () => closeModal());
  document.addEventListener("keydown", handleKeydown);

  (overlay as HTMLElement & { __removeKeydown?: () => void }).__removeKeydown = () =>
    document.removeEventListener("keydown", handleKeydown);

  gsap.to(overlay, { opacity: 1, duration: 0.2, ease: "power1.out" });
  gsap.to(dialog, {
    opacity: 1,
    scale: 1,
    duration: 0.25,
    ease: "power2.out",
    onComplete: () => dialog.focus(),
  });
}

export function closeModal(): void {
  if (!activeModal) return;
  const { overlay, triggerEl, onClose } = activeModal;
  const dialog = overlay.querySelector<HTMLElement>(".modal-dialog")!;

  (overlay as HTMLElement & { __removeKeydown?: () => void }).__removeKeydown?.();

  // Salida más corta que la entrada (exit-faster-than-enter).
  gsap.to(dialog, { opacity: 0, scale: 0.96, duration: 0.15, ease: "power1.in" });
  gsap.to(overlay, {
    opacity: 0,
    duration: 0.15,
    ease: "power1.in",
    onComplete: () => {
      overlay.remove();
      document.body.style.overflow = "";
      triggerEl?.focus();
      onClose?.();
    },
  });

  activeModal = null;
}

function trapFocus(event: KeyboardEvent, dialog: HTMLElement): void {
  const focusable = dialog.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );
  if (focusable.length === 0) return;

  const first = focusable[0]!;
  const last = focusable[focusable.length - 1]!;

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
