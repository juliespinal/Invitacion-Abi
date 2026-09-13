# PROYECTO — INVITACIÓN WEB PREMIUM PARA 15 AÑOS

Quiero desarrollar una web de invitación para una fiesta de 15 años.

La homenajeada se llama **Abi** y la temática visual será **Enredados (Tangled) de Disney**.

La prioridad absoluta del proyecto es crear una experiencia:

- Mobile-first.
- Premium.
- Emotiva.
- Inmersiva.
- Fluida.
- Visualmente memorable.
- Nada genérica.
- Con sensación de continuidad/infinidad mientras se hace scroll.
- Con animaciones coherentes tanto al hacer scroll hacia abajo como hacia arriba.
- Optimizada principalmente para dispositivos móviles.

El 99,99% de los accesos serán desde mobile, pero la web igualmente debe adaptarse correctamente a desktop.

---

# 1. REGLA FUNDAMENTAL: ANTES DE PROGRAMAR

NO empieces a desarrollar directamente.

Primero tenés que:

1. Analizar el proyecto completo.
2. Instalar/utilizar la skill **UI UX Pro Max**.
3. Investigar dentro de esa skill cuáles son los mejores patrones, componentes, interacciones, layouts, animaciones y prácticas para este tipo de experiencia.
4. Analizar qué stack conviene utilizar.
5. Definir arquitectura.
6. Definir estructura de carpetas.
7. Definir estrategia de animaciones.
8. Definir estrategia responsive.
9. Definir cómo manejar los códigos personalizados.
10. Definir cómo comunicarse con Google Sheets.
11. Definir cómo manejar el formulario.
12. Definir qué puede hacerse con GitHub Pages y qué requeriría VPS.
13. Detectar riesgos técnicos.
14. Detectar cualquier información que todavía falte.
15. Presentarme un PLAN POR ETAPAS.

No hagas modificaciones importantes en el código antes de que yo apruebe el plan.

---

# 2. CONSULTAS ANTES DE TOMAR DECISIONES

Antes de implementar cualquier cosa que pueda afectar arquitectura, UX, diseño o comportamiento, preguntame.

No asumas decisiones importantes.

Por ejemplo, consultame si existe más de una alternativa razonable para:

- framework.
- librería de animaciones.
- estructura de navegación.
- comportamiento de determinadas secciones.
- estrategia para imágenes.
- estrategia para Google Maps.
- integración con Spotify.
- comunicación con Google Sheets.
- deploy.
- estructura de los datos personalizados.
- comportamiento de las cards.
- comportamiento de mobile vs desktop.
- efectos visuales.

Quiero que primero plantees las opciones y me recomiendes una.

No quiero que tomes decisiones arbitrarias solamente para avanzar.

Si una decisión es trivial y no afecta arquitectura o UX, podés resolverla vos.

---

# 3. OBJETIVO VISUAL

La web debe inspirarse en la estética de **Enredados / Tangled**, pero NO quiero una copia literal ni una web infantil.

Debe sentirse como:

**cuento + elegancia + fantasía + celebración + premium.**

La referencia conceptual debe incluir:

- paleta inspirada en Rapunzel.
- violetas.
- lavandas.
- dorados cálidos.
- tonos nocturnos.
- luces cálidas.
- sensación de magia.
- naturaleza.
- flores.
- estrellas.
- luces flotantes.
- textura sutil.
- profundidad.

Evitar:

- diseños infantiles.
- exceso de elementos.
- colores saturados sin control.
- estética de plantilla.
- cards genéricas de Bootstrap.
- botones estándar sin personalidad.
- layouts típicos de landing pages.
- componentes que parezcan hechos por defecto por una IA.

Quiero un diseño propio.

La temática debe sentirse incluso aunque el usuario nunca lea "Enredados".

---

# 4. EXPERIENCIA "INFINITA"

La web debe sentirse como una historia continua.

No quiero que parezca:

SECCIÓN 1
↓
SECCIÓN 2
↓
SECCIÓN 3
↓
SECCIÓN 4

Quiero que las transiciones sean orgánicas.

El scroll debe sentirse como avanzar dentro de una experiencia.

Utilizá cuando tenga sentido:

- parallax.
- elementos flotantes.
- partículas.
- gradientes dinámicos.
- máscaras.
- SVG.
- ilustraciones.
- efectos de blur.
- movimiento lento.
- elementos que aparezcan/desaparezcan suavemente.
- transformaciones relacionadas con el scroll.
- capas de profundidad.
- transiciones entre escenas.
- efectos de entrada y salida.

