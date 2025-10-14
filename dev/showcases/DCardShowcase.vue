<template>
  <BaseShowcase
    component-name="DCard"
    description="Content cards with consistent shadow styling and dimensional effects for organizing information"
    :default-props="defaultProps"
    :usage-example="usageExample"
  >
    <template #preview="{ props }">
      <DCard
        :variant="props.variant"
        :size="props.size"
        :title="props.title"
        :interactive="props.interactive"
        :bordered="props.bordered"
        :shadow-size="props.shadowSize"
        @click="handleCardClick"
      >
        <p>{{ props.content }}</p>
        
        <template v-if="props.showFooter" #footer>
          <div style="display: flex; gap: 0.5rem;">
            <DButton size="sm" variant="primary">Action</DButton>
            <DButton size="sm" variant="secondary">Cancel</DButton>
          </div>
        </template>
      </DCard>
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
        label="Title"
        type="text"
        :model-value="props.title"
        @update:model-value="(value) => updateProp('title', value)"
      />
      
      <PropControl
        label="Content"
        type="textarea"
        :model-value="props.content"
        @update:model-value="(value) => updateProp('content', value)"
      />
      
      <PropControl
        label="Interactive"
        type="boolean"
        :model-value="props.interactive"
        @update:model-value="(value) => updateProp('interactive', value)"
      />
      
      <PropControl
        label="Bordered"
        type="boolean"
        :model-value="props.bordered"
        @update:model-value="(value) => updateProp('bordered', value)"
      />
      
      <PropControl
        label="Show Footer"
        type="boolean"
        :model-value="props.showFooter"
        @update:model-value="(value) => updateProp('showFooter', value)"
      />
      
      <PropControl
        label="Shadow Size"
        type="select"
        :model-value="props.shadowSize"
        :options="shadowSizeOptions"
        @update:model-value="(value) => updateProp('shadowSize', value)"
      />
    </template>

    <template #variants>
      <!-- Variant Examples -->
      <div class="variant-card">
        <h4>Variants</h4>
        <div class="card-grid">
          <DCard variant="default" title="Default Card">
            <p>This is a default card with white background and black border.</p>
          </DCard>
          <DCard variant="accent-yellow" title="Yellow Card">
            <p>This is a bright yellow card perfect for highlighting important content.</p>
          </DCard>
          <DCard variant="accent-pink" title="Pink Card">
            <p>This is a pink card with white text for high contrast content.</p>
          </DCard>
          <DCard variant="secondary" title="Secondary Card">
            <p>This is a secondary card with cream background for subtle content.</p>
          </DCard>
        </div>
      </div>

      <!-- Size Examples -->
      <div class="variant-card">
        <h4>Sizes</h4>
        <div class="card-grid">
          <DCard size="sm" title="Small Card">
            <p>Compact card with minimal padding.</p>
          </DCard>
          <DCard size="md" title="Medium Card">
            <p>Standard card size with balanced padding and spacing.</p>
          </DCard>
          <DCard size="lg" title="Large Card">
            <p>Spacious card with generous padding for detailed content.</p>
          </DCard>
        </div>
      </div>

      <!-- Interactive Examples -->
      <div class="variant-card">
        <h4>Interactive Cards</h4>
        <div class="card-grid">
          <DCard interactive title="Clickable Card" @click="showClickFeedback">
            <p>This card responds to hover and click interactions with shadow effects.</p>
          </DCard>
          <DCard title="Static Card">
            <p>This card has no interactive effects and maintains a consistent shadow.</p>
          </DCard>
        </div>
        <p v-if="clickCount > 0" class="click-feedback">
          Interactive card clicked {{ clickCount }} times!
        </p>
      </div>

      <!-- Content Structure Examples -->
      <div class="variant-card full-width">
        <h4>Content Structure</h4>
        <div class="card-grid content-structure-grid">
          <!-- Header and Footer -->
          <DCard variant="default">
            <template #header>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0;">Custom Header</h3>
                <DButton size="sm" variant="secondary">Edit</DButton>
              </div>
            </template>
            <p>This card uses custom header and footer slots for complex layouts.</p>
            <template #footer>
              <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                <DButton size="sm" variant="primary">Save</DButton>
                <DButton size="sm" variant="secondary">Cancel</DButton>
              </div>
            </template>
          </DCard>

          <!-- Title Only -->
          <DCard title="Simple Title Card" variant="accent-yellow">
            <p>This card uses the title prop for a simple header.</p>
            <ul>
              <li>Easy to use</li>
              <li>Consistent styling</li>
              <li>Accessible markup</li>
            </ul>
          </DCard>

          <!-- Content Only -->
          <DCard variant="secondary">
            <h3 style="margin-top: 0;">Content Only</h3>
            <p>This card has no header or footer, just content in the main area.</p>
            <p>Perfect for simple content blocks or when you need full control over the layout.</p>
          </DCard>
        </div>
      </div>

      <!-- Shadow Variations -->
      <div class="variant-card">
        <h4>Shadow Sizes</h4>
        <div class="card-grid">
          <DCard shadow-size="sm" title="Small Shadow">
            <p>Subtle shadow for minimal depth.</p>
          </DCard>
          <DCard shadow-size="md" title="Medium Shadow">
            <p>Standard shadow for balanced depth.</p>
          </DCard>
          <DCard shadow-size="lg" title="Large Shadow">
            <p>Prominent shadow for maximum depth.</p>
          </DCard>
        </div>
      </div>

      <!-- Border Variations -->
      <div class="variant-card">
        <h4>Border Options</h4>
        <div class="card-grid">
          <DCard :bordered="true" title="With Border">
            <p>Card with thick black border for definition.</p>
          </DCard>
          <DCard :bordered="false" title="Without Border">
            <p>Card without border for a cleaner look.</p>
          </DCard>
        </div>
      </div>
    </template>
  </BaseShowcase>
