<template>
  <v-row>
    <v-col
      cols="12"
      sm="8"
    >
      <v-sheet
        min-height="10px"
        rounded="lg"
        class="pa-6"
      >
        <v-responsive width="100%">
          <v-text-field
            prepend-icon="mdi-magnify"
            dense
            flat
            hide-details
            rounded
            solo-inverted
            label="Cari sesuatu..."
            v-model="keyword"
          ></v-text-field>
        </v-responsive>

        <!--  -->
        
      </v-sheet>

      <v-row class="mt-2">
        <v-col
          v-for="produk in filterProduk"
          :key="produk.nama"
          cols="4"
        >
          <v-card
            max-width="300"
            :elevation="0"
          >
            <v-img
              height="200"
              :src="produk.gambar"
            ></v-img>

            <v-card-text>
              <div class="black--text">{{ produk.nama.substring(0,40) + "..."  }}</div>
              <div class="text-h5 font-weight-bold black--text">
                {{ rupiah(produk.harga) }}
              </div>

              <v-row
                align="center"
                class="mx-0 my-0"
              >
                <v-icon
                  right
                  color="amber"
                  size="14"
                  dense
                  class="mx-0"
                >
                  mdi-star
                </v-icon>

                <div class="grey--text ms-2 text-caption" >
                  4.5 | Terjual 100 rb++
                </div>
              </v-row>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-actions >
              <v-btn
                class="ma-2"
                color="green"
                dark
                :elevation="0"
                @click="tambahItemKeKeranjang(produk)"
              >
                + Keranjang
                <v-icon
                  dark
                  right
                >
                  mdi-cart-plus
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

    </v-col>

    <v-col
      cols="12"
      sm="4"
    >
      <v-sheet
        rounded="lg"
        min-height="100"
      >
        <Keranjang></Keranjang>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { db } from '../db';
import Keranjang from '@/components/Keranjang';
import { mapActions } from 'vuex';

  export default {
    data: () => ({
      Produks: [],
      keyword: '',
    }),
    computed: {
      filterProduk: function() {
        return this.Produks.filter((produk) => {
          return produk.nama.toLowerCase().includes(this.keyword.toLowerCase());
        });
      }
    },
    firestore: {
      Produks: db.collection('produk')
    },
    methods: {
      ...mapActions(["tambahItemKeKeranjang"]),
      goToPage(name) {
        this.$router.push({name: name});
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
    },
    components: {
      Keranjang
    }
  }
</script>