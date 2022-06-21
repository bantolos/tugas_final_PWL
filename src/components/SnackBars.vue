<template>
  <div class="text-center">
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :color="warna"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="black"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Tutup
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    name: 'SnackBars',
    data: () => ({
      snackbar: false,
      text: '',
      timeout: 2000,
      warna: '',
    }),
    methods: {
      show(message, warna) {
        this.text = message
        this.snackbar = true
        this.warna = warna
      }
    }
}
</script>
