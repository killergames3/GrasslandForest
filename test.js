// SI ESTE SYSTEMA FUERA PARA ALGUNA TIENDA DEL JUEGO Y NECESITE VENDER OBJETOS CON LIMITACION
// SEGUN LA CANTIDAD DE OBJETOS A COMPRAR SE DEFINE LA COMISION IVA , Y SE ESTABLECE EL LIMITE DIARIO A COMPRAR POR OBJETO
// PORQUE ESE LIMITE SE APROVECHA PARA HACER QUEMA Y NO EXPROPIAR EL USO .


// ===============================
// SISTEMA DE OBJETOS CON UMBRALES
// ===============================

const objetos = {
  zanahoria: {
    limite: 100,
    tomados: 70,
    aDar: 5,
    nivel: 1,

    // 👇 umbrales de nivel (valorTotal requerido)
    umbrales: {
      1: 0,
      2: 150,
      3: 300,
      4: 500,
      5: 800,
      6: 1200,
      7: 1700,
      8: 2300,
      9: 3000,
      10: 3800
    }
  },

  tomate: {
    limite: 50,
    tomados: 45,
    aDar: 8,
    nivel: 2,

    umbrales: {
      1: 0,
      2: 200,
      3: 450,
      4: 800,
      5: 1300,
      6: 1900,
      7: 2600,
      8: 3400,
      9: 4300,
      10: 5300
    }
  },

  telefono: {
    limite: 10,
    tomados: 9,
    aDar: 1,
    nivel: 5,

    umbrales: {
      1: 0,
      2: 300,
      3: 700,
      4: 1200,
      5: 2000,
      6: 3000,
      7: 4200,
      8: 5600,
      9: 7200,
      10: 9000
    }
  }
};

// ===============================
// PROCESAMIENTO
// ===============================
console.log("📊 SISTEMA DE NIVELES POR UMBRAL\n");

Object.entries(objetos).forEach(([nombre, data]) => {
  const { limite, tomados, aDar, umbrales } = data;
  let { nivel } = data;

  // 1️⃣ Escasez (1–100)
  let escasez = (tomados / limite) * 100;
  escasez = Math.min(Math.max(escasez, 1), 100);

  // 2️⃣ Valor base (escasez × nivel)
  const valorBase = escasez * nivel;

  // 3️⃣ % a dar
  const porcentajeADar = (aDar / limite) * 100;

  // 4️⃣ Valor total
  const valorTotal = valorBase * porcentajeADar;

  // 5️⃣ Determinar nivel correcto según umbrales
  let nuevoNivel = nivel;

  Object.keys(umbrales)
    .map(Number)
    .sort((a, b) => a - b)
    .forEach(nivelUmbral => {
      if (valorTotal >= umbrales[nivelUmbral]) {
        nuevoNivel = nivelUmbral;
      }
    });

  // ===============================
  // LOGS
  // ===============================
  console.log(`🔹 Objeto: ${nombre}`);
  console.log(`   Límite: ${limite}`);
  console.log(`   Tomados: ${tomados}`);
  console.log(`   Escasez: ${escasez.toFixed(2)}%`);
  console.log(`   Nivel anterior: ${nivel}`);
  console.log(`   Valor base: ${valorBase.toFixed(2)}`);
  console.log(`   Objetos a dar: ${aDar}`);
  console.log(`   % a dar: ${porcentajeADar.toFixed(2)}%`);
  console.log(`   🔥 Valor total: ${valorTotal.toFixed(2)}`);
  console.log(`   ⭐ Nivel final asignado: ${nuevoNivel}`);
  console.log("");
});
