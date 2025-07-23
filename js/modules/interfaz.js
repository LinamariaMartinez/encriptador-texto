const Interfaz = {
  elementos: {},

  init() {
      this.obtenerElementos();
      this.mostrarEstadoInicial();
  },

  obtenerElementos() {
      this.elementos = {
          cajatexto: document.querySelector('.cajatexto'),
          contenedorMunheco: document.querySelector('#munheco'),
          contenedorResultado: document.querySelector('#resultado'),
          textoResultado: document.querySelector('.texto-resultado'),
          btnEncriptar: document.querySelector('.btn-encriptar'),
          btnDesencriptar: document.querySelector('.btn-desencriptar'),
          btnCopiar: document.querySelector('.btn-copiar'),
          btnPegar: document.querySelector('.btn-pegar')
      };
  },

  mostrarEstadoInicial() {
      this.elementos.contenedorMunheco.style.display = 'block';
      this.elementos.contenedorResultado.style.display = 'none';
  },

  mostrarResultado(texto) {
      this.elementos.textoResultado.textContent = texto;
      this.elementos.contenedorMunheco.style.display = 'none';
      this.elementos.contenedorResultado.style.display = 'block';
      this.scrollToResultado();
  },

  mostrarError(mensaje) {
      alert(mensaje); // Por ahora usamos alert, luego mejoramos
  },

  obtenerTextoEntrada() {
      return this.elementos.cajatexto.value.trim();
  },

  limpiarEntrada() {
      this.elementos.cajatexto.value = '';
      this.elementos.cajatexto.focus();
  },

  scrollToResultado() {
      if (window.matchMedia("(max-width: 700px)").matches) {
          this.elementos.contenedorResultado.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      }
  }
};

export default Interfaz;