<template>
  <div id="help">
    <h3 class="mb-5">Tableau des activités physiques</h3>
    <table class="table table-light table-bordered table-striped">
      <div class="p-2">
        Minutes d'activité physique :
        <b-form-input
          position="absolute"
          type="number"
          min="1"
          step="1"
          v-model="temps"
          autofocus
          size="sm"
          style="width: 70px"
          class="mx-auto my-2"
        ></b-form-input>
      </div>
      <thead class="thead-dark">
        <tr>
          <th scope="col">Sport</th>
          <th scope="col">Coefficient</th>
          <th scope="col">Dépense (en Kcal)</th>
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
import { mapGetters, mapState } from "vuex";
import { readSportDepense } from "../services/SportDepense";

export default {
  name: "help",
  data() {
    return {
      sports: [],
      temps: 60,
    };
  },
  methods: {
    depense(coef) {
      console.log(this.getUserActualWeight);
      return Math.round((this.getUserActualWeight * coef * this.temps) / 60);
    },
  },
  computed: {
    ...mapState(["userData", "accountType", "userWeighings"]),
    ...mapGetters(["getUserActualWeight"]),
  },
  created() {
    readSportDepense(this.accountType)
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