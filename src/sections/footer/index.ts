/**
 * Sección: footer
 * Placeholder de estructura (Etapa 2). Contenido real en su etapa correspondiente
 * del plan (ver CLAUDE.md §43 / docs/design-system.md).
 */

export function renderFooter(container: HTMLElement): void {
  const section = document.createElement("section");
  section.dataset.section = "footer";
  section.dataset.scene = "night";
  section.className = "min-h-screen flex items-center justify-center";
  section.innerHTML = `<p class="text-small text-muted-foreground">[footer] pendiente de implementación</p>`;
  container.appendChild(section);
}
