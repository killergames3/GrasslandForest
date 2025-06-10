// eslint-disable-next-line no-unused-vars
class GameScene extends Phaser.Scene {
  constructor(scene) {
    super({ key: "GameScene" });

  }

  preload() {
    
    this.ii = 1;

    this.elipeticiones = 0; 

    if (this.elipeticiones === 0) {
        
      this.serverclient = 'http://192.168.100.221:3000';
      //this.serverclient = 'https://bgrassland-production.up.railway.app';
      
    } else {
        
      //this.serverclient = 'http://192.168.100.221:3000';
      this.serverclient = 'https://bgrassland-production.up.railway.app';

    }

    
    this.zoom = false;

    // limpiando tiles

    
    if (this.textures.exists('tiles')) {
      this.textures.remove('tiles');
    }

    
    if (this.textures.exists('casa_tienda')) {
      this.textures.remove('casa_tienda');
    }

    // Cargar recursos
    
    this.load.image('tiles', './Game/MAPAS/tiles.png');
    
    this.load.image('mapa_img', './Game/MAPAS/mapa_principal.png');

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


    // mochila con letra I y con triangulo
    


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

    
    this.currentAccount = this.registry.get("account");

    this.playerName = this.currentAccount;
    this.player = this.physics.add.sprite(100, 100, 'playerTexture');
    this.player.setVisible(false);
    this.vidaPorcentaje = null;
    this.aguaPorcentaje = null;
    this.comidaPorcentaje = null;

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

    this.cofreAbierto = false;
    this.inventarioAbierto = false;




    // registro de mirada 

    this.registro_mirada_personaje = "derecha";

    // ver reputacion

    this.ver = 0;
    this.ver1 = 0;




  }

