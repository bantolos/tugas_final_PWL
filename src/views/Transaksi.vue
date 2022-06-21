<template>
  <v-container fluid>
    <v-row justify="center">
      <div v-if="Transaksi.length < 1">
        <v-row dense>
          <v-col cols="12">
            <v-card
              color="#385F73"
              dark
            >
              <v-card-title class="text-h5 mt-12">
                Belum ada transaksi!
              </v-card-title>

              <v-card-subtitle>Transaksi akan muncul apabila kamu membeli barang.</v-card-subtitle>

              <v-card-actions>
                <v-btn text>
                  <router-link to="/toko" style="text-decoration: none; color: inherit;">Beli Sekarang</router-link>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <v-expansion-panels popout class="mt-6">
        <v-expansion-panel
          v-for="transaksi in Transaksi"
          :key="transaksi"
          hide-actions
        >
          <v-expansion-panel-header>
            <v-row
              align="center"
              class="spacer"
              no-gutters
            >
              <v-col
                cols="4"
                sm="2"
                md="1"
              >
                <v-avatar
                  size="36px"
                  tile
                >
                  <v-img
                  :src="transaksi.keranjang[0].gambar"
                  ></v-img>
                </v-avatar>
              </v-col>
              <v-col
                class="hidden-xs-only"
                sm="5"
                md="3"
              >
                <strong>{{ transaksi.tanggal }}</strong>
                <span
                  class="grey--text"
                >
                  &nbsp;({{ transaksi.keranjang.length }})
                </span>
              </v-col>

              <v-col
                class="text-no-wrap"
                cols="5"
                sm="3"
              >
                <v-chip
                  color="green lighten-4"
                  class="ml-0 mr-2 black--text"
                  label
                  small
                >
                  Selesai
                </v-chip>
                <strong>#{{ transaksi.id }}</strong>
              </v-col>

              <v-col
                class="grey--text text-truncate hidden-sm-and-down"
              >
                &mdash;
                {{ moment(transaksi.tanggal, 'D MMMM YYYY hh:mm:ss').fromNow() }}
              </v-col>
            </v-row>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-divider></v-divider>
            <v-list-item three-line
              v-for="item in transaksi.keranjang"
              :key="item"
              >
              <v-list-item-avatar tile>
                <v-img :src="item.gambar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ item.nama }} x{{ item.jumlah }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ rupiah(item.harga) }} x{{ item.jumlah }}
                </v-list-item-subtitle>
                <v-list-item-subtitle class="text-h6 font-weight-bold">
                  {{ rupiah(item.harga * item.jumlah) }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>Total Belanja</v-list-item-title>
                <v-list-item-subtitle-list-item-subtitle class="text-h5 font-weight-bold">{{ rupiah(transaksi.totalHarga) }}</v-list-item-subtitle-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>


<script>
import { db } from '../db'
import { mapGetters } from 'vuex'
import moment from 'moment'

  export default {
    computed: {
      ...mapGetters(["user"]),
    },
    data: () => ({
      Transaksi: null,
      userid: null,
    }),
    methods: {
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
      bindData() {
        db.collection('user')
        .doc(this.userid).collection('transaksi')
        .get()
        .then(querySnapshot => {
          this.Transaksi = querySnapshot.docs.map(doc => doc.data())
        })
      }
    },
    created() {
      moment.locale('id')
    },
    mounted() {
        db.collection('user')
        .doc(this.user.uid).collection('transaksi')
        .get()
        .then(querySnapshot => {
          this.Transaksi = querySnapshot.docs.map(doc => doc.data())
        })
    },
    watch: {
      user(promise) {
        this.userid = promise.uid;
        this.bindData();
      }
    },
  }
</script>