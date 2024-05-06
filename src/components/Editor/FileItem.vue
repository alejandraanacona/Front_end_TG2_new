<template>
    <div class="file-item" @click="handleClick">
      <span :class="{ 'folder': item.isDirectory, 'file': !item.isDirectory }">
        {{ item.name }}
      </span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    methods: {
      handleClick() {
        this.$emit('select', this.item);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para el componente FileItem */
  .file-item {
    cursor: pointer;
    margin-left: 20px;
  }
  
  .folder::before {
    content: "\f07b"; /* Ícono de carpeta */
    font-family: 'Font Awesome 5 Free';
    margin-right: 5px;
  }
  
  .file::before {
    content: "\f15b"; /* Ícono de archivo */
    font-family: 'Font Awesome 5 Free';
    margin-right: 5px;
  }
  </style>