<template>
  <BaseShowcase
    component-name="DDropdown"
    description="Bright dropdown menus with thick shadows, keyboard navigation, and nested menu support"
    :default-props="defaultProps"
    :usage-example="usageExample"
  >
    <template #preview="{ props }">
      <DDropdown
        :items="getItems(props.itemCount)"
        :trigger-text="props.triggerText"
        :variant="props.variant"
        :size="props.size"
        :disabled="props.disabled"
        :position="props.position"
        :close-on-click="props.closeOnClick"
        :backdrop="props.backdrop"
        :max-height="props.maxHeight"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
      />
    </template>

    <template #controls="{ props, updateProp }">
      <PropControl
        label="Variant"
        type="select"
        :model-value="props.variant"
        :options="variantOptions"
        @update:model-value="(value) => updateProp('variant', value)"
      />
      
      <PropControl
        label="Size"
        type="select"
        :model-value="props.size"
        :options="sizeOptions"
        @update:model-value="(value) => updateProp('size', value)"
      />
      
      <PropControl
        label="Position"
        type="select"
        :model-value="props.position"
        :options="positionOptions"
        @update:model-value="(value) => updateProp('position', value)"
      />
      
      <PropControl
        label="Trigger Text"
        type="text"
        :model-value="props.triggerText"
        @update:model-value="(value) => updateProp('triggerText', value)"
      />
      
      <PropControl
        label="Item Count"
        type="number"
        :model-value="props.itemCount"
        :min="1"
        :max="10"
        @update:model-value="(value) => updateProp('itemCount', value)"
      />
      
      <PropControl
        label="Max Height"
        type="text"
        :model-value="props.maxHeight"
        @update:model-value="(value) => updateProp('maxHeight', value)"
      />
      
      <PropControl
        label="Disabled"
        type="boolean"
        :model-value="props.disabled"
        @update:model-value="(value) => updateProp('disabled', value)"
      />
      
      <PropControl
        label="Close on Click"
        type="boolean"
        :model-value="props.closeOnClick"
        @update:model-value="(value) => updateProp('closeOnClick', value)"
      />
      
      <PropControl
        label="Backdrop"
        type="boolean"
        :model-value="props.backdrop"
        @update:model-value="(value) => updateProp('backdrop', value)"
      />
    </template>

    <template #variants>
      <!-- Variant Examples -->
      <div class="variant-card">
        <h4>Variants</h4>
        <div class="dropdown-group">
          <DDropdown
            :items="basicItems"
            trigger-text="Yellow Dropdown"
            variant="yellow"
            @select="handleSelect"
          />
          <DDropdown
            :items="basicItems"
            trigger-text="Pink Dropdown"
            variant="pink"
            @select="handleSelect"
          />
          <DDropdown
            :items="basicItems"
            trigger-text="White Dropdown"
            variant="white"
            @select="handleSelect"
          />
        </div>
      </div>

      <!-- Size Examples -->
      <div class="variant-card">
        <h4>Sizes</h4>
        <div class="dropdown-group">
          <DDropdown
            :items="basicItems"
            trigger-text="Small"
            size="sm"
            @select="handleSelect"
          />
          <DDropdown
            :items="basicItems"
            trigger-text="Medium"
            size="md"
            @select="handleSelect"
          />
          <DDropdown
            :items="basicItems"
            trigger-text="Large"
            size="lg"
            @select="handleSelect"
          />
        </div>
      </div>

      <!-- Position Examples -->
      <div class="variant-card">
        <h4>Positions</h4>
        <div class="position-grid">
          <DDropdown
            :items="basicItems"
            trigger-text="Bottom Start"
            position="bottom-start"
            @select="handleSelect"
          />
          <DDropdown
            :items="basicItems"
            trigger-text="Bottom End"
            position="bottom-end"
            @select="handleSelect"
          />
          <DDropdown
            :items="basicItems"
            trigger-text="Top Start"
            position="top-start"
            @select="handleSelect"
          />
          <DDropdown
            :items="basicItems"
            trigger-text="Top End"
            position="top-end"
            @select="handleSelect"
          />
        </div>
      </div>

      <!-- Advanced Features -->
      <div class="variant-card">
        <h4>Advanced Features</h4>
        <div class="dropdown-group">
          <DDropdown
            :items="itemsWithIcons"
            trigger-text="With Icons"
            variant="yellow"
            @select="handleSelect"
          />
          <DDropdown
            :items="itemsWithBadges"
            trigger-text="With Badges"
            variant="pink"
            @select="handleSelect"
          />
          <DDropdown
            :items="nestedItems"
            trigger-text="Nested Menu"
            variant="white"
            @select="handleSelect"
          />
        </div>
      </div>

      <!-- State Examples -->
      <div class="variant-card">
        <h4>States</h4>
        <div class="dropdown-group">
          <DDropdown
            :items="basicItems"
            trigger-text="Normal"
            @select="handleSelect"
          />
          <DDropdown
            :items="basicItems"
            trigger-text="Disabled"
            disabled
            @select="handleSelect"
          />
          <DDropdown
            :items="longItems"
            trigger-text="Scrollable"
            max-height="200px"
            @select="handleSelect"
          />
        </div>
      </div>

      <!-- Custom Trigger Example -->
      <div class="variant-card">
        <h4>Custom Trigger</h4>
        <div class="dropdown-group">
          <DDropdown
            :items="basicItems"
            variant="yellow"
            @select="handleSelect"
          >
            <template #trigger="{ isOpen, toggle }">
              <DButton
                :variant="isOpen ? 'accent-pink' : 'primary'"
                @click="toggle"
              >
                {{ isOpen ? 'Close Menu' : 'Open Menu' }}
              </DButton>
            </template>
          </DDropdown>
        </div>
      </div>

      <!-- Interactive Demo -->
      <div class="variant-card">
        <h4>Interactive Demo</h4>
        <div class="dropdown-group">
          <DDropdown
            :items="actionItems"
            trigger-text="Actions Menu"
            variant="yellow"
            @select="handleActionSelect"
          />
        </div>
        <div v-if="lastAction" class="action-feedback">
          Last action: <strong>{{ lastAction }}</strong>
        </div>
      </div>
    </template>
  </BaseShowcase>
