# Revisión local — 20 de septiembre de 2026

Se rediseñó la portada y se corrigieron problemas concretos en los componentes indicados abajo. Esta revisión no certifica ausencia de todas las vulnerabilidades, fugas o errores del sistema completo. No se realizaron publicaciones, despliegues, firmas, compras, transferencias ni modificaciones de la base de datos real.

## Sitio web

- `index.html`, `assets/site.css`, `assets/site.js`: diseño pixel art adaptable, completamente en inglés, navegación móvil, galería manual con teclado, FAQ nativa, diálogo de tráiler con cierre por Escape y liberación del iframe, todos los accesos a la demo dirigidos a `https://app.grasslandforest.com/`, comunidad y litepaper.
- Logo proporcionado por el usuario, favicon derivado, paisaje pixel art creado con imagegen y optimizado en WebP con dos resoluciones, capturas reales del juego, fuente pixel local y texto de lectura en fuentes del sistema. Sin frameworks ni fuentes remotas. Imágenes secundarias con carga diferida. Ocho partículas CSS decorativas, control de pausa, suspensión fuera de pantalla y con pestaña oculta; respeta `prefers-reduced-motion`. No hay bucle JavaScript de animación ni timer de carrusel. Archivos, origen y prompt en `docs/ASSETS.md`.
- CSP con JavaScript y CSS externos, sin `unsafe-inline` en la portada. Sin solicitudes a terceros al abrirla. YouTube sólo tras pulsar el tráiler; Google sólo al solicitar verificación si el servicio la exige. Sin acceso a billeteras desde la portada.
- Contacto por mismo origen, límites de entrada, consentimiento de privacidad, timeout, control de doble envío y errores visibles conservando el mensaje. La entrega requiere el servicio de contacto configurado; en la vista previa no se entregan mensajes.
- Los tres documentos legales se sustituyeron por las versiones actuales de `C:/Users/pc/Pictures`, vigentes desde el **10 de septiembre de 2026**. Se conserva íntegramente la sección inglesa de cada original, con estilo y navegación nuevos. Se omite la sección española duplicada para cumplir el idioma solicitado. Las pruebas comparan todas las cláusulas; los hashes de los originales están en `artifacts/legal-sources.json`. No se efectuó una revisión jurídica.
- Las cabeceras que no funcionan como etiquetas meta se aplican como cabeceras HTTP en el servidor local. El alojamiento definitivo debe configurarlas también; los archivos por sí solos no imponen TLS, HSTS ni `frame-ancestors`.

## Motor y memoria

| Componentes | Corrección |
| --- | --- |
| `bin/lib/tileManager.js` | Cancela fetch y listeners del cargador; invalida generaciones antiguas; cierra bitmaps al cambiar LOD o destruir; evita que una respuesta tardía contamine una carga nueva; conserva texturas prestadas; bloquea rutas con traversal codificado. |
| `bin/phaser-canvas-scaler.js` | Destrucción idempotente, cancelación de timers/debounce, liberación de listeners y referencias DOM; resuelve `ready` al destruir antes del arranque. |
| `bin/memory-fix.js` | Respeta los eventos de destrucción de Phaser; no elimina a ciegas listeners ni contextos de otros canvas; destruye recursos compartidos una vez y permite completar la destrucción diferida. |
| `bin/phaser-rpg-perf.js` | El gestor de eventos distingue contextos, evita duplicados y desacopla la escena anterior. Libera subsistemas al cerrar la escena, cancela debounce y elimina listeners/timers al destruir el juego. |
| `bin/lib/tileMonitor.js` | Retira sólo sus listeners y cancela feedback pendiente al terminar la escena. |
| `bin/phaser-memory-cleaner.js` | Elimina `new Function`; corrige estimaciones que siempre daban cero; limita recursión; evita getters; la limpieza destructiva requiere destinos explícitos. |
| `bin/phaser-memory-reporter.js` | El registro de timeouts deja de retener los ya finalizados, incluso si su callback falla. Es una herramienta de diagnóstico, no cargada por defecto. |

## Web3 y transacciones

- `tx-gate.js`: elimina oyentes de esperas vencidas y sus temporizadores.
- `TransactionHub.js`: valida URL HTTPS y hash del explorador, acota configuración, limpia timers y evita que un aviso viejo oculte uno nuevo.
- `BlockchainManager.js`: valida contrato/función y evita la doble reversión de la reserva de nonce tras un error.
- `SystemaTransaccion.js`: serializa operaciones con nonce automático, valida payload y limpia sockets al destruir.
- `gf-wallet-sdk/gf-wallet.js`: valida origen **y ventana emisora** de OAuth, maneja nombres de eventos como datos, valida cuenta/red y endpoints, cierra IndexedDB en errores/abortos y limpia buffers/timers del bloqueo.
- `phaser-relay-library.js`: timeout cubre el cuerpo de respuesta; cancela peticiones y libera provider/cache; impide reiniciar el refresco después de destruir.
- `hub.js`: agrega CSRF a escrituras y borrados, codifica IDs y limita historial local. Cancela refrescos anteriores y peticiones al cambiar de cuenta o destruir; las respuestas antiguas no pisan datos nuevos. Retry maneja fallos síncronos/asíncronos y bloquea duplicados incluso tras redibujar. Conserva el registro si falla el callback; si el reintento ya se solicitó pero falla DELETE, conserva un estado deshabilitado para no repetir la transacción. Limpia arrastre, portapapeles, timers y listeners. El callback existente del juego es un stub: una futura implementación real debe devolver su promesa para reflejar su resultado.
- `bin/index.html`: bibliotecas locales con SRI, JavaScript de mismo origen y fallbacks de imágenes fuera de manejadores inline. El juego conserva estilos inline y conexiones configurables por compatibilidad; su CSP no equivale a la más restrictiva de la portada.

