<template>
    <div class="file-explorer">
        <h2>Directorio de archivos</h2>
      <div class="directory-tree">
        <ul>
          <li v-for="item in directoryItems" :key="item.name">
            <span @click="toggleItem(item)" :class="{ 'folder': item.isDirectory, 'file': !item.isDirectory }">
              {{ item.name }}
            </span>
            <ul v-if="item.isDirectory && item.expanded">
              <file-item v-for="childItem in item.children" :key="childItem.name" :item="childItem" @select="handleFileSelect" />
            </ul>
          </li>
        </ul>
      </div>
      <div class="file-editor">
        <!-- Editor de archivos -->
      </div>
    </div>
  </template>
  
  <script>
  import FileItem from './FileItem.vue'; // Componente para representar un elemento de archivo o directorio
  
  export default {
    components: {
      FileItem,
    },
    props: {
      directoryItems: { // Lista de archivos y directorios en el directorio actual
        type: Array,
        required: true,
      },
    },
    methods: {
      toggleItem(item) {
        if (item.isDirectory) {
          item.expanded = !item.expanded;
        } else {
          this.$emit('select', item); // Emitir evento cuando se selecciona un archivo
        }
      },
      handleFileSelect(file) {
        this.$emit('select', file); // Propagar evento de selección de archivo hacia arriba
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para el componente de lista de archivos y directorios */
  .file-explorer {
    display: flex;
  }
  
  .directory-tree {
    width: 250px;
    border-right: 1px solid #ccc;
    padding-right: 10px;
    overflow-y: auto;
  }
  
  .directory-tree ul {
    list-style: none;
    padding-left: 0;
  }
  
  .directory-tree li {
    cursor: pointer;
    margin-left: 20px;
  }
  
  .directory-tree .folder::before {
    content: "\f07b"; /* Ícono de carpeta */
    font-family: 'Font Awesome 5 Free';
    margin-right: 5px;
  }
  
  .directory-tree .file::before {
    content: "\f15b"; /* Ícono de archivo */
    font-family: 'Font Awesome 5 Free';
    margin-right: 5px;
  }
  
  .file-editor {
    flex: 1;
    padding-left: 10px;
  }
  </style>