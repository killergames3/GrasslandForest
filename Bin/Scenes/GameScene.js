class GameScene extends Phaser.Scene {
  constructor(scene) {
    super({ key: "GameScene" });

  }

  preload() {
    // Cargar recursos
    this.load.image('tiles', './Game/MAPAS/Tileset_Ground.png');
    this.load.image('tiles1', './Game/MAPAS/Tileset_Road.png');
    this.load.image('tiles2', './Game/Objetos/arbolx1.png');
    this.load.image('tiles3', './Game/Objetos/casa222.png');
    this.load.tilemapTiledJSON('tilemap', './Maps/mapaxd.json');

    // Cargar Perfil

    this.load.image('imagen_Perfil', './Game/Sprites/Perfil/Perfil.png');

    // Cargar imágenes de cada dirección

    this.load.image('player_right_1', './Game/Sprites/derecha/run_1.png');
    this.load.image('player_right_2', './Game/Sprites/derecha/run_2.png');
    this.load.image('player_right_3', './Game/Sprites/derecha/run_3.png');
    this.load.image('player_right_4', './Game/Sprites/derecha/run_4.png');
    this.load.image('player_right_5', './Game/Sprites/derecha/run_5.png');
    this.load.image('player_right_6', './Game/Sprites/derecha/run_6.png');
    this.load.image('player_right_7', './Game/Sprites/derecha/run_7.png');

    this.load.image('player_left_1', './Game/Sprites/izquierda/run_1.png');
    this.load.image('player_left_2', './Game/Sprites/izquierda/run_2.png');
    this.load.image('player_left_3', './Game/Sprites/izquierda/run_3.png');
    this.load.image('player_left_4', './Game/Sprites/izquierda/run_4.png');
    this.load.image('player_left_5', './Game/Sprites/izquierda/run_5.png');
    this.load.image('player_left_6', './Game/Sprites/izquierda/run_6.png');
    this.load.image('player_left_7', './Game/Sprites/izquierda/run_7.png');

    // Recurso

    this.load.image('semillaImagen', './Game/Source/recurso.png');
    this.load.image('regadoraImagen', './Game/Source/tijeras.png');

    // cofre de inventario extra

    this.load.image('cofreImagen', './Game/Source/cofre.png');

    // imagen del minimap

    this.load.image('minimapimage', './Game/MAPAS/minimap.png');

    this.load.image('arbol', './Game/Objetos/arbolx.png');
    this.load.image('arbol1', './Game/Objetos/arbolx1.png');

    

  }

  create() {
    // Cargar el tilemap y el conjunto de tiles
    const map = this.map = this.make.tilemap({ key: 'tilemap' });
    const tileset = this.map.addTilesetImage('patronmapa1', 'tiles', 16, 16);
    this.backgroundLayer = this.map.createLayer('capamapa1', tileset, 0, 0);
    this.textures.get('tiles').setFilter(Phaser.Textures.FilterMode.NEAREST);


    // Configurar los límites del mundo
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);


    // arena transparente

    const tileset1 = this.map.addTilesetImage('patrontienda', 'tiles1', 16, 16);
    this.capaCasa = this.backgroundLayer = this.map.createLayer('capatienda', tileset1, 0, 0);

    // tienda

        // Obtener la capa de objetos "area_arboles"
        const objectLayer = map.getObjectLayer('area_arboles');

        objectLayer.objects.forEach(obj => {
          if (!obj.name) {
              console.warn(`⚠️ Objeto en (${obj.x}, ${obj.y}) no tiene nombre en Tiled.`);
              return; // Ignorar este objeto sin nombre
          }
      
          console.log(`🔹 Objeto encontrado: ${obj.name} en (${obj.x}, ${obj.y})`);
      
          let spriteKey = null;
          // Coincidir los patrones de Tiled con las imágenes de Phaser
          if (obj.name === 'arbolx') {
              spriteKey = 'arbol';  // Asigna la imagen 'arbol' para 'arbolx'
          } else if (obj.name === 'arbolx1') {
              spriteKey = 'arbol1'; // Asigna la imagen 'arbol1' para 'arbolx1'
          }
      
          if (spriteKey) {
              const sprite = this.add.image(obj.x, obj.y, spriteKey).setOrigin(0.5, 1);
              console.log(`✅ Imagen '${spriteKey}' añadida en (${obj.x}, ${obj.y})`);
          } else {
              console.warn(`⚠️ Objeto con nombre '${obj.name}' no tiene una imagen asociada.`);
          }
      });

    // CODIGO DE TRANSPARENCIA PARA LAS CASAS
    // Obtener el área de detección desde Tiled
    // Crear zona de transparencia
    const areaCasa = map.getObjectLayer('area_casa').objects[0];  // Definir correctamente la zona

    const zonaTransparencia = this.add.rectangle(
      areaCasa.x + areaCasa.width / 2,
      areaCasa.y + areaCasa.height / 2,
      areaCasa.width,
      areaCasa.height
    ).setOrigin(0.5).setAlpha(0).setDepth(0);

    this.physics.add.existing(zonaTransparencia, true); // Asegurarse de que sea estática



    // Crear el personaje (Inicialmente con la imagen de correr hacia abajo)
    this.player = this.physics.add.sprite(146, 144, 'player_right_1');
    this.player.setScale(2);
    this.player.setCollideWorldBounds(true); // Evita que el jugador salga del mundo

    // dando z-index personaje
    this.player.setDepth(1);

    // mecanismo de transparencia

    this.physics.add.collider(
      this.player,
      zonaTransparencia,
      () => {
        // Cuando el jugador colisiona con la zona de transparencia, hacemos que la capa de la casa sea más transparente
        this.capaCasa.setAlpha(0.5); // Pone la casa semi-transparente

        // dando z-index casa tienda
        this.capaCasa.setDepth(2);
      },
      null,
      this
    );

    // Detectar cuando el jugador ya no colisiona con la zona
    this.physics.world.on('worldstep', () => {
      if (!Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), zonaTransparencia.getBounds())) {
        // Si el jugador no está colisionando con la zona de transparencia, restauramos la opacidad de la capa
        this.capaCasa.setAlpha(1); // Restaura la opacidad de la casa a 1 (totalmente visible)

        // restableciendo z-index casa tienda
        this.capaCasa.setDepth(0); 
      }
    });

    // minimapa
    this.minimapX = 677;
    this.minimapY = 1;
    this.minimapWidth = 120;
    this.minimapHeight = 120;
    this.minimapAlpha = 1;

    // Escala del minimapa basada en el tamaño del mapa original
    this.mapScaleX = this.minimapWidth / this.map.widthInPixels;
    this.mapScaleY = this.minimapHeight / this.map.heightInPixels;

    // Fondo del minimapa (panel negro con transparencia)
    this.minimapBackground = this.add.rectangle(
        this.minimapX + this.minimapWidth / 2,
        this.minimapY + this.minimapHeight / 2,
        this.minimapWidth,
        this.minimapHeight,
        0x000000
    ).setAlpha(0.5).setScrollFactor(0).setDepth(9);

    // Crear la textura donde dibujaremos el minimapa
    this.minimap = this.add.renderTexture(
        this.minimapX,
        this.minimapY,
        this.minimapWidth,
        this.minimapHeight
    ).setScrollFactor(0).setDepth(10);

    // Crear el icono del jugador en el minimapa
    this.playerIcon = this.add.circle(
        this.minimapX, 
        this.minimapY, 
        3, 
        0xff0000
    ).setScrollFactor(0).setDepth(11);

    // Dibujar el minimapa correctamente
    this.drawMinimap();





    // Configurar animaciones

    this.anims.create({
      key: 'right',
      frames: [
        { key: 'player_right_1' },
        { key: 'player_right_2' },
        { key: 'player_right_3' },
        { key: 'player_right_4' },
        { key: 'player_right_5' },
        { key: 'player_right_6' },
        { key: 'player_right_7' }
      ],
      frameRate: 9,
      repeat: -1
    });

    this.anims.create({
      key: 'left',
      frames: [
        { key: 'player_left_1' },
        { key: 'player_left_2' },
        { key: 'player_left_3' },
        { key: 'player_left_4' },
        { key: 'player_left_5' },
        { key: 'player_left_6' },
        { key: 'player_left_7' }
      ],
      frameRate: 9,
      repeat: -1
    });

    // Configurar la cámara
    this.cameras.main.fadeIn(500); // Transición suave al cargar la escena
    // this.cameras.main.shake(250, 0.005); // Sacude la cámara durante 250ms para efectos de impacto
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setZoom(1); // Ajustar zoom de la cámara
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.setRoundPixels(true);



    // Configurar controles de movimiento
    this.cursors = this.input.keyboard.createCursorKeys();
    this.speed = 2.7; // Velocidad del jugador


    // Crear colisiones en las esquinas del mapa
    this.corners = this.physics.add.staticGroup();

    const cornerSize = 64; // Tamaño del área de colisión (ajustar según sea necesario)

    // Esquina superior izquierda
    this.corners.create(cornerSize / 2, cornerSize / 2, null).setSize(cornerSize, cornerSize).setVisible(false);

    // Esquina superior derecha
    this.corners.create(this.map.widthInPixels - cornerSize / 2, cornerSize / 2, null)
      .setSize(cornerSize, cornerSize).setVisible(false);

    // Esquina inferior izquierda
    this.corners.create(cornerSize / 2, this.map.heightInPixels - cornerSize / 2, null)
      .setSize(cornerSize, cornerSize).setVisible(false);

    // Esquina inferior derecha
    this.corners.create(this.map.widthInPixels - cornerSize / 2, this.map.heightInPixels - cornerSize / 2, null)
      .setSize(cornerSize, cornerSize).setVisible(false);

    // Habilitar colisión entre el jugador y las esquinas
    this.physics.add.collider(this.player, this.corners);


    // Crear el texto para mostrar las coordenadas
    this.coordinatesText = this.add.text(2, 1, 'X: 0 Y: 0', {
      fontFamily: '"PressStart2P"',
      fontSize: '12px',
      color: '#ffffff',
      resolution: 4,
    });

    this.coordinatesText.setScrollFactor(0); // Fija el texto para que no se desplace con el mapa
    this.coordinatesText.setDepth(10); // Asegura que el texto esté visible sobre otros elementos

    this.izquierdaani = false;
    this.derechaani = false;
    this.abajoani = false;
    this.arribaani = false;

    // barra de vida

    this.vidaPorcentaje = 100;
    this.aguaPorcentaje = 100;
    this.comidaPorcentaje = 100;

    const rectX = 1, rectY = 20, rectWidth = 30, rectHeight = 50, borderRadius = 15;

    // Fondo del rectángulo con bordes redondeados (negro oscuro con transparencia)
    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 0.6); // Negro oscuro con 60% de transparencia
    graphics.fillRoundedRect(0, 0, 200, 78, borderRadius); // Coordenadas relativas al contenedor

    // Crear cada barra (fondo gris + barra de color)
    this.barras = [
        this.crearBarra(80, 21, 100, 13, 0x00ff00), // Vida (Verde)
        this.crearBarra(80, 36, 100, 13, 0x6c6af1), // Agua (Azul)
        this.crearBarra(80, 51, 100, 13, 0xffff00)  // Comida (Amarillo)
    ];

    // Crear contenedor para agrupar el HUD y fijarlo a la cámara
    this.hudContainer = this.add.container(rectX, rectY, [
        graphics,
        ...this.barras.flatMap(b => [b.fondo, b.barra])
    ]);
    this.hudContainer.setScrollFactor(0); // Fijar el HUD para que no se mueva con la cámara
    this.hudContainer.setDepth(2);

    // CARGANDO IMAGEN DEL PERFIL

    // Agregar la imagen y anclarla a la cámara
    this.imagen_Perfil = this.add.image(10, 25, 'imagen_Perfil').setOrigin(0, 0);
    this.imagen_Perfil.setScrollFactor(0); // Fijar a la cámara
    this.imagen_Perfil.setDepth(2);
    this.imagen_Perfil.setScale(0.3);

    // TEXTO DEL USUARIO

    this.texto = this.add.text(80, 28, `${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`, {
      fontFamily: '"PressStart2P"',
      fontSize: '8px',
      color: '#ffffff',
      resolution: 4,
    }).setOrigin(0, 0)
    // Fijar el texto a la cámara
    this.texto.setScrollFactor(0);
    this.texto.setDepth(2);

    // TEXTO DE LAS BARRAS

    this.textovida = this.add.text(95, 45, `Vida ${this.vidaPorcentaje}%`, {
      fontFamily: '"PressStart2P"',
      fontSize: '8px',
      color: '#0400ff',
      resolution: 4,
    }).setOrigin(0, 0)
    // Fijar el texto a la cámara
    this.textovida.setScrollFactor(0);
    this.textovida.setDepth(2);

    this.textoagua = this.add.text(95, 60, `Agua ${this.aguaPorcentaje}%`, {
      fontFamily: '"PressStart2P"',
      fontSize: '8px',
      color: '#0400ff',
      resolution: 4,
    }).setOrigin(0, 0)
    // Fijar el texto a la cámara
    this.textoagua.setScrollFactor(0);
    this.textoagua.setDepth(2);

    this.textocomida = this.add.text(90, 75, `Comida ${this.comidaPorcentaje}%`, {
      fontFamily: '"PressStart2P"',
      fontSize: '8px',
      color: '#0400ff',
      resolution: 4,
    }).setOrigin(0, 0)
    // Fijar el texto a la cámara
    this.textocomida.setScrollFactor(0);
    this.textocomida.setDepth(2);

    // Imagen del minimapa

    this.minimapimagesx = this.add.image(737, 61, 'minimapimage')
    .setInteractive()
    .setOrigin(0.5)
    .setDepth(10)
    .setDisplaySize(120, 120)
    .setScrollFactor(0);


    // Crear un borde negro usando Graphics
    let border = this.add.graphics();
    border.setDepth(9).setScrollFactor(0);
    border.lineStyle(4, 0x000000, 1); // Grosor del borde, color negro
      border.strokeRect(
      this.minimapimagesx.x - this.minimapimagesx.displayWidth / 2 - 2,  
      this.minimapimagesx.y - this.minimapimagesx.displayHeight / 2 - 2,
      this.minimapimagesx.displayWidth + 4,
      this.minimapimagesx.displayHeight + 4
    );


    // inventario de cofre 
    this.cofre = this.add.image(500, 300, 'cofreImagen')
    .setInteractive()
    .setOrigin(0.5)
    .setDepth(0)
    .setDisplaySize(50, 50);  // Establece un tamaño específico para evitar distorsión

    // Inventario
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
    const playerName = 'Jugador1'; // Asegúrate de tener el nombre del jugador
    this.savePlayerData(playerName);
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

