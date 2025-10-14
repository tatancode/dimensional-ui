<template>
  <BaseShowcase
    component-name="DLayout"
    description="Application layout component with proper spacing and theme integration"
    :default-props="defaultProps"
    :usage-example="usageExample"
  >
    <template #preview="{ props }">
      <div class="layout-preview">
        <div 
          class="demo-layout"
          :class="[
            `demo-layout--${props.type}`,
            { 'demo-layout--sidebar': props.hasSidebar }
          ]"
        >
          <header v-if="props.hasHeader" class="demo-layout-header">
            <div class="demo-header-content">
              <h2>{{ props.headerTitle || 'Application Header' }}</h2>
            </div>
          </header>
          
          <aside v-if="props.hasSidebar" class="demo-layout-sidebar">
            <div class="demo-sidebar-content">
              <h4>Sidebar</h4>
              <nav class="demo-sidebar-nav">
                <a href="#" class="demo-nav-item active">Dashboard</a>
                <a href="#" class="demo-nav-item">Users</a>
                <a href="#" class="demo-nav-item">Settings</a>
              </nav>
            </div>
          </aside>
          
          <main class="demo-layout-main">
            <div class="demo-main-content">
              <h3>Main Content Area</h3>
              <p>This is where the main application content would be displayed. The layout provides consistent spacing and theme integration.</p>
              <div class="demo-content-cards">
                <div class="demo-content-card">Card 1</div>
                <div class="demo-content-card">Card 2</div>
                <div class="demo-content-card">Card 3</div>
              </div>
            </div>
          </main>
          
          <footer v-if="props.hasFooter" class="demo-layout-footer">
            <div class="demo-footer-content">
              <p>{{ props.footerText || 'Application Footer' }}</p>
            </div>
          </footer>
        </div>
      </div>
    </template>

    <template #controls="{ props, updateProp }">
      <PropControl
        label="Layout Type"
        type="select"
        :model-value="props.type"
        @update:model-value="updateProp('type', $event)"
        :options="typeOptions"
      />
      
      <PropControl
        label="Has Header"
        type="boolean"
        :model-value="props.hasHeader"
        @update:model-value="updateProp('hasHeader', $event)"
      />
      
      <PropControl
        label="Has Sidebar"
        type="boolean"
        :model-value="props.hasSidebar"
        @update:model-value="updateProp('hasSidebar', $event)"
      />
      
      <PropControl
        label="Has Footer"
        type="boolean"
        :model-value="props.hasFooter"
        @update:model-value="updateProp('hasFooter', $event)"
      />
      
      <PropControl
        label="Header Title"
        type="text"
        :model-value="props.headerTitle"
        @update:model-value="updateProp('headerTitle', $event)"
        placeholder="Header title"
      />
      
      <PropControl
        label="Footer Text"
        type="text"
        :model-value="props.footerText"
        @update:model-value="updateProp('footerText', $event)"
        placeholder="Footer text"
      />
    </template>

    <template #variants>
      <div class="variant-card">
        <h4>Standard Layout</h4>
        <div class="layout-variant">
          <div class="demo-layout demo-layout--standard mini">
            <header class="demo-layout-header">Header</header>
            <main class="demo-layout-main">Main Content</main>
            <footer class="demo-layout-footer">Footer</footer>
          </div>
        </div>
      </div>

      <div class="variant-card">
        <h4>Sidebar Layout</h4>
        <div class="layout-variant">
          <div class="demo-layout demo-layout--sidebar mini">
            <header class="demo-layout-header">Header</header>
            <aside class="demo-layout-sidebar">Sidebar</aside>
            <main class="demo-layout-main">Main Content</main>
            <footer class="demo-layout-footer">Footer</footer>
          </div>
        </div>
      </div>

      <div class="variant-card">
        <h4>Centered Layout</h4>
        <div class="layout-variant">
          <div class="demo-layout demo-layout--centered mini">
            <header class="demo-layout-header">Header</header>
            <main class="demo-layout-main">Centered Content</main>
            <footer class="demo-layout-footer">Footer</footer>
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
  name: 'DLayoutShowcase',
  components: {
    BaseShowcase,
    PropControl
  },
  setup() {
    const defaultProps = {
      type: 'standard',
      hasHeader: true,
      hasSidebar: true,
      hasFooter: true,
      headerTitle: 'My Application',
      footerText: '© 2024 My Company'
    }

    const typeOptions = [
      { value: 'standard', label: 'Standard' },
      { value: 'sidebar', label: 'Sidebar' },
      { value: 'centered', label: 'Centered' }
    ]

    const usageExample = `<template>
  <DLayout 
    type="sidebar"
    :has-header="true"
    :has-sidebar="true"
    :has-footer="true"
  >
    <template #header>
      <h1>My Application</h1>
      <nav><!-- Navigation items --></nav>
    </template>
    
    <template #sidebar>
      <nav>
        <a href="/">Dashboard</a>
        <a href="/users">Users</a>
        <a href="/settings">Settings</a>
      </nav>
    </template>
    
    <template #main>
      <router-view />
    </template>
    
    <template #footer>
      <p>&copy; 2024 My Company</p>
    </template>
  </DLayout>
</template>

<script>
import { DLayout } from 'dimensional-ui'

export default {
  components: { DLayout }
}
<\/script>`

    return {
      defaultProps,
      typeOptions,
      usageExample
    }
  }
}
</script>

