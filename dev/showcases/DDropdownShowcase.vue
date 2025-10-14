<template>
  <BaseShowcase
    component-name="DDropdown"
    description="Bright dropdown menus with thick shadows and keyboard navigation"
    :default-props="defaultProps"
    :usage-example="usageExample"
  >
    <template #preview="{ props }">
      <div class="dropdown-preview">
        <div class="demo-dropdown-container">
          <button 
            class="demo-dropdown-trigger"
            @click="toggleDropdown"
            :class="{ active: isOpen }"
          >
            {{ props.trigger || 'Open Dropdown' }}
            <span class="dropdown-arrow" :class="{ rotated: isOpen }">▼</span>
          </button>
          
          <div 
            v-if="isOpen" 
            class="demo-dropdown-menu"
            :class="`demo-dropdown--${props.position}`"
          >
            <div 
              v-for="(item, index) in props.items" 
              :key="index"
              class="demo-dropdown-item"
              :class="{ 'demo-dropdown-item--disabled': item.disabled }"
            >
              {{ item.label }}
              <div v-if="item.children" class="demo-nested-dropdown">
                <div 
                  v-for="child in item.children" 
                  :key="child.label"
                  class="demo-dropdown-item"
                >
                  {{ child.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #controls="{ props, updateProp }">
      <PropControl
        label="Trigger Text"
        type="text"
        :model-value="props.trigger"
        @update:model-value="updateProp('trigger', $event)"
        placeholder="Button text"
      />
      
      <PropControl
        label="Position"
        type="select"
        :model-value="props.position"
        @update:model-value="updateProp('position', $event)"
        :options="positionOptions"
      />
      
      <div class="dropdown-items-control">
        <label class="prop-label">Dropdown Items</label>
        <div v-for="(item, index) in props.items" :key="index" class="dropdown-item-control">
          <input 
            v-model="item.label" 
            class="prop-input"
            placeholder="Item label"
          />
          <label class="toggle-container">
            <input type="checkbox" v-model="item.disabled" class="toggle-input" />
            <span class="toggle-slider"></span>
            <span class="toggle-label">Disabled</span>
          </label>
        </div>
      </div>
    </template>

    <template #variants>
      <div class="variant-card">
        <h4>Standard Dropdown</h4>
        <div class="variant-demo">
          <button class="demo-dropdown-trigger">Actions ▼</button>
          <div class="demo-dropdown-menu demo-dropdown--bottom-left static-dropdown">
            <div class="demo-dropdown-item">Edit</div>
            <div class="demo-dropdown-item">Delete</div>
            <div class="demo-dropdown-item">Share</div>
          </div>
        </div>
      </div>

      <div class="variant-card">
        <h4>With Nested Items</h4>
        <div class="variant-demo">
          <button class="demo-dropdown-trigger">More Options ▼</button>
          <div class="demo-dropdown-menu demo-dropdown--bottom-left static-dropdown">
            <div class="demo-dropdown-item">
              Export
              <div class="demo-nested-dropdown">
                <div class="demo-dropdown-item">PDF</div>
                <div class="demo-dropdown-item">CSV</div>
                <div class="demo-dropdown-item">JSON</div>
              </div>
            </div>
            <div class="demo-dropdown-item">Settings</div>
          </div>
        </div>
      </div>

      <div class="variant-card">
        <h4>Different Positions</h4>
        <div class="variant-demo">
          <div class="position-grid">
            <div class="position-demo">
              <span>Top Left</span>
              <div class="demo-dropdown-menu demo-dropdown--top-left static-dropdown small">
                <div class="demo-dropdown-item">Item 1</div>
                <div class="demo-dropdown-item">Item 2</div>
              </div>
            </div>
            <div class="position-demo">
              <span>Bottom Right</span>
              <div class="demo-dropdown-menu demo-dropdown--bottom-right static-dropdown small">
                <div class="demo-dropdown-item">Item 1</div>
                <div class="demo-dropdown-item">Item 2</div>
              </div>
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

export default {
  name: 'DDropdownShowcase',
  components: {
    BaseShowcase,
    PropControl
  },
  setup() {
    const isOpen = ref(false)
    
    const defaultProps = {
      trigger: 'Open Menu',
      position: 'bottom-left',
      items: [
        { label: 'Edit Profile', disabled: false },
        { label: 'Settings', disabled: false },
        { label: 'Export Data', disabled: false, children: [
          { label: 'PDF' },
          { label: 'CSV' },
          { label: 'JSON' }
        ]},
        { label: 'Delete Account', disabled: true }
      ]
    }

    const positionOptions = [
      { value: 'top-left', label: 'Top Left' },
      { value: 'top-right', label: 'Top Right' },
      { value: 'bottom-left', label: 'Bottom Left' },
      { value: 'bottom-right', label: 'Bottom Right' }
    ]

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
    }

    const usageExample = `<template>
  <DDropdown 
    trigger="User Menu"
    position="bottom-right"
    :items="menuItems"
    @select="handleSelection"
  />
</template>

<script>
import { DDropdown } from 'dimensional-ui'

export default {
  components: { DDropdown },
  data() {
    return {
      menuItems: [
        { label: 'Profile', value: 'profile' },
        { label: 'Settings', value: 'settings' },
        { 
          label: 'Export', 
          children: [
            { label: 'PDF', value: 'export-pdf' },
            { label: 'CSV', value: 'export-csv' }
          ]
        },
        { label: 'Logout', value: 'logout' }
      ]
    }
  },
  methods: {
    handleSelection(item) {
      console.log('Selected:', item)
    }
  }
}
<\/script>`

    return {
      defaultProps,
      positionOptions,
      usageExample,
      isOpen,
      toggleDropdown
    }
  }
}
</script>

<style scoped>
.dropdown-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  position: relative;
}

