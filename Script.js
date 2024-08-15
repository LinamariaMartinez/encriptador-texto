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
        alert("El texto debe estar en minúsculas y sin acentos.");
    }
}

function desencriptar() {
    var cajatexto = recuperarTexto();
    if (validarTexto(cajatexto)) {
        resultado.textContent = desencriptarTexto(cajatexto);
    } else {
        alert("El texto debe estar en minúsculas y sin acentos.");
    }
}

function recuperarTexto() {
    var cajatexto = document.querySelector(".cajatexto");
    return cajatexto.value;
}

function mostrar() {
    rs.style.display = "block";
    contenedor.style.display = "none";
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
    var textoFinal = "";

    for (var i = 0; i < mensaje.length; i++) {
        if (mensaje[i] == "a") {
            textoFinal += "a";
            i += 1;
        } else if (mensaje[i] == "e") {
            textoFinal += "e";
            i += 4;
        } else if (mensaje[i] == "i") {
            textoFinal += "i";
            i += 3;
        } else if (mensaje[i] == "o") {
            textoFinal += "o";
            i += 3;
        } else if (mensaje[i] == "u") {
            textoFinal += "u";
            i += 3;
        } else {
            textoFinal += mensaje[i];
        }
    }
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