</template>

<script>
import { ref } from 'vue'
import BaseShowcase from './BaseShowcase.vue'
import PropControl from './PropControl.vue'
import DCard from '../../src/components/DCard.vue'
import DButton from '../../src/components/DButton.vue'

export default {
  name: 'DCardShowcase',
  components: {
    BaseShowcase,
    PropControl,
    DCard,
    DButton
  },
  setup() {
    const clickCount = ref(0)
    
    const defaultProps = {
      variant: 'default',
      size: 'md',
      title: 'Sample Card',
      content: 'This is a sample card with some content to demonstrate the card component styling and layout.',
      interactive: false,
      bordered: true,
      showFooter: false,
      shadowSize: null
    }
    
    const variantOptions = [
      { label: 'Default', value: 'default' },
      { label: 'Accent Yellow', value: 'accent-yellow' },
      { label: 'Accent Pink', value: 'accent-pink' },
      { label: 'Secondary', value: 'secondary' }
    ]
    
    const sizeOptions = [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' }
    ]
    
    const shadowSizeOptions = [
      { label: 'Auto (based on size)', value: null },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' }
    ]
    
    const usageExample = `<!-- Basic usage -->
<DCard title="Card Title">
  <p>Card content goes here.</p>
</DCard>

<!-- Different variants -->
<DCard variant="accent-yellow" title="Highlighted Card">
  <p>Important content with bright background.</p>
</DCard>

<!-- Interactive card -->
<DCard interactive title="Clickable Card" @click="handleClick">
  <p>This card responds to interactions.</p>
</DCard>

<!-- Custom header and footer -->
<DCard>
  <template #header>
    <h3>Custom Header</h3>
  </template>
  
  <p>Main content area.</p>
  
  <template #footer>
    <DButton>Action</DButton>
  </template>
</DCard>

<!-- Different sizes -->
<DCard size="sm" title="Small Card">
  <p>Compact card.</p>
</DCard>

<!-- Without border -->
<DCard :bordered="false" title="Borderless">
  <p>Clean card without border.</p>
</DCard>`
    
    const handleCardClick = () => {
      console.log('Card clicked!')
    }
    
    const showClickFeedback = () => {
      clickCount.value++
    }
    
    return {
      defaultProps,
      variantOptions,
      sizeOptions,
      shadowSizeOptions,
      usageExample,
      clickCount,
      handleCardClick,
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
  overflow: hidden;
  min-width: 0; /* Allows flex items to shrink below content size */
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

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  align-items: start;
}

/* Specific grid adjustments for different sections */
.variant-card:has(.card-grid) .card-grid {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

/* For content structure section with complex cards */
.content-structure-grid {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
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
  .card-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media (max-width: 900px) {
  .content-structure-grid {
    grid-template-columns: 1fr !important;
  }
}

@media (max-width: 640px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
  
  .variant-card {
    padding: 1rem;
  }
}
</style>