  create() {
    
    // Variables para almacenar el tamaño previo
        
    this.currentWidth = parseInt(localStorage.getItem('screenWidth'));
    this.currentHeight = parseInt(localStorage.getItem('screenHeight'));

    

    this.phaser_ancho = this.scale.width;
    this.phaser_largo = this.scale.height;

    this.scene.stop('tiendajuego');
    this.scene.remove('tiendajuego');
    this.scene.add('tiendajuego', tiendajuego, false);

    
    this.textures.get('tiles').setFilter(Phaser.Textures.FilterMode.NEAREST);

    // Cargar el tilemap y el conjunto de tiles
    this.map = this.make.tilemap({ key: 'tilemap' });
    const tileset = this.map.addTilesetImage('Tileset_mapa', 'tiles', 16, 16);
    this.backgroundLayer = this.map.createLayer('mapa_principal', tileset, 0, 0);


    /*

    // 1. Crear el render texture y dibujar sobre él
    const rt = this.add.renderTexture(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    rt.draw(this.backgroundLayer);

    // 2. Esperar a que todo se dibuje antes de exportar
    this.time.delayedCall(100, () => {
      // 3. Usar snapshot directamente del renderTexture
      rt.snapshot((image) => {
        // 4. Crear un enlace para descargar
        const a = document.createElement('a');
        a.href = image.src; // image es un HTMLImageElement
        a.download = 'mapa_exportado.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    });

    */


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
    this.nightOverlay = this.add.rectangle(0, 0, 5008, 5008, 0x000033, this.tempo)
      .setOrigin(0)
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



    // Configurar los límites del mundo
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    











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

    //mapa img

    
    const imageMappingxxx = {
      mapa_principalx: {
        spriteKey: 'mapa_img',
        targetProp: 'sprite_mapa_img'          
      }
      
    };

    this.createImagesFromObjectLayer(this, this.map, 'mapa_principal_img', imageMappingxxx);

    this.sprite_mapa_img.setDepth(0);

    


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

        // texto de coordenadas

        document.getElementById('game-ui-text').style.display = 'block';




















      });
      this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
      this.cameras.main.setRoundPixels(true);
      this.cameras.main.roundPixels = true;

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





    document.querySelector('.inner-btn').addEventListener('click', () => {
      console.log('dashboar');
    });

    // Dentro del método create() de tu escena:
    const self = this;
    const botones = document.querySelectorAll('.round-btn');

    botones[0].addEventListener('click', () => {
      self.zoom = !self.zoom;
      if (self.zoom == false) {
        self.cameras.main.zoomTo(1, 2000);
      } else {
        self.cameras.main.zoomTo(0.3, 2000);
      }
    });


    botones[1].addEventListener('click', () => {
          const estadisticas = [
            { imagen: './Game/Source/Perfil_stadisticas/1.png', name: 'Nivel del Personaje', nivel: `Nivel : ${this.nivel} , exp : ${this.nivel_exp}` },
            { imagen: './Game/Source/Perfil_stadisticas/2.png', name: 'Nivel Sabiduría', nivel: `Nivel : ${this.sabiduria} , exp : ${this.sabiduria_exp}` },
            { imagen: './Game/Source/Perfil_stadisticas/3.png', name: 'Nivel de Fuerza', nivel: `Nivel : ${this.fuerza} , exp : ${this.fuerza_exp}` },
            { imagen: './Game/Source/Perfil_stadisticas/4.png', name: 'Nivel de Agricultura', nivel: `Nivel : ${this.agricultura} , exp : ${this.agricultura_exp}` }
          ];

          this.mostrarPanelEstadisticas(estadisticas);
    });

    botones[2].addEventListener('click', () => {
      
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

          this.mostrarPanelReputacion([
            { nombre: "Granjero Joe", reputacion: "buena", imagen: "./Game/Source/Perfil_Reputacion/1.png" },
            { nombre: "Herrero Jack", reputacion: "buena", imagen: "./Game/Source/Perfil_Reputacion/2.png" },
            { nombre: "Alquimista Colin", reputacion: "buena", imagen: "./Game/Source/Perfil_Reputacion/3.png" },
            { nombre: "Guardian Rurik", reputacion: "buena", imagen: "./Game/Source/Perfil_Reputacion/4.png" }
          ]);
    });
    
    this.input.keyboard.on('keydown-E', () => {

          const estadisticas = [
            { imagen: './Game/Source/Perfil_stadisticas/1.png', name: 'Nivel del Personaje', nivel: `Nivel : ${this.nivel} , exp : ${this.nivel_exp}` },
            { imagen: './Game/Source/Perfil_stadisticas/2.png', name: 'Nivel Sabiduría', nivel: `Nivel : ${this.sabiduria} , exp : ${this.sabiduria_exp}` },
            { imagen: './Game/Source/Perfil_stadisticas/3.png', name: 'Nivel de Fuerza', nivel: `Nivel : ${this.fuerza} , exp : ${this.fuerza_exp}` },
            { imagen: './Game/Source/Perfil_stadisticas/4.png', name: 'Nivel de Agricultura', nivel: `Nivel : ${this.agricultura} , exp : ${this.agricultura_exp}` }
          ];

          this.mostrarPanelEstadisticas(estadisticas);
    });















    /*


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

    */




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

                // Carácter global de las definiciones de ítems
        this.ItemDefinitions = {
          item_1: { src: "./Game/Source/recurso.png", maxStack: 10 },
          item_2: { src: "./Game/Source/recurso2.png", maxStack: 5 },
          item_3: { src: "./Game/Source/tijeras.png", maxStack: 20 }
          // Agrega más definiciones según sea necesario
        };

    
      this.initialize();


        // ─────────────────────────────────────────────────────────


        // ─────────────────────────────────────────────────────────
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
    


}
























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
   * addItemWithCheck hace:
   *  1) Verifica espacio en quickSlots + slots
   *  2) Si cabe, distribuye primero en quickSlots, luego en slots
   *  3) Si no cabe, no hace nada y devuelve false
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
    for (let i = 0; i < this.STATE.quickSlots.length; i++) {
      const slot = this.STATE.quickSlots[i];
      if (slot && slot.id === itemId) {
        espacioQuick += (maxStack - slot.count);
      } else if (!slot) {
        espacioQuick += maxStack;
      }
    }

    // 2) Calcular espacio en inventory (40 slots)
    let espacioInv = 0;
    for (let i = 0; i < this.STATE.slots.length; i++) {
      const slot = this.STATE.slots[i];
      if (slot && slot.id === itemId) {
        espacioInv += (maxStack - slot.count);
      } else if (!slot) {
        espacioInv += maxStack;
      }
    }

    if (espacioQuick + espacioInv < remaining) {
      console.warn("No hay espacio suficiente para", quantity, "de", itemId);
      return false;
    }

    // 3) Llenar quickSlots primero
    for (let i = 0; i < this.STATE.quickSlots.length && remaining > 0; i++) {
      const slot = this.STATE.quickSlots[i];
      if (slot && slot.id === itemId && slot.count < maxStack) {
        const puedeSumar = Math.min(maxStack - slot.count, remaining);
        slot.count += puedeSumar;
        remaining -= puedeSumar;
        this.renderSlot(i);
      } else if (!slot) {
        const paraEste = Math.min(maxStack, remaining);
        this.STATE.quickSlots[i] = { id: itemId, count: paraEste, invIndex: null };
        remaining -= paraEste;
        this.renderSlot(i);
      }
    }

    // 4) Luego, llenar inventory
    while (remaining > 0) {
      // 4a) intentar apilar en slots existentes
      let apilado = false;
      for (let i = 0; i < this.STATE.slots.length && remaining > 0; i++) {
        const slot = this.STATE.slots[i];
        if (slot && slot.id === itemId && slot.count < maxStack) {
          const puedeSumar = Math.min(maxStack - slot.count, remaining);
          slot.count += puedeSumar;
          remaining -= puedeSumar;
          this.renderSlot(i);
          apilado = true;
        }
      }
      if (apilado) continue;

      // 4b) si no se pudo apilar, buscar casilla vacía
      let puesto = false;
      for (let i = 0; i < this.STATE.slots.length && remaining > 0; i++) {
        if (!this.STATE.slots[i]) {
          const paraEsta = Math.min(maxStack, remaining);
          this.STATE.slots[i] = { id: itemId, count: paraEsta };
          remaining -= paraEsta;
          this.renderSlot(i);
          puesto = true;
          break;
        }
      }
      if (!puesto && remaining > 0) {
        console.error("Error inesperado: quedaba remanente pero no hay slot vacío.");
        return false;
      }
    }

    return true;
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
// Dentro de tu clase GameScene...


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



