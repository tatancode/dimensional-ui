<template>
  <BaseShowcase
    component-name="DNavbar"
    description="Tactile navigation with pill-style active states and shadow effects"
    :default-props="defaultProps"
    :usage-example="usageExample"
  >
    <template #preview="{ props }">
      <div class="navbar-preview">
        <nav class="demo-navbar" :class="{ 'demo-navbar--sticky': props.sticky }">
          <div class="demo-navbar-brand">
            <span>{{ props.logo || 'Brand' }}</span>
          </div>
          <ul class="demo-navbar-nav">
            <li 
              v-for="(item, index) in props.items" 
              :key="index"
              class="demo-nav-item"
              :class="{ 'demo-nav-item--active': item.active }"
            >
              <a href="#" class="demo-nav-link">{{ item.label }}</a>
              <ul v-if="item.children" class="demo-dropdown">
                <li v-for="child in item.children" :key="child.label">
                  <a href="#" class="demo-dropdown-link">{{ child.label }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </template>

    <template #controls="{ props, updateProp }">
      <PropControl
        label="Logo Text"
        type="text"
        :model-value="props.logo"
        @update:model-value="updateProp('logo', $event)"
        placeholder="Brand name"
      />
      
      <PropControl
        label="Sticky"
        type="boolean"
        :model-value="props.sticky"
        @update:model-value="updateProp('sticky', $event)"
      />
      
      <div class="nav-items-control">
        <label class="prop-label">Navigation Items</label>
        <div v-for="(item, index) in props.items" :key="index" class="nav-item-control">
          <input 
            v-model="item.label" 
            class="prop-input"
            placeholder="Item label"
          />
          <label class="toggle-container">
            <input type="checkbox" v-model="item.active" class="toggle-input" />
            <span class="toggle-slider"></span>
            <span class="toggle-label">Active</span>
          </label>
        </div>
      </div>
    </template>

    <template #variants>
      <div class="variant-card">
        <h4>Standard Navigation</h4>
        <nav class="demo-navbar demo-navbar--variant">
          <div class="demo-navbar-brand">Brand</div>
          <ul class="demo-navbar-nav">
            <li class="demo-nav-item demo-nav-item--active">
              <a href="#" class="demo-nav-link">Home</a>
            </li>
            <li class="demo-nav-item">
              <a href="#" class="demo-nav-link">About</a>
            </li>
            <li class="demo-nav-item">
              <a href="#" class="demo-nav-link">Contact</a>
            </li>
          </ul>
        </nav>
      </div>

      <div class="variant-card">
        <h4>With Dropdown</h4>
        <nav class="demo-navbar demo-navbar--variant">
          <div class="demo-navbar-brand">Brand</div>
          <ul class="demo-navbar-nav">
            <li class="demo-nav-item">
              <a href="#" class="demo-nav-link">Products</a>
              <ul class="demo-dropdown">
                <li><a href="#" class="demo-dropdown-link">Web Apps</a></li>
                <li><a href="#" class="demo-dropdown-link">Mobile Apps</a></li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </template>
  </BaseShowcase>
</template>

<script>
import BaseShowcase from './BaseShowcase.vue'
import PropControl from './PropControl.vue'

export default {
  name: 'DNavbarShowcase',
  components: {
    BaseShowcase,
    PropControl
  },
  setup() {
    const defaultProps = {
      logo: 'Dimensional UI',
      sticky: false,
      items: [
        { label: 'Home', active: true },
        { label: 'About', active: false },
        { label: 'Services', active: false, children: [
          { label: 'Web Design' },
          { label: 'Development' }
        ]},
        { label: 'Contact', active: false }
      ]
    }

    const usageExample = `<template>
  <DNavbar 
    :items="navItems" 
    logo="My Brand"
    :sticky="true"
    @navigate="handleNavigation"
  />
</template>

<script>
import { DNavbar } from 'dimensional-ui'

export default {
  components: { DNavbar },
  data() {
    return {
      navItems: [
        { label: 'Home', href: '/', active: true },
        { label: 'About', href: '/about' },
        { 
          label: 'Services', 
          children: [
            { label: 'Web Design', href: '/web-design' },
            { label: 'Development', href: '/development' }
          ]
        }
      ]
    }
  },
  methods: {
    handleNavigation(item) {
      console.log('Navigate to:', item)
    }
  }
}
<\/script>`

    return {
      defaultProps,
      usageExample
    }
  }
}
</script>

<style scoped>
.navbar-preview {
  width: 100%;
  min-height: 200px;
}

.demo-navbar {
  background: #F9F8F4;
  border: 2px solid #000;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 3px 3px 0 #000;
}

.demo-navbar--sticky {
  position: sticky;
  top: 0;
  z-index: 100;
}

.demo-navbar--variant {
  margin-bottom: 1rem;
  transform: scale(0.9);
}

.demo-navbar-brand {
  font-weight: 700;
  font-size: 1.2rem;
  color: #000;
}

.demo-navbar-nav {
  display: flex;
  list-style: none;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.demo-nav-item {
  position: relative;
}

.demo-nav-link {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #000;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.1s ease;
}

.demo-nav-item--active .demo-nav-link {
  background: white;
  border: 2px solid #000;
  box-shadow: 2px 2px 0 #000;
}

.demo-nav-link:hover {
  background: white;
  border: 2px solid #000;
  box-shadow: 1px 1px 0 #000;
  transform: translate(1px, 1px);
}

.demo-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: #FFF455;
  border: 2px solid #000;
  border-radius: 8px;
  box-shadow: 4px 4px 0 #000;
  list-style: none;
  padding: 0.5rem 0;
  margin: 0.5rem 0 0 0;
  min-width: 150px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
}

.demo-nav-item:hover .demo-dropdown {
  opacity: 1;
  visibility: visible;
}

.demo-dropdown-link {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #000;
  font-weight: 600;
}

.demo-dropdown-link:hover {
  background: rgba(0, 0, 0, 0.1);
}

.nav-items-control {
  margin-bottom: 1rem;
}

.nav-item-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.nav-item-control .prop-input {
  flex: 1;
}

.toggle-container {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
}

.toggle-label {
  font-size: 0.8rem;
  color: #666;
}

.variant-card {
  background: #F9F8F4;
  border: 2px solid #000;
  border-radius: 12px;
  padding: 1.5rem;
}

.variant-card h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 1rem;
  text-align: center;
}
</style>