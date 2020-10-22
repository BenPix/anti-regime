<template>
  <div id="footer" class="footer">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-nav-text class="m-auto"> Copyright 2020 - BenPix </b-nav-text>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
html {
  position: relative;
  min-height: 100%;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: #000000;
  color: #ffffff;
}
</style>