Las animaciones deben funcionar tanto:

- scroll-down
- scroll-up

No quiero animaciones que solamente funcionen cuando el usuario baja.

El usuario debe poder volver hacia arriba y la experiencia debe reconstruirse correctamente.

Las animaciones deben ser fluidas y respetar rendimiento.

No abusar del movimiento.

La sensación debe ser:

**cinematográfica, elegante y mágica.**

---

# 5. MOBILE FIRST

Diseñá primero para mobile.

La experiencia principal debe optimizarse para:

- pantallas de aproximadamente 360px a 430px.
- touch.
- navegación con una mano.
- botones fáciles de tocar.
- textos perfectamente legibles.
- animaciones suaves.
- poco consumo de memoria.
- buena performance.

Luego adaptar a:

- tablet.
- desktop.
- monitores grandes.

No diseñes primero desktop y después "hagas responsive".

---

# 6. PRIMERA PANTALLA

La entrada debe ser una experiencia independiente.

Background:

- fotografía de Abi.
- leve desenfoque.
- overlay adecuado.
- iluminación que permita leer el contenido.

El contenido debe incluir:

H1:

**Abi**

H2:

**Mis quince**

Debajo:

Card elegante para ingresar código.

Debe contener:

- input del código.
- botón "Ingresar".
- feedback visual de error.
- animación al validar.
- estado loading si fuera necesario.

La card debe ser visualmente premium.

No utilizar un formulario genérico.

---

# 7. SISTEMA DE CÓDIGOS

Los códigos pueden estar hardcodeados.

No es necesario implementar una base de datos para validar el acceso inicial.

Quiero que exista una estructura de datos fácil de mantener.

Preferentemente algo conceptual como:

```js
const invitados = {
  "ABC123": {
    nombre: "Juan Pérez",
    abonaTarjeta: true,
    monto: 15000,
    mensaje: "..."
  },

  "XYZ789": {
    nombre: "María González",
    abonaTarjeta: false,
    monto: 0,
    mensaje: "..."
  }
};
```

La estructura exacta puede cambiar si tenés una mejor alternativa.

Lo importante es que:

- sea fácil agregar códigos.
- sea fácil modificarlos.
- sea fácil agregar propiedades.
- el código introducido determine información personalizada.

Los datos mínimos deberán contemplar:

- Código.
- Nombre.
- Abona tarjeta.
- Monto.
- Mensaje personalizado.

La propiedad `Custom` del Google Sheet existe pero NO debe implementarse todavía.

La usaremos posteriormente.

---

# 8. PERSONALIZACIÓN

Una vez validado el código, la experiencia puede cambiar según el invitado.

Por ejemplo:

- nombre.
- mensaje.
- monto de tarjeta.
- textos.
- determinadas zonas.
- información personalizada.

No quiero duplicar páginas completas.

La experiencia debe utilizar los datos del invitado dinámicamente.

---

# 9. PRESENTACIÓN

Luego del ingreso, comienza la experiencia principal.

Debe existir una presentación de Abi.

Debe transmitir:

- que llegaron sus 15 años.
- emoción.
- celebración.
- crecimiento.
- una sensación de "capítulo importante".

Debe contener un breve texto.

La presentación debe ser visualmente potente y utilizar animación.

---

# 10. BOOK DE FOTOS

Crear una sección tipo book.

Objetivo:

Mostrar el paso del tiempo.

No quiero una galería genérica de thumbnails.

Preferentemente evaluar alternativas como:

- timeline.
- editorial photo book.
- secuencia cinematográfica.
- fotografías a pantalla completa.
- transición entre épocas.
- scroll-driven storytelling.

Elegir la alternativa más coherente después de analizarla.

Las imágenes inicialmente pueden ser placeholders provenientes de bancos de imágenes online.

Posteriormente reemplazaré esas imágenes por fotografías reales.

La estructura deberá quedar preparada para utilizar:

```text
/img/
```

por ejemplo:

```text
/img/abi/
    01.jpg
    02.jpg
    03.jpg
```

No acoplar la aplicación a imágenes externas si no es necesario.

---

# 11. EVENTO — BENDICIÓN

Crear una sección específica para la bendición.

Debe contener:

- pequeño texto introductorio.
- fecha.
- hora.
- lugar.
- cómo llegar.

Cada dato debe tener su correspondiente icono.

No utilizar emojis.

Utilizar:

- Font Awesome
- Lucide
- u otra librería moderna de iconos

