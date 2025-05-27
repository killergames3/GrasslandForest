// eslint-disable-next-line no-unused-vars
class GameScene extends Phaser.Scene {
  constructor(scene) {
    super({ key: "GameScene" });

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

    // limpiando tiles

    
    if (this.textures.exists('tiles')) {
      this.textures.remove('tiles');
    }

    
    if (this.textures.exists('casa_tienda')) {
      this.textures.remove('casa_tienda');
    }

    // Cargar recursos
    
    this.load.image('tiles', './Game/MAPAS/tiles.png');

    this.load.tilemapTiledJSON('tilemap', './Maps/mapa_principal.json');

    // casa

    this.load.image('casa_tienda_png', './Game/Objetos/casa tienda.png');
    this.load.image('casa_herreria_png', './Game/Objetos/casa de herreria.png');
    this.load.image('casa_posiones_png', './Game/Objetos/casa de pociones.png');
    this.load.image('casa_npc_png', './Game/Objetos/casa de npc.png');
    this.load.image('casa_comida_png', './Game/Objetos/casa de comida.png');

    this.load.image('postas_png', './Game/Objetos/poste.png');
    this.load.image('postas_encendido_png', './Game/Objetos/poste encendido.png');
  

    

    // base del portal

    
    this.load.image('base_potal_png', './Game/Objetos/base.png');
    
    this.load.image('pilar_portal1_png', './Game/Objetos/pilar 1.png');
    this.load.image('pilar_portal2_png', './Game/Objetos/pilar 2.png');
    this.load.image('pilar_portal3_png', './Game/Objetos/pilar 3.png');




    // arbol

    this.load.image('arbol_png', './Game/Objetos/arbol.png');

    // pinos

    this.load.image('pinos_png', './Game/Objetos/arbol_pinos-principal.png');

    // arbusto
    

    this.load.image('arbusto_png', './Game/Objetos/arbusto.png');

    


    


    

    /*
    this.load.image('tiles', './Game/MAPAS/tileset_maprind.png');
    this.load.image('tiles1', './Game/MAPAS/Tileset_Road.png');
    this.load.image('tiles2', './Game/Objetos/arbolx1.png');
    this.load.image('tiles3', './Game/Objetos/casa222.png');
    this.load.image('tilep6', './Game/Objetos/casa1.png');
    this.load.image('tilep7', './Game/Objetos/casa2.png');
    this.load.tilemapTiledJSON('tilemap', './Maps/mapaxd.json');
    */

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
    this.load.image('cosecha_1', './Game/Source/futro1.png');
    this.load.image('regadoraImagen', './Game/Source/recurso2.png');
    this.load.image('tijerasImagen', './Game/Source/tijeras.png');
    this.load.image('instrumento-pesca', './Game/Source/pesca-instrumento.png');


    // cofre de inventario extra

    this.load.image('cofreImagen', './Game/Source/cofre.png');

    // imagen del minimap

    this.textures.remove('minimapimage');

    this.load.image('minimapimage', './Game/MAPAS/minimap.png');

    //this.load.image('arbol', './Game/Objetos/arbolx.png');
    //this.load.image('arbol1', './Game/Objetos/arbolx1.png');

    // moneda

    this.load.image('monedaimg', './Game/Source/moneda.png');

    // chat
    
    this.load.image('chat', './Game/Source/chat.png');

    // mochila con letra I y con triangulo
    
    this.load.image('mochila', './Game/Source/Mochila.png');
    this.load.image('letrai', './Game/Source/tecla_i.png');
    this.load.image('triangulo', './Game/Source/Triangulo.png');

    // señalador (bota) de correr
    
    this.load.image('bota', './Game/Source/bota.png');

    // boton de estadisticas del personaje

    this.load.image('botonpersonaje', './Game/Source/boton.png');
    this.load.image('botonpersonaje1', './Game/Source/boton1.png');

    // perfiles de estadisticas
    
    this.load.image('Perfil1', './Game/Source/Perfil_Reputacion/1.png');
    this.load.image('Perfil2', './Game/Source/Perfil_Reputacion/2.png');
    this.load.image('Perfil3', './Game/Source/Perfil_Reputacion/3.png');
    this.load.image('Perfil4', './Game/Source/Perfil_Reputacion/4.png');

    this.load.image('Perfils1', './Game/Source/Perfil_stadisticas/1.png');
    this.load.image('Perfils2', './Game/Source/Perfil_stadisticas/2.png');
    this.load.image('Perfils3', './Game/Source/Perfil_stadisticas/3.png');
    this.load.image('Perfils4', './Game/Source/Perfil_stadisticas/4.png');


    // siembra tierra seca

    this.load.image('tierra_seca', './Game/Objetos/tierra_seca.png');
    this.load.image('tierra_mojada', './Game/Objetos/tierra_mojada.png');

    // interacciones de siembra con planta 1

    
    this.load.image('tierra_seca_plant', './Game/Objetos/Plantas/planta_1/1.png');
    this.load.image('tierra_mojada_plant', './Game/Objetos/Plantas/planta_1/2.png');
    this.load.image('tierra_mojada_plant2', './Game/Objetos/Plantas/planta_1/3.png');
    this.load.image('tierra_mojada_plant3', './Game/Objetos/Plantas/planta_1/4.png');

    // npc

    this.load.image('NPCgranjero', './Game/Objetos/NPC/NPCgranjero.png');
    this.load.image('NPCherrero', './Game/Objetos/NPC/NPCherrero.png');
    
    this.load.image('NPCmago', './Game/Objetos/NPC/NPCmago.png');
    this.load.image('NPCjoyero', './Game/Objetos/NPC/NPCjoyero.png');
    this.load.image('NPCguardian', './Game/Objetos/NPC/NPCguardian.png');

    

    

    









    // si no existen los valores o argumentos del jugador se crean en la bd y si ya existen se leen automaticamente.

    this.barras = [
      { barra: this.add.rectangle(100, 100, 200, 20, 0xff0000).setVisible(false) }, // Vida
      { barra: this.add.rectangle(100, 130, 200, 20, 0x00ff00).setVisible(false) }, // Agua
      { barra: this.add.rectangle(100, 160, 200, 20, 0x0000ff).setVisible(false) }  // Comida
    ];
    
    this.currentAccount = this.registry.get("account");

    this.playerName = this.currentAccount;
    this.player = this.physics.add.sprite(100, 100, 'playerTexture');
    this.player.setVisible(false);
    this.vidaPorcentaje = null;
    this.aguaPorcentaje = null;
    this.comidaPorcentaje = null;

    this.nivel = null;
    this.nivel_exp = null;
    if ('sabiduria' in this) {
      console.log("la propiedad sabiduria ya existe .")
    } else {
      this.sabiduria = null;
      this.sabiduria_exp = null;
    }
    this.fuerza = null;
    this.fuerza_exp = null;
    this.agricultura = null;
    this.agricultura_exp = null;
    this.misiones = null;
    this.usuarioxx = "----";



    this.speed = null;
    this.casillas = [];       // Inventario
    this.casillasExtra = [];  // Cofre
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




    // registro de mirada 

    this.registro_mirada_personaje = "derecha";

    // ver reputacion

    this.ver = 0;
    this.ver1 = 0;




  }

