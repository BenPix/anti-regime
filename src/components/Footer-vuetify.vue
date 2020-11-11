<template>
  <div id="footer">
    <v-footer dark app absolute>
      <v-col class="text-center" cols="12">
        Copyright {{ new Date().getFullYear() }} - BenPix
      </v-col>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
</style>