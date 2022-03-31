import { createApp } from 'vue'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import "@/assets/scss/main.scss"

import App from './App.vue'
import router from './router'
import store from './store'

import { firebaseConfig } from './firebase-config'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
getAnalytics(app)

createApp(App).use(store).use(router).mount('#app')
