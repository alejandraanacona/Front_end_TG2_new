<template>
  <div class="tele">
    <h2>Teleoperación</h2>
    <div class="row2">
      <div class="column2">

        <h6>Videocámara izquierda AWS Deepracer</h6>
        <div class="box camaraizq">

        </div>
        <h4>Control teleoperación</h4>
        <div class="box joy">
          <div id="joystick" style="width:100%">
            <svg width="100%" height="100%" viewBox="0 0 100 100">

              <circle cx="50" cy="50" r="50" fill="url(#grad1)" />
              <circle cx="50" cy="50" r="47" fill="url(#grad2)" stroke="#167ed8" stroke-width="0.8px" />
              <circle cx="50" cy="50" r="44" fill="url(#grad3)" />
              <circle cx="50" cy="50" r="20" fill="white" stroke="#167ed8" stroke-width="0.5px"
                onclick="alert('CENTER');" />
              <path d="M50,10 58,22 43,22Z" fill="#167ed8" onclick="alert('UP');" />
              <path d="M50,90 58,78 43,78Z" fill="#167ed8" onclick="alert('DOWN');" />
              <path d="M10,52 22,60 22,46Z" fill="#167ed8" onclick="alert('LEFT');" />
              <path d="M90,52 78,60 78,46Z" fill="#167ed8" onclick="alert('RIGHT');" />
            </svg>
          </div>


        </div>
        <!--<button type="submit" value="Guardar" class="boton" style="color:#FFFF" > Aplicar </button>-->
        <v-btn class="botonIni" color="#167ed8" style="color:#FFFF" @click="Iniciar">Iniciar</v-btn>
      </div>
      <div class="column2">
        <h6>Videocámara derecha AWS Deepracer</h6>

        <div class="box camarader">
          <span>mensaje de java: {{ resBackCamera }}</span>
        </div>


        <h6>Datos sensor LÌDAR</h6>

        <div class="box datoslidar">
          <!--<span>mensaje de java: {{ resBack }}</span>
            <canvas ref="lidarCanvas" width="400" height="400"></canvas>
          <canvas ref="scatterChart" width="400" height="300"></canvas>-->
          <Scatter ref="scatterChart" :data="chartData" :options="chartOptions"></Scatter>

        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
/* eslint-disable */
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
//import { Chart } from 'chart.js';
import { Scatter } from 'vue-chartjs';
import Chart from 'chart.js/auto';
//import axios from 'axios';

