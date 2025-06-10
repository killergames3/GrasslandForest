// eslint-disable-next-line no-unused-vars
class LoadingScene extends Phaser.Scene {
    constructor() {
        super({ key: "LoadingScene" });
    }

    preload() {
        
        // cargando imagenes de menu de inicio
        this.load.image('backgroundx', './Game/FONDO/menu.png');
        this.load.image('background', './Game/FONDO/menu2.png');
        this.load.image('fullscreenButton', './Game/Objetos/parentesis.png');


        // cargar musica
        this.load.audio('musicaFondo', './Game/MUSIC/principal.mp3');
        
    }

    create() {



        document.fonts.ready.then(() => {
            const canvasWidth = this.scale.width;
            const canvasHeight = this.scale.height;
        
            // Porcentaje de ubicación
            const xPercentage = 0.8; // 80% del ancho de la pantalla
            const yPercentage = 0.8; // 50% de la altura de la pantalla
        
            // Calcular la posición en píxeles según el porcentaje
            const xPos = canvasWidth * xPercentage;
            const yPos = canvasHeight * yPercentage;

            // FONDO DE PANTALL
            if (this.textures.exists('backgroundx')) {
                // Agregar la imagen de fondo y ajustarla a toda la pantalla
                const background = this.add.image(0, 0, 'backgroundx');
                background.setOrigin(0, 0); // Poner la imagen en la esquina superior izquierda
                background.setDisplaySize(canvasWidth, canvasHeight);
            } else {
                console.error('No se pudo cargar la imagen de fondo');
            }
        
            // Agrega texto con la fuente cargada
            this.add.text(xPos, yPos, 'Cargando...', {
                fontFamily: '"PressStart2P"', // Fuente personalizada
                fontSize: '16px', // Tamaño
                color: '#ffffff', // Color blanco
                resolution: 4, // Asegura calidad en pantallas de alta resolución
            }).setOrigin(0.5).setScale(1.2, 1.5);
        });


        
        this.intervalId = setInterval(() => {
            this.cargango();
        }, 2000);

    }


    cargango(){
        
        // Agrega un evento de clic para inici
                this.musica = this.sound.add('musicaFondo', {
                    loop: true,  // Para que se repita
                    volume: 1    // Ajusta el volumen (0.0 a 1.0)
                });

                // Configura el evento que se ejecutará cuando la música empiece a reproducirse
                this.musica.once('play', () => {
                    // Cuando la música inicie, se ejecuta este callback
                    this.scene.start("LoadingScenegame");
                    clearInterval(this.intervalId);
                });

                // Reproduce la música
                this.registry.set('musica', this.musica);
                this.musica.play();
                

    }

}
