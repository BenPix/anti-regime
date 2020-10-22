<template>
  <div id="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
      <main role="main" class="inner cover">
        <h1 class="cover-heading">Anti-Régime</h1>
        <p class="lead detail">
          Bienvenue sur le site qui vous propose un vrai régime, basé sur des
          études scientifiques. Pas d'effet yo-yo, des contraintes supportables,
          et un résultat pour la vie.
        </p>
        <p class="lead essayer">
          <router-link
            v-if="Boolean(userData.id)"
            :to="'/dashboard'"
            class="btn btn-lg btn-secondary"
          >
            Tableau de bord
          </router-link>
          <router-link v-else :to="'/sign-up'" class="btn btn-lg btn-secondary">
            Je veux essayer !
          </router-link>
        </p>
      </main>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  methods: {
    ...mapActions(["toCompleteTitle"]),
  },
  computed: {
    ...mapState(["userData"]),
  },
  mounted() {
    this.toCompleteTitle("Accueil");
  },
};
</script>

<style scoped>
.detail {
  width: 50%;
  margin: 0 25% 0 25%;
}
.essayer {
  margin-top: 30px;
}
</style>