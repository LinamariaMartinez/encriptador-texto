import {
  ALGORITMO_ENCRIPTACION,
  ALGORITMO_DESENCRIPTACION,
  REGEX_VALIDACION,
  MENSAJES,
} from "../utils/constantes.js";

const Encriptador = {
  // Validaciones
  esTextoValido(texto) {
    return REGEX_VALIDACION.test(texto);
  },

  // Algoritmos
  encriptar(texto) {
    if (!this.esTextoValido(texto)) {
      throw new Error("Texto contiene caracteres no válidos. Usar solo letras minúsculas y sin acentos.");
    }

    return texto.replace(/[aeiou]/g, (letra) => ALGORITMO_ENCRIPTACION[letra]);
  },

  desencriptar(texto) {
    let resultado = texto;

    // Usar Object.entries para mayor claridad
    Object.entries(ALGORITMO_DESENCRIPTACION).forEach(
      ([encriptado, original]) => {
        resultado = resultado.replaceAll(encriptado, original);
      },
    );

    return resultado;
  },

  // Utilidades
  limpiarTexto(texto) {
    return texto.trim().toLowerCase();
  },
};

export default Encriptador;