.demo-dropdown-container {
  position: relative;
}

.demo-dropdown-trigger {
  background: white;
  border: 2px solid #000;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 3px 3px 0 #000;
  transition: all 0.1s ease;
}

.demo-dropdown-trigger:hover {
  box-shadow: 2px 2px 0 #000;
  transform: translate(1px, 1px);
}

.demo-dropdown-trigger.active {
  background: #FFF455;
}

.dropdown-arrow {
  transition: transform 0.2s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.demo-dropdown-menu {
  position: absolute;
  background: #FFF455;
  border: 2px solid #000;
  border-radius: 12px;
  box-shadow: 4px 4px 0 #000;
  padding: 0.5rem 0;
  min-width: 200px;
  z-index: 1000;
}

.demo-dropdown--top-left {
  bottom: 100%;
  left: 0;
  margin-bottom: 0.5rem;
}

.demo-dropdown--top-right {
  bottom: 100%;
  right: 0;
  margin-bottom: 0.5rem;
}

.demo-dropdown--bottom-left {
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
}

.demo-dropdown--bottom-right {
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
}

.demo-dropdown-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-weight: 600;
  color: #000;
  position: relative;
  transition: background-color 0.1s ease;
}

.demo-dropdown-item:hover:not(.demo-dropdown-item--disabled) {
  background: rgba(0, 0, 0, 0.1);
}

.demo-dropdown-item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.demo-nested-dropdown {
  position: absolute;
  left: 100%;
  top: 0;
  background: #FF004D;
  border: 2px solid #000;
  border-radius: 8px;
  box-shadow: 3px 3px 0 #000;
  padding: 0.25rem 0;
  min-width: 120px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
}

.demo-dropdown-item:hover .demo-nested-dropdown {
  opacity: 1;
  visibility: visible;
}

.demo-nested-dropdown .demo-dropdown-item {
  color: white;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
}

.demo-nested-dropdown .demo-dropdown-item:hover {
  background: rgba(255, 255, 255, 0.2);
}

.static-dropdown {
  position: static !important;
  margin: 0.5rem 0 !important;
  display: block !important;
}

.static-dropdown.small {
  min-width: 120px;
  transform: scale(0.8);
}

.dropdown-items-control {
  margin-bottom: 1rem;
}

.dropdown-item-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.dropdown-item-control .prop-input {
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

.variant-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.position-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
}

.position-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.position-demo span {
  font-size: 0.8rem;
  font-weight: 600;
  color: #666;
}
</style>