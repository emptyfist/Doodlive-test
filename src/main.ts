import { createApp } from 'vue'

import "@/assets/scss/main.scss"

import App from './App.vue'
import router from './router'
import store from './store'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from 'firebase/auth'
import { firebaseConfig } from './firebase-config'

// Initialize Firebase
const firebase = initializeApp(firebaseConfig)
getAnalytics(firebase)

getAuth().onAuthStateChanged((user) => {
  if (user) {
    store.commit("Auth/loginSuccess", user)
  } else {
    store.commit("Auth/loginSuccess", null)
    store.commit("Auth/logout")
  }
})

createApp(App).use(store).use(router).mount('#app')
