<template>
  <BaseShowcase
    component-name="DSideNavbar"
    description="Mobile-focused side navigation component with pill-style effects, responsive behavior, and nested navigation support"
    :default-props="defaultProps"
    :usage-example="usageExample"
  >
    <template #preview="{ props }">
      <div class="side-navbar-demo">
        <!-- Toggle button for demo -->
        <DButton 
          variant="primary" 
          @click="toggleSidebar"
          class="demo-toggle"
        >
          {{ isSidebarOpen ? 'Close' : 'Open' }} Sidebar
        </DButton>
        
        <!-- Main demo container -->
        <div class="demo-container main-demo">
          <DSideNavbar
            :items="getNavItems(props)"
            :logo="props.logo"
            :is-open="isSidebarOpen"
            :position="props.position"
            :width="props.width"
            :sticky="props.sticky"
            :current-path="props.currentPath"
            :show-overlay="props.showOverlay"
            :show-close-button="props.showCloseButton"
            :show-hamburger-button="props.showHamburgerButton"
            @navigate="handleNavigate"
            @dropdown-toggle="handleDropdownToggle"
            @close="handleClose"
            @overlay-click="handleOverlayClick"
            @hamburger-click="toggleSidebar"
          >
            <template v-if="props.showHeader" #header>
              <div class="demo-header">
                <h3>Navigation</h3>
              </div>
            </template>
            
            <template v-if="props.showFooter" #footer>
              <div class="demo-footer">
                <DButton variant="secondary" size="sm" full-width>Settings</DButton>
              </div>
            </template>
          </DSideNavbar>
          
          <!-- Demo content area -->
          <div class="demo-content">
            <h3>Main Content Area</h3>
            <p>This is the main content area. The sidebar slides in from the {{ props.position }} side.</p>
            <div class="mobile-hint">
              <p><strong>📱 Mobile Testing:</strong> Resize your browser window to < 768px or use dev tools mobile view to see the hamburger button appear!</p>
            </div>
            <p v-if="lastNavigated">
              <strong>Last navigated:</strong> {{ lastNavigated.label }}
              <span v-if="lastNavigated.href">({{ lastNavigated.href }})</span>
            </p>
            <p v-if="dropdownState">
              <strong>Dropdown state:</strong> {{ dropdownState }}
            </p>
          </div>
        </div>
      </div>
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
        label="Position"
        type="select"
        :model-value="props.position"
        :options="positionOptions"
        @update:model-value="(value) => updateProp('position', value)"
      />
      
      <PropControl
        label="Width"
        type="select"
        :model-value="props.width"
        :options="widthOptions"
        @update:model-value="(value) => updateProp('width', value)"
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
        @update:model-value="(value) => updateProp('logo', value ? '/dimensional-ui-logo.png' : '')"
      />
      
      <PropControl
        label="Show Overlay"
        type="boolean"
        :model-value="props.showOverlay"
        @update:model-value="(value) => updateProp('showOverlay', value)"
      />
      
      <PropControl
        label="Show Close Button"
        type="boolean"
        :model-value="props.showCloseButton"
        @update:model-value="(value) => updateProp('showCloseButton', value)"
      />
      
      <PropControl
        label="Sticky"
        type="boolean"
        :model-value="props.sticky"
        @update:model-value="(value) => updateProp('sticky', value)"
      />
      
      <PropControl
        label="Show Header"
        type="boolean"
        :model-value="props.showHeader"
        @update:model-value="(value) => updateProp('showHeader', value)"
      />
      
      <PropControl
        label="Show Footer"
        type="boolean"
        :model-value="props.showFooter"
        @update:model-value="(value) => updateProp('showFooter', value)"
      />
      
      <PropControl
        label="Show Hamburger Button"
        type="boolean"
        :model-value="props.showHamburgerButton"
        @update:model-value="(value) => updateProp('showHamburgerButton', value)"
      />
    </template>

    <template #variants>
      <!-- Basic Side Navigation -->
      <div class="variant-card full-width">
        <h4>Basic Side Navigation</h4>
        <div class="variant-demo">
          <DButton 
            variant="primary" 
            @click="toggleVariant('basic')"
            size="sm"
          >
            {{ variantStates.basic ? 'Close' : 'Open' }} Basic Sidebar
          </DButton>
          
          <div class="demo-container variant">
            <DSideNavbar
              :items="basicNavItems"
              :is-open="variantStates.basic"
              current-path="/home"
              @navigate="handleVariantNavigate"
              @close="() => variantStates.basic = false"
              @hamburger-click="() => variantStates.basic = !variantStates.basic"
            />
            <div class="demo-content">
              <p>Basic sidebar with simple navigation items</p>
            </div>
          </div>
        </div>
      </div>

      <!-- With Nested Navigation -->
      <div class="variant-card full-width">
        <h4>Nested Navigation</h4>
        <div class="variant-demo">
          <DButton 
            variant="primary" 
            @click="toggleVariant('nested')"
            size="sm"
          >
            {{ variantStates.nested ? 'Close' : 'Open' }} Nested Sidebar
          </DButton>
          
          <div class="demo-container variant">
            <DSideNavbar
              :items="nestedNavItems"
              :is-open="variantStates.nested"
              current-path="/products/web"
              @navigate="handleVariantNavigate"
              @dropdown-toggle="handleVariantDropdownToggle"
              @close="() => variantStates.nested = false"
              @hamburger-click="() => variantStates.nested = !variantStates.nested"
            />
            <div class="demo-content">
              <p>Sidebar with nested navigation items and dropdowns</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Position -->
      <div class="variant-card full-width">
        <h4>Right Position</h4>
        <div class="variant-demo">
          <DButton 
            variant="accent-yellow" 
            @click="toggleVariant('right')"
            size="sm"
          >
            {{ variantStates.right ? 'Close' : 'Open' }} Right Sidebar
          </DButton>
          
          <div class="demo-container variant">
            <DSideNavbar
              :items="basicNavItems"
              :is-open="variantStates.right"
              position="right"
              current-path="/about"
              @navigate="handleVariantNavigate"
              @close="() => variantStates.right = false"
              @hamburger-click="() => variantStates.right = !variantStates.right"
            />
            <div class="demo-content">
              <p>Sidebar positioned on the right side</p>
            </div>
          </div>
        </div>
      </div>

      <!-- With Header and Footer -->
      <div class="variant-card full-width">
        <h4>With Header and Footer</h4>
        <div class="variant-demo">
          <DButton 
            variant="accent-pink" 
            @click="toggleVariant('headerFooter')"
            size="sm"
          >
            {{ variantStates.headerFooter ? 'Close' : 'Open' }} Full Sidebar
          </DButton>
          
          <div class="demo-container variant">
            <DSideNavbar
              :items="basicNavItems"
              :is-open="variantStates.headerFooter"
              logo="/dimensional-ui-logo.png"
              current-path="/services"
              @navigate="handleVariantNavigate"
              @close="() => variantStates.headerFooter = false"
              @hamburger-click="() => variantStates.headerFooter = !variantStates.headerFooter"
            >
              <template #header>
                <div class="demo-header">
                  <h3>My App</h3>
                </div>
              </template>
              
              <template #footer>
                <div class="demo-footer">
                  <DButton variant="secondary" size="sm" full-width>Profile</DButton>
                  <DButton variant="primary" size="sm" full-width>Logout</DButton>
                </div>
              </template>
            </DSideNavbar>
            <div class="demo-content">
              <p>Sidebar with custom header and footer content</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Different Widths -->
      <div class="variant-card full-width">
        <h4>Different Widths</h4>
        <div class="width-demos">
          <div class="width-demo">
            <h5>Narrow (200px)</h5>
            <DButton 
              variant="secondary" 
              @click="toggleVariant('narrow')"
              size="sm"
            >
              {{ variantStates.narrow ? 'Close' : 'Open' }}
            </DButton>
            
            <div class="demo-container variant small">
              <DSideNavbar
                :items="compactNavItems"
                :is-open="variantStates.narrow"
                width="200px"
                @navigate="handleVariantNavigate"
                @close="() => variantStates.narrow = false"
                @hamburger-click="() => variantStates.narrow = !variantStates.narrow"
              />
              <div class="demo-content">
                <p>Narrow sidebar</p>
              </div>
            </div>
          </div>
          
          <div class="width-demo">
            <h5>Wide (350px)</h5>
            <DButton 
              variant="secondary" 
              @click="toggleVariant('wide')"
              size="sm"
            >
              {{ variantStates.wide ? 'Close' : 'Open' }}
            </DButton>
            
            <div class="demo-container variant small">
              <DSideNavbar
                :items="extendedNavItems"
                :is-open="variantStates.wide"
                width="350px"
                @navigate="handleVariantNavigate"
                @close="() => variantStates.wide = false"
                @hamburger-click="() => variantStates.wide = !variantStates.wide"
              />
              <div class="demo-content">
                <p>Wide sidebar with more content</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Responsive Demo -->
      <div class="variant-card full-width">
        <h4>Mobile Responsive Behavior</h4>
        <div class="mobile-demo">
          <div class="mobile-info">
            <p><strong>📱 Mobile Features:</strong></p>
            <ul>
              <li>Hamburger button appears in top-left corner (on screens < 768px)</li>
              <li>Sidebar slides in with overlay background</li>
              <li>Click hamburger, overlay, or close button to toggle</li>
              <li>Body scroll is locked when sidebar is open</li>
            </ul>
          </div>
          
          <DButton 
            variant="primary" 
            @click="toggleVariant('mobile')"
          >
            {{ variantStates.mobile ? 'Close' : 'Open' }} Mobile Sidebar
          </DButton>
          
          <div class="demo-container variant mobile mobile-demo-container">
            <DSideNavbar
              :items="mobileNavItems"
              :is-open="variantStates.mobile"
              logo="/dimensional-ui-logo.png"
              @navigate="handleVariantNavigate"
              @close="() => variantStates.mobile = false"
              @overlay-click="() => variantStates.mobile = false"
              @hamburger-click="() => variantStates.mobile = !variantStates.mobile"
            >
              <template #footer>
                <div class="demo-footer">
                  <DButton variant="accent-yellow" size="sm" full-width>Account</DButton>
                </div>
              </template>
            </DSideNavbar>
            <div class="demo-content">
              <h3>Mobile Demo Content</h3>
              <p>On mobile, the sidebar will show an overlay and close button.</p>
              <p>The hamburger button appears in the top-left corner.</p>
              <p>Try opening the sidebar and clicking the overlay or close button.</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseShowcase>
