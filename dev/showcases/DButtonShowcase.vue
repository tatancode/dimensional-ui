<template>
  <BaseShowcase
    component-name="DButton"
    description="Sticker-style buttons with bold shadows and interactive states"
    :default-props="defaultProps"
    :usage-example="usageExample"
  >
    <template #preview="{ props }">
      <div class="button-preview">
        <!-- Placeholder button until DButton is implemented -->
        <button 
          :class="[
            'demo-button',
            `demo-button--${props.variant}`,
            `demo-button--${props.size}`,
            { 'demo-button--disabled': props.disabled }
          ]"
          :disabled="props.disabled"
        >
          {{ props.children || 'Button Text' }}
        </button>
      </div>
    </template>

    <template #controls="{ props, updateProp }">
      <PropControl
        label="Variant"
        type="select"
        :model-value="props.variant"
        @update:model-value="updateProp('variant', $event)"
        :options="variantOptions"
      />
      
      <PropControl
        label="Size"
        type="select"
        :model-value="props.size"
        @update:model-value="updateProp('size', $event)"
        :options="sizeOptions"
      />
      
      <PropControl
        label="Button Text"
        type="text"
        :model-value="props.children"
        @update:model-value="updateProp('children', $event)"
        placeholder="Enter button text"
      />
      
      <PropControl
        label="Disabled"
        type="boolean"
        :model-value="props.disabled"
        @update:model-value="updateProp('disabled', $event)"
      />
      
      <PropControl
        label="Full Width"
        type="boolean"
        :model-value="props.fullWidth"
        @update:model-value="updateProp('fullWidth', $event)"
      />
    </template>

    <template #variants>
      <div class="variant-card" v-for="variant in variants" :key="variant.name">
        <h4>{{ variant.name }}</h4>
        <div class="variant-preview">
          <button 
            v-for="size in sizes" 
            :key="size"
            :class="[
              'demo-button',
              `demo-button--${variant.value}`,
              `demo-button--${size}`
            ]"
          >
            {{ size.toUpperCase() }}
          </button>
        </div>
      </div>
    </template>
  </BaseShowcase>
</template>

<script>
import BaseShowcase from './BaseShowcase.vue'
import PropControl from './PropControl.vue'

export default {
  name: 'DButtonShowcase',
  components: {
    BaseShowcase,
    PropControl
  },
  setup() {
    const defaultProps = {
      variant: 'primary',
      size: 'md',
      children: 'Click me!',
      disabled: false,
      fullWidth: false
    }

    const variantOptions = [
      { value: 'primary', label: 'Primary' },
      { value: 'secondary', label: 'Secondary' },
      { value: 'accent-yellow', label: 'Accent Yellow' },
      { value: 'accent-pink', label: 'Accent Pink' }
    ]

    const sizeOptions = [
      { value: 'sm', label: 'Small' },
      { value: 'md', label: 'Medium' },
      { value: 'lg', label: 'Large' }
    ]

    const variants = [
      { name: 'Primary', value: 'primary' },
      { name: 'Secondary', value: 'secondary' },
      { name: 'Accent Yellow', value: 'accent-yellow' },
      { name: 'Accent Pink', value: 'accent-pink' }
    ]

    const sizes = ['sm', 'md', 'lg']

    const usageExample = `<template>
  <DButton 
    variant="primary" 
    size="md" 
    @click="handleClick"
  >
    Click me!
  </DButton>
</template>

<script>
import { DButton } from 'dimensional-ui'

export default {
  components: { DButton },
  methods: {
    handleClick() {
      console.log('Button clicked!')
    }
  }
}
<\/script>`

    return {
      defaultProps,
      variantOptions,
      sizeOptions,
      variants,
      sizes,
      usageExample
    }
  }
}
</script>

<style scoped>
.button-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.demo-button {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  border: 2px solid #000;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.1s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Size variants */
.demo-button--sm {
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  box-shadow: 2px 2px 0 #000;
}

.demo-button--md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  box-shadow: 3px 3px 0 #000;
}

.demo-button--lg {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  box-shadow: 4px 4px 0 #000;
}

/* Color variants */
.demo-button--primary {
  background: #FF004D;
  color: white;
}

.demo-button--secondary {
  background: white;
  color: #000;
}

.demo-button--accent-yellow {
  background: #FFF455;
  color: #000;
}

.demo-button--accent-pink {
  background: #FF004D;
  color: white;
}

/* Hover states */
.demo-button:hover:not(:disabled) {
  transform: translate(1px, 1px);
}

.demo-button--sm:hover:not(:disabled) {
  box-shadow: 1px 1px 0 #000;
}

.demo-button--md:hover:not(:disabled) {
  box-shadow: 2px 2px 0 #000;
}

.demo-button--lg:hover:not(:disabled) {
  box-shadow: 3px 3px 0 #000;
}

/* Active states */
.demo-button:active:not(:disabled) {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 #000;
}

/* Disabled state */
.demo-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
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

.variant-preview {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}
</style>