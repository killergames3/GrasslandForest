class tiendajuego extends Phaser.Scene {
    constructor(scene) {
      super({ key: "tiendajuego" });
  
    }
  
    preload() {

      this.elipeticiones = 0; 

      if (this.elipeticiones === 0) {
          
        this.serverclient = 'http://192.168.100.221:3000';
        //this.serverclient = 'https://bgrassland-production.up.railway.app';
        
      } else {
          
        //this.serverclient = 'http://192.168.100.221:3000';
        this.serverclient = 'https://bgrassland-production.up.railway.app';

      }

      this.zoom = false;


      // Cargar recursos
      this.textures.remove('tiles');

      if (this.textures.exists('tiles')) {
        this.textures.remove('tiles');
      }

      this.load.image('tiles', './Game/MAPAS/tiles2.png');
      this.load.image('tiles1', './Game/MAPAS/Tileset_Road.png');
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

      
    // perfiles de estadisticas
      
      this.load.image('Perfil1', './Game/Source/Perfil_Reputacion/1.png');
      this.load.image('Perfil2', './Game/Source/Perfil_Reputacion/2.png');
      this.load.image('Perfil3', './Game/Source/Perfil_Reputacion/3.png');
      this.load.image('Perfil4', './Game/Source/Perfil_Reputacion/4.png');

      this.load.image('Perfils1', './Game/Source/Perfil_stadisticas/1.png');
      this.load.image('Perfils2', './Game/Source/Perfil_stadisticas/2.png');
      this.load.image('Perfils3', './Game/Source/Perfil_stadisticas/3.png');
      this.load.image('Perfils4', './Game/Source/Perfil_stadisticas/4.png');

  
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
  
      this.cofreAbierto = false;
      this.inventarioAbierto = false;


      this.selecciontienda = 1001;

      this.activobotonespanel = true;


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
      
      // Configurar cámara
      this.cameras.main.setZoom(2);
      this.cameras.main.zoomTo(1, 2000);
      this.cameras.main.once('camerazoomcomplete', () => {

        // mostrando botones de reputacion y estadisticas y mas
        
        console.log('Zoom terminado después de 3 segundos');

        document.getElementById('game-hud').classList.remove('hud-hidden');
        document.getElementById('game-hud').classList.add('hud-visible');

        document.getElementById('info-text').textContent = `${this.moneda} GL`;


        // mostrando casillas

        const slots = document.querySelectorAll('.quick-slot');
        slots.forEach(slot => {
          slot.style.display = 'block'; // o 'flex' si antes usabas flex
        });

        // mostrando bota y su contador
        document.getElementById('quest-button').style.display = 'block';


        // mostrando hub de vida,agua y comida


        document.getElementById('hub').classList.remove('hidden');

        this.actualizarImagenJugador('./Game/Sprites/Perfil/Perfil.png');

        this.actualizarNombreUsuario(`${this.currentAccount.slice(0, 6)}...${this.currentAccount.slice(-4)}`);
        this.actualizarBarraVida(this.vidaPorcentaje);
        this.actualizarBarraAgua(this.aguaPorcentaje);
        this.actualizarBarraComida(this.comidaPorcentaje);

        // mostrando chat

        this.time.delayedCall(100, this.setupChatButton, [], this);

        // mochila y letra i

        
        document.getElementById('hud-containerx2').style.display = 'block';

        // coordenadas

        document.getElementById('game-ui-text').style.display = 'block';



      });
      this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
      this.cameras.main.setRoundPixels(true);

      // Coloca al jugador en su posición deseada antes de seguirlo
      this.player.setPosition(200, 300); // Cambiá por la posición inicial que quieras

      // Inicia el follow, pero la cámara está aún en negro
      this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

      // Esperar a que la cámara termine de posicionarse (ajustá el delay si es muy rápido o lento)
      this.time.delayedCall(800, () => {
        // Ahora sí, mostrar el fade in
        this.cameras.main.fadeIn(2000, 0, 0, 0);
                
      });
      // Guarda referencias si las usás más tarde
      this.cam = this.cameras.main;
      this.cam_ancho = this.cam.width;
      this.cam_alto = this.cam.height;


    // boton personaje
    const boton3 = this.add.image(790, 210, 'NPCtiendas')
        .setInteractive()
        .setDepth(0)
        .setDisplaySize(38, 90);

        // boton personaje
    const boton4 = this.add.image(757, 712, 'NPCtiendas')
        .setInteractive()
        .setDepth(0)
        .setDisplaySize(38, 90);
    // Crear el panel, pero oculto al inicio

      // objetos
      
    const imageMapping = {
      mostradorx: {
        spriteKey: 'mostrador_png',
        targetProp: 'sprite_mostrador'          
      },      
      mostradorx2: {
        spriteKey: 'mostrador_png',
        targetProp: 'sprite_mostrador2'          
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
      alfombra_2: {
        spriteKey: 'alfombra',
        targetProp: 'alfombra_2x'          
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

      this.npcx1 = this.add.text(755, 650, 'Franklin Vesh', {
        fontFamily: '"PressStart2P"',
        fontSize: '12px',
        color: '#ffffff',
        resolution: 4,
      });
      this.npcx1.setOrigin(0.5);



      // barra de energia

      this.progress = 1;           // Valor actual de la barra (1 = 100%)
      this.maxWidth = 300;       // Ancho total de la barra
      this.barHeight = 10;       // Altura de la barra
      this.barX = this.phaser_ancho / 2 - 145;           // Posición X de la barra
      this.barY = this.phaser_largo - 75;            // Posición Y de la barra


      this.keyZ;                   // Referencia a la tecla "Z"


      // Crear la referencia para la tecla "Z"
      this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

  
  
  
  
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
  
      this.izquierdaani = false;
      this.derechaani = false;
      this.abajoani = false;
      this.arribaani = false;
  
  

    document.querySelector('.inner-btn').addEventListener('click', () => {
      console.log('dashboar');
    });


    // Dentro del método create() de tu escena:
    const self = this;
    const botones = document.querySelectorAll('.round-btn');

    botones[0].addEventListener('click', () => {
      if (!this.activobotonespanel) return;  
      self.zoom = !self.zoom;
      if (self.zoom == false) {
        self.cameras.main.zoomTo(1, 2000);
      } else {
        self.cameras.main.zoomTo(0.8, 2000);
      }
    });

    botones[1].addEventListener('click', () => {
      if (!this.activobotonespanel) return;  
          const estadisticas = [
            { imagen: './Game/Source/Perfil_stadisticas/1.png', name: 'Nivel del Personaje', nivel: `Nivel : ${this.nivel} , exp : ${this.nivel_exp}` },
            { imagen: './Game/Source/Perfil_stadisticas/2.png', name: 'Nivel Sabiduría', nivel: `Nivel : ${this.sabiduria} , exp : ${this.sabiduria_exp}` },
            { imagen: './Game/Source/Perfil_stadisticas/3.png', name: 'Nivel de Fuerza', nivel: `Nivel : ${this.fuerza} , exp : ${this.fuerza_exp}` },
            { imagen: './Game/Source/Perfil_stadisticas/4.png', name: 'Nivel de Agricultura', nivel: `Nivel : ${this.agricultura} , exp : ${this.agricultura_exp}` }
          ];

          this.mostrarPanelEstadisticas(estadisticas);
    });

    botones[2].addEventListener('click', () => {
      if (!this.activobotonespanel) return;  
      
          this.mostrarPanelReputacion([
            { nombre: "Granjero Joe", reputacion: "buena", imagen: "./Game/Source/Perfil_Reputacion/1.png" },
            { nombre: "Herrero Jack", reputacion: "buena", imagen: "./Game/Source/Perfil_Reputacion/2.png" },
            { nombre: "Alquimista Colin", reputacion: "buena", imagen: "./Game/Source/Perfil_Reputacion/3.png" },
            { nombre: "Guardian Rurik", reputacion: "buena", imagen: "./Game/Source/Perfil_Reputacion/4.png" }
          ]);
    });


    document.getElementById('cerrarReputacion').addEventListener('click', () => {
      this.ocultarPanelReputacion();
    });

    document.getElementById('cerrarEstadisticas').addEventListener('click', () => {
      this.ocultarPanelEstadisticas();
    });

    this.input.keyboard.on('keydown-R', () => {
      if (!this.activobotonespanel) return;  

          this.mostrarPanelReputacion([
            { nombre: "Granjero Joe", reputacion: "buena", imagen: "./Game/Source/Perfil_Reputacion/1.png" },
            { nombre: "Herrero Jack", reputacion: "buena", imagen: "./Game/Source/Perfil_Reputacion/2.png" },
            { nombre: "Alquimista Colin", reputacion: "buena", imagen: "./Game/Source/Perfil_Reputacion/3.png" },
            { nombre: "Guardian Rurik", reputacion: "buena", imagen: "./Game/Source/Perfil_Reputacion/4.png" }
          ]);
    });
    
    this.input.keyboard.on('keydown-E', () => {
      if (!this.activobotonespanel) return;  

          const estadisticas = [
            { imagen: './Game/Source/Perfil_stadisticas/1.png', name: 'Nivel del Personaje', nivel: `Nivel : ${this.nivel} , exp : ${this.nivel_exp}` },
            { imagen: './Game/Source/Perfil_stadisticas/2.png', name: 'Nivel Sabiduría', nivel: `Nivel : ${this.sabiduria} , exp : ${this.sabiduria_exp}` },
            { imagen: './Game/Source/Perfil_stadisticas/3.png', name: 'Nivel de Fuerza', nivel: `Nivel : ${this.fuerza} , exp : ${this.fuerza_exp}` },
            { imagen: './Game/Source/Perfil_stadisticas/4.png', name: 'Nivel de Agricultura', nivel: `Nivel : ${this.agricultura} , exp : ${this.agricultura_exp}` }
          ];

          this.mostrarPanelEstadisticas(estadisticas);
    });




    // Llamar a la función de carga de datos del jugador al iniciar el juego

    


    this.saveTimer = 0;
    this.sceneActive = true; // Asegúrate de que la escena esté activa


    /*
        // Ejemplo 1: Agregar 1 semilla (item_1)
        const exito1 = this.addItemWithCheck("item_1", 1);
        if (!exito1) {
          console.warn("❗ No pude agregar item_1 porque no hay espacio.");
        }

        // Ejemplo 2: Agregar 12 unidades de tijeras (item_3)
        const exito2 = this.addItemWithCheck("item_3", 12);
        if (exito2) {
          console.log("✔ 12 tijeras agregadas correctamente.");
        } else {
          console.warn("❗ No hay espacio suficiente para agregar 12 tijeras.");
        }

      */




        this.itemsData = [
          { name: "Semilla", price: 10, img: "./Game/Source/recurso.png" , stock: 0 },
          { name: "Regadera", price: 25, img: "./Game/Source/recurso2.png" , stock: 0 },
          { name: "Tijeras", price: 15, img: "./Game/Source/tijeras.png" , stock: 0 }
          
        ];
        
        // lots de control de ventas y compras segun el orden de lista

        this.lotx1 = "Semilla";
        this.lotx2 = "Regadera";
        this.lotx3 = "Tijeras";

        // ─────────────────────────────────────────────────────────
        // Carácter global de las definiciones de ítems
        this.ItemDefinitions = {
          Semillax: { src: "./Game/Source/recurso.png", maxStack: 10 },
          Regaderax: { src: "./Game/Source/recurso2.png", maxStack: 5 },
          Tijerasx: { src: "./Game/Source/tijeras.png", maxStack: 20 }
          // Agrega más definiciones según sea necesario
        };

        // ─────────────────────────────────────────────────────────

        // this.authenticate(); pedimos otro token


        this.initialize();

        this.STATE = {
          slots: Array(40).fill(null),
          quickSlots: Array(7).fill(null),
          selectedItem: null
        };

        // 1) Inicializar inventario y quick-slots
        this.initInventory();

        // 2) Escuchar tecla “I” para abrir/cerrar inventario
        this.input.keyboard.on('keydown-I', () => {
          this.toggleInventory();
        });

        /*

        // 3) Ejemplo: agregar ítems al inventario (por ID solamente)
        this.addItem("item_1");
        this.addItem("item_1");
        this.addItem("item_2");
        this.addItem("item_3");

        */

        // 4) Botón de cerrar inventario (HTML Overlay)
        document.querySelector('#inventory-panel .cerrar-hud')
          .addEventListener('click', () => {
            this.hideInventory();
          });



















          /*
 // 1) Crear un contenedor (“Container”) para el botón, con fondo y texto.
    //    Así podemos ajustar posicionamiento y usar setInteractive().
    const btnWidth = 40;
    const btnHeight = 40;
    const margin = 20;

    // Crear un Graphics para el rectángulo de fondo:
    const graphics = this.add
      .graphics()
      .fillStyle(0x2c3e50, 1)           // color #2c3e50
      .fillRoundedRect(0, 0, btnWidth, btnHeight, 4);

    // Crear texto “🛒” en el centro del rectángulo:
    const iconText = this.add
      .text(btnWidth / 2, btnHeight / 2, "🛒", {
        fontSize: "20px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    // Meter ambos en un Container:
    this.shopToggleBtn = this.add
      .container(
        this.scale.width - btnWidth / 2 - margin, // X:  (anchoPantalla - anchoBotón/2 - margen)
        btnHeight / 2 + margin                      // Y:  (altoBotón/2 + margen)
      )
      .setDepth(2) // para que quede por encima de todo

    this.shopToggleBtn.add([graphics, iconText]);

    // Hacer interactivo el fondo del botón:
    graphics.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, btnWidth, btnHeight),
      Phaser.Geom.Rectangle.Contains
    );
    */
// 2) Listener para el clic/tap en Phaser
boton3.on("pointerdown", () => {
  //console.log("hiciste click al npc");

  // Semillax
  const counts0 = this.countItem("Semillax");
  //console.log("Semillax total:", counts0.total);
  const Semilla = this.itemsData.find(item => item.name === "Semilla");
  if (Semilla) {
    Semilla.stock = counts0.total;
    console.log("Stock actualizado Semilla:", Semilla.stock);
  }

  // Regaderax
  const counts = this.countItem("Regaderax");
  //console.log("Regaderax total:", counts.total);
  const regadera = this.itemsData.find(item => item.name === "Regadera");
  if (regadera) {
    regadera.stock = counts.total;
    console.log("Stock actualizado Regadera:", regadera.stock);
  }

  // Tijerasx
  const counts1 = this.countItem("Tijerasx");
  //console.log("Tijerasx total:", counts1.total);
  const Tijeras = this.itemsData.find(item => item.name === "Tijeras");
  if (Tijeras) {
    Tijeras.stock = counts1.total;
    console.log("Stock actualizado Tijeras:", Tijeras.stock);
  }

  // Re-render de la lista
  if (this.searchInput) {
    this.searchInput.dispatchEvent(new Event("input"));
  }

  // Abrir/cerrar el panel
  const shopEl = document.getElementById("shopContainer");
  if (shopEl) {
    shopEl.classList.toggle("open");
    actualizarBalance();

    if (shopEl.classList.contains("open")) {
      console.log("Panel abierto");
      this.activobotonespanel = false;
    } else {
      console.log("Panel cerrado");
      this.activobotonespanel = true;
    }
  } else {
    console.warn("No se encontró #shopContainer en el DOM");
  }
});

// 1) Asignar listener al botón “closeBalanceBtn”
const closeBtn = document.getElementById("closeBalanceBtn");
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    const shopEl = document.getElementById("shopContainer");
    if (shopEl) {
      shopEl.classList.toggle("open");
      actualizarBalance();

      if (shopEl.classList.contains("open")) {
        console.log("Panel abierto");
        this.activobotonespanel = false;
      } else {
        console.log("Panel cerrado");
        this.activobotonespanel = true;
      }
    } else {
      console.warn("No se encontró #shopContainer en el DOM");
    }
  });
} else {
  console.warn("No se encontró #closeBalanceBtn en el DOM");
}





    
      boton4.on("pointerdown", () => {
        this._attachEventListeners();
        this._initialLoad()
          .then(() => {
            

            // Directamente aquí:
            if (this.dom.panel.classList.toggle("open")) {
              console.log("Panel abierto");
                this.activobotonespanel = false;
                this.refreshAll();
                this.startAutoRefresh(1000);
            } else {
              console.log("Panel cerrado");
              this.activobotonespanel = true;
              this.stopAutoRefresh();
            }
          })
          .catch(err => console.error("Error en inicialLoad:", err));
      });



  /*

    // 3) (Opcional) Si quieres que el botón cambie de color al pasar el mouse:
    graphics.on("pointerover", () => {
      graphics.clear();
      graphics.fillStyle(0x34495e, 1); // color un poco más claro
      graphics.fillRoundedRect(0, 0, btnWidth, btnHeight, 4);
    });
    graphics.on("pointerout", () => {
      graphics.clear();
      graphics.fillStyle(0x2c3e50, 1);
      graphics.fillRoundedRect(0, 0, btnWidth, btnHeight, 4);
    });

    

    // 4) Si tu canvas de Phaser cambia de tamaño (responsive), 
    //    puedes volver a posicionar el botón en `resize`:
    this.scale.on("resize", (gameSize) => {
      const { width, height } = gameSize;
      this.shopToggleBtn.setPosition(
        width - btnWidth / 2 - margin,
        btnHeight / 2 + margin
      );
    });

    */



    // Tasas de comisión (por ejemplo: 10% en compra, 5% en venta)
    this.comisionCompra = 0.10; // 10%
    this.comisionVenta = 0.05;  // 5%

    // Función para actualizar en el DOM el texto del balance
    const balanceEl = document.getElementById("balanceText");
    const actualizarBalance = () => {
      if (balanceEl) {
        balanceEl.textContent = this.moneda;
      }
    };
    // Mostrar saldo inicial
    actualizarBalance();



    // Por simplicidad, definimos un arreglo local. En tu juego, podrías traerlos desde
    // un JSON, base de datos o lo que tengas.

    // —————————————————————————————————————————————————————
    // 4) REFERENCIAS A ELEMENTOS DEL DOM (TIENDA Y MINI-MENU)
    // —————————————————————————————————————————————————————

    this.searchInput = document.getElementById("searchInput");
    this.itemsList = document.getElementById("itemsList");
    this.overlay = document.getElementById("overlay");
    this.miniMenu = document.getElementById("miniMenu");
    this.closeMiniMenuBtn = document.getElementById("closeMiniMenu");
    this.miniItemImage = document.getElementById("miniItemImage");
    this.decreaseQtyBtn = document.getElementById("decreaseQty");
    this.increaseQtyBtn = document.getElementById("increaseQty");
    this.quantityText = document.getElementById("quantityText");
    this.totalInfo = document.getElementById("totalInfo");
    this.confirmActionBtn = document.getElementById("confirmActionBtn");

    // Variables de estado del mini menú
    this.currentAction = null; // "buy" ó "sell"
    this.currentItem = null;
    this.currentQty = 1;

    // —————————————————————————————————————————————————————
    // 5) RENDERIZAR LISTA DE ÍTEMS CON FILTRADO
    // —————————————————————————————————————————————————————

    const renderItems = (filter = "") => {
      if (!this.itemsList) return;
      this.itemsList.innerHTML = "";
      const filtroLower = filter.trim().toLowerCase();

      this.itemsData.forEach((item) => {
        if (item.name.toLowerCase().includes(filtroLower)) {
          const itemDiv = document.createElement("div");
          itemDiv.classList.add("shop-item");
          itemDiv.dataset.name = item.name;
          itemDiv.dataset.price = item.price;
          itemDiv.dataset.img = item.img;
          itemDiv.dataset.stock = item.stock;

          // Imagen del ítem
          const imgEl = document.createElement("img");
          imgEl.classList.add("item-image");
          imgEl.src = item.img;
          imgEl.alt = item.name;

          // Info (nombre + precio)
          const infoDiv = document.createElement("div");
          infoDiv.classList.add("item-info");
          const nameSpan = document.createElement("span");
          nameSpan.classList.add("item-name");
          nameSpan.textContent = item.name;
          const priceSpan = document.createElement("span");
          priceSpan.classList.add("item-price");
          priceSpan.textContent = `Precio: ${item.price}`;
          infoDiv.appendChild(nameSpan);
          infoDiv.appendChild(priceSpan);

          // Botones
          const actionsDiv = document.createElement("div");
          actionsDiv.classList.add("item-actions");
          const buyBtn = document.createElement("button");
          buyBtn.classList.add("buy-btn");
          buyBtn.textContent = "Comprar";
          const sellBtn = document.createElement("button");
          sellBtn.classList.add("sell-btn");
          sellBtn.textContent = "Vender";

          actionsDiv.appendChild(buyBtn);
          actionsDiv.appendChild(sellBtn);

          itemDiv.appendChild(imgEl);
          itemDiv.appendChild(infoDiv);
          itemDiv.appendChild(actionsDiv);
          this.itemsList.appendChild(itemDiv);

          // Eventos para Comprar / Vender
          buyBtn.addEventListener("click", () => {
            this.abrirMiniMenu("buy", item);
          });
          sellBtn.addEventListener("click", () => {
            this.abrirMiniMenu("sell", item);
          });
        }
      });
    };

    // Filtrado en tiempo real
    if (this.searchInput) {
      this.searchInput.addEventListener("input", (e) => {
        renderItems(e.target.value);
      });
    }

    // Render inicial (vacío si no hay filtro)
    renderItems();

    // —————————————————————————————————————————————————————
    // 6) LÓGICA DEL MINI-MENÚ (COMPRA / VENTA)
    // —————————————————————————————————————————————————————

    // Función auxiliar para calcular costo/ganancia según acción y qty
    const calcularTotales = () => {
      if (!this.currentItem || this.currentQty < 1) return;

      const precioUnit = this.currentItem.price;
      const qty = this.currentQty;

      if (this.currentAction === "buy") {
        // Comisión de compra
        const comisionUnit = precioUnit * this.comisionCompra;
        const precioConComision = precioUnit + comisionUnit;
        const costoTotal = precioConComision * qty;

        // Mostrar en mini menú
        this.totalInfo.textContent = `Costo unitario: ${precioUnit} + comisión ${comisionUnit.toFixed(
          2
        )} = ${precioConComision.toFixed(
          2
        )}  ⇒  Total x ${qty}: ${costoTotal.toFixed(2)}`;

        // ¿Hay suficiente saldo?
        if (costoTotal > this.moneda) {
          this.totalInfo.classList.add("insufficient");
          this.confirmActionBtn.classList.add("disabled");
          this.confirmActionBtn.disabled = true;
        } else {
          this.totalInfo.classList.remove("insufficient");
          this.confirmActionBtn.classList.remove("disabled");
          this.confirmActionBtn.disabled = false;
        }
      } else {
        // VENTA
        // Comision de venta
        const comisionUnit = precioUnit * this.comisionVenta;
        // Ganancia neta por unidad
        const gananciaNetUnit = precioUnit - comisionUnit;
        const gananciaTotal = gananciaNetUnit * qty;

        this.totalInfo.textContent = `Precio unitario: ${precioUnit} – comisión ${comisionUnit.toFixed(
          2
        )} = ${gananciaNetUnit.toFixed(
          2
        )}  ⇒  Ganancia x ${qty}: ${gananciaTotal.toFixed(2)}`;

        // ¿Hay stock en el jugador para vender?
        if (qty > this.currentItem.stock) {
          this.totalInfo.classList.add("insufficient");
          this.confirmActionBtn.classList.add("disabled");
          this.confirmActionBtn.disabled = true;
        } else {
          this.totalInfo.classList.remove("insufficient");
          this.confirmActionBtn.classList.remove("disabled");
          this.confirmActionBtn.disabled = false;
        }
      }
    };

    // Abrir mini menú (compra o venta)
    this.abrirMiniMenu = (action, item) => {
      this.currentAction = action; // "buy" o "sell"
      this.currentItem = item;
      this.currentQty = 1;
      if (this.quantityText) this.quantityText.textContent = this.currentQty;
      if (this.miniItemImage) this.miniItemImage.src = item.img;

      // Cambiar texto del botón según acción
      if (this.confirmActionBtn) {
        this.confirmActionBtn.textContent =
          action === "buy" ? "Comprar" : "Vender";
      }

      // Calcular y mostrar totales
      calcularTotales();

      // Mostrar el mini menú
      if (this.overlay) this.overlay.classList.add("active");
    };

    // Cerrar mini menú
    if (this.closeMiniMenuBtn) {
      this.closeMiniMenuBtn.addEventListener("click", () => {
        this.overlay.classList.remove("active");
      });
    }

    // Control “+” de cantidad
    if (this.increaseQtyBtn) {
      this.increaseQtyBtn.addEventListener("click", () => {
        this.currentQty++;
        this.quantityText.textContent = this.currentQty;
        calcularTotales();
      });
    }

    // Control “–” de cantidad
    if (this.decreaseQtyBtn) {
      this.decreaseQtyBtn.addEventListener("click", () => {
        if (this.currentQty > 1) {
          this.currentQty--;
          this.quantityText.textContent = this.currentQty;
          calcularTotales();
        }
      });
    }

    // Confirmar acción (Comprar o Vender)
    if (this.confirmActionBtn) {
      this.confirmActionBtn.addEventListener("click", () => {
        if (!this.currentItem || !this.currentAction) return;

        const precioUnit = this.currentItem.price;
        const qty = this.currentQty;

        if (this.currentAction === "buy") {
          const comisionUnit = precioUnit * this.comisionCompra;
          const costoUnit = precioUnit + comisionUnit;
          const costoTotal = costoUnit * qty;

          // Descontar moneda
          this.moneda -= costoTotal;

          // Aumentar stock del jugador (opcional)
          this.currentItem.stock += qty;

          console.log(
            `Comprando ${qty}×${this.currentItem.name}.\nPrecio unitario: ${precioUnit}, comisión: ${comisionUnit.toFixed(
              2
            )}, total: ${costoTotal.toFixed(2)}.\nSaldo restante: ${this.moneda.toFixed(
              2
            )}`
          );



          if (this.currentItem.name == "Semilla") {
            if (!this.addItemWithCheck("Semillax", qty)) {
              console.log("No cupo todo en quickSlots + slots");
            }
          }
          
          if (this.currentItem.name == "Regadera") {
            if (!this.addItemWithCheck("Regaderax", qty)) {
              console.log("No cupo todo en quickSlots + slots");
            }
          }

          
          if (this.currentItem.name == "Tijeras") {
            if (!this.addItemWithCheck("Tijerasx", qty)) {
              console.log("No cupo todo en quickSlots + slots");
            }
          }

        } else {
          // Venta
          const comisionUnit = precioUnit * this.comisionVenta;
          const gananciaNetUnit = precioUnit - comisionUnit;
          const gananciaTotal = gananciaNetUnit * qty;

          // Sumar moneda
          this.moneda += gananciaTotal;

          // Disminuir stock del jugador
          this.currentItem.stock -= qty;







          console.log(
            `Vendiendo ${qty}×${this.currentItem.name}.\nPrecio unitario: ${precioUnit}, comisión: ${comisionUnit.toFixed(
              2
            )}, ganancia neta total: ${gananciaTotal.toFixed(
              2
            )}.\nSaldo actualizado: ${this.moneda.toFixed(2)}`
          );

          if (this.currentItem.name == "Semilla") {
            if (!this.removeItemWithCheck("Semillax", qty)) {
              console.log(`No había suficientes para quitar ${qty} unidades`);
            }
          }


          if (this.currentItem.name == "Regadera") {
            if (!this.removeItemWithCheck("Regaderax", qty)) {
              console.log(`No había suficientes para quitar ${qty} unidades`);
            }
          }


          if (this.currentItem.name == "Tijeras") {
            if (!this.removeItemWithCheck("Tijerasx", qty)) {
              console.log(`No había suficientes para quitar ${qty} unidades`);
            }
          }


        }

        // Actualizar balance en pantalla
        actualizarBalance();

        // Cerrar mini menú
        this.overlay.classList.remove("active");

        // Volver a renderizar lista de ítems para reflejar nuevo stock
        renderItems(this.searchInput.value);
      });
    }










    // —————— PROPIEDADES DE AuctionMarket ——————
    // (Originalmente estaban en constructor(apiBaseUrl, phaserScene))
    this.apiBase         = this.serverclient;
    this.phaserScene     = this;           // en este caso, apuntamos a la propia escena
    this.playerMoneda    = 0;
    this.playerInventory = [];
    this.listings        = [];
    this.filteredType    = "all";
    this.searchTerm      = "";

  this.itemImageMap = {
    // inventoryId: ruta de imagen relativa a este JS/HTML
    "Semilla":    "./Game/Source/recurso.png",
    "Regadera":    "./Game/Source/recurso2.png",
    "Tijeras":    "./Game/Source/tijeras.png",
    // Si quisieras usar `type` en lugar de inventoryId, podrías hacer algo como:
    // "cofre":  "assets/items/chest-default.png",
    // "semilla": "assets/items/seeds.png",
    // "herramienta": "assets/items/tools.png",
    // ...
  };

    // Tasas de comisión:
    this.commissionRates = {
      seeds:      0.01,
      tools:      0.02,
      containers: 0.015,
      Semillax:     0.01,
      Regaderax:     0.02,
      Tijerasx:     0.015,
      default:    0.02
    };

    // Referencias a elementos del DOM (asegúrate de que existan en tu HTML)

    this.dom = {
      panel:          document.getElementById("auctionPanel"),
      btnCloseWallet: document.getElementById("btnCloseWallet"),
      walletBalance:  document.getElementById("walletBalance"),
      btnTogglePost:  document.getElementById("btnTogglePost"),
      postForm:       document.getElementById("postItemForm"),
      selectItem:     document.getElementById("selectItemToPost"),
      inputUnitPrice: document.getElementById("inputUnitPrice"),
      inputQty:       document.getElementById("inputQuantity"),
      commissionAmount: document.getElementById("commissionAmount"),
      btnPost:          document.getElementById("btnPostItem"),
      categoryButtons:  document.querySelectorAll(".category-btn"),
      inputSearch:      document.getElementById("inputSearchItem"),
      listContainer:    document.getElementById("auctionList"),
      overlayModal:     document.getElementById("overlayModal"),
      modalFields: {
        name:  document.getElementById("modalItemName"),
        type:  document.getElementById("modalItemType"),
        qty:   document.getElementById("modalItemQty"),
        price: document.getElementById("modalItemPrice"),
        owner: document.getElementById("modalOwner"),
        image: document.getElementById("modalItemImage")
      },
      btnCloseModal: document.getElementById("btnCloseModal"),
      btnDelete:     document.getElementById("btnDeleteItem"),
      btnCancel:     null,
      btnBuy:        null
    };



















  this.rebuildPlayerInventoryFromState();

    // 1) Listener para cerrar con la “X”
    this.dom.btnCloseWallet.addEventListener("click", () => {
        this._attachEventListeners();
        this._initialLoad()
          .then(() => {
            
            // Directamente aquí:
            if (this.dom.panel.classList.toggle("open")) {
              console.log("Panel abierto");
              this.activobotonespanel = false;
              this.refreshAll();
              this.startAutoRefresh(1000);
            } else {
              console.log("Panel cerrado");
              this.activobotonespanel = true;
              this.stopAutoRefresh();
            }
          })
          .catch(err => console.error("Error en inicialLoad:", err));
    });





}










  // ─────────────────────────────────────────────────────────
  // BLOQUE B: Reconstruir window.playerInventory con inventario + cofre
  rebuildPlayerInventoryFromState() {
    const inventoryArray = [];

    // 1) Recorrer INVENTARIO normal (this.STATE.slots)
    this.STATE.slots.forEach((slotObj, idx) => {
      // Verificar que no sea null ni undefined
      if (slotObj !== null && slotObj !== undefined) {
        const itemId    = slotObj.id;            
        const cantidad  = slotObj.count;         
        const tipo      = slotObj.tipo || "unknown";
        const unitPrice = slotObj.unitPrice || 0;
        const defs      = this.ItemDefinitions[itemId];
        const imageUrl  = defs && defs.src ? defs.src : "";

        /*

        console.log(
          `[INV] Slot #${idx} → id="${itemId}", tipo="${tipo}", qty=${cantidad}, image="${imageUrl}"`
        );

        */

        inventoryArray.push({
          id:        idx.toString(),  // “0”, “1”, “2” … “39”
          name:      itemId,
          type:      tipo,
          qty:       cantidad,
          unitPrice: unitPrice,
          imageUrl:  imageUrl,
          origin:    "inventory"
        });
      }
    });

    // 2) Recorrer COFRE (this.STATE.quickSlots)
    this.STATE.quickSlots.forEach((slotObj, idx) => {
      if (slotObj !== null && slotObj !== undefined) {
        const itemId    = slotObj.id;            
        const cantidad  = slotObj.count;         
        const tipo      = slotObj.tipo || "unknown";
        const unitPrice = slotObj.unitPrice || 0;
        const defs      = this.ItemDefinitions[itemId];
        const imageUrl  = defs && defs.src ? defs.src : "";

        /*

        console.log(
          `[CHEST] Slot #${idx} → id="${itemId}", tipo="${tipo}", qty=${cantidad}, image="${imageUrl}"`
        );

        */

        inventoryArray.push({
          id:        "chest-" + idx.toString(), // “chest-0”, “chest-1”, … “chest-6”
          name:      itemId,
          type:      tipo,
          qty:       cantidad,
          unitPrice: unitPrice,
          imageUrl:  imageUrl,
          origin:    "chest"
        });
      }
    });

    // 3) Exponer al nivel global para que AuctionMarket lo use
    window.playerInventory = inventoryArray;
    /*
    console.log("→ window.playerInventory reconstruido:", window.playerInventory);
    */























  }























startAutoRefresh(intervalMs = 1000) {
  // Primero, si ya existía uno previo, lo limpiamos
  if (this._refreshIntervalId) {
    clearInterval(this._refreshIntervalId);
  }

  // Guardamos el intervalo para poder pararlo luego
  this._refreshIntervalId = setInterval(async () => {
    try {
      // Vuelve a traer los listings del servidor
      await this._loadListingsFromServer();
      // (opcional) Si sólo quisieras refrescar la UI sin re-fetch:
      // this._renderListings();
    } catch (err) {
      console.error("Error auto-refrescando listings:", err);
    }
  }, intervalMs);
}

/**
 * Detiene el refresco automático.
 */
stopAutoRefresh() {
  if (this._refreshIntervalId) {
    clearInterval(this._refreshIntervalId);
    this._refreshIntervalId = null;
  }
}


  _attachEventListeners() {
    // ————— Mostrar/ocultar formulario de publicar ítem —————
    this.dom.btnTogglePost.addEventListener("click", () => {
      this.dom.postForm.classList.toggle("open");
      if (this.dom.postForm.classList.contains("open")) {
        this.dom.btnTogglePost.innerText = "Publicar ítem ▴";
        this._initialLoad()
        this.refreshAll();
      } else {
        this.dom.btnTogglePost.innerText = "Publicar ítem ▾";
        this._initialLoad()
        this.refreshAll();
      }
    });

    // ————— Filtros de categoría —————
    this.dom.categoryButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.dom.categoryButtons.forEach((b) => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.filteredType = e.currentTarget.dataset.category;
        this._renderListings();
      });
    });

    // ————— Búsqueda en tiempo real —————
    this.dom.inputSearch.addEventListener("input", (e) => {
      this.searchTerm = e.target.value.trim().toLowerCase();
      this._renderListings();
    });

    // ————— Cuando el usuario elige un ítem en el <select> —————
    this.dom.selectItem.addEventListener("change", () => {
      this._onInventoryItemSelected();
    });

    // ————— Cantidad / precio → recalcular comisión —————
    this.dom.inputQty.addEventListener("input", () => this._updateCommission());
    this.dom.inputUnitPrice.addEventListener("input", () => this._updateCommission());

    // ————— Publicar ítem —————
    this.dom.btnPost.addEventListener("click", () => this._handlePostItem());

    // ————— Cerrar modal de detalles —————
    this.dom.btnCloseModal.addEventListener("click", () => {
      this.dom.overlayModal.classList.remove("active");
    });
  }

  async refreshAll() {
    // 1) Cargar listados y renderizarlos

    this._loadListingsFromServer();
    this._populateInventorySelect();

  }
