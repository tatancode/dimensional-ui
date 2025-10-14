<template>
  <div class="showcase-container">
    <div class="showcase-header">
      <h2>{{ componentName }}</h2>
      <p>{{ description }}</p>
    </div>

    <div class="showcase-content">
      <div class="preview-section">
        <h3>Live Preview</h3>
        <div class="preview-container">
          <slot name="preview" :props="currentProps" />
        </div>
      </div>

      <div class="controls-section">
        <h3>Props & Controls</h3>
        <div class="controls-container">
          <slot name="controls" :props="currentProps" :updateProp="updateProp" />
        </div>
      </div>
    </div>

    <div class="variants-section">
      <h3>Variants & States</h3>
      <div class="variants-grid">
        <slot name="variants" />
      </div>
    </div>

    <div class="code-section">
      <h3>Usage Example</h3>
      <div class="code-container">
        <pre><code>{{ usageExample }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'BaseShowcase',
  props: {
    componentName: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    defaultProps: {
      type: Object,
      default: () => ({})
    },
    usageExample: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const currentProps = ref({ ...props.defaultProps })

    const updateProp = (propName, value) => {
      currentProps.value[propName] = value
    }

    return {
      currentProps,
      updateProp
    }
  }
}
</script>

<style scoped>
.showcase-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.showcase-header {
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 2px solid #000;
}

.showcase-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 0.5rem;
}

.showcase-header p {
  font-size: 1.1rem;
  color: #666;
  font-weight: 600;
}

.showcase-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  align-items: start;
}

@media (max-width: 768px) {
  .showcase-content {
    grid-template-columns: 1fr;
  }
}

.preview-section h3,
.controls-section h3,
.variants-section h3,
.code-section h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 1rem;
}

.preview-container {
  background: #F9F8F4;
  border: 2px solid #000;
  border-radius: 12px;
  padding: 2rem;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.controls-container {
  background: #F9F8F4;
  border: 2px solid #000;
  border-radius: 12px;
  padding: 1.5rem;
}

.variants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.code-container {
  background: #000;
  color: #FFF455;
  border-radius: 12px;
  padding: 1.5rem;
  overflow-x: auto;
}

.code-container pre {
  margin: 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

.code-container code {
  color: #FFF455;
}
</style>