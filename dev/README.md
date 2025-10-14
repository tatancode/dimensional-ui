# Dimensional UI - Development Playground

This development environment provides an interactive showcase for all Dimensional UI components with live prop controls and visual examples.

## Getting Started

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   Navigate to `http://localhost:3000` to access the component playground.

## Features

### 🎨 Interactive Component Showcase
- **Live Preview**: See components update in real-time as you modify props
- **Prop Controls**: Interactive controls for all component properties
- **State Management**: Toggle between different component states and variants
- **Visual Examples**: Pre-built examples showing different use cases

### 🔧 Component Navigation
- **Tabbed Interface**: Easy navigation between different components
- **Organized Layout**: Clean, dimensional-themed interface
- **Responsive Design**: Works on desktop and mobile devices

### 📚 Documentation Integration
- **Usage Examples**: Copy-paste ready code examples
- **Prop Documentation**: Interactive exploration of component APIs
- **Variant Showcase**: Visual grid of all component variants and states

## Available Components

The playground includes showcases for all Dimensional UI components:

- **DButton**: Sticker-style buttons with shadow effects
- **DNavbar**: Tactile navigation with pill-style active states
- **DDropdown**: Bright dropdown menus with keyboard navigation
- **DCard**: Content cards with consistent shadow styling
- **DInput**: Form inputs with theme-consistent styling
- **DLayout**: Application layout with proper spacing

## Development Workflow

### Adding New Components
1. Create the component in `../src/components/`
2. Add a showcase file in `./showcases/ComponentShowcase.vue`
3. Import and register the showcase in `App.vue`
4. The component will automatically appear in the navigation

### Showcase Structure
Each showcase uses the `BaseShowcase` component and includes:
- **Live Preview**: Interactive component with current props
- **Controls**: Form controls for modifying component props
- **Variants**: Grid showing different component states
- **Usage Example**: Code snippet for implementation

### Hot Reload
The development environment supports hot reload for rapid development:
- Component changes are reflected immediately
- Prop changes update the preview in real-time
- CSS changes apply without page refresh

## File Structure

```
dev/
├── App.vue                 # Main playground application
├── main.js                 # Application entry point
├── showcases/
│   ├── BaseShowcase.vue    # Base showcase component
│   ├── PropControl.vue     # Reusable prop control component
│   ├── DButtonShowcase.vue # Button component showcase
│   ├── DNavbarShowcase.vue # Navbar component showcase
│   └── ...                 # Other component showcases
└── README.md              # This file
```

## Customization

### Adding New Prop Controls
The `PropControl` component supports various input types:
- `text`: Text input
- `number`: Number input with min/max
- `boolean`: Toggle switch
- `select`: Dropdown with options
- `color`: Color picker

### Styling
The playground uses the same dimensional theme as the component library:
- Consistent colors and shadows
- Sticker-like interactive elements
- Bold, playful aesthetic

## Tips for Development

1. **Use the playground early**: Start building showcases before implementing components
2. **Test all states**: Use the controls to verify all component states work correctly
3. **Check responsiveness**: Resize the browser to test responsive behavior
4. **Validate accessibility**: Test keyboard navigation and screen reader compatibility

## Troubleshooting

### Component Not Showing
- Ensure the component is imported in `App.vue`
- Check that the showcase component is properly registered
- Verify the component name matches in the navigation array

### Props Not Updating
- Check that prop controls are using `v-model` correctly
- Ensure the `updateProp` function is called with correct parameters
- Verify prop names match between controls and component

### Styling Issues
- Check that CSS classes are scoped properly
- Ensure dimensional theme tokens are being used
- Verify that hover and active states are implemented

## Next Steps

Once components are implemented:
1. Import the actual components in the showcases
2. Replace demo components with real implementations
3. Test all functionality in the playground
4. Use the playground for visual regression testing