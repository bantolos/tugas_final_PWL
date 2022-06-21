import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase";
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Auth from '../views/Auth.vue'
import Toko from '../views/Toko.vue'
import Transaksi from '../views/Transaksi.vue'
import Profil from '../views/Profil.vue'

Vue.use(VueRouter)

const initializeAuth = new Promise(resolve => {
  // this adds a hook for the initial auth-change event
  firebase.auth().onAuthStateChanged(user => {
    authService.setUser(user)
    resolve(user)
  }
  )
})

const authService = {
  user: null,
  authenticated () {
    return initializeAuth.then(user => {
      return user && !user.isAnonymous
    })
  },
  setUser (user) {
    this.user = user
  },
  login (email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },
  logout () {
    firebase.auth().signOut().then(() => {
      console.log('logout done')
    })
  }
}

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/toko',
    meta: {
      authRequired: true,
    },
    children: [
      {
        path: '/toko',
        name: 'Toko',
        component: Toko
      },
      {
        path: '/transaksi',
        name: 'Transaksi',
        component: Transaksi
      },
      {
        path: '/profil',
        name: 'Profil',
        component: Profil
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    redirect: 'auth/login',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some(record => record.meta.authRequired);
  const isAuthenticated = firebase.auth().currentUser;
  if(authRequired && !isAuthenticated) {
    next("/auth");
  } else {
    next();
  }
});


export default router
