/**
 * Campo de texto reutilizable (label + input + error) — ver
 * docs/design-system.md §5. Usado en nombre y apellido, acompañantes,
 * detalle de alimentación, comentarios (Etapa 6).
 */

import { createIcon } from "@/components/icon";

export interface TextFieldOptions {
  id: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  multiline?: boolean;
}

export interface TextFieldHandle {
  wrapper: HTMLElement;
  input: HTMLInputElement | HTMLTextAreaElement;
  showError: (message: string) => void;
  clearError: () => void;
}

export function createTextField(options: TextFieldOptions): TextFieldHandle {
  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-col gap-1.5 text-left";

  const label = document.createElement("label");
  label.htmlFor = options.id;
  label.className = "text-small font-medium";
  label.style.color = "var(--color-muted-foreground, #4A4458)";
  label.textContent = options.label + (options.required ? "" : " (opcional)");

  const input = options.multiline
    ? document.createElement("textarea")
    : document.createElement("input");

  input.id = options.id;
  input.name = options.id;
  if (!options.multiline) (input as HTMLInputElement).type = "text";
  if (options.multiline) (input as HTMLTextAreaElement).rows = 3;
  if (options.placeholder) input.placeholder = options.placeholder;
  if (options.required) input.required = true;

  input.className =
    "w-full min-h-12 rounded-sm border-[1.5px] px-4 py-3.5 text-body outline-none transition-colors duration-200";
  input.style.borderColor = "var(--color-border, #E4D9FA)";
  input.style.color = "var(--color-foreground, #160F26)";
  input.style.background = "var(--color-surface, #FFFFFF)";
  input.style.borderRadius = "var(--radius-sm)";

  const errorId = `${options.id}-error`;
  const errorEl = document.createElement("p");
  errorEl.id = errorId;
  errorEl.className = "hidden items-center gap-1.5 text-small";
  errorEl.style.color = "var(--color-error, #B91C1C)";
  errorEl.setAttribute("role", "alert");

  input.setAttribute("aria-describedby", errorId);

  wrapper.append(label, input, errorEl);

  function showError(message: string): void {
    errorEl.replaceChildren();
    const icon = createIcon("error", { decorative: true });
    const text = document.createElement("span");
    text.textContent = message;
    errorEl.append(icon, text);
    errorEl.classList.remove("hidden");
    errorEl.classList.add("flex");
    input.style.borderColor = "var(--color-error, #B91C1C)";
    input.setAttribute("aria-invalid", "true");
  }

  function clearError(): void {
    errorEl.replaceChildren();
    errorEl.classList.add("hidden");
    errorEl.classList.remove("flex");
    input.style.borderColor = "var(--color-border, #E4D9FA)";
    input.removeAttribute("aria-invalid");
  }

  input.addEventListener("blur", () => {
    if (options.required && input.value.trim().length === 0) {
      showError("Este campo es obligatorio.");
    }
  });

  input.addEventListener("input", () => {
    if (!errorEl.classList.contains("hidden")) clearError();
  });

  return { wrapper, input, showError, clearError };
}
