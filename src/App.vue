<template>
  <v-app id="inspire">
    
    <v-app-bar
      app
      :value="false"
    >
    </v-app-bar>

    <router-view></router-view>

  </v-app>
</template>

<style>
@font-face {
  font-family: "Roadgeek";
  src: local("Roadgeek"),   url(./fonts/roadgeek.ttf) format("truetype");}
</style>

<script>
  export default {
    data: () => ({
      drawer: null,
      value: 1,
      documents: [],
    })
    
  }
</script>