/**
 * Carga inicial de datos del jugador sin usar localStorage para token ni playerName.
 * Asume que `this.playerName` y `this.apiBase` ya están definidos,
 * y que existen métodos auxiliares `authenticate()` y `tokenValido()`,
 * además de `this.dom.walletBalance`, `this._populateInventorySelect()` y `this._loadListingsFromServer()`.
 */
async _initialLoad() {
  // 1) Validar que tengamos playerName
  if (!this.playerName) {
    console.error("Falta this.playerName en memoria. Asegúrate de inicializarla antes.");
    return;
  }

  // 2) Asegurarnos de tener un token válido
  if (!this.token || !this.tokenValido(this.token)) {
    await this.authenticate();
    if (!this.token) {
      console.error("No se pudo obtener un token válido. Abortando carga inicial.");
      return;
    }
  }

  try {
    // 3) Fetch al backend
    const resp = await fetch(
      `${this.serverclient}/load/${encodeURIComponent(this.playerName)}`,
      {
        method: 'GET',
        credentials: 'include', // para enviar la cookie HttpOnly
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      }
    );

    const data = await resp.json();
    if (!resp.ok) {
      console.error("Error al cargar datos del jugador:", data);
      // Si expiró o es inválido, reintentar autenticación y recarga
      if (data.error?.includes("Token inválido") || data.error?.includes("expirado")) {
        this.token = null;
        return this._initialLoad();
      }
      return;
    }

    // 4) Asignar y mostrar saldo
    this.playerMoneda = data.moneda ?? 0;
    this.dom.walletBalance.innerText = this.playerMoneda.toFixed(2);

    // 5) Reconstruir inventario en memoria
    this.playerInventory = [];
    const tipoMap = {
      Semillax: "Semilla",
      Regaderax: "Regadera",
      Tijerasx: "Tijeras"
    };
    // Inventario principal
    Array.isArray(data.inventory) && data.inventory.forEach(slot => {
      if (slot?.objeto && slot.cantidad > 0) {
        const name = tipoMap[slot.objeto] || slot.objeto;
        this.playerInventory.push({
          id:        slot.id.toString(),
          name,
          type:      "inventario",
          qty:       slot.cantidad,
          unitPrice: slot.unitPrice || 0,
          imageUrl:  slot.imageUrl  || ""
        });
      }
    });
    // Cofre
    Array.isArray(data.chest) && data.chest.forEach(slot => {
      if (slot?.objeto && slot.cantidad > 0) {
        const name = tipoMap[slot.objeto] || slot.objeto;
        this.playerInventory.push({
          id:        `chest-${slot.id}`,
          name,
          type:      "cofre",
          qty:       slot.cantidad,
          unitPrice: slot.unitPrice || 0,
          imageUrl:  slot.imageUrl  || ""
        });
      }
    });

    // 6) Actualizar el <select> de inventario
    this._populateInventorySelect();

    // 7) Cargar listings desde el servidor
    await this._loadListingsFromServer();

  } catch (err) {
    console.error("Error en _initialLoad():", err);
  }
}
async _loadListingsFromServer() {
  // 1) Asegurarnos de tener un token válido en memoria
  if (!this.token || !this.tokenValido(this.token)) {
    await this.authenticate();
    if (!this.token) {
      console.error("No se pudo obtener un token válido. Abortando carga de listings.");
      return;
    }
  }

  try {
    // 2) Petición al endpoint /listings
    const resp = await fetch(`${this.serverclient}/listingsx/${encodeURIComponent(this.playerName)}`, {
      method: 'GET',
      credentials: 'include', // para enviar la cookie HttpOnly
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    });

    const data = await resp.json();
    if (!resp.ok) {
      console.error("Error al cargar listings:", data);
      // Si el error es token inválido, reintentar autenticación y recarga
      if (data.error?.includes("Token inválido") || data.error?.includes("expirado")) {
        this.token = null;
        return this._loadListingsFromServer();
      }
      return;
    }

    // 3) Guardar y renderizar
    this.listings = Array.isArray(data) ? data : [];
    this._renderListings();

  } catch (err) {
    console.error("Error en _loadListingsFromServer():", err);
  }
}

  _populateInventorySelect() {
    const select = this.dom.selectItem;
    select.innerHTML = "";

    if (!this.playerInventory.length) {
      const opt = document.createElement("option");
      opt.value = "";
      opt.innerText = "-- No tienes ítems en el inventario --";
      select.appendChild(opt);
      select.disabled         = true;
      this.dom.inputUnitPrice.disabled = true;
      this.dom.inputQty.disabled       = true;
      this.dom.btnPost.disabled        = true;
      return;
    }

    const defaultOpt = document.createElement("option");
    defaultOpt.value     = "";
    defaultOpt.innerText = "— Selecciona un ítem —";
    select.appendChild(defaultOpt);

    // Agrupar por tipo
    const itemsByType = {};
    this.playerInventory.forEach((itm) => {
      if (!itemsByType[itm.type]) itemsByType[itm.type] = [];
      itemsByType[itm.type].push(itm);
    });

    Object.keys(itemsByType).forEach((type) => {
      const optgroup = document.createElement("optgroup");
      optgroup.label = type.charAt(0).toUpperCase() + type.slice(1);

      itemsByType[type].forEach((itm) => {
        const opt = document.createElement("option");
        opt.value        = itm.id; // p.ej. "0" o "chest-3"
        opt.innerText    = `${itm.name} (x${itm.qty})`;
        opt.dataset.type    = itm.type;
        opt.dataset.price   = itm.unitPrice;
        opt.dataset.maxQty  = itm.qty;
        // Ya no usamos dataset.imageUrl, porque la imagen la sacamos de itemImageMap
        // opt.dataset.imageUrl = itm.imageUrl;  // <— podemos omitirlo o dejarlo, no importa
        optgroup.appendChild(opt);
      });

      select.appendChild(optgroup);
    });

    select.disabled = false;
    this.dom.inputUnitPrice.disabled = true;
    this.dom.inputQty.disabled       = true;
    this.dom.btnPost.disabled        = true;
  }

  _onInventoryItemSelected() {
    const select     = this.dom.selectItem;
    const selectedId = select.value;
    if (!selectedId) {
      this.dom.inputUnitPrice.value    = "0.00";
      this.dom.inputUnitPrice.disabled = true;
      this.dom.inputQty.value          = "1";
      this.dom.inputQty.disabled       = true;
      this.dom.btnPost.disabled        = true;
      this.dom.commissionAmount.innerText = "0.00";
      return;
    }

    const opt         = select.selectedOptions[0];
    const itemType    = opt.dataset.type;
    const suggestedPx = parseFloat(opt.dataset.price);
    const maxQty      = parseInt(opt.dataset.maxQty, 10);

    this.dom.inputUnitPrice.disabled = false;
    this.dom.inputUnitPrice.value    = suggestedPx.toFixed(2);

    this.dom.inputQty.disabled = false;
    this.dom.inputQty.max      = maxQty;
    this.dom.inputQty.value    = "1";

    this.dom.btnPost.disabled = false;
    this._updateCommission();
  }

