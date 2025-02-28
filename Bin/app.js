
function toggleMenu() {
    var menu = document.querySelector('nav ul');
    menu.classList.toggle('show');
}

let isConnected = false;
let currentAccount = "";
let gameRunning = false; // Estado de si el juego está corriendo o no
let game; // Variable global para el juego

// Obtener referencias a los elementos del HTML
const metamaskButton = document.getElementById("metamaskButton");
const disconnectMessage = document.getElementById("disconnectMessage");

async function connectWallet() {
    if (window.ethereum) {
        try {
            // Solicitar acceso a la cuenta de MetaMask
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

            // Obtener la cuenta conectada
            const newAccount = accounts[0];

            // Comprobar si es una nueva conexión
            if (newAccount !== currentAccount) {
                currentAccount = newAccount;
                console.log("Cuenta conectada:", currentAccount);

                // Guardar la cuenta conectada en localStorage
                localStorage.setItem("connectedAccount", currentAccount);
            } else {
                console.log("Ya estás conectado con esta cuenta");
                alert("Ya estás conectado con esta cuenta.");
            }

            // Cambiar el estado de conexión
            isConnected = true;

            // Iniciar el juego si la cartera está conectada
            document.getElementById("mensaje_panel_jugarid").style.display = "none";
            if (!gameRunning) {
                startGame(currentAccount);
            }

        } catch (error) {
            if (error.code === 4001) {
                alert("Has rechazado la solicitud de conexión.");
            } else {
                console.error("Error al conectar con MetaMask:", error.message);
                alert("Hubo un error al conectar con MetaMask. Asegúrate de que MetaMask esté instalado correctamente.");
            }
        }
    } else {
        alert("Por favor, instala MetaMask para usar esta funcionalidad.");
    }
}

function disconnectWallet() {
    if (!isConnected) return;

    isConnected = false;
    currentAccount = ""; // Reiniciar la cuenta al desconectar

    // Limpiar la cuenta conectada en localStorage
    localStorage.removeItem("connectedAccount");

    // Detener el juego
    document.getElementById("mensaje_panel_jugarid").style.display = "block";
    stopGame();

    console.log("Cartera desconectada.");
}

document.addEventListener("DOMContentLoaded", () => {
    const savedAccount = localStorage.getItem("connectedAccount");
    if (savedAccount) {
        currentAccount = savedAccount;
        isConnected = true;

        // Iniciar el juego si la cuenta ya está conectada
        document.getElementById("mensaje_panel_jugarid").style.display = "none";
        if (!gameRunning) {
            startGame(currentAccount);
        }
    }
});


if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
            disconnectWallet(); // Si no hay cuentas conectadas
        } else {
            currentAccount = accounts[0];
            console.log("Cuenta cambiada:", currentAccount);
            if (!gameRunning) {
                startGame(currentAccount);
            }
        }
    });
}

// Función para iniciar el juego
async function startGame(account = "") {
    const font = new FontFace("PressStart2P", "url('./fonts/PressStart2P-Regular.ttf')");
    font.load().then(() => {
        document.fonts.add(font);

        // Configuración del juego
        const config = {
            type: Phaser.WEBGL,
            parent: "container",
            width: 800,
            height: 450,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false,
                },
            },
            scene: [LoadingScene, MenuScene, GameScene, MainScene],
            fps: {
                target: 120, // FPS deseados
                //forceSetTimeOut: true,
            },
            scale: {
                mode: Phaser.Scale.NONE,
            },
            render: {
                antialias: false, // Activa el suavizado (antialiasing)
                antialiasGL: false, // Activa suavizado para WebGL
                pixelart: false,
                roundPixels: true,
                powerPreference: 'high-performance',
            },
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
}

// Función para detener el juego
function stopGame() {
    if (!gameRunning || !game) return;

    gameRunning = false;
    console.log("Juego detenido");

    // Destruir el juego
    game.destroy(true);
    game = null;
}

