<template>
  <BaseShowcase
    component-name="DHamburgerButton"
    description="Animated hamburger menu button with burger-style progressive line widths and smooth open/close transitions"
    :default-props="defaultProps"
    :usage-example="usageExample"
  >
    <template #preview="{ props }">
      <div class="hamburger-demo">
        <div class="demo-container">
          <DHamburgerButton
            :is-open="props.isOpen"
            :size="props.size"
            :disabled="props.disabled"
            :aria-label="props.ariaLabel"
            @click="handleClick"
          />
          
          <div class="demo-info">
            <p><strong>Status:</strong> {{ props.isOpen ? 'Open' : 'Closed' }}</p>
            <p><strong>Size:</strong> {{ props.size }}</p>
            <p><strong>Disabled:</strong> {{ props.disabled ? 'Yes' : 'No' }}</p>
            <p v-if="clickCount > 0"><strong>Clicks:</strong> {{ clickCount }}</p>
          </div>
        </div>
      </div>
    </template>

    <template #controls="{ props, updateProp }">
      <PropControl
        label="Is Open"
        type="boolean"
        :model-value="props.isOpen"
        @update:model-value="(value) => updateProp('isOpen', value)"
      />
      
      <PropControl
        label="Size"
        type="select"
        :model-value="props.size"
        :options="sizeOptions"
        @update:model-value="(value) => updateProp('size', value)"
      />
      
      <PropControl
        label="Disabled"
        type="boolean"
        :model-value="props.disabled"
        @update:model-value="(value) => updateProp('disabled', value)"
      />
      
      <PropControl
        label="ARIA Label"
        type="text"
        :model-value="props.ariaLabel"
        @update:model-value="(value) => updateProp('ariaLabel', value)"
      />
    </template>

    <template #variants>
      <!-- Size Variants -->
      <div class="variant-card size-variant">
        <h4>Small Size</h4>
        <div class="variant-demo centered">
          <DHamburgerButton
            size="sm"
            :is-open="variantStates.small"
            @click="() => toggleVariant('small')"
          />
          <p>Small hamburger button (2rem × 2rem)</p>
        </div>
      </div>

      <div class="variant-card size-variant">
        <h4>Medium Size (Default)</h4>
        <div class="variant-demo centered">
          <DHamburgerButton
            size="md"
            :is-open="variantStates.medium"
            @click="() => toggleVariant('medium')"
          />
          <p>Medium hamburger button (2.5rem × 2.5rem)</p>
        </div>
      </div>

      <div class="variant-card size-variant">
        <h4>Large Size</h4>
        <div class="variant-demo centered">
          <DHamburgerButton
            size="lg"
            :is-open="variantStates.large"
            @click="() => toggleVariant('large')"
          />
          <p>Large hamburger button (3rem × 3rem)</p>
        </div>
      </div>

      <!-- State Variants -->
      <div class="variant-card size-variant">
        <h4>Disabled State</h4>
        <div class="variant-demo centered">
          <DHamburgerButton
            disabled
            :is-open="false"
          />
          <p>Disabled hamburger button</p>
        </div>
      </div>

      <!-- Animation Demo -->
      <div class="variant-card full-width">
        <h4>Animation Demo</h4>
        <div class="animation-demo">
          <div class="animation-row">
            <DHamburgerButton
              size="sm"
              :is-open="animationStates.sm"
              @click="() => toggleAnimation('sm')"
            />
            <DHamburgerButton
              size="md"
              :is-open="animationStates.md"
              @click="() => toggleAnimation('md')"
            />
            <DHamburgerButton
              size="lg"
              :is-open="animationStates.lg"
              @click="() => toggleAnimation('lg')"
            />
          </div>
          <p>Click any button to see the burger → X animation</p>
          <DButton 
            variant="secondary" 
            size="sm"
            @click="toggleAllAnimations"
          >
            Toggle All
          </DButton>
        </div>
      </div>

      <!-- Interactive Demo -->
      <div class="variant-card full-width">
        <h4>Interactive Demo</h4>
        <div class="interactive-demo">
          <div class="mock-header">
            <DHamburgerButton
              :is-open="mockMenuOpen"
              @click="toggleMockMenu"
            />
            <h3>My App</h3>
          </div>
          
          <div v-if="mockMenuOpen" class="mock-menu">
            <div class="mock-menu-item">Home</div>
            <div class="mock-menu-item">About</div>
            <div class="mock-menu-item">Services</div>
            <div class="mock-menu-item">Contact</div>
          </div>
          
          <div class="mock-content">
            <p>This demonstrates how the hamburger button might be used in a real application header.</p>
            <p>Menu is {{ mockMenuOpen ? 'open' : 'closed' }}</p>
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
import DHamburgerButton from '../../src/components/DHamburgerButton.vue'
import DButton from '../../src/components/DButton.vue'

