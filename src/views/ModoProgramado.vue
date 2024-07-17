<template>
  <div class="containerPro">
    <div class="buttons">
      <div>
        <h5>Abrir archivos</h5>
        <button @click="abrirNodo" type="submit" value="Nodo.py" class="boton" style="color:#FFFF">Nodo.py</button>
        <button @click="abrirSetup" type="submit" value="Setup" class="boton" style="color:#FFFF">Setup</button>
        <button @click="abrirLaunch" type="submit" value="Launch" class="boton" style="color:#FFFF">Launch</button>
        <br><br><br><br>
        <h5>Guardar edición archivos</h5>
        <button @click="guardarArchivo" type="submit" value="Guardar" class="boton" style="color:#FFFF">Guardar</button>
        <br><br><br><br>
        <h5>Crear nuevo nodo</h5>
        <button @click="crearNodo" type="submit" value="crear" class="boton" style="color:#FFFF">Nuevo Nodo</button>
        <br><br><br><br>
        <h5>Ejecutar y Stop</h5>
        <button @click="ejecutarCodigo" type="submit" value="Ejecutar" class="botonPlay" style="color:#FFFF">Ejecutar</button>
        <button @click="detenerCodigo" type="submit" value="Stop" class="botonStop" style="color:#FFFF">Stop</button>
      </div>
    </div>
    <div class="editor-output-container">
      <div class="editor">
        <AceEditor v-model="code" />
      </div>
      <div class="output">
        <textarea v-model="registros" readonly></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import AceEditor from '@/components/Editor/AceEditor.vue';
import axios from 'axios';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import toastr from 'toastr';

export default {
  components: {
    AceEditor,
  },
  data() {
    return {
      code: '',
      output: '', // Para el cuadro de texto de salida
      usuarios: JSON.parse(localStorage.getItem('usuarios')),
      filePath:'',
      archivoNodo:'nodo',
      archivoSetup:'setup',
      registros:' ',
      stompClient: null
    };
  },
  methods: {
    async abrirNodo() {
      try {
        const response = await axios.get(`http://localhost:5430/api/userfolders/${this.usuarios.userId}/${this.archivoNodo}`)
        this.code = response.data.fileContent;
        this.filePath = response.data.path;
        console.log(this.code);
        toastr.success('Abriendo archivo python','Éxito')
      } catch (error) {
        console.error('Error al leer el archivo frontend:', error);
      }
    },

    async abrirSetup(){
      console.log('Guardar archivo:', this.code);
      try {
        const response = await axios.get(`http://localhost:5430/api/userfolders/${this.usuarios.userId}/${this.archivoSetup}`)
        this.code = response.data.fileContent;
        this.filePath = response.data.path;
        toastr.success('Abriendo archivo Setup','Éxito')

        console.log(this.code);
      } catch (error) {
        console.error('Error al leer el archivo frontend:', error);
        toastr.error('Error abriendo archivo, intente nuevamente','Error')

      }
    },

    abrirLaunch(){
      console.log('Guardar archivo:', this.code);

    },
    guardarArchivo() {
      try{
      axios.post("http://localhost:5430/api/userfolders/save", {fileContent:this.code, path:this.filePath})
      toastr.success('Guardando archivo','Éxito')

      }catch(error){
      console.log('Error al guardar archivo:', error);
      toastr.error('Error guardando archivo, intente nuevamente','Error')

      }
    },
    crearNodo() {
      //console.log('Crear nuevo nodo');
    },

    connectToSocketProgram() {
    let socket = new SockJS('http://localhost:5430/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, frame => {
      console.log('Conectado: ' + frame);
      this.subscribeToMessagesConsole();
      });
    },

    subscribeToMessagesConsole() {
      this.stompClient.subscribe('/topic/output', mensaje => {
        this.registros += mensaje.body + '\n'; // Concatenar cada nuevo mensaje con una nueva línea
      });
    },

    ejecutarCodigo() {

      // Lógica para ejecutar el código
      console.log('Ejecutar código:',this.usuarios );


      axios.post("http://localhost:5430/api/userfolders/buildAndRun", this.usuarios)
        .then(response => {
          this.output = response.data.output;
          toastr.success('Ejecutando el proyecto','Éxito')

        })
        .catch(error => {
          console.error('Error al ejecutar el código:', error);
          toastr.error('Error ejecutando el proyecto, intente nuevamente','Error')

        });

      this.connectToSocketProgram();
      
      
    },
    detenerCodigo() {
      // Lógica para detener el código
      console.log('Detener ejecución del código');
      axios.post("http://localhost:5430/api/userfolders/stop",this.usuarios)
      .then(response => {
          this.output = response.data.output;
        })
        .catch(error => {
          console.error('Error al detener el código:', error);
        });
      this.output = 'Ejecución detenida';
    },

   
  },
};

</script>

<style>
.containerPro {
  display: flex;
}

.editor-output-container {
  display: flex;
    flex-direction: column;
    flex: 1;
    padding: 40px 20px 20px;
}

.editor {
  flex: 1;
  padding: 10px 0;
}

.output {
  flex: 1;
  padding: 10px 0;
}

textarea {
  width: 100%;
  height: 200px;
  padding: 10px;
  border: 2px solid #033156;
  border-radius: 4px;
  font-size: 1rem;
  border-color: #033156;
}

.buttons {
  display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 55px 25px 20px;
    width: 200px;
}

h5{
  display: flex;
            justify-content: center;
            align-items: center;
}

.boton {
  font-size: 0.9rem;
  margin: 10px 0;
  letter-spacing: 0.05rem;
  padding: 10px 20px;
  background-color: #4a4a4a;
  border-radius: 30px;
  color: #FFF;
  width: 100%; /* Establece el mismo ancho para todos los botones */
  box-sizing: border-box;
}

.botonPlay {
  font-size: 0.9rem;
  margin: 10px 0;
  letter-spacing: 0.05rem;
  padding: 10px 20px;
  background-color: #098103;
  border-radius: 30px;
  color: #FFF;
  width: 100%; /* Establece el mismo ancho para todos los botones */
  box-sizing: border-box;
}

.botonStop {
  font-size: 0.9rem;
  margin: 10px 0;
  letter-spacing: 0.05rem;
  padding: 10px 20px;
  background-color: #ba1702;
  border-radius: 30px;
  color: #FFF;
  width: 100%; /* Establece el mismo ancho para todos los botones */
  box-sizing: border-box;
}
</style>