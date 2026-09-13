/**
 * Cliente de comunicación con Google Apps Script (backend de Sheets).
 * Implementación completa en la Etapa 7, junto con el script del lado del servidor
 * en /apps-script/Code.gs.
 *
 * Nota técnica (riesgo detectado en Etapa 0): Apps Script no maneja preflight CORS
 * con headers custom, por eso el POST se hace con `content-type: text/plain` para
 * que el navegador no dispare un preflight OPTIONS.
 */

const APPS_SCRIPT_URL = ""; // se completa en la Etapa 7 con la URL del deployment

export interface RsvpPayload {
  code: string;
  fullName: string;
  attending: boolean;
  canPayCard: "Si" | "Contactar" | null;
  companions: string;
  diet: string;
  dietDetails: string;
  comments: string;
}

export interface RsvpResponse {
  success: boolean;
  message: string;
}

export async function submitRsvp(payload: RsvpPayload): Promise<RsvpResponse> {
  if (!APPS_SCRIPT_URL) {
    throw new Error("APPS_SCRIPT_URL no configurada todavía (Etapa 7).");
  }

  const response = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}`);
  }

  return response.json();
}
