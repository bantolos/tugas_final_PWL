<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      >
      </v-avatar>

      <v-tabs
        centered
        class="ml-n9"
        color="grey darken-1"
      >
        <v-tab
          v-for="link in links"
          :key="link"
        >
          <router-link :to="{ name:  link }" class="black--text text-decoration-none">{{ link }}</router-link>
        </v-tab>
      </v-tabs>

      <!-- <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
      >
        <img
          src="../images/logo.png"
          alt="John"
        >
      </v-avatar> -->
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar
            class="hidden-sm-and-down"
            color="grey darken-1 shrink"
            size="32"
            v-bind="attrs"
            v-on="on"
          >
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
            >
          </v-avatar>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in profile"
            :key="index"
            @click="logout"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";
import { mapActions, mapGetters } from 'vuex';
import { db } from "../db";

export default {
  data: () => ({
    isLoading: false,
    profile: [
        { title: 'Keluar' },
      ],
    model: null,
    search: null,
    tab: null,
    links: [
      'Toko',
      'Transaksi',
      'Profil',
    ],
  }),
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["setUser"]),
    logout () {
      firebase.auth().signOut().then(() => {
        firebase.auth().onAuthStateChanged(() => {
          window.location.reload()
        })
      })
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection('user')
        .doc(user.uid)
        .get()
        .then(snapshot => {
          const document = snapshot.data()
          this.setUser({uid: user.uid, data: document});
        })
        // this.setUser({uid: user.uid, data: user.providerData});
      } else {
        this.setUser(null);
      }
    });
  },
  watch: {
    model (val) {
      if (val != null) this.tab = 0
      else this.tab = null
    }
  },
}


</script>