/**
 * Grupo de radio buttons NATIVOS (Etapa 6, revisión pedida por el cliente:
 * "formulario tradicional, sin las cards grandes, usá lo nativo de
 * Tailwind"). Reemplaza a selectCard/index.ts.
 *
 * `accent-color` (utilidad `accent-primary` de Tailwind) tiñe el tilde nativo
 * del radio con el color de marca, sin reimplementar el control a mano.
 */

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupOptions {
  name: string;
  legend: string;
  options: RadioOption[];
  initialValue?: string;
  onChange: (value: string) => void;
}

export function createRadioGroup(options: RadioGroupOptions): HTMLFieldSetElement {
  const fieldset = document.createElement("fieldset");
  fieldset.className = "flex flex-col gap-2";

  const legend = document.createElement("legend");
  legend.className = "text-small font-medium";
  legend.style.color = "var(--color-muted-foreground)";
  legend.textContent = options.legend;
  fieldset.appendChild(legend);

  options.options.forEach((option) => {
    const label = document.createElement("label");
    label.className = "flex items-center gap-2.5 py-1.5";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = options.name;
    input.value = option.value;
    input.className = "h-5 w-5 accent-primary";
    if (options.initialValue === option.value) input.checked = true;

    input.addEventListener("change", () => options.onChange(option.value));

    const text = document.createElement("span");
    text.className = "text-body";
    text.style.color = "var(--color-foreground)";
    text.textContent = option.label;

    label.append(input, text);
    fieldset.appendChild(label);
  });

  return fieldset;
}
