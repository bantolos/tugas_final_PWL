<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
  <SnackBars ref="alert"></SnackBars>

    <v-text-field
      v-model="username"
      counter
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

    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="Password"
      hint="At least 8 characters"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'Kamu harus menyetujui S & K untuk melanjutkan!']"
      label="Saya menyetujui S & K"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="register"
    >
      Daftar
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset
    </v-btn>

    <p class="mt-6">Sudah mempunyai akun? <router-link :to="{ name: 'Login'}">Masuk</router-link></p>

  </v-form>
</template>

<script>
import * as firebase from "firebase";
import SnackBars from '@/components/SnackBars';
import { db } from "../db";

  export default {
    components: {
      SnackBars 
    },
    data: () => ({
      show1: false,
      valid: true,
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
      password: '',
        rules: {
          required: value => !!value || 'Password masih kosong!',
          min: v => v.length >= 8 || 'Minimal 8 karakter'
      }
    }),

    methods: {
      validate () {
        if(this.$refs.form.validate())
          this.register()
      },
      reset () {
        this.$refs.form.reset()
      },
      goToPage(name) {
        this.$router.push({name: name});
      },
      register() {
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          res.user
            .updateProfile({
              displayName: this.username
            })
            .then(() => {
              db.collection('user').doc(res.user.uid).set({username: this.username, email: this.email, alamat: ''});
              this.$router.push('/auth/login');
            });
        })
        .catch((error) => {
          this.$refs.alert.show(error.message);
        });
      },
    },
  }
</script>