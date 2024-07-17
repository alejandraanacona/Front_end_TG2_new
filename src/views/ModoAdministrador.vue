<template>
    <div>
            <div class="sidebar">
                <h2 class="sidebar-title" >Menú</h2>
                <div class="sidebar-links">
                    <router-link to="/account">Ver cuenta</router-link>
                    <button @click="logout">Salir</button>
                </div>
            </div>

            <div class="main-content">
            <div class="container">
            <div class="row">
                <!-- Columna para el formulario -->
                <div class="col-md-6">
                <form @submit.prevent="saveUsers">
                  <div class="form-group">
                      <label class="col-form-label col-form-label-lg">Nombre <span class="text-danger">*</span></label>
                      <input type="text" class="form-control form-control-lg" v-model="user.nombre">
                  </div>
                  <div class="form-group">
                      <label class="col-form-label col-form-label-lg">Apellido <span class="text-danger">*</span></label>
                      <input type="text" class="form-control form-control-lg" v-model="user.apellido">
                  </div>
                  <div class="form-group">
                      <label class="col-form-label col-form-label-lg">Correo Electrónico<span class="text-danger">*</span></label>
                      <input type="email" class="form-control form-control-lg" v-model="user.email">
                  </div>
                  <div class="form-group">
                      <label class="col-form-label col-form-label-lg">Código <span class="text-danger">*</span></label>
                      <input type="text" class="form-control form-control-lg" v-model="user.codigoUv">
                  </div>
                  <div class="form-group">
                      <label class="col-form-label col-form-label-lg">Rol <span class="text-danger">*</span></label>
                      <select class="form-control form-control-lg" v-model="user.rol">
                          <option value="" disabled selected>Selecciona un rol</option>
                          <option value="admin">Administrador</option>
                          <option value="user">Usuario</option>
                          <!-- Agrega más opciones según sea necesario -->
                      </select>
                  </div>
                    <br>
                    <div class="form-group text-center">
                    <button value="saveUsers" class="btn btn-vue btn-lg col-4">Registrar</button>
                    </div>
                </form>
                </div>
                <!-- Columna para la tabla de usuarios -->
                <div class="col-md-6">
                <table class="table">
                    <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo Electrónico</th>
                        <th>Código</th>
                        <th>Rol</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.nombre }}</td>
                        <td>{{ user.apellido }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.codigoUv }}</td>
                        <td>{{ user.rol }}</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>
    </div>

  </template>
  
  <script>
  import axios from 'axios';
  import toastr from 'toastr';
  
  export default {
    name: 'SignupForm',
    data() {
      return {
        users: [],
        user: {
            nombre:'',
            apellido:'',
            email:'',
            codigoUv:'',
            rol:''
        }
      };
    },

    mounted() {
      //this.fetchUsers();
    },
    methods: {
      fetchUsers() {
        axios.get('http://localhost:5430/api/users')
          .then(response => {
            this.users = response.data;
          })
          .catch(error => {
            console.error('Error fetching users:', error);
          });
      },

      saveUsers(){
        console.log('Usuarios a guardar', this.user)
        toastr.success('Usuario guardado','Éxito');
        axios.post("http://localhost:5430/user/save/", {
            nombre: this.user.nombre,
            apellido: this.user.apellido,
            email: this.user.email,
            codigoUv: this.user.codigoUv,
            rol:this.user.rol
        })
        console.log('Usuarios a guardar', this.user)
        .then(response => {
            // Manejar la respuesta del servidor
            console.log(response.data);
            

            // Por ejemplo, redirigir a otra página después de guardar los datos
            //this.$router.push({ name: 'OtraPagina' });
        })
        .catch(error => {
            // Manejar cualquier error que ocurra durante la solicitud
            console.error('Error al guardar los usuarios:', error);
            toastr.error('Error al guardar los usuarios. Por favor, inténtelo de nuevo.','Error');
        });
    },

    logout() {
      // Método para cerrar sesión
      // Por ejemplo:
      console.log('Logout');
      // Aquí podrías agregar la lógica para cerrar sesión, por ejemplo, redirigir al usuario a la página de inicio de sesión.
    }
  }
}
  </script>
  
  
  <style>
  .btn-vue{
    background: #167ed8;
    color: #fcfcfc;
    font-weight: bold;
  }

  .sidebar {
  height: 100%;
  width: 350px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #167ed8;
  padding-top: 20px;
}

.main-content {
  margin-left: 250px; /* Ajusta el margen para evitar solapamiento con el sidebar */
  padding: 20px;
  margin-top: 200px;
}

.sidebar-title {
  text-align: center; /* Centra el texto */
  color: #fff; /* Color del texto */
}

.sidebar-links {
  margin-top: 20px; /* Espacio entre el título y los enlaces */
}

.sidebar-links router-link,
.sidebar-links button {
  display: block; /* Asegura que los elementos ocupen todo el ancho disponible */
  text-align: center; /* Centra el contenido dentro del contenedor */
  margin-bottom: 100px; /* Espacio entre los enlaces */
  color: #fff; /* Color del texto */
  text-decoration: none; /* Quita el subrayado de los enlaces */
}
  </style>