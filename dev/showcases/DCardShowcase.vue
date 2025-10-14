<template>
  <BaseShowcase
    component-name="DCard"
    description="Content cards with consistent shadow styling and flexible content areas"
    :default-props="defaultProps"
    :usage-example="usageExample"
  >
    <template #preview="{ props }">
      <div class="card-preview">
        <div 
          class="demo-card"
          :class="[
            `demo-card--${props.variant}`,
            `demo-card--${props.size}`,
            { 'demo-card--hoverable': props.hoverable }
          ]"
        >
          <div v-if="props.title" class="demo-card-header">
            <h3>{{ props.title }}</h3>
          </div>
          <div class="demo-card-content">
            <p>{{ props.content || 'This is the card content area. You can put any content here including text, images, buttons, and other components.' }}</p>
          </div>
          <div v-if="props.showActions" class="demo-card-actions">
            <button class="demo-card-button demo-card-button--primary">Primary</button>
            <button class="demo-card-button demo-card-button--secondary">Secondary</button>
          </div>
        </div>
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
        label="Title"
        type="text"
        :model-value="props.title"
        @update:model-value="updateProp('title', $event)"
        placeholder="Card title"
      />
      
      <PropControl
        label="Content"
        type="text"
        :model-value="props.content"
        @update:model-value="updateProp('content', $event)"
        placeholder="Card content"
      />
      
      <PropControl
        label="Hoverable"
        type="boolean"
        :model-value="props.hoverable"
        @update:model-value="updateProp('hoverable', $event)"
      />
      
      <PropControl
        label="Show Actions"
        type="boolean"
        :model-value="props.showActions"
        @update:model-value="updateProp('showActions', $event)"
      />
    </template>

    <template #variants>
      <div class="variant-card">
        <h4>Default Cards</h4>
        <div class="cards-grid">
          <div class="demo-card demo-card--default demo-card--sm">
            <div class="demo-card-header"><h4>Small Card</h4></div>
            <div class="demo-card-content"><p>Compact content</p></div>
          </div>
          <div class="demo-card demo-card--default demo-card--md">
            <div class="demo-card-header"><h4>Medium Card</h4></div>
            <div class="demo-card-content"><p>Standard content area</p></div>
          </div>
          <div class="demo-card demo-card--default demo-card--lg">
            <div class="demo-card-header"><h4>Large Card</h4></div>
            <div class="demo-card-content"><p>Spacious content area with more room</p></div>
          </div>
        </div>
      </div>

      <div class="variant-card">
        <h4>Accent Cards</h4>
        <div class="cards-grid">
          <div class="demo-card demo-card--accent demo-card--md">
            <div class="demo-card-header"><h4>Accent Card</h4></div>
            <div class="demo-card-content"><p>Highlighted with accent color</p></div>
          </div>
          <div class="demo-card demo-card--minimal demo-card--md">
            <div class="demo-card-header"><h4>Minimal Card</h4></div>
            <div class="demo-card-content"><p>Clean and simple styling</p></div>
          </div>
        </div>
      </div>
    </template>
  </BaseShowcase>
</template>

<script>
import BaseShowcase from './BaseShowcase.vue'
import PropControl from './PropControl.vue'

export default {
  name: 'DCardShowcase',
  components: {
    BaseShowcase,
    PropControl
  },
  setup() {
    const defaultProps = {
      variant: 'default',
      size: 'md',
      title: 'Card Title',
      content: 'This is a sample card with some content to demonstrate the card component.',
      hoverable: true,
      showActions: true
    }

    const variantOptions = [
      { value: 'default', label: 'Default' },
      { value: 'accent', label: 'Accent' },
      { value: 'minimal', label: 'Minimal' }
    ]

    const sizeOptions = [
      { value: 'sm', label: 'Small' },
      { value: 'md', label: 'Medium' },
      { value: 'lg', label: 'Large' }
    ]

    const usageExample = `<template>
  <DCard 
    variant="default"
    size="md"
    title="My Card"
    :hoverable="true"
  >
    <template #content>
      <p>Custom card content goes here</p>
    </template>
    
    <template #actions>
      <DButton variant="primary">Action</DButton>
      <DButton variant="secondary">Cancel</DButton>
    </template>
  </DCard>
</template>

<script>
import { DCard, DButton } from 'dimensional-ui'

export default {
  components: { DCard, DButton }
}
<\/script>`

    return {
      defaultProps,
      variantOptions,
      sizeOptions,
      usageExample
    }
  }
}
</script>

<style scoped>
.card-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.demo-card {
  background: white;
  border: 2px solid #000;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.1s ease;
  max-width: 400px;
  width: 100%;
}

/* Size variants */
.demo-card--sm {
  box-shadow: 2px 2px 0 #000;
}

.demo-card--md {
  box-shadow: 3px 3px 0 #000;
}

.demo-card--lg {
  box-shadow: 4px 4px 0 #000;
}

/* Color variants */
.demo-card--default {
  background: white;
}

.demo-card--accent {
  background: #FFF455;
}

.demo-card--minimal {
  background: #F9F8F4;
  box-shadow: 2px 2px 0 #000;
}

/* Hover effect */
.demo-card--hoverable:hover {
  transform: translate(1px, 1px);
}

.demo-card--hoverable.demo-card--sm:hover {
  box-shadow: 1px 1px 0 #000;
}

.demo-card--hoverable.demo-card--md:hover {
  box-shadow: 2px 2px 0 #000;
}

.demo-card--hoverable.demo-card--lg:hover {
  box-shadow: 3px 3px 0 #000;
}

.demo-card-header {
  padding: 1.5rem 1.5rem 0 1.5rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
}

.demo-card-header h3,
.demo-card-header h4 {
  margin: 0 0 1rem 0;
  font-weight: 700;
  color: #000;
}

.demo-card-content {
  padding: 0 1.5rem 1.5rem 1.5rem;
}

.demo-card-content p {
  margin: 0;
  line-height: 1.6;
  color: #333;
}

.demo-card-actions {
  padding: 0 1.5rem 1.5rem 1.5rem;
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  border-top: 1px solid #eee;
  margin-top: 1rem;
  padding-top: 1rem;
}

.demo-card-button {
  padding: 0.5rem 1rem;
  border: 2px solid #000;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.1s ease;
  box-shadow: 2px 2px 0 #000;
}

.demo-card-button--primary {
  background: #FF004D;
  color: white;
}

.demo-card-button--secondary {
  background: white;
  color: #000;
}

.demo-card-button:hover {
  box-shadow: 1px 1px 0 #000;
  transform: translate(1px, 1px);
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

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.cards-grid .demo-card {
  max-width: none;
  transform: scale(0.8);
}
</style>