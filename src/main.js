import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getIdCalendar, isCalendarIdValid } from "./models/calendar.js"
import en from "@/lang/en";
import fr from "@/lang/fr";
import VueTextareaAutosize from 'vue-textarea-autosize';

Vue.use(VueTextareaAutosize);
Vue.config.productionTip = false;
export const eventBus = new Vue();

const messages = {
  en,
  fr
}

const firebaseConfig = {
  apikey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export function rnd (a, b) {
  return Math.floor((b - a + 1) * Math.random()) + a;
}
export const colors = ['blue', 'indigo', 'green', 'orange', 'grey', "red"];

new Vue({
  vuetify,
  data() {
    return {
      currentLanguage: [],
    }
  },
  async created(){
    const browserLanguage = navigator.language.substring(0, 2);
    this.currentLanguage = (browserLanguage === 'fr') ? messages['fr'] : messages['en'];
    const idCalendar = getIdCalendar();
    const isCalendarValid  = await isCalendarIdValid(idCalendar);
    if(!isCalendarValid && (window.location.href != window.location.origin + window.location.pathname)) {
      window.location.href = window.location.origin;
    }
  },
  computed: {
    currentMessages() {
      return this.currentLanguage;
    }
  },
  render: h => h(App)
}).$mount('#app')
