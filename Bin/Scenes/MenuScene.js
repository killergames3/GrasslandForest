class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "MenuScene" });
    }

    create() {
        // Verifica si la imagen se cargó correctamente
        
        const canvasWidth = this.scale.width;
        const canvasHeight = this.scale.height;


        // FONDO DE PANTALLA

        if (this.textures.exists('background')) {
            // Agregar la imagen de fondo y ajustarla a toda la pantalla
            const background = this.add.image(0, 0, 'background');
            background.setOrigin(0, 0); // Poner la imagen en la esquina superior izquierda
            background.setDisplaySize(canvasWidth, canvasHeight);
        } else {
            console.error('No se pudo cargar la imagen de fondo');
        }

        // CREANDO RECTANGULO DE CARTERA

        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.5);

        // Dibujar el rectángulo (x, y, width, height)
        graphics.fillRect(230, 1, 300, 50);

        // Configurar la cuenta en el sistema de datos global
        this.registry.set("account", currentAccount);
        console.log("Cuenta configurada en LoadingScene:", currentAccount);

        // TEXTO DE CARTERA

        this.add.text(355, 25, `>> (${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)})`, {
            fontFamily: '"PressStart2P"', // Fuente personalizada
            fontSize: '25px', // Tamaño
            color: '#ffffff', // Color blanco
            resolution: 4, // Asegura calidad en pantallas de alta resolución
        }).setOrigin(0.5).setScale(0.5, 0.5);

        // dar radius al rectangulo
        //rect.fillRoundedRect


        //  ------------------ Crear Boton Jugar
        const rect = this.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.5 } });
        rect.fillRect(1, 160, 130, 40);
        
        // Definir un área interactiva explícita para el gráfico
        rect.setInteractive(new Phaser.Geom.Rectangle(1, 160, 130, 40), Phaser.Geom.Rectangle.Contains);
        
        // Agregar evento de clic
        rect.on('pointerdown', () => {
            console.log("¡Clic en el rectángulo!");  // Verificar si se hace clic
            this.scene.start('GameScene');  // Cambiar a la escena GameScene
        });
        
        // Crear el texto y asignarlo a una variable para usarlo más tarde
        const text = this.add.text(65, 180, "Play", {
            fontFamily: '"PressStart2P"', // Fuente personalizada
            fontSize: '15px', // Tamaño
            color: '#ffffff', // Color blanco
            resolution: 4, // Asegura calidad en pantallas de alta resolución
        }).setOrigin(0.5);
        
        // Cambiar color al pasar el puntero por encima (hover)
        rect.on('pointerover', () => {
            rect.clear();  // Limpiar el gráfico anterior
            rect.fillStyle(0xffffff, 1);  // Fondo blanco cuando el puntero está sobre el botón
            rect.fillRect(1, 160, 130, 40);
        
            text.setStyle({ fill: '#000000' });  // Cambiar el color del texto a negro
        });
        
        // Restaurar colores cuando el puntero sale del botón
        rect.on('pointerout', () => {
            rect.clear();
            rect.fillStyle(0x000000, 0.5);  // Fondo negro semi-transparente
            rect.fillRect(1, 160, 130, 40);
        
            text.setStyle({ fill: '#ffffff' });  // Volver el texto a blanco
        });
        




        
        //  --------------------- Crear Boton Mercado
        // Crear el rectángulo negro transparente para el botón Marketplace
        const rect1 = this.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.5 } });
        rect1.fillRect(1, 210, 130, 40);

        // Crear el texto "Marketplace" y asignarlo a una variable para manipularlo
        const textMarketplace = this.add.text(65, 230, "Marketplace", {
            fontFamily: '"PressStart2P"', // Fuente personalizada
            fontSize: '11px', // Tamaño
            color: '#ffffff', // Color blanco
            resolution: 4, // Asegura calidad en pantallas de alta resolución
        }).setOrigin(0.5);  // Centrar el texto dentro del rectángulo

        // Hacer el rectángulo interactivo
        rect1.setInteractive(new Phaser.Geom.Rectangle(1, 210, 130, 40), Phaser.Geom.Rectangle.Contains);

        // Agregar evento de clic (para ir a otra escena o lo que desees)
        rect1.on('pointerdown', () => {
            console.log("¡Clic en el Marketplace!");  // Verificar clic
            this.scene.start('MainScene');  // Cambiar a la escena GameScene (puedes cambiarlo según lo necesites)
        });
        

        // Cambiar color al pasar el puntero por encima (hover)
        rect1.on('pointerover', () => {
            rect1.clear();  // Limpiar el gráfico anterior
            rect1.fillStyle(0xffffff, 1);  // Fondo blanco cuando el puntero está sobre el botón
            rect1.fillRect(1, 210, 130, 40);

            textMarketplace.setStyle({ fill: '#000000' });  // Cambiar el color del texto a negro
        });

        // Restaurar colores cuando el puntero sale del botón
        rect1.on('pointerout', () => {
            rect1.clear();
            rect1.fillStyle(0x000000, 0.5);  // Fondo negro semi-transparente
            rect1.fillRect(1, 210, 130, 40);

            textMarketplace.setStyle({ fill: '#ffffff' });  // Volver el texto a blanco
        });





















        // Agregar el botón de pantalla completa
        const fullscreenButton = this.add.image(canvasWidth - 20, 50, 'fullscreenButton').setScale(0.12, 0.1).setOrigin(0.5);
        fullscreenButton.setInteractive();  // Hacerlo interactivo (clickable)

        // Al hacer clic en el botón, activar pantalla completa
        fullscreenButton.on('pointerdown', () => {
            this.toggleFullScreen();
        });

    }

    toggleFullScreen() {
        const gameContainer = document.getElementById("container");

        // Si no está en pantalla completa, activarlo
        if (!document.fullscreenElement) {
            if (gameContainer.requestFullscreen) {
                gameContainer.requestFullscreen();
            } else if (gameContainer.mozRequestFullScreen) { // Firefox
                gameContainer.mozRequestFullScreen();
            } else if (gameContainer.webkitRequestFullscreen) { // Chrome, Safari, Opera
                gameContainer.webkitRequestFullscreen();
            } else if (gameContainer.msRequestFullscreen) { // IE/Edge
                gameContainer.msRequestFullscreen();
            }
        } else {
            // Salir de pantalla completa
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { // Firefox
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { // IE/Edge
                document.msExitFullscreen();
            }
        }
    }
}
