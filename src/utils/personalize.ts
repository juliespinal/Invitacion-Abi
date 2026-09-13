/**
 * Utilidad de personalización dinámica (CLAUDE.md §8): las secciones no duplican
 * contenido por invitado, sino que interpolan los datos del invitado activo sobre
 * textos base. Uso típico:
 *
 *   personalize("¡Hola {{name}}!", guest) // -> "¡Hola Juan Pérez!"
 *
 * Placeholders soportados: {{name}}, {{amount}}, {{message}}.
 */

import type { Guest } from "@/config/guests.config";

export function personalize(template: string, guest: Guest): string {
  return template
    .replaceAll("{{name}}", guest.name)
    .replaceAll("{{amount}}", guest.amount.toLocaleString("es-AR"))
    .replaceAll("{{message}}", guest.message);
}

/** Primer nombre del invitado, para saludos más cercanos ("Hola Juan" en vez de "Hola Juan Pérez"). */
export function firstName(guest: Guest): string {
  return guest.name.trim().split(/\s+/)[0] ?? guest.name;
}
