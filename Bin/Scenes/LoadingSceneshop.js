// eslint-disable-next-line no-unused-vars
class LoadingSceneshop extends Phaser.Scene {
    constructor() {
        super({ key: "LoadingSceneshop" });
    }

    preload() {

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

    }

    create() {

        this.intervalId = setInterval(() => {
            this.cargango();
        }, 2000);

    }

    cargango(){
        this.scene.start("tiendajuego");
        clearInterval(this.intervalId);

    }
}