_updateCommission() {
  const qty       = parseInt(this.dom.inputQty.value, 10);
  const unitPrice = parseFloat(this.dom.inputUnitPrice.value);
  if (isNaN(qty) || qty < 1 || isNaN(unitPrice) || unitPrice < 0) {
    this.dom.commissionAmount.innerText = "0.00";
    return;
  }

  const totalPrice = unitPrice * qty;

  // ✅ obtener tipo desde el <option> seleccionado
  const opt = this.dom.selectItem.selectedOptions[0];
  const itemType = opt?.dataset?.type || "default";

  const rate = this.commissionRates.hasOwnProperty(itemType)
               ? this.commissionRates[itemType]
               : this.commissionRates.default;

  const commission = totalPrice * rate;
  this.dom.commissionAmount.innerText = commission.toFixed(2);
}

/**
 * Publica un ítem en el marketplace usando el token en memoria (this.token)
 * y reautenticación automática si el token ha expirado.
 */
async _handlePostItem() {
  // 1) Validar selección
  const select     = this.dom.selectItem;
  const selectedId = select.value;
  if (!selectedId) {
    //alert("Selecciona primero un ítem válido.");
    console.log("Selecciona primero un ítem válido.");
    return;
  }

  const opt       = select.selectedOptions[0];
  const itemType  = opt.dataset.type;
  const unitPrice = parseFloat(this.dom.inputUnitPrice.value);
  const maxQty    = parseInt(opt.dataset.maxQty, 10);
  const qtyToSell = parseInt(this.dom.inputQty.value, 10);

  if (isNaN(unitPrice) || unitPrice < 0) {
    //alert("Ingresa un precio unitario válido (>= 0).");
    console.log("Ingresa un precio unitario válido (>= 0).");
    return;
  }
  if (isNaN(qtyToSell) || qtyToSell < 1 || qtyToSell > maxQty) {
    //alert(`La cantidad debe estar entre 1 y ${maxQty}.`);
    console.log(`La cantidad debe estar entre 1 y ${maxQty}.`);
    return;
  }

  // 2) Extraer baseName e imagen
  const rawName = opt.innerText.split(" ")[0];
  const baseName = rawName;
  let imageUrl = this.itemImageMap[baseName] || "";
  if (!imageUrl) {
    console.warn(`No se encontró imagen para "${baseName}" en itemImageMap.`);
  }

  // 3) Determinar nombre legible (tipex)
  const tipoMap = { Semilla: "Semilla", Regadera: "Regadera", Tijeras: "Tijeras" };
  this.tipex = tipoMap[baseName] || baseName;

  // 4) Construir payload
  const bodyPayload = {
    inventoryId: selectedId,
    name:        `${this.tipex} (x${qtyToSell})`,
    type:        this.tipex,
    qty:         qtyToSell,
    price:       unitPrice,
    imageUrl:    imageUrl
  };

  // 5) Asegurar token válido / re-autenticar si es necesario
  if (!this.token || !this.tokenValido(this.token)) {
    await this.authenticate();
    if (!this.token) {
      console.error("No se pudo obtener token válido. Abortando publicación.");
      return;
    }
  }

  // 6) Enviar petición al servidor
  try {
    const resp = await fetch(`${this.serverclient}/listingsx/${encodeURIComponent(this.playerName)}`, {
      method: 'POST',
      credentials: 'include', // para cookie HttpOnly
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      body: JSON.stringify(bodyPayload)
    });
    const data = await resp.json();

    if (!resp.ok) {
      console.error("Error al publicar ítem:", data);
      // Si token expiró, reintentar automáticamente
      if (data.error?.includes("Token inválido") || data.error?.includes("expirado")) {
        this.token = null;
        return this._handlePostItem();
      }
      
      console.log("Error al publicar ítem: " + (data.error || "desconocido"));
      //alert("Error al publicar ítem: " + (data.error || "desconocido"));
      return;
    }

    // 7) Actualizar inventario local
    const idx = this.playerInventory.findIndex(itm => itm.id === selectedId);
    if (idx >= 0) {
      this.playerInventory[idx].qty -= qtyToSell;
      if (this.playerInventory[idx].qty <= 0) {
        this.playerInventory.splice(idx, 1);
      }
    }
    this._populateInventorySelect();


    


    // 8) Mostrar resumen de comisión
    const totalPrice = unitPrice * qtyToSell;
    const rate       = this.commissionRates[itemType] ?? this.commissionRates.default;
    const commission = totalPrice * rate;
    const netGain    = totalPrice - commission;





    if (this.tipex == "Semilla") {
      if (!this.removeItemWithCheck("Semillax", qtyToSell)) {
        console.log(`No había suficientes para quitar ${qtyToSell} unidades`);
      }
    }
    
    if (this.tipex == "Regadera") {
      if (!this.removeItemWithCheck("Regaderax", qtyToSell)) {
        console.log(`No había suficientes para quitar ${qtyToSell} unidades`);
      }
    }
    
    if (this.tipex == "Tijeras") {
      if (!this.removeItemWithCheck("Tijerasx", qtyToSell)) {
        console.log(`No había suficientes para quitar ${qtyToSell} unidades`);
      }
    }

      this._initialLoad()
      this.refreshAll();




    /*
    alert(
      `Ítem publicado correctamente.\n` +
      `Precio unitario: ₿ ${unitPrice.toFixed(2)}\n` +
      `Cantidad: ${qtyToSell}\n` +
      `Comisión (${(rate * 100).toFixed(1)}%): ₿ ${commission.toFixed(2)}\n` +
      `Ganancia neta potencial: ₿ ${netGain.toFixed(2)}`
    );
    */

    // 9) Recargar listings
    await this._loadListingsFromServer();

  } catch (err) {
    console.error("Error en _handlePostItem():", err);
    //alert("Error de red al publicar ítem.");
  }
}

  _filterAndSortListings() {
    let visibles = this.listings.slice();
    if (this.filteredType !== "all") {
      visibles = visibles.filter((itm) => itm.type === this.filteredType);
    }
    if (this.searchTerm) {
      visibles = visibles.filter((itm) =>
        itm.name.toLowerCase().includes(this.searchTerm)
      );
    }
    visibles.sort((a, b) => a.price - b.price);

    const agrupados = {};
    visibles.forEach((itm) => {
      if (!agrupados[itm.type]) agrupados[itm.type] = [];
      agrupados[itm.type].push(itm);
    });
    return agrupados;
  }

  _renderListings() {
    this.dom.listContainer.innerHTML = "";

    const agrupados = this._filterAndSortListings();
    const tipos = Object.keys(agrupados);
    if (!tipos.length) {
      const msg = document.createElement("p");
      msg.innerText = "No hay listings para mostrar.";
      msg.style.padding = "12px";
      msg.style.color = "#556482";
      this.dom.listContainer.appendChild(msg);
      return;
    }

    tipos.forEach((type) => {
      const sectionDiv = document.createElement("div");
      sectionDiv.classList.add("item-section");

      const title = document.createElement("div");
      title.classList.add("section-title");
      title.innerText = type.charAt(0).toUpperCase() + type.slice(1);
      sectionDiv.appendChild(title);

      agrupados[type].forEach((itm) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("auction-item");

        const leftDiv = document.createElement("div");
        leftDiv.classList.add("item-left");

        // ─────────── EXTRAER “baseName” de itm.name ───────────
        // Ej: itm.name = "item_2 (x1)"
        const nameMatch = itm.name.match(/^([^\s]+)/);
        const baseName = nameMatch ? nameMatch[1] : itm.name;
        // ───────────────────────────────────────────────────────

        // ───────── Determinar src de la imagen segun itemImageMap ─────────
        let srcImagen;
        if (itm.imageUrl && itm.imageUrl.trim() !== "") {
          // Si el listado en BD ya guardó algo en imageUrl, úsalo directamente:
          srcImagen = itm.imageUrl;
        } else {
          // Si no, buscamos en itemImageMap por baseName:
          srcImagen = this.itemImageMap[baseName];
          if (!srcImagen) {
            console.warn(`No se encontró imagen para "${baseName}" en itemImageMap.`);
            srcImagen = "./Game/Source/wtt.png"; // fallback
          }
        }
        // ───────────────────────────────────────────────────────────

        const img = document.createElement("img");
        img.src = srcImagen;
        img.alt = itm.name;
        img.classList.add("item-thumb");
        leftDiv.appendChild(img);

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("item-info");
        const nameEl = document.createElement("div");
        nameEl.classList.add("item-name");
        nameEl.innerText = itm.name;
        const priceEl = document.createElement("div");
        priceEl.classList.add("item-price");
        priceEl.innerText = `₿ ${itm.price.toFixed(2)} (x${itm.qty})`;
        infoDiv.appendChild(nameEl);
        infoDiv.appendChild(priceEl);
        leftDiv.appendChild(infoDiv);

        itemDiv.appendChild(leftDiv);

        // ————— botones Ver detalle / Comprar —————
        const actionsDiv = document.createElement("div");
        actionsDiv.classList.add("item-actions");

        const btnView = document.createElement("button");
        btnView.classList.add("btn-view");
        btnView.innerText = "Ver detalle";
        btnView.addEventListener("click", () => {
          this._openModal(itm);
        });
        actionsDiv.appendChild(btnView);

        if (itm.owner !== this.playerName) {
          const btnBuy = document.createElement("button");
          btnBuy.classList.add("btn-buy");
          btnBuy.innerText = "Comprar";
          btnBuy.addEventListener("click", () => {
            this._handleBuy(itm);
          });
          actionsDiv.appendChild(btnBuy);
        }

        itemDiv.appendChild(actionsDiv);
        sectionDiv.appendChild(itemDiv);
      });

      this.dom.listContainer.appendChild(sectionDiv);
    });
  }

  _openModal(item) {
    this.dom.modalFields.name.innerText  = item.name;
    this.dom.modalFields.type.innerText  = item.type;
    this.dom.modalFields.qty.innerText   = item.qty;
    this.dom.modalFields.price.innerText = item.price.toFixed(2);
    this.dom.modalFields.owner.innerText = item.owner;

    // ─────────── EXTRAER “baseName” de item.name ───────────
    const match = item.name.match(/^([^\s]+)/);
    const baseName = match ? match[1] : item.name;
    // ────────────────────────────────────────────────────────

    // ─── DETERMINAR qué src usar en el modal ───
    let srcModal;
    if (item.imageUrl && item.imageUrl.trim() !== "") {
      srcModal = item.imageUrl;
    } else {
      srcModal = this.itemImageMap[baseName] || "./assets/default-item.png";
      if (!this.itemImageMap[baseName]) {
        console.warn(`No se encontró imagen para "${baseName}" en itemImageMap.`);
      }
    }
    this.dom.modalFields.image.src = srcModal;
    // ────────────────────────────────────────────────

    this.dom.btnDelete.replaceWith(this.dom.btnDelete.cloneNode(true));
    this.dom.btnDelete = document.getElementById("btnDeleteItem");
    if (this.dom.btnCancel) {
      this.dom.btnCancel.remove();
      this.dom.btnCancel = null;
    }
    if (this.dom.btnBuy) {
      this.dom.btnBuy.remove();
      this.dom.btnBuy = null;
    }

    if (item.owner !== this.playerName) {
      this.dom.btnDelete.style.display = "none";

      const btnBuy = document.createElement("button");
      btnBuy.classList.add("btn-buy");
      btnBuy.innerText = "Comprar";
      btnBuy.onclick = () => this._handleBuy(item);
      this.dom.modalFields.owner.parentNode.insertAdjacentElement("afterend", btnBuy);
      this.dom.btnBuy = btnBuy;

      const btnCancel = document.createElement("button");
      btnCancel.classList.add("btn-cancel");
      btnCancel.innerText = "Cancelar";
      btnCancel.onclick = () => this.dom.overlayModal.classList.remove("active");
      btnBuy.insertAdjacentElement("afterend", btnCancel);
      this.dom.btnCancel = btnCancel;
    } else {
      this.dom.btnDelete.style.display = "inline-block";
      this.dom.btnDelete.onclick = () => this._handleDeleteListing(item._id);
    }

    this.dom.overlayModal.classList.add("active");
  }

