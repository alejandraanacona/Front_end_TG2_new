const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  
  devServer: {
    // ... otras configuraciones del servidor ...
    hot: false, // Desactiva HMR temporalmente
}
})