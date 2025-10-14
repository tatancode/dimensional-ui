<template>
  <BaseShowcase
    component-name="DInput"
    description="Form inputs with theme-consistent styling, validation states, and accessibility features"
    :default-props="defaultProps"
    :usage-example="usageExample"
  >
    <template #preview="{ props }">
      <DInput
        v-model="inputValue"
        :type="props.type"
        :label="props.label"
        :placeholder="props.placeholder"
        :help-text="props.helpText"
        :error-message="props.errorMessage"
        :size="props.size"
        :variant="props.variant"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :required="props.required"
        :full-width="props.fullWidth"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      >
        <template v-if="props.showPrefix" #prefix>
          <span>$</span>
        </template>
        <template v-if="props.showSuffix" #suffix>
          <span>.00</span>
        </template>
      </DInput>
      
      <div v-if="inputValue" class="input-value">
        Current value: <strong>{{ inputValue }}</strong>
      </div>
    </template>

    <template #controls="{ props, updateProp }">
      <PropControl
        label="Type"
        type="select"
        :model-value="props.type"
        :options="typeOptions"
        @update:model-value="(value) => updateProp('type', value)"
      />
      
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
        label="Label"
        type="text"
        :model-value="props.label"
        @update:model-value="(value) => updateProp('label', value)"
      />
      
      <PropControl
        label="Placeholder"
        type="text"
        :model-value="props.placeholder"
        @update:model-value="(value) => updateProp('placeholder', value)"
      />
      
      <PropControl
        label="Help Text"
        type="text"
        :model-value="props.helpText"
        @update:model-value="(value) => updateProp('helpText', value)"
      />
      
      <PropControl
        label="Error Message"
        type="text"
        :model-value="props.errorMessage"
        @update:model-value="(value) => updateProp('errorMessage', value)"
      />
      
      <PropControl
        label="Disabled"
        type="boolean"
        :model-value="props.disabled"
        @update:model-value="(value) => updateProp('disabled', value)"
      />
      
      <PropControl
        label="Readonly"
        type="boolean"
        :model-value="props.readonly"
        @update:model-value="(value) => updateProp('readonly', value)"
      />
      
      <PropControl
        label="Required"
        type="boolean"
        :model-value="props.required"
        @update:model-value="(value) => updateProp('required', value)"
      />
      
      <PropControl
        label="Full Width"
        type="boolean"
        :model-value="props.fullWidth"
        @update:model-value="(value) => updateProp('fullWidth', value)"
      />
      
      <PropControl
        label="Show Prefix"
        type="boolean"
        :model-value="props.showPrefix"
        @update:model-value="(value) => updateProp('showPrefix', value)"
      />
      
      <PropControl
        label="Show Suffix"
        type="boolean"
        :model-value="props.showSuffix"
        @update:model-value="(value) => updateProp('showSuffix', value)"
      />
    </template>

    <template #variants>
      <!-- Variant Examples -->
      <div class="variant-card">
        <h4>Variants</h4>
        <div class="input-grid">
          <DInput
            v-model="sampleValues.default"
            variant="default"
            label="Default Input"
            placeholder="Enter text..."
          />
          <DInput
            v-model="sampleValues.yellow"
            variant="accent-yellow"
            label="Yellow Input"
            placeholder="Bright background..."
          />
          <DInput
            v-model="sampleValues.pink"
            variant="accent-pink"
            label="Pink Input"
            placeholder="High contrast..."
          />
        </div>
      </div>

      <!-- Size Examples -->
      <div class="variant-card">
        <h4>Sizes</h4>
        <div class="input-grid">
          <DInput
            v-model="sampleValues.small"
            size="sm"
            label="Small Input"
            placeholder="Compact size..."
          />
          <DInput
            v-model="sampleValues.medium"
            size="md"
            label="Medium Input"
            placeholder="Standard size..."
          />
          <DInput
            v-model="sampleValues.large"
            size="lg"
            label="Large Input"
            placeholder="Spacious size..."
          />
        </div>
      </div>

      <!-- Input Types -->
      <div class="variant-card">
        <h4>Input Types</h4>
        <div class="input-grid input-types-grid">
          <DInput
            v-model="sampleValues.text"
            type="text"
            label="Text Input"
            placeholder="Enter any text..."
          />
          <DInput
            v-model="sampleValues.email"
            type="email"
            label="Email Input"
            placeholder="user@example.com"
          />
          <DInput
            v-model="sampleValues.password"
            type="password"
            label="Password Input"
            placeholder="Enter password..."
          />
          <DInput
            v-model="sampleValues.number"
            type="number"
            label="Number Input"
            placeholder="Enter number..."
            min="0"
            max="100"
          />
          <DInput
            v-model="sampleValues.tel"
            type="tel"
            label="Phone Input"
            placeholder="(555) 123-4567"
          />
          <DInput
            v-model="sampleValues.url"
            type="url"
            label="URL Input"
            placeholder="https://example.com"
          />
        </div>
      </div>

      <!-- States -->
      <div class="variant-card">
        <h4>States</h4>
        <div class="input-grid">
          <DInput
            v-model="sampleValues.normal"
            label="Normal State"
            placeholder="Normal input..."
            help-text="This is a helpful hint for the user."
          />
          <DInput
            v-model="sampleValues.error"
            label="Error State"
            placeholder="Invalid input..."
            error-message="This field is required and cannot be empty."
          />
          <DInput
            v-model="sampleValues.disabled"
            label="Disabled State"
            placeholder="Cannot interact..."
            disabled
          />
          <DInput
            v-model="sampleValues.readonly"
            label="Readonly State"
            placeholder="Cannot edit..."
            readonly
          />
        </div>
      </div>

      <!-- Prefix and Suffix -->
      <div class="variant-card">
        <h4>Prefix & Suffix</h4>
        <div class="input-grid">
          <DInput
            v-model="sampleValues.price"
            label="Price"
            placeholder="0"
          >
            <template #prefix>$</template>
            <template #suffix>.00</template>
          </DInput>
          <DInput
            v-model="sampleValues.website"
            label="Website"
            placeholder="mysite"
          >
            <template #prefix>https://</template>
            <template #suffix>.com</template>
          </DInput>
          <DInput
            v-model="sampleValues.search"
            label="Search"
            placeholder="Search..."
          >
            <template #prefix>🔍</template>
          </DInput>
        </div>
      </div>

      <!-- Form Example -->
      <div class="variant-card full-width">
        <h4>Complete Form Example</h4>
        <form @submit.prevent="handleFormSubmit" class="form-example">
          <div class="form-row">
            <DInput
              v-model="formData.firstName"
              label="First Name"
              placeholder="John"
              required
              :error-message="formErrors.firstName"
            />
            <DInput
              v-model="formData.lastName"
              label="Last Name"
              placeholder="Doe"
              required
              :error-message="formErrors.lastName"
            />
          </div>
          
          <DInput
            v-model="formData.email"
            type="email"
            label="Email Address"
            placeholder="john.doe@example.com"
            required
            full-width
            :error-message="formErrors.email"
            help-text="We'll never share your email with anyone else."
          />
          
          <DInput
            v-model="formData.phone"
            type="tel"
            label="Phone Number"
            placeholder="(555) 123-4567"
            full-width
          />
          
          <DInput
            v-model="formData.website"
            type="url"
            label="Website"
            placeholder="https://yoursite.com"
            full-width
            help-text="Optional: Include your personal or business website."
          />
          
          <div class="form-actions">
            <DButton type="submit" variant="primary">Submit Form</DButton>
            <DButton type="button" variant="secondary" @click="resetForm">Reset</DButton>
          </div>
        </form>
        
        <div v-if="formSubmitted" class="form-success">
          <h5>Form Submitted Successfully!</h5>
          <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
        </div>
      </div>
    </template>
  </BaseShowcase>
