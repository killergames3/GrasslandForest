
function toggleMenu() {
    var menu = document.querySelector('nav ul');
    menu.classList.toggle('show');
}

document.addEventListener("DOMContentLoaded", () => {
    // Recupera la cuenta conectada del localStorage
    const account = localStorage.getItem("connectedAccount");
  
    if (account) {
      // Si la cuenta existe, inicia el juego con esa cuenta
      startGame(account);
    } else {
      // Si no existe, muestra un mensaje de error en pantalla
      window.addEventListener("DOMContentLoaded", () => {
        const messageContainer = document.getElementById("message-container");
        if (messageContainer) {
            const errorMessage = document.createElement("div");
            errorMessage.textContent = "Error: Account not connected.";
            errorMessage.style.color = "red";
            errorMessage.style.fontSize = "18px";
            errorMessage.style.textAlign = "center";
            errorMessage.style.marginTop = "20px";
            errorMessage.style.position = "absolute";    // para que esté encima
            errorMessage.style.top = "20px";
            errorMessage.style.left = "50%";
            errorMessage.style.transform = "translateX(-50%)";
            errorMessage.style.zIndex = "9999";          // asegurarse que esté encima
            messageContainer.appendChild(errorMessage);
            }
        });


    }
});

// Función para iniciar el juego
async function startGame(account = "") {

    window.addEventListener('DOMContentLoaded', () => {
    const font = new FontFace("PressStart2P", "url('./fonts/PressStart2P-Regular.ttf')");
    font.load().then(() => {
        document.fonts.add(font);

        //const GAME_WIDTH = 1272;
        //const GAME_HEIGHT = 640;
        
        //const GAME_WIDTH = 1372;
        //const GAME_HEIGHT = 680;

        // obcervar y considerar resolucion fija


        
        const GAME_WIDTH = window.innerWidth;
        const GAME_HEIGHT = window.innerHeight;

        localStorage.setItem('screenWidth', window.innerWidth.toString());
        localStorage.setItem('screenHeight', window.innerHeight.toString());

        const width = Number(localStorage.getItem('screenWidth'));
        const height = Number(localStorage.getItem('screenHeight'));

        console.log(width, height);

        
        console.log(window.innerWidth, window.innerHeight);
        
        const config = {
            type: Phaser.WEBGL,
            parent: "container",
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
        
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false,
                },
            },
        
            scene: [LoadingScenegame, GameScene, ShopScene, LoadingSceneshop , LoadingScene, MenuScene, tiendajuego],
        
            fps: {
                target: 120,
            },
        
            scale: {
                mode: Phaser.Scale.RESIZE,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width: GAME_WIDTH,
                height: GAME_HEIGHT,
            },
        
            render: {
                antialias: false,
                antialiasGL: false,
                pixelart:  true,
                roundPixels: true,
                powerPreference: 'high-performance',
            },
        
            dom: {
                createContainer: true
            },
            plugins: {
                scene: [
                    {
                key: 'LightsPlugin',
                plugin: Phaser.Renderer.WebGL.Pipelines.LightPipeline,
                mapping: 'lights'
                    }
                ]
            }
        };
        

        // Inicializar el juego y asignarlo a la variable global
        game = new Phaser.Game(config);
        gameRunning = true;

        // Desactivar menú contextual en el canvas del juego
        game.canvas.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            console.log("Menú contextual deshabilitado en el canvas de Phaser.");
        });








    });

    });
}

