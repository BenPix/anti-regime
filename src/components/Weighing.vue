<template>
  <div id="weighing" class="text-left">
    <v-snackbar
      v-model="snackbar"
      timeout="1500"
      color="success"
      outlined
      centered
      elevation="10"
      >Pesée enregistrée
    </v-snackbar>
    <b-card bg-variant="light">
      <b-form @submit.stop.prevent="onSubmit">
        <h3>Je me pèse</h3>
        <b-form-group id="poids-group" label="Mon poids:" label-for="poids">
          <b-form-input
            id="poids"
            name="poids"
            type="number"
            step="0.1"
            min="0"
            max="600"
            required
            v-model="poids"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group
          id="date-group"
          label="Jour de la pesée:"
          label-for="date"
        >
          <b-form-input
            id="date"
            name="date"
            type="date"
            required
            v-model="date"
          >
          </b-form-input>
        </b-form-group>
        <BasicButton :type="buttonType" :text="buttonText"></BasicButton>
        <p class="text-danger mt-3" v-if="serverError">
          La connexion au serveur a échoué, veuillez recommencer.
        </p>
      </b-form>
    </b-card>
    <div id="tableau-de-pesee" v-if="weighings.length > 0" class="mt-10">
      <h3>Historique de vos pesées</h3>
      <table class="table table-bordered table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Poids</th>
            <th scope="col">Date</th>
            <th scope="col">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(weighing, index) in weighings" :key="weighing.id">
            <td>{{ weighing.poids }} kg</td>
            <td>{{ weighing.date }}</td>
            <td>
              <button
                class="btn btn-primary"
                @click.stop="deleteRow(weighing.id, index)"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import BasicButton from "../components/BasicButton.vue";
import {
  weightUser,
  findWeighings,
  deleteWeigh,
} from "../services/UserService";
import { today } from "../services/Today";

export default {
  name: "Weighing",
  data() {
    return {
      snackbar: false,
      buttonText: "Enregistrer",
      buttonType: "submit",
      poids: 70,
      date: "",
      serverError: false,
      columnsTitles: [
        { label: "Poids", field: "poids", sortable: true, type: "Number" },
        { label: "Date", field: "date", sortable: true, type: "String" },
      ],
      weighings: [],
    };
  },
  computed: {
    ...mapState(["userData", "accountType", "userWeighings"]),
    ...mapGetters(["getUserWeighings"]),
  },
  methods: {
    ...mapActions(["toCompleteTitle", "toRegisterWeight", "toDeleteWeight"]),
    today() {
      const today = new Date(Date.now());
      const dayNumber = (today.getDate() > 9 ? "" : "0") + today.getDate();

      return (
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + dayNumber
      );
    },
    onSubmit() {
      weightUser(this, this.poids, this.date, this.userData.id)
        .then(() => {
          this.snackbar = true;
          // refresh du tableau des pesées
          return findWeighings(this, this.userData.id);
        })
        .then((res) => {
          this.weighings = res.data.results;
          this.$emit("weighing-update");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteRow(weighId, rowId) {
      deleteWeigh(this, weighId)
        .then(() => {
          this.weighings.splice(rowId, 1);
          this.$emit("weighing-update");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.toCompleteTitle("Pesée du jour");

    // find today's date for default value of input with date type
    this.date = today();

    // find the user's weighings
    if (this.accountType === "local") {
      this.weighings = this.getUserWeighings;
    } else {
      findWeighings(this, this.userData.id)
        .then((res) => {
          this.weighings = res.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  components: {
    BasicButton,
  },
};
</script>

<style scoped>
#weighing {
  padding-top: 2%;
  padding-left: 10%;
  padding-bottom: 10%;
  padding-right: 10%;
}
</style>