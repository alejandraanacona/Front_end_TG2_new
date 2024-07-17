
<template>
    <div class="vue-tempalte">
        <!-- Main -->
        <div class ="container">
            <div class="row">
                
                <div class="d-none d-md-flex col-md-6 bg-image"></div>
                <div class="col-md-6 col-lg-6">
                        <div class="vertical-center">
                            <div class="inner-block">
                                <h3 class="login-heading mb-4">Bienvenido a DeepLabUV</h3>
                                <form>
                                    <form @submit.prevent="LoginData">
                                        <div class="form-floating mb-3">
                                            <input type="codigoUv" class="form-control" id="floatingInput"
                                                v-model="usuarios.codigoUv" placeholder="1600000">
                                            <label for="floatingInput">Código de estudiante</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input type="password" class="form-control" id="floatingPassword"
                                                v-model="usuarios.password" placeholder="Password">
                                            <label for="floatingPassword">Contraseña</label>
                                        </div>

                                        <div class="form-check mb-3">
                                            <input class="form-check-input" type="checkbox" value=""
                                                id="rememberPasswordCheck">
                                            <label class="form-check-label" for="rememberPasswordCheck">
                                                Recordar contraseña
                                            </label>
                                        </div>

                                        <div class="d-grid">
                                            <button type="submit" value="LoginData"
                                                class="btn btn-lg btn-primary btn-login mb-2">Ingresar</button>
                                            <div class="text-center">
                                                <p class="forgot-password text-center mt-2 mb-4">
                                                    <router-link to="/forgot-password">¿Olvidaste la
                                                        contraseña?</router-link>
                                                </p>
                                                <!--<a class="small" href="#">Forgot password?</a>-->
                                                <span>Mensaje: {{ mensaje }}</span>
                                            </div>
                                        </div>
                                       
                                    </form>
                                </form>
                                
                            </div>
                            
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue';
import axios from 'axios';
import { EventBus } from './eventBus';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "100",
  hideDuration: "1000",
  timeOut: "3000",
  extendedTimeOut: "100",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut"
};

axios
export default {
    name: 'LoginDeep',
    data() {
        return {
            result: {},
            mensaje:'',
            usuarios: {
                codigoUv: '',
                password: ''
            
            }
        };
    },

    created() {
    },
    mounted() {
        console.log("mounted() called.......");
    },
    methods: {
        LoginData() {
            console.log("entro a methods");
            axios.post("http://localhost:5430/user/login/", this.usuarios)
                .then(
                    ({ data }) => {
                        console.log(data);
                        try {
                            if (data.message == "Usuario no existe") {
                                this.mensaje=data.message;
                                toastr.warning('Usuario no existe', 'Advertencia');
                            }
                            else if (data.message == "Acesso Exitoso Estudiante") {
                                console.log("usuarios enviados:" +JSON.stringify(data.usuarios));
                                this.$router.push({ name: 'InstruccionesUso' }),
                                localStorage.setItem('usuarios', JSON.stringify(data.usuarios));
                                toastr.success('Acceso exitoso como Estudiante', 'Éxito');
                            }
                            else if (data.message == "Acceso Exitoso Administrador") {

                                this.$router.push({ name: 'ModoAdministrador' })
                                toastr.success('Acceso exitoso como Administrador', 'Éxito');

                            }
                            else {
                                toastr.error('Código incorrecto o la contraseña no coinciden', 'Error');
                            }

                        } catch (err) {
                            toastr.error('Error, por favor intente nuevamente', 'Error');
                        }
                    }
                )
        }
        
    }
}

</script>