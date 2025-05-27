/* eslint-disable no-unused-vars */
/* eslint eqeqeq: ["error", "smart"] */


class tiendajuego extends Phaser.Scene {
    constructor(scene) {
      super({ key: "tiendajuego" });
  
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


      // Cargar recursos
      this.textures.remove('tiles');

      if (this.textures.exists('tiles')) {
        this.textures.remove('tiles');
      }

      this.load.image('tiles', './Game/MAPAS/tiles2.png');
      this.load.image('tiles1', './Game/MAPAS/Tileset_Road.png');
      this.load.image('tiles2', './Game/Objetos/arbolx1.png');
      this.load.image('tiles3', './Game/Objetos/casa222.png');
      this.load.image('tilep6', './Game/Objetos/casa1.png');
      this.load.tilemapTiledJSON('tilemapx', './Maps/mapatienda.json');
  
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
      this.load.image('regadoraImagen', './Game/Source/recurso2.png');
      this.load.image('tijerasImagen', './Game/Source/tijeras.png');
      
      this.load.image('instrumento-pesca', './Game/Source/pesca-instrumento.png');
      
      this.load.image('cosecha_1', './Game/Source/futro1.png');
  
      // cofre de inventario extra
  
      this.load.image('cofreImagen', './Game/Source/cofre.png');
  
      // imagen del minimap

      this.textures.remove('minimapimage');
  
      this.load.image('minimapimage', './Game/MAPAS/minimap2.png');
  
      this.load.image('arbol', './Game/Objetos/arbolx.png');
      this.load.image('arbol1', './Game/Objetos/arbolx1.png');

      // moneda

      this.load.image('monedaimg', './Game/Source/moneda.png');

      // chat
      
      this.load.image('chat', './Game/Source/chat.png');
  
      // mochila con letra I y con triangulo
      
      this.load.image('mochila', './Game/Source/Mochila.png');
      this.load.image('letrai', './Game/Source/tecla_i.png');
      this.load.image('triangulo', './Game/Source/Triangulo.png');

      // botones

        
      this.load.image('botonpersonaje', './Game/Source/boton.png');
      this.load.image('botonpersonaje1', './Game/Source/boton1.png');

      // NPC

      this.load.image('NPCtiendas', './Game/Objetos/NPC/NPCtienda.png');

      //mesa

      
      this.load.image('mesa_png', './Game/Objetos/mesa y silla.png');

      // cuadro

      this.load.image('cuadro_1x', './Game/Objetos/cuadro1.png');
      this.load.image('cuadro_3x', './Game/Objetos/cuadro3.png');

      this.load.image('lampara_pared', './Game/Objetos/lampara_pared.png');

      
      this.load.image('cesta1x', './Game/Objetos/cesta1.png');
      this.load.image('cesta2x', './Game/Objetos/cesta2.png');
      this.load.image('cesta3x', './Game/Objetos/cesta3.png');

      
      this.load.image('alfombra', './Game/Objetos/alfombra.png');

      
      this.load.image('estante1', './Game/Objetos/estante1.png');
      this.load.image('estante2', './Game/Objetos/estante2.png');

        
      // señalador (bota) de correr
      
      this.load.image('bota', './Game/Source/bota.png');

      // BARANDA
      
      this.load.image('PILA_BARRA_png', './Game/Objetos/izquierda_escalera.png');
      
      this.load.image('BARANDA_png', './Game/Objetos/baranda.png');

      
      this.load.image('mostrador_png', './Game/Objetos/mostrador.png');


      

      


  
  
      // si no existen los valores o argumentos del jugador se crean en la bd y si ya existen se leen automaticamente.
  
      this.barras = [
        { barra: this.add.rectangle(100, 100, 200, 20, 0xff0000).setVisible(false) }, // Vida
        { barra: this.add.rectangle(100, 130, 200, 20, 0x00ff00).setVisible(false) }, // Agua
        { barra: this.add.rectangle(100, 160, 200, 20, 0x0000ff).setVisible(false) }  // Comida
      ];

      this.currentAccount = this.registry.get("account");
  
      this.playerName = this.currentAccount;
      this.player = this.physics.add.sprite(430, 432, 'playerTexture');
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
      this.loadPlayerData(this.playerName);
  
      this.cofreAbierto = false;
      this.inventarioAbierto = false;


      this.selecciontienda = 1001;


    }
  
