<template>
  <b-button :type="type" variant="dark">{{ text }}</b-button>
</template>

<script>
export default {
  name: "BasicButton",
  props: ["type", "text"],
};
</script>

<style>
</style>