según lo que recomiende UI UX Pro Max.

---

# 12. EVENTO — FIESTA

Crear una segunda sección específica para la fiesta.

Debe tener:

- texto introductorio.
- fecha.
- hora.
- lugar.
- cómo llegar.

También:

- icono para fecha.
- icono para hora.
- icono para ubicación.
- icono para cómo llegar.

Bendición y fiesta tienen datos diferentes.

No duplicar componentes de forma innecesaria.

Crear componentes reutilizables.

---

# 13. GOOGLE MAPS

"Cómo llegar" debe abrir una card/modal premium.

Al abrirla:

- el contenido de fondo debe desenfocarse.
- debe aparecer una animación suave.
- debe existir una transición de entrada.
- debe poder cerrarse fácilmente.
- debe funcionar correctamente en mobile.

Dentro:

Google Maps embed.

Debajo:

botón:

**Abrir en Maps**

con un icono moderno.

Quiero que el usuario tenga una sensación de "overlay" sobre la experiencia principal.

Al cerrar la card:

- quitar blur.
- recuperar scroll.
- restaurar correctamente la experiencia.

---

# 14. PLAYLIST DE SPOTIFY

Crear una sección donde se invite a los invitados a participar de una playlist colaborativa.

Debe tener:

- pequeño texto.
- explicación breve.
- CTA.
- botón que dirija a Spotify.

La sección debe mantener la estética general.

No usar un botón genérico.

Utilizar el icono correspondiente de Spotify.

---

# 15. CÓDIGO DE VESTIMENTA

Crear una sección específica.

Debe mostrar:

- etiqueta del dress code.

Ejemplos posibles:

- Formal.
- Elegant Sport.
- Casual.
- etc.

La información debe ser fácilmente configurable.

Además mostrar la paleta de colores.

No quiero simplemente una lista de hexadecimales.

Utilizar:

- círculos.
- pequeñas cards.
- swatches.
- o un diseño más creativo.

Los colores deben tener nombres si resulta útil.

La representación tiene que ser estética y útil.

---

# 16. CONFIRMACIÓN DE ASISTENCIA

Esta es una de las partes más importantes de toda la web.

Debe sentirse muy cuidada.

Debe contener:

- etiqueta.
- título.
- descripción.
- formulario.

---

## 16.1 ASISTENCIA

Radio buttons:

**Asistiré**

**No puedo asistir**

Si selecciona:

**No puedo asistir**

ocultar:

- información de tarjeta.
- acompañantes.
- alimentación.
- comentarios si considerás que ya no son necesarios.

Y mostrar únicamente:

- nombre y apellido.
- botón "Enviar confirmación".

La transición debe ser animada.

---

# 17. DATOS PERSONALES

Campo:

**Nombre y apellido**

Debe ser obligatorio.

---

# 18. TARJETA

Si el código ingresado corresponde a una persona que debe abonar tarjeta:

mostrar un bloque visual elegante.

No debe resultar agresivo.

El mensaje deberá ser sugerente.

Por ejemplo, conceptualmente:

> Realmente queremos que estés presente en este día tan especial.
> Si está dentro de tus posibilidades ayudarnos con el valor de tu tarjeta, el mismo es de $15.000 por persona.

El texto final debe poder modificarse fácilmente.

Luego mostrar:

**Puedo abonarlo**

**Quiero conversarlo**

Usar radio buttons o un componente equivalente visualmente mejor.

La información deberá depender del código ingresado.

Si el código indica que NO abona tarjeta:

no mostrar este bloque.

---

# 19. ACOMPAÑANTES

Radio buttons:

**Voy solo**

**Voy acompañado**

Si selecciona:

**Voy acompañado**

mostrar un campo:

**Nombres de los acompañantes**

Si selecciona:

**Voy solo**

ese campo desaparece.

Si el usuario va solo:

en Google Sheets debe registrarse:

```text
vacío
```

No enviar textos como:

- "Ninguno"
- "Solo"
- "-"
- etc.

---

# 20. ALIMENTACIÓN

Crear select:

- Ninguna.
- Vegetariano.
- Vegano.
- Celíaco.
- Diabético.
- Otro.

Si selecciona:

**Otro**

mostrar:

**Ingresá detalles sobre tu alimentación que debamos saber**

o una frase equivalente mejor redactada.

La aparición debe ser animada.

---

# 21. COMENTARIOS

Campo:

**Comentarios**

Para que el invitado pueda dejar un mensaje para Abi.

