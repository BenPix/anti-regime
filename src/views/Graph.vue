<template>
  <div id="graph">
    <div class="text-center mt-5" v-if="!userData.goalIsDefined">
      <div class="mt-5">
        <p>Vous n'avez pas encore enregistré votre objectif.</p>
        <router-link :to="'/goal'" class="btn btn-lg btn-secondary">
          Mon Objectif
        </router-link>
      </div>
    </div>
    <div v-else>
      <h1>Graphique de votre avancement dans ce régime</h1>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Graph",
  computed: {
    ...mapState(["userData"]),
  },
};
</script>

<style>
</style>