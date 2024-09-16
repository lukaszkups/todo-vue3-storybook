import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import en from './i18n/en.json';
import pl from './i18n/pl.json';
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'pl',
  messages: {
    en,
    pl,
  }
});

const pinia = createPinia();

const app = createApp(App);
app.use(i18n);
app.use(pinia);
app.mount('#app')