//axios
export default {

  components: {
    Scatter
    
  },


  data() {
    const resBackLidar = { rangeX: [1, 2, 3, 4], rangeY: [2, 3, 4, 6], intensities: [0, 0, 0, 0] }
    console.log("DATOSSSSSSSSS", resBackLidar.rangeY);
  
    

    return {
     
      resBackCamera: "hola",
      resBackLidar:{ rangeX: [1, 2, 3, 4], rangeY: [2, 3, 4, 6], intensities: [0, 0, 0, 0] },
      stompClient: null,
      chartData: {
        datasets: [
         
          {
            label: 'Datos del Sensor Lidar',
            data: [],
            backgroundColor:  [0.2, 0.4, 0.6, 0.8, 1].map(intensity => `rgba(0, 0, 0, ${intensity})`),
          }
        ]
      },

      chartOptions: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          },
          y: {
            type: 'linear',
            position: 'left'
          }
        }
      }
    };
  },


  mounted() {
    console.log('Componente montado');
      this.$nextTick(() => {
      this.updateChartData();
    });
  },

  methods: {

    transformData(xData, yData) {
      console.log("HOLA", xData.map((x, index) => ({
        x: x,
        y: yData[index]
      })));

      return xData.map((x, index) => ({
        x: x,
        y: yData[index]
      }));
    },

    updateChartData() {

      console.log("ENTRAAAAAAAAAA")

      //this.chartData.datasets[0].data = this.transformData(this.resBackLidar.rangeX, this.resBackLidar.rangeY);
      //this.chartData.datasets[0].backgroundColor = this.resBackLidar.intensities.map(intensity => `rgba(0, 0, 0, ${intensity})`);
   
      //console.log("LOS DATOS NUUEEVOS", this.transformData(this.resBackLidar.rangeX, this.resBackLidar.rangeY))
      this.chartData = {
        datasets: [{
          label:'Datos del sensor Lidar',
          data: this.transformData(this.resBackLidar.rangeX, this.resBackLidar.rangeY)
        }]
      };
      console.info(this.chartData)
      return (this.chartData)
  },

    connect() {
      //this.resBackLidar = { rangeX: [4, 3, 2, 1], rangeY: [2, 3, 4, 6], intensities: [0, 0, 0, 0] }
      //this.updateChartData()

      let socket = new SockJS('http://localhost:5430/ws');
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, frame => {
        console.log('Conectado: ' + frame);
        this.stompClient.subscribe('/topic/messages', mensaje => {
          this.resBack = mensaje.body;
          //alert(greeting);
        });
        //this.stompClient.send("/app/receive", {}, "Hola aleja desde frotn");
        this.stompClient.subscribe('/topic/messages2', jsonLidar => {
          this.resBackLidar = JSON.parse(jsonLidar.body); // Parsea el cuerpo del mensaje a un objeto JSON
          this.resBackLidar.rangeX
          this.resBackLidar.rangeY
          this.updateChartData()
      
          //this.resBackLidar = { rangeX: [4, 3, 2, 1], rangeY: [2, 3, 4, 6], intensities: [0, 0, 0, 0] }
          //this.intensities=this.intensities
          console.log(this.resBackLidar.rangeX)

          //console.log(this.resBackLidar.rangesX)
          console.log(this.resBackLidar.rangeY)
          //this.chartData.datasets[0].data = this.transformData(this.resBackLidar.rangeX, this.resBackLidar.rangeY);
          //this.chartData.datasets[0].backgroundColor = this.resBackLidar.intensities.map(intensity => `rgba(0, 0, 0, ${intensity})`);

          //this.resBackLidar = jsonLidar.body;
          //alert(greeting);
        });
      });
    },
    sendMessage() {
      this.stompClient.send("/app/receive", {}, "Hola aleja desde frotn");
    },


    Iniciar() {
      // Coloca aquí el código que se ejecutará cuando se haga clic en el botón
      console.log('Entro en el método iniciar');
      this.connect();


    },


  }
}




  /*callback (message) {
    // called when the client receives a STOMP message from the server
    if (message.body) {
      alert("got message with body " + message.body)
    } else {
      alert("got empty message");
    }
  },

  conectarWebSocket() {
    const socket = new SockJS('http://localhost:5430/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, function (frame) {
      console.log('Conectado a WebSocket');
      this.stompClient.subscribe("/topic/messages", this.callback )// mensaje => {
   
      //console.log('Mensaje recibido:', mensaje.body);
      //});
    });
  },

  

  desconectarWebSocket() {
    if (this.stompClient) {
      this.stompClient.disconnect();
      console.log('WebSocket desconectado');
    }
  },


  Iniciar() {
    // Coloca aquí el código que se ejecutará cuando se haga clic en el botón
    console.log('Entro en el método iniciar');
    this.conectarWebSocket();

  }
}*/



</script>
    

<style >
.tele {
  margin-top: 3%;
}

.row2 {
  display: flex;

}

/* Create two equal columns that sits next to each other */
.column2 {
  flex: 50%;

}

h6 {
  margin-left: 80px;
  margin-bottom: 0%
}

h4 {
  margin: 20px 230px 20px 230px;
}

h2 {
  margin-left: 30px;
  padding: 5px;
}

.box {

  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(53, 54, 80, 0.2);
  border-radius: 30px;
  transition: all .3s;
}

.camaraizq {
  width: 400px;
  margin: 40px 130px;
  padding: 100px 500px 250px 70px;
}

.camarader {
  width: 400px;
  margin: 40px 45px;
  padding: 100px 500px 250px 70px;
}

.joy {
  width: 400px;
  margin: 40px 210px;
  padding: 80px 120px 60px 120px;
}

.datoslidar {
  width: 400px;
  height: 400px;
  margin: 20px 45px;
  padding: 20px;
}

.botonIni {
  font-size: 1rem;
  margin: 10px 360px;
  letter-spacing: 0.05rem;
  padding: 30px 100px;
  border-radius: 50px;
}
</style>