/* eslint-disable no-unused-vars */
/* eslint eqeqeq: ["error", "smart"] */


class LoadingScenegame extends Phaser.Scene {
    constructor() {
        super({ key: "LoadingScenegame" });
    }

    preload() {
            
        this.elipeticiones = 1; 

        if (this.elipeticiones === 0) {
            
          this.serverclient = 'http://192.168.100.221:3000';
          //this.serverclient = 'https://bgrassland-production.up.railway.app';
          
        } else {
            
          //this.serverclient = 'http://192.168.100.221:3000';
          this.serverclient = 'https://bgrassland-production.up.railway.app';

        }


        document.fonts.ready.then(() => {
            const canvasWidth = this.scale.width;
            const canvasHeight = this.scale.height;
        
            // Porcentaje de ubicación
            const xPercentage = 0.8; // 80% del ancho de la pantalla
            const yPercentage = 0.8; // 50% de la altura de la pantalla
        
            // Calcular la posición en píxeles según el porcentaje
            const xPos = canvasWidth * xPercentage;
            const yPos = canvasHeight * yPercentage;
        
            // Agrega texto con la fuente cargada
            this.add.text(xPos, yPos, 'Cargando...', {
                fontFamily: '"PressStart2P"', // Fuente personalizada
                fontSize: '16px', // Tamaño
                color: '#ffffff', // Color blanco
                resolution: 4, // Asegura calidad en pantallas de alta resolución
            }).setOrigin(0.5).setScale(1.2, 1.5);
        });


            // si no existen los valores o argumentos del jugador se crean en la bd y si ya existen se leen automaticamente.
    
            this.barras = [
                { barra: this.add.rectangle(100, 100, 200, 20, 0xff0000).setVisible(false) }, // Vida
                { barra: this.add.rectangle(100, 130, 200, 20, 0x00ff00).setVisible(false) }, // Agua
                { barra: this.add.rectangle(100, 160, 200, 20, 0x0000ff).setVisible(false) }  // Comida
            ];



        this.currentAccountx = localStorage.getItem("connectedAccount");
        this.currentAccount = this.registry.get("account");
        localStorage.removeItem("connectedAccount");

        if (this.currentAccountx) {
        // Guardar en el registro global de Phaser
        this.registry.set("account", this.currentAccountx);
        console.log("Cuenta configurada en LoadingScene:", this.currentAccountx);
        this.currentAccount = this.currentAccountx;
        } else {

          if (this.currentAccount) {
            console.log("ya estabas iniciado xd")
          } else {
            this.registry.remove("account");
            console.error("No se encontró una cuenta conectada en localStorage.");
          }
        }

            
        
            this.playerName = this.currentAccount;
            this.player = this.physics.add.sprite(100, 100, 'playerTexture');
            this.player.setVisible(false);
            this.vidaPorcentaje = null;
            this.aguaPorcentaje = null;
            this.comidaPorcentaje = null;
            this.speed = null;
            this.casillas = [];       // Inventario
            this.casillasExtra = [];  // Cofre
            this.nivel = null;
            this.nivel_exp = null;
            this.sabiduria = null;
            this.sabiduria_exp = null;
            this.fuerza = null;
            this.fuerza_exp = null;
            this.agricultura = null;
            this.agricultura_exp = null;
            this.misiones = null;
            this.usuarioxx = "----";
            // Inicialización de objetos de texto
            this.textovida = this.add.text(20, 20, 'Vida 100%', {
                fontSize: '16px',
                fill: '#fff'
            }).setVisible(false);  // Hace el texto invisible;
        
            this.textoagua = this.add.text(20, 40, 'Agua 100%', {
                fontSize: '16px',
                fill: '#fff'
            }).setVisible(false);  // Hace el texto invisible;
        
            this.textocomida = this.add.text(20, 60, 'Comida 100%', {
                fontSize: '16px',
                fill: '#fff'
            }).setVisible(false);  // Hace el texto invisible;


          const token = localStorage.getItem("jwt");
          const playerName = localStorage.getItem("playerName") || this.playerName;

          if (token && this.tokenValido(token)) {
            // ✅ Token válido, cargar datos directamente
            this.loadPlayerData(playerName, token);
          } else {
            // ❌ Token inválido o inexistente, obtener uno nuevo
            fetch(`${this.serverclient}/auth`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ playerName })
            })
            .then(res => res.json())
            .then(data => {
              if (data.token) {
                localStorage.setItem("jwt", data.token);
                localStorage.setItem("playerName", playerName);
                this.loadPlayerData(playerName, data.token);
              } else {
                console.error("Error al recibir token:", data);
              }
            })
            .catch(err => console.error("Error de red al obtener token:", err));
          }



        
            this.cofreAbierto = false;
            this.inventarioAbierto = false;
        

    }

    create() {

        this.intervalId = setInterval(() => {
            this.cargango();
        }, 2000);

    }

    cargango(){

      
        this.musica = this.registry.get('musica');
        if (!this.musica) {
          console.error("La música no se encontró en el registry");
        }

        // Suponiendo que has cargado y reproducido una música como 'music'
        this.musica.stop();

        if (this.mundo === 1) {
            this.scene.start("GameScene");
            clearInterval(this.intervalId);
        }


        if (this.mundo === 2) {
            this.scene.start("tiendajuego");
            clearInterval(this.intervalId);
        }

    }

    