    create() {
        
      this.phaser_ancho = this.scale.width;
      this.phaser_largo = this.scale.height;

      this.map = null;
      this.backgroundLayer = null;
        
      this.scene.stop('GameScene');
      this.scene.remove('GameScene');
      this.scene.add('GameScene', GameScene, false);
        


      // Cargar el tilemap y el conjunto de tiles
      this.map = this.make.tilemap({ key: 'tilemapx' });
      const tileset = this.map.addTilesetImage('Patron_tienda', 'tiles', 16, 16);
      this.backgroundLayer = this.map.createLayer('capaxd', tileset, 0, 0);
      this.textures.get('tiles').setFilter(Phaser.Textures.FilterMode.NEAREST);


      // En el método create, inicializa this.graphics
      this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0xff0000 }});


      // Configurar los límites del mundo
      this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
  
      // Crear el personaje (Inicialmente con la imagen de correr hacia abajo)
      this.player = this.physics.add.sprite(this.posicionplayerx, this.posicionplayery, 'player_right_1');
      this.player.setScale(2);
      this.player.setCollideWorldBounds(true); // Evita que el jugador salga del mundo
  
      // dando z-index personaje
      this.player.setDepth(1);

      
      // Pone la pantalla negra desde el principio
      this.cameras.main.fadeOut(0, 0, 0, 0);

      // Configurar cámara
      this.cameras.main.setZoom(1);
      this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
      this.cameras.main.setRoundPixels(true);

      // Coloca al jugador en su posición deseada antes de seguirlo
      this.player.setPosition(200, 300); // Cambiá por la posición inicial que quieras

      // Inicia el follow, pero la cámara está aún en negro
      this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

      // Esperar a que la cámara termine de posicionarse (ajustá el delay si es muy rápido o lento)
      this.time.delayedCall(800, () => {
        // Ahora sí, mostrar el fade in
        this.cameras.main.fadeIn(600, 0, 0, 0);
      });

      // Guarda referencias si las usás más tarde
      this.cam = this.cameras.main;
      this.cam_ancho = this.cam.width;
      this.cam_alto = this.cam.height;


    // npc
    const imageMappingnpc = {
      npco: {
        spriteKey: 'NPCtiendas',
        targetProp: 'sprite_npco'          
      }
    };

    this.createImagesFromObjectLayer(this, this.map, 'NPC', imageMappingnpc);


      // objetos
      
    const imageMapping = {
      mostradorx: {
        spriteKey: 'mostrador_png',
        targetProp: 'sprite_mostrador'          
      },
      cuadro_1: {
        spriteKey: 'cuadro_1x',
        targetProp: 'cuadro_1xx'          
      },
      cuadro_3: {
        spriteKey: 'cuadro_3x',
        targetProp: 'cuadro_1xx'          
      },
      lampara_1: {
        spriteKey: 'lampara_pared',
        targetProp: 'lampara_1x'          
      },
      lampara_2: {
        spriteKey: 'lampara_pared',
        targetProp: 'lampara_2x'          
      },
      lampara_3: {
        spriteKey: 'lampara_pared',
        targetProp: 'lampara_3x'          
      },
      lampara_4: {
        spriteKey: 'lampara_pared',
        targetProp: 'lampara_4x'          
      },      
      cesta1: {
        spriteKey: 'cesta2x',
        targetProp: 'cesta_1'          
      },
      cesta2: {
        spriteKey: 'cesta1x',
        targetProp: 'cesta_2'          
      },
      cesta3: {
        spriteKey: 'cesta2x',
        targetProp: 'cesta_3'          
      },
      cesta4: {
        spriteKey: 'cesta1x',
        targetProp: 'cesta_4'          
      },
      cesta5: {
        spriteKey: 'cesta2x',
        targetProp: 'cesta_5'          
      },
      cesta6: {
        spriteKey: 'cesta1x',
        targetProp: 'cesta_6'          
      },
      cesta7: {
        spriteKey: 'cesta3x',
        targetProp: 'cesta_7'          
      },
      cesta8: {
        spriteKey: 'cesta1x',
        targetProp: 'cesta_8'          
      },
      cesta9: {
        spriteKey: 'cesta2x',
        targetProp: 'cesta_9'          
      },
      cesta10: {
        spriteKey: 'cesta3x',
        targetProp: 'cesta_10'          
      },
      cesta11: {
        spriteKey: 'cesta2x',
        targetProp: 'cesta_11'          
      },
      cesta12: {
        spriteKey: 'cesta1x',
        targetProp: 'cesta_12'          
      },
      cesta13: {
        spriteKey: 'cesta2x',
        targetProp: 'cesta_13'          
      },
      cesta14: {
        spriteKey: 'cesta1x',
        targetProp: 'cesta_14'          
      },
      cesta15: {
        spriteKey: 'cesta2x',
        targetProp: 'cesta_15'          
      },
      cesta16: {
        spriteKey: 'cesta1x',
        targetProp: 'cesta_16'          
      },
      alfombra_1: {
        spriteKey: 'alfombra',
        targetProp: 'alfombra_1x'          
      },
      estante_1: {
        spriteKey: 'estante1',
        targetProp: 'estante_1x'          
      },
      estante_2: {
        spriteKey: 'estante2',
        targetProp: 'estante_2x'          
      },
    };

    this.createImagesFromObjectLayer(this, this.map, 'OBJETOS', imageMapping);

          
    const imageMapping1 = {
      PILAR_BARRA_1: {
        spriteKey: 'PILA_BARRA_png',
        targetProp: 'PILAR_BARRA_1'          
      },
      BARANDA_1: {
        spriteKey: 'BARANDA_png',
        targetProp: 'BARANDA_1'          
      },
      BARANDA_2: {
        spriteKey: 'BARANDA_png',
        targetProp: 'BARANDA_2'          
      },
      BARANDA_3: {
        spriteKey: 'BARANDA_png',
        targetProp: 'BARANDA_3'          
      },
      BARANDA_4: {
        spriteKey: 'BARANDA_png',
        targetProp: 'BARANDA_4'          
      },
      BARANDA_5: {
        spriteKey: 'BARANDA_png',
        targetProp: 'BARANDA_5'          
      },
      BARANDA_6: {
        spriteKey: 'BARANDA_png',
        targetProp: 'BARANDA_6'          
      },
      BARANDA_7: {
        spriteKey: 'BARANDA_png',
        targetProp: 'BARANDA_7'          
      },
      BARANDA_8: {
        spriteKey: 'BARANDA_png',
        targetProp: 'BARANDA_8'          
      },
      BARANDA_9: {
        spriteKey: 'BARANDA_png',
        targetProp: 'BARANDA_9'          
      },
      BARANDA_10: {
        spriteKey: 'BARANDA_png',
        targetProp: 'BARANDA_10'          
      },
      BARANDA_11: {
        spriteKey: 'BARANDA_png',
        targetProp: 'BARANDA_11'          
      },
      BARANDA_12: {
        spriteKey: 'BARANDA_png',
        targetProp: 'BARANDA_12'          
      },
      BARANDA_13: {
        spriteKey: 'BARANDA_png',
        targetProp: 'BARANDA_13'          
      },
      
    };

    this.createImagesFromObjectLayer(this, this.map, 'BARRAS_1', imageMapping1);




    // DANDO TRANSPARENCIA
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_trasparencia_barras',
      this.player,

      this.PILAR_BARRA_1,
      {
        activeAlpha: 0.8,
        activeDepth: 2,
        normalAlpha: 1,
        normalDepth: 0
      },
      this.BARANDA_1,
      {
        activeAlpha: 0.8,
        activeDepth: 2,
        normalAlpha: 1,
        normalDepth: 0
      },
      this.BARANDA_2,
      {
        activeAlpha: 0.8,
        activeDepth: 2,
        normalAlpha: 1,
        normalDepth: 0
      },
      this.BARANDA_3,
      {
        activeAlpha: 0.8,
        activeDepth: 2,
        normalAlpha: 1,
        normalDepth: 0
      },
      this.BARANDA_4,
      {
        activeAlpha: 0.8,
        activeDepth: 2,
        normalAlpha: 1,
        normalDepth: 0
      },
      this.BARANDA_5,
      {
        activeAlpha: 0.8,
        activeDepth: 2,
        normalAlpha: 1,
        normalDepth: 0
      },
      this.BARANDA_6,
      {
        activeAlpha: 0.8,
        activeDepth: 2,
        normalAlpha: 1,
        normalDepth: 0
      },
      this.BARANDA_7,
      {
        activeAlpha: 0.8,
        activeDepth: 2,
        normalAlpha: 1,
        normalDepth: 0
      },
      this.BARANDA_8,
      {
        activeAlpha: 0.8,
        activeDepth: 2,
        normalAlpha: 1,
        normalDepth: 0
      },
      this.BARANDA_9,
      {
        activeAlpha: 0.8,
        activeDepth: 2,
        normalAlpha: 1,
        normalDepth: 0
      },
      this.BARANDA_10,
      {
        activeAlpha: 0.8,
        activeDepth: 2,
        normalAlpha: 1,
        normalDepth: 0
      },
      this.BARANDA_11,
      {
        activeAlpha: 0.8,
        activeDepth: 2,
        normalAlpha: 1,
        normalDepth: 0
      },
      this.BARANDA_12,
      {
        activeAlpha: 0.8,
        activeDepth: 2,
        normalAlpha: 1,
        normalDepth: 0
      },
      this.BARANDA_13,
      {
        activeAlpha: 0.8,
        activeDepth: 2,
        normalAlpha: 1,
        normalDepth: 0
      },
    );
    













      // rectangulo de puerta de salida

      const objectLayerf1 = this.map.getObjectLayer('colisionsalida');
      this.collisionRectangles1 = [];
  
      // Recorre cada objeto de la capa y lo convierte en un rectángulo para colisión.
      objectLayerf1.objects.forEach(obj => {
        let rect1 = new Phaser.Geom.Rectangle(obj.x, obj.y, obj.width, obj.height);
        this.collisionRectangles1.push(rect1);
  
        // Opcional: dibuja los rectángulos de colisión (en verde semitransparente) para depuración.
        /*
        let debugGraphics = this.add.graphics();
        debugGraphics.fillStyle(0x00ff00, 0.3);
        debugGraphics.fillRectShape(rect);
        */
      });

            // rectangulo de puerta de salida 

      const objectLayerf2 = this.map.getObjectLayer('colisionesmapa');
      this.collisionRectangles2 = [];
  
      // Recorre cada objeto de la capa y lo convierte en un rectángulo para colisión.
      objectLayerf2.objects.forEach(obj => {
        let rect2 = new Phaser.Geom.Rectangle(obj.x, obj.y, obj.width, obj.height);
        this.collisionRectangles2.push(rect2);
  
        // Opcional: dibuja los rectángulos de colisión (en verde semitransparente) para depuración.
        /*
        let debugGraphics = this.add.graphics();
        debugGraphics.fillStyle(0x00ff00, 0.3);
        debugGraphics.fillRectShape(rect);
        */
      });

      
      // moneda


      const graphics1 = this.add.graphics();

      const x = this.phaser_ancho - 300; // Posición en X
      const y = 20; // Posición en Y
      const width = 100; // Ancho
      const height = 30; // Alto
      const radius = 15; // Radio de los bordes redondeados
      const color = 0x000000; // Color negro
      const alpha = 0.5; // Transparencia (0 totalmente transparente, 1 opaco)
      // Dibuja el rectángulo con bordes redondeados
      graphics1.fillStyle(color, alpha);
      graphics1.fillRoundedRect(x, y, width, height, radius);
      graphics1.setScrollFactor(0);
      graphics1.setDepth(11);
  
      const imagen = this.add.image(this.phaser_ancho - 280, 35, 'monedaimg'); // Cargar imagen en (x:200, y:200)
      imagen.setScale(0.15); // Escala al 50% de su tamaño original
      imagen.setScrollFactor(0);
      imagen.setDepth(11);
  
      this.textoMoneda = this.add.text(this.phaser_ancho - 275, 22, this.moneda, {
        fontSize: '15px',
        fontFamily: 'Verdana',
        color: '#ffffff',
        padding: { x: 10, y: 5 },
        align: 'center'
      }).setScrollFactor(0).setDepth(11);
  

      // chat
      const imagen1 = this.add.image(50, this.phaser_largo - 42, 'chat'); // Cargar imagen en (x:200, y:200)
      imagen1.setScale(0.18); // Escala al 50% de su tamaño original
      imagen1.setScrollFactor(0);
      imagen1.setDepth(11);
  
      // mochila con letra I con triangulo
      
      const imagen2 = this.add.image(this.phaser_ancho / 2 + 180, this.phaser_largo - 42, 'triangulo'); // Cargar imagen en (x:200, y:200)
      imagen2.setScale(1); // Escala al 50% de su tamaño original
      imagen2.setScrollFactor(0);
      imagen2.setDepth(11);
      
      const imagen3 = this.add.image(this.phaser_ancho / 2 + 180, this.phaser_largo - 45, 'mochila'); // Cargar imagen en (x:200, y:200)
      imagen3.setScale(1.1); // Escala al 50% de su tamaño original
      imagen3.setScrollFactor(0);
      imagen3.setDepth(11);
      
      const imagen4 = this.add.image(this.phaser_ancho / 2 + 195, this.phaser_largo - 35, 'letrai'); // Cargar imagen en (x:200, y:200)
      imagen4.setScale(1.2); // Escala al 50% de su tamaño original
      imagen4.setScrollFactor(0);
      imagen4.setDepth(11);
  
      // señalador de (bota) al correr
  
      const imagen6 = this.add.image(this.phaser_ancho - 40, this.phaser_largo - 40, 'bota'); // Cargar imagen en (x:200, y:200)
      imagen6.setScale(1.5); // Escala al 50% de su tamaño original
      imagen6.setScrollFactor(0);
      imagen6.setDepth(11);
  
      this.botax = this.add.text(
        this.phaser_ancho - 30,
        this.phaser_largo - 30,
        Math.round(this.progress * 100) + '%',
        {
          fontFamily: '"PressStart2P"',
          fontSize: '12px',
          color: '#ffffff',
          resolution: 4,
        }
      );
      
      this.botax.setOrigin(0.5);       // Centrar el texto
      // this.botax.setScrollFactor(0); // Fijar a la cámara, descomenta si lo necesitas
      this.botax.setDepth(11);         // Asegurar que esté al frente
      this.botax.setScrollFactor(0);
      
  

        
      // Crear el rectángulo con esquinas redondeadas
      const graphicsx = this.add.graphics();
      const rectWidthx = 50;
      const rectHeightx = 25;
      const borderRadiusx = 5;

      graphicsx.fillStyle(0x000000, 0.5); // Color azul
      graphicsx.fillRoundedRect(2, 100, rectWidthx, rectHeightx, borderRadiusx);

      // Agregar la letra "M" en el centro del rectángulo
      const text = this.add.text(25, 110, "<--", {
          fontSize: "20px",
          color: "#ffffff",
          fontFamily: "Verdana",
      }).setOrigin(0.5);

      // Crear un área interactiva sobre el rectángulo
      const hitArea = this.add.rectangle(2, 100, rectWidthx, rectHeightx).setOrigin(0);
      hitArea.setInteractive();

      // Evento de pasar el cursor por encima (hover)
      hitArea.on("pointerover", () => {
          graphicsx.clear(); // Limpiar el gráfico previo
          graphicsx.fillStyle(0xffffff, 1); // Rectángulo blanco
          graphicsx.fillRoundedRect(2, 100, rectWidthx, rectHeightx, borderRadius);
          text.setColor("#000000"); // Texto negro
      });

      // Evento de quitar el cursor
      hitArea.on("pointerout", () => {
          graphicsx.clear(); // Limpiar el gráfico previo
          graphicsx.fillStyle(0x000000, 0.5); // Rectángulo negro con transparencia
          graphicsx.fillRoundedRect(2, 100, rectWidthx, rectHeightx, borderRadius);
          text.setColor("#ffffff"); // Texto blanco
      });

      // Evento de clic en el rectángulo
      hitArea.on("pointerdown", () => {
        
          // abriendo panel

          this.minipanel = false;

          // seleccionando cual es el objeto a vender

          this.uff_recurso = 1;
        
          document.getElementById('textoParrafo').style.display = 'none';
          document.getElementById('textoParrafo2').style.display = 'none';
          document.getElementById('cantidad').style.display = 'none';
          document.getElementById('vender-btn').style.display = 'none';
          this.scene.stop('GameScene');
          this.scene.start("LoadingScene");
      });

      // Fijar ambos elementos a la cámara
      graphicsx.setScrollFactor(0);
      text.setScrollFactor(0);
      hitArea.setScrollFactor(0);
      graphicsx.setDepth(11);
      text.setDepth(11);
      hitArea.setDepth(11);

























    // nombre de usuario

      // Crear texto en el centro de la pantalla
      this.usuariox = this.add.text(400, 300, '---', {
        fontFamily: '"PressStart2P"',
        fontSize: '12px',
        color: '#ffffff',
        resolution: 4,
      });
      this.usuariox.setOrigin(0.5);          // Centrar el texto
      //this.usuariox.setScrollFactor(0);      // Fijar a la cámara
      this.usuariox.setDepth(1);

      // creando nombre para npc 

      this.npcx = this.add.text(788, 150, 'Johnny Johnson', {
        fontFamily: '"PressStart2P"',
        fontSize: '12px',
        color: '#1a1ff7',
        resolution: 4,
      });
      this.npcx.setOrigin(0.5);

      // barra de energia

      this.progress = 1;           // Valor actual de la barra (1 = 100%)
      this.maxWidth = 300;       // Ancho total de la barra
      this.barHeight = 10;       // Altura de la barra
      this.barX = this.phaser_ancho / 2 - 145;           // Posición X de la barra
      this.barY = this.phaser_largo - 75;            // Posición Y de la barra


      this.graphicsBar;            // Objeto Graphics que dibuja la barra
      this.keyZ;                   // Referencia a la tecla "Z"

      this.graphicsBar = this.add.graphics();
      this.graphicsBar.setScrollFactor(0); // Fija la barra a la cámara
      this.graphicsBar.setDepth(11);
      this.graphicsBar.setVisible(false);  // La barra inicia invisible

      // Crear la referencia para la tecla "Z"
      this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);


      // minimapa

      this.minimapX = this.phaser_ancho - 170;
      this.minimapY = 1;
      this.minimapWidth = 165;
      this.minimapHeight = 150;
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

      if (!this.anims.exists('right')) {
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
          frameRate: 11,
          repeat: -1
        });
      }
      
      if (!this.anims.exists('left')) {
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
          frameRate: 11,
          repeat: -1
        });
      }
  
  
      // Configurar controles de movimiento
      this.cursors = this.input.keyboard.createCursorKeys();
  
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
  
      this.texto = this.add.text(80, 28, `${this.currentAccount.slice(0, 6)}...${this.currentAccount.slice(-4)}`, {
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
  
      this.minimapimagesx = this.add.image(this.phaser_ancho - 87, 75, 'minimapimage')
      .setInteractive()
      .setOrigin(0.5)
      .setDepth(10)
      .setDisplaySize(162, 145)
      .setScrollFactor(0);

      
    // boton personaje
    const boton = this.add.image(1230, 180, 'botonpersonaje')
        .setInteractive()
        .setScrollFactor(0)
        .setDepth(11)
        .setDisplaySize(64, 32);
    // Crear el panel, pero oculto al inicio
    //const panel = this.add.image(400, 300, 'panel').setVisible(false);

    // Si prefieres un panel como rectángulo con texto, también puedes usar un graphics
    const panel = this.add.graphics()
        .fillStyle(0x222222 , 0.9) // Color negro con 80% de opacidad
        .fillRoundedRect(320, 100, 650, 400, 15) // Rectángulo con radio de 15
        .setDepth(11)
        .setScrollFactor(0)
        .setVisible(false);
    const panelsuh = this.add.graphics()
        .fillStyle(0x00008B , 0.9) // Color negro con 80% de opacidad
        .fillRoundedRect(320, 160, 650, 340, 15) // Rectángulo con radio de 15
        .setDepth(11)
        .setScrollFactor(0)
        .setVisible(false);

    const textopanelc = this.add.text(550, 115, '¡Estadisticas!', {
          fontSize: '32px',
          fill: '#ffffff',
          fontFamily: 'daimon'
    }).setVisible(false).setScrollFactor(0).setDepth(11);

    // estadisticas

    const a_1 = this.add.graphics()
      .fillStyle(0xffffff, 0.8) // Blanco con 80% de opacidad
      .fillRoundedRect(340, 210, 200, 100, 15)
      .setDepth(11)
      .setScrollFactor(0)
      .setVisible(false);

    
    const a_2 = this.add.graphics()
      .fillStyle(0xffffff, 0.8) // Blanco con 80% de opacidad
      .fillRoundedRect(545, 210, 200, 100, 15)
      .setDepth(11)
      .setScrollFactor(0)
      .setVisible(false);

    const a_3 = this.add.graphics()
      .fillStyle(0xffffff, 0.8) // Blanco con 80% de opacidad
      .fillRoundedRect(750, 210, 200, 100, 15)
      .setDepth(11)
      .setScrollFactor(0)
      .setVisible(false);

    const e_1 = this.add.graphics()
      .fillStyle(0xffffff, 0.8) // Blanco con 80% de opacidad
      .fillRoundedRect(340, 320, 200, 100, 15)
      .setDepth(11)
      .setScrollFactor(0)
      .setVisible(false);

    
    const e_2 = this.add.graphics()
      .fillStyle(0xffffff, 0.8) // Blanco con 80% de opacidad
      .fillRoundedRect(545, 320, 200, 100, 15)
      .setDepth(11)
      .setScrollFactor(0)
      .setVisible(false);

    const e_3 = this.add.graphics()
      .fillStyle(0xffffff, 0.8) // Blanco con 80% de opacidad
      .fillRoundedRect(750, 320, 200, 100, 15)
      .setDepth(11)
      .setScrollFactor(0)
      .setVisible(false);

    //textos

    const t_1 = this.add.text(400, 220, 'Sabiduria', {
    fontFamily: 'daimon',
    fontSize: '24px',
    color: '#000000' // Texto negro
    })
    .setDepth(11)
    .setScrollFactor(0)
    .setVisible(false);

    const t_2 = this.add.text(610, 220, 'Fuerza', {
    fontFamily: 'daimon',
    fontSize: '24px',
    color: '#000000' // Texto negro
    })
    .setDepth(11)
    .setScrollFactor(0)
    .setVisible(false);

    const t_3 = this.add.text(795, 220, 'Agricultura', {
    fontFamily: 'daimon',
    fontSize: '24px',
    color: '#000000' // Texto negro
    })
    .setDepth(11)
    .setScrollFactor(0)
    .setVisible(false);

    const f_1 = this.add.text(360, 258, 'Nivel : ', {
    fontFamily: 'daimon',
    fontSize: '24px',
    color: '#000000' // Texto negro
    })
    .setDepth(11)
    .setScrollFactor(0)
    .setVisible(false);

    const f_2 = this.add.text(565, 258, 'Nivel : ', {
    fontFamily: 'daimon',
    fontSize: '24px',
    color: '#000000' // Texto negro
    })
    .setDepth(11)
    .setScrollFactor(0)
    .setVisible(false);

    const f_3 = this.add.text(770, 258, 'Nivel : ', {
    fontFamily: 'daimon',
    fontSize: '24px',
    color: '#000000' // Texto negro
    })
    .setDepth(11)
    .setScrollFactor(0)
    .setVisible(false);

    this.R_1 = this.add.text(430, 262, this.sabiduria, {
    fontFamily: 'PressStart2P',
    fontSize: '18px',
    color: '#006400' // Texto negro
    })
    .setDepth(11)
    .setScrollFactor(0)
    .setVisible(false);

    this.R_2 = this.add.text(635, 262, this.fuerza, {
    fontFamily: 'PressStart2P',
    fontSize: '18px',
    color: '#006400' // Texto negro
    })
    .setDepth(11)
    .setScrollFactor(0)
    .setVisible(false);

    this.R_3 = this.add.text(840, 262, this.agricultura, {
    fontFamily: 'PressStart2P',
    fontSize: '18px',
    color: '#006400' // Texto negro
    })
    .setDepth(11)
    .setScrollFactor(0)
    .setVisible(false);

    
    const t_4 = this.add.text(345, 350, '[MUY PRONTO]', {
    fontFamily: 'daimon',
    fontSize: '26px',
    color: '#000000' // Texto negro
    })
    .setDepth(11)
    .setScrollFactor(0)
    .setVisible(false);

    const t_5 = this.add.text(552, 350, '[MUY PRONTO]', {
    fontFamily: 'daimon',
    fontSize: '26px',
    color: '#000000' // Texto negro
    })
    .setDepth(11)
    .setScrollFactor(0)
    .setVisible(false);

    const t_6 = this.add.text(755, 350, '[MUY PRONTO]', {
    fontFamily: 'daimon',
    fontSize: '26px',
    color: '#000000' // Texto negro
    })
    .setDepth(11)
    .setScrollFactor(0)
    .setVisible(false);




    // Evento click en el botón
    boton.on('pointerdown', () => {
        panel.setVisible(!panel.visible); // Alterna visibilidad
        panelsuh.setVisible(!panelsuh.visible);
        textopanelc.setVisible(!textopanelc.visible);
        a_1.setVisible(!a_1.visible);
        a_2.setVisible(!a_2.visible);
        a_3.setVisible(!a_3.visible);
        e_1.setVisible(!e_1.visible);
        e_2.setVisible(!e_2.visible);
        e_3.setVisible(!e_3.visible);
        t_1.setVisible(!t_1.visible);
        t_2.setVisible(!t_2.visible);
        t_3.setVisible(!t_3.visible);
        t_4.setVisible(!t_4.visible);
        t_5.setVisible(!t_5.visible);
        t_6.setVisible(!t_6.visible);
        
        this.R_1.setVisible(!this.R_1.visible);
        this.R_2.setVisible(!this.R_2.visible);
        this.R_3.setVisible(!this.R_3.visible);
        f_1.setVisible(!f_1.visible);
        f_2.setVisible(!f_2.visible);
        f_3.setVisible(!f_3.visible);
    });

  
  
  
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
  
    // Inventario
    this.casillasExtra = [];
    this.casillaExtraInicioX = this.phaser_ancho / 2 - 90;
    this.casillaExtraInicioY = this.phaser_largo / 2 - 60;
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
    this.casillaInicioX = this.phaser_ancho / 2 - 130;
    this.casillaInicioY = this.phaser_largo - 40;
    this.casillaEspaciado = 45;
    this.casillaAncho = 40;
    this.casillaAlto = 40;

    // Posición de las casillas ocultas
    this.casillaOcultaInicioX = this.phaser_ancho / 2 - 160;
    this.casillaOcultaInicioY = this.phaser_largo / 2 - 60;
    this.casillaOcultaEspaciado = 46;
    this.casillaOcultaAncho = 40;
    this.casillaOcultaAlto = 40;

      

      // Listas de recursos
      this.listaImagenes = {
        'semilla': 'semillaImagen',
        'regadora': 'regadoraImagen',
        'tijeras': 'tijerasImagen',
        'cana_pesca': 'instrumento-pesca',
        'cosecha1': 'cosecha_1'
      };
      this.listaClases = {
        'semilla': 'planta',
        'regadora': 'herramienta',
        'tijeras': 'herramienta_corte',
        'cana_pesca': 'herramienta_pescar',
        'cosecha1': 'cosecha_1_product'
      };
      this.listaLimites = {
        'semilla': 10,
        'regadora': 1,
        'tijeras': 1,
        'cana_pesca': 1,
        'cosecha1': 99
      };

  
      // Número de casillas ocultas
      this.numCasillas = 50;
      // Estado del cofre
      this.visibleCofre = false;
  
      // Crear casillas extra (para el cofre)
      this.crearCasillasExtra();
  
  
      // rectangulo del panel del cofre
  
      this.rectanguloVinculado2 = this.add.graphics()
          .setDepth(3)
          .setScrollFactor(0)
          .setVisible(false)
          .fillStyle(0x000000, 0.5) // Fondo negro transparente
          .fillRoundedRect(270, 110, 240, 120, 20); // Rectángulo con bordes redondeados
    
  
      // Crear las casillas (visibles y ocultas)
      this.crearCasillas();
      // Agregar algunos recursos de ejemplo
      //this.agregarRecursos();
  
      this.input.keyboard.on('keydown-I', () => {
        this.toggleInventario();
        this.panelOculto.setVisible(!this.panelOculto.visible);
        this.infoText.setVisible(!this.infoText.visible);
        this.closeButton.setVisible(!this.closeButton.visible);
      });


      // Cerrar inventario al hacer clic en la "X"
      this.closeButton.on('pointerdown', () => {
        
        this.toggleInventario();
        this.panelOculto.setVisible(!this.panelOculto.visible);
        this.infoText.setVisible(!this.infoText.visible);
        this.closeButton.setVisible(false);
      });

  
      // Liberar objeto si se hace clic fuera de las casillas
      this.input.on('pointerdown', (pointer, gameObjects) => {
        if (this.objetoSeleccionado && gameObjects.length === 0) {
          this.liberarObjeto();
        }
      });



      // Llamar a la función de carga de datos del jugador al iniciar el juego
      
    // Llamar a la función de carga de datos del jugador al iniciar el juego

      const token = localStorage.getItem("jwt");
      const playerName = localStorage.getItem("playerName") || this.playerName;

      if (token && this.tokenValido(token)) {
        // ✅ Token válido, cargar datos directamente
        this.loadPlayerData(playerName, token);
      } else {
        // ❌ Token inválido o inexistente, obtener uno nuevo
        fetch("http://192.168.100.221:3000/auth", {
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


      // Llama a savePlayerData cada 1 segundos

      this.saveTimer = 0;
      this.sceneActive = true; // Asegúrate de que la escena esté activa


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
          .setStrokeStyle(2, 0xffffff);
        casilla.setInteractive();
        casilla.visible = true;
        casilla.setAlpha(0.5);
        casilla.id = index;
        casilla.objeto = null;
        casilla.cantidad = 0;
        casilla.textoCantidad = this.add.text(posX, posY + 20, '', { fontSize: '12px', fill: '#fff' })
          .setOrigin(0.5)
          .setScrollFactor(0)
          .setDepth(13);
        casilla.imagenObjeto = this.add.image(posX, posY, '')
          .setOrigin(0.5)
          .setVisible(false)
          .setScrollFactor(0)
          .setDepth(13);
        casilla.on('pointerdown', () => this.seleccionarObjeto(casilla));
        casilla.setScrollFactor(0);
        casilla.setDepth(13);
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
          .setStrokeStyle(2, 0xffffff);
        casilla.setInteractive();
        casilla.visible = false;
        casilla.setAlpha(0.5);
        casilla.id = index;
        casilla.objeto = null;
        casilla.cantidad = 0;
        casilla.textoCantidad = this.add.text(posX, posY + 20, '', { fontSize: '12px', fill: '#fff' })
          .setOrigin(0.5)
          .setScrollFactor(0)
          .setDepth(13);
        casilla.imagenObjeto = this.add.image(posX, posY, '')
          .setOrigin(0.5)
          .setVisible(false)
          .setScrollFactor(0)
          .setDepth(13);
        casilla.setScrollFactor(0);
        casilla.setDepth(13);
        // Crear rectángulo vinculado a la cámara
        this.rectanguloVinculado = this.add.graphics()
        .setDepth(12)
        .setScrollFactor(0)
        .setVisible(false)
        .fillStyle(0x000000, 0.5) // Fondo negro transparente
        .fillRoundedRect(200, 100, 410, 275, 20); // Rectángulo con bordes redondeados
        casilla.on('pointerdown', () => this.seleccionarObjeto(casilla));
        this.casillas.push(casilla);
        index++;
      }
    }
  
  

    this.panelOculto = this.add.graphics()
      .fillStyle(0x222222, 0.9)
      .fillRoundedRect(
        this.phaser_ancho / 2 - (this.casillaOcultaEspaciado * columnasOcultas + 20) / 2,
        this.phaser_largo / 2 - (this.casillaOcultaEspaciado * filasOcultas + 20) / 2,
        this.casillaOcultaEspaciado * columnasOcultas + 20,
        this.casillaOcultaEspaciado * filasOcultas + 55,
        15
      )
      .setVisible(false)
      .setScrollFactor(0)
      .setDepth(12);


      // Fondo semitransparente para el título

      this.infoText = this.add.text(this.phaser_ancho / 2 - 78, this.phaser_largo / 2 - 120, '¡Inventario!', {
          fontSize: '32px',
          fill: '#ffffff',
          fontFamily: 'daimon'
      }).setVisible(false).setScrollFactor(0).setDepth(12);

      this.closeButton = this.add.text(this.phaser_ancho / 2 + 155, this.phaser_largo / 2 - 120, 'X', {
          fontSize: '32px',
          fill: '#ff0000',
          fontFamily: 'Arial',
          fontStyle: 'bold'
      }).setVisible(false).setScrollFactor(0).setDepth(12).setInteractive();


        
    }

    vender_recurso(recurso, cantidad) {
      let cantidadRestante = cantidad;
      
      // Recorremos todas las casillas del inventario
      for (let i = 0; i < this.casillas.length && cantidadRestante > 0; i++) {
        let casilla = this.casillas[i];
        
        // Solo actuamos si la casilla contiene el recurso
        if (casilla.objeto === recurso) {
          if (casilla.cantidad > cantidadRestante) {
            // Si la casilla tiene más cantidad que lo que queremos vender, se descuenta lo necesario
            casilla.cantidad -= cantidadRestante;
            casilla.textoCantidad.setText(`x${casilla.cantidad}`);
            cantidadRestante = 0;
          } else {
            // Si la casilla tiene igual o menos cantidad que la que se quiere vender,
            // se descuenta toda la cantidad de esa casilla y se la "limpia"
            cantidadRestante -= casilla.cantidad;
            casilla.cantidad = 0;
            casilla.objeto = null;
            casilla.textoCantidad.setText('');
            casilla.imagenObjeto.setVisible(false);
          }
        }
      }
      
      // Si se vendió la cantidad completa, se retorna true, de lo contrario false.
      return cantidadRestante === 0;
    }
    

    ver_recurso(recurso) {
      let total = 0;
      // Recorre todas las casillas del inventario
      this.casillas.forEach(casilla => {
        if (casilla.objeto === recurso) {
          total += casilla.cantidad;
        }
      });
      return total;
    }
    
    agregarRecurso(nombre, cantidad) {
      // Obtenemos el límite para este recurso
      const limite = this.listaLimites[nombre];
    
      // 1. Intentamos sumar en una casilla ya existente (en cualquier parte) que tenga el mismo recurso y no esté llena
      let casillaExistente = this.casillas.find(c => c.objeto === nombre && c.cantidad < limite);
      
      if (casillaExistente) {
        // Calculamos cuánto se puede agregar sin superar el límite
        let espacioDisponible = limite - casillaExistente.cantidad;
        let cantidadAAgregar = Math.min(cantidad, espacioDisponible);
        casillaExistente.cantidad += cantidadAAgregar;
        casillaExistente.textoCantidad.setText(`x${casillaExistente.cantidad}`);
        // Si la casilla está entre las primeras 7, forzamos la visibilidad
        if (this.casillas.indexOf(casillaExistente) < 7) {
          casillaExistente.imagenObjeto.setVisible(true);
          casillaExistente.textoCantidad.setVisible(true);
        } else {
          // En el resto, la visibilidad depende del estado actual del inventario
          casillaExistente.imagenObjeto.setVisible(this.visible);
          casillaExistente.textoCantidad.setVisible(this.visible);
        }
        cantidad -= cantidadAAgregar;
      }
    
      // 2. Si aún queda cantidad por agregar, buscamos primero casillas vacías entre las primeras 7
      while (cantidad > 0) {
        // Buscamos una casilla vacía entre las primeras 7
        let casillaVacia = this.casillas.find((c, index) => index < 7 && !c.objeto);
        // Si no hay en las primeras 7, buscamos en el resto
        if (!casillaVacia) {
          casillaVacia = this.casillas.find((c, index) => index >= 7 && !c.objeto);
        }
        if (!casillaVacia) {
          return "Inventario lleno";
        }
        // Se agrega hasta el límite permitido en la casilla encontrada
        let cantidadAAgregar = Math.min(cantidad, limite);
        casillaVacia.objeto = nombre;
        casillaVacia.cantidad = cantidadAAgregar;
        casillaVacia.textoCantidad.setText(`x${casillaVacia.cantidad}`);
        
        // Configuramos la imagen del objeto, de existir
        if (casillaVacia.imagenObjeto && this.listaImagenes[nombre]) {
          casillaVacia.imagenObjeto
            .setTexture(this.listaImagenes[nombre])
            .setDisplaySize(this.casillaAncho, this.casillaAlto);
        }
        
        // Si la casilla está entre las primeras 7, se muestran siempre; en caso contrario, se respeta el estado (this.visible)
        if (this.casillas.indexOf(casillaVacia) < 7) {
          casillaVacia.imagenObjeto.setVisible(true);
          casillaVacia.textoCantidad.setVisible(true);
        } else {
          casillaVacia.imagenObjeto.setVisible(this.visible);
          casillaVacia.textoCantidad.setVisible(this.visible);
        }
        
        cantidad -= cantidadAAgregar;
      }
    }
    
  
    toggleInventario() {
      //this.rectanguloVinculado.setVisible(!this.rectanguloVinculado.visible);
      this.inventarioAbierto = !this.inventarioAbierto;
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
    
    liberarObjeto() {
      if (this.cursorObjeto) {
        this.cursorObjeto.destroy();
        this.cursorObjeto = null;
      }
      if (this.objetoSeleccionado) {
        this.objetoSeleccionado.setStrokeStyle(2, 0xffffff);
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
    
  // Función para guardar los datos del jugador
  
/**
 * Guarda el estado del jugador en el servidor.
 * @param {string} [playerName] Dirección o nombre del jugador (opcional)
 * @param {string} [token] JWT de autenticación (opcional)
 */
async savegg(playerName, token) {
  playerName = playerName || localStorage.getItem("playerName");
  token = token || localStorage.getItem("jwt");

  if (!playerName || !token) {
    console.error("Falta playerName o token para guardar datos.");
    return;
  }

  const inventoryData = (this.casillas || []).map(casilla => ({
    id:       casilla.id,
    objeto:   casilla.objeto,
    cantidad: casilla.cantidad,
    tipo:     'inventario'
  }));

  const chestData = (this.casillasExtra || []).map(casilla => ({
    id:       casilla.id,
    objeto:   casilla.objeto,
    cantidad: casilla.cantidad,
    tipo:     'cofre'
  }));

  const payload = {
    posicionplayerx:  this.posicionplayerx  ?? 100,
    posicionplayery:  this.posicionplayery  ?? 100,
    vidaPorcentaje:   this.vidaPorcentaje   ?? 100,
    aguaPorcentaje:   this.aguaPorcentaje   ?? 100,
    comidaPorcentaje: this.comidaPorcentaje ?? 100,
    nivel:            this.nivel            ?? 0,
    nivel_exp:        this.nivel_exp        ?? 0,
    sabiduria:        this.sabiduria        ?? 0,
    sabiduria_exp:    this.sabiduria_exp    ?? 0,
    fuerza:           this.fuerza           ?? 0,
    fuerza_exp:       this.fuerza_exp       ?? 0,
    agricultura:      this.agricultura      ?? 0,
    agricultura_exp:  this.agricultura_exp  ?? 0,
    speed:            this.speed            ?? 2.7,
    mundo:            this.mundo            ?? 1,
    moneda:           this.moneda           ?? 0,
    Username:         this.usuarioxx        ?? '---',
    misiones:         this.misiones         ?? 0,
    inventory:        inventoryData,
    chest:            chestData
  };

  const url = `${this.serverclient}/save/${playerName}`;

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      const err = await resp.json();
      console.error('Error al guardar:', err);

      // Reautenticación si el token está expirado o inválido
      if (err.error?.includes("Token inválido") || err.error?.includes("expirado")) {
        console.warn("Token expirado. Reintentando autenticación...");
        await this.reautenticarYGuardar();
      }

      return;
    }

    console.log('✅ Datos guardados correctamente');
  } catch (e) {
    console.error('❌ Error de red al guardar:', e);
  }
}

/**
 * Reintenta autenticación y guarda de nuevo.
 */
async reautenticarYGuardar() {
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
      console.log("🔐 Token renovado. Guardando datos...");
      await this.savegg(playerName, data.token);
    } else {
      console.error("❌ No se pudo renovar el token:", data);
    }
  } catch (err) {
    console.error("❌ Error al reautenticar para guardar:", err);
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


  
  actualizarCasilla(casilla, objeto, cantidad) {
    // Actualiza los datos de la casilla
    casilla.objeto = objeto;
    casilla.cantidad = cantidad;
    
    // Si la casilla pertenece al inventario (todas las casillas en this.casillas)
    if (this.casillas && this.casillas.includes(casilla)) {
      const index = this.casillas.indexOf(casilla);
      
      if (objeto) {
        // Si es una de las primeras 7, siempre se actualiza y se muestra
        if (index < 7) {
          if (this.listaImagenes[objeto]) {
            casilla.imagenObjeto
              .setTexture(this.listaImagenes[objeto])
              .setDisplaySize(this.casillaAncho, this.casillaAlto);
          }
          casilla.textoCantidad.setText(`x${cantidad}`);
          // Siempre visibles para las primeras 7
          casilla.imagenObjeto.setVisible(true);
          casilla.textoCantidad.setVisible(true);
        } else {
          // Para las casillas extra, se actualiza pero la visibilidad depende del estado del inventario (this.visible)
          if (this.listaImagenes[objeto]) {
            casilla.imagenObjeto
              .setTexture(this.listaImagenes[objeto])
              .setDisplaySize(this.casillaAncho, this.casillaAlto);
          }
          casilla.textoCantidad.setText(`x${cantidad}`);
          casilla.imagenObjeto.setVisible(this.visible);
          casilla.textoCantidad.setVisible(this.visible);
        }
      } else {
        // Si no hay objeto, se ocultan ambas propiedades
        casilla.imagenObjeto.setVisible(false);
        casilla.textoCantidad.setVisible(false);
      }
    }
    // Si la casilla pertenece al cofre (this.casillasExtra)
    else if (this.casillasExtra && this.casillasExtra.includes(casilla)) {
      if (objeto) {
        if (this.listaImagenes[objeto]) {
          casilla.imagenObjeto
            .setTexture(this.listaImagenes[objeto])
            .setDisplaySize(this.casillaExtraAncho, this.casillaExtraAlto);
        }
        casilla.textoCantidad.setText(`x${cantidad}`);
        // La visibilidad de las casillas del cofre depende de si el cofre está abierto (this.visibleCofre)
        casilla.imagenObjeto.setVisible(this.visibleCofre);
        casilla.textoCantidad.setVisible(this.visibleCofre);
      } else {
        casilla.imagenObjeto.setVisible(false);
        casilla.textoCantidad.setVisible(false);
      }
    }
  }
  
  
  
  
  
  
  
  
  
  /*
  // Función para actualizar los objetos en las casillas
  actualizarCasilla(casilla, objeto, cantidad) {
    casilla.objeto = objeto;
    casilla.cantidad = cantidad;
  
    if (objeto) {
        casilla.imagenObjeto
            .setTexture(this.listaImagenes[objeto])
            .setVisible(true)
            .setDisplaySize(this.casillaAncho, this.casillaAlto);
        
        casilla.textoCantidad.setText(`x${cantidad}`);
        casilla.textoCantidad.setVisible(true);
    } else {
        casilla.imagenObjeto.setVisible(false);
        casilla.textoCantidad.setVisible(false);
    }
  }
  
  */
  
  
    // Técnica 1: Detecta cambios en las dimensiones de la ventana
    checkConsoleDimensions() {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;

      if (widthDiff > 100 || heightDiff > 100) {
          if (!this.isConsoleOpen) {
              this.isConsoleOpen = true;
              console.log('¡La consola está abierta! (detectado por dimensiones)');
              // Aquí puedes agregar lógica adicional (pausar el juego, mostrar una alerta, etc.)
          }
      } else {
          if (this.isConsoleOpen) {
              this.isConsoleOpen = false;
              console.log('--------La consola ha sido cerrada.--------------');
          }
      }
  }

  // Técnica 2: Usando un getter en un objeto
  setupConsoleDetection() {
      const element = new Image();
      Object.defineProperty(element, 'id', {
          get: () => {
              if (!this.isConsoleOpen) {
                  this.isConsoleOpen = true;
                  console.log('¡La consola está abierta! (detectado por getter)');
                  // Aquí también puedes agregar lógica adicional
              }
          }
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
  
  
  // esta opcion es para zoom bajos
  /*
  mostrarObjetoEnCursor(objeto) {
    // Si ya existe un objeto en el cursor, lo destruimos para reemplazarlo
    if (this.cursorObjeto) {
      this.cursorObjeto.destroy();
    }
    // Obtenemos el zoom actual de la cámara principal
    const camZoom = this.cameras.main.zoom;
    
    // Creamos el objeto de imagen en la posición inicial ajustada por el zoom
    this.cursorObjeto = this.add.image(this.input.x / camZoom + (29 * 8 + 8), this.input.y / camZoom+ (15 * 7 + 12), this.listaImagenes[objeto])
      .setOrigin(0.5)
      .setScrollFactor(0) // Esto hace que el objeto permanezca fijo en la pantalla
      .setDepth(4)
      .setDisplaySize(this.casillaAncho, this.casillaAlto);
  
    // Al mover el puntero actualizamos la posición del objeto, compensando el zoom
    this.input.on('pointermove', (pointer) => {
      if (this.cursorObjeto) {
        this.cursorObjeto.setPosition(pointer.x / camZoom + (29 * 8 + 8), pointer.y / camZoom + (15 * 7 + 12) );
      }
    });
  }

  */


 
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
  
  


/**
 * Crea múltiples zonas de transparencia a partir de una capa de objetos,
 * afectando a uno o más sprites con sus propias opciones.
 *
 * @param {Phaser.Scene} scene
 * @param {Phaser.Tilemaps.Tilemap} map
 * @param {string} objectLayerName
 * @param {Phaser.Physics.Arcade.Sprite} player
 * @param  {...any} spriteOptionPairs
 *   Debe recibir pares: sprite, options, sprite, options, …
 *   donde options = { activeAlpha, activeDepth, normalAlpha, normalDepth }.
 * @returns {Phaser.GameObjects.Rectangle[]} Array con todas las zonas creadas.
 */
createMultipleTransparencyZones(
  scene, map, objectLayerName, player,
  ...spriteOptionPairs
) {
  // Construye array de configs { sprite, options }
  const spriteConfigs = [];
  for (let i = 0; i < spriteOptionPairs.length; i += 2) {
    const sprite = spriteOptionPairs[i];
    const opts   = spriteOptionPairs[i + 1] || {};
    spriteConfigs.push({
      sprite,
      activeAlpha: opts.activeAlpha  ?? 0.5,
      activeDepth: opts.activeDepth  ?? 2,
      normalAlpha: opts.normalAlpha  ?? 1,
      normalDepth: opts.normalDepth  ?? 0,
    });
  }

  // Lee todas las zonas definidas en Tiled
  const areas = map.getObjectLayer(objectLayerName).objects;
  const zones = [];

  areas.forEach(area => {
    // Crea el rectángulo invisible
    const zone = scene.add.rectangle(
      area.x + area.width / 2,
      area.y + area.height / 2,
      area.width,
      area.height
    )
    .setOrigin(0.5)
    .setAlpha(0)
    .setDepth(0);

    scene.physics.add.existing(zone, true);
    zones.push(zone);

    // Para cada spriteConfig, añade un collider que aplique sus propios valores
    spriteConfigs.forEach(cfg => {
      scene.physics.add.collider(
        player, zone,
        () => {
          cfg.sprite.setAlpha(cfg.activeAlpha);
          cfg.sprite.setDepth(cfg.activeDepth);
        },
        null,
        scene
      );
    });
  });

  // Cuando el jugador sale de todas las zonas, restaurar todos los sprites
  scene.physics.world.on('worldstep', () => {
    const pb = player.getBounds();
    const inside = zones.some(z =>
      Phaser.Geom.Intersects.RectangleToRectangle(pb, z.getBounds())
    );
    if (!inside) {
      spriteConfigs.forEach(cfg => {
        cfg.sprite.setAlpha(cfg.normalAlpha);
        cfg.sprite.setDepth(cfg.normalDepth);
      });
    }
  });

  return zones;
}



/**
 * Crea imágenes a partir de los objetos definidos en una capa de Tiled y
 * las asigna a propiedades de la escena según el mapeo indicado.
 *
 * @param {Phaser.Scene} scene - La escena de Phaser en la que se crearán las imágenes.
 * @param {Phaser.Tilemaps.Tilemap} map - El mapa Tiled que contiene la capa de objetos.
 * @param {string} objectLayerName - El nombre de la capa de objetos en Tiled.
 * @param {Object} nameMapping - Un objeto de mapeo donde la clave es el nombre del objeto en Tiled y el valor es un objeto con:
 *    - spriteKey: (string) la clave de la imagen que se usará en Phaser.
 *    - targetProp: (string) el nombre de la propiedad de la escena donde se asignará el sprite.
 */
createImagesFromObjectLayer(scene, map, objectLayerName, nameMapping) {
  // Obtener la capa de objetos del mapa
  const objectLayer = map.getObjectLayer(objectLayerName);

  if (!objectLayer) {
    console.warn(`⚠️ La capa de objetos '${objectLayerName}' no se encontró en el mapa.`);
    return;
  }

  // Recorrer cada objeto de la capa
  objectLayer.objects.forEach(obj => {
    if (!obj.name) {
      console.warn(`⚠️ Objeto en (${obj.x}, ${obj.y}) no tiene nombre en Tiled.`);
      return; // Ignorar objetos sin nombre
    }

    console.log(`🔹 Objeto encontrado: ${obj.name} en (${obj.x}, ${obj.y})`);

    // Verificar si existe un mapeo para el nombre del objeto
    const mapping = nameMapping[obj.name];
    if (!mapping) {
      console.warn(`⚠️ Objeto con nombre '${obj.name}' no tiene una imagen o variable asociada en el mapping.`);
      return;
    }

    const { spriteKey, targetProp } = mapping;
    if (!spriteKey || !targetProp) {
      console.warn(`⚠️ El mapeo para '${obj.name}' debe definir 'spriteKey' y 'targetProp'.`);
      return;
    }

    // Crear la imagen en la posición del objeto; se asume que la imagen se ancla en (0,1)
    const image = scene.add.image(obj.x, obj.y, spriteKey).setOrigin(0, 1);

    // Si el objeto tiene tamaño definido, usarlo para escalar la imagen
    if (obj.width && obj.height) {
      image.setScale(obj.width / image.width, obj.height / image.height);
    }

    console.log(`✅ Imagen '${spriteKey}' añadida en (${obj.x}, ${obj.y}) con escala ajustada.`);

    // Asignar la imagen a la propiedad indicada de la escena
    scene[targetProp] = image;
  });
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








  
  
    update(time, delta) {
            
      if (typeof this.sabiduria !== 'undefined') {
        this.R_1.setText(this.sabiduria);
      } else {
        this.sabiduria = null;
      }

      if (typeof this.fuerza !== 'undefined') {
        this.R_2.setText(this.fuerza);
      } else {
        this.fuerza = null;
      }

      if (typeof this.agricultura !== 'undefined') {
        this.R_3.setText(this.agricultura);
      } else {
        this.agricultura = null;
      }



        // corriendo guardado

        if (this.elipeticiones === 0) {
            
          if (this.sceneActive) {
            // Acumula el tiempo transcurrido
            this.saveTimer += delta;
        
            // Si han pasado 1000 ms (1 segundos)
            if (this.saveTimer >= 1000) {
              const token = localStorage.getItem("jwt");
              const playerName = localStorage.getItem("playerName") || this.playerName;

              if (token && this.tokenValido(token)) {
                // ✅ Token aún válido, usarlo directamente
                this.savegg(playerName, token);
                this.saveTimer = 0;
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
                    this.savegg(playerName, data.token);
                    this.saveTimer = 0;
                  } else {
                    console.error("❌ Error al recibir token:", data);
                  }
                })
                .catch(err => console.error("❌ Error de red al obtener token:", err));
              }


            }
          }
          
        }


        // cargando datos

        this.textoMoneda.setText(this.moneda);

    
  
  
        // guardando posicion
        this.previousPosition = { x: this.player.x, y: this.player.y };

          
        this.posicionplayerx = this.player.x;
        this.posicionplayery = this.player.y;
  
  
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
    
    
      let dx = 0, dy = 0;

      // Dirección del movimiento
      if (this.cursors.left.isDown) dx = -1;
      if (this.cursors.right.isDown) dx = 1;
      if (this.cursors.up.isDown) dy = -1;
      if (this.cursors.down.isDown) dy = 1;

      // Normaliza la velocidad en movimiento diagonal
      if (dx !== 0 && dy !== 0) {
        dx /= Math.sqrt(2);
        dy /= Math.sqrt(2);
      }

      // Aplica el movimiento
      this.player.x += dx * this.speed;
      this.player.y += dy * this.speed;

      // Si no se mueve, detiene animación y muestra el frame correcto
      if (dx === 0 && dy === 0) {
        this.player.anims.stop();

        // Mostrar la textura según la última dirección
        if (this.lastDirection === "left") {
          this.player.setTexture('player_left_1');
        } else if (this.lastDirection === "right") {
          this.player.setTexture("player_right_1");
        }
      } else {
        // Si se mueve, elige animación por dirección
        if (dx < 0) {
          this.player.anims.play("left", true);
          this.lastDirection = "left";
        } else if (dx > 0) {
          this.player.anims.play("right", true);
          this.lastDirection = "right";
        } else if (dy !== 0) {
          // Si solo se mueve en Y, usar la última dirección conocida
          if (this.lastDirection === "left") {
            this.player.anims.play("left", true);
          } else {
            this.player.anims.play("right", true);
          }
        }
      }

  
      // Obtener las coordenadas en el mapa
      const mapX = Math.floor(this.player.x / this.map.tileWidth); // Coordenada X en tiles
      const mapY = Math.floor(this.player.y / this.map.tileHeight); // Coordenada Y en tiles
  
      // rectangulo de player
  
      
      // En el método create, crea el rectángulo del jugador:
      this.playerRect = new Phaser.Geom.Rectangle(this.player.x - 15, this.player.y + 25, 30, 15);
  
      // Actualiza la posición del rectángulo del jugador con base en la posición actual de this.player
      this.playerRect.setTo(this.player.x - 15, this.player.y + 25, 30, 15);
  
      // Limpia el graphics y redibuja el rectángulo del jugador
      this.graphics.clear();
      this.graphics.strokeRectShape(this.playerRect);
      this.graphics.setVisible(false);
  
      // Comprueba la colisión entre el rectángulo del jugador y cada rectángulo de la capa de colisión.
      // Asegúrate de que 'this.collisionRectangles' contiene cada rectángulo de la capa (por ejemplo, extraídos de Tiled)

      /*
      this.collisionRectangles.forEach(rect => {
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.playerRect, rect)) {
          console.log("¡Colisión detectada!");
          this.player.x = this.previousPosition.x;
          this.player.y = this.previousPosition.y;
          this.player.anims.stop();
        }
      });
  
      this.collisionRectangles1.forEach(rect1 => {
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.playerRect, rect1)) {
          console.log("¡Colisión detectada!");
          this.player.anims.stop();
        }
      });

      */

      this.collisionRectangles2.forEach(rect => {
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.playerRect, rect)) {
          console.log("¡Colisión detectada!");
          this.player.x = this.previousPosition.x;
          this.player.y = this.previousPosition.y;
          this.player.anims.stop();
        }
      });

        
      this.collisionRectangles1.forEach(rect1 => {
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.playerRect, rect1)) {
          console.log("¡Colisión detectada!");
          this.player.anims.stop();
          
          

          this.inicio = 1;

          // aparicion del personaje
          if (this.inicio === 1) {
            this.scene.stop();
            //this.player.setPosition(708, 514);  // Usar setPosition en lugar de asignación directa
            this.posicionplayerx = 1647;
            this.posicionplayery = 1535;
            this.inicio = 0;
            this.mundo = 1;


            
            const token = localStorage.getItem("jwt");
            const playerName = localStorage.getItem("playerName") || this.playerName;

            if (token && this.tokenValido(token)) {
              // ✅ Token aún válido, usarlo directamente
              this.savegg(playerName, token);
              this.saveTimer = 0;
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
                  this.savegg(playerName, data.token);
                  this.saveTimer = 0;
                } else {
                  console.error("❌ Error al recibir token:", data);
                }
              })
              .catch(err => console.error("❌ Error de red al obtener token:", err));
            }

          }

          
          
          document.getElementById('textoParrafo').style.display = 'none';
          document.getElementById('textoParrafo2').style.display = 'none';
          document.getElementById('cantidad').style.display = 'none';
          document.getElementById('vender-btn').style.display = 'none';

          // Cancelar el timeout automáticamente al salir de la escena
          this.events.on('shutdown', () => {
            if (this.abortController) this.abortController.abort();
          });

          delete this.mostrarObjetoEnCursor;

          


          this.scene.start("LoadingScenegame");

        }
      });



  // Verificando Intrusos

  /*

      

      // Bandera para saber si se detectó la consola abierta
      this.isConsoleOpen = false;
      // Técnica 1: Verificación por cambio de dimensiones de la ventana
      this.time.addEvent({
          delay: 1000,
          loop: true,
          callback: this.checkConsoleDimensions,
          callbackScope: this
      });
      // Técnica 2: Usando un getter en un objeto que se imprime en la consola
      this.setupConsoleDetection();

      */






      this.usuariox.setText(this.usuarioxx);
      this.usuariox.setPosition(this.player.x, this.player.y - 60);
  

      
    // barra de energia

    
    this.deltaSeconds = delta / 1000; // Convertir delta a segundos

    // Si se presiona la tecla "Z", la barra se gasta a razón de 5% por segundo
    if (this.keyZ.isDown) {
      this.progress -= 0.05 * this.deltaSeconds;
    } else {
        // De lo contrario, se recarga a 5% por segundo
        this.progress += 0.05 * this.deltaSeconds;
    }
    // Asegurarse de que progress se mantenga entre 0 y 1
    this.progress = Phaser.Math.Clamp(this.progress, 0, 1);

    // Limpiar la graphics para redibujar la barra
    this.graphicsBar.clear();

    // Dibujar la base gris (barra vacía)
    this.graphicsBar.fillStyle(0x808080, 1);
    this.graphicsBar.fillRect(this.barX, this.barY, this.maxWidth, this.barHeight);

    // Dibujar la barra de progreso en amarillo (relleno proporcional)
    this.graphicsBar.fillStyle(0xffff00, 1);
    this.graphicsBar.fillRect(this.barX, this.barY, this.maxWidth * this.progress, this.barHeight);

    // Dibujar un contorno opcional en negro
    this.graphicsBar.lineStyle(2, 0x000000);
    this.graphicsBar.strokeRect(this.barX, this.barY, this.maxWidth, this.barHeight);

    // Mostrar la barra solo cuando se presiona la tecla "Z"
    if (this.keyZ.isDown) {
      this.graphicsBar.setVisible(true);

      if (this.progress <= 0.0) {
        this.speed = 2.7;
        this.player.anims.msPerFrame = 111;
      } else {
        
        this.speed = 4.5;
        this.player.anims.msPerFrame = 65;

      }

    } else {
      this.graphicsBar.setVisible(false);
      this.speed = 2.7;
      this.player.anims.msPerFrame = 111;
    }

    //console.log("Progreso: " + Math.round(this.progress * 100) + "%");
    this.botax.setText(Math.round(this.progress * 100) + '%');


      

      // Actualizar el texto con las coordenadas
      this.coordinatesText.setText(
        `Posición: X: ${this.player.x.toFixed(2)} Y: ${this.player.y.toFixed(2)} | Mapa: X: ${mapX} Y: ${mapY}`
      );
    }
  
  }