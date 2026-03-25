# MaxClubGym

Landing PWA para gimnasio construida con Next.js, TypeScript y Tailwind CSS, exportada como sitio estatico para GitHub Pages.

## URL publica

Ingresa aqui:

https://braianruaimi.github.io/MaxClubGym/

## Resumen

El proyecto presenta una experiencia visual brutalista/cyberpunk orientada a captacion comercial para un gimnasio. Incluye:

- Hero de alto impacto con CTA directos a WhatsApp.
- Planes Basic, Pro y Elite.
- Servicios del gimnasio y bloque de estado de flujo.
- La card de Fuerza explosiva usa una foto real cargada en `public/descarga.jpg`.
- Botones flotantes para WhatsApp, MaxBot, acceso V.I.P. y panel CEO.
- PWA instalable con soporte offline en produccion.
- Export estatico compatible con GitHub Pages.

## Stack

- Next.js 15.2.5
- React 19
- TypeScript 5.8
- Tailwind CSS 3.4
- Framer Motion 12
- @ducanh2912/next-pwa 10

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Instalacion local

1. Instala dependencias:

```bash
npm install
```

2. Inicia el entorno de desarrollo:

```bash
npm run dev
```

3. Abre la aplicacion en:

```text
http://localhost:3000
```

## Build de produccion

El proyecto usa export estatico, por lo que el build genera la carpeta `out/`.

```bash
npm run build
```

Puntos importantes de la configuracion:

- `output: "export"` en `next.config.mjs`
- `trailingSlash: true` para rutas estaticas
- `images.unoptimized: true` para compatibilidad con Pages
- `basePath` y `assetPrefix` configurados para el repo `MaxClubGym`

## Despliegue en GitHub Pages

El despliegue automatico se realiza desde `.github/workflows/deploy.yml`.

Flujo:

1. Se ejecuta en cada push a `main`.
2. Instala dependencias con `npm install`.
3. Genera el build con `npm run build`.
4. Crea `out/.nojekyll`.
5. Publica `out/` en la rama `gh-pages`.

URL esperada del sitio:

```text
https://braianruaimi.github.io/MaxClubGym/
```

Si GitHub Pages muestra 404:

- Verifica que Pages este configurado para publicar desde `gh-pages`.
- Revisa que la rama `gh-pages` exista y tenga el contenido de `out/`.
- Espera la propagacion de GitHub Pages si el deploy acaba de terminar.

## PWA

La PWA solo se habilita en produccion.

Detalles relevantes:

- `@ducanh2912/next-pwa` genera el service worker en `public/`.
- El registro del service worker se hace manualmente en `components/PWARegistration.tsx`.
- El manifest esta en `public/manifest.json`.
- El prompt de instalacion vive en `components/InstallPrompt.tsx`.

## Arquitectura principal

### App Router

- `app/layout.tsx`: metadata, viewport, fuentes, PWA, botones flotantes e install prompt.
- `app/page.tsx`: composicion principal de la landing.
- `app/globals.css`: tokens, utilidades y estilo global brutalista.

### Componentes visuales

- `components/Hero.tsx`: hero principal con CTA de conversion.
- `components/ServicesGrid.tsx`: servicios del gimnasio.
- `components/PlansRail.tsx`: planes comerciales.
- `components/FlowState.tsx`: bloque de estado de flujo/cupos.

### Componentes de accion

- `components/FloatingGymActions.tsx`: capa flotante con botones WhatsApp, MaxBot, V.I.P. y CEO.
- `components/InstallPrompt.tsx`: CTA de instalacion PWA.
- `components/PWARegistration.tsx`: registro manual del service worker.

### Paneles especiales

- `components/VipTrainingPanel.tsx`
  - Acceso por contraseña `1234`
  - Guia por grupos musculares grandes a pequeños
  - Cada ejercicio muestra 4 imagenes/pasos de ejecucion

- `components/CeoMetricsPanel.tsx`
  - Acceso por contraseña `123`
  - Metricas guardadas en `localStorage`
  - Vistas, aperturas, redirecciones, planes y respuestas del bot

## Estructura del proyecto

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  CeoMetricsPanel.tsx
  FloatingGymActions.tsx
  FlowState.tsx
  Hero.tsx
  InstallPrompt.tsx
  PlansRail.tsx
  PWARegistration.tsx
  ServicesGrid.tsx
  VipTrainingPanel.tsx
public/
  manifest.json
  sw.js
  workbox-*.js
.github/
  workflows/
    deploy.yml
```

## Personalizacion rapida

### WhatsApp real

Debes reemplazar el placeholder actual en `components/FloatingGymActions.tsx`:

```ts
const WHATSAPP_NUMBER = "TUNUMERO";
```

Usa el formato internacional sin `+`, espacios ni guiones.

Ejemplo:

```ts
const WHATSAPP_NUMBER = "5491123456789";
```

### Repo o subpath de Pages

Si cambia el nombre del repositorio, actualiza esta constante en `next.config.mjs` y `app/layout.tsx`:

```ts
const repoName = "MaxClubGym";
```

### Textos comerciales

Los textos visibles del sitio estan distribuidos principalmente en:

- `components/Hero.tsx`
- `components/ServicesGrid.tsx`
- `components/PlansRail.tsx`
- `components/FlowState.tsx`
- `app/page.tsx`

### Planes y precios

Los planes se editan en `components/PlansRail.tsx`.

### Rutinas VIP

Las guias, ejercicios y pasos del panel premium se editan en `components/VipTrainingPanel.tsx`.

## Metricas locales

El panel CEO usa almacenamiento local del navegador. No hay backend ni base de datos.

Esto significa:

- Las metricas cambian segun el navegador/dispositivo.
- No se comparten entre usuarios.
- Sirven como tablero local demostrativo o prototipo comercial.

## Consideraciones de seguridad

Las contraseñas del panel V.I.P. y del panel CEO estan implementadas del lado cliente. No deben considerarse seguridad real.

Si se necesita seguridad real, hace falta:

- autenticacion en servidor
- roles/permisos
- almacenamiento seguro de credenciales y eventos

## Convenciones del proyecto

- Interfaz principal en español.
- Estetica brutalista con alto contraste y tipografia expresiva.
- Cambios visuales fuertes pero compatibles con export estatico.
- Sin dependencia de backend para la experiencia base.

## Estado actual

El proyecto ya incluye:

- landing brutalista publicada para GitHub Pages
- PWA instalable
- acciones flotantes comerciales
- panel V.I.P. con guias visuales por ejercicio
- panel CEO con metricas locales

## Recomendaciones siguientes

1. Reemplazar `TUNUMERO` por el WhatsApp real del gimnasio.
2. Agregar imagenes reales o ilustraciones propias si se quiere un nivel visual mas premium en la seccion VIP.
3. Conectar el panel CEO a un backend si se necesitan metricas reales.
4. Añadir SEO visual compartible con una imagen OG dedicada.