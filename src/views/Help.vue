<template>
  <div id="help">
    <h3 class="mb-5">Tableau des activités physiques</h3>
    <table class="table table-light table-bordered table-striped">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Sport</th>
          <th scope="col">Coefficient</th>
          <th scope="col">Dépense pour 1h (en Kcal)</th>
          <th scope="col">Détail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sport in sports" :key="sport.id">
          <td :title="sport.detail">{{ sport.sport }}</td>
          <td>{{ sport.coef }}</td>
          <td>{{ depense(sport.coef) }}</td>
          <td>{{ sport.detail }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { readSportDepense } from "../services/SportDepense";

export default {
  name: "help",
  data() {
    return {
      sports: [
        {
          id: 1,
          sport: "Marche",
          coef: 2,
          detail: "Marche lente 3km/h",
        },
        {
          id: 2,
          sport: "Marche",
          coef: 3.5,
          detail: "Marche 5km/h",
        },
        {
          id: 3,
          sport: "Marche",
          coef: 5,
          detail: "Marche lente 6.5km/h",
        },
      ],
    };
  },
  methods: {
    depense(coef) {
      return Math.round(this.userData.poids * coef);
    },
  },
  computed: {
    ...mapState(["userData"]),
  },
  created() {
    readSportDepense()
      .then((res) => {
        this.sports = res.data.results;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
#help {
  padding: 10%;
}
</style>