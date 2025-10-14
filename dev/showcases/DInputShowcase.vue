<template>
  <BaseShowcase
    component-name="DInput"
    description="Form inputs with theme-consistent styling and validation states"
    :default-props="defaultProps"
    :usage-example="usageExample"
  >
    <template #preview="{ props }">
      <div class="input-preview">
        <div class="demo-input-container">
          <label v-if="props.label" class="demo-input-label">{{ props.label }}</label>
          <input 
            :type="props.type"
            :placeholder="props.placeholder"
            :disabled="props.disabled"
            :class="[
              'demo-input',
              `demo-input--${props.size}`,
              `demo-input--${props.state}`,
              { 'demo-input--disabled': props.disabled }
            ]"
            :value="props.value"
          />
          <div v-if="props.helpText" class="demo-input-help">{{ props.helpText }}</div>
          <div v-if="props.errorText && props.state === 'error'" class="demo-input-error">{{ props.errorText }}</div>
        </div>
      </div>
    </template>

    <template #controls="{ props, updateProp }">
      <PropControl
        label="Type"
        type="select"
        :model-value="props.type"
        @update:model-value="updateProp('type', $event)"
        :options="typeOptions"
      />
      
      <PropControl
        label="Size"
        type="select"
        :model-value="props.size"
        @update:model-value="updateProp('size', $event)"
        :options="sizeOptions"
      />
      
      <PropControl
        label="State"
        type="select"
        :model-value="props.state"
        @update:model-value="updateProp('state', $event)"
        :options="stateOptions"
      />
      
      <PropControl
        label="Label"
        type="text"
        :model-value="props.label"
        @update:model-value="updateProp('label', $event)"
        placeholder="Input label"
      />
      
      <PropControl
        label="Placeholder"
        type="text"
        :model-value="props.placeholder"
        @update:model-value="updateProp('placeholder', $event)"
        placeholder="Placeholder text"
      />
      
      <PropControl
        label="Value"
        type="text"
        :model-value="props.value"
        @update:model-value="updateProp('value', $event)"
        placeholder="Input value"
      />
      
      <PropControl
        label="Help Text"
        type="text"
        :model-value="props.helpText"
        @update:model-value="updateProp('helpText', $event)"
        placeholder="Help text"
      />
      
      <PropControl
        label="Error Text"
        type="text"
        :model-value="props.errorText"
        @update:model-value="updateProp('errorText', $event)"
        placeholder="Error message"
      />
      
      <PropControl
        label="Disabled"
        type="boolean"
        :model-value="props.disabled"
        @update:model-value="updateProp('disabled', $event)"
      />
    </template>

    <template #variants>
      <div class="variant-card">
        <h4>Input Sizes</h4>
        <div class="inputs-grid">
          <div class="input-demo">
            <label class="demo-input-label">Small</label>
            <input class="demo-input demo-input--sm" placeholder="Small input" />
          </div>
          <div class="input-demo">
            <label class="demo-input-label">Medium</label>
            <input class="demo-input demo-input--md" placeholder="Medium input" />
          </div>
          <div class="input-demo">
            <label class="demo-input-label">Large</label>
            <input class="demo-input demo-input--lg" placeholder="Large input" />
          </div>
        </div>
      </div>

      <div class="variant-card">
        <h4>Input States</h4>
        <div class="inputs-grid">
          <div class="input-demo">
            <label class="demo-input-label">Default</label>
            <input class="demo-input demo-input--md demo-input--default" placeholder="Default state" />
          </div>
          <div class="input-demo">
            <label class="demo-input-label">Success</label>
            <input class="demo-input demo-input--md demo-input--success" placeholder="Success state" value="Valid input" />
            <div class="demo-input-help">✓ Input is valid</div>
          </div>
          <div class="input-demo">
            <label class="demo-input-label">Error</label>
            <input class="demo-input demo-input--md demo-input--error" placeholder="Error state" />
            <div class="demo-input-error">✗ This field is required</div>
          </div>
        </div>
      </div>

      <div class="variant-card">
        <h4>Input Types</h4>
        <div class="inputs-grid">
          <div class="input-demo">
            <label class="demo-input-label">Email</label>
            <input type="email" class="demo-input demo-input--md" placeholder="user@example.com" />
          </div>
          <div class="input-demo">
            <label class="demo-input-label">Password</label>
            <input type="password" class="demo-input demo-input--md" placeholder="••••••••" />
          </div>
          <div class="input-demo">
            <label class="demo-input-label">Number</label>
            <input type="number" class="demo-input demo-input--md" placeholder="123" />
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
  name: 'DInputShowcase',
  components: {
    BaseShowcase,
    PropControl
  },
  setup() {
    const defaultProps = {
      type: 'text',
      size: 'md',
      state: 'default',
      label: 'Input Label',
      placeholder: 'Enter some text...',
      value: '',
      helpText: 'This is help text for the input',
      errorText: 'This field is required',
      disabled: false
    }

    const typeOptions = [
      { value: 'text', label: 'Text' },
      { value: 'email', label: 'Email' },
      { value: 'password', label: 'Password' },
      { value: 'number', label: 'Number' },
      { value: 'tel', label: 'Telephone' },
      { value: 'url', label: 'URL' }
    ]

    const sizeOptions = [
      { value: 'sm', label: 'Small' },
      { value: 'md', label: 'Medium' },
      { value: 'lg', label: 'Large' }
    ]

    const stateOptions = [
      { value: 'default', label: 'Default' },
      { value: 'success', label: 'Success' },
      { value: 'error', label: 'Error' }
    ]

    const usageExample = `<template>
  <DInput 
    type="email"
    size="md"
    label="Email Address"
    placeholder="Enter your email"
    v-model="email"
    :state="emailState"
    :error-text="emailError"
    @blur="validateEmail"
  />
</template>

<script>
import { DInput } from 'dimensional-ui'

export default {
  components: { DInput },
  data() {
    return {
      email: '',
      emailState: 'default',
      emailError: ''
    }
  },
  methods: {
    validateEmail() {
      if (!this.email) {
        this.emailState = 'error'
        this.emailError = 'Email is required'
      } else if (!this.isValidEmail(this.email)) {
        this.emailState = 'error'
        this.emailError = 'Please enter a valid email'
      } else {
        this.emailState = 'success'
        this.emailError = ''
      }
    },
    isValidEmail(email) {
      return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)
    }
  }
}
<\/script>`

    return {
      defaultProps,
      typeOptions,
      sizeOptions,
      stateOptions,
      usageExample
    }
  }
}
</script>

