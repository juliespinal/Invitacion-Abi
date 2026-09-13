/**
 * Contenido del modal "Cómo llegar" (CLAUDE.md §13): iframe de Google Maps
 * Embed + botón "Abrir en Maps". Reutilizado por Bendición y Fiesta con
 * datos distintos (event.config.ts) — un solo componente, no duplicado.
 */

import { openModal } from "@/components/modal";
import { createLinkButton } from "@/components/button";
import { createIcon } from "@/components/icon";
import type { EventLocation } from "@/config/event.config";

export function openDirectionsModal(location: EventLocation, titleId: string): void {
  const content = document.createElement("div");
  content.className = "flex flex-col gap-4";

  const mapWrapper = document.createElement("div");
  mapWrapper.className = "overflow-hidden rounded-md";
  mapWrapper.style.borderRadius = "var(--radius-sm)";
  mapWrapper.style.aspectRatio = "4 / 3";

  const iframe = document.createElement("iframe");
  iframe.src = location.mapsEmbedUrl;
  iframe.className = "h-full w-full border-0";
  iframe.loading = "lazy";
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  iframe.title = "Mapa de ubicación";

  mapWrapper.appendChild(iframe);

  const openInMapsLink = createLinkButton({
    label: "Abrir en Maps",
    href: location.mapsUrl,
    variant: "secondary",
  });
  openInMapsLink.classList.add("w-full");
  openInMapsLink.appendChild(createIcon("external-link", { decorative: true }));

  content.append(mapWrapper, openInMapsLink);

  openModal({
    titleId,
    title: "Cómo llegar",
    content,
  });
}