async loadPlayerData(playerName, token) {
  playerName = playerName || localStorage.getItem("playerName");
  token = token || localStorage.getItem("jwt");

  if (!playerName) {
    console.error("Falta playerName para cargar datos.");
    return;
  }

  // Si el token no es válido, reautenticar primero
  if (!this.tokenValido(token)) {
    console.warn("Token inválido o expirado. Reautenticando...");
    await this.reautenticarYReintentar();
    return;
  }

  const url = `${this.serverclient}/load/${playerName}`;

  try {
    const resp = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!resp.ok) {
      const err = await resp.json();
      console.error('Error al cargar datos:', err);
      return;
    }

    const data = await resp.json();

    this.casillas = this.casillas || [];
    this.casillasExtra = this.casillasExtra || [];

    // Inventario
    data.inventory.forEach(slot => {
      const casilla = this.casillas.find(c => c.id === slot.id);
      if (casilla) this.actualizarCasilla(casilla, slot.objeto, slot.cantidad);
    });

    // Cofre
    data.chest.forEach(slot => {
      const casilla = this.casillasExtra.find(c => c.id === slot.id);
      if (casilla) this.actualizarCasilla(casilla, slot.objeto, slot.cantidad);
    });

    // Posición y estados
    this.player.x = data.posicionplayerx;
    this.player.y = data.posicionplayery;
    this.vidaPorcentaje = data.vidaPorcentaje;
    this.aguaPorcentaje = data.aguaPorcentaje;
    this.comidaPorcentaje = data.comidaPorcentaje;
    this.speed = data.speed;
    this.mundo = data.mundo;
    this.moneda = data.moneda;
    this.nivel = data.nivel;
    this.nivel_exp = data.nivel_exp;
    this.sabiduria = data.sabiduria;
    this.sabiduria_exp = data.sabiduria_exp;
    this.fuerza = data.fuerza;
    this.fuerza_exp = data.fuerza_exp;
    this.agricultura = data.agricultura;
    this.agricultura_exp = data.agricultura_exp;
    this.misiones = data.misiones;
    this.usuarioxx = data.Username;

    // UI de barras
    this.textovida.setText(`Vida ${this.vidaPorcentaje}%`);
    this.textoagua.setText(`Agua ${this.aguaPorcentaje}%`);
    this.textocomida.setText(`Comida ${this.comidaPorcentaje}%`);

    this.barras[0].barra.width = (this.vidaPorcentaje / 100) * this.barras[0].width;
    this.barras[1].barra.width = (this.aguaPorcentaje / 100) * this.barras[1].width;
    this.barras[2].barra.width = (this.comidaPorcentaje / 100) * this.barras[2].width;

    console.log('✅ Datos cargados exitosamente');
  } catch (e) {
    console.error('❌ Error de red al cargar datos:', e);
  }
}


/**
 * Reintenta autenticación automáticamente si el token ha expirado.
 */
async reautenticarYReintentar() {
  const playerName = localStorage.getItem("playerName");
  if (!playerName) return console.error("No se puede reautenticar: falta playerName");

  try {
    const res = await fetch(`${this.serverclient}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerName })
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("jwt", data.token);
      console.log("🔐 Token renovado. Cargando datos...");
      await this.loadPlayerData(playerName, data.token);
    } else {
      console.error("❌ No se pudo renovar el token:", data);
    }
  } catch (err) {
    console.error("❌ Error al reautenticar:", err);
  }
}


tokenValido(token) {
  if (!token) return false;
  try {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    const exp = payload.exp;
    const ahora = Math.floor(Date.now() / 1000);
    return exp > ahora;
  } catch (err) {
    console.error("Token inválido:", err);
    return false;
  }
}







}
