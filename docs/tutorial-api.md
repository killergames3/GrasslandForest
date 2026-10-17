# API pública de finalización del tutorial

Implementada en `C:\Users\pc\Desktop\server2.js`.

## Abrir desde el navegador

Después de subir **ese archivo actualizado** al servidor que atiende el dominio y
reiniciar el proceso, abre:

- [Resumen público](https://api.grasslandforest.com/api/public/summary)
- [Tutoriales completados](https://api.grasslandforest.com/api/public/tutorial-completions)
- [Segunda página, 100 registros](https://api.grasslandforest.com/api/public/summary?limit=100&page=2)

Las dos primeras rutas devuelven el mismo formato. No necesitan iniciar sesión,
conectar una wallet, cookies, token ni clave API. Son consultas públicas: cualquiera
que conozca la URL puede ver los identificadores y la finalización del tutorial.

Para consultar una wallet, añade `?address=0x...` usando su dirección completa
(40 caracteres hexadecimales después de `0x`). Por ejemplo, sustituye la dirección
de este ejemplo por la del jugador:

```text
https://api.grasslandforest.com/api/public/summary?address=0x1111111111111111111111111111111111111111
```

Si el backend se ejecuta localmente en modo desarrollo con su puerto predeterminado:
[resumen local](http://127.0.0.1:8080/api/public/summary).

## Respuesta de ejemplo

Estos datos son ilustrativos para una finalización el 24/09/2026 a la 01:23:00
de Ecuador continental; no corresponden a un jugador real ni son fechas fijas
del backend. La hora se calcula en cada acción y en cada consulta.

```json
{
  "success": true,
  "serverTime": {
    "timestamp": 1790230985,
    "iso": "2026-09-24T06:23:05.000Z",
    "ecuador": "2026-09-24T01:23:05-05:00",
    "timeZone": "America/Guayaquil"
  },
  "summary": {
    "totalCompleted": 1,
    "lastTutorialCompletedAt": 1790230980,
    "lastTutorialCompletedAtISO": "2026-09-24T06:23:00.000Z",
    "lastTutorialCompletedAtEcuador": "2026-09-24T01:23:00-05:00",
    "records": [
      {
        "playerName": "Jugador1",
        "username": "Jugador1",
        "address": "0x1111111111111111111111111111111111111111",
        "action": "tutorial_completed",
        "timestamp": 1790230980,
        "tutorialCompletedAt": 1790230980,
        "tutorialCompletedAtISO": "2026-09-24T06:23:00.000Z",
        "tutorialCompletedAtEcuador": "2026-09-24T01:23:00-05:00",
        "timeZone": "America/Guayaquil",
        "timeStatus": "recorded"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 50,
    "totalPages": 1,
    "hasMore": false
  }
}
```

- `summary.records` contiene quién completó el tutorial, la acción y cuándo.
- `timestamp` y `tutorialCompletedAt` son el mismo instante en segundos Unix UTC.
- `tutorialCompletedAtISO` muestra ese instante como fecha y hora legibles en UTC
  (`Z`). `tutorialCompletedAtEcuador` muestra el mismo instante con fecha y hora
  de Ecuador continental (`America/Guayaquil`, UTC−5). No se cambia el timestamp
  Unix para convertir la zona horaria.
- `serverTime` muestra la hora del servidor al generar la respuesta. Es
  independiente de cuándo terminó el jugador; consultar la API no modifica la
  hora del evento ni completa las fechas históricas que faltan.
- `timeStatus: "recorded"` indica fecha conocida; `"not_recorded"` indica que no
  se registró. Los campos de fecha permanecen `null` cuando no hay fecha conocida.
- `lastTutorialCompletedAt` es la finalización más reciente con fecha conocida
  dentro del filtro, independientemente de la página solicitada;
  `lastTutorialCompletedAtISO` muestra el mismo instante en UTC y
  `lastTutorialCompletedAtEcuador` en hora de Ecuador continental.
- `totalCompleted` cuenta todos los jugadores completados dentro del filtro.
  Si la wallet aún no ha completado el tutorial o no existe, devuelve cero y `records: []`.
- `limit` admite 1–100 (predeterminado 50); `page`, 1–10000 (predeterminado 1).
  Los registros se ordenan por fecha descendente y nombre; los históricos sin fecha van al final.
- Un jugador completado antes de este cambio aparece con `timestamp: null` y
  `tutorialCompletedAt: null`. No se inventa una fecha a partir de su último guardado.

`lastTradeAt` significa «fecha/hora de la última operación» en el ejemplo del
integrador. Como aquí se registra el tutorial, el campo se llama
`lastTutorialCompletedAt`. El requisito permite cualquier formato y nombre;
lo necesario es que `summary.records` incluya la acción y su fecha/hora real.
Un registro con fecha `null` permite identificar quién terminó, pero no satisface
por sí solo el requisito de conocer cuándo. Guardar de nuevo una cuenta que ya
terminó no recupera esa hora. Para completar datos históricos haría falta una
fuente anterior fiable que registrase ese evento exacto.

## Cómo se registra

El juego ya envía el progreso mediante `POST /api/save/:playerName` al terminar.
El backend reconoce el final actual (`22`) y los finales antiguos (`8`–`19`).
Los pasos `0`–`7`, `20` y `21` siguen en curso.

Al aceptar el primer guardado que pasa de incompleto a completado, el servidor
escribe el estado y su propia fecha juntos en MongoDB. Los siguientes guardados
conservan esa fecha, incluso si llegan desde dos escenas simultáneamente. Las
fechas enviadas por el cliente se descartan. No hace falta cambiar el frontend.

El dato refleja el progreso enviado por el cliente autenticado y guardado por el
servidor; no constituye una verificación on-chain independiente de cada paso.
Cambios manuales del tutorial desde el panel de administración no crean una fecha
de finalización jugada.

## Acceso desde otra web

```js
const response = await fetch('https://api.grasslandforest.com/api/public/summary', {
  credentials: 'omit'
});
if (!response.ok) throw new Error(`HTTP ${response.status}`);
const data = await response.json();
console.log(data.summary.records);
```

Estas dos rutas permiten CORS público (`Access-Control-Allow-Origin: *`) y no
usan credenciales. El resto del backend conserva sus reglas de CORS y
autenticación. La configuración sigue el patrón de
[CORS por petición de Express](https://expressjs.com/en/resources/middleware/cors/#customizing-cors-settings-dynamically-per-request).

## Si aparece un bloqueo o error

- **404 / Cannot GET:** comprueba que se desplegó el `server2.js` actualizado
  en el servicio correcto y se reinició. Editar el archivo del escritorio no
  actualiza automáticamente el servidor publicado.
- **429 / too_many_public_requests:** hay un límite compartido de 60 peticiones
  por minuto por IP para estas dos rutas. Respeta `Retry-After` antes de volver a consultar.
- **426 / https_required:** abre la URL con `https://`. Si ya usas HTTPS,
  revisa la configuración del proxy del despliegue (`TRUSTED_PROXY_IP` /
  `TRUST_PROXY_HOPS`) según su topología; no desactives la exigencia de HTTPS.
- **400 / invalid_query:** usa una dirección completa y límites de paginación válidos.
- **503 / tutorial_summary_unavailable:** consulta los logs del backend y su conexión a MongoDB.
- **403:** estas dos lecturas omiten el detector de escáneres y bloqueos de IP
  interno del juego. Comprueba la versión desplegada; si la respuesta proviene
  de un proxy/WAF externo, revisa sus reglas para estas rutas concretas.
- **Hora diferente entre PC y servidor:** compara `serverTime.ecuador` con un
  reloj sincronizado. Cambiar la zona horaria no corrige un reloj adelantado o
  atrasado. La solución es sincronizar el sistema que tenga el reloj incorrecto;
  no restar minutos fijos ni reemplazar fechas de eventos pasados por la hora actual.

## Comprobación después del despliegue

1. Abre el resumen público, incluso en una ventana de incógnito.
2. Termina el tutorial con una cuenta que aún no lo haya completado.
3. Abre el resumen filtrado por su dirección y comprueba acción y fecha numérica.
4. Guarda otra vez o cambia de escena: la fecha debe permanecer igual.

La sintaxis y las pruebas aisladas no arrancan el backend real ni escriben en
MongoDB de producción. La comprobación final con una cuenta requiere desplegar
el archivo y completar el tutorial en ese entorno.
