<template>
  <div id="dashboard">
    <v-main class="pt-0">
      <!-- le titre -->

      <v-parallax
        :src="require('@/assets/tb-5.jpg')"
        :height="$vuetify.breakpoint.height - 60"
        dark
      >
        <v-container class="rien" fill-height fluid>
          <v-row>
            <v-col cols="12">
              <h1 class="text-capitalize font-weight-bold">Tableau de bord</h1>
            </v-col>
          </v-row>
        </v-container>
      </v-parallax>

      <!-- le graphique -->

      <v-container v-if="showedChart" class="pt-10">
        <Graph v-if="userData.goalIsDefined"></Graph>
      </v-container>

      <!-- le formulaire de pesée + liste des pesées -->

      <v-container class="pt-10">
        <Weighing v-on:weighing-update="refreshChart"></Weighing>
      </v-container>

      <!-- CARD 1 - objectif -->

      <v-container class="my-16">
        <v-row calign="center" justify="center">
          <v-col cols="12" md="6">
            <router-link to="/goal" class="text-decoration-none">
              <v-card hover rounded="xl">
                <v-card-title class="purple laighten-2">
                  <v-icon light size="50" class="ma-auto"> mdi-target </v-icon>
                </v-card-title>
                <v-card-text class="pa-5">
                  <h2 v-if="userData.goalIsDefined" class="font-weight-light">
                    Je modifie mon objectif
                  </h2>
                  <h2 v-else class="font-weight-light">Je fixe mon objectif</h2>
                </v-card-text>
                <v-divider></v-divider>
                <v-btn
                  v-show="!cardOpened2"
                  light
                  fab
                  bottom
                  @click="toggleCard2"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <div v-show="cardOpened2">
                  <v-card-text>
                    <v-timeline dense>
                      <v-timeline-item>
                        <v-card light>
                          <v-card-title class="headline">
                            Fixe le
                          </v-card-title>
                          <v-card-text>
                            Lis bien les conseils, et détermine ton objectif
                            selon tes capacités et tes désirs.
                          </v-card-text>
                        </v-card>
                      </v-timeline-item>
                      <v-timeline-item>
                        <v-card light>
                          <v-card-title class="headline">
                            Modifie le
                          </v-card-title>
                          <v-card-text>
                            Tu peux à tout moment le modifier. Si par exemple tu
                            remarques que tu as du mal à suivre ton objectif,
                            revois le à la baisse. Ou si tu as été obligé de
                            répartir ton régime sur plusieurs étapes, et que tu
                            viens d'en passer une.
                          </v-card-text>
                        </v-card>
                      </v-timeline-item>
                      <v-timeline-item>
                        <v-card light>
                          <v-card-title class="headline"
                            >Vérifie ta courbe</v-card-title
                          >
                          <v-card-text>
                            Ton objectif fixé, le graphique va te montrer les
                            écarts min et max entre lesquels tu dois rester. Si
                            tu t'en écartes, revois ton objectif ou adapte ton
                            régime. Ne dépasse surtout pas la ligne rouge !
                            Sinon ton métabolisme va s'adapter à ton régime, et
                            tu vas inévitablement reprendre tout le poids perdu.
                          </v-card-text>
                        </v-card>
                      </v-timeline-item>
                    </v-timeline>
                  </v-card-text>
                  <v-btn
                    v-show="cardOpened2"
                    light
                    fab
                    bottom
                    @click="toggleCard2"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </div>
              </v-card>
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>
    
<script>
import { mapActions, mapState } from "vuex";
import Graph from "../components/Graph.vue";
import Weighing from "../components/Weighing.vue";

export default {
  name: "Dashboard",
  data() {
    return {
      cardOpened1: false,
      cardOpened2: false,
      showedChart: true,
    };
  },
  methods: {
    ...mapActions(["toCompleteTitle", "toToggleGoalDefined"]),
    toggleCard1(event) {
      event.preventDefault();
      this.cardOpened1 = !this.cardOpened1;
    },
    toggleCard2(event) {
      event.preventDefault();
      this.cardOpened2 = !this.cardOpened2;
    },
    refreshChart() {
      this.showedChart = false;
      setTimeout(() => {
        this.showedChart = true;
      }, 100);
    },
  },
  computed: {
    ...mapState(["userData", "userWeighings"]),
  },
  mounted() {
    this.toCompleteTitle("Tableau de bord");
  },
  components: {
    Graph,
    Weighing,
  },
};
</script>

<style scoped>
h1 {
  font-size: 5em;
}
@media only screen and (max-width: 600px) {
  h1 {
    font-size: 4em;
  }
}
</style>