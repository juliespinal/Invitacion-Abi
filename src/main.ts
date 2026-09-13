import "@/styles/global.css";
import "@phosphor-icons/web/regular";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { setupSmoothScroll } from "@/animations/lenisSetup";
import { setupBackgroundFlow } from "@/animations/backgroundFlow";
import { setupFloatingShapes } from "@/animations/floatingShapes";

import { renderHero, GUEST_VALIDATED_EVENT } from "@/sections/hero";
import { renderPresentation } from "@/sections/presentation";
import { renderPhotobook } from "@/sections/photobook";
import { renderBlessing } from "@/sections/blessing";
import { renderParty } from "@/sections/party";
import { renderSpotify } from "@/sections/spotify";
import { renderDresscode } from "@/sections/dresscode";
import { renderRsvp } from "@/sections/rsvp";
import { renderFooter } from "@/sections/footer";

gsap.registerPlugin(ScrollTrigger);

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("No se encontró el contenedor #app");
}

// El hero vive siempre visible/interactivo hasta que se valida el código. El
// resto de la experiencia queda "bloqueado" (oculto e inerte para lectores de
// pantalla/tab order) hasta ese momento.
const experience = document.createElement("div");
experience.dataset.experience = "main";
experience.setAttribute("aria-hidden", "true");
experience.inert = true;
experience.className = "hidden";

// Lenis/ScrollTrigger deben quedar configurados (scrollerProxy + defaults del
// scroller) ANTES de que cualquier sección cree su propio ScrollTrigger — si
// no, esas secciones quedan registradas contra el scroller nativo por
// default y se desincronizan del smooth-scroll de Lenis.
const lenis = setupSmoothScroll();
const backgroundFlow = setupBackgroundFlow();
setupFloatingShapes(backgroundFlow.layer);

const heroSection = document.createElement("div");
renderHero(heroSection);
app.appendChild(heroSection);
app.appendChild(experience);

renderPresentation(experience);
renderPhotobook(experience);
renderBlessing(experience);
renderParty(experience);
renderSpotify(experience);
renderDresscode(experience);
renderRsvp(experience);
renderFooter(experience);

function unlockExperience(): void {
  // Pedido explícito del cliente: al validar el código, la pantalla de
  // ingreso debe desaparecer POR COMPLETO — no alcanza con hacer scroll lejos
  // de ella, tiene que ser físicamente imposible volver a verla (ni scrolleando
  // hacia arriba, ni de ninguna otra forma). Se elimina del DOM, no se oculta.
  heroSection.remove();

  experience.classList.remove("hidden");
  experience.removeAttribute("aria-hidden");
  experience.inert = false;

  // Todas las secciones (y sus ScrollTrigger/pines) se crearon mientras
  // `experience` tenía display:none — o sea con altura 0. Lenis y ScrollTrigger
  // cachean esas dimensiones en el momento de crear cada trigger, así que hay
  // que forzar un recálculo de ambos después de revelarla; si no, el pin del
  // photobook mide una sección de 0px y el scroll normal la salta de largo.
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    lenis.resize();
    // El gradiente de fondo lee offsetTop/offsetHeight real de cada
    // sección — solo válido una vez que `experience` dejó de tener
    // display:none (mismo motivo que ScrollTrigger.refresh() arriba).
    backgroundFlow.refresh();
  });
}

window.addEventListener(GUEST_VALIDATED_EVENT, unlockExperience);

// Importante (decisión explícita del cliente): NO restaurar sesión entre
// recargas. Cada carga de página exige volver a ingresar el código, sin
// excepción — quien no tiene el código no puede acceder de ninguna forma,
// ni siquiera reabriendo/recargando en el mismo dispositivo/pestaña.
