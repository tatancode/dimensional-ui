<template>
  <div class="prop-control">
    <label class="prop-label">{{ label }}</label>
    
    <!-- String/Text Input -->
    <input 
      v-if="type === 'text'"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="prop-input"
      :placeholder="placeholder"
    />
    
    <!-- Number Input -->
    <input 
      v-else-if="type === 'number'"
      type="number"
      :value="modelValue"
      @input="$emit('update:modelValue', Number($event.target.value))"
      class="prop-input"
      :min="min"
      :max="max"
    />
    
    <!-- Boolean Toggle -->
    <label v-else-if="type === 'boolean'" class="toggle-container">
      <input 
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        class="toggle-input"
      />
      <span class="toggle-slider"></span>
    </label>
    
    <!-- Select Dropdown -->
    <select 
      v-else-if="type === 'select'"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="prop-select"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    
    <!-- Color Picker -->
    <div v-else-if="type === 'color'" class="color-control">
      <input 
        type="color"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="color-input"
      />
      <span class="color-value">{{ modelValue }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropControl',
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      validator: (value) => ['text', 'number', 'boolean', 'select', 'color'].includes(value)
    },
    modelValue: {
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    min: {
      type: Number,
      default: undefined
    },
    max: {
      type: Number,
      default: undefined
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.prop-control {
  margin-bottom: 1rem;
}

.prop-label {
  display: block;
  font-weight: 600;
  color: #000;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.prop-input,
.prop-select {
  width: 100%;
  padding: 0.5rem;
  border: 2px solid #000;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  background: white;
}

.prop-input:focus,
.prop-select:focus {
  outline: none;
  box-shadow: 2px 2px 0 #FFF455;
}

.toggle-container {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  cursor: pointer;
}

.toggle-input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border: 2px solid #000;
  border-radius: 24px;
  transition: 0.2s;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  border-radius: 50%;
  transition: 0.2s;
}

.toggle-input:checked + .toggle-slider {
  background-color: #FFF455;
}

.toggle-input:checked + .toggle-slider:before {
  transform: translateX(22px);
}

.color-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.color-input {
  width: 40px;
  height: 40px;
  border: 2px solid #000;
  border-radius: 8px;
  cursor: pointer;
  padding: 0;
}

.color-value {
  font-family: monospace;
  font-size: 0.8rem;
  color: #666;
}
</style>