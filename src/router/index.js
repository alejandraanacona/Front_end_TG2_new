import Vue from 'vue';
import ConfigParameters from '../views/ConfigParameters.vue'
import ModoTele from '../views/ModoTele.vue'
import ModoAuto from '../views/ModoAuto.vue'
import ModoProgramado from '../views/ModoProgramado.vue'
import ModoEjecucion from '../views/ModoEjecucion.vue'
import InstruccionesUso from '../views/InstruccionesUso.vue'
import Calendar from '../components/Calendar/Calendar.vue'
import AppContenido from '../views/AppContenido.vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history', // Usa createWebHistory en versiones más recientes
  base: process.env.BASE_URL,
  routes: [
  
  {
    path: '/',
    name: 'LoginDeep',
    component: () => import('../views/LoginDeep.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../views/ForgotPassword.vue')
  },

  {
    path:'/dashboard',
    component: () => import('../views/AppContenido.vue'),
    children:[


        {
        path: '/instrucciones',
        name: 'InstruccionesUso',
        component: InstruccionesUso
        },

        {
          path: '/horario',
          name: 'Calendar',
          component: Calendar
        },

        {
        path: '/config',
        name: 'ConfigParameters',
        component: ConfigParameters
        },

        {
        path: '/teleoperado',
        name: 'ModoTele',
        component: ModoTele
        },

        {
        path: '/autonomo',
        name: 'ModoAuto',
        component: ModoAuto
        },

        {
        path: '/programado',
        name: 'ModoProgramado',
        component: ModoProgramado
        },

        {
        path: '/ejecucion',
        name: 'ModoEjecucion',
        component: ModoEjecucion
        },


       
      ],
  },
],
});


export default router