getPositionPercent(objectX, objectY) {
  
  const camWidth = this.cameras.main.width;
  const camHeight = this.cameras.main.height;
  const percentX = (objectX / camWidth) * 100;
  const percentY = (objectY / camHeight) * 100;

  return {
    percentX: percentX.toFixed(2), // por ejemplo: 42.68
    percentY: percentY.toFixed(2)
  };
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

        
    if (this.ii === 1) {

      const result = this.getPositionPercent(this.cameras.main.width * 96.70 / 100, this.cameras.main.height * 28.13 / 100);
      console.log(`%X: ${result.percentX}% , %Y: ${result.percentY}%`);
      this.ii = 2;
      
    }



    // ver cambios de resolucion de pantalla
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;



    if (newWidth !== this.currentWidth || newHeight !== this.currentHeight) {
      this.currentWidth = newWidth;
      this.currentHeight = newHeight;
      console.log(`Ventana cambió a: ${newWidth}x${newHeight}`);

      // zoom de camara 

      /*

      if (this.currentWidth >= 1070) {
        this.cameras.main.setZoom(1);
        this.boton.setPosition(this.scale.width * 0.967, this.scale.height * 0.2813);
          
        this.boton1.x = this.cameras.main.width * 96.70 / 100;
        this.boton1.y = this.cameras.main.height * 34.38 / 100;

      } else if (this.currentWidth > 600 && this.currentWidth < 1070) {
        this.cameras.main.setZoom(0.9);

        const cam = this.cameras.main;
        const view = cam.worldView; // coordenadas visibles en mundo

        this.boton.setPosition(view.x + view.width * 0.967, view.y + view.height * 0.2813);


        this.boton1.x = this.cameras.main.width * 96.70 / 100;
        this.boton1.y = this.cameras.main.height * 34.38 / 100;

      } else 
      */ 


        }





      

      // adaptando panel de estaciones a camara 





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
          
              this.savegg();
              this.saveTimer = 0;

            // ocultando todo
            
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