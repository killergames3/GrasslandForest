class MainScene extends Phaser.Scene {
    constructor(scene) {
        super({ key: "MainScene" });
    }

    preload() {
        this.load.image("button", "button.png"); // Imagen del botón
    }

    create() {
        const button = this.add.image(400, 300, "button").setInteractive();

        button.on("pointerdown", async () => {
            await this.sendTransaction();
        });
    }

    async sendTransaction() {
        if (!window.ethereum) {
            alert("Por favor, instala Metamask.");
            return;
        }

        try {
            // Solicitar acceso a MetaMask
            await window.ethereum.request({ method: "eth_requestAccounts" });

            // Conectar con MetaMask
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            // Obtener información de la red
            const network = await provider.getNetwork();
            console.log("ID de Red detectado:", Number(network.chainId));

            // Verificar la red (Boss de Proof of Play)
            if (Number(network.chainId) !== 70701) {
                alert(`Estás en la red incorrecta (Chain ID: ${network.chainId}). Cambia a Boss de Proof of Play.`);
                return;
            }

            // Dirección de destino (reemplazar con una válida)
            const recipient = "0x85cfc744d8d5aed07afcba3eaa9bdcabe292cb66"; // Cambia esto por una dirección válida en Boss de Proof of Play

            // Configuración de gas manual (más alto para evitar errores)
            const gasLimit = 25000; // Un valor mayor para asegurarnos de que la transacción pase

            // Enviar transacción de 3 ETH (equivalente en Boss de Proof of Play)
            const tx = await signer.sendTransaction({
                to: recipient,
                value: ethers.parseEther("0.00001"), // 0.03$ ETH
                gasLimit: gasLimit // Gas ajustado
            });

            console.log("Transacción enviada:", tx.hash);
            alert(`Transacción enviada: ${tx.hash}`);

        } catch (error) {
            // Mostrar el error completo para depuración
            console.error("Error en la transacción:", error);

            // Si el usuario cancela la transacción, no mostrar mensaje
            if (error.code === "ACTION_REJECTED" || error.code === 4001) {
                console.warn("Transacción cancelada por el usuario.");
                return; // No hacemos nada
            }

            // Mostrar detalles adicionales del error
            if (error.code === -32603) {
                alert(`Error interno en el servidor: ${error.message}`);
            } else if (error.code === -32000) {
                alert("Fondos insuficientes para la transacción.");
            } else {
                alert(`Error en la transacción: ${error.message}`);
            }
        }
    }
}
