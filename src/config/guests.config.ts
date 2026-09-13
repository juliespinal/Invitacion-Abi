/**
 * Códigos de invitados — hardcodeados por decisión de producto (CLAUDE.md §7/§39).
 * Fácil de agregar/modificar: cada clave es el código que el invitado ingresa.
 *
 * Se completa con la lista real de invitados en la Etapa 3 (Sistema de invitación).
 * La propiedad `custom` existe para una implementación futura y NO debe usarse todavía
 * (CLAUDE.md §7).
 */

export interface Guest {
  name: string;
  paysCard: boolean;
  amount: number;
  message: string;
  /** Reservado para uso futuro — no implementar todavía. */
  custom?: unknown;
}

export const guestCodes: Record<string, Guest> = {
  // --- Datos de prueba (Etapa 3) — reemplazar por la lista real cuando esté lista. ---
  ABC123: {
    name: "Juan Pérez",
    paysCard: true,
    amount: 15000,
    message:
      "Juan, sos parte de los recuerdos más lindos de mi infancia. Que no falte tu abrazo ese día.",
  },
  XYZ789: {
    name: "María González",
    paysCard: false,
    amount: 0,
    message: "María, gracias por acompañarme siempre. ¡Quiero celebrar con vos!",
  },
  FLOR456: {
    name: "Florencia Ibáñez",
    paysCard: true,
    amount: 15000,
    message:
      "Flor, desde que tengo memoria estuviste ahí: en los cumpleaños, en los mates de la tarde, en cada charla larga que se hacía corta. Este capítulo de mi vida no estaría completo sin vos, así que espero de corazón que puedas acompañarme en un día que va a quedar guardado para siempre.",
  },
};

export function findGuestByCode(code: string): Guest | undefined {
  const normalized = code.trim().toUpperCase();
  return guestCodes[normalized];
}
