<template>
  <BaseShowcase
    component-name="DNavbar"
    description="Tactile navigation component with pill-style active states, shadow effects, and dropdown support"
    :default-props="defaultProps"
    :usage-example="usageExample"
  >
    <template #preview="{ props }">
      <DNavbar
        :items="getNavItems(props)"
        :logo="props.logo"
        :sticky="props.sticky"
        :current-path="props.currentPath"
        :responsive="props.responsive"
        @navigate="handleNavigate"
        @dropdown-toggle="handleDropdownToggle"
      >
        <template v-if="props.showActions" #actions>
          <DButton variant="secondary" size="sm">Login</DButton>
          <DButton variant="primary" size="sm">Sign Up</DButton>
        </template>
      </DNavbar>
    </template>

    <template #controls="{ props, updateProp }">
      <PropControl
        label="Navigation Style"
        type="select"
        :model-value="props.navStyle"
        :options="navStyleOptions"
        @update:model-value="(value) => updateProp('navStyle', value)"
      />
      
      <PropControl
        label="Current Path"
        type="select"
        :model-value="props.currentPath"
        :options="pathOptions"
        @update:model-value="(value) => updateProp('currentPath', value)"
      />
      
      <PropControl
        label="Show Logo"
        type="boolean"
        :model-value="!!props.logo"
        @update:model-value="(value) => updateProp('logo', value ? '/logo.svg' : '')"
      />
      
      <PropControl
        label="Sticky"
        type="boolean"
        :model-value="props.sticky"
        @update:model-value="(value) => updateProp('sticky', value)"
      />
      
      <PropControl
        label="Responsive"
        type="boolean"
        :model-value="props.responsive"
        @update:model-value="(value) => updateProp('responsive', value)"
      />
      
      <PropControl
        label="Show Actions"
        type="boolean"
        :model-value="props.showActions"
        @update:model-value="(value) => updateProp('showActions', value)"
      />
    </template>

    <template #variants>
      <!-- Basic Navigation -->
      <div class="variant-card full-width">
        <h4>Basic Navigation</h4>
        <div class="navbar-container">
          <DNavbar
            :items="basicNavItems"
            current-path="/home"
            @navigate="handleNavigate"
          />
        </div>
      </div>

      <!-- Navigation with Logo -->
      <div class="variant-card full-width">
        <h4>With Logo</h4>
        <div class="navbar-container">
          <DNavbar
            :items="basicNavItems"
            logo="/logo.svg"
            logo-alt="Company Logo"
            current-path="/about"
            @navigate="handleNavigate"
          >
            <template #actions>
              <DButton variant="secondary" size="sm">Login</DButton>
            </template>
          </DNavbar>
        </div>
      </div>

      <!-- Navigation with Dropdowns -->
      <div class="variant-card full-width">
        <h4>With Dropdown Menus</h4>
        <div class="navbar-container">
          <DNavbar
            :items="dropdownNavItems"
            current-path="/products/web"
            @navigate="handleNavigate"
            @dropdown-toggle="handleDropdownToggle"
          />
        </div>
      </div>

      <!-- Sticky Navigation -->
      <div class="variant-card full-width">
        <h4>Sticky Navigation</h4>
        <div class="sticky-demo">
          <DNavbar
            :items="basicNavItems"
            sticky
            current-path="/contact"
            @navigate="handleNavigate"
          />
          <div class="demo-content">
            <p>This navbar is sticky. Scroll down to see the effect.</p>
            <div class="spacer"></div>
            <p>More content here...</p>
          </div>
        </div>
      </div>

      <!-- Responsive Navigation -->
      <div class="variant-card full-width">
        <h4>Responsive Behavior</h4>
        <div class="responsive-demo">
          <div class="navbar-container">
            <DNavbar
              :items="extendedNavItems"
              logo="/logo.svg"
              responsive
              current-path="/services"
              @navigate="handleNavigate"
            >
              <template #actions>
                <DButton variant="accent-yellow" size="sm">Get Started</DButton>
              </template>
            </DNavbar>
          </div>
          <p class="demo-note">Resize the window to see responsive behavior</p>
        </div>
      </div>

      <!-- Interactive Demo -->
      <div class="variant-card full-width">
        <h4>Interactive Demo</h4>
        <div class="navbar-container">
          <DNavbar
            :items="interactiveNavItems"
            :current-path="currentDemoPath"
            @navigate="handleDemoNavigate"
            @dropdown-toggle="handleInteractiveDropdownToggle"
          >
            <template #logo>
              <div class="demo-logo">🎨 Demo</div>
            </template>
            <template #actions>
              <DButton variant="primary" size="sm" @click="resetDemo">Reset</DButton>
            </template>
          </DNavbar>
        </div>
        
        <div class="demo-feedback">
          <p v-if="lastNavigated">
            <strong>Last navigated:</strong> {{ lastNavigated.label }}
            <span v-if="lastNavigated.href">({{ lastNavigated.href }})</span>
          </p>
          <p v-if="dropdownState">
            <strong>Dropdown state:</strong> {{ dropdownState }}
          </p>
        </div>
      </div>

      <!-- All States Demo -->
      <div class="variant-card full-width">
        <h4>Navigation States</h4>
        <div class="states-grid">
          <div class="state-demo">
            <h5>Normal State</h5>
            <div class="navbar-container">
              <DNavbar :items="stateNavItems" @navigate="handleNavigate" />
            </div>
          </div>
          <div class="state-demo">
            <h5>With Active Item</h5>
            <div class="navbar-container">
              <DNavbar :items="stateNavItems" current-path="/active" @navigate="handleNavigate" />
            </div>
          </div>
          <div class="state-demo">
            <h5>With Disabled Item</h5>
            <div class="navbar-container">
              <DNavbar :items="disabledNavItems" @navigate="handleNavigate" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseShowcase>
