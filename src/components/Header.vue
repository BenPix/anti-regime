<template>
  <div id="header">
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
      <router-link
        v-if="signedIn"
        class="text-decoration-none text-white font-weight-bold"
        to="/dashboard"
        ><b-navbar-brand>ANTI-REGIME</b-navbar-brand></router-link
      ><router-link
        v-else
        class="text-decoration-none text-white font-weight-bold"
        to="/"
        ><b-navbar-brand>ANTI-REGIME</b-navbar-brand></router-link
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto" v-if="signedIn">
          <b-nav-item>
            <router-link class="text-decoration-none text-white" to="/profile"
              >Profil</router-link
            >
          </b-nav-item>
          <b-nav-item>
            <router-link class="text-decoration-none text-white" to="/sign-out"
              >Déconnexion</router-link
            >
          </b-nav-item>
          <b-nav-item>
            <router-link to="/help">
              <b-icon
                icon="question-circle"
                class="text-decoration-none text-white"
              ></b-icon>
            </router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item>
            <router-link class="text-decoration-none text-white" to="/sign-in"
              >Connexion</router-link
            >
          </b-nav-item>
          <b-nav-item>
            <router-link class="text-decoration-none text-white" to="/sign-up"
              >Inscription</router-link
            >
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    signedIn: Boolean,
  },
};
</script>

<style>
</style>