Debe sentirse integrado a la experiencia, no como un formulario administrativo.

---

# 22. ENVÍO

Botón:

**Enviar confirmación**

Debe tener:

- estado normal.
- estado loading.
- estado éxito.
- estado error.

Después de enviar:

### HTTP 200

Mostrar una experiencia personalizada de éxito.

No simplemente:

"Formulario enviado correctamente."

Quiero algo más emocional y acorde a la invitación.

### Error

Mostrar un mensaje amigable explicando que hubo un problema.

No mostrar errores técnicos al usuario.

En consola sí se puede registrar información técnica para debugging.

---

# 23. GOOGLE SHEETS

Backend:

**Google Apps Script**

Base de datos:

**Google Sheets**

No quiero introducir Firebase, Supabase, PostgreSQL ni otro backend salvo que detectes una limitación real que impida cumplir los requisitos.

Primero evaluá si Google Apps Script es suficiente.

---

# 24. ESTRUCTURA DEL SHEET — INVITADOS

Hoja:

**Invitados**

Columnas:

| Columna | Campo |
|---|---|
| A | Nombre y apellido |
| B | Abona tarjeta |
| C | Monto |
| D | Código |
| E | Custom |

Valores esperados:

### B — Abona tarjeta

```text
Si
No
```

### E — Custom

Existe para una implementación futura.

NO utilizar todavía.

---

# 25. ESTRUCTURA DEL SHEET — CONFIRMADOS

Hoja:

**Confirmados**

Columnas:

| Columna | Campo |
|---|---|
| A | Nombre y Apellido |
| B | Asiste |
| C | Abona tarjeta |
| D | Puede abonar |
| E | Monto |
| F | Acompañantes |
| G | Alimentación |
| H | Comentarios |
| I | ID |
| J | Auxiliar |

Valores:

### B — Asiste

Si selecciona "Asistiré":

```text
Asiste
```

Si selecciona "No puedo asistir":

```text
No asiste
```

### C — Abona tarjeta

Obtenerlo a partir del código ingresado.

Valores:

```text
Si
No
```

### D — Puede abonar

Si selecciona:

"Puedo abonarlo"

guardar:

```text
Si
```

Si selecciona:

"Quiero conversarlo"

guardar:

```text
Contactar
```

### E — Monto

Obtenerlo a partir del código.

### F — Acompañantes

Registrar los nombres ingresados.

Si va solo:

```text
vacío
```

### G — Alimentación

Guardar la selección.

### H — Comentarios

Guardar lo escrito.

### I — ID

Debe generarse automáticamente.

La lógica exacta de autoincremento puede vivir en Google Apps Script.

Evaluar cuál es la forma más segura de generar ese ID.

### J — Auxiliar

Por ahora no utilizarlo.

Quedará reservado para una futura implementación.

---

# 26. GOOGLE APPS SCRIPT

Desarrollar el JavaScript necesario para:

1. Recibir POST desde la web.
2. Validar los datos.
3. Identificar el código.
4. Obtener información correspondiente al invitado.
5. Determinar si abona tarjeta.
6. Obtener monto.
7. Registrar la confirmación.
8. Generar ID.
9. Escribir correctamente las columnas.
10. Devolver una respuesta JSON consistente.

La respuesta debería seguir una estructura similar a:

```json
{
  "success": true,
  "message": "Confirmación registrada"
}
```

o:

```json
{
  "success": false,
  "message": "No se pudo registrar la confirmación"
}
```

Podés modificar esta estructura si existe una mejor práctica.

---

# 27. SEGURIDAD

Aunque los códigos puedan estar hardcodeados, revisar:

- validación de datos.
- sanitización.
- inyección.
- abuso del endpoint.
- spam.
- requests repetidos.
- payloads maliciosos.
- exposición innecesaria de información.

No implementar una arquitectura exagerada para un evento privado, pero sí aplicar buenas prácticas.

---

# 28. ICONOS

NO utilizar emojis.

Todos los iconos deben provenir de:

- Font Awesome.
- Lucide.
- Material Symbols.
- o una librería equivalente.

Preferir iconos consistentes entre sí.

No mezclar estilos visuales sin una razón.

---

# 29. MODALES / CARDS

Cuando el usuario abra elementos como:

- Google Maps.
- información adicional.
- posiblemente futuras galerías.

La experiencia debe:

1. oscurecer/desenfocar ligeramente el fondo.
2. bloquear el scroll detrás del modal.
3. animar la entrada.
4. permitir cerrar de forma intuitiva.
5. animar la salida.
6. restaurar correctamente el estado anterior.