</template>

<script>
import { ref } from 'vue'
import BaseShowcase from './BaseShowcase.vue'
import PropControl from './PropControl.vue'
import DNavbar from '../../src/components/DNavbar.vue'
import DButton from '../../src/components/DButton.vue'

export default {
  name: 'DNavbarShowcase',
  components: {
    BaseShowcase,
    PropControl,
    DNavbar,
    DButton
  },
  setup() {
    const lastNavigated = ref(null)
    const dropdownState = ref('')
    const currentDemoPath = ref('/home')
    
    const defaultProps = {
      navStyle: 'basic',
      currentPath: '/home',
      logo: '',
      sticky: false,
      responsive: true,
      showActions: false
    }
    
    const navStyleOptions = [
      { label: 'Basic', value: 'basic' },
      { label: 'With Dropdowns', value: 'dropdown' },
      { label: 'Extended', value: 'extended' }
    ]
    
    const pathOptions = [
      { label: 'Home', value: '/home' },
      { label: 'About', value: '/about' },
      { label: 'Services', value: '/services' },
      { label: 'Products', value: '/products' },
      { label: 'Contact', value: '/contact' }
    ]
    
    // Navigation item sets
    const basicNavItems = [
      { id: 'home', label: 'Home', href: '/home' },
      { id: 'about', label: 'About', href: '/about' },
      { id: 'services', label: 'Services', href: '/services' },
      { id: 'contact', label: 'Contact', href: '/contact' }
    ]
    
    const dropdownNavItems = [
      { id: 'home', label: 'Home', href: '/home' },
      { 
        id: 'products', 
        label: 'Products', 
        children: [
          { id: 'web', label: 'Web Apps', href: '/products/web' },
          { id: 'mobile', label: 'Mobile Apps', href: '/products/mobile' },
          { id: 'desktop', label: 'Desktop Apps', href: '/products/desktop' }
        ]
      },
      { 
        id: 'services', 
        label: 'Services',
        children: [
          { id: 'consulting', label: 'Consulting', href: '/services/consulting' },
          { id: 'development', label: 'Development', href: '/services/development' },
          { id: 'support', label: 'Support', href: '/services/support' }
        ]
      },
      { id: 'contact', label: 'Contact', href: '/contact' }
    ]
    
    const extendedNavItems = [
      { id: 'home', label: 'Home', href: '/home' },
      { id: 'about', label: 'About', href: '/about' },
      { id: 'services', label: 'Services', href: '/services' },
      { id: 'portfolio', label: 'Portfolio', href: '/portfolio' },
      { id: 'blog', label: 'Blog', href: '/blog' },
      { id: 'contact', label: 'Contact', href: '/contact' }
    ]
    
    const interactiveNavItems = [
      { id: 'home', label: 'Home', href: '/home' },
      { id: 'about', label: 'About', href: '/about' },
      { 
        id: 'products', 
        label: 'Products',
        children: [
          { id: 'web', label: 'Web Development', href: '/products/web' },
          { id: 'mobile', label: 'Mobile Apps', href: '/products/mobile' },
          { id: 'design', label: 'UI/UX Design', href: '/products/design' }
        ]
      },
      { id: 'contact', label: 'Contact', href: '/contact' }
    ]
    
    const stateNavItems = [
      { id: 'normal', label: 'Normal', href: '/normal' },
      { id: 'active', label: 'Active', href: '/active' },
      { id: 'hover', label: 'Hover Me', href: '/hover' }
    ]
    
    const disabledNavItems = [
      { id: 'enabled', label: 'Enabled', href: '/enabled' },
      { id: 'disabled', label: 'Disabled', href: '/disabled', disabled: true },
      { id: 'normal', label: 'Normal', href: '/normal' }
    ]
    
    const getNavItems = (props) => {
      switch (props.navStyle) {
        case 'dropdown':
          return dropdownNavItems
        case 'extended':
          return extendedNavItems
        default:
          return basicNavItems
      }
    }
    
    const handleNavigate = ({ item, event }) => {
      console.log('Navigate to:', item)
      lastNavigated.value = item
      
      // Prevent actual navigation in demo
      if (event && item.href) {
        event.preventDefault()
      }
    }
    
    const handleDemoNavigate = ({ item, event }) => {
      console.log('Demo navigate to:', item)
      lastNavigated.value = item
      currentDemoPath.value = item.href || currentDemoPath.value
      
      // Prevent actual navigation in demo
      if (event && item.href) {
        event.preventDefault()
      }
    }
    
    const handleDropdownToggle = ({ itemId, isOpen }) => {
      console.log('Dropdown toggle:', itemId, isOpen)
      dropdownState.value = isOpen ? `${itemId} is open` : `${itemId} is closed`
    }
    
    const handleInteractiveDropdownToggle = ({ itemId, isOpen }) => {
      console.log('Interactive dropdown toggle:', itemId, isOpen)
      dropdownState.value = isOpen ? `${itemId} is open` : `${itemId} is closed`
    }
    
    const resetDemo = () => {
      lastNavigated.value = null
      dropdownState.value = ''
      currentDemoPath.value = '/home'
    }
    
    const usageExample = `<!-- Basic navbar -->
<DNavbar
  :items="navItems"
  current-path="/home"
  @navigate="handleNavigate"
/>

<!-- With logo and actions -->
<DNavbar
  :items="navItems"
  logo="/logo.svg"
  current-path="/about"
  @navigate="handleNavigate"
>
  <template #actions>
    <DButton variant="secondary" size="sm">Login</DButton>
    <DButton variant="primary" size="sm">Sign Up</DButton>
  </template>
</DNavbar>

<!-- With dropdown menus -->
<DNavbar
  :items="dropdownItems"
  @navigate="handleNavigate"
  @dropdown-toggle="handleDropdownToggle"
/>

<!-- Sticky navbar -->
<DNavbar
  :items="navItems"
  sticky
  responsive
  @navigate="handleNavigate"
/>

<!-- Navigation items structure -->
const navItems = [
  { id: 'home', label: 'Home', href: '/' },
  { 
    id: 'products', 
    label: 'Products',
    children: [
      { id: 'web', label: 'Web Apps', href: '/products/web' },
      { id: 'mobile', label: 'Mobile Apps', href: '/products/mobile' }
    ]
  },
  { id: 'contact', label: 'Contact', href: '/contact' }
]`
    
    return {
      defaultProps,
      navStyleOptions,
      pathOptions,
      basicNavItems,
      dropdownNavItems,
      extendedNavItems,
      interactiveNavItems,
      stateNavItems,
      disabledNavItems,
      lastNavigated,
      dropdownState,
      currentDemoPath,
      usageExample,
      getNavItems,
      handleNavigate,
      handleDemoNavigate,
      handleDropdownToggle,
      handleInteractiveDropdownToggle,
      resetDemo
    }
  }
}
</script>

