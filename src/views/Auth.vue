<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
        >
        <img
          src="../images/logo.png"
        >
        </v-avatar>

        <v-btn
          v-for="link in links"
          :key="link"
          text
        >
          <div v-if="link == 'Lukabapak'">
            <router-link to="/" class="black--text text-decoration-none">{{ link }}</router-link>          </div>
          <div v-else 
          @click="maintenance()"
          >
            {{ link }}
          </div>
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
        <snack-bars ref="alert"></snack-bars>
          <v-col>
            <v-sheet
              min-height="80vh"
              rounded="lg"
            >

            <div class="pa-4 pt-16 pr-12">
              <v-row align="center" justify="center" class="ma-2" style="height: 450px">
                <v-col
                  cols="10"
                  sm="6"
                >
                  <p style="font-family: 'Roadgeek'; font-size: 52pt; text-align: center;">LuKaBaPaK</p>
                </v-col>
                <v-col
                  cols="10"
                  sm="6"
                  class="mt-12"
                >

                <router-view></router-view>
                  
                </v-col>
              </v-row>
            </div>
            
              <!-- <router-view></router-view> -->

            </v-sheet>
          </v-col>

        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SnackBars from '@/components/SnackBars';
  export default {
    data: () => ({
      links: [
        'Lukabapak',
        'Kontak',
        'Tentang',
      ],
    }),
    methods: {
      maintenance() {
        this.$refs.alert.show("Maaf, fitur akan segera hadir...","yellow darken-3");
      }
    },
    components: {
      SnackBars,
    }
  }
</script>