/**
 * Maneja la compra de un ítem, usando this.token y re-autenticación automática.
 * @param {Object} item - El objeto listing a comprar.
 */
async _handleBuy(item) {
  /*
  const confirmBuy = confirm(
    `¿Comprarás ${item.qty} × ${item.name} a GL ${item.price.toFixed(2)} c/u?\n` +
    `Costo total: GL ${(item.price * item.qty).toFixed(2)}`
  );
  if (!confirmBuy) return;
  */

  // Asegurar token válido
  if (!this.token || !this.tokenValido(this.token)) {
    await this.authenticate();
    if (!this.token) {
      console.error("No se pudo obtener token válido. Abortando compra.");
      return;
    }
  }

  try {
    const resp = await fetch(
      `${this.serverclient}/listings/${item._id}/buy`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      }
    );
    const data = await resp.json();

    if (!resp.ok) {
      // Reintentar si token inválido
      if (data.error?.includes("Token inválido") || data.error?.includes("expirado")) {
        this.token = null;
        return this._handleBuy(item);
      }
      //alert("Error al comprar: " + (data.error || "desconocido"));
      
      console.log("Error al comprar: " + (data.error || "desconocido"));
      return;
    }

          if (item.type == "Semilla") {
            if (!this.addItemWithCheck("Semillax", item.qty)) {
              console.log("No cupo todo en quickSlots + slots");
            }
          }
          
          if (item.type == "Regadera") {
            if (!this.addItemWithCheck("Regaderax", item.qty)) {
              console.log("No cupo todo en quickSlots + slots");
            }
          }

          
          if (item.type == "Tijeras") {
            if (!this.addItemWithCheck("Tijerasx", item.qty)) {
              console.log("No cupo todo en quickSlots + slots");
            }
          }

          this._initialLoad()
          this.refreshAll();


    /*
    alert(
      `Compra exitosa.\n` +
      `Tipo de ítem: ${data.type}\n` +
      `Costo total: GL ${data.totalCost.toFixed(2)}\n` +
      `Comisión (${(data.commissionRate * 100).toFixed(1)}%): ₿ ${data.commission.toFixed(2)}\n` +
      `Recibido por vendedor: GL ${data.netToSeller.toFixed(2)}`
    );
    */

    // Actualizar moneda en UI
    this.playerMoneda -= data.totalCost;
    this.dom.walletBalance.innerText = this.playerMoneda.toFixed(2);
    if (typeof this.updateMoneda === "function") {
      this.updateMoneda(this.playerMoneda);
    }

    // Cerrar modal y recargar listings
    this.dom.overlayModal.classList.remove("active");
    await this._loadListingsFromServer();

  } catch (err) {
    console.error("Error en _handleBuy():", err);
    //alert("Error de red al comprar.");
  }
}
/**
 * Helper para hacer fetch con reintento si el token está inválido/expirado.
 * Recibe la misma URL y options que fetch, y asume que `this.token`, `this.authenticate()` y `this.tokenValido(token)` están disponibles.
 * - Si no hay token o no es válido, llama a authenticate().
 * - Al detectar respuesta de error por token inválido, renueva token y reintenta una sola vez.
 * - Devuelve la Response final (o lanza si hay fallo de red no relacionado con token).
 *//**
 * Helper para hacer fetch con reintento de autenticación si el token expira.
 * - Verifica si existe token válido; si no, llama a this.authenticate().
 * - Envía Authorization header y credentials: 'include'.
 * - Si la respuesta inicial es 401 (o cuerpo indica token inválido/expirado), renueva token y reintenta una vez.
 * - Lanza Error si no logra obtener o renovar token.
 * 
 * */
