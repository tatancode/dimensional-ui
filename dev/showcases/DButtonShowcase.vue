<template>
  <BaseShowcase
    component-name="DButton"
    description="Sticker-style buttons with playful dimensional effects and interactive shadow animations"
    :default-props="defaultProps"
    :usage-example="usageExample"
  >
    <template #preview="{ props }">
      <DButton
        :variant="props.variant"
        :size="props.size"
        :disabled="props.disabled"
        :loading="props.loading"
        :full-width="props.fullWidth"
        @click="handleClick"
      >
        {{ props.text }}
      </DButton>
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
        label="Text"
        type="text"
        :model-value="props.text"
        @update:model-value="(value) => updateProp('text', value)"
      />
      
      <PropControl
        label="Disabled"
        type="boolean"
        :model-value="props.disabled"
        @update:model-value="(value) => updateProp('disabled', value)"
      />
      
      <PropControl
        label="Loading"
        type="boolean"
        :model-value="props.loading"
        @update:model-value="(value) => updateProp('loading', value)"
      />
      
      <PropControl
        label="Full Width"
        type="boolean"
        :model-value="props.fullWidth"
        @update:model-value="(value) => updateProp('fullWidth', value)"
      />
    </template>

    <template #variants>
      <!-- Variant Examples -->
      <div class="variant-card">
        <h4>Variants</h4>
        <div class="button-group">
          <DButton variant="primary">Primary</DButton>
          <DButton variant="secondary">Secondary</DButton>
          <DButton variant="accent-yellow">Yellow</DButton>
          <DButton variant="accent-pink">Pink</DButton>
        </div>
      </div>

      <!-- Size Examples -->
      <div class="variant-card">
        <h4>Sizes</h4>
        <div class="button-group">
          <DButton size="sm">Small</DButton>
          <DButton size="md">Medium</DButton>
          <DButton size="lg">Large</DButton>
        </div>
      </div>

      <!-- State Examples -->
      <div class="variant-card">
        <h4>States</h4>
        <div class="button-group">
          <DButton>Normal</DButton>
          <DButton disabled>Disabled</DButton>
          <DButton loading>Loading</DButton>
        </div>
      </div>

      <!-- Interactive Demo -->
      <div class="variant-card">
        <h4>Interactive Demo</h4>
        <div class="button-group">
          <DButton variant="primary" @click="showClickFeedback">
            Click Me!
          </DButton>
          <DButton variant="accent-yellow" full-width>
            Full Width Button
          </DButton>
        </div>
        <p v-if="clickCount > 0" class="click-feedback">
          Button clicked {{ clickCount }} times!
        </p>
      </div>

      <!-- All Variant Combinations -->
      <div class="variant-card full-width">
        <h4>All Combinations</h4>
        <div class="combinations-grid">
          <div v-for="variant in variants" :key="variant" class="combination-row">
            <h5>{{ variant.charAt(0).toUpperCase() + variant.slice(1) }}</h5>
            <div class="size-row">
              <DButton :variant="variant" size="sm">Small</DButton>
              <DButton :variant="variant" size="md">Medium</DButton>
              <DButton :variant="variant" size="lg">Large</DButton>
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
import DButton from '../../src/components/DButton.vue'

export default {
  name: 'DButtonShowcase',
  components: {
    BaseShowcase,
    PropControl,
    DButton
  },
  setup() {
    const clickCount = ref(0)
    
    const defaultProps = {
      variant: 'primary',
      size: 'md',
      text: 'Click me!',
      disabled: false,
      loading: false,
      fullWidth: false
    }
    
    const variantOptions = [
      { label: 'Primary', value: 'primary' },
      { label: 'Secondary', value: 'secondary' },
      { label: 'Accent Yellow', value: 'accent-yellow' },
      { label: 'Accent Pink', value: 'accent-pink' }
    ]
    
    const sizeOptions = [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' }
    ]
    
    const variants = ['primary', 'secondary', 'accent-yellow', 'accent-pink']
    
    const usageExample = `<!-- Basic usage -->
<DButton variant="primary" @click="handleClick">
  Click me!
</DButton>

<!-- Different variants -->
<DButton variant="secondary">Secondary</DButton>
<DButton variant="accent-yellow">Yellow</DButton>
<DButton variant="accent-pink">Pink</DButton>

<!-- Different sizes -->
<DButton size="sm">Small</DButton>
<DButton size="md">Medium</DButton>
<DButton size="lg">Large</DButton>

<!-- States -->
<DButton disabled>Disabled</DButton>
<DButton loading>Loading</DButton>
<DButton full-width>Full Width</DButton>

<!-- With custom content -->
<DButton variant="primary">
  <Icon name="plus" />
  Add Item
</DButton>`
    
    const handleClick = () => {
      console.log('Button clicked!')
    }
    
    const showClickFeedback = () => {
      clickCount.value++
    }
    
    return {
      defaultProps,
      variantOptions,
      sizeOptions,
      variants,
      usageExample,
      clickCount,
      handleClick,
      showClickFeedback
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
  text-transform: capitalize;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.combinations-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.combination-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.size-row {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.click-feedback {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #FFF455;
  border: 2px solid #000;
  border-radius: 8px;
  font-weight: 600;
  color: #000;
  text-align: center;
}

@media (max-width: 768px) {
  .button-group,
  .size-row {
    flex-direction: column;
    align-items: stretch;
  }
  
  .combinations-grid {
    gap: 1rem;
  }
}
</style>