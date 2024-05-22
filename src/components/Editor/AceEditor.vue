<template>
  <div class="editor-container">
    <div ref="editor" class="editor"></div>
  </div>
</template>

<script>
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-python';  // Importa el modo Python
import 'ace-builds/src-noconflict/theme-monokai';

export default {
  name: 'AceEditor',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    this.initEditor();
    window.addEventListener('resize', this.resizeEditor);
    this.resizeEditor(); // Ajuste inicial
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeEditor);
  },
  methods: {
    initEditor() {
      const editor = ace.edit(this.$refs.editor);
      editor.setTheme('ace/theme/monokai');
      editor.session.setMode('ace/mode/python'); // Configura el modo Python
      editor.setValue(this.value, 1); // Inicializa el valor del editor
      editor.getSession().on('change', this.onEditorChange);
      this.editor = editor;
      editor.setOptions({
        autoScrollEditorIntoView: true,
        copyWithEmptySelection: true,
        useWorker: false,
        fontSize: '18px', // Configura el tamaño de la letra
      });
    },
    onEditorChange() {
      // Maneja el cambio en el editor de texto
      const content = this.editor.getValue();
      if (content !== this.value) {
        this.$emit('input', content);
      }
    },
    resizeEditor() {
      if (this.editor) {
        this.editor.resize();
      }
    },
  },
  watch: {
    value(newVal) {
      // Actualiza el contenido del editor cuando cambia el valor externamente
      if (this.editor && this.editor.getValue() !== newVal) {
        this.editor.setValue(newVal, 1); // Usa 1 para mover el cursor al principio
      }
    },
  },
};
</script>

<style scoped>
.editor-container {
  display: flex;
  flex-direction: column;
  height: 800px; /* Ocupa toda la altura de la ventana */
  width: 100%;   /* Ocupa todo el ancho disponible */
}
.editor {
  flex: 1;
}
</style>