// Función para agregar un objeto a las casillas extra (de ejemplo)
agregarObjetoACofre(nombre, cantidad) {
  let casilla = this.casillasExtra.find(c => !c.objeto); 

  if (casilla) {
      if (casilla.objeto && casilla.objeto === nombre) {
          // Si el objeto ya existe en la casilla, incrementamos la cantidad
          casilla.cantidad += cantidad;
      } else {
          // Si es un nuevo objeto, lo agregamos a la casilla
          casilla.objeto = nombre;
          casilla.cantidad = cantidad;
      }

      // Asegurarse de que la imagen de objeto se ajusta al tamaño de la casilla
      casilla.imagenObjeto
          .setTexture(this.listaImagenes[nombre]) // Asegúrate de tener las imágenes de los objetos
          .setVisible(true)
          .setDisplaySize(this.casillaExtraAncho, this.casillaExtraAlto); // Ajustamos el tamaño de la imagen a la casilla
      
      // Actualizar el texto de la cantidad
      casilla.textoCantidad.setText(`x${casilla.cantidad}`);
      
      // Forzar actualización del texto en el ciclo de actualización de Phaser
      casilla.textoCantidad.setVisible(true); // Asegurarse de que el texto de la cantidad esté visible
      this.scene.sys.update();
  }
}



