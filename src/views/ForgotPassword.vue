<template>
    <div class="vue-tempalte">
        <!-- Main -->
        <div class="container">
            <div class="row">
                <div class="d-none d-md-flex col-md-8 col-lg-6 bg-image"></div>
                <div class="col-md-8 col-lg-6">
                        <div class="vertical-center">
                            <div class="inner-block">
                                <form>
                                    <h3>
                                        <p style="color:#2F9DFF">¿Olvidaste tu contraseña?</p>
                                    </h3>
                                    <p>
                                    <div class="form-group">
                                        <label>Correo electrónico</label>
                                        <input type="email" class="form-control form-control-lg" />
                                    </div>
                                    </p>
                                    <div class="d-grid">
                                        <button class="btn btn-lg btn-primary btn-login mb-2" type="submit">Cambiar
                                            contraseña</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    }
}
</script>