</template>

<script>
import { ref, reactive } from 'vue'
import BaseShowcase from './BaseShowcase.vue'
import PropControl from './PropControl.vue'
import DSideNavbar from '../../src/components/DSideNavbar.vue'
import DButton from '../../src/components/DButton.vue'
import DHamburgerButton from '../../src/components/DHamburgerButton.vue'

export default {
  name: 'DSideNavbarShowcase',
  components: {
    BaseShowcase,
    PropControl,
    DSideNavbar,
    DButton,
    DHamburgerButton
  },
  setup() {
    const isSidebarOpen = ref(false)
    const lastNavigated = ref(null)
    const dropdownState = ref('')
    
    // Variant states for different demos
    const variantStates = reactive({
      basic: false,
      nested: false,
      right: false,
      headerFooter: false,
      narrow: false,
      wide: false,
      mobile: false
    })
    
    const defaultProps = {
      navStyle: 'basic',
      position: 'left',
      width: '280px',
      currentPath: '/home',
      logo: '',
      showOverlay: true,
      showCloseButton: true,
      sticky: false,
      showHeader: false,
      showFooter: false,
      showHamburgerButton: true
    }
    
    const navStyleOptions = [
      { label: 'Basic', value: 'basic' },
      { label: 'Nested', value: 'nested' },
      { label: 'Extended', value: 'extended' }
    ]
    
    const positionOptions = [
      { label: 'Left', value: 'left' },
      { label: 'Right', value: 'right' }
    ]
    
    const widthOptions = [
      { label: 'Narrow (200px)', value: '200px' },
      { label: 'Default (280px)', value: '280px' },
      { label: 'Wide (350px)', value: '350px' }
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
    
    const nestedNavItems = [
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
          { 
            id: 'support', 
            label: 'Support',
            children: [
              { id: 'technical', label: 'Technical Support', href: '/services/support/technical' },
              { id: 'billing', label: 'Billing Support', href: '/services/support/billing' }
            ]
          }
        ]
      },
      { id: 'contact', label: 'Contact', href: '/contact' }
    ]
    
    const extendedNavItems = [
      { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
      { id: 'projects', label: 'Projects', href: '/projects' },
      { id: 'team', label: 'Team', href: '/team' },
      { id: 'analytics', label: 'Analytics', href: '/analytics' },
      { id: 'settings', label: 'Settings', href: '/settings' },
      { id: 'help', label: 'Help & Support', href: '/help' }
    ]
    
    const compactNavItems = [
      { id: 'home', label: 'Home', href: '/home' },
      { id: 'docs', label: 'Docs', href: '/docs' },
      { id: 'api', label: 'API', href: '/api' }
    ]
    
    const mobileNavItems = [
      { id: 'home', label: 'Home', href: '/home' },
      { id: 'profile', label: 'Profile', href: '/profile' },
      { 
        id: 'menu', 
        label: 'Menu',
        children: [
          { id: 'orders', label: 'My Orders', href: '/orders' },
          { id: 'favorites', label: 'Favorites', href: '/favorites' },
          { id: 'history', label: 'Order History', href: '/history' }
        ]
      },
      { id: 'settings', label: 'Settings', href: '/settings' }
    ]
    
    const getNavItems = (props) => {
      switch (props.navStyle) {
        case 'nested':
          return nestedNavItems
        case 'extended':
          return extendedNavItems
        default:
          return basicNavItems
      }
    }
    
    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value
    }
    
    const toggleVariant = (variant) => {
      // Close all other variants
      Object.keys(variantStates).forEach(key => {
        if (key !== variant) {
          variantStates[key] = false
        }
      })
      // Toggle the selected variant
      variantStates[variant] = !variantStates[variant]
    }
    
    const handleNavigate = ({ item, event }) => {
      console.log('Navigate to:', item)
      lastNavigated.value = item
      
      // Prevent actual navigation in demo
      if (event && item.href) {
        event.preventDefault()
      }
    }
    
    const handleVariantNavigate = ({ item, event }) => {
      console.log('Variant navigate to:', item)
      
      // Prevent actual navigation in demo
      if (event && item.href) {
        event.preventDefault()
      }
    }
    
    const handleDropdownToggle = ({ itemId, isOpen }) => {
      console.log('Dropdown toggle:', itemId, isOpen)
      dropdownState.value = isOpen ? `${itemId} is open` : `${itemId} is closed`
    }
    
    const handleVariantDropdownToggle = ({ itemId, isOpen }) => {
      console.log('Variant dropdown toggle:', itemId, isOpen)
    }
    
    const handleClose = () => {
      isSidebarOpen.value = false
    }
    
    const handleOverlayClick = () => {
      console.log('Overlay clicked')
    }
    
    const usageExample = `<!-- Basic side navbar with hamburger button -->
<DSideNavbar
  :items="navItems"
  :is-open="isOpen"
  current-path="/home"
  :show-hamburger-button="true"
  @navigate="handleNavigate"
  @close="handleClose"
  @hamburger-click="toggleSidebar"
/>

<!-- With logo and custom content -->
<DSideNavbar
  :items="navItems"
  :is-open="isOpen"
  logo="/dimensional-ui-logo.png"
  position="left"
  width="300px"
  @navigate="handleNavigate"
  @close="handleClose"
  @hamburger-click="toggleSidebar"
>
  <template #header>
    <h3>My Application</h3>
  </template>
  
  <template #footer>
    <DButton variant="primary" full-width>Settings</DButton>
  </template>
</DSideNavbar>

<!-- Right positioned with nested items -->
<DSideNavbar
  :items="nestedItems"
  :is-open="isOpen"
  position="right"
  @navigate="handleNavigate"
  @dropdown-toggle="handleDropdownToggle"
  @close="handleClose"
  @hamburger-click="toggleSidebar"
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
      isSidebarOpen,
      lastNavigated,
      dropdownState,
      variantStates,
      defaultProps,
      navStyleOptions,
      positionOptions,
      widthOptions,
      pathOptions,
      basicNavItems,
      nestedNavItems,
      extendedNavItems,
      compactNavItems,
      mobileNavItems,
      usageExample,
      getNavItems,
      toggleSidebar,
      toggleVariant,
      handleNavigate,
      handleVariantNavigate,
      handleDropdownToggle,
      handleVariantDropdownToggle,
      handleClose,
      handleOverlayClick
    }
  }
}
</script>

<style scoped>
.side-navbar-demo {
  min-height: 400px;
}

.demo-toggle {
  margin-bottom: 1rem;
}

.demo-container {
  position: relative;
  height: 400px;
  border: 2px solid #000;
  border-radius: 8px;
  overflow: hidden;
  background: #F9F8F4;
}

.demo-container.main-demo {
  /* Ensure hamburger button is positioned relative to this container */
  isolation: isolate;
}

.demo-container.variant {
  height: 300px;
}

.demo-container.small {
  height: 250px;
}

.demo-container.mobile {
  height: 350px;
}

.demo-content {
  padding: 2rem;
  height: 100%;
  overflow-y: auto;
}

.demo-content h3 {
  margin-top: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #000;
}

.demo-content p {
  margin: 1rem 0;
  line-height: 1.5;
}

.demo-header {
  display: flex;
  align-items: center;
  width: 100%;
}

.demo-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #000;
}

.demo-footer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

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

.variant-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.width-demos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.width-demo {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mobile-info {
  margin-bottom: 1rem;
  padding: 1rem;
  background: #FFF455;
  border: 2px solid #000;
  border-radius: 8px;
}

.mobile-info p {
  margin: 0 0 0.5rem 0;
  font-weight: 700;
  font-size: 0.875rem;
}

.mobile-info ul {
  margin: 0;
  padding-left: 1.5rem;
  font-size: 0.875rem;
}

.mobile-info li {
  margin: 0.25rem 0;
}

.mobile-demo-container {
  /* Ensure proper stacking context for mobile demo */
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .width-demos {
    grid-template-columns: 1fr;
  }
  
  .demo-container {
    height: 350px;
    margin-top: 1rem; /* Space for hamburger button */
  }
  
  .demo-container.variant {
    height: 300px;
    margin-top: 1rem;
  }
  
  .demo-container.small {
    height: 280px;
    margin-top: 1rem;
  }
  
  .demo-container.mobile {
    height: 400px;
    margin-top: 1rem;
  }
  
  .demo-content {
    padding: 1rem;
    padding-top: 3rem; /* Space for hamburger button */
  }
  
  .side-navbar-demo {
    padding-top: 1rem;
  }
  
  .demo-toggle {
    margin-bottom: 2rem;
  }
  
  .mobile-hint {
    display: block;
  }
}

.mobile-hint {
  display: none;
  margin: 1rem 0;
  padding: 0.75rem;
  background: #FF004D;
  color: white;
  border: 2px solid #000;
  border-radius: 8px;
  font-size: 0.875rem;
}

.mobile-hint p {
  margin: 0;
  font-weight: 600;
}

@media (max-width: 768px) {
  .mobile-hint {
    display: block;
  }
}
</style>