## Dependencias

`npm audit` de los lockfiles finales de **bin** y **backend_pagina**: **0 vulnerabilidades reportadas** al verificar esta revisión. Se limita al catálogo de advisories y esos grafos de paquetes.

Socket.IO se reconstruye desde el código instalado: cambiar sólo la URL del CDN no garantiza un bundle con parser parcheado. Se fija `socket.io-parser@4.2.7`, que corrige el agotamiento de memoria descrito por el mantenedor en [GHSA-2m8v-j782-fhvr](https://github.com/socketio/socket.io/security/advisories/GHSA-2m8v-j782-fhvr).

Se fija `i18next-http-backend@3.0.5` para la dependencia transitiva del paquete rex, siguiendo [GHSA-q89c-q3h5-w34g](https://github.com/i18next/i18next-http-backend/security/advisories/GHSA-q89c-q3h5-w34g). No forma parte del bundle del joystick servido. `bin/vendor/manifest.json` registra las versiones en los bundles; `LICENSES.txt` conserva licencias.

## API de contacto

`backend_pagina/server.js`: eliminado el bypass `canvas-captcha-verified` y el listado público de contactos; validación de tipos/longitudes; máximo JSON de 16 KiB; límites de solicitudes con mapa acotado; IP basada en proxies explícitos; CAPTCHA verificado en servidor con hostname y timeout; errores saneados; pool/operaciones MongoDB acotados; cierre ordenado.

Los nuevos mensajes van a `contact_submissions` como documentos individuales. No se borraron los registros antiguos de `contacts`. Se eliminó `mysql2`, que no se importaba en este servicio. Configuración en `backend_pagina/README.md`.

## Backend original del juego

Archivo editado: `C:/Users/pc/Desktop/server2.js`. Copia previa: `%TEMP%/grassland-server2-before-20260919.js`.

- Orígenes exactos/loopback parseados; rechaza dominios que sólo contengan `localhost`; también se aplica al handshake WebSocket.
- Paquetes Socket.IO limitados a 128 KiB. Hay que comprobar cargas legítimas grandes con clientes reales antes de desplegar.
- IP según confianza de proxy de Express, sin aceptar a ciegas cabeceras de IP.
- HTTPS en producción según `req.secure` y los proxies confiables, sin bypass por una cabecera suelta ni redirección construida desde `Host`. Las rutas de autenticación usan `Cache-Control: no-store`.
- Elimina el bypass CSRF de desarrollo. Escrituras administrativas con cookie también pasan por CSRF y sólo aceptan tokens `access`.
- Cookies locales sin dominio forzado a `127.0.0.1`; evita romper acceso por `localhost`.
- Elimina registros de cookies y material de autenticación de los logs corregidos.
- `/api/transactions`: obtiene propietario desde `PlayerAuth`, impide leer/borrar registros ajenos, valida/selecciona campos, limita lectura a los 200 más recientes y oculta excepciones. Es historial informativo: un estado del cliente no prueba una transacción blockchain.
- Paginación relay: 1–100 resultados por página y máximo 10.000 páginas.
- SIGINT/SIGTERM usan el cierre con sockets y plazo máximo existente.

El archivo se proporcionó suelto: no se encontró junto a él `package.json`, lockfile o `keystore.js` para reproducir el arranque. No se arrancó con claves ni se conectó a la base de datos. Sus dependencias en el servidor real, contratos, autorizaciones de todas las rutas económicas y la infraestructura necesitan una revisión completa en su entorno.

## Evidencia y límites

- **63 pruebas focalizadas** de Node pasan: motor, diagnóstico de memoria, Web3, contacto y manejadores del backend original.
- Regresiones existentes: tiles 14/14; escapado 42/42; sockets de escenas 78/78; inventario 16/16; audio 27/27.
- Edge/Chromium: sin desbordamiento horizontal en 320, 390, 768, 1024 y 1440 px; navegación y FAQ sin JavaScript; movimiento reducido, pausa/reanudación y suspensión fuera de pantalla; carga móvil con imagen de 960 px; galería y diálogo por teclado; éxito/error del formulario con API simulada; sin solicitudes de terceros al cargar.
- Bundles reales de Phaser, ethers, Socket.IO y rex cargados; una escena Phaser con joystick arrancó y se destruyó en navegador. El juego completo no se validó con un jugador autenticado ni se hizo un perfil prolongado de memoria/GPU multijugador.
- No se usan carteras reales, transferencias ni contratos desplegados en las pruebas. El login compilado de `Grassland_Forest_Game`, las páginas históricas y todos los módulos de gameplay no equivalen a una auditoría completa por pasar estas pruebas.
- Los textos legales contienen compromisos de privacidad existentes; la retención y configuración efectiva de producción deben corresponder a esos textos. Esta tarea no cambia su alcance.

Capturas e informe: `artifacts/desktop-hero.png`, `artifacts/mobile-hero.png`, `artifacts/landing-desktop.png`, `artifacts/landing-mobile.png`, `artifacts/legal-desktop.png`, `artifacts/legal-mobile.png`, `artifacts/site-verification.json`.

Pruebas nuevas: 12 de motor, 13 de ciclo de vida del hub, 14 Web3, 4 de diagnóstico, 11 del contacto y 9 del backend original. Las 63 pasan. `npm audit` se volvió a ejecutar el 20 de septiembre: cero vulnerabilidades reportadas en ambos proyectos.