El modal debe sentirse parte del diseño, no un componente externo.

---

# 30. IMÁGENES

Inicialmente pueden utilizarse imágenes de bancos de imágenes online como placeholders.

Sin embargo, la arquitectura debe permitir reemplazarlas posteriormente por:

```text
/img/...
```

No quiero que sea necesario modificar componentes enteros para cambiar imágenes.

Centralizar las referencias cuando tenga sentido.

---

# 31. FOOTER

El footer debe contener:

**Desarrollado por Julio Espinal**

Luego:

- icono de GitHub.
- link a GitHub.

Debajo:

**¿Necesitás una web así? Contactame**

"Contactame" tendrá un href que completaré posteriormente.

El footer debe sentirse como parte de la experiencia y no como un bloque administrativo pegado al final.

---

# 32. TECNOLOGÍA

Analizá y recomendá el stack.

Podría utilizarse, por ejemplo:

- HTML/CSS/JS.
- React.
- Next.js.
- Vite.
- Tailwind.
- Framer Motion.
- GSAP.
- Lenis.
- alguna librería de partículas.
- alguna librería de SVG.
- etc.

NO quiero instalar librerías simplemente porque son populares.

Cada dependencia debe tener una razón.

La prioridad es:

1. experiencia.
2. fluidez.
3. mantenibilidad.
4. performance.
5. facilidad de deploy.

---

# 33. DEPLOY

Actualmente estoy considerando:

### Opción A

GitHub Pages.

### Opción B

VPS con Docker.

Analizá qué opción conviene.

La web debería intentar ser compatible con GitHub Pages siempre que eso no genere limitaciones importantes.

Como Google Apps Script será el backend, evaluar si realmente necesitamos VPS.

No agregar infraestructura innecesaria.

---

# 34. PERFORMANCE

La web tendrá fotografías y muchas animaciones.

Por eso controlar:

- tamaño de imágenes.
- lazy loading.
- formatos modernos.
- WebP/AVIF cuando corresponda.
- cantidad de JS.
- cantidad de animaciones simultáneas.
- utilización de GPU.
- memory leaks.
- listeners.
- scroll handlers.
- renderizado innecesario.

Preferir:

- transform.
- opacity.
- composiciones GPU-friendly.

Evitar animar propiedades costosas cuando no sea necesario.

La página debe funcionar correctamente en un celular real de gama media.

---

# 35. ACCESSIBILITY

Aunque el diseño sea premium, no descuidar:

- contraste.
- focus states.
- labels.
- inputs accesibles.
- navegación razonable.
- prefers-reduced-motion.

Si el usuario tiene activado:

```css
prefers-reduced-motion
```

reducir animaciones importantes sin destruir la experiencia.

---

# 36. RESPONSIVE

Definir breakpoints razonables.

No limitarse a:

```text
mobile
tablet
desktop
```

Pensar en la composición visual.

Algunas animaciones pueden cambiar según el dispositivo.

Por ejemplo:

- mobile: experiencia vertical.
- desktop: mayor profundidad/parallax.
- pantallas grandes: contenido con max-width razonable.

No estirar innecesariamente las secciones en monitores enormes.

---

# 37. ESTRUCTURA DEL CÓDIGO

Quiero un código ordenado y mantenible.

Separar:

- componentes.
- estilos.
- datos.
- configuración.
- integración con API.
- animaciones.
- utilidades.

Por ejemplo, conceptualmente:

```text
src/
  components/
  sections/
  animations/
  data/
  services/
  hooks/
  utils/
  styles/
```

La estructura exacta dependerá del stack elegido.

---

# 38. CONFIGURACIÓN

Los datos modificables del evento deberían estar centralizados.

Por ejemplo:

```js
const eventConfig = {
  birthdayPerson: "Abi",

  blessing: {
    date: "...",
    time: "...",
    location: "...",
    mapsUrl: "...",
    mapsEmbedUrl: "..."
  },

  party: {
    date: "...",
    time: "...",
    location: "...",
    mapsUrl: "...",
    mapsEmbedUrl: "..."
  },

  spotify: "...",

  dressCode: {
    label: "...",
    colors: []
  }
};
```

No dispersar estos datos por múltiples componentes.

---

# 39. CÓDIGOS DE INVITADOS

Mantener la configuración en una estructura separada.

Por ejemplo:

```js
const guestCodes = {
  "ABC123": {
    name: "Juan Pérez",
    paysCard: true,
    amount: 15000,
    message: "..."
  }
};
```

