<template>
  <div class="container">
    <div class="file-explorer">
      <FileExplorer :directoryItems="directoryItems" @select="handleFileSelect" />
    </div>
    <div class="editor">
      <AceEditor :value="code" />
    </div>
</div>
</template>

<script>
import AceEditor from '@/components/Editor/AceEditor.vue';
import FileExplorer from '@/components/Editor/FileExplorer.vue'; // Supongamos que tienes un componente FileExplorer


export default {
  components: {
    AceEditor,
    FileExplorer,
  },
  data() {
    return {
      code: '<html>\n\t<head>\n\t\t<title>Vue.js Ace Editor</title>\n\t</head>\n\t<body>\n\t\t<h1>Hello, Ace Editor in Vue.js!</h1>\n\t</body>\n</html>',
      directoryItems: [], // Lista de archivos y directorios para mostrar en FileExplorer
    };
  },

  methods: {
    handleFileSelect(file) {
      // Lógica para manejar la selección de un archivo
    },
  },
};

</script>

<style>


.container {
  display: flex;
  padding-top: 100000px;
}

.file-explorer {
  width: 250px; /* Ancho del FileExplorer */
  padding-top: 51px;
}

.editor {
  flex: 1; /* Toma el resto del espacio disponible */
  padding-top: 100px;
}
</style>