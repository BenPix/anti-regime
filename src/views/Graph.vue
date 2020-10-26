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
    <div class="p-5 m-5 position-relative w-90 h-90" v-else>
      <LineChart
        v-if="loaded"
        :chartdata="chartdata"
        :options="options"
      ></LineChart>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import LineChart from "../components/LineChart";
import { graph, semaines } from "../services/GraphiqueService";
import { findWeighingsForGraph } from "../services/UserService";
import { perteCaloriqueMaximale } from "../services/RegimeService";
import arrondir from "../services/ArrondirDeficit";

export default {
  name: "Graph",
  data() {
    return {
      loaded: false,
      weighings: [],
      chartdatatest: null,
      optionstest: null,
    };
  },
  methods: {
    ...mapActions(["toCompleteTitle"]),
  },
  computed: {
    ...mapState(["userData"]),
    perteAttendue() {
      return graph.rapportDureeDeficit["cal" + this.userData.goalDeficit];
    },
    perteCaloriqueMax() {
      let perte = perteCaloriqueMaximale(this.userData);

      return arrondir(perte);
    },
    perteMaxAutorisee() {
      return graph.rapportDureeDeficit["cal" + this.perteCaloriqueMax];
    },
    offset() {
      //const taille = this.weighings.length;
      return this.weighings
        .length; /*

      if (taille <= 26) return 26;
      else if (taille <= 52) return 52;
      else if (taille <= 78) return 78;
      else if (taille <= 104) return 104;
      else if (taille <= 130) return 130;
      else return 156;*/
    },
    chartdata() {
      return {
        userData: this.userData,
        labels: semaines.slice(0, this.offset + 1),
        datasets: [
          {
            label: "Votre perte",
            borderColor: "#339900",
            data: this.weighings,
            pointHoverRadius: 50,
            fill: {
              disabled: true,
            },
          },
          {
            label: "Perte attendue moyenne",
            borderColor: "#D3D3D3",
            data: this.perteAttendue.slice(0, this.offset),
            pointRadius: 0,
            fill: {
              disabled: true,
            },
          },
          {
            label: "Perte maximale autorisée",
            borderColor: "#ff0000",
            data: graph.graphMax(this.perteMaxAutorisee.slice(0, this.offset)),
            borderDash: [10, 5],
            pointRadius: 0,
            fill: {
              disabled: true,
            },
          },
          {
            label: "Perte maximale",
            borderColor: "#FF6600",
            data: graph.graphMax(this.perteAttendue.slice(0, this.offset)),
            borderDash: [10, 5],
            pointRadius: 0,
            fill: {
              disabled: true,
            },
          },
          {
            label: "Perte minimale",
            borderColor: "#000066",
            data: graph.graphMin(this.perteAttendue.slice(0, this.offset)),
            borderDash: [10, 5],
            pointRadius: 0,
            fill: {
              disabled: true,
            },
          },
        ],
      };
    },
    options() {
      return {
        // these are the default values events
        events: ["click", "mousemove", "mouseout", "touchstart", "touchmove"],
        // called when mouseup or click
        /*onClick: function (data) {
          console.log(data);
        },
        // called when any other events fire
        onHover: function (data) {
          console.log(data);
        },*/
        tooltips: {
          userData: this.userData,
          mode: "point",
          intersect: false,
          callbacks: {
            title: function (tooltipItem) {
              return "Semaine N°" + tooltipItem[0].index;
            },
            footer: function (tooltipItem) {
              return (
                "Votre poids moyen: " +
                (this._data.userData.poids - tooltipItem[0].value)
              );
            },
          },
        },
        title: {
          display: true,
          fontSize: 30,
          text:
            "Suivi du poids - Déficit de " + this.userData.goalDeficit + "Kcal",
        },
        spanGaps: true,
        maintainAspectRatio: true,
        scales: {
          yAxes: [
            {
              ticks: {
                precision: 2,
                stepSize: 0.5,
              },
            },
          ],
        },
      };
    },
  },
  mounted() {
    console.log("the graph is now mounted");
    console.log("let's see if weighings is set :");
    console.log(this.weighings);
    this.loaded = false;
    this.toCompleteTitle("Graphique");

    findWeighingsForGraph(this.userData)
      .then((weighingsData) => {
        this.weighings = weighingsData;
        this.loaded = true;
        console.log(
          "weighings are now set via the API, let's refresh weighings :"
        );
        console.log(this.weighings);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  components: {
    LineChart,
  },
};
</script>

<style>
</style>