</template>

<script>
import { ref } from 'vue'
import BaseShowcase from './BaseShowcase.vue'
import PropControl from './PropControl.vue'
import DDropdown from '../../src/components/DDropdown.vue'
import DButton from '../../src/components/DButton.vue'

export default {
  name: 'DDropdownShowcase',
  components: {
    BaseShowcase,
    PropControl,
    DDropdown,
    DButton
  },
  setup() {
    const lastAction = ref('')
    
    const defaultProps = {
      variant: 'yellow',
      size: 'md',
      position: 'bottom-start',
      triggerText: 'Dropdown Menu',
      itemCount: 4,
      maxHeight: '300px',
      disabled: false,
      closeOnClick: true,
      backdrop: true
    }
    
    const variantOptions = [
      { label: 'Yellow', value: 'yellow' },
      { label: 'Pink', value: 'pink' },
      { label: 'White', value: 'white' }
    ]
    
    const sizeOptions = [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' }
    ]
    
    const positionOptions = [
      { label: 'Bottom Start', value: 'bottom-start' },
      { label: 'Bottom End', value: 'bottom-end' },
      { label: 'Top Start', value: 'top-start' },
      { label: 'Top End', value: 'top-end' },
      { label: 'Left Start', value: 'left-start' },
      { label: 'Left End', value: 'left-end' },
      { label: 'Right Start', value: 'right-start' },
      { label: 'Right End', value: 'right-end' }
    ]
    
    const basicItems = [
      { label: 'Profile', key: 'profile' },
      { label: 'Settings', key: 'settings' },
      { label: 'Help', key: 'help' },
      { label: 'Sign Out', key: 'signout' }
    ]
    
    const itemsWithIcons = [
      { 
        label: 'Profile', 
        key: 'profile',
        icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>'
      },
      { 
        label: 'Settings', 
        key: 'settings',
        icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>'
      },
      { 
        label: 'Help', 
        key: 'help',
        icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M13,19h-2v-2h2V19z M15.07,11.25l-0.9,0.92 C13.45,12.9,13,13.5,13,15h-2v-0.5c0-1.1,0.45-2.1,1.17-2.83l1.24-1.26c0.37-0.36,0.59-0.86,0.59-1.41c0-1.1-0.9-2-2-2 s-2,0.9-2,2H8c0-2.21,1.79-4,4-4s4,1.79,4,4C16,9.89,15.64,10.67,15.07,11.25z"/></svg>'
      },
      { 
        label: 'Sign Out', 
        key: 'signout',
        icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17,7l-1.41,1.41L18.17,11H8v2h10.17l-2.58,2.58L17,17l5-5L17,7z M4,5h8V3H4C2.9,3,2,3.9,2,5v14c0,1.1,0.9,2,2,2h8v-2H4V5z"/></svg>'
      }
    ]
    
    const itemsWithBadges = [
      { label: 'Messages', key: 'messages', badge: '3' },
      { label: 'Notifications', key: 'notifications', badge: 'New' },
      { label: 'Updates', key: 'updates', badge: '!' },
      { label: 'Profile', key: 'profile' }
    ]
    
    const nestedItems = [
      { label: 'File', key: 'file', children: [
        { label: 'New', key: 'new' },
        { label: 'Open', key: 'open' },
        { label: 'Save', key: 'save' },
        { label: 'Export', key: 'export', children: [
          { label: 'PDF', key: 'pdf' },
          { label: 'PNG', key: 'png' },
          { label: 'SVG', key: 'svg' }
        ]}
      ]},
      { label: 'Edit', key: 'edit', children: [
        { label: 'Copy', key: 'copy' },
        { label: 'Paste', key: 'paste' },
        { label: 'Delete', key: 'delete' }
      ]},
      { label: 'View', key: 'view' },
      { label: 'Help', key: 'help' }
    ]
    
    const longItems = Array.from({ length: 15 }, (_, i) => ({
      label: `Item ${i + 1}`,
      key: `item-${i + 1}`,
      description: `Description for item ${i + 1}`
    }))
    
    const actionItems = [
      { label: 'Create New', key: 'create', onClick: () => lastAction.value = 'Create New' },
      { label: 'Edit Selected', key: 'edit', onClick: () => lastAction.value = 'Edit Selected' },
      { label: 'Delete', key: 'delete', onClick: () => lastAction.value = 'Delete' },
      { label: 'Share', key: 'share', onClick: () => lastAction.value = 'Share' }
    ]
    
    const getItems = (count) => {
      return Array.from({ length: count }, (_, i) => ({
        label: `Option ${i + 1}`,
        key: `option-${i + 1}`,
        description: i % 2 === 0 ? `Description for option ${i + 1}` : undefined
      }))
    }
    
    const usageExample = `<!-- Basic dropdown -->
<DDropdown
  :items="items"
  trigger-text="Menu"
  variant="yellow"
  @select="handleSelect"
/>

<!-- Different variants -->
<DDropdown :items="items" variant="yellow" />
<DDropdown :items="items" variant="pink" />
<DDropdown :items="items" variant="white" />

<!-- Different sizes -->
<DDropdown :items="items" size="sm" />
<DDropdown :items="items" size="md" />
<DDropdown :items="items" size="lg" />

<!-- Different positions -->
<DDropdown :items="items" position="bottom-start" />
<DDropdown :items="items" position="top-end" />
<DDropdown :items="items" position="right-start" />

<!-- With custom trigger -->
<DDropdown :items="items">
  <template #trigger="{ isOpen, toggle }">
    <DButton @click="toggle">
      {{ isOpen ? 'Close' : 'Open' }}
    </DButton>
  </template>
</DDropdown>

<!-- Items with icons and badges -->
<DDropdown :items="[
  { 
    label: 'Profile', 
    icon: '<svg>...</svg>',
    badge: 'New'
  },
  { 
    label: 'Settings',
    children: [
      { label: 'General' },
      { label: 'Privacy' }
    ]
  }
]" />

<!-- Event handling -->
<DDropdown
  :items="items"
  @open="onOpen"
  @close="onClose"
  @select="onSelect"
/>`
    
    const handleOpen = () => {
      console.log('Dropdown opened')
    }
    
    const handleClose = () => {
      console.log('Dropdown closed')
    }
    
    const handleSelect = (item, index) => {
      console.log('Selected:', item, 'at index:', index)
    }
    
    const handleActionSelect = (item, index) => {
      if (item.onClick) {
        item.onClick()
      }
      console.log('Action selected:', item, 'at index:', index)
    }
    
    return {
      defaultProps,
      variantOptions,
      sizeOptions,
      positionOptions,
      basicItems,
      itemsWithIcons,
      itemsWithBadges,
      nestedItems,
      longItems,
      actionItems,
      lastAction,
      getItems,
      usageExample,
      handleOpen,
      handleClose,
      handleSelect,
      handleActionSelect
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

.variant-card h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 1rem;
}

.dropdown-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-start;
}

.position-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  align-items: start;
}

.action-feedback {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: #FFF455;
  border: 2px solid #000;
  border-radius: 8px;
  font-weight: 600;
  color: #000;
  text-align: center;
}

@media (max-width: 768px) {
  .dropdown-group,
  .position-grid {
    flex-direction: column;
    grid-template-columns: 1fr;
    align-items: stretch;
  }
}
</style>