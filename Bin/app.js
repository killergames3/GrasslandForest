

function toggleMenu() {
    var menu = document.querySelector('nav ul');
    menu.classList.toggle('show');
}

let isConnected = false;
let currentAccount = "";
let gameRunning = false; // Estado de si el juego está corriendo o no
let app; // Declara la variable 'app' globalmente

// Obtener referencias a los elementos del HTML
const metamaskButton = document.getElementById("metamaskButton");
const accountLabel = document.getElementById("accountLabel");
const disconnectMessage = document.getElementById("disconnectMessage");
const fullscreenButton = document.getElementById("fullscreenButton");

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

            // Actualizar el label con la cuenta conectada
            updateLabel(currentAccount);

            // Cambiar el botón al estado de "Desconectar"
            isConnected = true;
            updateButton(currentAccount);

            // Iniciar el juego si la cartera está conectada
            document.getElementById("mensaje_panel_jugarid").style.display = "none";
            if (!gameRunning) { // Solo iniciar el juego si no está corriendo
                startGame(currentAccount);
            }

        } catch (error) {
            if (error.code === 4001) { // Usuario rechazó la solicitud
                alert("Has rechazado la solicitud de conexión.");
            } else {
                console.error("Error al conectar con MetaMask:", error.message);
                alert('Hubo un error al conectar con MetaMask. Asegúrate de que MetaMask esté instalado correctamente.');
            }
        }
    } else {
        alert("Por favor, instala MetaMask para usar esta funcionalidad.");
    }
}

function disconnectWallet() {
    isConnected = false;
    currentAccount = ""; // Reiniciar la cuenta al desconectar

    // Limpiar la cuenta conectada en localStorage
    localStorage.removeItem("connectedAccount");

    // Actualizar el label y el botón
    updateLabel();
    updateButton();

    // Detener el juego (ocultar o parar la lógica del juego)
    document.getElementById("mensaje_panel_jugarid").style.display = "block";
    stopGame(); // Llamar a la función para detener el juego
}

function updateButton(account = "") {
    const screenWidth = window.innerWidth; // Obtiene el ancho de la ventana

    if (isConnected) {
        if (screenWidth <= 750) {
            metamaskButton.textContent = `LOG OUT`;
        } else {
            metamaskButton.textContent = "LOG OUT";
        }
        metamaskButton.onclick = disconnectWallet;
    } else {
        metamaskButton.textContent = "LOG IN";
        metamaskButton.onclick = connectWallet;
    }
}

function updateLabel(account = "") {
    if (account) {
        accountLabel.textContent = ` connected >> (${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)})`;
    } else {
        accountLabel.textContent = "";
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const savedAccount = localStorage.getItem("connectedAccount");
    if (savedAccount) {
        currentAccount = savedAccount;
        isConnected = true;
        updateLabel(currentAccount);
        updateButton(currentAccount);

        // Iniciar el juego si la cuenta ya está conectada
        document.getElementById("mensaje_panel_jugarid").style.display = "none";
        if (!gameRunning) { // Solo iniciar el juego si no está corriendo
            startGame(currentAccount);
        }
    } else {
        updateButton();
    }
});

window.addEventListener('resize', function() {
    if (isConnected && currentAccount) {
        updateButton(currentAccount);
    }
});

if (window.ethereum) {
    window.ethereum.on('accountsChanged', function (accounts) {
        if (accounts.length === 0) {
            // Si la cartera se desconecta
            disconnectWallet();
        } else {
            // Si la cartera se conecta con una nueva cuenta
            currentAccount = accounts[0];
            updateLabel(currentAccount);
            if (!gameRunning) { // Solo iniciar el juego si no está corriendo
                startGame(currentAccount);
            }
        }
    });
}

// cargando funciones .-----------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------------

async function startGame(account = "") {
// Configuración del juego
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // Sin gravedad para el mapa
            debug: false
        }
    }
};

let player;
let map;
let camera;
let cursors;

const game = new Phaser.Game(config);

