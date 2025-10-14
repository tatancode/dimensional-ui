import { createApp } from 'vue'
import App from './App.vue'

// Import theme CSS for development
import '../src/theme/tokens.css'
import '../src/theme/base.css'

const app = createApp(App)
app.mount('#app')