<style scoped>
.variant-card {
  background: #F9F8F4;
  border: 2px solid #000;
  border-radius: 12px;
  padding: 1.5rem;
}

.variant-card.full-width {
  grid-column: 1 / -1;
}

.variant-card h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 1rem;
}

.variant-card h5 {
  font-size: 1rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 0.5rem;
}

.navbar-container {
  border: 2px solid #000;
  border-radius: 8px;
  overflow: hidden;
  background: #F9F8F4;
}

.sticky-demo {
  border: 2px solid #000;
  border-radius: 8px;
  overflow: hidden;
  height: 200px;
  position: relative;
}

.demo-content {
  padding: 1rem;
  height: 400px;
  overflow-y: auto;
}

.spacer {
  height: 300px;
  background: linear-gradient(45deg, #FFF455 25%, transparent 25%),
              linear-gradient(-45deg, #FFF455 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #FFF455 75%),
              linear-gradient(-45deg, transparent 75%, #FFF455 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

.responsive-demo {
  border: 2px solid #000;
  border-radius: 8px;
  overflow: hidden;
  resize: horizontal;
  min-width: 300px;
  max-width: 100%;
}

.demo-note {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #666;
  font-style: italic;
  margin: 0;
}

.demo-logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: #000;
}

.demo-feedback {
  margin-top: 1rem;
  padding: 1rem;
  background: #FFF455;
  border: 2px solid #000;
  border-radius: 8px;
  font-size: 0.875rem;
}

.demo-feedback p {
  margin: 0.25rem 0;
}

.states-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.state-demo {
  border: 2px solid #000;
  border-radius: 8px;
  overflow: hidden;
}

.state-demo h5 {
  background: #000;
  color: #FFF455;
  padding: 0.5rem 1rem;
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
}

.state-demo .navbar-container {
  margin: 0;
}

@media (max-width: 768px) {
  .states-grid {
    grid-template-columns: 1fr;
  }
  
  .responsive-demo {
    resize: none;
  }
}
</style>