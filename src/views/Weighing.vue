<template>
  <div id="weighing" class="text-left">
    <div>
      <img src="../assets/fat-people-icon-vector.jpg" alt="fat-people-icon" />
    </div>
    <b-card :bg-variant="messageContainer">
      <div v-if="weightSubmited">
        <p class="text-white text-center h1">Enregistré !</p>
        <button class="btn btn-lg btn-dark mt-4" @click="weightAgain">
          Enregistrer une nouvelle pesée
        </button>
      </div>
      <b-form @submit.stop.prevent="onSubmit" v-else>
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
    <router-link :to="'/dashboard'" class="btn btn-lg btn-secondary mt-4">
      Retour
    </router-link>
    <div id="tableau-de-pesee">
      <hr />
      <h3>Historique de vos pesées</h3>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Poids</th>
            <th scope="col">Date</th>
            <th scope="col">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(weighing, index) in weighings" :key="weighing.date">
            <td>{{ weighing.poids }} kg</td>
            <td>{{ weighing.date }}</td>
            <td>
              <button
                class="btn btn-primary"
                @click="deleteRow(weighing.id, index)"
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
import { mapActions, mapState } from "vuex";
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
      messageContainer: "light",
      weightSubmited: false,
    };
  },
  computed: {
    ...mapState(["userData"]),
  },
  methods: {
    ...mapActions(["toCompleteTitle"]),
    today() {
      const today = new Date(Date.now());
      const dayNumber =
        (today.getDate().length === 1 ? "" : "0") + today.getDate();

      this.date =
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + dayNumber;
    },
    onSubmit() {
      weightUser(this.poids, this.date, this.userData.id)
        .then(() => {
          // on efface le formulaire, affiche le message à la place, et affiche
          // 2 boutons, un pour revenir au tableau de bord, l'autre pour réafficher le form
          this.messageContainer = "success";
          this.weightSubmited = true;
          // refresh du tableau des pesées
          return findWeighings(this.userData.id);
        })
        .then((res) => {
          this.weighings = res.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteRow(weigh_id, row_id) {
      deleteWeigh(weigh_id).then(() => {
        this.weighings.splice(row_id, 1);
      });
    },
    weightAgain() {
      this.messageContainer = "light";
      this.weightSubmited = false;
    },
  },
  mounted() {
    this.toCompleteTitle("Pesée du jour");

    // find today's date for default value of input with date type
    this.date = today();

    // find the user's weighings
    findWeighings(this.userData.id)
      .then((res) => {
        this.weighings = res.data.results;
      })
      .catch((err) => {
        console.log(err);
      });
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
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  max-width: 20%;
}
</style>