export default {
  name: 'DHamburgerButtonShowcase',
  components: {
    BaseShowcase,
    PropControl,
    DHamburgerButton,
    DButton
  },
  setup() {
    const clickCount = ref(0)
    const mockMenuOpen = ref(false)
    
    // Variant states
    const variantStates = reactive({
      small: false,
      medium: false,
      large: false
    })
    
    // Animation states
    const animationStates = reactive({
      sm: false,
      md: false,
      lg: false
    })
    
    const defaultProps = {
      isOpen: false,
      size: 'md',
      disabled: false,
      ariaLabel: 'Toggle navigation menu'
    }
    
    const sizeOptions = [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' }
    ]
    
    const handleClick = () => {
      clickCount.value++
    }
    
    const toggleVariant = (variant) => {
      variantStates[variant] = !variantStates[variant]
    }
    
    const toggleAnimation = (size) => {
      animationStates[size] = !animationStates[size]
    }
    
    const toggleAllAnimations = () => {
      const allOpen = Object.values(animationStates).every(state => state)
      Object.keys(animationStates).forEach(key => {
        animationStates[key] = !allOpen
      })
    }
    
    const toggleMockMenu = () => {
      mockMenuOpen.value = !mockMenuOpen.value
    }
    
    const usageExample = `<!-- Basic hamburger button -->
<DHamburgerButton
  :is-open="isMenuOpen"
  @click="toggleMenu"
/>

<!-- Different sizes -->
<DHamburgerButton size="sm" :is-open="isOpen" @click="handleClick" />
<DHamburgerButton size="md" :is-open="isOpen" @click="handleClick" />
<DHamburgerButton size="lg" :is-open="isOpen" @click="handleClick" />

<!-- Disabled state -->
<DHamburgerButton disabled />

<!-- Custom ARIA label -->
<DHamburgerButton
  :is-open="isOpen"
  aria-label="Toggle main navigation"
  @click="handleClick"
/>

<!-- In a header with navigation -->
<header class="app-header">
  <DHamburgerButton
    :is-open="isMobileMenuOpen"
    @click="toggleMobileMenu"
  />
  <h1>My App</h1>
</header>`
    
    return {
      clickCount,
      mockMenuOpen,
      variantStates,
      animationStates,
      defaultProps,
      sizeOptions,
      usageExample,
      handleClick,
      toggleVariant,
      toggleAnimation,
      toggleAllAnimations,
      toggleMockMenu
    }
  }
}
</script>

<style scoped>
.hamburger-demo {
  min-height: 200px;
}

.demo-container {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  border: 2px solid #000;
  border-radius: 12px;
  background: #F9F8F4;
}

.demo-info {
  flex: 1;
}

.demo-info p {
  margin: 0.5rem 0;
  font-size: 0.875rem;
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

.variant-demo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.variant-demo.centered {
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  padding: 1rem;
}

.variant-demo p {
  margin: 0;
  font-size: 0.875rem;
}

.size-variant {
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.animation-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.animation-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.animation-demo p {
  margin: 0;
  font-size: 0.875rem;
}

.interactive-demo {
  border: 2px solid #000;
  border-radius: 8px;
  overflow: hidden;
  background: #FFFFFF;
}

.mock-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #F9F8F4;
  border-bottom: 2px solid #000;
}

.mock-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #000;
}

.mock-menu {
  background: #FFFFFF;
  border-bottom: 2px solid #000;
}

.mock-menu-item {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #000;
  cursor: pointer;
  transition: background-color 0.15s ease-out;
}

.mock-menu-item:last-child {
  border-bottom: none;
}

.mock-menu-item:hover {
  background: #FFF455;
}

.mock-content {
  padding: 1.5rem;
}

.mock-content p {
  margin: 0.5rem 0;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .demo-container {
    flex-direction: column;
    text-align: center;
  }
  
  .animation-row {
    justify-content: center;
  }
}
</style>