async fetchWithAuth(url, options = {}) {
  // 1) Asegurar token válido antes de la petición
  if (!this.token || !this.tokenValido(this.token)) {
    console.log("[fetchWithAuth] Token inválido o ausente, llamando a authenticate()");
    await this.authenticate();
    if (!this.token) {
      console.error("[fetchWithAuth] No se pudo obtener token válido");
      throw new Error("No se pudo obtener token válido");
    }
    console.log("[fetchWithAuth] Token renovado correctamente");
  }
  // 2) Preparar opciones con Authorization
  const baseHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`,
  };
  const opts = {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...baseHeaders
    },
    credentials: 'include',
  };
  console.log(`[fetchWithAuth] Petición a ${url} con método ${opts.method || 'GET'}`);
  let resp;
  try {
    resp = await fetch(url, opts);
  } catch (err) {
    console.error("[fetchWithAuth] Error de red en fetch:", err);
    throw err;
  }
  console.log(`[fetchWithAuth] Respuesta inicial: ${resp.status} ${resp.statusText}`);

  // 3) Si 401, intentar renovar token y reintentar
  if (resp.status === 401) {
    let body;
    try { body = await resp.clone().json(); } catch(e) { body = null; }
    const errMsg = typeof body?.error === 'string' ? body.error.toLowerCase() : "";
    if (resp.status === 401 && (errMsg.includes("token inválido") || errMsg.includes("expirado") || !body)) {
      console.log("[fetchWithAuth] Token expirado o inválido detectado, renovando token...");
      this.token = null;
      await this.authenticate();
      if (!this.token) {
        console.error("[fetchWithAuth] No se pudo renovar token tras expiración");
        throw new Error("No se pudo renovar token tras expiración");
      }
      console.log("[fetchWithAuth] Token renovado, reintentando petición...");
      const retryOpts = {
        ...options,
        headers: {
          ...(options.headers || {}),
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        },
        credentials: 'include',
      };
      try {
        resp = await fetch(url, retryOpts);
      } catch (err) {
        console.error("[fetchWithAuth] Error de red en retry fetch:", err);
        throw err;
      }
      console.log(`[fetchWithAuth] Respuesta tras retry: ${resp.status} ${resp.statusText}`);
    }
  }

  return resp;
}
/**
 * Elimina un listing propio, obteniendo primero nombre y cantidad desde el backend.
 * Maneja distintos códigos HTTP en GET de detalles:
 *   - 400: ID inválido → alerta y sale.
 *   - 403: no propietario → alerta y sale.
 *   - 404: no existe → alerta, recarga lista y sale.
 *   - Otros errores (500, red): ofrece opción de intentarlo sin detalles.
 * Luego confirma dinámico y hace DELETE con manejo de 200, 403, 404, otros.
 *
 * @param {string} listingId - ID del listing a eliminar.
 */
async _handleDeleteListing(listingId) {
  // 1. Obtener detalles del listing para mostrar en confirm
  let listing = null;
  let respDetail = null;
  let permitirEliminarSinDetalles = false;

  try {
    const urlDetail = `${this.serverclient}/listings/${listingId}`;
    respDetail = await this.fetchWithAuth(urlDetail, { method: 'GET' });
  } catch (err) {
    console.error("Error de red o auth al solicitar detalles del listing:", err);
    // Ofrecer opción de intentar DELETE sin detalles
    const tryDelete = confirm("No se pudo verificar el listing por error de red/autenticación. ¿Deseas intentar eliminar de todas formas?");
    if (!tryDelete) {
      return;
    }
    permitirEliminarSinDetalles = true;
  }

  if (respDetail) {
    // Procesar distintos estados
    if (respDetail.status === 200) {
      // OK: parsear JSON
      try {
        const json = await respDetail.json();
        // Esperamos estructura { id, name, quantity, ... }
        listing = json;
      } catch (err) {
        console.warn("Respuesta GET detalle no es JSON válido:", err);
        // Podemos permitir eliminar sin detalles o abortar. Aquí: permitir genérico:
        const tryDelete = confirm("No se pudo leer datos del listing. ¿Deseas intentar eliminar de todas formas?");
        if (!tryDelete) return;
        permitirEliminarSinDetalles = true;
      }
    } else if (respDetail.status === 400) {
      // ID inválido
      //alert("ID de listing inválido. Por favor recarga o revisa datos.");
      console.log("ID de listing inválido. Por favor recarga o revisa datos.");
      return;
    } else if (respDetail.status === 403) {
      // No es propietario o no tiene permiso
      //alert("No tienes permiso para ver o eliminar este listing.");
      console.log("No tienes permiso para ver o eliminar este listing.");
      return;
    } else if (respDetail.status === 404) {
      // No existe: quizá ya fue borrado
      //alert("No se encontró el listing. Es posible que ya haya sido eliminado.");
      console.log("No se encontró el listing. Es posible que ya haya sido eliminado.");
      await this._loadListingsFromServer();
      return;
    } else {
      // Otros errores HTTP (500, 502, etc.)
      console.warn(`Error al obtener detalles del listing: status ${respDetail.status}`);
      const tryDelete = confirm("Error al obtener datos del listing. ¿Deseas intentar eliminar de todas formas?");
      if (!tryDelete) {
        return;
      }
      permitirEliminarSinDetalles = true;
    }
  }

  // 2. Construir mensaje de confirm dinámico
  /*
  let mensaje;
  if (listing && typeof listing.name !== 'undefined' && typeof listing.quantity !== 'undefined') {
    mensaje = `¿Seguro que deseas eliminar el listing "${listing.name}" con cantidad ${listing.quantity}?`;
  } else if (listing && typeof listing.name !== 'undefined') {
    mensaje = `¿Seguro que deseas eliminar el listing "${listing.name}"?`;
  } else if (permitirEliminarSinDetalles) {
    mensaje = "¿Seguro que deseas eliminar este listing?";
  } else {
    // Si no obtuvimos ni detalles ni permitimos eliminar sin detalles, no debería llegar aquí
    mensaje = "¿Seguro que deseas eliminar tu listing?";
  }
  const confirmDel = confirm(mensaje);
  if (!confirmDel) {
    return;
  }
  */

  // 3. Realizar DELETE vía fetchWithAuth
  try {
    const urlDelete = `${this.serverclient}/listings/${listingId}`;
    const respDel = await this.fetchWithAuth(urlDelete, { method: 'DELETE' });
    // Procesar DELETE
    if (respDel.status === 200 || respDel.status === 204) {
      // Éxito
      let dataDel = {};
      try { dataDel = await respDel.json(); } catch(_) { /* respuesta sin body */ }
      if (dataDel.listing && dataDel.listing.name) {
        //alert(`Listado "${dataDel.listing.name}" eliminado correctamente.`);
        console.log("");
      } else if (listing && listing.name) {
        //alert(`Listado "${listing.name}" eliminado correctamente.`);
        console.log("");
      } else {
        //alert("Listado eliminado correctamente.");
        console.log("");
      }



          if (listing.type == "Semilla") {
            if (!this.addItemWithCheck("Semillax", listing.quantity)) {
              console.log("No cupo todo en quickSlots + slots");
            }
          }
          
          if (listing.type == "Regadera") {
            if (!this.addItemWithCheck("Regaderax", listing.quantity)) {
              console.log("No cupo todo en quickSlots + slots");
            }
          }

          
          if (listing.type == "Tijeras") {
            if (!this.addItemWithCheck("Tijerasx", listing.quantity)) {
              console.log("No cupo todo en quickSlots + slots");
            }
          }

          this._initialLoad()
          this.refreshAll();


      // Cerrar modal/UI y recargar
      if (this.dom && this.dom.overlayModal) {
        this.dom.overlayModal.classList.remove("active");
      }
      await this._loadListingsFromServer();
    } else if (respDel.status === 400) {
      // Puede que el backend devuelva validación de ID, aunque DELETE con param validado suele no ir a 400 aquí
      const data = await respDel.json().catch(() => ({}));
      //alert("Error al eliminar (solicitud inválida): " + (data.error || `Status ${respDel.status}`));
      console.log("Error al eliminar (solicitud inválida): " + (data.error || `Status ${respDel.status}`));
    } else if (respDel.status === 403) {
      //alert("No tienes permiso para eliminar este listing.");
      console.log("No tienes permiso para eliminar este listing.");
    } else if (respDel.status === 404) {
      //alert("No se encontró el listing al intentar eliminar. Quizá ya fue borrado.");
      console.log("No se encontró el listing al intentar eliminar. Quizá ya fue borrado.");
      await this._loadListingsFromServer();
    } else {
      // Otros errores
      const data = await respDel.json().catch(() => ({}));
      //alert("Error al eliminar: " + (data.error || `Status ${respDel.status}`));
      console.log("Error al eliminar: " + (data.error || `Status ${respDel.status}`));
    }
  } catch (err) {
    console.error("Error en DELETE del listing:", err);
    //alert("Error de red o autenticación al eliminar listing.");
  }
}



        /*
          if (this.currentItem.name == "Semilla") {
            if (!this.addItemWithCheck("Semillax", qty)) {
              console.log("No cupo todo en quickSlots + slots");
            }
          }
          
          if (this.currentItem.name == "Regadera") {
            if (!this.addItemWithCheck("Regaderax", qty)) {
              console.log("No cupo todo en quickSlots + slots");
            }
          }

          
          if (this.currentItem.name == "Tijeras") {
            if (!this.addItemWithCheck("Tijerasx", qty)) {
              console.log("No cupo todo en quickSlots + slots");
            }
          }
          */
  
      // ─────────────────────────────────────────────────────────
      //   BLOQUE A: TODA LA LÓGICA DE INVENTARIO / DRAG & DROP
      // ─────────────────────────────────────────────────────────
initInventory() {
  // 1) Limpiar el HTML de los contenedores antes de recrear:
  const containerQ = document.getElementById('quick-slots');
  if (containerQ) containerQ.innerHTML = '';   // <— aquí borras todo <div class="quick-slot">...
  this.STATE.quickSlots = [];                   // <— reinicias el array para que no acumule

  for (let i = 0; i < 7; i++) {
    const slotDiv = document.createElement('div');
    slotDiv.classList.add('quick-slot');
    slotDiv.dataset.slotIndex = i;
    slotDiv.addEventListener('click', (e) => {
      this.handleSlotClick('quick', i, e.clientX, e.clientY);
    });
    containerQ.appendChild(slotDiv);
    this.STATE.quickSlots.push(null);
  }

  // 2) Lo mismo para la grilla de inventario:
  const grid = document.getElementById('inventory-grid');
  if (grid) grid.innerHTML = '';               // <— borras todos los <div class="inv-slot"> previos
  this.STATE.slots = [];                        // <— reinicias el array

  for (let i = 0; i < 40; i++) {
    const slotDiv = document.createElement('div');
    slotDiv.classList.add('inv-slot');
    slotDiv.dataset.slotIndex = i;
    slotDiv.addEventListener('click', (e) => {
      this.handleSlotClick('inv', i, e.clientX, e.clientY);
    });
    grid.appendChild(slotDiv);
    this.STATE.slots.push(null);
  }
}


      initQuickSlots() {
        const container = document.getElementById('quick-slots');
        for (let i = 0; i < 7; i++) {
          const slotDiv = document.createElement('div');
          slotDiv.classList.add('quick-slot');
          slotDiv.dataset.slotIndex = i;
          // Arrow function para capturar e.clientX / e.clientY:
          slotDiv.addEventListener('click', (e) => {
            const qsIdx = Number(slotDiv.dataset.slotIndex);
            this.handleSlotClick('quick', qsIdx, e.clientX, e.clientY);
          });
          container.appendChild(slotDiv);
          this.STATE.quickSlots.push(null);
        }
      }

      initInventoryGrid() {
        const grid = document.getElementById('inventory-grid');
        for (let i = 0; i < 40; i++) {
          const slotDiv = document.createElement('div');
          slotDiv.classList.add('inv-slot');
          slotDiv.dataset.slotIndex = i;
          // Arrow function para capturar e.clientX / e.clientY:
          slotDiv.addEventListener('click', (e) => {
            const idx = Number(slotDiv.dataset.slotIndex);
            this.handleSlotClick('inv', idx, e.clientX, e.clientY);
          });
          grid.appendChild(slotDiv);
          this.STATE.slots.push(null);
        }
      }

      showInventory() {
        document.getElementById('inventory-panel').style.display = 'block';
      }

      hideInventory() {
        document.getElementById('inventory-panel').style.display = 'none';
        this.clearSelectedItem();
      }

      toggleInventory() {
        const panel = document.getElementById('inventory-panel');
        if (panel.style.display === 'block') {
          this.hideInventory();
        } else {
          this.showInventory();
        }
      }
/**
 * Agrega ‘quantity’ unidades del ítem ‘itemId’ al inventario.
 * Primero completa stacks parciales; luego abre nuevos stacks en slots vacíos.
 * Si no hay espacio, retorna false.
 *
 * @param {string} itemId     — Clave del ítem en ItemDefinitions (ej. "item_1").
 * @param {number} quantity   — Cuántas unidades quieres agregar. (por defecto 1).
 * @returns {boolean}         — true si se agregaron todas las unidades; false si faltó espacio.
 */
addItem(itemId, quantity = 1) {
  const defs = this.ItemDefinitions[itemId];
  if (!defs) {
    console.warn(`Item "${itemId}" no definido en ItemDefinitions`);
    return false;
  }

  const maxStack = defs.maxStack;
  let remaining = quantity;

  // 1) Intentar llenar stacks parciales existentes (slots 0..39)
  for (let i = 0; i < this.STATE.slots.length && remaining > 0; i++) {
    const slot = this.STATE.slots[i];
    if (slot && slot.id === itemId && slot.count < maxStack) {
      const espacio = maxStack - slot.count;
      const suma = Math.min(espacio, remaining);
      slot.count += suma;
      remaining -= suma;
      this.renderSlot(i);
    }
  }
  // Si ya no queda nada, salimos
  if (remaining === 0) return true;

  // 2) Crear nuevos stacks en slots vacíos para el resto
  for (let i = 0; i < this.STATE.slots.length && remaining > 0; i++) {
    if (this.STATE.slots[i] === null) {
      const paraEste = Math.min(maxStack, remaining);
      this.STATE.slots[i] = {
        id: itemId,
        count: paraEste
      };
      remaining -= paraEste;
      this.renderSlot(i);
    }
  }

  // 3) Si al final aún hay remanente, no cupo todo
  if (remaining > 0) {
    console.warn(`No hubo espacio para ${remaining} unidades de "${itemId}".`);
    return false;
  }

  return true;
}

  renderSlot(index) {
    // Render inventario
    const invDiv = document.querySelector(`.inv-slot[data-slot-index="${index}"]`);
    if (invDiv) {
      invDiv.innerHTML = "";
      const itemObj = this.STATE.slots[index];
      if (itemObj) {
        const img = document.createElement("img");
        img.src = this.ItemDefinitions[itemObj.id].src;
        img.alt = itemObj.id;
        invDiv.appendChild(img);
        if (itemObj.count > 1) {
          const span = document.createElement("span");
          span.classList.add("item-count");
          span.textContent = "x" + itemObj.count;
          invDiv.appendChild(span);
        }
      }
      invDiv.classList.remove("highlight");
    }

    // Render quick-slot
    const quickDiv = document.querySelector(`.quick-slot[data-slot-index="${index}"]`);
    if (quickDiv) {
      quickDiv.innerHTML = "";
      const itemObj = this.STATE.quickSlots[index];
      if (itemObj) {
        const img = document.createElement("img");
        img.src = this.ItemDefinitions[itemObj.id].src;
        img.alt = itemObj.id;
        quickDiv.appendChild(img);
        if (itemObj.count > 1) {
          const span = document.createElement("span");
          span.classList.add("item-count");
          span.textContent = "x" + itemObj.count;
          quickDiv.appendChild(span);
        }
      }
      quickDiv.classList.remove("highlight");
    }
  }

handleSlotClick(type, index, clickX, clickY) {
  if (!this.STATE.selectedItem) {
    // SIN ÍTEM EN MANO → intento “levantar” el ítem de la casilla
    if (type === 'inv') {
      const slotItem = this.STATE.slots[index];
      if (!slotItem) return;
      this.STATE.selectedItem = {
        id: slotItem.id,
        count: slotItem.count,
        originType: 'inv',
        originIndex: index
      };
      this.STATE.slots[index] = null;
      const div = document.querySelector(`.inv-slot[data-slot-index="${index}"]`);
      div.innerHTML = '';
      div.classList.add('highlight');

      // Iniciar arrastre PASÁNDOLE clickX, clickY
      this.startDrag(
        this.ItemDefinitions[this.STATE.selectedItem.id].src,
        clickX,
        clickY
      );
    } else {
      const qSlot = this.STATE.quickSlots[index];
      if (!qSlot) return;
      this.STATE.selectedItem = {
        id: qSlot.id,
        count: qSlot.count,
        originType: 'quick',
        originIndex: index,
        invIndex: qSlot.invIndex
      };
      this.STATE.quickSlots[index] = null;
      const div = document.querySelector(`.quick-slot[data-slot-index="${index}"]`);
      div.innerHTML = '';
      div.classList.add('highlight');

      this.startDrag(
        this.ItemDefinitions[this.STATE.selectedItem.id].src,
        clickX,
        clickY
      );
    }
  } else {
    // YA HAY UN ÍTEM EN MANO → intento colocar / merge o swap
    const origin = { ...this.STATE.selectedItem };

    if (type === 'inv') {
      const destItem = this.STATE.slots[index];

      // ─────────────────────────────────────────────────────────
      // 1) SI destino NO vacío Y es mismo itemId → intento merge
      // ─────────────────────────────────────────────────────────
      if (destItem && destItem.id === origin.id) {
        const maxStack = this.ItemDefinitions[origin.id].maxStack;
        const total = destItem.count + origin.count;

        if (total <= maxStack) {
          // 1.a) Entra todo en ese slot → sumo y termino
          this.STATE.slots[index].count = total;
          this.STATE.selectedItem = null;
          this.stopDrag();
          this.renderSlot(index);
          return;
        } else {
          // 1.b) Llega al máximo en destino, sobra “overflow”
          const overflow = total - maxStack;
          this.STATE.slots[index].count = maxStack;

          // Devuelvo el overflow a la posición original
          if (origin.originType === 'inv') {
            this.STATE.slots[origin.originIndex] = {
              id: origin.id,
              count: overflow
            };
            this.renderSlot(origin.originIndex);
          } else {
            this.STATE.quickSlots[origin.originIndex] = {
              id: origin.id,
              count: overflow,
              invIndex: origin.invIndex
            };
            this.renderSlot(origin.originIndex);
          }

          this.STATE.selectedItem = null;
          this.stopDrag();
          this.renderSlot(index);
          return;
        }
      }

      // ─────────────────────────────────────────────────────────
      // 2) Si no mergeable, hago swap/mover normal
      // ─────────────────────────────────────────────────────────
      if (destItem) {
        // Swap si hay un objeto distinto en destino
        if (origin.originType === 'inv') {
          this.STATE.slots[origin.originIndex] = { ...destItem };
        } else {
          this.STATE.quickSlots[origin.originIndex] = {
            id: destItem.id,
            count: destItem.count,
            invIndex: index
          };
        }
      } else {
        // Vacío: libero el origen
        if (origin.originType === 'inv') {
          this.STATE.slots[origin.originIndex] = null;
        } else {
          this.STATE.quickSlots[origin.originIndex] = null;
        }
      }

      // Coloco el ítem (pila completa) en inventario destino
      this.STATE.slots[index] = { id: origin.id, count: origin.count };
      this.stopDrag();
      this.renderSlot(index);
      if (origin.originType === 'inv') {
        this.renderSlot(origin.originIndex);
      } else {
        this.renderSlot(origin.originIndex);
      }
      this.STATE.selectedItem = null;

    } else {
      // ─────────────────────────────────────────────────────────
      // 3) Caso quick-slot: merger o swap en quickSlots
      // ─────────────────────────────────────────────────────────
      const destQuick = this.STATE.quickSlots[index];

      if (destQuick && destQuick.id === origin.id) {
        const maxStack = this.ItemDefinitions[origin.id].maxStack;
        const total = destQuick.count + origin.count;

        if (total <= maxStack) {
          // 3.a) Combino totalmente en quick-slot
          this.STATE.quickSlots[index].count = total;
          this.STATE.selectedItem = null;
          this.stopDrag();
          this.renderSlot(index);
          return;
        } else {
          // 3.b) Llega al máximo, sobra overflow
          const overflow = total - maxStack;
          this.STATE.quickSlots[index].count = maxStack;

          // Devuelvo overflow a origen
          if (origin.originType === 'quick') {
            this.STATE.quickSlots[origin.originIndex] = {
              id: origin.id,
              count: overflow,
              invIndex: origin.invIndex
            };
            this.renderSlot(origin.originIndex);
          } else {
            this.STATE.slots[origin.originIndex] = {
              id: origin.id,
              count: overflow
            };
            this.renderSlot(origin.originIndex);
          }

          this.STATE.selectedItem = null;
          this.stopDrag();
          this.renderSlot(index);
          return;
        }
      }

      // ─────────────────────────────────────────────────────────
      // 4) Si no mergeable, hago swap en quick-slots
      // ─────────────────────────────────────────────────────────
      if (destQuick) {
        if (origin.originType === 'quick') {
          // quick ↔ quick
          this.STATE.quickSlots[origin.originIndex] = {
            id: destQuick.id,
            count: destQuick.count,
            invIndex: destQuick.invIndex
          };
        } else {
          // inv → quick, devuelvo origin a inventario
          this.STATE.slots[origin.originIndex] = {
            id: destQuick.id,
            count: destQuick.count
          };
        }
      } else {
        // Vacío: libero el origen
        if (origin.originType === 'quick') {
          this.STATE.quickSlots[origin.originIndex] = null;
        } else {
          this.STATE.slots[origin.originIndex] = null;
        }
      }

      // Coloco el ítem (pila completa) en quick-slot destino
      this.STATE.quickSlots[index] = {
        id: origin.id,
        count: origin.count,
        invIndex: origin.originType === 'quick' ? origin.invIndex : origin.originIndex
      };
      this.stopDrag();
      this.renderSlot(index);
      if (origin.originType === 'quick') {
        this.renderSlot(origin.originIndex);
      } else {
        this.renderSlot(origin.originIndex);
      }
      this.STATE.selectedItem = null;
    }
  }
}


      startDrag(src, x, y) {
        const dragDiv = document.getElementById('drag-item');
        const dragImg = dragDiv.querySelector('img');
        dragImg.src = src;
        dragDiv.style.display = 'block';

        // 1) Posicionar inmediatamente bajo el cursor:
        const halfW = dragDiv.offsetWidth / 2;
        const halfH = dragDiv.offsetHeight / 2;
        dragDiv.style.left = (x - halfW) + 'px';
        dragDiv.style.top  = (y - halfH) + 'px';

        // 2) Luego registro el listener para que onMouseMove actualice en cada movimiento posterior:
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('click', this.onMouseClick.bind(this));
      }

      onMouseClick(e) {
        const t = e.target;
        if (t.closest('.inv-slot') || t.closest('.quick-slot')) {
          return;
        }
        if (this.STATE.selectedItem) {
          // Devolver al origen
          if (this.STATE.selectedItem.originType === 'inv') {
            this.STATE.slots[this.STATE.selectedItem.originIndex] = {
              id: this.STATE.selectedItem.id,
              count: this.STATE.selectedItem.count
            };
            this.renderSlot(this.STATE.selectedItem.originIndex);
          } else {
            this.STATE.quickSlots[this.STATE.selectedItem.originIndex] = {
              id: this.STATE.selectedItem.id,
              count: this.STATE.selectedItem.count,
              invIndex: this.STATE.selectedItem.invIndex
            };
            this.renderSlot(this.STATE.selectedItem.originIndex);
          }
          this.stopDrag();
          this.STATE.selectedItem = null;
        }
      }

      stopDrag() {
        const dragDiv = document.getElementById('drag-item');
        dragDiv.style.display = 'none';
        dragDiv.style.left = '-100px';
        dragDiv.style.top = '-100px';
        document.removeEventListener('mousemove', this.onMouseMove.bind(this));
        document.removeEventListener('click', this.onMouseClick.bind(this));
        document.querySelectorAll('.inv-slot, .quick-slot').forEach(d => {
          d.classList.remove('highlight');
        });
      }

      onMouseMove(e) {
        const dragDiv = document.getElementById('drag-item');
        dragDiv.style.left = (e.clientX - dragDiv.offsetWidth / 2) + 'px';
        dragDiv.style.top  = (e.clientY - dragDiv.offsetHeight / 2) + 'px';
      }

      clearSelectedItem() {
        if (this.STATE.selectedItem) {
          if (this.STATE.selectedItem.originType === 'inv') {
            this.STATE.slots[this.STATE.selectedItem.originIndex] = {
              id: this.STATE.selectedItem.id,
              count: this.STATE.selectedItem.count
            };
            this.renderSlot(this.STATE.selectedItem.originIndex);
          } else {
            this.STATE.quickSlots[this.STATE.selectedItem.originIndex] = {
              id: this.STATE.selectedItem.id,
              count: this.STATE.selectedItem.count,
              invIndex: this.STATE.selectedItem.invIndex
            };
            this.renderSlot(this.STATE.selectedItem.originIndex);
          }
          this.stopDrag();
          this.STATE.selectedItem = null;
        }
      }













  /**
   * 1) Cuenta cuántos del ítem `itemId` hay en quickSlots y en slots.
   *    Si no hay ninguno, deja un console.log.
   * @param {string} itemId
   * @returns {{ quick: number, slots: number, total: number }}
   */
  countItem(itemId) {
    const countIn = (arr, prop = 'count') =>
      arr.reduce((sum, slot) => {
        if (slot && slot.id === itemId) return sum + slot[prop];
        return sum;
      }, 0);

    const quickCount = countIn(this.STATE.quickSlots);
    const slotCount  = countIn(this.STATE.slots);
    const total      = quickCount + slotCount;

    if (total === 0) {
      console.log(`No existe ningún "${itemId}" ni en quickSlots ni en slots.`);
    }

    return { quick: quickCount, slots: slotCount, total };
  }

  /**
   * 2) addItemWithCheck: Verifica espacio en quickSlots + slots y, si cabe,
   *    reparte primero en quickSlots y luego en slots. Si no cabe, no hace nada y devuelve false.
   * @param {string} itemId
   * @param {number} quantity
   * @returns {boolean}
   */
  addItemWithCheck(itemId, quantity) {
    const defs = this.ItemDefinitions[itemId];
    if (!defs) {
      console.warn(`Item "${itemId}" no definido`);
      return false;
    }
    const maxStack = defs.maxStack;
    let remaining = quantity;

    // 1) Calcular espacio en quickSlots
    let espacioQuick = 0;
    this.STATE.quickSlots.forEach(slot => {
      if (slot && slot.id === itemId) {
        espacioQuick += (maxStack - slot.count);
      } else if (!slot) {
        espacioQuick += maxStack;
      }
    });

    // 2) Calcular espacio en inventory (slots)
    let espacioInv = 0;
    this.STATE.slots.forEach(slot => {
      if (slot && slot.id === itemId) {
        espacioInv += (maxStack - slot.count);
      } else if (!slot) {
        espacioInv += maxStack;
      }
    });

    if (espacioQuick + espacioInv < remaining) {
      console.warn(`No hay espacio suficiente para ${quantity} de "${itemId}"`);
      return false;
    }

    // 3) Llenar quickSlots primero
    for (let i = 0; i < this.STATE.quickSlots.length && remaining > 0; i++) {
      const slot = this.STATE.quickSlots[i];
      if (slot && slot.id === itemId && slot.count < maxStack) {
        const add = Math.min(maxStack - slot.count, remaining);
        slot.count += add;
        remaining -= add;
        this.renderSlot(i);
      } else if (!slot) {
        const add = Math.min(maxStack, remaining);
        this.STATE.quickSlots[i] = { id: itemId, count: add, invIndex: null };
        remaining -= add;
        this.renderSlot(i);
      }
    }

    // 4) Luego, llenar inventory slots
    while (remaining > 0) {
      // 4a) apilar en slots existentes
      let didStack = false;
      for (let i = 0; i < this.STATE.slots.length && remaining > 0; i++) {
        const slot = this.STATE.slots[i];
        if (slot && slot.id === itemId && slot.count < maxStack) {
          const add = Math.min(maxStack - slot.count, remaining);
          slot.count += add;
          remaining -= add;
          this.renderSlot(i);
          didStack = true;
        }
      }
      if (didStack) continue;

      // 4b) si no apiló, busca slot vacío
      let placed = false;
      for (let i = 0; i < this.STATE.slots.length && remaining > 0; i++) {
        if (!this.STATE.slots[i]) {
          const add = Math.min(maxStack, remaining);
          this.STATE.slots[i] = { id: itemId, count: add };
          remaining -= add;
          this.renderSlot(i);
          placed = true;
          break;
        }
      }
      if (!placed && remaining > 0) {
        console.error("Error inesperado: quedó remanente sin slot vacío");
        return false;
      }
    }

    return true;
  }

  /**
   * 3) removeItemWithCheck: Quita `quantity` de `itemId` de quickSlots y slots,
   *    priorizando quickSlots primero. Si no hay suficiente, deja un console.log y devuelve false.
   * @param {string} itemId
   * @param {number} quantity
   * @returns {boolean}
   */
  removeItemWithCheck(itemId, quantity) {
    let remaining = quantity;

    const extractFrom = arr => {
      for (let i = 0; i < arr.length && remaining > 0; i++) {
        const slot = arr[i];
        if (slot && slot.id === itemId) {
          const take = Math.min(slot.count, remaining);
          slot.count -= take;
          remaining -= take;
          this.renderSlot(i);
          if (slot.count === 0) {
            // limpiamos la ranura
            arr[i] = null;
            this.renderSlot(i);
          }
        }
      }
    };

    // 1) Sacar de quickSlots
    extractFrom(this.STATE.quickSlots);

    // 2) Si aún falta, sacar de inventory slots
    if (remaining > 0) {
      extractFrom(this.STATE.slots);
    }

    if (remaining > 0) {
      console.warn(
        `No se encontraron suficientes "${itemId}" para eliminar ${quantity}. ` +
        `Faltaron ${remaining}.`
      );
      return false;
    }

    return true;
  }


  
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

  objectLayer.objects.forEach(obj => {
    if (!obj.name) {
      console.warn(`⚠️ Objeto en (${obj.x}, ${obj.y}) no tiene nombre en Tiled.`);
      return;
    }

    const mapping = nameMapping[obj.name];
    if (!mapping) {
      console.warn(`⚠️ No hay mapeo para '${obj.name}' en nameMapping.`);
      return;
    }
    const { spriteKey, targetProp } = mapping;
    if (!spriteKey || !targetProp) {
      console.warn(`⚠️ El mapping para '${obj.name}' debe definir 'spriteKey' y 'targetProp'.`);
      return;
    }

    // Crear la imagen; se ancla en (0,1) para que coincida con el eje Y de Tiled
    const image = scene.add.image(obj.x, obj.y, spriteKey)
                         .setOrigin(0, 1);

    // Escalar si Tiled definió width/height
    if (obj.width && obj.height) {
      image.setScale(obj.width / image.width, obj.height / image.height);
    }

    // ——— Aquí aplicamos la rotación de Tiled ———
    // Tiled nos dá obj.rotation en grados, Phaser usa radianes:
    if (obj.rotation) {
      image.setRotation(Phaser.Math.DegToRad(obj.rotation));
    }

    // Si quieres también respetar flips (Mirror X/Y) definidos en Tiled:
    if (obj.flippedHorizontal) {
      image.flipX = true;
    }
    if (obj.flippedVertical) {
      image.flipY = true;
    }

    // Asignar la imagen a la propiedad de la escena
    scene[targetProp] = image;
  });
}






mostrarPanelEstadisticas(estadisticas) {
  const panel = document.getElementById('hudEstadisticas');
  const lista = document.getElementById('listaEstadisticas');

  lista.innerHTML = ''; // Limpiar anterior

  estadisticas.forEach(stat => {
    const div = document.createElement('div');
    div.classList.add('hud-personaje');

    div.innerHTML = `
      <img src="${stat.imagen}" alt="${stat.name}">
      <div>
        <strong>${stat.name}</strong><br>
        <span class="yellow">${stat.nivel}</span>
      </div>
    `;

    lista.appendChild(div);
  });

  panel.classList.remove('hidden');
}

ocultarPanelEstadisticas() {
  document.getElementById('hudEstadisticas').classList.add('hidden');
}



mostrarPanelReputacion(personajes) {
  const panel = document.getElementById('hudReputacion');
  const lista = document.getElementById('listaReputacion');

  lista.innerHTML = ''; // Limpiar contenido previo

  personajes.forEach(p => {
    const div = document.createElement('div');
    div.classList.add('hud-personaje');

    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <div>
        <strong>${p.nombre}</strong><br>
        <span class="yellow">Status de Reputación : ${p.reputacion}</span>
      </div>
    `;

    lista.appendChild(div);
  });

  panel.classList.remove('hidden');
}

