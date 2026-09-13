/**
 * Sección: Playlist colaborativa de Spotify (Etapa 5c, CLAUDE.md §14).
 *
 * Texto breve + CTA con el logo oficial de Spotify (no un botón genérico).
 * Fondo lila pastel (paleta de referencia) para separar visualmente esta
 * franja del resto.
 */

import { eventConfig } from "@/config/event.config";
import { createLinkButton } from "@/components/button";
import { createSpotifyIcon } from "@/components/icon/brandIcons";
import { applySceneReveal } from "@/animations/sceneTransition";

export function renderSpotify(container: HTMLElement): void {
  const section = document.createElement("section");
  section.dataset.section = "spotify";
  section.className =
    "relative flex min-h-screen flex-col items-center justify-center px-6 py-section text-center";

  section.innerHTML = `
    <div class="spotify-content flex w-full max-w-sm flex-col items-center">
      <p class="spotify-eyebrow text-small font-medium uppercase tracking-[0.25em]" style="color: var(--color-primary);">
        Sumate a la banda sonora
      </p>
      <h2 class="spotify-title mt-3 text-h1" style="color: var(--color-foreground);">
        Armemos la playlist juntos
      </h2>
      <p class="spotify-body mt-4 text-body" style="color: var(--color-muted-foreground);">
        Esta playlist es colaborativa: agregá esa canción que no puede faltar para que
        suene en la fiesta. Cuantas más canciones, mejor baile.
      </p>

      <div class="spotify-cta mt-8 w-full"></div>
    </div>
  `;

  container.appendChild(section);

  const ctaWrapper = section.querySelector<HTMLDivElement>(".spotify-cta")!;
  const spotifyLink = createLinkButton({
    label: "Ir a la playlist",
    href: eventConfig.spotifyPlaylistUrl,
    variant: "primary",
  });
  spotifyLink.classList.add("w-full");
  spotifyLink.prepend(createSpotifyIcon());
  ctaWrapper.appendChild(spotifyLink);

  applySceneReveal({
    section,
    elements: Array.from(section.querySelectorAll(".spotify-content > *")),
  });
}
