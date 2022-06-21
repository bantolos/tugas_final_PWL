// Conveniently import this file anywhere to use db

import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBkdeKavsYzMbUkPkJPII6JxYgD44DjCLQ",
    authDomain: "tugas-final-pwl-71190480.firebaseapp.com",
    projectId: "tugas-final-pwl-71190480",
    storageBucket: "tugas-final-pwl-71190480.appspot.com",
    messagingSenderId: "625307559748",
    appId: "1:625307559748:web:593d327ee9a7899908d911",
    measurementId: "G-6CC3G94ZZY"
  };

export const db = firebase
    .initializeApp(firebaseConfig)
    .firestore()


// Export types that exists in Firestore - Uncomment if you need them in your app
// const { Timestamp, GeoPoint } = firebase.firestore
// export { Timestamp, GeoPoint }
