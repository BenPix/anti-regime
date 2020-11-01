<template>
  <v-app>
    <VueHeadful
      :title="mainTitle"
      description="Votre application pour maigrir sainement"
    />
    <Header :signedIn="Boolean(userData.id)"></Header>
    <router-view />
    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from "./components/Header-vuetify.vue";
import Footer from "./components/Footer-vuetify.vue";
import { mapState } from "vuex";
import VueHeadful from "vue-headful";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Header,
    Footer,
    VueHeadful,
  },
  computed: {
    ...mapState(["mainTitle", "userData"]),
  },
  created() {
    console.log("app is created");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
