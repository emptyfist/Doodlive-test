import { createApp } from 'vue'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
// import VeeValidate from 'vee-validate'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.vue'
import router from './router'
import store from './store'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoCpoxZ4YwjREVkjZHHa--e72eb10qGsE",
  authDomain: "doodlive-test.firebaseapp.com",
  projectId: "doodlive-test",
  storageBucket: "doodlive-test.appspot.com",
  messagingSenderId: "450928256311",
  appId: "1:450928256311:web:19fba0d882bc54b0fb26b2",
  measurementId: "G-B7L89M4QZ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
getAnalytics(app)

createApp(App).use(store).use(router).mount('#app')
