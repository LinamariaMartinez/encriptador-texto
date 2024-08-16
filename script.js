var botonEncriptar = document.querySelector(".btn-encriptar");
var botonDesencriptar = document.querySelector(".btn-desencriptar");
var contenedor = document.querySelector("#munheco");
var resultado = document.querySelector(".texto-resultado");
var rs = document.querySelector("#resultado");

botonEncriptar.onclick = encriptar;
botonDesencriptar.onclick = desencriptar;

function encriptar() {
    var cajatexto = recuperarTexto();
    if (validarTexto(cajatexto)) {
        resultado.textContent = encriptarTexto(cajatexto);
        mostrar();
    } else {
        alert("El texto debe estar en minúsculas, sin caracteres especiales y sin acentos.");
    }
}

function desencriptar() {
    var cajatexto = recuperarTexto();
    if (validarTexto(cajatexto) || cajatexto.match(/ai|enter|imes|ober|ufat/)) {
        resultado.textContent = desencriptarTexto(cajatexto);
        mostrar();
    } else {
        alert("El texto debe estar en minúsculas, sin caracteres especiales y sin acentos.");
    }
}

function recuperarTexto() {
    var cajatexto = document.querySelector(".cajatexto");
    return cajatexto.value;
}

function mostrar() {
    rs.style.display = "block";
    contenedor.style.display = "none";
    scrollToResultado(); // Desplazarse al contenedor de resultado después de mostrarlo
}

function ocultarAdelante() {
    // Puedes implementar esta función si es necesario
}

function validarTexto(texto) {
    // Validar que el texto no tenga mayúsculas ni acentos
    var regex = /^[a-z\s]*$/;
    return regex.test(texto);
}

function encriptarTexto(mensaje) {
    var textoFinal = "";

    for (var i = 0; i < mensaje.length; i++) {
        if (mensaje[i] == "a") {
            textoFinal += "ai";
        } else if (mensaje[i] == "e") {
            textoFinal += "enter";
        } else if (mensaje[i] == "i") {
            textoFinal += "imes";
        } else if (mensaje[i] == "o") {
            textoFinal += "ober";
        } else if (mensaje[i] == "u") {
            textoFinal += "ufat";
        } else {
            textoFinal += mensaje[i];
        }
    }
    return textoFinal;
}

function desencriptarTexto(mensaje) {
    var textoFinal = mensaje;

    textoFinal = textoFinal.replace(/ai/g, "a");
    textoFinal = textoFinal.replace(/enter/g, "e");
    textoFinal = textoFinal.replace(/imes/g, "i");
    textoFinal = textoFinal.replace(/ober/g, "o");
    textoFinal = textoFinal.replace(/ufat/g, "u");

    return textoFinal;
}


// Botón Copiar
const btnCopiar = document.querySelector(".btn-copiar"); 
btnCopiar.addEventListener("click", () => {
    var contenido = document.querySelector(".texto-resultado").textContent;
    navigator.clipboard.writeText(contenido).then(() => {
        console.log("Texto copiado al portapapeles");
    }).catch(err => {
        console.error('Error al copiar texto: ', err);
    });
});

// Botón Pegar
const btnPegar = document.querySelector(".btn-pegar"); 
btnPegar.addEventListener("click", async () => {
    try {
        const textoPegado = await navigator.clipboard.readText();
        document.querySelector(".cajatexto").value = textoPegado;
        console.log("Texto pegado desde el portapapeles");
    } catch (err) {
        console.error('Error al pegar texto: ', err);
    }
});

// Seleccionar todos los botones
const botones = document.querySelectorAll('.btn-encriptar, .btn-desencriptar, .btn-copiar, .btn-pegar');

// Función para resaltar el botón
function resaltarBoton(event) {
    const boton = event.target;
    boton.classList.add('resaltado');

    // Elimina la clase después de 200ms para que el efecto de resalte desaparezca
    setTimeout(() => {
        boton.classList.remove('resaltado');
    }, 200);
}

// Añadir el evento 'click' a cada botón para aplicar el resalte
botones.forEach(boton => {
    boton.addEventListener('click', resaltarBoton);
});

// Función para detectar si la media query está activa
function isMediaQueryActive() {
    return window.matchMedia("(max-width: 700px)").matches;
}

// Función para hacer scroll hacia el contenedor de resultado
function scrollToResultado() {
    if (isMediaQueryActive()) {
        document.querySelector('.contenedor-resultado').scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
    }
}

// Asignar el evento al botón encriptar y desencriptar para desplazarse después de la acción
document.querySelector('.btn-encriptar').addEventListener('click', function() {
    scrollToResultado();
});

document.querySelector('.btn-desencriptar').addEventListener('click', function() {
    scrollToResultado();
});

// Función para hacer scroll hacia el contenedor
function scrollToTop() {
    if (isMediaQueryActive()) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Asignar el evento al botón pegar
document.querySelector('.btn-pegar').addEventListener('click', function() {
    scrollToTop(); // Desplazarse al incio de la página después de pegar
});
