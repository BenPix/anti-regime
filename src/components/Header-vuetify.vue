<template>
  <div id="header">
    <v-app-bar app dark>
      <v-toolbar-title>
        <router-link
          v-if="signedIn"
          class="text-decoration-none text-white font-weight-bold"
          to="/dashboard"
          >ANTI-REGIME</router-link
        ><router-link
          v-else
          class="text-decoration-none text-white font-weight-bold"
          to="/"
          >ANTI-REGIME</router-link
        ></v-toolbar-title
      >

      <v-spacer></v-spacer>

      <div v-if="signedIn">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon class="ml-3 text-decoration-none" to="/profile">
              <v-icon v-bind="attrs" v-on="on">mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <span>Profil</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              class="ml-3 text-decoration-none"
              to="/sign-out"
              disabled
            >
              <v-icon v-bind="attrs" v-on="on">mdi-logout</v-icon>
            </v-btn>
          </template>
          <span>Déconnexion</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon class="ml-3 text-decoration-none" to="/help">
              <v-icon v-bind="attrs" v-on="on">mdi-help</v-icon>
            </v-btn>
          </template>
          <span>Aide</span>
        </v-tooltip>
      </div>
      <div v-else>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon class="ml-3 text-decoration-none" to="/sign-in">
              <v-icon v-bind="attrs" v-on="on">mdi-login</v-icon>
            </v-btn>
          </template>
          <span>Se connecter</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon class="ml-3 text-decoration-none" to="/sign-up">
              <v-icon v-bind="attrs" v-on="on">mdi-account-edit</v-icon>
            </v-btn>
          </template>
          <span>S"inscrire</span>
        </v-tooltip>
      </div>
    </v-app-bar>
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