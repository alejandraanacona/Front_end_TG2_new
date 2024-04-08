<template>
    <div>
      <div ref="editor" style="height: 500px;"></div>
    </div>
  </template>
  
  <script>
  import 'ace-builds/src-noconflict/ace'
  import 'ace-builds/src-noconflict/mode-html'
  import 'ace-builds/src-noconflict/theme-monokai'
  
  export default {
    name: 'AceEditor',
    data() {
      return {
        editor: null,
      };
    },
    mounted() {
      this.initEditor();
    },
    methods: {
      initEditor() {
        const editor = ace.edit(this.$refs.editor);
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/html");
        editor.getSession().on('change', this.onEditorChange);
        this.editor = editor;
        editor.setOptions({
            autoScrollEditorIntoView: true,
            copyWithEmptySelection: true,
            useWorker: false
        });
      },
      onEditorChange() {
        // Maneja el cambio en el editor de texto
        this.$emit('input', this.editor.getValue());
      },
    },
    props: {
      value: String, // Valor inicial del editor
    },
    watch: {
      value(newVal) {
        // Actualiza el contenido del editor cuando cambia el valor externamente
        if (this.editor && this.editor.getValue() !== newVal) {
          this.editor.setValue(newVal);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos si es necesario */
  </style>