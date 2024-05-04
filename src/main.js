import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import VueTextareaAutosize from 'vue-textarea-autosize'

Vue.use(VueTextareaAutosize)

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyCjknpiTMTtixypvqqq4LK8xw0v4WMGaNg",
  authDomain: "pleeease-2b282.firebaseapp.com",
  projectId: "pleeease-2b282",
  storageBucket: "pleeease-2b282.appspot.com",
  messagingSenderId: "538972077498",
  appId: "1:538972077498:web:ba4c8137d769195b353183",
  measurementId: "G-5YJ3BMM7XL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export function  rnd (a, b) {
  return Math.floor((b - a + 1) * Math.random()) + a;
}
export const colors = ['blue', 'indigo', 'green', 'orange', 'grey', "red"];

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