</template>

<script>
import { ref, reactive } from 'vue'
import BaseShowcase from './BaseShowcase.vue'
import PropControl from './PropControl.vue'
import DInput from '../../src/components/DInput.vue'
import DButton from '../../src/components/DButton.vue'

export default {
  name: 'DInputShowcase',
  components: {
    BaseShowcase,
    PropControl,
    DInput,
    DButton
  },
  setup() {
    const inputValue = ref('')
    const formSubmitted = ref(false)
    
    const sampleValues = reactive({
      default: '',
      yellow: '',
      pink: '',
      small: '',
      medium: '',
      large: '',
      text: '',
      email: '',
      password: '',
      number: '',
      tel: '',
      url: '',
      normal: '',
      error: '',
      disabled: 'Cannot change this',
      readonly: 'Read only value',
      price: '',
      website: '',
      search: ''
    })
    
    const formData = reactive({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      website: ''
    })
    
    const formErrors = reactive({
      firstName: '',
      lastName: '',
      email: ''
    })
    
    const defaultProps = {
      type: 'text',
      label: 'Sample Input',
      placeholder: 'Enter some text...',
      helpText: 'This is helpful information about the input.',
      errorMessage: '',
      size: 'md',
      variant: 'default',
      disabled: false,
      readonly: false,
      required: false,
      fullWidth: false,
      showPrefix: false,
      showSuffix: false
    }
    
    const typeOptions = [
      { label: 'Text', value: 'text' },
      { label: 'Email', value: 'email' },
      { label: 'Password', value: 'password' },
      { label: 'Number', value: 'number' },
      { label: 'Telephone', value: 'tel' },
      { label: 'URL', value: 'url' },
      { label: 'Search', value: 'search' }
    ]
    
    const variantOptions = [
      { label: 'Default', value: 'default' },
      { label: 'Accent Yellow', value: 'accent-yellow' },
      { label: 'Accent Pink', value: 'accent-pink' }
    ]
    
    const sizeOptions = [
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' }
    ]
    
    const usageExample = `<!-- Basic usage -->
<DInput
  v-model="inputValue"
  label="Input Label"
  placeholder="Enter text..."
/>

<!-- Different types -->
<DInput v-model="email" type="email" label="Email" />
<DInput v-model="password" type="password" label="Password" />
<DInput v-model="age" type="number" label="Age" />

<!-- With help text -->
<DInput
  v-model="username"
  label="Username"
  help-text="Must be 3-20 characters long."
/>

<!-- Error state -->
<DInput
  v-model="email"
  type="email"
  label="Email"
  error-message="Please enter a valid email address."
/>

<!-- With prefix and suffix -->
<DInput v-model="price" label="Price">
  <template #prefix>$</template>
  <template #suffix>.00</template>
</DInput>

<!-- Different variants -->
<DInput variant="accent-yellow" label="Highlighted" />
<DInput variant="accent-pink" label="High Contrast" />

<!-- States -->
<DInput disabled label="Disabled" />
<DInput readonly label="Read Only" />
<DInput required label="Required Field" />
<DInput full-width label="Full Width" />`
    
    const validateForm = () => {
      // Reset errors
      Object.keys(formErrors).forEach(key => {
        formErrors[key] = ''
      })
      
      let isValid = true
      
      if (!formData.firstName.trim()) {
        formErrors.firstName = 'First name is required.'
        isValid = false
      }
      
      if (!formData.lastName.trim()) {
        formErrors.lastName = 'Last name is required.'
        isValid = false
      }
      
      if (!formData.email.trim()) {
        formErrors.email = 'Email address is required.'
        isValid = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        formErrors.email = 'Please enter a valid email address.'
        isValid = false
      }
      
      return isValid
    }
    
    const handleFormSubmit = () => {
      if (validateForm()) {
        formSubmitted.value = true
        console.log('Form submitted:', formData)
      }
    }
    
    const resetForm = () => {
      Object.keys(formData).forEach(key => {
        formData[key] = ''
      })
      Object.keys(formErrors).forEach(key => {
        formErrors[key] = ''
      })
      formSubmitted.value = false
    }
    
    const handleInput = (event) => {
      console.log('Input event:', event.target.value)
    }
    
    const handleChange = (event) => {
      console.log('Change event:', event.target.value)
    }
    
    const handleFocus = (event) => {
      console.log('Focus event:', event.target.value)
    }
    
    const handleBlur = (event) => {
      console.log('Blur event:', event.target.value)
    }
    
    return {
      inputValue,
      sampleValues,
      formData,
      formErrors,
      formSubmitted,
      defaultProps,
      typeOptions,
      variantOptions,
      sizeOptions,
      usageExample,
      handleFormSubmit,
      resetForm,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur
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

.input-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  align-items: start;
}

/* Specific adjustments for different sections */
.variant-card:has(.input-grid) .input-grid {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

/* For input types section with many inputs */
.input-types-grid {
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)) !important;
}

.input-value {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #FFF455;
  border: 2px solid #000;
  border-radius: 8px;
  font-weight: 600;
  color: #000;
  text-align: center;
}

.form-example {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  margin-top: 1rem;
}

.form-success {
  margin-top: 2rem;
  padding: 1rem;
  background: #FFF455;
  border: 2px solid #000;
  border-radius: 8px;
}

.form-success h5 {
  margin: 0 0 1rem 0;
  font-weight: 700;
  color: #000;
}

.form-success pre {
  background: #F9F8F4;
  border: 1px solid #000;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 0.875rem;
  overflow-x: auto;
}

@media (max-width: 1024px) {
  .input-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media (max-width: 768px) {
  .input-grid {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .variant-card {
    padding: 1rem;
  }
}

@media (max-width: 900px) {
  .input-types-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)) !important;
  }
}

@media (max-width: 640px) {
  .input-grid,
  .input-types-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>