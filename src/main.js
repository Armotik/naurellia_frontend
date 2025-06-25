import './assets/main.css'
import 'leaflet/dist/leaflet.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useThemeStore } from './stores/theme'

import App from './App.vue'
import router from './router'

// Importer uniquement le VSkeletonLoader au lieu de tous les composants
import { VSkeletonLoader } from 'vuetify/components'
import { createVuetify } from 'vuetify'
import lazyBackground from './directives/lazyBackgroundDirective';

const vuetify = createVuetify({
  components: {
    VSkeletonLoader
  },
  // Conserver les directives nécessaires si vous en utilisez
  directives: {},
})

const app = createApp(App)

app.use(createPinia())

const themeStore = useThemeStore();
themeStore.initTheme();

app.use(router)
app.use(vuetify)
app.directive('lazy-background', lazyBackground);

app.mount('#app')
