<template>
  <div id="profile">
    <ul class="text-left">
      <li v-for="(value, name) in userData" :key="name">
        {{ name }} : {{ value }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Profile",
  methods: {
    ...mapActions(["toCompleteTitle"]),
  },
  computed: {
    ...mapState(["userData"]),
  },
  mounted() {
    this.toCompleteTitle("Profil");
  },
};
</script>

<style>
</style>