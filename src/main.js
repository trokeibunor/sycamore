import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import inputValidator from '../plugins/inputValidator'
import firebaseApp from './firebase'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(inputValidator)
app.component('QuillEditor', QuillEditor)



app.mount('#app')
console.log('Firebase App Initialized:', firebaseApp)
