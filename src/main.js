import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { firestorePlugin } from 'vuefire'
import firebase from "firebase";

Vue.use(firestorePlugin)

Vue.use(require('vue-moment'));

import moment from 'moment'

Vue.prototype.moment = moment

const firebaseConfig = {
  apiKey: "AIzaSyBkdeKavsYzMbUkPkJPII6JxYgD44DjCLQ",
  authDomain: "tugas-final-pwl-71190480.firebaseapp.com",
  projectId: "tugas-final-pwl-71190480",
  storageBucket: "tugas-final-pwl-71190480.appspot.com",
  messagingSenderId: "625307559748",
  appId: "1:625307559748:web:593d327ee9a7899908d911",
  measurementId: "G-6CC3G94ZZY"
};



// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

let app;
firebase.auth().onAuthStateChanged(user => {
  console.log(user)
  if(!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app') 
  }
})