El sistema deberá poder evolucionar posteriormente.

---

# 40. EXPERIENCIA GENERAL

Quiero que el usuario tenga la sensación de:

1. entrar a un mundo.
2. descubrir a Abi.
3. recorrer su historia.
4. descubrir el evento.
5. interactuar con la invitación.
6. confirmar asistencia.
7. terminar en el footer.

No quiero una web donde cada sección parezca independiente.

Las transiciones entre secciones son tan importantes como las propias secciones.

---

# 41. DISEÑO

Antes de implementar:

Definí:

- paleta.
- tipografías.
- escala tipográfica.
- espaciado.
- radios.
- sombras.
- blur.
- glass effects si corresponden.
- tratamiento de imágenes.
- estilo de botones.
- estilo de inputs.
- estilo de cards.
- estilo de modales.
- estilo de iconografía.
- sistema de animación.

Todo debe formar parte de un sistema visual coherente.

---

# 42. NO HACER

No quiero:

- Bootstrap genérico.
- cards genéricas.
- botones genéricos.
- emojis.
- interfaces que parezcan dashboards.
- exceso de texto.
- exceso de sombras.
- exceso de glassmorphism.
- animaciones aleatorias.
- parallax exagerado.
- componentes visuales inconexos.
- diseño infantil.
- copiar literalmente una plantilla.
- utilizar una librería simplemente porque "todo el mundo la usa".

---

# 43. PLAN DE DESARROLLO

Antes de escribir código, presentar un plan dividido por etapas.

Como mínimo:

### Etapa 0 — Análisis
- requisitos.
- dudas.
- restricciones.
- decisiones pendientes.

### Etapa 1 — UX/UI
- mood.
- referencias.
- estructura.
- navegación.
- sistema visual.

### Etapa 2 — Arquitectura
- stack.
- estructura.
- dependencias.
- componentes.
- configuración.

### Etapa 3 — Sistema de invitación
- códigos.
- invitados.
- personalización.

### Etapa 4 — Landing / Intro
- pantalla inicial.
- validación.

### Etapa 5 — Experiencia principal
- presentación.
- book.
- eventos.
- Spotify.
- dress code.

### Etapa 6 — Confirmación
- formulario.
- estados.
- validaciones.
- UX.

### Etapa 7 — Google Apps Script
- endpoint.
- validaciones.
- escritura en Sheets.
- ID.

### Etapa 8 — Animaciones
- scroll.
- transiciones.
- modales.
- parallax.
- efectos.

### Etapa 9 — Responsive + Performance
- mobile.
- tablet.
- desktop.
- optimización.

### Etapa 10 — Testing
- casos de uso.
- errores.
- formularios.
- códigos.
- API.
- mobile.
- desktop.

### Etapa 11 — Deploy
- GitHub Pages o VPS.
- configuración.
- variables.
- dominio si corresponde.

---

# 44. PRESENTACIÓN DEL PLAN

Quiero que la primera respuesta sea únicamente el análisis y el plan.

No empieces a desarrollar todavía.

En esa primera respuesta indicame:

- qué entendiste del proyecto.
- cuál sería tu propuesta de stack.
- qué skill utilizaste.
- qué librerías proponés.
- qué arquitectura proponés.
- qué decisiones necesitás que yo confirme.
- qué preguntas tenés.
- cómo dividirías el proyecto por etapas.
- cuáles son los riesgos técnicos.
- qué parte recomiendo hacer primero.

Luego esperá mi aprobación.

Una vez aprobado el plan, avanzar etapa por etapa.

---

# 45. FORMA DE TRABAJO

Quiero trabajar de manera colaborativa.

Para cada etapa:

1. explicar brevemente qué se va a hacer.
2. implementar.
3. validar.
4. mostrar resultados.
5. detectar problemas.
6. continuar con la siguiente etapa.

No avances cinco etapas de golpe sin avisar.

---

# 46. REGLA DE ORO

La web debe parecer hecha por un diseñador/desarrollador especialista en experiencias digitales premium.

No debe parecer:

"una landing hecha por IA".

Siempre priorizar:

**experiencia > estética genérica**

**detalle > cantidad**

**fluidez > efectos innecesarios**

**emoción > información fría**

**mobile > desktop**

**performance > efectos pesados**

Y especialmente:

**originalidad > plantilla.**

Comenzá instalando/verificando la skill **UI UX Pro Max**, analizá el proyecto y presentame el plan completo antes de modificar cualquier archivo.