ocultarPanelReputacion() {
  document.getElementById('hudReputacion').classList.add('hidden');
}

/*
  // Pide un nuevo token al backend (/auth) y lo guarda en this.token
  async authenticate() {
    try {
      const res = await fetch(`${this.serverclient}/auth`, {
        method: 'POST',
        credentials: 'include', // para que llegue la cookie HttpOnly
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName: this.playerName })
      });
      const payload = await res.json();
      if (res.ok && payload.token) {
        this.token = payload.token;
      } else {
        console.error('No se obtuvo token al autenticar:', payload);
      }
    } catch (err) {
      console.error('Error en authenticate():', err);
    }
  }

  */

  // Basic JWT format check
  tokenValido(token) {
    return typeof token === 'string' && token.split('.').length === 3;
  }

  // 1) Authenticate and load
  async initialize() {
    if (!this.playerName) return;
    try {
      // Auth
      const authRes = await fetch(`${this.serverclient}/auth`, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName: this.playerName })
      });
      if (!authRes.ok) return console.error('Auth fallido', authRes.status);
      const { token } = await authRes.json();
      this.token = token;

      // Load data
      await this.loadPlayerData();
    } catch (err) {
      console.error('Error en initialize:', err);
    }
  }
 // 2) Load player data (renamed to avoid conflict)
  async loadPlayerData() {
    if (!this.token || !this.tokenValido(this.token)) {
      await this.reautenticarYReintentar();
      return;
    }
    try {
      const res = await fetch(`${this.serverclient}/load/${encodeURIComponent(this.playerName)}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      });
      const text = await res.text();
      const data = JSON.parse(text);
      if (!res.ok) return console.error('Error al cargar:', data);

      // Initialize state
      this.STATE = { slots: new Array(40).fill(null), quickSlots: new Array(7).fill(null), selectedItem: null };
      data.inventory?.forEach(s => {
        // Only map known items
        if (typeof s.id === 'number' && s.objeto && this.ItemDefinitions[s.objeto] && s.id < 40) {
          this.STATE.slots[s.id] = { id: s.objeto, count: s.cantidad };
        }
      });
      data.chest?.forEach(s => {
        if (typeof s.id === 'number' && s.objeto && this.ItemDefinitions[s.objeto] && s.id < 7) {
          this.STATE.quickSlots[s.id] = { id: s.objeto, count: s.cantidad };
        }
      });

      // Render slots
      for (let i = 0; i < 40; i++) this.renderSlot(i);
      for (let i = 0; i < 7;  i++) this.renderSlot(i);

      // Assign player props
      ['posicionplayerx','posicionplayery','vidaPorcentaje','aguaPorcentaje','comidaPorcentaje','speed','mundo','moneda','nivel','nivel_exp','sabiduria','sabiduria_exp','fuerza','fuerza_exp','agricultura','agricultura_exp','misiones','Username']
        .forEach(prop => { if (data[prop] !== undefined) this[prop] = data[prop]; });

      if (this.player) {
        this.player.setVisible(true);
        this.player.x = this.posicionplayerx;
        this.player.y = this.posicionplayery;
      }
      console.log('Datos cargados exitosamente');
    } catch (e) {
      console.error('Error de red al cargar:', e);
    }
  }

  // 3) Re-auth & retry load
  async reautenticarYReintentar() {
    try {
      const res = await fetch(`${this.serverclient}/auth`, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName: this.playerName })
      });
      const data = await res.json();
      if (data.token) {
        this.token = data.token;
        console.log('Token renovado, recargando datos...');
        await this.loadPlayerData();
      }
    } catch (err) {
      console.error('Error al reautenticar:', err);
    }
  }

  // 4) Save game state
  async savegg() {
    if (!this.token) return;
    const inventoryData = this.STATE.slots.map((s, i) => ({ id: i, objeto: s?.id ?? null, cantidad: s?.count ?? 0, tipo: 'inventario' }));
    const chestData     = this.STATE.quickSlots.map((s, i) => ({ id: i, objeto: s?.id ?? null, cantidad: s?.count ?? 0, tipo: 'cofre' }));
    this.moneda = Math.floor(this.moneda || 0); 
    const payload = {
      posicionplayerx: this.posicionplayerx, posicionplayery: this.posicionplayery,
      vidaPorcentaje: this.vidaPorcentaje, aguaPorcentaje: this.aguaPorcentaje, comidaPorcentaje: this.comidaPorcentaje,
      nivel: this.nivel, nivel_exp: this.nivel_exp, sabiduria: this.sabiduria, sabiduria_exp: this.sabiduria_exp,
      fuerza: this.fuerza, fuerza_exp: this.fuerza_exp, agricultura: this.agricultura, agricultura_exp: this.agricultura_exp,
      speed: this.speed, mundo: this.mundo, moneda: this.moneda, Username: this.Username, misiones: this.misiones,
      inventory: inventoryData, chest: chestData
    };
    try {
      const resp = await fetch(`${this.serverclient}/save/${encodeURIComponent(this.playerName)}`, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` },
        body: JSON.stringify(payload)
      });
      const text = await resp.text();
      const resData = JSON.parse(text);
      if (!resp.ok) {
        console.error('Error al guardar:', resData);
        if (resData.error?.includes('Token inválido') || resData.error?.includes('expirado'))
          await this.reautenticarYGuardar();
        return;
      }
      console.log('Datos guardados correctamente');
    } catch (e) {
      console.error('Error de red al guardar:', e);
    }
  }

  // 5) Re-auth & retry save
  async reautenticarYGuardar() {
    try {
      const res = await fetch(`${this.serverclient}/auth`, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName: this.playerName })
      });
      const data = await res.json();
      if (data.token) {
        this.token = data.token;
        console.log('Token renovado, guardando datos...');
        await this.savegg();
      }
    } catch (err) {
      console.error('Error al reautenticar para guardar:', err);
    }
  }





