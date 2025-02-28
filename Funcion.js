document.addEventListener("wheel", function(event) {
    if (event.ctrlKey) {
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && (event.key === "=" || event.key === "-" || event.key === "0")) {
        event.preventDefault();
    }
});


// carrusel



let imagenes = [
    {
        "url": "imag/img/img1.webp",
        "nombre": "Personajes",
        "descripcion": "Los personajes persiguen sus objetivos dentro del mundo del juego, impulsados por su historia, ambiciones y conflictos, lo que define su papel en la narrativa."

    },
    {
        "url": "imag/img/img2.webp",
        "nombre": "Mascotas",
        "descripcion": "Actúan como compañeros estratégicos en combate, respondiendo a la relación con su entrenador y sus propias necesidades instintivas, con la capacidad de evolucionar y fortalecerse a lo largo del juego."

    },
    {
        "url": "imag/img/img3.webp",
        "nombre": "Recursos",
        "descripcion": "Representan elementos clave para la progresión del jugador, desde equipamiento y mejoras hasta consumibles y materiales esenciales, incentivando la exploración y la optimización en batalla."

    },
]


let atras = document.getElementById('atras');
let adelante = document.getElementById('adelante');
let imagen = document.getElementById('img');
let puntos = document.getElementById('puntos');
let texto = document.getElementById('texto')
let actual = 0
posicionCarrusel()

atras.addEventListener('click', function(){
    actual -=1

    if (actual == -1){
        actual = imagenes.length - 1
    }

    imagen.innerHTML = ` <img class="img" src="${imagenes[actual].url}" alt="logo pagina" loading="lazy"></img>`
    texto.innerHTML = `
    <h3>${imagenes[actual].nombre}</h3>
    <p>${imagenes[actual].descripcion}</p>
    `
    posicionCarrusel()
})  
adelante.addEventListener('click', function(){
    actual +=1

    if (actual == imagenes.length){
        actual = 0
    }

    imagen.innerHTML = ` <img class="img" src="${imagenes[actual].url}" alt="logo pagina" loading="lazy"></img>`
    texto.innerHTML = `
    <h3>${imagenes[actual].nombre}</h3>
    <p>${imagenes[actual].descripcion}</p>
    `
    posicionCarrusel()
})  

function posicionCarrusel() {
    puntos.innerHTML = ""
    for (var i = 0; i <imagenes.length; i++){
        if(i == actual){
            puntos.innerHTML += '<p class="bold">.<p>'
        }
        else{
            puntos.innerHTML += '<p>.<p>'
        }
    } 
}


















// Al hacer clic en un botón toggle
    document.querySelectorAll('.boton-toggle').forEach(button => {
        button.addEventListener('click', function() {
          const pregunta = this.parentElement;
          const descripcion = pregunta.nextElementSibling;
  
          // Cierra todas las descripciones abiertas
          document.querySelectorAll('.descripcion').forEach(desc => {
            if (desc !== descripcion) {
              desc.style.display = 'none';
            }
          });
  
          // Alterna la descripción actual
          if (descripcion.style.display === 'none' || descripcion.style.display === '') {
            descripcion.style.display = 'block';
            this.textContent = 'Ocultar';
          } else {
            descripcion.style.display = 'none';
            this.textContent = 'Mostrar';
          }
        });
      });
      
// Función para mostrar/ocultar el menú de navegación
    // Función para alternar la visibilidad del menú
function toggleMenu() {
    var menu = document.querySelector('nav ul');
    menu.classList.toggle('show');
}

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.divs');
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.2 } // Aplica el efecto cuando al menos el 10% del elemento sea visible
    );
  
    cards.forEach((card) => observer.observe(card));
    });


// Obtener referencias a los elementos HTML
const metamaskButton = document.getElementById("metamaskButton");
const accountLabel = document.getElementById("accountLabel");
const preRegisterBtn = document.getElementById("preRegisterBtn");
const formContainer = document.getElementById("formContainer");

let isConnected = false;
let currentAccount = "";

// Conectar con MetaMask
async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const newAccount = accounts[0];

            if (newAccount !== currentAccount) {
                currentAccount = newAccount;
                localStorage.setItem("connectedAccount", currentAccount);
            }

            isConnected = true;
            updateUI();
        } catch (error) {
            alert(error.code === 4001 ? "Conexión rechazada." : "Error al conectar con MetaMask.");
        }
    } else {
        alert("Por favor, instala MetaMask para usar esta funcionalidad.");
    }
}

// Desconectar la cartera
function disconnectWallet() {
    isConnected = false;
    currentAccount = "";
    localStorage.removeItem("connectedAccount");
    closeForm(); // Cerrar el formulario si está abierto
    updateUI();
}

function updateUI() {
    if (isConnected) {
        metamaskButton.textContent = "LOG OUT";
        accountLabel.textContent = `connected >> (${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)})`;
        metamaskButton.onclick = disconnectWallet;

        preRegisterBtn.disabled = false;
        preRegisterBtn.classList.add("greenButton"); // Añadir animación
        preRegisterBtn.onclick = showForm;
    } else {
        accountLabel.textContent = "";
        metamaskButton.textContent = "LOG IN";
        metamaskButton.onclick = connectWallet;

        preRegisterBtn.disabled = true;
        preRegisterBtn.classList.remove("greenButton"); // Quitar animación
        preRegisterBtn.onclick = null;
    }
}

// Mostrar el formulario
function showForm() {
    formContainer.innerHTML = `
        <button class="close" onclick="closeForm()">×</button>
        <div>
            <label for="username">Usuario:</label>
            <input type="text" id="username" placeholder="Ingresa tu usuario">
        </div>
        <div>
            <label for="email">Correo:</label>
            <input type="email" id="email" placeholder="Ingresa tu correo">
        </div>
        <div>
            <button id="submitForm">Enviar</button>
        </div>
    `;
    formContainer.style.display = "block";

    document.getElementById("submitForm").onclick = submitForm;
}

// Manejar el envío del formulario
function submitForm() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;

    if (username && email) {
        alert(`Usuario: ${username}\nCorreo: ${email}`);
        closeForm(); // Limpiar y cerrar el formulario
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

// Cerrar el formulario
function closeForm() {
    formContainer.innerHTML = ""; // Limpiar contenido
    formContainer.style.display = "none"; // Ocultar formulario
}

// Detectar si hay una cuenta guardada
document.addEventListener("DOMContentLoaded", () => {
    const savedAccount = localStorage.getItem("connectedAccount");
    if (savedAccount) {
        currentAccount = savedAccount;
        isConnected = true;
    }
    updateUI();
});
