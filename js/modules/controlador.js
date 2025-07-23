import Encriptador from "./encriptador.js";
import Interfaz from "./interfaz.js";

const Controlador = {
  init() {
    Interfaz.init();
    this.configurarEventos();
  },

  configurarEventos() {
    // Eventos principales
    Interfaz.elementos.btnEncriptar.addEventListener(
      "click",
      this.manejarEncriptacion.bind(this),
    );
    Interfaz.elementos.btnDesencriptar.addEventListener(
      "click",
      this.manejarDesencriptacion.bind(this),
    );
    Interfaz.elementos.btnCopiar.addEventListener(
      "click",
      this.manejarCopiado.bind(this),
    );
    Interfaz.elementos.btnPegar.addEventListener(
      "click",
      this.manejarPegado.bind(this),
    );

    // Validación en tiempo real (con debounce)
    this.configurarValidacionTiempoReal();

    // Efectos visuales
    this.configurarEfectosVisuales();
  },

  async manejarEncriptacion() {
    try {
      const texto = Interfaz.obtenerTextoEntrada();

      if (!texto) {
        Interfaz.mostrarEstadoInicial();
        return;
      }

      const textoEncriptado = Encriptador.encriptar(texto);
      Interfaz.mostrarResultado(textoEncriptado);
      Interfaz.limpiarEntrada();
    } catch (error) {
      Interfaz.mostrarError(error.message);
    }
  },

  async manejarDesencriptacion() {
    try {
      const texto = Interfaz.obtenerTextoEntrada();

      if (!texto) {
        Interfaz.mostrarEstadoInicial();
        return;
      }

      // Validar que el texto tenga patrones de encriptación o sea válido
      if (
        !Encriptador.esTextoValido(texto) &&
        !this.tienePatronesEncriptados(texto)
      ) {
        throw new Error(
          "El texto debe estar en minúsculas, sin caracteres especiales y sin acentos.",
        );
      }

      const textoDesencriptado = Encriptador.desencriptar(texto);
      Interfaz.mostrarResultado(textoDesencriptado);
      Interfaz.limpiarEntrada();
    } catch (error) {
      Interfaz.mostrarError(error.message);
    }
  },

  async manejarCopiado() {
    try {
      const texto = Interfaz.elementos.textoResultado.textContent;
      await navigator.clipboard.writeText(texto);
      this.mostrarFeedbackTemporal(Interfaz.elementos.btnCopiar, "¡Copiado!");
    } catch (error) {
      Interfaz.mostrarError("Error al copiar al portapapeles");
    }
  },

  async manejarPegado() {
    try {
      const texto = await navigator.clipboard.readText();
      Interfaz.elementos.cajatexto.value = texto;

      // Scroll al inicio en móviles
      if (window.matchMedia("(max-width: 700px)").matches) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      this.mostrarFeedbackTemporal(Interfaz.elementos.btnPegar, "¡Pegado!");
    } catch (error) {
      Interfaz.mostrarError("Error al pegar desde el portapapeles");
    }
  },

  // Utilidades
  tienePatronesEncriptados(texto) {
    return /ai|enter|imes|ober|ufat/.test(texto);
  },

  mostrarFeedbackTemporal(elemento, mensaje) {
    const textoOriginal = elemento.textContent;
    elemento.textContent = mensaje;
    elemento.style.backgroundColor = "#28a745";

    setTimeout(() => {
      elemento.textContent = textoOriginal;
      elemento.style.backgroundColor = "";
    }, 1500);
  },

  configurarValidacionTiempoReal() {
    let timeoutId;

    Interfaz.elementos.cajatexto.addEventListener("input", (e) => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const texto = e.target.value;
        if (texto && !Encriptador.esTextoValido(texto)) {
          e.target.classList.add("input-error");
        } else {
          e.target.classList.remove("input-error");
        }
      }, 300); // Debounce de 300ms
    });
  },

  configurarEfectosVisuales() {
    const botones = [
      Interfaz.elementos.btnEncriptar,
      Interfaz.elementos.btnDesencriptar,
      Interfaz.elementos.btnCopiar,
      Interfaz.elementos.btnPegar,
    ];

    botones.forEach((boton) => {
      boton.addEventListener("click", this.aplicarEfectoClick);
    });
  },

  aplicarEfectoClick(event) {
    const boton = event.target;
    boton.classList.add("resaltado");

    setTimeout(() => {
      boton.classList.remove("resaltado");
    }, 200);
  },
};

export default Controlador;
