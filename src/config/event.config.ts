/**
 * Configuración centralizada del evento — Etapa 2 (placeholder de estructura).
 * Se completa con datos reales en la Etapa 5 (Experiencia principal).
 *
 * No dispersar estos datos en componentes individuales (regla CLAUDE.md §38).
 */

export interface EventLocation {
  date: string;
  time: string;
  location: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
}

export interface DressCodeColor {
  name: string;
  hex: string;
}

export interface EventConfig {
  birthdayPerson: string;
  blessing: EventLocation;
  party: EventLocation;
  spotifyPlaylistUrl: string;
  dressCode: {
    label: string;
    colors: DressCodeColor[];
  };
  cardAmount: number;
  cardMessage: string;
}

export const eventConfig: EventConfig = {
  birthdayPerson: "Abi",

  // --- Datos de prueba (Etapa 5b) — reemplazar por los reales del evento.
  // mapsEmbedUrl usa el formato de embed por texto (maps.google.com/maps?q=
  // ...&output=embed): no requiere API key ni un place_id real (esos hay que
  // generarlos desde Google Maps -> Compartir -> Insertar un mapa, y no se
  // pueden fabricar a mano — un place_id inventado carga el iframe en
  // blanco). El formato por texto sí resuelve cualquier dirección real. ---
  blessing: {
    date: "Sábado 14 de marzo de 2026",
    time: "19:00 hs",
    location: "Parroquia Nuestra Señora del Valle",
    mapsUrl: "https://maps.google.com/?q=Catedral+de+Cordoba+Argentina",
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Catedral+de+Cordoba+Argentina&output=embed",
  },

  party: {
    date: "Sábado 14 de marzo de 2026",
    time: "21:30 hs",
    location: "Salón Jardín de las Estrellas",
    mapsUrl: "https://maps.google.com/?q=Patio+Olmos+Shopping+Cordoba+Argentina",
    mapsEmbedUrl:
      "https://maps.google.com/maps?q=Patio+Olmos+Shopping+Cordoba+Argentina&output=embed",
  },

  // Playlist pública real de Spotify usada solo como placeholder de prueba —
  // reemplazar por el link de la playlist colaborativa real del evento.
  spotifyPlaylistUrl: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",

  // --- Datos de prueba (Etapa 5c) — reemplazar por los reales del evento. ---
  dressCode: {
    label: "Elegant Sport",
    colors: [
      { name: "Violeta intenso", hex: "#5B3A9E" },
      { name: "Verde salvia", hex: "#8FBC7A" },
      { name: "Lila pastel", hex: "#C9A8E8" },
      { name: "Durazno", hex: "#E8A87C" },
      { name: "Chocolate", hex: "#5A3825" },
    ],
  },

  cardAmount: 15000,
  cardMessage:
    "Realmente queremos que estés presente en este día tan especial. Si está dentro de tus posibilidades ayudarnos con el valor de tu tarjeta, el mismo es de $15.000 por persona.",
};