<style scoped>
.layout-preview {
  width: 100%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-layout {
  width: 100%;
  max-width: 600px;
  height: 350px;
  border: 2px solid #000;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 4px 4px 0 #000;
  display: grid;
  background: #F9F8F4;
}

/* Layout types */
.demo-layout--standard {
  grid-template-areas: 
    "header"
    "main"
    "footer";
  grid-template-rows: auto 1fr auto;
}

.demo-layout--sidebar {
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
}

.demo-layout--centered {
  grid-template-areas: 
    "header"
    "main"
    "footer";
  grid-template-rows: auto 1fr auto;
}

.demo-layout-header {
  grid-area: header;
  background: white;
  border-bottom: 2px solid #000;
  padding: 1rem;
}

.demo-layout-sidebar {
  grid-area: sidebar;
  background: #FFF455;
  border-right: 2px solid #000;
  padding: 1rem;
}

.demo-layout-main {
  grid-area: main;
  background: white;
  padding: 1.5rem;
  overflow-y: auto;
}

.demo-layout-footer {
  grid-area: footer;
  background: #F9F8F4;
  border-top: 2px solid #000;
  padding: 1rem;
  text-align: center;
}

.demo-header-content h2 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
  color: #000;
}

.demo-sidebar-content h4 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 700;
  color: #000;
}

.demo-sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.demo-nav-item {
  display: block;
  padding: 0.5rem 0.75rem;
  text-decoration: none;
  color: #000;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.1s ease;
}

.demo-nav-item:hover,
.demo-nav-item.active {
  background: rgba(0, 0, 0, 0.1);
  box-shadow: 1px 1px 0 #000;
}

.demo-main-content h3 {
  margin: 0 0 1rem 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #000;
}

.demo-main-content p {
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
  color: #333;
}

.demo-content-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.demo-content-card {
  background: #F9F8F4;
  border: 2px solid #000;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  box-shadow: 2px 2px 0 #000;
}

.demo-footer-content p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  font-weight: 600;
}

/* Mini variants for showcase */
.demo-layout.mini {
  height: 200px;
  max-width: 300px;
  transform: scale(0.8);
}

.mini .demo-layout-header,
.mini .demo-layout-sidebar,
.mini .demo-layout-main,
.mini .demo-layout-footer {
  padding: 0.5rem;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.mini .demo-sidebar-nav,
.mini .demo-content-cards {
  display: none;
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

.layout-variant {
  display: flex;
  justify-content: center;
}
</style>