  create() {
    

    this.phaser_ancho = this.scale.width;
    this.phaser_largo = this.scale.height;

    this.scene.stop('tiendajuego');
    this.scene.remove('tiendajuego');
    this.scene.add('tiendajuego', tiendajuego, false);

    // Cargar el tilemap y el conjunto de tiles
    this.map = this.make.tilemap({ key: 'tilemap' });
    const tileset = this.map.addTilesetImage('Tileset_mapa', 'tiles', 16, 16);
    this.backgroundLayer = this.map.createLayer('mapa_principal', tileset, 0, 0);

    // Después de crear el mapa y capas
    /*
    this.nightOverlay = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000033, 0.5);
    this.nightOverlay.setOrigin(0);
    this.nightOverlay.setScrollFactor(0);
    this.nightOverlay.setDepth(11);

    */
    // 1) Enciende el sistema de luces con tu color ambiental
    // 0) Activa luces antes de todo

        // 1) Crea tu overlay oscuro (depth 11)
    const w = this.cameras.main.width;
    const h = this.cameras.main.height;

    this.tempo = 0.0;
    this.tempoTimer = 0;

    if (this.nightOverlay) {
      this.nightOverlay.clearMask();   // Elimina la máscara
      this.nightOverlay.destroy();     // Destruye el overlay oscuro
      this.nightOverlay = null;
    }

    if (this.lightImage) {
      this.lightImage.destroy();       // Destruye la imagen usada como máscara
      this.lightImage = null;
    }

    if (this.textures.exists('lights-canvas')) {
      this.textures.remove('lights-canvas');  // Elimina la textura canvas de Phaser
    }


    // 1) Overlay oscuro fijo en pantalla (depth 11)
    this.nightOverlay = this.add.rectangle(0, 0, w, h, 0x000033, this.tempo)
      .setOrigin(0)
      .setScrollFactor(0)   // fijado en pantalla
      .setDepth(11);

    // 2) Creamos el canvas-textura que guardará TODOS los degradados
    const canvasTex = this.textures.createCanvas('lights-canvas', this.map.widthInPixels, this.map.heightInPixels);
    const ctx       = canvasTex.context;

    // 3) Imagen (invisible) que usaremos para la máscara
    this.lightImage = this.add.image(0, 0, 'lights-canvas')
      .setOrigin(0)
      .setDepth(12)
      .setVisible(false);    // no la vemos, sólo sirve como fuente de máscara

    // 4) Creamos y aplicamos la máscara invertida
    const mask = this.lightImage.createBitmapMask();
    mask.invertAlpha = true;
    this.nightOverlay.setMask(mask);

    // 5) Dibujamos varios focos suaves
    this.addSoftLight(1350, 913, 250, 1.0);
    this.addSoftLight(1470, 913, 250, 1.0);

    this.addSoftLight(2639, 661, 250, 1.0);
    this.addSoftLight(2747, 661, 250, 1.0);
    
    this.addSoftLight(2917, 661, 250, 1.0);
    this.addSoftLight(3028, 661, 250, 1.0);
    
    this.addSoftLight(1904, 1458, 250, 1.0);
    this.addSoftLight(2023, 1458, 250, 1.0);
    
    this.addSoftLight(2166, 1458, 250, 1.0);
    this.addSoftLight(2282, 1458, 250, 1.0);

    this.addSoftLight(1158, 1938, 250, 1.0);
    this.addSoftLight(1282, 1938, 250, 1.0);

    this.addSoftLight(1158, 2172, 250, 1.0);
    this.addSoftLight(1282, 2172, 250, 1.0);
    
    this.addSoftLight(1914, 2678, 250, 1.0);
    this.addSoftLight(2032, 2678, 250, 1.0);
    
    this.addSoftLight(2161, 2678, 250, 1.0);
    this.addSoftLight(2283, 2678, 250, 1.0);

    this.addSoftLight(1907, 3233, 250, 1.0);
    this.addSoftLight(2025, 3233, 250, 1.0);

    this.addSoftLight(2163, 3233, 250, 1.0);
    this.addSoftLight(2282, 3233, 250, 1.0);

    this.addSoftLight(2780, 3477, 250, 1.0);
    this.addSoftLight(2899, 3477, 250, 1.0);
    
    this.addSoftLight(1358, 3475, 250, 1.0);
    this.addSoftLight(1477, 3475, 250, 1.0);
    
    this.addSoftLight(2918, 2093, 250, 1.0);
    this.addSoftLight(3039, 2093, 250, 1.0);





    
    // this.textures.get('tiles').setFilter(Phaser.Textures.FilterMode.NEAREST);


    // Configurar los límites del mundo
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);


    // arena transparente

    /*

    const tileset1 = this.map.addTilesetImage('patrontienda', 'tiles1', 16, 16);
    this.capaCasa = this.backgroundLayer = this.map.createLayer('capatienda', tileset1, 0, 0);

    */

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











    // METER DENTRO DE LAS FUNCIONES IMPORTANTE
          // Opcional: dibuja los rectángulos de colisión (en verde semitransparente) para depuración.
      /*
      let debugGraphics = this.add.graphics();
      debugGraphics.fillStyle(0x00ff00, 0.3);
      debugGraphics.fillRectShape(rect);
      */

    

    // Obtén la capa de objetos llamada "colisioncasa1"
    const objectLayerf = this.map.getObjectLayer('area_colision_general');
    this.collisionRectangles = [];

    // Recorre cada objeto de la capa y lo convierte en un rectángulo para colisión.
    objectLayerf.objects.forEach(obj => {
      let rect = new Phaser.Geom.Rectangle(obj.x, obj.y, obj.width, obj.height);
      this.collisionRectangles.push(rect);


    });

    

    const objectLayerf1 = this.map.getObjectLayer('area_entrada_tienda');
    this.collisionRectangles1 = [];

    // Recorre cada objeto de la capa y lo convierte en un rectángulo para colisión.
    objectLayerf1.objects.forEach(obj => {
      let rect1 = new Phaser.Geom.Rectangle(obj.x, obj.y, obj.width, obj.height);
      this.collisionRectangles1.push(rect1);

    });

    

    this.graphics = this.add.graphics();
    // Dibujar un rectángulo solo con borde, sin fondo
    this.graphics.lineStyle(1, 0xff0000);


    
      

    // Crear el personaje (Inicialmente con la imagen de correr hacia abajo)
    this.player = this.physics.add.sprite(this.posicionplayerx, this.posicionplayery, 'player_right_1');
    this.player.setScale(2);
    this.player.setCollideWorldBounds(true); // Evita que el jugador salga del mundo

    // dando z-index personaje
    this.player.setDepth(1);





  /////////////////////////// PINTANDO CASA, OBJETOS Y ARBOLES ////////////////////////


    // tienda

    const imageMapping = {
      casa_tiendax: {
        spriteKey: 'casa_tienda_png',
        targetProp: 'sprite'          
      }
      
    };

    this.createImagesFromObjectLayer(this, this.map, 'casa_tienda', imageMapping);

    // herreria

    const imageMapping1 = {
      casa_herreriax: {
        spriteKey: 'casa_herreria_png', 
        targetProp: 'sprite_h'          
      }
    };

    this.createImagesFromObjectLayer(this, this.map, 'casa_herreria', imageMapping1);

    // posiones

    
    const imageMapping2 = {
      casa_posionesx: {
        spriteKey: 'casa_posiones_png', 
        targetProp: 'sprite_p'          
      }
    };

    this.createImagesFromObjectLayer(this, this.map, 'casa_posiones', imageMapping2);

    // portal
    
    const imageMappingportal = {
      base_portalx: {
        spriteKey: 'base_potal_png', 
        targetProp: 'sprite_base_portal'          
      },
      pilar1x: {
        spriteKey: 'pilar_portal1_png', 
        targetProp: 'sprite_base_portal_pilar1'          
      },
      pilar2x: {
        spriteKey: 'pilar_portal2_png', 
        targetProp: 'sprite_base_portal_pilar2'          
      },
      pilar3x: {
        spriteKey: 'pilar_portal3_png', 
        targetProp: 'sprite_base_portal_pilar3'          
      },
    };


    this.createImagesFromObjectLayer(this, this.map, 'Portal', imageMappingportal);
    


    // casa Npc

    
    const imageMapping3 = {
      casa_npcx1: {
        spriteKey: 'casa_npc_png', 
        targetProp: 'sprite_casa_npc1',  
      },
      casa_npcx2: {
        spriteKey: 'casa_npc_png', 
        targetProp: 'sprite_casa_npc2',          
      },
      casa_npcx3: {
        spriteKey: 'casa_npc_png', 
        targetProp: 'sprite_casa_npc3',          
      }
    };

    this.createImagesFromObjectLayer(this, this.map, 'casa_npc', imageMapping3);

    // casa de comida

    
    const imageMapping4 = {
      casa_comidax: {
        spriteKey: 'casa_comida_png', 
        targetProp: 'sprite_casa_comida'          
      }
    };

    this.createImagesFromObjectLayer(this, this.map, 'casa_comida', imageMapping4);


    // postes

        // casa de comida

    
    const imageMappingpostes = {
      poste1: {
        spriteKey: 'postas_png', 
        targetProp: 'post_1'          
      },
        poste2: {
        spriteKey: 'postas_png', 
        targetProp: 'post_2'          
      },
        poste3: {
        spriteKey: 'postas_png', 
        targetProp: 'post_3'          
      },
        poste4: {
        spriteKey: 'postas_png', 
        targetProp: 'post_4'          
      },
        poste5: {
        spriteKey: 'postas_png', 
        targetProp: 'post_5'          
      },
        poste6: {
        spriteKey: 'postas_png', 
        targetProp: 'post_6'          
      },
        poste7: {
        spriteKey: 'postas_png', 
        targetProp: 'post_7'          
      },
        poste8: {
        spriteKey: 'postas_png', 
        targetProp: 'post_8'          
      },
        poste9: {
        spriteKey: 'postas_png', 
        targetProp: 'post_9'          
      },
        poste10: {
        spriteKey: 'postas_png', 
        targetProp: 'post_10'          
      },
        poste11: {
        spriteKey: 'postas_png', 
        targetProp: 'post_11'          
      },
        poste12: {
        spriteKey: 'postas_png', 
        targetProp: 'post_12'          
      },
        poste13: {
        spriteKey: 'postas_png', 
        targetProp: 'post_13'          
      },
        poste14: {
        spriteKey: 'postas_png', 
        targetProp: 'post_14'          
      },
    };

