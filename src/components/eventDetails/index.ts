/**
 * Fila de dato con ícono (fecha / hora / ubicación) — compartida entre
 * Bendición y Fiesta (CLAUDE.md §11/§12: "no duplicar componentes de forma
 * innecesaria. Crear componentes reutilizables").
 */

import { createIcon, type IconName } from "@/components/icon";

export function createDetailRow(icon: IconName, label: string, value: string): HTMLElement {
  const row = document.createElement("div");
  row.className = "flex items-center gap-3";

  const iconWrapper = document.createElement("span");
  iconWrapper.className = "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg";
  iconWrapper.style.background = "var(--color-surface-alt, #F3EDFF)";
  iconWrapper.style.color = "var(--color-primary, #5B3A9E)";
  iconWrapper.appendChild(createIcon(icon, { decorative: true }));

  const text = document.createElement("div");
  text.className = "flex flex-col";

  const labelEl = document.createElement("span");
  labelEl.className = "text-caption uppercase tracking-[0.15em]";
  labelEl.style.color = "var(--color-muted-foreground, #4A4458)";
  labelEl.textContent = label;

  const valueEl = document.createElement("span");
  valueEl.className = "text-body font-medium";
  valueEl.style.color = "var(--color-foreground, #160F26)";
  valueEl.textContent = value;

  text.append(labelEl, valueEl);
  row.append(iconWrapper, text);

  return row;
}
