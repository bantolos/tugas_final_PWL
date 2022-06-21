<template>
  <v-row>
  <snack-bars ref="alert"></snack-bars>
    <v-col
      cols="12"
      sm="8"
    >
      <v-sheet
        min-height="100px"
        rounded="lg"
        class="pa-8"
      >
        <v-responsive width="100%">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              label="Username"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field v-if="alamat == ''"
              v-model="alamat"
              :rules="alamatRules"
              label="Alamat"
              required
              error
            ></v-text-field>
            <v-text-field v-else
              v-model="alamat"
              :rules="alamatRules"
              label="Alamat"
              required
            ></v-text-field>

            <br><br>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              Simpan
            </v-btn>
          </v-form>
        </v-responsive>

        <!--  -->
        
      </v-sheet>
    </v-col>

    <v-col
      cols="12"
      sm="4"
    >
      <v-sheet
        rounded="lg"
        min-height="100"
        class="pa-8"
        align="center"
      >
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-avatar
              size="200"
            >
              <img v-if="user.photoURL != null"
                :src="user.photoURL"
                :alt="user.displayName"
              >
              <img v-else
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                :alt="user.displayName"
              >
            </v-avatar>

            <v-spacer></v-spacer>

            <v-btn
              color="success"
              class="mt-6"
              fab
            >
              <v-icon dark>
                mdi-camera-plus
              </v-icon>
            </v-btn>
          </v-form>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import { db } from "../db";
import firebase from "firebase";
import SnackBars from '@/components/SnackBars';

  export default {
    data: () => ({
      username: '',
      usernameRules: [
        v => !!v || 'Username masih kosong!',
        v => (v && v.length >= 5) || 'Username minimal terdiri dari 5 karakter',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail masih kosong!',
        v => /.+@.+\..+/.test(v) || 'E-mail tidak valid',
      ],
      alamat: '',
      alamatRules: [
        v => !!v || 'Alamat masih kosong!',
        v => (v && v.length >= 5) || 'Alamat minimal terdiri dari 5 karakter',
      ],
    }),
    computed: {
      ...mapGetters(["user"]),
    },
    watch: {
      user(promise) {
        this.username = promise.data.username;
        this.email = promise.data.email;
        this.alamat = promise.data.alamat;
      }
    },
    mounted() {
      this.email = this.user.data.email;
      this.username = this.user.data.username;
      this.alamat = this.user.data.alamat;
    },
    methods: {
      validate () {
        if(this.$refs.form.validate())
          this.updateProfil()
      },
      updateProfil() {
        db.collection('user').doc(this.user.uid).set({username: this.username, email: this.email, alamat: this.alamat});
        if(this.email != this.user.data.email) {
          firebase.auth().currentUser.updateEmail(this.email).then(() => {
              this.$refs.alert.show("Profil berhasil diperbaharui!","green darken-1");
            }).catch((error) => {
              this.$refs.alert.show(error,"red accent-2");
            });
        } else {
          this.$refs.alert.show("Profil berhasil diperbaharui!","green darken-1");
        }
      }
    },
    components: {
      SnackBars,
    }
  }
</script>