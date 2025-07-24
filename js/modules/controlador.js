import Encriptador from "./encriptador.js";
import Interfaz from "./interfaz.js";

const Controlador = {
  init() {
    Interfaz.init();
    this.configurarEventos();
  },

  configurarEventos() {
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
  },

  manejarEncriptacion() {
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

  manejarDesencriptacion() {
    try {
      const texto = Interfaz.obtenerTextoEntrada();

      if (!texto) {
        Interfaz.mostrarEstadoInicial();
        return;
      }

      if (
        !Encriptador.esTextoValido(texto) &&
        !Encriptador.tienePatronesEncriptados(texto)
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

      // MOSTRAR ÉXITO CON SCROLL A CAJA DE TEXTO
      Interfaz.mostrarExito(
        "¡Texto copiado! Puedes pegarlo en la caja de texto.",
        "cajatexto",
      );
    } catch (error) {
      Interfaz.mostrarError("Error al copiar al portapapeles");
    }
  },

  async manejarPegado() {
    try {
      const texto = await navigator.clipboard.readText();
      Interfaz.elementos.cajatexto.value = texto;

      // MOSTRAR ÉXITO SIN SCROLL (ya está en la caja de texto)
      Interfaz.mostrarExito("¡Texto pegado exitosamente!");

      // AJUSTAR ALTURA SI ES MÓVIL
      if (Interfaz.esMobile()) {
        const textarea = Interfaz.elementos.cajatexto;
        textarea.style.height = "auto";
        textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
      }
    } catch (error) {
      Interfaz.mostrarError("Error al pegar desde el portapapeles");
    }
  },
};

export default Controlador;
