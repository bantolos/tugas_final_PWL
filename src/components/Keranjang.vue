<template>
  <v-card
    class="mx-auto"
    max-width="500"
    :elevation="0"
  >
  <snack-bars ref="alert"></snack-bars>
    <v-toolbar
      color=""
      :elevation="0"
    >
      <v-toolbar-title>Keranjang</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-icon>mdi-cart</v-icon>
    </v-toolbar>

    <v-divider class="mb-2"></v-divider>
    <v-list subheader>
      <v-list-item
        v-for="item in keranjang"
        :key="item.id"
      >
        <v-avatar
            :alt="`${item.nama}`"
            tile
            size="40"
            class="mr-2"
          >
          <img
            :src="item.gambar"
          >
        </v-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.nama"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon :color="'grey lighten-2'" @click="kurangiJumlahItemKeranjang(item.id)">
            mdi-minus-circle-outline
          </v-icon>
          <div class="jumlah mx-4">
            {{ item.jumlah }}
          </div>
          <v-icon :color="'grey lighten-2'" class="mr-4" @click="tambahJumlahItemKeranjang(item.id)">
            mdi-plus-circle-outline
          </v-icon>
          <v-icon :color="'grey lighten-1'" @click="hapusItemDariKeranjang(item.id)">
            mdi-delete
          </v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
    <div class="ngehide" v-show="totalHarga > 0">
      <v-divider class="mt-2"></v-divider>

      <v-list subheader>
        <v-subheader>Total Harga</v-subheader>
        <v-list-item>
          <v-list-item-content class="ma-0 pa-0">
            <v-list-item-title class="font-weight-bold text-h4">{{ rupiah(totalHarga) }}</v-list-item-title>
            <v-btn
                class="mt-4"
                color="green"
                dark
                :elevation="0"
                @click="checkOutKeranjang()"
              >
                Beli
              </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <div class="ngehide" v-show="totalHarga == 0">
      <v-list subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">Wah, keranjang belanjamu kosong</v-list-item-title>
            <v-list-item-title class="font-weight-light">Yuk, isi dengan barang-barang impianmu!</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-card>
</template>

<script>
import { db } from '../db';
import { mapActions, mapGetters } from 'vuex'
import SnackBars from '@/components/SnackBars';
import moment from 'moment'

  export default {
    data: () => ({
    }),
    created() {
      moment.locale('id')
    },
    computed: {
      ...mapGetters(["user", "keranjang"]),
      totalHarga() {
        return this.keranjang.reduce((a, b) => a + b.harga * b.jumlah, 0);
      }
    },
    methods: {
      ...mapActions(["tambahJumlahItemKeranjang", "kurangiJumlahItemKeranjang", "hapusItemDariKeranjang", "kosongkanKeranjang"]),
      currentDateTime() {
        return moment(new Date()).format('D MMMM YYYY hh:mm:ss')
      },
      invoiceId() {
        return 'INV/' + moment(new Date()).format('DMMYYYY') + '/' + moment(new Date()).format('hhmmss')
      },
      rupiah(nominal) {
        const formatter = new Intl.NumberFormat('en-ID', {
          style: 'currency',
          currency: 'IDR'
        }).format(nominal)
        .replace(/[IDR]/gi, '')
        .replace(/(\.+\d{2})/, '')
        .trimLeft()
        return "Rp"+formatter
      },
      checkOutKeranjang() {
        if(this.user.data.alamat != '') {
          db.collection('user').doc(this.user.uid).collection('transaksi').add({keranjang: this.keranjang, tanggal: this.currentDateTime(), totalHarga: this.totalHarga, id:this.invoiceId()});
          this.$refs.alert.show("Berhasil dibeli! Silakan cek menu 'Transaksi'","green darken-1");
          this.kosongkanKeranjang();
        } else {
          this.$refs.alert.show("Isikan alamat kamu terlebih dahulu! (pilih menu 'Profil')","red accent-2");
          setTimeout( () => this.$router.push({ path: '/profil'}), 2500);
        }
      }
    },
    components: {
      SnackBars,
    },
  }
</script>
