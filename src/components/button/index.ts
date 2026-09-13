/**
 * Botón reutilizable — ver docs/design-system.md §4 (primario/secundario, estados).
 * Implementación de estilos completa vía clases Tailwind; este módulo solo
 * centraliza la construcción del elemento y sus estados (normal/loading/disabled).
 */

export type ButtonVariant = "primary" | "secondary";

export interface ButtonOptions {
  label: string;
  variant?: ButtonVariant;
  type?: "button" | "submit";
}

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 min-h-[48px] " +
  "text-body font-medium transition-colors duration-200 cursor-pointer " +
  "disabled:opacity-70 disabled:cursor-not-allowed";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  // text-on-accent (no text-white fijo): el dorado cambia de oscuro (día) a
  // claro (noche) según la escena, así que el texto encima debe invertirse
  // con él — ver --color-on-accent en tokens.css.
  primary:
    "bg-accent text-on-accent hover:bg-accent-hover",
  secondary:
    "border-[1.5px] border-primary text-primary bg-transparent hover:bg-secondary/15",
};

export function createButton(options: ButtonOptions): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = options.type ?? "button";
  button.className = `${BASE_CLASSES} ${VARIANT_CLASSES[options.variant ?? "primary"]}`;
  button.textContent = options.label;
  return button;
}

export interface LinkButtonOptions {
  label: string;
  href: string;
  variant?: ButtonVariant;
  /** true (default) abre en pestaña nueva — usar false para links internos. */
  external?: boolean;
}

/**
 * Con el mismo look que createButton, pero como <a> real — para acciones que
 * navegan (ej. "Abrir en Maps", "Ir a Spotify"). Evita anidar un <button> real
 * dentro de un <a> (HTML inválido) cuando la acción es, en el fondo, un link.
 */
export function createLinkButton(options: LinkButtonOptions): HTMLAnchorElement {
  const link = document.createElement("a");
  link.href = options.href;
  if (options.external !== false) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
  link.className = `${BASE_CLASSES} ${VARIANT_CLASSES[options.variant ?? "primary"]}`;
  link.textContent = options.label;
  return link;
}

export function setButtonLoading(button: HTMLButtonElement, loading: boolean, loadingText = "Enviando…"): void {
  if (loading) {
    button.dataset.originalLabel = button.textContent ?? "";
    button.textContent = loadingText;
    button.disabled = true;
  } else {
    button.textContent = button.dataset.originalLabel ?? button.textContent;
    button.disabled = false;
  }
}
