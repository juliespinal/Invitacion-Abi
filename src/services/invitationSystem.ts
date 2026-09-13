/**
 * Sistema de invitación (Etapa 3) — API pública para validar un código y acceder
 * al invitado activo. El resto de la app (secciones, formulario RSVP) consume
 * esto, no `guests.config.ts` ni `guestSession.ts` directamente, para no acoplar
 * cada sección al detalle de dónde/cómo se persiste la sesión.
 *
 * Reglas de negocio confirmadas:
 * - El código solo se valida por existencia (case-insensitive, sin espacios).
 * - No hay bloqueo por reingreso ni por haber confirmado ya: es un evento privado,
 *   el invitado puede volver a entrar con el mismo código cuantas veces quiera.
 */

import { findGuestByCode, type Guest } from "@/config/guests.config";
import { saveGuestSession, getGuestSession, clearGuestSession } from "@/services/guestSession";

export type ValidationResult =
  | { ok: true; guest: Guest }
  | { ok: false; reason: "empty" | "not-found" };

/**
 * Valida un código ingresado por el usuario y, si es válido, persiste la sesión
 * del invitado para el resto de la experiencia.
 */
export function validateAccessCode(rawCode: string): ValidationResult {
  const code = rawCode.trim();

  if (code.length === 0) {
    return { ok: false, reason: "empty" };
  }

  const guest = findGuestByCode(code);

  if (!guest) {
    return { ok: false, reason: "not-found" };
  }

  saveGuestSession(code, guest);
  return { ok: true, guest };
}

/**
 * Invitado actualmente activo en la sesión (si ya validó un código antes),
 * para restaurar la experiencia personalizada sin pedir el código de nuevo
 * en la misma pestaña (ej. al recargar).
 */
export function getActiveGuest(): Guest | null {
  return getGuestSession()?.guest ?? null;
}

/** Código con el que se validó la sesión activa (lo necesita, por ejemplo, el envío del RSVP). */
export function getActiveCode(): string | null {
  return getGuestSession()?.code ?? null;
}

export function logOutGuest(): void {
  clearGuestSession();
}
