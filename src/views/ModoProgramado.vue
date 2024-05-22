<template>
  <div class="containerPro">
    <div class="buttons">
      
      <div>
        <h7>Abrir archivos</h7>
        <button @click="abrirNodo" type="submit" value="Nodo.py" class="boton" style="color:#FFFF">Nodo.py</button>
        <button @click="abrirSetup" type="submit" value="Setup" class="boton" style="color:#FFFF">Setup</button>
        <button @click="abrirLaunch" type="submit" value="Launch" class="boton" style="color:#FFFF">Launch</button>
        <br><br><br><br>
        <h7>Guardar edición archivos</h7>
        <button @click="guardarArchivo" type="submit" value="Guardar" class="boton" style="color:#FFFF">Guardar</button>
        <br><br><br><br>
        <h7>Crear nuevo nodo</h7>
        <button @click="crearNodo" type="submit" value="crear" class="boton" style="color:#FFFF">Nuevo Nodo</button>

      </div>
    </div>
    <div class="editor">
      <AceEditor v-model="code" />
    </div>
</div>
</template>

<script>
import AceEditor from '@/components/Editor/AceEditor.vue';
import axios from 'axios';

export default {
  components: {
    AceEditor,

  },
  data() {
    return {
      code: '# Escribe tu código Python aquí\nprint("Hola, Ace Editor en Vue.js!")',
      directoryItems: [], // Lista de archivos y directorios para mostrar en FileExplorer
      usuarios: JSON.parse(localStorage.getItem('usuarios')),
    };
  },

  methods: {
    async abrirNodo() {
      try {
        const response = await axios.get(`http://localhost:5430/api/userfolders/${this.usuarios.userId}`)
        this.code = response.data;
      } catch (error) {
        console.error('Error al leer el archivo frontend:', error);
      }

      // Aquí deberías implementar la lógica para leer el contenido del archivo.
      // En este ejemplo, usaremos fetch para leer archivos estáticos.

    },
    guardarArchivo() {
      // Implementa la lógica para guardar el archivo
      console.log('Guardar archivo:', this.code);
    },
    crearNodo() {
      // Implementa la lógica para crear un nuevo nodo
      console.log('Crear nuevo nodo');
    },
  },
};

</script>

<style>


.containerPro {
  
  display: flex;
  
}

.editor {
  flex: 1;
  padding: 50px 5px;
}

.buttons {
  display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 100px;
    width: 100px;
    justify-content: center;
    flex-wrap: nowrap;
}

h7{
  display: flex;
    flex-direction: row;
    align-items: flex-start;
 
    justify-content: center;
    
   
}
.boton{
    font-size: 0.9rem;
    margin: 4px 310px;
    letter-spacing: 0.05rem;
    padding: 10px 50px;
    background-color: #4a4a4a;
    border-radius: 30px;
}
</style>