<style scoped>
.input-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.demo-input-container {
  width: 100%;
  max-width: 300px;
}

.demo-input-label {
  display: block;
  font-weight: 600;
  color: #000;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.demo-input {
  width: 100%;
  border: 2px solid #000;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  background: white;
  transition: all 0.1s ease;
}

/* Size variants */
.demo-input--sm {
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  box-shadow: 2px 2px 0 #000;
}

.demo-input--md {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  box-shadow: 3px 3px 0 #000;
}

.demo-input--lg {
  padding: 1rem 1.25rem;
  font-size: 1.1rem;
  box-shadow: 4px 4px 0 #000;
}

/* State variants */
.demo-input--default {
  border-color: #000;
}

.demo-input--success {
  border-color: #00C851;
  background: #F8FFF8;
}

.demo-input--error {
  border-color: #FF004D;
  background: #FFF8F8;
}

/* Focus states */
.demo-input:focus {
  outline: none;
  transform: translate(1px, 1px);
}

.demo-input--sm:focus {
  box-shadow: 1px 1px 0 #000;
}

.demo-input--md:focus {
  box-shadow: 2px 2px 0 #000;
}

.demo-input--lg:focus {
  box-shadow: 3px 3px 0 #000;
}

.demo-input--success:focus {
  box-shadow: 2px 2px 0 #00C851;
}

.demo-input--error:focus {
  box-shadow: 2px 2px 0 #FF004D;
}

/* Disabled state */
.demo-input--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f5f5f5;
}

.demo-input-help {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
}

.demo-input-error {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #FF004D;
  font-weight: 600;
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

.inputs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.input-demo {
  display: flex;
  flex-direction: column;
}
</style>