    this.createImagesFromObjectLayer(this, this.map, 'Lamparas', imageMappingpostes);



    // arboles

    
    
    const imageMapping5 = {
      arbolx1: {
        spriteKey: 'arbol_png', 
        targetProp: 'sprite_arbolx1',  
      },
      arbolx2: {
        spriteKey: 'arbol_png', 
        targetProp: 'sprite_arbolx2',          
      },
      arbolx3: {
        spriteKey: 'arbol_png', 
        targetProp: 'sprite_arbolx3',          
      },
      arbolx4: {
        spriteKey: 'arbol_png', 
        targetProp: 'sprite_arbolx4',          
      },
      arbolx5: {
        spriteKey: 'arbol_png', 
        targetProp: 'sprite_arbolx5',          
      },
      arbolx6: {
        spriteKey: 'arbol_png', 
        targetProp: 'sprite_arbolx6',          
      },
      arbolx7: {
        spriteKey: 'arbol_png', 
        targetProp: 'sprite_arbolx7',          
      },
      arbolx8: {
        spriteKey: 'arbol_png', 
        targetProp: 'sprite_arbolx8',          
      },
      arbolx9: {
        spriteKey: 'arbol_png', 
        targetProp: 'sprite_arbolx9',          
      },
      arbolx10: {
        spriteKey: 'arbol_png', 
        targetProp: 'sprite_arbolx10',          
      },
      arbolx11: {
        spriteKey: 'arbol_png', 
        targetProp: 'sprite_arbolx11',          
      },
      arbolx12: {
        spriteKey: 'arbol_png', 
        targetProp: 'sprite_arbolx12',          
      },
      arbolx13: {
        spriteKey: 'arbol_png', 
        targetProp: 'sprite_arbolx13',          
      },
      arbolx14: {
        spriteKey: 'arbol_png', 
        targetProp: 'sprite_arbolx14',          
      },
      arbolx15: {
        spriteKey: 'arbol_png', 
        targetProp: 'sprite_arbolx15',          
      },
      arbolx16: {
        spriteKey: 'arbol_png', 
        targetProp: 'sprite_arbolx16',          
      },
      arbolx17: {
        spriteKey: 'arbol_png', 
        targetProp: 'sprite_arbolx17',          
      },
      arbolx18: {
        spriteKey: 'arbol_png', 
        targetProp: 'sprite_arbolx18',          
      },
      arbolx19: {
        spriteKey: 'arbol_png', 
        targetProp: 'sprite_arbolx19',          
      },
    };

    this.createImagesFromObjectLayer(this, this.map, 'arboles', imageMapping5);

