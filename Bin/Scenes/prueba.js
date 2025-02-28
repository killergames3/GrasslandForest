class InventoryScene extends Phaser.Scene {
    constructor() {
      super({ key: 'InventoryScene' });
      // Propiedades del inventario
      this.playerName = 'Jugador1'; // Nombre del jugador (puedes modificarlo o asignarlo dinámicamente)
      this.casillasExtra = [];
      this.casillaExtraInicioX = 300;
      this.casillaExtraInicioY = 150;
      this.casillaExtraEspaciado = 45;
      this.casillaExtraAncho = 40;
      this.casillaExtraAlto = 40;
  
      // Inventario
      this.visible = false;
      this.casillas = [];
      this.recursos = [];
      this.objetoSeleccionado = null;
      this.cursorObjeto = null;
  
      // Posición de las casillas visibles
      this.casillaInicioX = 270;
      this.casillaInicioY = 410;
      this.casillaEspaciado = 45;
      this.casillaAncho = 40;
      this.casillaAlto = 40;
  
      // Posición de las casillas ocultas
      this.casillaOcultaInicioX = 230;
      this.casillaOcultaInicioY = 140;
      this.casillaOcultaEspaciado = 50;
      this.casillaOcultaAncho = 40;
      this.casillaOcultaAlto = 40;
  
      // Listas de recursos
      this.listaImagenes = {
        'semilla': 'semillaImagen',
        'regadora': 'regadoraImagen'
      };
      this.listaClases = {
        'semilla': 'planta',
        'regadora': 'herramienta'
      };
      this.listaLimites = {
        'semilla': 10,
        'regadora': 20
      };
  
      // Número de casillas ocultas
      this.numCasillas = 50;
      // Estado del cofre
      this.visibleCofre = false;
    }
  
    create() {
      // Crear casillas extra (para el cofre)
      this.crearCasillasExtra();
  
      // Configurar el cofre y su interacción
      this.cofre.on('pointerdown', () => {
        this.toggleCofre();
      });
  
      // Crear las casillas (visibles y ocultas)
      this.crearCasillas();
      // Agregar algunos recursos de ejemplo
      this.agregarRecursos();
  
      // Alternar el inventario con la tecla "I"
      this.input.keyboard.on('keydown-I', () => {
        this.toggleInventario();
        this.panelOculto.setVisible(!this.panelOculto.visible);
      });
  
      // Liberar objeto si se hace clic fuera de las casillas
      this.input.on('pointerdown', (pointer, gameObjects) => {
        if (this.objetoSeleccionado && gameObjects.length === 0) {
          this.liberarObjeto();
        }
      });
  
      // Llamar a la función de carga de datos del jugador al iniciar el juego
      this.loadPlayerData(this.playerName);
  
      // Ejemplo: Puedes guardar la información presionando "S" si lo deseas
      this.input.keyboard.on('keydown-S', () => {
        this.savePlayerData(this.playerName);
      });
    }
  
    // Función para crear las casillas (visibles y ocultas)
    crearCasillas() {
      const filasVisibles = 1;
      const columnasVisibles = 7;
      let index = 0;
  
      // Casillas visibles
      for (let y = 0; y < filasVisibles; y++) {
        for (let x = 0; x < columnasVisibles; x++) {
          let posX = this.casillaInicioX + x * this.casillaEspaciado;
          let posY = this.casillaInicioY + y * this.casillaEspaciado;
          let casilla = this.add.rectangle(posX, posY, this.casillaAncho, this.casillaAlto, 0x383839)
            .setStrokeStyle(2, 0x141417);
          casilla.setInteractive();
          casilla.visible = true;
          casilla.setAlpha(0.5);
          casilla.id = index;
          casilla.objeto = null;
          casilla.cantidad = 0;
          casilla.textoCantidad = this.add.text(posX, posY + 20, '', { fontSize: '12px', fill: '#fff' })
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(5);
          casilla.imagenObjeto = this.add.image(posX, posY, '')
            .setOrigin(0.5)
            .setVisible(false)
            .setScrollFactor(0)
            .setDepth(4);
          casilla.on('pointerdown', () => this.seleccionarObjeto(casilla));
          casilla.setScrollFactor(0);
          casilla.setDepth(4);
          this.casillas.push(casilla);
          index++;
        }
      }
  
      // Casillas ocultas
      const filasOcultas = 5;
      const columnasOcultas = 8;
      for (let y = 0; y < filasOcultas; y++) {
        for (let x = 0; x < columnasOcultas; x++) {
          let posX = this.casillaOcultaInicioX + x * this.casillaOcultaEspaciado;
          let posY = this.casillaOcultaInicioY + y * this.casillaOcultaEspaciado;
          let casilla = this.add.rectangle(posX, posY, this.casillaOcultaAncho, this.casillaOcultaAlto, 0x383839)
            .setStrokeStyle(2, 0x141417);
          casilla.setInteractive();
          casilla.visible = false;
          casilla.setAlpha(0.5);
          casilla.id = index;
          casilla.objeto = null;
          casilla.cantidad = 0;
          casilla.textoCantidad = this.add.text(posX, posY + 20, '', { fontSize: '12px', fill: '#fff' })
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(5);
          casilla.imagenObjeto = this.add.image(posX, posY, '')
            .setOrigin(0.5)
            .setVisible(false)
            .setScrollFactor(0)
            .setDepth(4);
          casilla.setScrollFactor(0);
          casilla.setDepth(4);
          casilla.on('pointerdown', () => this.seleccionarObjeto(casilla));
          this.casillas.push(casilla);
          index++;
        }
      }
  
      this.panelOculto = this.add.graphics()
        .fillStyle(0x000000, 0.3)
        .fillRoundedRect(
          405 - (this.casillaOcultaEspaciado * columnasOcultas + 20) / 2,
          240 - (this.casillaOcultaEspaciado * filasOcultas + 20) / 2,
          this.casillaOcultaEspaciado * columnasOcultas + 20,
          this.casillaOcultaEspaciado * filasOcultas + 20,
          15
        )
        .setVisible(false)
        .setScrollFactor(0)
        .setDepth(3);
    }
  
    // Función para agregar recursos de ejemplo
    agregarRecursos() {
      this.agregarObjetoAInventario('semilla', 5);
      this.agregarObjetoAInventario('regadora', 5);
      this.agregarObjetoAInventario('regadora', 19);
    }
  
    agregarObjetoAInventario(nombre, cantidad) {
      let casilla = this.casillas.find(c => !c.objeto);
      if (casilla) {
        casilla.objeto = nombre;
        casilla.cantidad = cantidad;
        casilla.textoCantidad.setText(`x${cantidad}`);
        casilla.imagenObjeto
          .setTexture(this.listaImagenes[nombre])
          .setVisible(true)
          .setDisplaySize(this.casillaAncho, this.casillaAlto);
      }
    }
  
    toggleInventario() {
      this.visible = !this.visible;
      for (let i = 7; i < this.casillas.length; i++) {
        this.casillas[i].visible = this.visible;
        if (this.visible) {
          this.casillas[i].imagenObjeto.setVisible(this.casillas[i].objeto !== null);
          this.casillas[i].textoCantidad.setVisible(this.casillas[i].objeto !== null);
          this.casillas[i].setInteractive();
        } else {
          this.casillas[i].imagenObjeto.setVisible(false);
          this.casillas[i].textoCantidad.setVisible(false);
          this.casillas[i].disableInteractive();
        }
        this.casillas[i].textoCantidad.setVisible(this.visible);
      }
    }
  
    seleccionarObjeto(casilla) {
      if (casilla.objeto) {
        if (this.objetoSeleccionado) {
          if (casilla === this.objetoSeleccionado) {
            this.liberarObjeto();
          } else {
            if (casilla.objeto === this.objetoSeleccionado.objeto) {
              this.fusionarObjetos(this.objetoSeleccionado, casilla);
            } else {
              this.intercambiarObjetos(this.objetoSeleccionado, casilla);
            }
            this.liberarObjeto();
          }
        } else {
          this.objetoSeleccionado = casilla;
          casilla.setStrokeStyle(2, 0xff0000);
          this.mostrarObjetoEnCursor(casilla.objeto);
        }
      } else if (this.objetoSeleccionado) {
        if (this.casillas.includes(casilla) || this.casillasExtra.includes(casilla)) {
          this.moverObjeto(this.objetoSeleccionado, casilla);
          this.liberarObjeto();
          casilla.textoCantidad.setVisible(casilla.cantidad > 0);
        }
      }
    }
  
    fusionarObjetos(casillaOrigen, casillaDestino) {
      let tipo = casillaOrigen.objeto;
      let limite = this.listaLimites[tipo];
      let total = casillaOrigen.cantidad + casillaDestino.cantidad;
  
      if (total <= limite) {
        casillaDestino.cantidad = total;
        casillaDestino.textoCantidad.setText(`x${total}`);
        casillaOrigen.objeto = null;
        casillaOrigen.cantidad = 0;
        casillaOrigen.textoCantidad.setText('');
        casillaOrigen.imagenObjeto.setVisible(false);
      } else {
        let cantidadAAgregar = limite - casillaDestino.cantidad;
        casillaDestino.cantidad = limite;
        casillaDestino.textoCantidad.setText(`x${limite}`);
        casillaOrigen.cantidad = total - limite;
        casillaOrigen.textoCantidad.setText(`x${casillaOrigen.cantidad}`);
      }
    }
  
    moverObjeto(casilla1, casilla2) {
      if (!casilla2.objeto) {
        casilla2.objeto = casilla1.objeto;
        casilla2.cantidad = casilla1.cantidad;
        casilla2.textoCantidad.setText(`x${casilla1.cantidad}`);
        casilla2.imagenObjeto.setTexture(this.listaImagenes[casilla1.objeto])
          .setVisible(true)
          .setDisplaySize(this.casillaAncho, this.casillaAlto);
        casilla1.objeto = null;
        casilla1.cantidad = 0;
        casilla1.textoCantidad.setText('');
        casilla1.imagenObjeto.setVisible(false);
      }
    }
  
    intercambiarObjetos(casilla1, casilla2) {
      let tempObjeto = casilla1.objeto;
      let tempCantidad = casilla1.cantidad;
  
      casilla1.objeto = casilla2.objeto;
      casilla1.cantidad = casilla2.cantidad;
      casilla1.textoCantidad.setText(`x${casilla1.cantidad}`);
      casilla1.imagenObjeto.setTexture(this.listaImagenes[casilla1.objeto])
        .setVisible(true)
        .setDisplaySize(this.casillaAncho, this.casillaAlto);
  
      casilla2.objeto = tempObjeto;
      casilla2.cantidad = tempCantidad;
      casilla2.textoCantidad.setText(`x${casilla2.cantidad}`);
      casilla2.imagenObjeto.setTexture(this.listaImagenes[casilla2.objeto])
        .setVisible(true)
        .setDisplaySize(this.casillaAncho, this.casillaAlto);
    }
  
    mostrarObjetoEnCursor(objeto) {
      if (this.cursorObjeto) {
        this.cursorObjeto.destroy();
      }
      this.cursorObjeto = this.add.image(this.input.x, this.input.y, this.listaImagenes[objeto])
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(4)
        .setDisplaySize(this.casillaAncho, this.casillaAlto);
  
      this.input.on('pointermove', (pointer) => {
        if (this.cursorObjeto) {
          this.cursorObjeto.setPosition(pointer.x, pointer.y);
        }
      });
    }
  
    liberarObjeto() {
      if (this.cursorObjeto) {
        this.cursorObjeto.destroy();
        this.cursorObjeto = null;
      }
      if (this.objetoSeleccionado) {
        this.objetoSeleccionado.setStrokeStyle(2, 0x141417);
        this.objetoSeleccionado = null;
      }
    }
  
    crearCasillasExtra() {
      const filasExtra = 2;
      const columnasExtra = 5;
      let index = 0;
  
      for (let y = 0; y < filasExtra; y++) {
        for (let x = 0; x < columnasExtra; x++) {
          let posX = this.casillaExtraInicioX + x * this.casillaExtraEspaciado;
          let posY = this.casillaExtraInicioY + y * this.casillaExtraEspaciado;
          let casilla = this.add.rectangle(posX, posY, this.casillaExtraAncho, this.casillaExtraAlto, 0x383839)
            .setStrokeStyle(2, 0x141417);
          casilla.setInteractive();
          casilla.visible = false;
          casilla.setAlpha(0.5);
          casilla.id = index;
          casilla.objeto = null;
          casilla.cantidad = 0;
          casilla.textoCantidad = this.add.text(posX, posY + 20, '', { fontSize: '12px', fill: '#fff' })
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(5);
          casilla.imagenObjeto = this.add.image(posX, posY, '')
            .setOrigin(0.5)
            .setVisible(false)
            .setScrollFactor(0)
            .setDepth(4);
          casilla.on('pointerdown', () => this.seleccionarObjeto(casilla));
          casilla.setScrollFactor(0);
          casilla.setDepth(4);
          this.casillasExtra.push(casilla);
          index++;
        }
      }
    }
  
    toggleCofre() {
      const visible = !this.visibleCofre;
      this.visibleCofre = visible;
  
      for (let i = 0; i < this.casillasExtra.length; i++) {
        this.casillasExtra[i].visible = visible;
        this.casillasExtra[i].imagenObjeto.setVisible(visible && this.casillasExtra[i].objeto !== null);
        this.casillasExtra[i].textoCantidad.setVisible(visible && this.casillasExtra[i].objeto !== null);
        if (visible) {
          this.casillasExtra[i].setInteractive();
        } else {
          this.casillasExtra[i].disableInteractive();
        }
      }
    }
  
    // --------------- Funciones de integración con el Backend ---------------
  
    // Guarda la información del jugador (estados de casillas y casillasExtra) en el backend.
    savePlayerData(playerName) {
      const dataToSave = {
        casillas: this.casillas.map(c => ({
          objeto: c.objeto,
          cantidad: c.cantidad
        })),
        casillasExtra: this.casillasExtra.map(c => ({
          objeto: c.objeto,
          cantidad: c.cantidad
        }))
      };
  
      fetch(`/savePlayerData?player=${encodeURIComponent(playerName)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Datos guardados correctamente:', data);
        })
        .catch(error => {
          console.error('Error al guardar los datos:', error);
        });
    }
  
    // Carga la información del jugador desde el backend y actualiza el inventario.
    loadPlayerData(playerName) {
      fetch(`/loadPlayerData?player=${encodeURIComponent(playerName)}`)
        .then(response => response.json())
        .then(data => {
          // Actualizar casillas visibles y ocultas
          if (data.casillas) {
            data.casillas.forEach((saved, index) => {
              const casilla = this.casillas[index];
              if (casilla) {
                casilla.objeto = saved.objeto;
                casilla.cantidad = saved.cantidad;
                casilla.textoCantidad.setText(saved.cantidad > 0 ? `x${saved.cantidad}` : '');
                if (saved.objeto) {
                  casilla.imagenObjeto
                    .setTexture(this.listaImagenes[saved.objeto])
                    .setVisible(true)
                    .setDisplaySize(this.casillaAncho, this.casillaAlto);
                } else {
                  casilla.imagenObjeto.setVisible(false);
                }
              }
            });
          }
          if (data.casillasExtra) {
            data.casillasExtra.forEach((saved, index) => {
              const casilla = this.casillasExtra[index];
              if (casilla) {
                casilla.objeto = saved.objeto;
                casilla.cantidad = saved.cantidad;
                casilla.textoCantidad.setText(saved.cantidad > 0 ? `x${saved.cantidad}` : '');
                if (saved.objeto) {
                  casilla.imagenObjeto
                    .setTexture(this.listaImagenes[saved.objeto])
                    .setVisible(true)
                    .setDisplaySize(this.casillaExtraAncho, this.casillaExtraAlto);
                } else {
                  casilla.imagenObjeto.setVisible(false);
                }
              }
            });
          }
        })
        .catch(error => {
          console.error('Error al cargar los datos:', error);
        });
    }
  }
  