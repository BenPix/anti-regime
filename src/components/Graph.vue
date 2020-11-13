<template>
  <div id="graph">
    <div class="p-md-5 m-md-5 p-sm-1 m-sm-1 position-relative w-90 h-90">
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
import Graph from "../services/GraphiqueService";
import { findWeighingsForGraph } from "../services/UserService";
import { perteCaloriqueMaximale } from "../services/RegimeService";
import arrondir from "../services/ArrondirDeficit";

export default {
  name: "Graph",
  data() {
    return {
      loaded: false,
      weighings: [],
      graph: null,
    };
  },
  methods: {
    ...mapActions(["toCompleteTitle"]),
  },
  computed: {
    ...mapState(["userData", "accountType", "userWeighings"]),
    perteCaloriqueMax() {
      let perte = perteCaloriqueMaximale(this.userData);

      return arrondir(perte);
    },
    offset() {
      if (this.weighings.length > 156) return 156;

      return this.weighings.length;
    },
    chartdata() {
      return {
        userData: this.userData,
        labels: this.graph.semaines.slice(0, this.offset),
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
            data: this.graph.courbe.slice(0, this.offset + 1),
            pointRadius: 0,
            fill: {
              disabled: true,
            },
          },
          {
            label: "Perte maximale autorisée",
            borderColor: "#ff0000",
            data: new Graph(this.perteCaloriqueMax).courbeMax.slice(
              0,
              this.offset + 1
            ),
            borderDash: [10, 5],
            pointRadius: 0,
            fill: {
              disabled: true,
            },
          },
          {
            label: "Perte maximale",
            borderColor: "#FF6600",
            data: this.graph.courbeMax.slice(0, this.offset + 1),
            borderDash: [10, 5],
            pointRadius: 0,
            fill: {
              disabled: true,
            },
          },
          {
            label: "Perte minimale",
            borderColor: "#000066",
            data: this.graph.courbeMin.slice(0, this.offset + 1),
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
        maintainAspectRatio: false,
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
    this.graph = new Graph(this.userData.goalDeficit);
    console.log(this.graph.courbe);
    this.loaded = false;
    this.toCompleteTitle("Graphique");

    findWeighingsForGraph(this, this.userData)
      .then((weighingsData) => {
        this.weighings = weighingsData;
        this.loaded = true;
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