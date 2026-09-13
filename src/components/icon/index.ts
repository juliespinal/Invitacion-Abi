/**
 * Wrapper mínimo sobre Phosphor Icons (web components) — ver docs/design-system.md §8.
 * Centraliza el mapeo semántico -> nombre de icono real, para no hardcodear
 * "ph-calendar" suelto en cada sección.
 */

export type IconName =
  | "date"
  | "time"
  | "location"
  | "directions"
  | "music"
  | "error"
  | "success"
  | "close"
  | "external-link"
  | "attending"
  | "not-attending"
  | "heart"
  | "chat"
  | "solo"
  | "companions"
  | "send";

const ICON_MAP: Record<IconName, string> = {
  date: "calendar",
  time: "clock",
  location: "map-pin",
  directions: "map-trifold",
  music: "speaker-high",
  error: "warning-circle",
  success: "check-circle",
  close: "x",
  "external-link": "arrow-square-out",
  attending: "check",
  "not-attending": "x-circle",
  heart: "heart",
  chat: "chat-circle",
  solo: "user",
  companions: "users",
  send: "paper-plane-tilt",
};

/**
 * Crea un <i class="ph ph-..."> decorativo (aria-hidden) o con aria-label,
 * según si va acompañado de texto visible.
 */
export function createIcon(
  name: IconName,
  options: { decorative?: boolean; label?: string } = {},
): HTMLElement {
  const el = document.createElement("i");
  el.className = `ph ph-${ICON_MAP[name]}`;

  if (options.decorative !== false) {
    el.setAttribute("aria-hidden", "true");
  } else if (options.label) {
    el.setAttribute("role", "img");
    el.setAttribute("aria-label", options.label);
  }

  return el;
}
