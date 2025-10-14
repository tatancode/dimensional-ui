import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useShadowEffects } from './useShadowEffects.js'
import { useTheme } from './useTheme.js'

/**
 * Composable for managing interactive states (hover, active, focus)
 * Provides reactive state management and visual feedback for interactive elements
 */
export function useInteractiveStates(options = {}) {
  const {
    shadowSize = 'md',
    disabled = false,
    trackFocus = true,
    trackHover = true,
    trackActive = true
  } = options
  
  const { getShadowStyles, createStickerEffects } = useShadowEffects()
  const { prefersReducedMotion } = useTheme()
  
  // Interactive states
  const isHovered = ref(false)
  const isPressed = ref(false)
  const isFocused = ref(false)
  const isActive = ref(false)
  
  // Element reference for event listeners
  const elementRef = ref(null)
  
  /**
   * Combined interactive state object
   */
  const interactiveState = computed(() => ({
    isHovered: isHovered.value && !disabled,
    isPressed: isPressed.value && !disabled,
    isFocused: isFocused.value && !disabled,
    isActive: isActive.value && !disabled,
    disabled
  }))
  
  /**
   * Check if element is in any interactive state
   */
  const hasInteractiveState = computed(() => {
    const state = interactiveState.value
    return state.isHovered || state.isPressed || state.isFocused || state.isActive
  })
  
  /**
   * Get current shadow styles based on interactive state
   */
  const currentShadowStyles = computed(() => {
    return getShadowStyles(shadowSize, interactiveState.value)
  })
  
  /**
   * Get sticker effect styles for current state
   */
  const stickerStyles = computed(() => {
    const effects = createStickerEffects()
    const state = interactiveState.value
    
    if (state.isPressed) {
      return effects.pressed(shadowSize)
    }
    
    if (state.isHovered && !state.isActive) {
      return effects.hover(shadowSize)
    }
    
    if (state.isActive) {
      return effects.active(shadowSize)
    }
    
    return effects.rest(shadowSize)
  })
  
  /**
   * Generate CSS classes for current interactive state
   */
  const interactiveClasses = computed(() => {
    const state = interactiveState.value
    const classes = []
    
    if (state.isHovered) classes.push('d-hovered')
    if (state.isPressed) classes.push('d-pressed')
    if (state.isFocused) classes.push('d-focused')
    if (state.isActive) classes.push('d-active')
    if (state.disabled) classes.push('d-disabled')
    
    return classes
  })
  
  /**
   * Event handlers for mouse interactions
   */
  const handleMouseEnter = () => {
    if (!trackHover || disabled) return
    isHovered.value = true
  }
  
  const handleMouseLeave = () => {
    if (!trackHover || disabled) return
    isHovered.value = false
    isPressed.value = false // Reset pressed state on leave
  }
  
  const handleMouseDown = () => {
    if (!trackActive || disabled) return
    isPressed.value = true
  }
  
  const handleMouseUp = () => {
    if (!trackActive || disabled) return
    isPressed.value = false
  }
  
  /**
   * Event handlers for focus interactions
   */
  const handleFocus = () => {
    if (!trackFocus || disabled) return
    isFocused.value = true
  }
  
  const handleBlur = () => {
    if (!trackFocus || disabled) return
    isFocused.value = false
  }
  
  /**
   * Event handlers for keyboard interactions
   */
  const handleKeyDown = (event) => {
    if (!trackActive || disabled) return
    
    // Treat Enter and Space as press for accessibility
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      isPressed.value = true
    }
  }
  
  const handleKeyUp = (event) => {
    if (!trackActive || disabled) return
    
    if (event.key === 'Enter' || event.key === ' ') {
      isPressed.value = false
    }
  }
  
  /**
   * Set active state manually (for navigation items, etc.)
   */
  const setActive = (active) => {
    isActive.value = active
  }
  
  /**
   * Reset all interactive states
   */
  const resetStates = () => {
    isHovered.value = false
    isPressed.value = false
    isFocused.value = false
    // Don't reset isActive as it's usually controlled externally
  }
  
  /**
   * Get event listeners object for easy binding
   */
  const eventListeners = computed(() => {
    const listeners = {}
    
    if (trackHover) {
      listeners.onMouseenter = handleMouseEnter
      listeners.onMouseleave = handleMouseLeave
    }
    
    if (trackActive) {
      listeners.onMousedown = handleMouseDown
      listeners.onMouseup = handleMouseUp
      listeners.onKeydown = handleKeyDown
      listeners.onKeyup = handleKeyUp
    }
    
    if (trackFocus) {
      listeners.onFocus = handleFocus
      listeners.onBlur = handleBlur
    }
    
    return listeners
  })
  
  /**
   * Get accessibility attributes
   */
  const accessibilityAttrs = computed(() => {
    const attrs = {}
    
    if (trackFocus) {
      attrs.tabindex = disabled ? -1 : 0
    }
    
    if (disabled) {
      attrs['aria-disabled'] = 'true'
    }
    
    if (isPressed.value) {
      attrs['aria-pressed'] = 'true'
    }
    
    return attrs
  })
  
  /**
   * Setup automatic event listeners when element ref is available
   */
  const setupEventListeners = () => {
    if (!elementRef.value) return
    
    const element = elementRef.value
    
    if (trackHover) {
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
    }
    
    if (trackActive) {
      element.addEventListener('mousedown', handleMouseDown)
      element.addEventListener('mouseup', handleMouseUp)
      element.addEventListener('keydown', handleKeyDown)
      element.addEventListener('keyup', handleKeyUp)
    }
    
    if (trackFocus) {
      element.addEventListener('focus', handleFocus)
      element.addEventListener('blur', handleBlur)
    }
  }
  
  /**
   * Cleanup event listeners
   */
  const cleanupEventListeners = () => {
    if (!elementRef.value) return
    
    const element = elementRef.value
    
    element.removeEventListener('mouseenter', handleMouseEnter)
    element.removeEventListener('mouseleave', handleMouseLeave)
    element.removeEventListener('mousedown', handleMouseDown)
    element.removeEventListener('mouseup', handleMouseUp)
    element.removeEventListener('keydown', handleKeyDown)
    element.removeEventListener('keyup', handleKeyUp)
    element.removeEventListener('focus', handleFocus)
    element.removeEventListener('blur', handleBlur)
  }
  
  /**
   * Create interaction utilities for specific use cases
   */
  const createInteractionUtils = () => {
    return {
      // Button-like interactions
      button: () => ({
        ...eventListeners.value,
        ...accessibilityAttrs.value,
        role: 'button',
        style: stickerStyles.value
      }),
      
      // Link-like interactions
      link: () => ({
        ...eventListeners.value,
        ...accessibilityAttrs.value,
        style: stickerStyles.value
      }),
      
      // Navigation item interactions
      navItem: (active = false) => {
        setActive(active)
        return {
          ...eventListeners.value,
          ...accessibilityAttrs.value,
          'aria-current': active ? 'page' : undefined,
          style: stickerStyles.value
        }
      }
    }
  }
  
  // Lifecycle management
  onMounted(() => {
    if (elementRef.value) {
      setupEventListeners()
    }
  })
  
  onUnmounted(() => {
    cleanupEventListeners()
  })
  
  return {
    // Element reference
    elementRef,
    
    // State
    isHovered: computed(() => isHovered.value),
    isPressed: computed(() => isPressed.value),
    isFocused: computed(() => isFocused.value),
    isActive: computed(() => isActive.value),
    interactiveState,
    hasInteractiveState,
    
    // Styles and classes
    currentShadowStyles,
    stickerStyles,
    interactiveClasses,
    
    // Event handlers
    eventListeners,
    accessibilityAttrs,
    
    // Manual control
    setActive,
    resetStates,
    
    // Utilities
    createInteractionUtils,
    
    // Setup/cleanup
    setupEventListeners,
    cleanupEventListeners
  }
}