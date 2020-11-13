<template>
  <div id="goal">
    <!-- affichage du formulaire de choix de l'objectif -->

    <div class="container text-left mb-5" v-if="!userData.goalIsDefined">
      <b-card bg-variant="light">
        <b-form @submit.stop.prevent="doNothing">
          <h3>Mon objectif</h3>
          <b-form-group
            id="poids-group"
            label="Saisissez le poids visé en kg (arrondi à l'unité):"
            label-for="poids"
          >
            <b-form-input
              id="poids"
              class="objectif-poids"
              type="number"
              min="0"
              :max="userData.poids - 1"
              placeholder="ex: 85"
              required
              v-model="$v.poids.$model"
              :state="validateState('poids')"
              aria-describedby="poids-feedback"
            >
            </b-form-input>
            <b-form-invalid-feedback id="poids-feedback"
              >Votre poids doit être compris entre 0 et
              {{ userData.poids }}kg</b-form-invalid-feedback
            >
          </b-form-group>
        </b-form>
      </b-card>
    </div>

    <!-- affichage des 3 programmes de régime -->

    <b-card-group deck v-if="!userData.goalIsDefined">
      <!-- programme 1 -->

      <b-card
        class="text-center pointer"
        header="Programme basique"
        :header-bg-variant="headerBgBasique"
        :header-text-variant="headerTextBasique"
        :border-variant="borderBasique"
        title="Calories à réduire"
        footer="Choisir ce programme"
        @click="onSubmitBasique"
        @mouseover="hoverChoiceBasique"
        @mouseleave="leaveChoiceBasique"
      >
        <b-card-text>{{ perteCaloriqueMin }} kCal / jour</b-card-text>
        <b-card-text
          ><h4>Durée estimée</h4>
          {{ dureeMaxText }}</b-card-text
        >
        <b-card-text
          ><h4>Détails</h4>
          Cela implique de garder ce rythme de vie pour toujours. Votre apport
          calorique quotidien devra être de {{ besoinCaloriqueFinal }} pendant
          le régime, ainsi qu'à l'issue du régime.</b-card-text
        >
      </b-card>

      <!-- programme 2 -->

      <b-card
        class="text-center pointer"
        header="Programme personnalisé"
        :header-bg-variant="headerBgPerso"
        :header-text-variant="headerTextPerso"
        :border-variant="borderPerso"
        title="Calories à réduire"
        footer="Choisir ce programme"
        @click="onSubmitPerso"
        @mouseover="hoverChoicePerso"
        @mouseleave="leaveChoicePerso"
      >
        <b-card-text
          ><b-form @submit.stop.prevent="onSubmit" @click.stop="doNothing">
            <b-form-group>
              <b-form-input
                id="deficit"
                type="number"
                :min="perteCaloriqueMin"
                step="100"
                :max="perteCaloriqueMax"
                placeholder="ex: 200"
                v-model="$v.deficit.$model"
                :state="validateState('deficit')"
                aria-describedby="deficit-feedback"
              >
              </b-form-input>
            </b-form-group>
          </b-form>
          kCal / jour</b-card-text
        >
        <b-card-text
          ><h4>Durée estimée</h4>
          {{ dureePersonnaliseeText }}</b-card-text
        >
        <b-card-text
          ><h4>Détails</h4>
          Choisissez votre rythme si les programmes rapide et basique ne vous
          conviennent pas.</b-card-text
        >
      </b-card>

      <!-- programme 3 -->

      <b-card
        class="text-center pointer"
        header="Programme rapide"
        :header-bg-variant="headerBgRapide"
        :header-text-variant="headerTextRapide"
        :border-variant="borderRapide"
        title="Calories à réduire"
        footer="Choisir ce programme"
        @click="onSubmitRapide"
        @mouseover="hoverChoiceRapide"
        @mouseleave="leaveChoiceRapide"
      >
        <b-card-text>{{ perteCaloriqueMax }} kCal / jour</b-card-text>
        <b-card-text
          ><h4>Durée estimée</h4>
          {{ dureeMinText }}</b-card-text
        >
        <b-card-text
          ><h4>Détails</h4>
          Il n'est pas possible d'aller plus vite que ce programme. Enfin si,
          c'est possible, mais cela impliquera un changement de votre
          métabolisme, et vous finirez par reprendre tout le poids perdu,
          inévitablement.</b-card-text
        >
      </b-card>
    </b-card-group>

    <!-- a garder pour tester dans goal - le CARD 3 pourrait être le format des cards -->

    <v-container v-if="!userData.goalIsDefined">
      <v-row calign="center" justify="center">
        <!-- CARD 1 -->
        <v-col cols="12" md="4">
          <router-link to="/weighing" class="text-decoration-none">
            <v-card hover rounded="xl">
              <v-card-title class="purple darken-3">
                <v-icon dark size="50" class="ma-auto">
                  mdi-weight-kilogram
                </v-icon>
              </v-card-title>
              <v-card-text class="pa-5">
                <h2 class="font-weight-light">Je me pèse</h2>
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>
        <!-- CARD 2 -->
        <v-col cols="12" md="4">
          <v-card hover rounded="xl">
            <v-card-title class="purple laighten-2">
              <v-icon dark size="50" class="ma-auto"> mdi-target </v-icon>
            </v-card-title>
            <v-card-text class="pa-5">
              <h2 class="font-weight-light">Mon objectif</h2>
            </v-card-text>
          </v-card>
        </v-col>
        <!-- CARD 3 -->
        <v-col cols="12" md="4">
          <v-card height="70%">
            <v-img
              class="white--text align-end"
              :src="require('@/assets/nice-card-bg.jpg')"
              height="100px"
            >
              <v-card-title>Je me pèse</v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- fin des 3 programmes de régime -->

    <GoalSynthese
      v-else
      @cancel="cancelGoalChoice"
      :perteCaloriqueMax="perteCaloriqueMax"
    ></GoalSynthese>
  </div>
