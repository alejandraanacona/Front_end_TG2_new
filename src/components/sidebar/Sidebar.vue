<template>
   
    <div class="sidebar" :style = "{width: sidebarWidth}">
    
        <header></header>
        <br>
        <br>
        <h1>
            <span v-if ="collapsed">
            
                <div>D</div>
                <div>L</div>
            </span>
            <span v-else>&nbsp; DeepLab UV</span>
        </h1>
        


        <SidebarLink to ="/instrucciones"> <v-icon>mdi-book</v-icon><span v-if ="collapsed"> </span>
            <span v-else>&nbsp;&nbsp; Instrucciones de uso </span></SidebarLink>
        <br>
        <SidebarLink to ="/horario"> <v-icon>mdi-calendar</v-icon> <span v-if ="collapsed"> </span>
            <span v-else>&nbsp;&nbsp;&nbsp;Agendar horario </span> </SidebarLink>
        <br>
        <SidebarLink to ="/config" > <v-icon>mdi-cogs</v-icon> <span v-if ="collapsed"> </span>
            <span v-else>&nbsp;Configuración de Parámetros</span> </SidebarLink>
        <br>
        <SidebarLink to ="/teleoperado"> <v-icon color="white">mdi-laptop</v-icon><span v-if ="collapsed"> </span>
            <span v-else> &nbsp;&nbsp;Modo Teleoperado </span>  </SidebarLink>
        <br>
        <SidebarLink to ="/autonomo" > <v-icon color="white">mdi-road</v-icon><span v-if ="collapsed"> </span>
            <span v-else>&nbsp;&nbsp;Modo Autónomo </span> </SidebarLink>
        <br>
            <ul class="sub-menu">    
                <SidebarLink to ="/programado" > <v-icon>mdi-file-code</v-icon><span v-if ="collapsed"> </span>
            <span v-else>&nbsp;&nbsp; Modo programado </span></SidebarLink>
                <br>
                <SidebarLink to ="/ejecucion" > <v-icon>mdi-play</v-icon><span v-if ="collapsed"> </span>
            <span v-else> &nbsp;&nbsp; Modo ejecución </span> </SidebarLink>
            </ul>
        <br>
        <SidebarLink to ="/" > <v-icon>mdi-logout</v-icon><span v-if ="collapsed"> </span>
            <span v-else> &nbsp;&nbsp; Salir </span> </SidebarLink>
        
       

        <span
            class="collapse-icon"
            :class = "{ 'rotate-180': collapsed }"
            @click= "toggleSidebar">
            >> <v-icon>mdi-angle-double-left</v-icon>
           
    </span>
    </div>
</template>

<script>
import {collapsed,toggleSidebar, sidebarWidth } from './state'
import SidebarLink from './SidebarLink.vue';



export default {
    props:{},
    components:{ SidebarLink },
    setup(){    
        return {collapsed , toggleSidebar, sidebarWidth,SidebarLink}
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap');
:root {
    --sidebar-bg-color: #167ed8;
    --sidebar-item-hover: #a39e00;
    --sidebar-item-active:rgb(253, 250, 250);
}
</style>

<style>
header {
  width: 100%;
  height: 40px;
  background: #167ed8;
  display: flex;
  align-items: center;
  position: fixed;
  top:0;
  z-index: 200;
}

.sidebar {
    color:#fffcfcb1;
    background-color: var(--sidebar-bg-color);
    font-family: Raleway;

    float:left;
    position: fixed;
    z-index: 2;
    top:0;
    left: 0;
    bottom: 0;
    padding: 0.2em;

    transition: 0.3s ease;

    display: flex;
    flex-direction: column;
}

.sidebar h1 {
  height: 3.5em;
}

.collapse-icon{
    position:absolute;
    bottom: 0;
    padding: 0.75em;

    color: rgba(255,255,255,0.7);

    transition: 0.2s linear;
}

.rotate-180{
    transform: rotate(180deg);
    transition: 0.2s linear;
}
</style>