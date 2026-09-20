# Grassland Forest

Rediseño y correcciones locales de septiembre de 2026. No se ha desplegado ni publicado el proyecto.

## Ver la web

Desde esta carpeta, con Node.js:

```powershell
node tools/preview-server.cjs
```

Abre http://127.0.0.1:4173. Es una vista previa local: no inicia MongoDB, no carga claves, no firma transacciones y no envía mensajes. Todos los botones de demo abren `https://app.grasslandforest.com/`, como se solicitó; el destino externo pertenece al juego existente. La vista previa no publica archivos privados ni hace listados de directorios.

La portada está completamente en inglés, usa HTML, CSS y JavaScript local, el logo proporcionado por el usuario y un nuevo paisaje pixel art optimizado para escritorio y móvil. No necesita compilación. Las animaciones CSS se pueden pausar y se suspenden al salir de pantalla; respetan la preferencia de movimiento reducido. Origen del arte y prompt: [docs/ASSETS.md](docs/ASSETS.md). El tráiler y reCAPTCHA se cargan sólo cuando el visitante los solicita. Los términos, el disclaimer y la política de privacidad usan las secciones inglesas exactas de los originales actualizados de `Pictures` (10 de septiembre de 2026), con navegación de retorno y un estilo común.

## Contacto y servicios

El formulario usa `/api/contact/config` y `/api/contact` en el mismo origen. Configuración e integración: [backend_pagina/README.md](backend_pagina/README.md). Sin el servicio disponible conserva el texto y muestra un error con la alternativa de correo.

El backend original del juego se ha editado en `C:/Users/pc/Desktop/server2.js`, según la ubicación indicada. No se ha iniciado ni copiado dentro de la carpeta pública. La API de contacto es un servicio distinto. No se deben sustituir uno por otro.

## Bibliotecas del motor

Las bibliotecas del navegador están en `bin/vendor`, con versiones, integridad SRI y licencias. Para regenerarlas:

```powershell
cd bin
npm ci --ignore-scripts
npm run build:vendor
npm audit
```

Esto reconstruye Socket.IO con el parser corregido y actualiza los hashes en las páginas del juego y del reportador. Conserva Phaser 3.90.0 y el joystick compatible; usa ethers 6.17.0 y Socket.IO 4.8.3 con parser 4.2.7. El bloqueo de dependencias incluye también la corrección de i18next-http-backend, aunque el joystick servido no utiliza traducciones.

## Pruebas

Después de instalar las dependencias de `bin` y `backend_pagina`:

```powershell
node --test bin/tools/engine-lifecycle.test.cjs bin/tools/hub-lifecycle.test.cjs bin/tools/web3-seguridad-prueba.cjs bin/tools/memory-diagnostics.test.cjs backend_pagina/server.test.js tools/server2-security.test.cjs
```

Las pruebas de `server2.js` leen el archivo original y ejecutan sus funciones y manejadores con servicios simulados. Puedes indicar otra ubicación mediante `GF_SERVER_FILE`. No arrancan el servidor real.

`tools/check-site.cjs` usa Playwright y Microsoft Edge para comprobar diseño, navegación, formulario, privacidad de carga y bibliotecas reales. Si Playwright está instalado fuera del proyecto, establece `GF_TEST_NODE_MODULES` a esa carpeta `node_modules`. Guarda capturas e informe en `artifacts`.

Consulta [el informe de revisión](docs/REVISION-SEGURIDAD.md) para ver cambios, evidencia y límites de la verificación.
