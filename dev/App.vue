<template>
  <div id="app">
    <header class="playground-header">
      <h1>🎨 Dimensional UI - Development Playground</h1>
      <p>Interactive component showcase with live prop controls</p>
    </header>

    <nav class="component-nav">
      <button 
        v-for="component in components" 
        :key="component.name"
        :class="{ active: activeComponent === component.name }"
        @click="activeComponent = component.name"
        class="nav-button"
      >
        {{ component.label }}
      </button>
    </nav>

    <main class="playground-content">
      <div class="component-showcase">
        <component 
          :is="currentComponentShowcase" 
          v-if="currentComponentShowcase"
        />
        <div v-else class="placeholder">
          <h2>{{ activeComponentData?.label || 'Component' }} Showcase</h2>
          <p>This component will be implemented in later tasks.</p>
          <div class="coming-soon">
            <span>🚧 Coming Soon</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
// Import showcase components
import DButtonShowcase from './showcases/DButtonShowcase.vue'
import DNavbarShowcase from './showcases/DNavbarShowcase.vue'
import DSideNavbarShowcase from './showcases/DSideNavbarShowcase.vue'
import DHamburgerButtonShowcase from './showcases/DHamburgerButtonShowcase.vue'
import DDropdownShowcase from './showcases/DDropdownShowcase.vue'
import DCardShowcase from './showcases/DCardShowcase.vue'
import DInputShowcase from './showcases/DInputShowcase.vue'
import DLayoutShowcase from './showcases/DLayoutShowcase.vue'

export default {
  name: 'App',
  components: {
    // Component showcases
    DButtonShowcase,
    DNavbarShowcase,
    DSideNavbarShowcase,
    DHamburgerButtonShowcase,
    DDropdownShowcase,
    DCardShowcase,
    DInputShowcase,
    DLayoutShowcase,
  },
  setup() {
    const activeComponent = ref('DButton')
    
    const components = [
      { name: 'DButton', label: 'Button', showcase: 'DButtonShowcase' },
      { name: 'DNavbar', label: 'Navbar', showcase: 'DNavbarShowcase' },
      { name: 'DSideNavbar', label: 'Side Navbar', showcase: 'DSideNavbarShowcase' },
      { name: 'DHamburgerButton', label: 'Hamburger Button', showcase: 'DHamburgerButtonShowcase' },
      { name: 'DDropdown', label: 'Dropdown', showcase: 'DDropdownShowcase' },
      { name: 'DCard', label: 'Card', showcase: 'DCardShowcase' },
      { name: 'DInput', label: 'Input', showcase: 'DInputShowcase' },
      { name: 'DLayout', label: 'Layout', showcase: 'DLayoutShowcase' },
    ]

    const activeComponentData = computed(() => 
      components.find(c => c.name === activeComponent.value)
    )

    const currentComponentShowcase = computed(() => {
      const componentData = activeComponentData.value
      return componentData?.showcase || null
    })

    return {
      activeComponent,
      components,
      activeComponentData,
      currentComponentShowcase
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Inter', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #F9F8F4;
  min-height: 100vh;
}

.playground-header {
  background: white;
  padding: 2rem;
  text-align: center;
  border-bottom: 2px solid #000;
  box-shadow: 0 3px 0 #000;
}

.playground-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 0.5rem;
}

.playground-header p {
  font-size: 1.1rem;
  color: #666;
  font-weight: 600;
}

.component-nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  background: #F9F8F4;
  flex-wrap: wrap;
}

.nav-button {
  background: white;
  border: 2px solid #000;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.1s ease;
  box-shadow: 3px 3px 0 #000;
}

.nav-button:hover {
  box-shadow: 2px 2px 0 #000;
  transform: translate(1px, 1px);
}

.nav-button:active {
  box-shadow: 1px 1px 0 #000;
  transform: translate(2px, 2px);
}

.nav-button.active {
  background: #FFF455;
  box-shadow: 3px 3px 0 #000;
}

.playground-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.component-showcase {
  background: white;
  border: 2px solid #000;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 5px 5px 0 #000;
  min-height: 600px;
}

.placeholder {
  text-align: center;
  padding: 4rem 2rem;
}

.placeholder h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 1rem;
}

.placeholder p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

.coming-soon {
  display: inline-block;
  background: #FF004D;
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.2rem;
  border: 2px solid #000;
  box-shadow: 3px 3px 0 #000;
}
</style>