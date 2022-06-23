<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
  <snack-bars ref="alert"></snack-bars>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Email"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      :rules="[rules.required]"
      name="password"
      label="Password"
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      label="Ingat saya"
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Masuk
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset
    </v-btn>

    <p class="mt-6">Belum mempunyai akun? <router-link :to="{ name: 'Register'}">Daftar</router-link></p>

  </v-form>
</template>

<script>
import * as firebase from "firebase";
import SnackBars from '@/components/SnackBars';


  export default {
    name: "Login",
    components: {
      SnackBars,
    },
    data: () => ({
      show1: false,
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail masih kosong!',
        v => /.+@.+\..+/.test(v) || 'E-mail tidak valid',
      ],
      password: '',
        rules: {
          required: value => !!value || 'Password masih kosong!'
      }
    }),
    methods: {
      validate () {
        if(this.$refs.form.validate())
          this.login()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      goToPage(name) {
        this.$router.push({name: name});
      },
      login() {
        firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
            this.$refs.alert.show("Login berhasil!","green accent-2");
            this.$router.push('/');
        })
        .catch((error) => {
          let errMsg = ''
          switch(error.code) {
            case "auth/invalid-email":
              errMsg = "Email kamu tidak valid!";
              break;
            case "auth/user-not-found":
              errMsg = "Akun dengan email tersebut tidak ditemukan!";
              break;
            case "auth/wrong-password":
              errMsg = "Password yang kamu masukkan salah!";
              break;
            default:
              errMsg = "Email atau password yang kamu masukkan salah!";
              break;
          }
          this.$refs.alert.show(errMsg,"red accent-2");
        });
      },
    },
  }
</script>