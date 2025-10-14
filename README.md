# Dimensional UI

A Vue.js component library that brings **Dimensional Minimalism** to your applications. Create engaging, tactile interfaces with sticker-like components featuring bold shadows, bright colors, and a cohesive toy-like aesthetic.

## Features

- 🎨 **Dimensional Design System** - Flat fills with thick shadows and rounded corners
- 🎯 **Tactile Interactions** - Clear visual feedback without complex animations  
- 🧩 **Complete Component Set** - Buttons, navigation, dropdowns, cards, and layouts
- ⚡ **Vue 3 Ready** - Built specifically for Vue.js with composition API support
- 🎪 **Bright Color Palette** - Cream backgrounds with vivid accent colors
- ♿ **Accessible** - WCAG compliant with high contrast and keyboard navigation

## Installation

```bash
npm install dimensional-ui
```

```bash
yarn add dimensional-ui
```

## Quick Start

```javascript
// main.js
import { createApp } from 'vue'
import DimensionalUI from 'dimensional-ui'
import 'dimensional-ui/dist/style.css'

const app = createApp(App)
app.use(DimensionalUI)
app.mount('#app')
```

```vue
<!-- App.vue -->
<template>
  <DLayout>
    <DNavbar :items="navItems" />
    <main>
      <DCard>
        <h1>Welcome to Dimensional UI</h1>
        <DButton variant="primary" @click="handleClick">
          Get Started
        </DButton>
      </DCard>
    </main>
  </DLayout>
</template>
```

## Components

- **DButton** - Sticker-style buttons with hover effects
- **DNavbar** - Navigation with pill-style active states  
- **DDropdown** - Bright dropdown menus with thick shadows
- **DCard** - Content cards with consistent shadow styling
- **DInput** - Form inputs with theme integration
- **DLayout** - Application layout with proper spacing

## Theme System

The library uses CSS custom properties for easy customization:

```css
:root {
  --d-bg-primary: #F9F8F4;    /* Cream background */
  --d-accent-yellow: #FFF455;  /* Bright yellow */
  --d-accent-pink: #FF004D;    /* Vivid pink */
  --d-shadow-md: 3px 3px 0px #000000; /* Thick shadows */
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build

# Run tests
npm test
```

## Browser Support

- Chrome (latest)
- Firefox (latest) 
- Safari (latest)
- Edge (latest)

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our repository.