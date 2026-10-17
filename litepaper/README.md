# Litepapers de Grassland Forest

Abre `litepaper_español.html` o `litepaper_ingles.html` con un navegador. Los documentos funcionan directamente desde el disco, sin instalar dependencias ni iniciar el servidor del juego.

Mantén juntos los dos HTML, `litepaper.css`, `litepaper.js` y la carpeta `assets`. Sus imágenes, iconos y fuente están incluidos localmente. Cada documento incluye búsqueda de capítulos, índice adaptable a móvil, ampliación de imágenes y un botón para imprimir o guardar como PDF. El selector ES/EN abre el documento equivalente.

La carpeta `litepaper` está en la raíz de `miweb_Developer`, junto a `index.html` y `bin`. La página principal enlaza las dos ediciones y utiliza capturas actuales del proyecto en su carrusel.

## Contenido y fuentes

Las guías cubren dispositivos y acceso, interfaz, mapas, compras, cultivos, tala y minería, pesca, Lands, habilidades y puntos, mascotas, combate contra monstruos y animales salvajes, arena PvP, chat y traducción, salud, economía y proyección Web3 en LitVM. Incluyen el roadmap publicado en GitBook. Las capturas actualizadas proceden del juego del proyecto, ejecutado con una cuenta ficticia en un entorno de prueba aislado. La portada es una ilustración del universo.

Las fuentes y los enlaces oficiales de LitVM aparecen en el último capítulo de ambos documentos. La edición está fechada el 16 de octubre de 2026.

- Español: https://artsgames.gitbook.io/grassland-forest
- Inglés: https://artsgames.gitbook.io/grassland-forest-english
- LitVM: https://www.litvm.com/
- Documentación oficial: https://docs.litvm.com/

## Edición y comprobaciones

El contenido bilingüe se mantiene en `tools/build.cjs`. Para regenerar los dos HTML, ejecuta desde `miweb_Developer`:

```text
node litepaper/tools/build.cjs
```

`tools/verify.cjs` comprueba la apertura local, las imágenes enlazadas, los enlaces locales, la correspondencia de capítulos con el índice, la búsqueda, la ampliación, el cambio de idioma, la impresión y los tamaños de pantalla. También revisa que el texto no conserve nombres retirados y que las capturas renovadas no se describan como imágenes de una versión anterior. Guarda los resultados y las vistas previas en `research`. Utiliza el Playwright y el navegador Edge instalados en este equipo.

```text
node litepaper/tools/verify.cjs
```

`tools/refresh-captures.cjs` toma las capturas actuales solicitadas. `capture-current.cjs` y `capture-guide.cjs` conservan los flujos auxiliares de captura. Estas herramientas leen el juego desde `bin`, utilizan su entorno de prueba local y guardan las imágenes en `litepaper/assets`.

`research` conserva las lecturas y las comprobaciones. `tools` contiene las herramientas de generación y de captura; estas carpetas no son necesarias para abrir ni publicar los litepapers. Las licencias de los recursos que las incluyen están junto a ellos en `assets`.