</template>

<script>
import { required, between } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";
import { goalUser } from "../services/UserService";
import conversionSemainesEnDureeText from "../services/ConversionSemainesEnDureeText";
import {
  dureeRegime,
  besoinCalorique,
  perteCaloriqueMinimale,
  perteCaloriqueMaximale,
} from "../services/RegimeService";
import arrondir from "../services/ArrondirDeficit";
import GoalSynthese from "../components/GoalSynthese";

export default {
  name: "Goal",
  data() {
    return {
      buttonText: "J'enregistre mon objectif",
      buttonType: "submit",
      borderBasique: "",
      headerBgBasique: "",
      headerTextBasique: "",
      borderPerso: "",
      headerBgPerso: "",
      headerTextPerso: "",
      borderRapide: "primary",
      headerBgRapide: "primary",
      headerTextRapide: "white",
      poids: 70,
      deficit: 100,
    };
  },
  watch: {
    poids: function () {
      this.deficit = this.perteCaloriqueMin;
    },
  },
  methods: {
    ...mapActions(["toCompleteTitle", "setOrUnsetGoal"]),
    doNothing() {},
    onSubmitBasique: function () {
      this.$v.$touch();
      if (this.$v.$anyError) {
        return;
      }

      this.saveGoal(this.perteCaloriqueMin, this.dureeMax);
    },
    onSubmitPerso: function () {
      this.$v.$touch();
      if (this.$v.$anyError) {
        return;
      }

      this.saveGoal(this.deficit, this.dureePersonnalisee);
    },
    onSubmitRapide: function () {
      this.$v.$touch();
      if (this.$v.$anyError) {
        return;
      }

      this.saveGoal(this.perteCaloriqueMax, this.dureeMin);
    },
    saveGoal(perte, duree) {
      goalUser(this.accountType, this.userData.id, this.poids, perte)
        .then(() => {
          const goalData = {
            goalIsDefined: true,
            goalWeight: this.poids,
            goalDeficit: perte,
            goalTime: duree,
          };
          this.setOrUnsetGoal(goalData);
        })
        .catch((err) => {
          console.log(err); // deal with error
        });
    },
    hoverChoiceBasique: function () {
      this.borderBasique = "success";
      this.headerBgBasique = "success";
      this.headerTextBasique = "white";
    },
    leaveChoiceBasique: function () {
      this.borderBasique = "";
      this.headerBgBasique = "";
      this.headerTextBasique = "";
    },
    hoverChoicePerso: function () {
      this.borderPerso = "success";
      this.headerBgPerso = "success";
      this.headerTextPerso = "white";
    },
    leaveChoicePerso: function () {
      this.borderPerso = "";
      this.headerBgPerso = "";
      this.headerTextPerso = "";
    },
    hoverChoiceRapide: function () {
      this.borderRapide = "success";
      this.headerBgRapide = "success";
      this.headerTextRapide = "white";
    },
    leaveChoiceRapide: function () {
      this.borderRapide = "primary";
      this.headerBgRapide = "primary";
      this.headerTextRapide = "white";
    },
    cancelGoalChoice() {
      const goalData = {
        goalIsDefined: false,
      };
      this.setOrUnsetGoal(goalData);
      this.leaveChoiceBasique();
      this.leaveChoicePerso();
      this.leaveChoiceRapide();
    },
    validateState: function (name) {
      const { $dirty, $error } = this.$v[name];

      return $dirty ? !$error : null;
    },
  },
  computed: {
    ...mapState(["userData", "accountType"]),
    besoinCaloriqueFinal() {
      return besoinCalorique(this.userData);
    },
    perteCaloriqueMin() {
      let perte = perteCaloriqueMinimale(this.userData, this.poids);

      return arrondir(perte);
    },
    dureeMax() {
      const pertePoidsVisee = this.userData.poids - this.poids;

      return dureeRegime(this.perteCaloriqueMin, pertePoidsVisee);
    },
    dureeMaxText() {
      return conversionSemainesEnDureeText(this.dureeMax);
    },
    dureePersonnalisee() {
      const deficit = Math.round(this.deficit / 100) * 100;
      const pertePoidsVisee = this.userData.poids - this.poids;

      return dureeRegime(deficit, pertePoidsVisee);
    },
    dureePersonnaliseeText() {
      return conversionSemainesEnDureeText(this.dureePersonnalisee);
    },
    perteCaloriqueMax() {
      let perte = perteCaloriqueMaximale(this.userData);

      return arrondir(perte);
    },
    dureeMin() {
      const pertePoidsVisee = this.userData.poids - this.poids;

      return dureeRegime(this.perteCaloriqueMax, pertePoidsVisee);
    },
    dureeMinText() {
      return conversionSemainesEnDureeText(this.dureeMin);
    },
  },
  validations() {
    return {
      poids: {
        required,
        between: between(0, this.userData.poids - 1),
      },
      deficit: {
        between: between(100, this.perteCaloriqueMax),
      },
    };
  },
  mounted() {
    this.toCompleteTitle("Objectif");
    this.deficit = this.perteCaloriqueMin;
  },
  components: {
    GoalSynthese,
  },
};
</script>

<style scoped>
#goal {
  padding-top: 2%;
  padding-left: 10%;
  padding-bottom: 10%;
  padding-right: 10%;
}
@media only screen and (max-width: 600px) {
  form {
    margin-bottom: 50px;
  }
}
.pointer {
  cursor: pointer;
}
.objectif-poids {
  font-size: 5em;
}
</style>