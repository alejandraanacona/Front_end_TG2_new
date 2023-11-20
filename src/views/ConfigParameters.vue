<template>
  <v-app>
  <div class="row">
    <div class="Parametros">
      <div class="column">
        <h2>Configuración inicial de parámetros</h2>
        <br><br>
        <h3>Modo de operación</h3>
        <div id="box-modo " class="box modo">
          <div class="toggleWrapper">
            <input type="checkbox" class="dn" id="dn" v-model="nombrepkgEnabled">
            <label for="dn" class="toggle">
              <span class="toggle__handler"></span>
            </label>
          </div>
          <div class="modo1">
            <label for="nombrepkg"> &nbsp &nbsp &nbsp   Nombre del paquete </label>
            <br>
            
            <v-text-field  v-model="nombre" type= "input" outlined=true :disabled="!nombrepkgEnabled" style="width: 200px; height: 50px;"></v-text-field>
           

            <!--<input type="text" id="nombrepkg" name="nombrepkg" :disabled="!nombrepkgEnabled">-->
          </div>
          
          <br>
          <div class="modo2">

            
              
            <v-select v-model="selectedItem" :items="items" label="Seleccione una actividad" :disabled="nombrepkgEnabled"></v-select>
       
         
          </div>
        </div>

        <br>
        <h3>Eleccion de Cámaras</h3>
        <div class="box cameras">
          <label class="cyberpunk-checkbox-label">
            <input class="cyberpunk-checkbox" type="checkbox" id="camaraIzq">
            Usar cámara izquierda</label>

          <label class="cyberpunk-checkbox-label">
            <input class="cyberpunk-checkbox" type="checkbox" id ="camaraDer">
            Usar cámara derecha</label>

          <label class="cyberpunk-checkbox-label">
            <input class="cyberpunk-checkbox" type="checkbox" id="camaraEstereo ">
            Usar cámara estéreo (dos) </label>
        </div>


      </div>
      <div class="column">
        <br><br><br><br>
        <h3>Parámetros LiDAR</h3>
        <div class="box lidar">
          <h5>Campos de visión</h5>
          <div class="minmax">
            <v-text-field  v-model="rangomin" label="Min" type= "number" outlined=true style="width: 200px; height: 50px;"></v-text-field>
            
            
            <br><br>
            <v-text-field  v-model="rangomax" label="Max" type= "number" outlined=true style="width: 200px; height: 50px;"></v-text-field>

        
            <br>
          </div>

          <h5>Rango Máximo</h5>
          <v-slider v-model="sliderValue" :min="2" :max="10" step="0.5"></v-slider>
          <p>Valor del slider en m: {{ sliderValue }}</p>
          
         
        
        </div>
        <br>
        <h3>Velocidades máximas</h3>
        <div class="box odometria">

          <label for="velmaxlineal"> Máxima velocidad lineal deseada </label>
          <v-text-field  v-model="velmaxlineal" type= "number" outlined=true style="width: 200px; height: 50px;"></v-text-field>
          <br>
          <label for="velmaxangular"> Máxima velocidad angular deseada </label>
          <v-text-field  v-model="velmaxangular" type= "number" outlined=true style="width: 200px; height: 50px;"></v-text-field>
          

        </div>
          <button type="submit" value="Guardar" class="boton" style="color:#FFFF" > Aplicar </button>
          
        </div>
    </div>
  </div>
</v-app>
</template>

<script>

import Vue from 'vue';


//campoInput.disable = false;

export default {
  
 
  name: 'ConfParameters',
  data() {
    return {
      nombrepkgEnabled: false, // Inicialmente habilitado
      selectedItem: null, // Aquí se almacenará el elemento seleccionado
      items: [
        'Teleoperado + Láser',
        'Teleoperado + Cámaras',
        'Teleoperado + Cámaras + Láser',
        // Agrega las opciones que desees
      ],
      sliderValue: 5,
    };
  }

}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap');

.Parametros {
  display: flex;
  font-family: Raleway
}

.row {
  display: flex;
}

.column {
  margin-top: 4%;
  flex: 50%;
}

h3 {
  margin: 20px 150px;
}


.box {

  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(53, 54, 80, 0.2);
  border-radius: 30px;
  transition: all .3s;
}

.modo {
  width: 500px;
  margin: 40px 150px;
  padding: 58px 64px 18px 80px;
}

.modo2 {
  width: 400px;
  margin: 20px 0px;
  padding: 0px 100px 24px 46px;
}
.modo1 {
  width: 400px;
  margin: 0px 0px;
  padding: 0px 130px 0px 63px;
}

.cameras {
  width: 500px;
  margin: 25px 150px;
  padding: 50px 55px 32px 90px;
}

.lidar {
  width: 500px;
  margin: 43px 140px;
  padding: 28px 85px 6px 85px;
}

.minmax{
  width: 500px;
  margin: 13px 58px;
  padding: 9px 20px 0px 0px
}

.rango{
  width: 139px;
  margin: 0px 100px;
}
.odometria {
  width: 500px;
  margin: 23px 140px;
  padding: 48px 70px 43px 144px;
}

.boton{
    font-size: 0.9rem;
    margin: 4px 310px;
    letter-spacing: 0.05rem;
    padding: 10px 50px;
    background-color: #167ed8;
    border-radius: 30px;
}



/*----------Switch Toggle-------------*/
.toggleWrapper {
  position: relative;
  top: 50%;
  left: 50%;
  overflow: hidden;
  padding: 5px 320px 5px 200px;
  transform: translate3d(-50%, -50%, 0);
  color: white;
}

.toggleWrapper input {
  position: relative;
  left: -99em;
}

.toggle {
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: 90px;
  height: 50px;
  background-color: #167ed8;
  border-radius: 84px;
  transition: background-color 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

.toggle:before {
  content: 'Teleoperado';
  position: absolute;
  left: -120px;
  top: 15px;
  font-size: 18px;
  color: #167ed8;
}

.toggle:after {
  content: 'Autónomo';
  position: absolute;
  right: -110px;
  top: 15px;
  font-size: 18px;
  color: #092238;
}


.toggle__handler {
  display: inline-block;
  position: relative;
  z-index: 1;
  top: 3px;
  left: 3px;
  width: 44px;
  height: 44px;
  background-color: #ffffff;
  border-radius: 50px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .3);
  transition: all 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform: rotate(-45deg);
}


input:checked+.toggle {
  background-color: #167ed8
}

input:checked+.toggle:before {
  color: #06223a;
}

input:checked+.toggle:after {
  color: #167ed8;
}

input:checked+.toggle .toggle__handler {
  background-color: #ffffff;
  transform: translate3d(40px, 0, 0) rotate(0);
}

/*----------Checkbox-------------*/

.cyberpunk-button {
  background-color: #167ed8;
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  padding: 10px 25px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin: auto;
}

.cyberpunk-checkbox {
  appearance: none;
  width: 30px;
  height: 30px;
  border: 3px solid #167ed8;
  border-radius: 5px;
  background-color: transparent;
  display: inline-block;
  position: relative;
  margin-right: 20px;
  cursor: pointer;
}

.cyberpunk-checkbox:before {
  content: "";
  background-color: #167ed8;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 20px;
  height: 20px;
  border-radius: 3px;
  transition: all 0.3s ease-in-out;
}

.cyberpunk-checkbox:checked:before {
  transform: translate(-50%, -50%) scale(1);
}

.cyberpunk-checkbox-label {
  font-size: 18px;
  color: #000000;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  padding: 15px 10px;
}
</style>