function preload() {
    // Cargar imágenes del mapa
    this.load.image('map', '../Game/MAPAS/1.png');

    // Cargar imágenes del personaje (para cada dirección)
    this.load.image('player_down_1', '../Game/Sprites/abajo/run_1.png');
    this.load.image('player_down_2', '../Game/Sprites/abajo/run_2.png');
    this.load.image('player_down_3', '../Game/Sprites/abajo/run_3.png');
    this.load.image('player_down_4', '../Game/Sprites/abajo/run_4.png');

    this.load.image('player_up_1', '../Game/Sprites/arriba/run_1.png');
    this.load.image('player_up_2', '../Game/Sprites/arriba/run_2.png');
    this.load.image('player_up_3', '../Game/Sprites/arriba/run_3.png');
    this.load.image('player_up_4', '../Game/Sprites/arriba/run_4.png');

    this.load.image('player_left_1', '../Game/Sprites/izquierda/run_1.png');
    this.load.image('player_left_2', '../Game/Sprites/izquierda/run_2.png');
    this.load.image('player_left_3', '../Game/Sprites/izquierda/run_3.png');
    this.load.image('player_left_4', '../Game/Sprites/izquierda/run_4.png');

    this.load.image('player_right_1', '../Game/Sprites/derecha/run_1.png');
    this.load.image('player_right_2', '../Game/Sprites/derecha/run_2.png');
    this.load.image('player_right_3', '../Game/Sprites/derecha/run_3.png');
    this.load.image('player_right_4', '../Game/Sprites/derecha/run_4.png');

    // Cargar imágenes para las diagonales
    this.load.image('player_up_left_1', '../Game/Sprites/izquierda/run_1.png');
    this.load.image('player_up_left_2', '../Game/Sprites/izquierda/run_2.png');
    this.load.image('player_up_left_3', '../Game/Sprites/izquierda/run_3.png');
    this.load.image('player_up_left_4', '../Game/Sprites/izquierda/run_4.png');

    this.load.image('player_up_right_1', '../Game/Sprites/derecha/run_1.png');
    this.load.image('player_up_right_2', '../Game/Sprites/derecha/run_2.png');
    this.load.image('player_up_right_3', '../Game/Sprites/derecha/run_3.png');
    this.load.image('player_up_right_4', '../Game/Sprites/derecha/run_4.png');

    this.load.image('player_down_left_1', '../Game/Sprites/izquierda/run_1.png');
    this.load.image('player_down_left_2', '../Game/Sprites/izquierda/run_2.png');
    this.load.image('player_down_left_3', '../Game/Sprites/izquierda/run_3.png');
    this.load.image('player_down_left_4', '../Game/Sprites/izquierda/run_4.png');

    this.load.image('player_down_right_1', '../Game/Sprites/derecha/run_1.png');
    this.load.image('player_down_right_2', '../Game/Sprites/derecha/run_2.png');
    this.load.image('player_down_right_3', '../Game/Sprites/derecha/run_3.png');
    this.load.image('player_down_right_4', '../Game/Sprites/derecha/run_4.png');
}

function create() {
    // Cargar el mapa (como fondo)
    map = this.add.image(0, 0, 'map');
    map.setOrigin(0, 0); // Asegurarse que el origen esté en la esquina superior izquierda

    // Establecer límites para la cámara y la física
    this.physics.world.setBounds(0, 0, map.width, map.height);

    // Crear el jugador
    player = this.physics.add.image(400, 300, 'player_down_2');
    player.setCollideWorldBounds(true); // Asegurarse de que el personaje no se salga del mapa

    // Animaciones para el personaje
    this.anims.create({
        key: 'down',
        frames: [
            { key: 'player_down_1' },
            { key: 'player_down_2' },
            { key: 'player_down_3' },
            { key: 'player_down_4' }
        ],
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'up',
        frames: [
            { key: 'player_up_1' },
            { key: 'player_up_2' },
            { key: 'player_up_3' },
            { key: 'player_up_4' }
        ],
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'left',
        frames: [
            { key: 'player_left_1' },
            { key: 'player_left_2' },
            { key: 'player_left_3' },
            { key: 'player_left_4' }
        ],
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: [
            { key: 'player_right_1' },
            { key: 'player_right_2' },
            { key: 'player_right_3' },
            { key: 'player_right_4' }
        ],
        frameRate: 10,
        repeat: -1
    });

    // Animaciones para diagonales
    // Similar a las direcciones principales

    // Crear la cámara y hacer que siga al jugador
    camera = this.cameras.main;
    camera.startFollow(player);
    camera.setDeadzone(0.5); // Ajustar el área de "muerto" para un movimiento más suave

    // Teclas de dirección
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Detener animación y asignar la animación correcta según la dirección
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.setVelocityY(0);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.setVelocityY(0);
        player.anims.play('right', true);
    }
    else if (cursors.up.isDown) {
        player.setVelocityY(-160);
        player.setVelocityX(0);
        player.anims.play('up', true);
    }
    else if (cursors.down.isDown) {
        player.setVelocityY(160);
        player.setVelocityX(0);
        player.anims.play('down', true);
    }
    else {
        player.setVelocityX(0);
        player.setVelocityY(0);
        // Si el personaje se detiene, mostrar el sprite correspondiente
        if (player.anims.currentAnim.key === 'down') {
            player.setTexture('player_down_2'); // Ajusta el sprite según lo que prefieras
        }
        else if (player.anims.currentAnim.key === 'up') {
            player.setTexture('player_up_2');
        }
        else if (player.anims.currentAnim.key === 'left') {
            player.setTexture('player_left_2');
        }
        else if (player.anims.currentAnim.key === 'right') {
            player.setTexture('player_right_2');
        }
    }
}

}





function stopGame() {
    if (!gameRunning) return; // Si el juego no está corriendo, no hacer nada

    gameRunning = false; // Marcar que el juego ha sido detenido
    console.log("Juego detenido");

    // Pausar el ticker y detener el juego
    if (app) {
        app.ticker.stop(); // Detiene el bucle de actualización

        // Ocultar el lienzo
        app.view.style.display = "none";
    }
}


// Inicializar el botón
updateButton();
