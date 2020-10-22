<template>
  <div id="sign-out">
    <h2>Déconnexion en cours...</h2>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SignOut",
  methods: {
    ...mapActions(["toSignOut", "toCompleteTitle"]),
  },
  mounted() {
    this.toCompleteTitle("Déconnexion");
    this.toSignOut();
    this.$router.push({ name: "home" });
  },
};
</script>

<style>
</style>