/**
 * Sesión del invitado validado — SOLO EN MEMORIA (variable de módulo), a
 * propósito, no en sessionStorage/localStorage/cookies.
 *
 * Decisión explícita del cliente: recargar la página debe borrar por completo
 * el acceso — quien no tiene el código no puede entrar de ninguna forma, ni
 * siquiera recargando/reabriendo la misma pestaña en el mismo dispositivo.
 * Una variable de módulo se reinicia solo con cualquier recarga real de la
 * página (F5, cerrar/abrir pestaña, etc.), a diferencia de cualquier storage
 * persistente, así que no depende de que otro código "decida" no leerlo.
 */

import type { Guest } from "@/config/guests.config";

let activeSession: { code: string; guest: Guest } | null = null;

export function saveGuestSession(code: string, guest: Guest): void {
  activeSession = { code, guest };
}

export function getGuestSession(): { code: string; guest: Guest } | null {
  return activeSession;
}

export function clearGuestSession(): void {
  activeSession = null;
}
