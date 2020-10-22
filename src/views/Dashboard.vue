<template>
  <div id="dashboard" class="p-5">
    <h1>Tableau de bord</h1>
    <div class="">
      <div class="mx-auto my-5">
        <router-link :to="'/weighing'" class="btn btn-lg btn-secondary">
          Je me pèse
        </router-link>
      </div>
      <div class="mx-auto my-5">
        <router-link :to="'/graph'" class="btn btn-lg btn-secondary">
          Mon suivi
        </router-link>
      </div>
      <div class="mx-auto my-5">
        <router-link :to="'/goal'" class="btn btn-lg btn-secondary">
          Mon objectif
        </router-link>
      </div>
    </div>
  </div>
</template>
    
<script>
import { mapActions } from "vuex";

export default {
  name: "Dashboard",
  methods: {
    ...mapActions(["toCompleteTitle"]),
  },
  mounted() {
    this.toCompleteTitle("Tableau de bord");
  },
};
</script>

<style>
</style>