    // pinos

    
    const imageMapping1pinos = {
      pinos1x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos1',  
      },
        pinos2x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos2',  
      },
        pinos3x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos3',  
      },
        pinos4x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos4',  
      },
        pinos5x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos5',  
      },
        pinos6x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos6',  
      },
        pinos7x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos7',  
      },
        pinos8x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos8',  
      },
        pinos9x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos9',  
      },
        pinos10x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos10',  
      },
        pinos11x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos11',  
      },
        pinos12x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos12',  
      },
        pinos13x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos13',  
      },
        pinos14x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos14',  
      },
        pinos15x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos15',  
      },
        pinos16x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos16',  
      },
        pinos17x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos17',  
      },
        pinos18x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos18',  
      },
        pinos19x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos19',  
      },
        pinos20x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos20',  
      },
        pinos21x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos21',  
      },
        pinos22x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos22',  
      },
        pinos23x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos23',  
      },
        pinos24x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos24',  
      },
        pinos25x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos25',  
      },
        pinos26x: {
        spriteKey: 'pinos_png', 
        targetProp: 'sprite_pinos26',  
      }
    };

    this.createImagesFromObjectLayer(this, this.map, 'Pinos', imageMapping1pinos);

    // arbustos

    
    const imageMapping6 = {
      arbustox1: {
        spriteKey: 'arbusto_png', 
        targetProp: 'sprite_arbustox1',  
      },
      arbustox2: {
        spriteKey: 'arbusto_png', 
        targetProp: 'sprite_arbustox2',  
      },
    };

    this.createImagesFromObjectLayer(this, this.map, 'arbustos', imageMapping6);




    ////////////////////////////////////////////////////////////////////////////////////




    // -------------------- TRANSPARENCIA A CASAS, OBJETOS Y ARBOLES --------------------



    // transparencia de casa tienda



    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_tienda',
      this.player,
      this.sprite,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    // transparencia de casa herreria

    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_herreria',
      this.player,
      this.sprite_h,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    // transparencia de casa posiones

    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_posiones',
      this.player,
      this.sprite_p,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    // transparencia de casa npc 1

    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_c_npc1',
      this.player,
      this.sprite_casa_npc1,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    // transparencia de casa npc 2

    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_c_npc2',
      this.player,
      this.sprite_casa_npc2,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    // transparencia de casa npc 3

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_c_npc3',
      this.player,
      this.sprite_casa_npc3,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    // transparencia de casa comida

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_comida',
      this.player,
      this.sprite_casa_comida,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    // transparencia postes

    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_poste_1',
      this.player,
      this.post_1,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_poste_2',
      this.player,
      this.post_2,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_poste_3',
      this.player,
      this.post_3,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_poste_4',
      this.player,
      this.post_4,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_poste_5',
      this.player,
      this.post_5,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_poste_6',
      this.player,
      this.post_6,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_poste_7',
      this.player,
      this.post_7,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_poste_8',
      this.player,
      this.post_8,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_poste_9',
      this.player,
      this.post_9,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_poste_10',
      this.player,
      this.post_10,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_poste_11',
      this.player,
      this.post_11,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_poste_12',
      this.player,
      this.post_12,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_poste_13',
      this.player,
      this.post_13,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_poste_14',
      this.player,
      this.post_14,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    // transparencia en los arboles

    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_arbol1',
      this.player,
      this.sprite_arbolx1,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_arbol2',
      this.player,
      this.sprite_arbolx2,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_arbol3',
      this.player,
      this.sprite_arbolx3,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_arbol4',
      this.player,
      this.sprite_arbolx4,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_arbol5',
      this.player,
      this.sprite_arbolx5,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_arbol6',
      this.player,
      this.sprite_arbolx6,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_arbol7',
      this.player,
      this.sprite_arbolx7,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_arbol8',
      this.player,
      this.sprite_arbolx8,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_arbol9',
      this.player,
      this.sprite_arbolx9,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_arbol10',
      this.player,
      this.sprite_arbolx10,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_arbol11',
      this.player,
      this.sprite_arbolx11,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_arbol12',
      this.player,
      this.sprite_arbolx12,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_arbol13',
      this.player,
      this.sprite_arbolx13,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_arbol14',
      this.player,
      this.sprite_arbolx14,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_arbol15',
      this.player,
      this.sprite_arbolx15,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_arbol16',
      this.player,
      this.sprite_arbolx16,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_arbol17',
      this.player,
      this.sprite_arbolx17,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_arbol18',
      this.player,
      this.sprite_arbolx18,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_arbol19',
      this.player,
      this.sprite_arbolx19,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );



    // ----------------------------  Pinos ----------------------------------------

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos1',
      this.player,
      this.sprite_pinos1,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos2',
      this.player,
      this.sprite_pinos2,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos3',
      this.player,
      this.sprite_pinos3,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos4',
      this.player,
      this.sprite_pinos4,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos5',
      this.player,
      this.sprite_pinos5,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos6',
      this.player,
      this.sprite_pinos6,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos7',
      this.player,
      this.sprite_pinos7,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos8',
      this.player,
      this.sprite_pinos8,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos9',
      this.player,
      this.sprite_pinos9,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos10',
      this.player,
      this.sprite_pinos10,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos11',
      this.player,
      this.sprite_pinos11,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos12',
      this.player,
      this.sprite_pinos12,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos13',
      this.player,
      this.sprite_pinos13,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos14',
      this.player,
      this.sprite_pinos14,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos15',
      this.player,
      this.sprite_pinos15,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos16',
      this.player,
      this.sprite_pinos16,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos17',
      this.player,
      this.sprite_pinos17,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos18',
      this.player,
      this.sprite_pinos18,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos19',
      this.player,
      this.sprite_pinos19,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos20',
      this.player,
      this.sprite_pinos20,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos21',
      this.player,
      this.sprite_pinos21,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos22',
      this.player,
      this.sprite_pinos22,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos23',
      this.player,
      this.sprite_pinos23,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos24',
      this.player,
      this.sprite_pinos24,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos25',
      this.player,
      this.sprite_pinos25,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pinos26',
      this.player,
      this.sprite_pinos26,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );


    // transparencia a pilares del portal

    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pilar1_portal',
      this.player,
      this.sprite_base_portal_pilar1,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );

    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pilar2_portal',
      this.player,
      this.sprite_base_portal_pilar2,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
    
    this.zonasTransparencia = this.createMultipleTransparencyZones(
      this,
      this.map,
      'area_transparencia_pilar3_portal',
      this.player,
      this.sprite_base_portal_pilar3,
      {
        activeAlpha: 0.5, // Opacidad al entrar en la zona
        activeDepth: 2,   // z-index en la zona
        normalAlpha: 1,   // Opacidad al salir de la zona
        normalDepth: 0    // z-index al salir de la zona
      }
    );
       





    // ------------------------------------------------------------------------------


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
      this.usuariox.setDepth(11);

      // barra de energia

      this.progress = 1;           // Valor actual de la barra (1 = 100%)
      this.maxWidth = 300;       // Ancho total de la barra
      this.barHeight = 10;       // Altura de la barra
      this.barX = this.phaser_ancho / 2 - 145;           // Posición X de la barra
      this.barY = this.phaser_largo - 75;            // Posición Y de la barra

      console.log(this.barX);
      console.log(this.barY);

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
          frameRate: 9,
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
          frameRate: 9,
          repeat: -1
        });
      }

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
    this.coordinatesText.setDepth(11); // Asegura que el texto esté visible sobre otros elementos

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
    this.hudContainer.setDepth(11);

    // CARGANDO IMAGEN DEL PERFIL

    // Agregar la imagen y anclarla a la cámara
    this.imagen_Perfil = this.add.image(10, 25, 'imagen_Perfil').setOrigin(0, 0);
    this.imagen_Perfil.setScrollFactor(0); // Fijar a la cámara
    this.imagen_Perfil.setDepth(11);
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
    this.texto.setDepth(11);

    // TEXTO DE LAS BARRAS

    this.textovida = this.add.text(95, 45, `Vida ${this.vidaPorcentaje}%`, {
      fontFamily: '"PressStart2P"',
      fontSize: '8px',
      color: '#0400ff',
      resolution: 4,
    }).setOrigin(0, 0)
    // Fijar el texto a la cámara
    this.textovida.setScrollFactor(0);
    this.textovida.setDepth(11);

    this.textoagua = this.add.text(95, 60, `Agua ${this.aguaPorcentaje}%`, {
      fontFamily: '"PressStart2P"',
      fontSize: '8px',
      color: '#0400ff',
      resolution: 4,
    }).setOrigin(0, 0)
    // Fijar el texto a la cámara
    this.textoagua.setScrollFactor(0);
    this.textoagua.setDepth(11);

    this.textocomida = this.add.text(90, 75, `Comida ${this.comidaPorcentaje}%`, {
      fontFamily: '"PressStart2P"',
      fontSize: '8px',
      color: '#0400ff',
      resolution: 4,
    }).setOrigin(0, 0)
    // Fijar el texto a la cámara
    this.textocomida.setScrollFactor(0);
    this.textocomida.setDepth(11);

    // Imagen del minimapa

    this.minimapimagesx = this.add.image(this.phaser_ancho - 87, 75, 'minimapimage')
    .setInteractive()
    .setOrigin(0.5)
    .setDepth(10)
    .setDisplaySize(162, 145)
    .setScrollFactor(0);


    // Crear un borde negro usando Graphics
    let border = this.add.graphics();
    border.setDepth(10).setScrollFactor(0);
    border.lineStyle(4, 0x000000, 1); // Grosor del borde, color negro
      border.strokeRect(
      this.minimapimagesx.x - this.minimapimagesx.displayWidth / 2 - 2,  
      this.minimapimagesx.y - this.minimapimagesx.displayHeight / 2 - 2,
      this.minimapimagesx.displayWidth + 4,
      this.minimapimagesx.displayHeight + 4
    );

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

    
    this.panelConfig1 = {
      x: 322,
      y: 160,
      width: 646,
      height: 340,
      innerPadding: 10
    };

    this.scrollOffset1 = 0;

    this.products1 = [
      { key: 'Perfils1', name: 'Nivel del Personaje', price: `Nivel : ${this.nivel} , exp : ${this.nivel_exp}` },
      { key: 'Perfils2', name: 'Nivel Sabiduria', price: `Nivel : ${this.sabiduria} , exp : ${this.sabiduria_exp}` },
      { key: 'Perfils3', name: 'Nivel de Fuerza', price: `Nivel : ${this.fuerza} , exp : ${this.fuerza_exp}` },
      { key: 'Perfils4', name: 'Nivel de Agricultura', price: `Nivel : ${this.agricultura} , exp : ${this.agricultura_exp}` }
    ];

    // Contenedor general
    this.containerGeneral1 = this.add.container(0, 0);
    this.containerGeneral1.setScrollFactor(0)
    this.containerGeneral1.setDepth(11);

    this.createMainPanel1();
    this.showProducts1();

    this.input.on('wheel', this.handleScroll1, this);



    // Evento click en el botón
    boton.on('pointerdown', () => {
        panel.setVisible(!panel.visible); // Alterna visibilidad
        panelsuh.setVisible(!panelsuh.visible);
        textopanelc.setVisible(!textopanelc.visible);
        // Alternar estado
        this.ver1 = +!this.ver1;

        // Mostrar u ocultar todo según `ver`
        this.toggleVisibilityAndInteractivity1(this.ver1);

    });
    
    this.toggleVisibilityAndInteractivity1(this.ver1);

    // boton de reputacion

        // boton personaje
    const boton1 = this.add.image(1230, 215, 'botonpersonaje1')
        .setInteractive()
        .setScrollFactor(0)
        .setDepth(11)
        .setDisplaySize(64, 32);
    // Crear el panel, pero oculto al inicio
    //const panel = this.add.image(400, 300, 'panel').setVisible(false);

    // Si prefieres un panel como rectángulo con texto, también puedes usar un graphics
    const panel1 = this.add.graphics()
        .fillStyle(0x222222 , 0.9) // Color negro con 80% de opacidad
        .fillRoundedRect(320, 100, 650, 400, 15) // Rectángulo con radio de 15
        .setDepth(11)
        .setScrollFactor(0)
        .setVisible(false);
    const panelsuh1 = this.add.graphics()
        .fillStyle(0x00008B , 0.9) // Color negro con 80% de opacidad
        .fillRoundedRect(320, 160, 650, 340, 15) // Rectángulo con radio de 15
        .setDepth(11)
        .setScrollFactor(0)
        .setVisible(false);

    const textopanelc1 = this.add.text(550, 115, '¡Reputacion!', {
          fontSize: '32px',
          fill: '#ffffff',
          fontFamily: 'daimon'
    }).setVisible(false).setScrollFactor(0).setDepth(11);

    //aa
    this.panelConfig = {
      x: 322,
      y: 160,
      width: 646,
      height: 340,
      innerPadding: 10
    };

    this.scrollOffset = 0;

    this.products = [
      { key: 'Perfil1', name: 'Granjero Joe', price: 'buena' },
      { key: 'Perfil2', name: 'Herrero Jack', price: 'buena' },
      { key: 'Perfil3', name: 'Alquimista Colin', price: 'buena' },
      { key: 'Perfil4', name: 'Guardian Rurik', price: 'buena' }
    ];

    // Contenedor general
    this.containerGeneral = this.add.container(0, 0);
    this.containerGeneral.setScrollFactor(0)
    this.containerGeneral.setDepth(11);

    this.createMainPanel();
    this.showProducts();

    this.input.on('wheel', this.handleScroll, this);




    boton1.on('pointerdown', () => {
        panel1.setVisible(!panel1.visible); // Alterna visibilidad
        panelsuh1.setVisible(!panelsuh1.visible);
        textopanelc1.setVisible(!textopanelc1.visible);

        // Alternar estado
        this.ver = +!this.ver;

        // Mostrar u ocultar todo según `ver`
        this.toggleVisibilityAndInteractivity(this.ver);

    });
    
    this.toggleVisibilityAndInteractivity(this.ver);










    // personajes npc

    const imageMapppc = {
      NPCgranjerox: {
        spriteKey: 'NPCgranjero',
        targetProp: 'sprite_npc1'          
      },
      NPCherrerox: {
          spriteKey: 'NPCherrero',
          targetProp: 'sprite_npc2'          
      },
      NPCjoyerox: {
          spriteKey: 'NPCjoyero',
          targetProp: 'sprite_npc3'          
      },
      NPCguardianx: {
          spriteKey: 'NPCguardian',
          targetProp: 'sprite_npc4'          
      },
    };

    /*
    
    this.load.image('NPCgranjero', './Game/Objetos/NPC/NPCgranjero.png');
    this.load.image('NPCherrero', './Game/Objetos/NPC/NPCherrero.png');
    
    this.load.image('NPCmago', './Game/Objetos/NPC/NPCmago.png');
    this.load.image('NPCjoyero', './Game/Objetos/NPC/NPCjoyero.png');
    this.load.image('NPCguardian', './Game/Objetos/NPC/NPCguardian.png');
    */

    this.createImagesFromObjectLayer(this, this.map, 'NPC', imageMapppc);

    this.npcx1 = this.add.text(1829, 3288, 'Granjero Joe', {
        fontFamily: '"PressStart2P"',
        fontSize: '12px',
        color: '#ffffff',
        resolution: 4,
      });

    this.npcx1.setOrigin(0.5);
    this.npcx1.setDepth(9);

        this.npcx2 = this.add.text(3296, 1950, 'Herrero Jack', {
        fontFamily: '"PressStart2P"',
        fontSize: '12px',
        color: '#ffffff',
        resolution: 4,
      });
    this.npcx2.setOrigin(0.5);
    this.npcx2.setDepth(9);
        this.npcx3 = this.add.text(2374, 1515, 'Alquimista Colin', {
        fontFamily: '"PressStart2P"',
        fontSize: '12px',
        color: '#ffffff',
        resolution: 4,
      });
    this.npcx3.setOrigin(0.5);
    this.npcx3.setDepth(9);
        this.npcx4 = this.add.text(3002, 855, 'Guardian Rurik', {
        fontFamily: '"PressStart2P"',
        fontSize: '12px',
        color: '#ffffff',
        resolution: 4,
      });
    this.npcx4.setOrigin(0.5);
    this.npcx4.setDepth(9);











    // inventario de cofre 
    this.cofre = this.add.image(500, 300, 'cofreImagen')
    .setInteractive()
    .setOrigin(0.5)
    .setDepth(0)
    .setDisplaySize(50, 50);  // Establece un tamaño específico para evitar distorsión

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
        .setDepth(11)
        .setScrollFactor(0)
        .setVisible(false)
        .fillStyle(0x222222, 0.9) // Fondo negro transparente
        .fillRoundedRect(this.phaser_ancho / 2 -120, this.phaser_largo / 2 - 120, 240, 140, 15); // Rectángulo con bordes redondeados

    this.infoTextcofre = this.add.text(this.phaser_ancho / 2 - 45, this.phaser_largo / 2 - 118, '¡Cofre!', {
          fontSize: '32px',
          fill: '#ffffff',
          fontFamily: 'daimon'
    }).setVisible(false).setScrollFactor(0).setDepth(11);

    // Fondo semitransparente para el botón de cierre
    this.closeButtoncofre = this.add.text(this.phaser_ancho / 2 + 80, this.phaser_largo / 2 - 118, 'X', {
      fontSize: '32px',
      fill: '#ff0000',
      fontFamily: 'Arial',
      fontStyle: 'bold'
  })
  .setVisible(false)
  .setScrollFactor(0)
  .setDepth(11)
  .setInteractive() // Hacer que el texto sea interactivo
  .on('pointerdown', () => {
      this.rectanguloVinculado2.setVisible(!this.rectanguloVinculado2.visible);
      this.infoTextcofre.setVisible(!this.infoTextcofre.visible);
      this.closeButtoncofre.setVisible(!this.closeButtoncofre.visible);
      this.toggleCofre();
  });

    // Configurar el cofre y su interacción
    this.cofre.on('pointerdown', () => {
      if (this.inventarioAbierto) {
          this.toggleInventario();
          this.panelOculto.setVisible(!this.panelOculto.visible);
          this.infoText.setVisible(!this.infoText.visible);
          this.closeButton.setVisible(!this.closeButton.visible);
      }
        
      this.rectanguloVinculado2.setVisible(!this.rectanguloVinculado2.visible);
      this.infoTextcofre.setVisible(!this.infoTextcofre.visible);
      this.closeButtoncofre.setVisible(!this.closeButtoncofre.visible);
      this.toggleCofre();
    });
  

    // Crear las casillas (visibles y ocultas)
    this.crearCasillas();
    // Agregar algunos recursos de ejemplo
    this.agregarRecursos();

    this.input.keyboard.on('keydown-I', () => {
      if (this.cofreAbierto) {
          this.rectanguloVinculado2.setVisible(!this.rectanguloVinculado2.visible);
          this.infoTextcofre.setVisible(!this.infoTextcofre.visible);
          this.closeButtoncofre.setVisible(!this.closeButtoncofre.visible);
          this.toggleCofre();
      }
  
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





















    


    // Definiendo Rectangulos
    this.parcelas = {};
    for (let i = 1; i <= 24; i++) {
      this.parcelas[`parcela_${i}`] = 0;
    }


    // creando parcelas en cuadros verdes pero en parcela seca

    this.objetos = []; // Lista para guardar cada objeto Tiled + su imagen asociada
    
    const objetosRaw = this.map.getObjectLayer('funcion_siembra_1').objects;

    objetosRaw.forEach(obj => {
      const x = obj.x + obj.width / 2;
      const y = obj.y + obj.height / 2; // ← CORREGIDO: origen Tiled es esquina inferior

      const imagen = this.add.image(x, y, 'tierra_seca');
      imagen.setDisplaySize(obj.width, obj.height);
      imagen.setDepth(0); // Ajusta según necesidad

      this.objetos.push({
        data: obj,       // Objeto original de Tiled
        imagen: imagen   // Imagen visible asociada
      });
    });

    
    // creando parcelas en cuadros verdes pero en parcela mojada

    this.objetos = this.map.getObjectLayer('funcion_siembra_1').objects; // SOLO el push como tú quieres

    this.paleta_de_desiciones = 0;

    this.input.on('pointerdown', (pointer) => {

      // mojar tierra y mojar donde esta sembrado


      if (
        this.objetoSeleccionado &&
        this.objetoSeleccionado.objeto === "regadora"
      ) {
        const x = pointer.worldX;
        const y = pointer.worldY;

        for (const objeto of this.objetos) {
          const dentroDelRectangulo =
            x >= objeto.x &&
            x <= objeto.x + objeto.width &&
            y >= objeto.y &&
            y <= objeto.y + objeto.height;

          if (dentroDelRectangulo) {

            try {
              if (objeto._imagen.texture.key === "tierra_seca_plant") {

                console.log("estaba seca con semilla pero la mojaste");

                // Crear imagen en el momento y reemplazar visualmente
                const imagen = this.add.image(objeto.x + objeto.width / 2, objeto.y + objeto.height / 2, 'tierra_mojada_plant');
                imagen.setDisplaySize(objeto.width, objeto.height);
                imagen.setDepth(0); // Por si necesitas que esté por encima

                // Opcional: puedes guardar esta imagen para reemplazarla después si cambia de estado
                objeto._imagen = imagen;

                this.paleta_de_desiciones = 2;
              }
            } catch (error) {
              console.warn('la tierra esta seca:', error);
              
              // Crear imagen en el momento y reemplazar visualmente
              const imagen = this.add.image(objeto.x + objeto.width / 2, objeto.y + objeto.height / 2, 'tierra_mojada');
              imagen.setDisplaySize(objeto.width, objeto.height);
              imagen.setDepth(0); // Por si necesitas que esté por encima

              // Opcional: puedes guardar esta imagen para reemplazarla después si cambia de estado
              objeto._imagen = imagen;

              this.paleta_de_desiciones = 1;
              
            }

            if (objeto) {

                
                // creando Actividad positiva en las parcelas

                if (objeto.name === "cuadro1") {

                  if (this.paleta_de_desiciones === 0 || 1) {

                    if (this.parcelas["parcela_1"] === 0) {
                        
                      // clasificando el proceso de siembra para contador

                      this.parcelas["parcela_1"] = 1;

                      // denominando conteo para proseguir el uso de parcela o su desactivacion . 

                      //this.activacion["activacion_1"] = this.paleta_de_desiciones;

                      console.log(this.parcelas["parcela_1"]);

                      this.paleta_de_desiciones = 0;
                      
                      
                    } else if (this.parcelas["parcela_1"] === 1) {

                      this.paleta_de_desiciones = 0;

                      console.log("no puedes volver a usar el 1");
                      
                    }
                    
                    
                  } else if (this.paleta_de_desiciones === 2) {

                    this.parcelas["parcela_1"] = 2;
                    
                    this.paleta_de_desiciones = 0;
                    
                  }
                  
                }

                
              

              
            }

            


            // console.log(objeto._imagen.texture.key);

            break;
          }
        }
      }

      // sembrar en seco y sembra donde esta mojado

      if (
        this.objetoSeleccionado &&
        this.objetoSeleccionado.objeto === "semilla"
      ) {
        const x = pointer.worldX;
        const y = pointer.worldY;

        for (const objeto of this.objetos) {
          const dentroDelRectangulo =
            x >= objeto.x &&
            x <= objeto.x + objeto.width &&
            y >= objeto.y &&
            y <= objeto.y + objeto.height;

          if (dentroDelRectangulo) {

            try {
              if (objeto._imagen.texture.key === "tierra_mojada") {

                console.log("sembraste en tierra mojada");


                // Crear imagen en el momento y reemplazar visualmente
                const imagen = this.add.image(objeto.x + objeto.width / 2, objeto.y + objeto.height / 2, 'tierra_mojada_plant');
                imagen.setDisplaySize(objeto.width, objeto.height);
                imagen.setDepth(0); // Por si necesitas que esté por encima

                // Opcional: puedes guardar esta imagen para reemplazarla después si cambia de estado
                objeto._imagen = imagen;
                this.paleta_de_desiciones = 2;
              }
            } catch (error) {

              // Crear imagen en el momento y reemplazar visualmente
              const imagen = this.add.image(objeto.x + objeto.width / 2, objeto.y + objeto.height / 2, 'tierra_seca_plant');
              imagen.setDisplaySize(objeto.width, objeto.height);
              imagen.setDepth(0); // Por si necesitas que esté por encima

              // Opcional: puedes guardar esta imagen para reemplazarla después si cambia de estado
              objeto._imagen = imagen;
              this.paleta_de_desiciones = 1;

            }


            //console.log(objeto._imagen.texture.key);

            
            if (objeto) {

                
                // creando Actividad positiva en las parcelas

                if (objeto.name === "cuadro1") {

                  if (this.paleta_de_desiciones === 0 || 1) {

                    if (this.parcelas["parcela_1"] === 0) {
                        
                      // clasificando el proceso de siembra para contador

                      this.parcelas["parcela_1"] = 1;

                      // denominando conteo para proseguir el uso de parcela o su desactivacion . 

                      //this.activacion["activacion_1"] = this.paleta_de_desiciones;

                      console.log(this.parcelas["parcela_1"]);

                      this.paleta_de_desiciones = 0;
                      
                      
                    } else if (this.parcelas["parcela_1"] === 1) {

                      this.paleta_de_desiciones = 0;

                      console.log("no puedes volver a usar el 1");
                      
                    }
                    
                    
                  } else if (this.paleta_de_desiciones === 2) {

                    this.parcelas["parcela_1"] = 2;
                    
                    this.paleta_de_desiciones = 0;
                    
                  }
                  
                }

                
              

              
            }


            break;
          }
        }
      }

    });









    





























    /*
        // Asegúrate de inicializar o crear los slots del inventario y cofre.
    // Por ejemplo, si esperas tener 10 slots de inventario:
    for (let i = 0; i < 10; i++) {
      // Aquí se simula la creación de cada casilla.
      // Debe tener al menos: id, objeto, cantidad, imagenObjeto y textoCantidad.
      this.casillas.push({
        id: i,
        objeto: null,
        cantidad: 0,
        imagenObjeto: this.add.image(100 + i * 50, 50, 'defaultTexture').setVisible(false),
        textoCantidad: this.add.text(100 + i * 50, 90, '', { fontSize: '16px', fill: '#fff' })
      });
    }
    
    // De forma similar, inicializa las casillas del cofre (si aplica).
    // Ejemplo:
    for (let i = 0; i < 5; i++) {
      this.casillasExtra.push({
        id: i,
        objeto: null,
        cantidad: 0,
        imagenObjeto: this.add.image(100 + i * 50, 150, 'defaultTexture').setVisible(false),
        textoCantidad: this.add.text(100 + i * 50, 190, '', { fontSize: '16px', fill: '#fff' })
      });
    }

    */

    // Llamar a la función de carga de datos del jugador al iniciar el juego

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

    
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            console.log(this.usuarioxx);
            console.log(this.sabiduria);
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");




    this.saveTimer = 0;
    this.sceneActive = true; // Asegúrate de que la escena esté activa



}




/**
   * Dibuja un foco suave (degradado radial) en el canvas-textura.
   * @param {number} x         posición X en pantalla
   * @param {number} y         posición Y en pantalla
   * @param {number} radius    radio del foco
   * @param {number} intensity centro α (0–1)
   */
  addSoftLight(x, y, radius, intensity = 1.0) {
    // 1) Recupera el canvas-textura y su contexto
    const canvasTex = this.textures.get('lights-canvas');
    const ctx       = canvasTex.context;

    // 2) Creamos el degradado radial
    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    grad.addColorStop(0, `rgba(255,255,200,${intensity})`); // centro amarillo cálido
    grad.addColorStop(0.7, `rgba(255,255,200,0.2)`);         // penumbra suave
    grad.addColorStop(1, 'rgba(255,255,200,0)');             // borde transparente

    // 3) Dibujamos el círculo con degradado
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // 4) Refrescamos la textura para que Phaser actualice la imagen
    canvasTex.refresh();
  }


asignarFuncionSembrar1(objeto) {

    console.log('Regaste en zona : '+ objeto);
    objeto.setTexture('tierra_mojada');








    this.liberarObjeto();

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


  
  

  createMainPanel() {
    const { x, y, width, height, innerPadding } = this.panelConfig;

    this.mainPanel = this.add.container(x, y).setScrollFactor(0).setDepth(11);
    this.panelBG = this.add.rectangle(0, 0, width, height, 0x222222)
      .setOrigin(0)
      .setStrokeStyle(2, 0xffffff)
      .setScrollFactor(0)
      .setDepth(11);

    this.mainPanel.add(this.panelBG);

    this.scrollContainer = this.add.container(innerPadding, innerPadding).setScrollFactor(0).setDepth(11);
    this.mainPanel.add(this.scrollContainer);

    const maskShape = this.make.graphics();
    maskShape.fillRect(x + innerPadding, y + innerPadding, width - innerPadding * 2, height - innerPadding * 2);
    maskShape.setDepth(11);
    maskShape.setScrollFactor(0)
    const mask = maskShape.createGeometryMask();
    this.scrollContainer.setMask(mask);

    this.containerGeneral.add(this.mainPanel);
  }

  showProducts() {
    this.scrollContainer.removeAll(true);
    const spacing = 90;
    const panelWidth = this.panelConfig.width;

    this.products.forEach((product, index) => {
      const y = index * spacing;

      const bg = this.add.rectangle(0, y, panelWidth - 20, 80, 0x444444)
        .setOrigin(0)
        .setStrokeStyle(1, 0xffffff)
        .setScrollFactor(0)
        .setDepth(11);

      const img = this.add.image(10, y + 10, product.key)
        .setOrigin(0)
        .setDisplaySize(64, 64)
        .setScrollFactor(0)
        .setDepth(11);

      const name = this.add.text(80, y + 10, product.name, {
        fontSize: '16px',
        color: '#ffffff'
      }).setScrollFactor(0).setDepth(11);

      const price = this.add.text(80, y + 40, `Status de Reputacion : ${product.price}`, {
        fontSize: '14px',
        color: '#ffff00'
      }).setScrollFactor(0).setDepth(11);

      this.scrollContainer.add([bg, img, name, price]);
    });
  }

  handleScroll(pointer, gameObjects, deltaX, deltaY) {
    if (this.ver === 0 || !this.containerGeneral.visible) return;

    const maxHeight = this.products.length * 90;
    const panelHeight = this.panelConfig.height - this.panelConfig.innerPadding * 2;
    this.scrollOffset -= deltaY * 0.5;
    this.scrollOffset = Phaser.Math.Clamp(this.scrollOffset, -(maxHeight - panelHeight), 0);
    this.scrollContainer.y = this.panelConfig.innerPadding + this.scrollOffset;
  }

  toggleVisibilityAndInteractivity(visible) {
    const isVisible = visible === 1;
    this.containerGeneral.setVisible(isVisible);
  }



  

  createMainPanel1() {
    const { x, y, width, height, innerPadding } = this.panelConfig1;

    this.mainPanel1 = this.add.container(x, y).setScrollFactor(0).setDepth(11);
    this.panelBG1 = this.add.rectangle(0, 0, width, height, 0x222222)
      .setOrigin(0)
      .setStrokeStyle(2, 0xffffff)
      .setScrollFactor(0)
      .setDepth(11);

    this.mainPanel1.add(this.panelBG1);

    this.scrollContainer1 = this.add.container(innerPadding, innerPadding).setScrollFactor(0).setDepth(11);
    this.mainPanel1.add(this.scrollContainer1);

    const maskShape1 = this.make.graphics();
    maskShape1.fillRect(x + innerPadding, y + innerPadding, width - innerPadding * 2, height - innerPadding * 2);
    maskShape1.setDepth(11);
    maskShape1.setScrollFactor(0)
    const mask1 = maskShape1.createGeometryMask();
    this.scrollContainer1.setMask(mask1);

    this.containerGeneral1.add(this.mainPanel1);
  }

  showProducts1() {
    this.scrollContainer1.removeAll(true);
    const spacing1 = 90;
    const panelWidth1 = this.panelConfig1.width;

    this.products1.forEach((product, index) => {
      const y1 = index * spacing1;

      const bg1 = this.add.rectangle(0, y1, panelWidth1 - 20, 80, 0x444444)
        .setOrigin(0)
        .setStrokeStyle(1, 0xffffff)
        .setScrollFactor(0)
        .setDepth(11);

      const img1 = this.add.image(10, y1 + 10, product.key)
        .setOrigin(0)
        .setDisplaySize(64, 64)
        .setScrollFactor(0)
        .setDepth(11);

      const name1 = this.add.text(80, y1 + 10, product.name, {
        fontSize: '16px',
        color: '#ffffff'
      }).setScrollFactor(0).setDepth(11);

      const price1 = this.add.text(80, y1 + 40, `Status de Estadiscticas : ${product.price}`, {
        fontSize: '14px',
        color: '#ffffff'
      }).setScrollFactor(0).setDepth(11);

      this.scrollContainer1.add([bg1, img1, name1, price1]);
    });
  }

  handleScroll1(pointer, gameObjects, deltaX, deltaY) {
    if (this.ver1 === 0 || !this.containerGeneral1.visible) return;

    const maxHeight1 = this.products1.length * 90;
    const panelHeight1 = this.panelConfig1.height - this.panelConfig1.innerPadding * 2;
    this.scrollOffset1 -= deltaY * 0.5;
    this.scrollOffset1 = Phaser.Math.Clamp(this.scrollOffset1, -(maxHeight1 - panelHeight1), 0);
    this.scrollContainer1.y = this.panelConfig1.innerPadding + this.scrollOffset1;
  }

  toggleVisibilityAndInteractivity1(visible) {
    const isVisible1 = visible === 1;
    this.containerGeneral1.setVisible(isVisible1);
  }


  // Función para agregar recursos de ejemplo
  agregarRecursos() {
    this.agregarObjetoAInventario('semilla', 5);
    this.agregarObjetoAInventario('regadora', 1);
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
  


  agregarObjetoAInventario(nombre, cantidad) {
    // Nos aseguramos de que this.casillas esté definido
    if (!this.casillas) {
      console.error("Las casillas del inventario no están definidas.");
      return;
    }
    
    let casilla = this.casillas.find(c => !c.objeto);
    if (casilla) {
      casilla.objeto = nombre;
      casilla.cantidad = cantidad;
      if (casilla.textoCantidad) {
        casilla.textoCantidad.setText(`x${cantidad}`);
      }
      if (casilla.imagenObjeto && this.listaImagenes[nombre]) {
        casilla.imagenObjeto
          .setTexture(this.listaImagenes[nombre])
          .setVisible(true)
          .setDisplaySize(this.casillaAncho, this.casillaAlto);
      }
    } else {
      console.warn("No se encontró una casilla vacía en el inventario.");
    }
  }

  /*


  toggleInventario() {
    //this.rectanguloVinculado.setVisible(!this.rectanguloVinculado.visible);
    this.inventarioAbierto = !this.inventarioAbierto;
    this.visible = !this.visible;
    for (let i = 7; i < this.casillas.length; i++) {
      this.casillas[i].visible = this.visible;
      if (this.visible) {
        this.casillas[i].imagenObjeto.setVisible(this.casillas[i].objeto !== null);
        this.casillas[i].textoCantidad.setVisible(this.casillas[i].objeto !== null);
        // Llama a setInteractive() en la imagen interactiva
        this.casillas[i].imagenObjeto.setInteractive();
      } else {
        this.casillas[i].imagenObjeto.setVisible(false);
        this.casillas[i].textoCantidad.setVisible(false);
        // Llama a disableInteractive() en la imagen interactiva
        this.casillas[i].imagenObjeto.disableInteractive();
      }
      this.casillas[i].textoCantidad.setVisible(this.visible);
    }
  }

  */

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

  mostrarObjetoEnCursor(objeto) {
    if (this.cursorObjeto) {
      this.cursorObjeto.destroy();
    }
    this.cursorObjeto = this.add.image(this.input.x, this.input.y, this.listaImagenes[objeto])
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(15)
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
        casilla.on('pointerdown', () => this.seleccionarObjeto(casilla));
        casilla.setScrollFactor(0);
        casilla.setDepth(13);
        this.casillasExtra.push(casilla);
        index++;
      }
    }
  }

  /*

  toggleCofre() {
    const visible = !this.visibleCofre;
    this.visibleCofre = visible;
    this.cofreAbierto = !this.cofreAbierto;
  
    for (let i = 0; i < this.casillasExtra.length; i++) {
      this.casillasExtra[i].visible = visible;
      this.casillasExtra[i].imagenObjeto.setVisible(visible && this.casillasExtra[i].objeto !== null);
      this.casillasExtra[i].textoCantidad.setVisible(visible && this.casillasExtra[i].objeto !== null);
      if (visible) {
        // Llama a setInteractive() en la imagen interactiva
        this.casillasExtra[i].imagenObjeto.setInteractive();
      } else {
        // Llama a disableInteractive() en la imagen interactiva
        this.casillasExtra[i].imagenObjeto.disableInteractive();
      }
    }
  }

  */

  toggleCofre() {
    const visible = !this.visibleCofre;
    this.visibleCofre = visible;
    this.cofreAbierto = !this.cofreAbierto;

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



/**
 * Crea múltiples zonas de transparencia a partir de una capa de objetos. 
 * Cuando el jugador colisiona con alguna de estas zonas se ajusta la opacidad
 * y el z-index del sprite indicado. Se restaura cuando el jugador ya no se interseca con ninguna zona.
 *
 * @param {Phaser.Scene} scene - La escena actual de Phaser.
 * @param {Phaser.Tilemaps.Tilemap} map - El mapa que contiene la capa de objetos de zonas.
 * @param {string} objectLayerName - El nombre de la capa de objetos con las áreas de transparencia.
 * @param {Phaser.Physics.Arcade.Sprite} player - El sprite del jugador.
 * @param {Phaser.GameObjects.Sprite} sprite - El sprite que se modificará (ej.: la herrería).
 * @param {Object} [options] - Opciones para personalizar el comportamiento.
 * @param {number} [options.activeAlpha=0.5] - Opacidad que se aplica al sprite al estar en una zona.
 * @param {number} [options.activeDepth=2] - Profundidad (z-index) que se asigna al sprite en la zona.
 * @param {number} [options.normalAlpha=1] - Opacidad que se restaura cuando el jugador sale de todas las zonas.
 * @param {number} [options.normalDepth=0] - Profundidad (z-index) original que se restaura al salir.
 * @returns {Phaser.GameObjects.Rectangle[]} Retorna un arreglo con todas las zonas de transparencia creadas.
 */
createMultipleTransparencyZones(scene, map, objectLayerName, player, sprite, options = {}) {
  const {
    activeAlpha = 0.5,
    activeDepth = 11,
    normalAlpha = 1,
    normalDepth = 0
  } = options;

  // Se obtienen todos los objetos definidos en la capa indicada
  const areasTransparencia = map.getObjectLayer(objectLayerName).objects;

  // Array para almacenar las zonas de transparencia creadas
  const zonasTransparencia = [];

  // Crear cada zona de transparencia a partir de los objetos en la capa
  areasTransparencia.forEach(area => {
    // Crear el rectángulo centrado en el área definida
    const zonaTransparencia = scene.add.rectangle(
      area.x + area.width / 2,  // Centrar la zona en x
      area.y + area.height / 2, // Centrar la zona en y
      area.width,               // Ancho
      area.height               // Alto
    ).setOrigin(0.5).setAlpha(0).setDepth(11);

    // Convertir la zona en un objeto físico estático
    scene.physics.add.existing(zonaTransparencia, true);

    // Guardar la zona en el array
    zonasTransparencia.push(zonaTransparencia);

    // Configurar la colisión para esta zona:
    // Cuando el jugador colisiona con la zona, se aplica la transparencia y el z-index activos
    scene.physics.add.collider(
      player,
      zonaTransparencia,
      () => {
        sprite.setAlpha(activeAlpha);
        sprite.setDepth(activeDepth);
      },
      null,
      scene
    );
  });

  // Revisar en cada 'worldstep' si el jugador ya no interseca con ninguna zona
  scene.physics.world.on('worldstep', () => {
    const playerBounds = player.getBounds();

    // Verificar si el jugador se encuentra en al menos una de las zonas de transparencia
    const enAlgunaZona = zonasTransparencia.some(zona =>
      Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, zona.getBounds())
    );

    // Si no está en ninguna zona, se restauran los valores originales del sprite
    if (!enAlgunaZona) {
      sprite.setAlpha(normalAlpha);
      sprite.setDepth(normalDepth);
    }
  });

  return zonasTransparencia;
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

    /*
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
    */

  /*

  const ahora = this.time.now;

  // Si el cursor está sobre un objeto activo, actualizar y mostrar su contador
  if (this.objetoActual && this.objetoActual.activo) {
    const obj = this.objetoActual;
    const restante = Math.max(obj.duracion - (ahora - obj.inicio), 0);
    const min = Math.floor(restante / 60000);
    const sec = Math.floor((restante % 60000) / 1000).toString().padStart(2, '0');

    this.textoTemporizador
      .setText(`⏳ ${min}:${sec}`)
      .setPosition(this.input.activePointer.worldX + 10, this.input.activePointer.worldY - 30);
  }

  // Procesar eventos de mitad y fin de tiempo para cada objeto activo
  this.objetos.forEach(obj => {
    if (!obj.activo || obj.inicio === null) return;

    const transcurrido = ahora - obj.inicio;

    if (!obj.mitadReportada && transcurrido >= obj.duracion / 2) {
      console.log(`🟡 [${obj.data.name}] Tiempo a la mitad`);
      obj.mitadReportada = true;
    }

    if (!obj.completoReportado && transcurrido >= obj.duracion) {
      console.log(`✅ [${obj.data.name}] Tiempo completado`);
      obj.completoReportado = true;
    }
  });
  */


    this.tempoTimer += delta;
    if (this.tempoTimer >= 5000 && this.tempo < 0.4) {
      this.tempo = Math.min(this.tempo + 0.1, 0.4);

      // ← en lugar de setAlpha usamos setFillStyle para cambiar solo el fillAlpha
      this.nightOverlay.setFillStyle(0x000033, this.tempo);

      if (this.tempo === 0.2) {
            
        this.post_1.setTexture('postas_encendido_png');
        this.post_2.setTexture('postas_encendido_png');
        this.post_3.setTexture('postas_encendido_png');
        this.post_4.setTexture('postas_encendido_png');
        this.post_5.setTexture('postas_encendido_png');
        this.post_6.setTexture('postas_encendido_png');
        this.post_7.setTexture('postas_encendido_png');
        this.post_8.setTexture('postas_encendido_png');
        this.post_9.setTexture('postas_encendido_png');
        this.post_10.setTexture('postas_encendido_png');
        this.post_11.setTexture('postas_encendido_png');
        this.post_12.setTexture('postas_encendido_png');
        this.post_13.setTexture('postas_encendido_png');
        this.post_14.setTexture('postas_encendido_png');
        
      }

      console.log('Anochecer (fillAlpha):', this.tempo);
      this.tempoTimer = 0;
    }






















    /*

        // limpiando 

        
        if (this.active_siembra1 === 3) {

          if (this.graphics_siembra_1) {
            this.graphics_siembra_1.destroy();
            this.graphics_siembra_1 = null;
          }
          if (this.rectZone) {
            this.rectZone.destroy();
            this.rectZone = null;
          }
          if (this.rectNegro) {
            this.rectNegro.destroy();
            this.rectNegro = null;
          }
          if (this.countdownText) {
            this.countdownText.destroy();
            this.countdownText = null;
          }


          this.active_siembra1 = 4;
          
        }

        // conteo de siembra _ 1

        if (this.isPointerOver) {
          this.countdownTime -= delta / 1000; // delta viene en milisegundos, lo pasamos a segundos
        
          if (this.countdownTime <= 0) {
            this.countdownTime = 0;
          }
        
          const minutes = Math.floor(this.countdownTime / 60);
          const seconds = Math.floor(this.countdownTime % 60);
          this.countdownText.setText(`tiempo restante : ${minutes}:${seconds.toString().padStart(2, '0')} min`);
        
          // Detectar la mitad del tiempo
          if (!this.halfTimeLogged && this.countdownTime <= (5 * 60) / 2) {
            console.log('¡Ya pasamos la mitad del tiempo!');
            this.halfTimeLogged = true;
            this.sprite_tierra_seca.setTexture('tierra_mojada_plant2');
          }
        
          // Detectar cuando se acaba el tiempo
          if (!this.timeFinishedLogged && this.countdownTime <= 0) {
            this.countdownText.setText(`Puedes Cosechar tu siembra !!`);
            this.timeFinishedLogged = true;
            this.sprite_tierra_seca.setTexture('tierra_mojada_plant3');
            this.isPointerOver = false;
            this.active_siembra1 = 3;

          }
        }
        
        // siembra 1

        if (this.active_siembra1 === 1) {

          // Borde visible

        

          //this.graphics_siembra_1 = this.add.graphics();
          //this.graphics_siembra_1.lineStyle(1, 0xff0000);
          //this.graphics_siembra_1.strokeRect(this.obj_siembra1_x, this.obj_siembra1_y, this.obj_siembra1_width, this.obj_siembra1_height);

         


          // Zona interactiva
          this.rectZone = this.add.zone(this.obj_siembra1_x + this.obj_siembra1_width / 2, this.obj_siembra1_y + this.obj_siembra1_height / 2, this.obj_siembra1_width, this.obj_siembra1_height);
          this.rectZone.setOrigin(0.5);
          this.rectZone.setInteractive();

          // Creamos el rectángulo negro
          this.rectNegro = this.add.rectangle(this.phaser_ancho / 2, this.phaser_largo /2 - 200, 400, 100, 0x000000);
          this.rectNegro.setVisible(false);
          this.rectNegro.setScrollFactor(0);
          this.rectNegro.setDepth(2);
          this.rectNegro.setAlpha(0.5);


          // Texto para el contador
          this.countdownText = this.add.text(this.phaser_ancho / 2, this.phaser_largo /2 - 200, '', {
            fontSize: '24px',
            color: '#ffffff'
          }).setOrigin(0.5);
          this.countdownText.setVisible(false);
          this.countdownText.setScrollFactor(0);
          this.countdownText.setDepth(2);

          // Variables de control
          this.isPointerOver = false;
          this.countdownTime = 5 * 60; // 5 minutos en segundos

      
          // Evento cuando el mouse entra
          this.rectZone.on('pointerover', () => {
            this.isPointerOver = true;
            this.countdownText.setVisible(true);
            this.rectNegro.setVisible(true);
          });

          // Evento cuando el mouse sale
          this.rectZone.on('pointerout', () => {
            this.countdownText.setVisible(false);
            this.rectNegro.setVisible(false);
          });

          this.active_siembra1 = 2;
        }

        */

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

    // poniendo nombre de usuario

    

    this.usuariox.setText(this.usuarioxx);
    this.usuariox.setPosition(this.player.x, this.player.y - 60);


    

    // Comprueba la colisión entre el rectángulo del jugador y cada rectángulo de la capa de colisión.
    // Asegúrate de que 'this.collisionRectangles' contiene cada rectángulo de la capa (por ejemplo, extraídos de Tiled)
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

        this.inicio = 1;

        // aparicion del personaje
        if (this.inicio == 1) {
          this.scene.stop();
          //this.player.setPosition(430, 432);  // Usar setPosition en lugar de asignación directa
          this.posicionplayerx = 795;
          this.posicionplayery = 978;
          this.inicio = 0;
          this.mundo = 2;
          
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

        delete this.mostrarObjetoEnCursor;


        this.scene.start("LoadingSceneshop");

      }
    });



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