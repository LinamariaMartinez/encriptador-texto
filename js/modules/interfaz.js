const Interfaz = {
  elementos: {},

  init() {
    this.obtenerElementos();
    this.mostrarEstadoInicial();
    this.configurarEventosAdicionales();
  },

  obtenerElementos() {
    this.elementos = {
      cajatexto: document.querySelector(".cajatexto"),
      contenedorCajatexto: document.querySelector(".contenedor-cajatexto"),
      contenedorMunheco: document.querySelector("#munheco"),
      contenedorResultado: document.querySelector("#resultado"),
      textoResultado: document.querySelector(".texto-resultado"),
      btnEncriptar: document.querySelector(".btn-encriptar"),
      btnDesencriptar: document.querySelector(".btn-desencriptar"),
      btnCopiar: document.querySelector(".btn-copiar"),
      btnPegar: document.querySelector(".btn-pegar"),
    };
  },

  mostrarEstadoInicial() {
    this.elementos.contenedorMunheco.style.display = "block";
    this.elementos.contenedorResultado.style.display = "none";
  },

  mostrarResultado(texto) {
    this.elementos.textoResultado.textContent = texto;
    this.elementos.contenedorMunheco.style.display = "none";
    this.elementos.contenedorResultado.style.display = "block";

    // SCROLL AUTOMÁTICO EN MÓVIL AL MOSTRAR RESULTADO
    if (this.esMobile()) {
      setTimeout(() => {
        this.scrollToResultado();
      }, 300); // Esperar que termine la transición
    }
  },

  mostrarError(mensaje) {
    // Remover mensaje anterior si existe
    const mensajeAnterior = document.querySelector(".mensaje-error");
    if (mensajeAnterior) {
      mensajeAnterior.remove();
    }

    // Crear nuevo mensaje de error elegante
    const mensajeError = document.createElement("div");
    mensajeError.className = "mensaje-error";
    mensajeError.innerHTML = `
            <div class="mensaje-error-contenido">
                <span class="mensaje-error-icono">⚠️</span>
                <span class="mensaje-error-texto">${mensaje}</span>
                <button class="mensaje-error-cerrar" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

    // POSICIONAR DENTRO DEL CONTENEDOR DE CAJA DE TEXTO
    this.elementos.contenedorCajatexto.appendChild(mensajeError);

    // Animación de entrada
    setTimeout(() => {
      mensajeError.classList.add("mostrar");
    }, 100);

    // Auto-remover después de 4 segundos
    setTimeout(() => {
      if (mensajeError.parentNode) {
        mensajeError.classList.remove("mostrar");
        setTimeout(() => {
          if (mensajeError.parentNode) {
            mensajeError.remove();
          }
        }, 300);
      }
    }, 4000);
  },

  obtenerTextoEntrada() {
    return this.elementos.cajatexto.value.trim();
  },

  limpiarEntrada() {
    this.elementos.cajatexto.value = "";
  },

  // MÉTODO: detectar si es móvil
  esMobile() {
    return window.matchMedia("(max-width: 600px)").matches;
  },

  // MÉTODO: scroll a resultado
  scrollToResultado() {
    if (this.esMobile()) {
      this.elementos.contenedorResultado.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  },

  // MÉTODO: scroll a caja de texto
  scrollToCajaTexto() {
    if (this.esMobile()) {
      this.elementos.cajatexto.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  },

  // MÉTODO: mostrar feedback con scroll
  mostrarExito(mensaje, scrollTarget = null) {
    const mensajeExito = document.createElement("div");
    mensajeExito.className = "mensaje-exito";
    mensajeExito.innerHTML = `
            <div class="mensaje-exito-contenido">
                <span class="mensaje-exito-icono">✅</span>
                <span class="mensaje-exito-texto">${mensaje}</span>
            </div>
        `;

    document.body.appendChild(mensajeExito);

    setTimeout(() => {
      mensajeExito.classList.add("mostrar");
    }, 100);

    // SCROLL AUTOMÁTICO DESPUÉS DEL MENSAJE
    if (scrollTarget && this.esMobile()) {
      setTimeout(() => {
        if (scrollTarget === "resultado") {
          this.scrollToResultado();
        } else if (scrollTarget === "cajatexto") {
          this.scrollToCajaTexto();
        }
      }, 500); // Esperar que se muestre el mensaje
    }

    setTimeout(() => {
      if (mensajeExito.parentNode) {
        mensajeExito.remove();
      }
    }, 2000);
  },

  // MÉTODO: mostrar feedback temporal en botón
  mostrarFeedbackTemporal(elemento, mensaje) {
    const textoOriginal = elemento.textContent;
    elemento.textContent = mensaje;
    elemento.style.backgroundColor = "#28a745";

    setTimeout(() => {
      elemento.textContent = textoOriginal;
      elemento.style.backgroundColor = "";
    }, 1500);
  },

  // MÉTODO: validación en tiempo real
  configurarValidacionTiempoReal() {
    let timeoutId;

    this.elementos.cajatexto.addEventListener("input", (e) => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const texto = e.target.value;
        if (texto && !this.esTextoValido(texto)) {
          e.target.classList.add("input-error");
        } else {
          e.target.classList.remove("input-error");
        }
      }, 300); // Debounce de 300ms
    });
  },

  // MÉTODO: validar texto básico
  esTextoValido(texto) {
    const REGEX_VALIDACION = /^[a-z\s]*$/;
    return REGEX_VALIDACION.test(texto);
  },

  // MÉTODO: configurar efectos visuales
  configurarEfectosVisuales() {
    const botones = [
      this.elementos.btnEncriptar,
      this.elementos.btnDesencriptar,
      this.elementos.btnCopiar,
      this.elementos.btnPegar,
    ];

    botones.forEach((boton) => {
      if (boton) {
        boton.addEventListener("click", this.aplicarEfectoClick);
      }
    });
  },

  // MÉTODO: efecto click en botones
  aplicarEfectoClick(event) {
    const boton = event.target;
    boton.classList.add("resaltado");

    setTimeout(() => {
      boton.classList.remove("resaltado");
    }, 200);
  },

  // MÉTODO: configurar auto-expand para móvil
  configurarAutoExpand() {
    if (!this.esMobile()) return;

    const textarea = this.elementos.cajatexto;

    // Función para ajustar altura
    const ajustarAltura = () => {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
    };

    // Eventos para auto-expand
    textarea.addEventListener("input", ajustarAltura);
    textarea.addEventListener("paste", () => {
      setTimeout(ajustarAltura, 100);
    });

    // Ajustar al cargar
    ajustarAltura();
  },

  // MÉTODO: configurar todos los eventos adicionales
  configurarEventosAdicionales() {
    this.configurarValidacionTiempoReal();
    this.configurarEfectosVisuales();
    this.configurarAutoExpand();
  },
};

export default Interfaz;