// La función savePlayerData sigue igual:
savePlayerData(playerName) {
  if (!playerName) {
    console.warn('No se puede guardar: nombre de jugador no definido.');
    return;
  }

  const dataToSave = {
    casillas: this.casillas.map(c => ({ objeto: c.objeto, cantidad: c.cantidad })),
    casillasExtra: this.casillasExtra.map(c => ({ objeto: c.objeto, cantidad: c.cantidad }))
  };

  const currentData = JSON.stringify(dataToSave);

  if (currentData === this.previousData) {
    console.log('No hay cambios para guardar.');
    return;
  }

  fetch(`http://localhost:5503/savePlayerData?player=${encodeURIComponent(playerName)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: currentData
  })
    .then(response => {
      if (response.redirected) {
        throw new Error('El servidor intentó redirigir. Evita respuestas 3xx.');
      }
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Datos guardados:', data);
      this.previousData = currentData; // Actualiza el estado previo correctamente
    })
    .catch(error => {
      console.error('Error en savePlayerData:', error.message);
    });
}



// Carga la información del jugador desde el backend y actualiza el inventario.
loadPlayerData(playerName) {
  fetch(`http://localhost:5503/loadPlayerData?player=${encodeURIComponent(playerName)}`)
    .then(response => response.json())
    .then(data => {
      // Actualizar las casillas del inventario
      if (data.casillas) {
        data.casillas.forEach((saved, index) => {
          const casilla = this.casillas[index];
          if (casilla) {
            casilla.objeto = saved.objeto;
            casilla.cantidad = saved.cantidad;

            let mostrarContenido = index < 7 ? saved.objeto : saved.objeto && this.visible;

            if (saved.objeto) {
              casilla.imagenObjeto
                .setTexture(this.listaImagenes[saved.objeto])
                .setDisplaySize(this.casillaAncho, this.casillaAlto)
                .setVisible(mostrarContenido);
              casilla.textoCantidad
                .setText(`x${saved.cantidad}`)
                .setVisible(mostrarContenido);
            } else {
              casilla.imagenObjeto.setVisible(false);
              casilla.textoCantidad.setText('').setVisible(false);
            }
          }
        });
      }

      // Actualizar las casillas del cofre (casillasExtra)
      if (data.casillasExtra) {
        data.casillasExtra.forEach((saved, index) => {
          const casilla = this.casillasExtra[index];
          if (casilla) {
            casilla.objeto = saved.objeto;
            casilla.cantidad = saved.cantidad;

            let mostrarContenido = saved.objeto && this.visibleCofre;

            if (saved.objeto) {
              casilla.imagenObjeto
                .setTexture(this.listaImagenes[saved.objeto])
                .setDisplaySize(this.casillaExtraAncho, this.casillaExtraAlto)
                .setVisible(mostrarContenido);
              casilla.textoCantidad
                .setText(`x${saved.cantidad}`)
                .setVisible(mostrarContenido);
            } else {
              casilla.imagenObjeto.setVisible(false);
              casilla.textoCantidad.setText('').setVisible(false);
            }
          }
        });
      }
    })
    .catch(error => {
      console.error('Error al cargar los datos:', error);
    });
}








drawMinimap() {
  // Limpiar antes de dibujar
  this.minimap.clear(); 

  // Crear un gráfico temporal para renderizar el tilemap
  let graphics = this.add.graphics();
  graphics.clear();

  // Dibujar la capa del tilemap en el gráfico
  this.backgroundLayer.forEachTile(tile => {
      if (tile.index !== -1) { // Evitar tiles vacíos
          let color = 0xffffff; // Color del tile en el minimapa
          graphics.fillStyle(color, 1);
          
          // Escalar el tamaño de los tiles para que encajen en el minimapa con zoom
          let tileWidth = this.mapScaleX * tile.width;
          let tileHeight = this.mapScaleY * tile.height;

          graphics.fillRect(
              this.minimapX + tile.x * this.mapScaleX, // Ajuste de posición en el minimapa
              this.minimapY + tile.y * this.mapScaleY, 
              tileWidth,
              tileHeight
          );
      }
  });

  // Dibujar el gráfico en el minimapa
  this.minimap.draw(graphics);
  graphics.destroy(); // Liberar memoria
}





crearBarra(x, y, width, height, color) {
    const fondo = this.add.rectangle(x, y, width, height, 0x555555).setOrigin(0, 0);
    const barra = this.add.rectangle(x, y, width, height, color).setOrigin(0, 0);
    return { fondo, barra, width };
}

actualizarBarras() {
    this.barras[0].barra.width = (this.vidaPorcentaje / 100) * this.barras[0].width;
    this.barras[1].barra.width = (this.aguaPorcentaje / 100) * this.barras[1].width;
    this.barras[2].barra.width = (this.comidaPorcentaje / 100) * this.barras[2].width;
}













  update(time, delta) {

      // Obtén las dimensiones y posición del minimapa en pantalla
      let minimapX = this.minimapimagesx.x;
      let minimapY = this.minimapimagesx.y;
      let minimapWidth = this.minimapimagesx.displayWidth;
      let minimapHeight = this.minimapimagesx.displayHeight;
  
      // Crea un rectángulo con las mismas dimensiones que la imagen del minimapa
      let minimapRect = new Phaser.Geom.Rectangle(
          minimapX - minimapWidth / 2,
          minimapY - minimapHeight / 2,
          minimapWidth,
          minimapHeight
      );
  
      // Convierte la posición del jugador a coordenadas de pantalla
      // (ya que this.minimapimagesx está fijo en la pantalla)
      let playerScreenX = this.player.x - this.cameras.main.scrollX;
      let playerScreenY = this.player.y - this.cameras.main.scrollY;
  
      // Comprueba si el punto del jugador está dentro del rectángulo del minimapa
      if (minimapRect.contains(playerScreenX, playerScreenY)) {
        console.log('Jugador detrás del minimapa');
        this.minimapimagesx.setAlpha(0.3);
      } else {
          this.minimapimagesx.setAlpha(1);
      }




    // Actualizar la posición del icono del jugador en el minimapa
    this.playerIcon.x = this.minimapX + this.player.x * this.mapScaleX;
    this.playerIcon.y = this.minimapY + this.player.y * this.mapScaleY;


    let moving = false; // Variable para verificar si el personaje se mueve

    // Lógica para las diagonales y el movimiento
    let dx = 0, dy = 0;

    if (this.cursors.left.isDown) dx = -1;
    if (this.cursors.right.isDown) dx = 1;
    if (this.cursors.up.isDown) dy = -1;
    if (this.cursors.down.isDown) dy = 1;

    // Normalización para las diagonales
    if (dx !== 0 && dy !== 0) {
      dx /= Math.sqrt(2); // Normaliza la velocidad en X
      dy /= Math.sqrt(2); // Normaliza la velocidad en Y
    }

    // Aplicar movimiento
    this.player.x += dx * this.speed;
    this.player.y += dy * this.speed;

    
    // Establecer animación según la dirección
    if (dx < 0 && dy < 0) {
      this.player.anims.play('left', true); // Arriba + Izquierda
      this.izquierdaani = true;
      
      this.arribaani = false;
      this.abajoani = false;
      this.derechaani = false;

    } else if (dx > 0 && dy < 0) {
      this.player.anims.play('right', true); // Arriba + Derecha
      this.derechaani = true;

      this.arribaani = false;
      this.abajoani = false;
      this.izquierdaani = false;

    } else if (dx < 0 && dy > 0) {
      this.player.anims.play('left', true); // Abajo + Izquierda
      this.izquierdaani = true;

      this.arribaani = false;
      this.abajoani = false;
      this.derechaani = false;
    } else if (dx > 0 && dy > 0) {
      this.player.anims.play('right', true); // Abajo + Derecha
      this.derechaani = true;
      
      this.arribaani = false;
      this.abajoani = false;
      this.izquierdaani = false;
      
    } else if (dx < 0) {
      this.player.anims.play('left', true); // Solo izquierda
      this.izquierdaani = true;

      
      this.arribaani = false;
      this.abajoani = false;
      this.derechaani = false;
    } else if (dx > 0) {
      this.player.anims.play('right', true); // Solo derecha
      this.derechaani = true;

      this.arribaani = false;
      this.abajoani = false;
      this.izquierdaani = false;
    } else if (dy < 0) {
      this.player.anims.play('left', true); // Solo arriba
      this.arribaani = true;

      this.abajoani = false;
      this.derechaani = false;
      this.izquierdaani = false;

    } else if (dy > 0) {
      this.player.anims.play('left', true); // Solo abajo
      this.abajoani = true;

      this.arribaani = false;
      this.derechaani = false;
      this.izquierdaani = false;
    }

    // Si no se mueve, detener la animación y poner en el frame correcto (run_2.png)
    if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
      this.player.anims.stop(); // Detener la animación


      if (dy == 0) {
        if (this.arribaani == true) {
          this.player.setTexture('player_left_1'); // arriba sprite
          this.arribaani = false;
        } else if (this.abajoani == true) {
          this.player.setTexture('player_left_1'); // abajo sprite
          this.abajoani = false;
        }
      } 
      if (dx == 0) {
        if (this.izquierdaani == true) {
          this.player.setTexture('player_left_1');
          this.izquierdaani = false;
        } else if (this.derechaani == true) {
          this.player.setTexture('player_right_1');
          this.derechaani = false;
        }
      }

    }

    // Obtener las coordenadas en el mapa
    const mapX = Math.floor(this.player.x / this.map.tileWidth); // Coordenada X en tiles
    const mapY = Math.floor(this.player.y / this.map.tileHeight); // Coordenada Y en tiles

    // Actualizar el texto con las coordenadas
    this.coordinatesText.setText(
      `Posición: X: ${this.player.x.toFixed(2)} Y: ${this.player.y.toFixed(2)} | Mapa: X: ${mapX} Y: ${mapY}`
    );
  }
}
