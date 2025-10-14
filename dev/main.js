import { createApp } from 'vue'
import App from './App.vue'
// Import the library locally for development (will be available when components are built)
// import DimensionalUI from '../src/index.js'

const app = createApp(App)
// app.use(DimensionalUI) // Will be enabled when the library components are implemented
app.mount('#app')