actualizarBarra(valorActual, valorMaximo) {
  const barra = document.getElementById("yellow-bar-fill");
  if (barra) {
    const porcentaje = (valorActual / valorMaximo) * 100;
    barra.style.width = porcentaje + "%";
  }
}

















actualizarImagenJugador(imgSrc) {
  document.getElementById('player-image').src = imgSrc;
}
actualizarNombreUsuario(nombre) {
  document.getElementById('username').textContent = nombre;
}
actualizarBarraVida(porcentaje) {
  const healthFill = document.querySelector('#health-bar .status-fill');
  healthFill.style.width = porcentaje + '%';
  healthFill.textContent = `Vida ${porcentaje}%`;
}
actualizarBarraAgua(porcentaje) {
  const waterFill = document.querySelector('#water-bar .status-fill');
  waterFill.style.width = porcentaje + '%';
  waterFill.textContent = `Agua ${porcentaje}%`;
}
actualizarBarraComida(porcentaje) {
  const foodFill = document.querySelector('#food-bar .status-fill');
  foodFill.style.width = porcentaje + '%';
  foodFill.textContent = `Comida ${porcentaje}%`;
}





  setupChatButton() {
    this.chatBtn = document.getElementById('open-chat-btn');
    this.chatPanel = document.getElementById('chat-panel');

    if (this.chatBtn && this.chatPanel) {
      this.chatBtn.style.display = 'flex';

      this.chatBtn.addEventListener('click', () => {
        this.toggleChatPanel();
      });
    } else {
      console.warn('Botón o panel de chat no encontrados en el DOM.');
    }
  }

  toggleChatPanel() {
    this.chatPanel.classList.toggle('chat-hidden');
  }






  
  
    update(time, delta) {
            



        // corriendo guardado

        if (this.elipeticiones === 0) {
            
          if (this.sceneActive) {
            // Acumula el tiempo transcurrido
            this.saveTimer += delta;
        
            // Si han pasado 1000 ms (1 segundos)
            if (this.saveTimer >= 1000) {
                this.savegg();
                this.saveTimer = 0;
              }


            }
          }
          
        


        // cargando datos
          
        document.getElementById('info-text').textContent = `${this.moneda} GL`;


    
  
  
        // guardando posicion
        this.previousPosition = { x: this.player.x, y: this.player.y };

          
        this.posicionplayerx = this.player.x;
        this.posicionplayery = this.player.y;

    
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


                // ✅ Token aún válido, usarlo directamente
                this.savegg();
                this.saveTimer = 0;


            
          // Ocultar el HUD principal
          document.getElementById('game-hud').classList.remove('hud-visible');
          document.getElementById('game-hud').classList.add('hud-hidden');

          // Limpiar el texto de la moneda
          document.getElementById('info-text').textContent = '';

          // Ocultar casillas rápidas
          const slots = document.querySelectorAll('.quick-slot');
          slots.forEach(slot => {
            slot.style.display = 'none';
          });

          // Ocultar el botón de misión
          document.getElementById('quest-button').style.display = 'none';

          // Ocultar hub de vida, agua y comida
          document.getElementById('hub').classList.add('hidden');

          // Opcional: ocultar la imagen del jugador si quieres
          this.actualizarImagenJugador(''); // o puedes ocultar el elemento directamente con `display: 'none'`

          // Opcional: limpiar el nombre de usuario
          this.actualizarNombreUsuario('');

          // Opcional: resetear barras a 0 o algún estado oculto
          this.actualizarBarraVida(0);
          this.actualizarBarraAgua(0);
          this.actualizarBarraComida(0);

          // Ocultar chat y contenedor del HUD extendido
          document.getElementById('hud-containerx2').style.display = 'none';

          const chatBtn = document.getElementById('open-chat-btn');
          const chatPanel = document.getElementById('chat-panel');

          if (chatBtn) chatBtn.style.display = 'none';
          if (chatPanel) chatPanel.style.display = 'none';

          // ocultar coodenadas

          document.getElementById('game-ui-text').style.display = 'none';

          
            // ocultando barra de correr
            
            document.getElementById("yellow-bar-container").style.display = "none";

















          }


          
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

    this.actualizarBarra(this.progress * 100, 100); // Actualiza al 30%

    // Mostrar la barra solo cuando se presiona la tecla "Z"
    if (this.keyZ.isDown) {
      document.getElementById("yellow-bar-container").style.display = "block";


      if (this.progress <= 0.0) {
        this.speed = 2.7;
        this.player.anims.msPerFrame = 111;
      } else {
        
        this.speed = 4.5;
        this.player.anims.msPerFrame = 65;

      }

    } else {
      document.getElementById("yellow-bar-container").style.display = "none";
      this.speed = 2.7;
      this.player.anims.msPerFrame = 111;
    }

    document.querySelector('#quest-button .quest-text').textContent = Math.round(this.progress * 100) + '%';




      


    document.getElementById('game-ui-text').textContent = `Coordinates : ${this.player.x.toFixed(2)} Y: ${this.player.y.toFixed(2)} | Mapa: X: ${mapX} Y: ${mapY}`;

    }
  
  }