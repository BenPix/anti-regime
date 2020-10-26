<template>
  <div id="goal-synthese">
    <b-card
      header="Synthèse de votre programme"
      header-bg-variant="success"
      header-text-variant="white"
      border-variant="success"
    >
      <b-card-text class="mb-3 text-left">
        <h4>Poids ciblé</h4>
        {{ userData.goalWeight }}kg
      </b-card-text>
      <b-card-text class="mb-3 text-left">
        <h4>Déficit en calorie quotidien</h4>
        {{ userData.goalDeficit }}Kcal
      </b-card-text>
      <b-card-text class="mb-3 text-left">
        <h4>Durée estimée pour atteindre votre objectif</h4>
        {{ goalTimeText }}
      </b-card-text>
      <b-card-text class="mb-3 text-left">
        <h4>Stratégie pour parvenir au déficit ciblé</h4>
        <ul>
          <li>
            <h5>Maximiser les dépenses par l'activité physique</h5>
            <p>Dépense physique : {{ depenseMax }}Kcal.</p>
            <p>
              Cela équivaut à réaliser de façon quotidienne l'une des activités suivantes :
              <ul v-if="loaded">
                <li>{{ exempleDepenseMax.marche }} minutes de <u :title="detailMarche.detail">marche</u></li>
                <li>{{ exempleDepenseMax.course }} minutes de <u :title="detailCourse.detail">course</u></li>
                <li>{{ exempleDepenseMax.cyclisme }} minutes de <u :title="detailCyclisme.detail">vélo</u></li>
                <li>{{ exempleDepenseMax.natation }} minutes de <u :title="detailNatation.detail">natation</u></li>
                <li>{{ exempleDepenseMax.aerobic }} minutes d'aérobic</li>
              </ul>
            </p>
            <p>Réduction calorique : {{ reductionMin }}Kcal.</p>
            <p>Vous aurez donc besoin d'un apport calorique quotidien de {{ besoinCaloriqueActuel - reductionMin }} Kcal.</p>
          </li>
          <li>
            <h5>Maximiser la réduction des apports caloriques</h5>
            <p>Dépense physique : {{ depenseMin }}Kcal.</p>
            <p v-if="depenseMin > 0">
              Cela équivaut à réaliser de façon quotidienne l'une des activités suivantes :
              <ul v-if="loaded">
                <li>{{ exempleDepenseMin.marche }} minutes de <u :title="detailMarche.detail">marche</u></li>
                <li>{{ exempleDepenseMin.course }} minutes de <u :title="detailCourse.detail">course</u></li>
                <li>{{ exempleDepenseMin.cyclisme }} minutes de <u :title="detailCyclisme.detail">vélo</u></li>
                <li>{{ exempleDepenseMin.natation }} minutes de <u :title="detailNatation.detail">natation</u></li>
                <li>{{ exempleDepenseMin.aerobic }} minutes d'aérobic</li>
              </ul>
            </p>
            <p>Réduction calorique : {{ reductionMax }}Kcal.</p>
            <p>Vous aurez donc besoin d'un apport calorique quotidien de {{ besoinCaloriqueActuel - reductionMax }} Kcal.</p>
          </li>
          <li>
            <h5>
              Équilibrer les dépenses physiques et la réduction des apports
              caloriques
            </h5>
            <p>Dépense physique : {{ depenseMix }}Kcal.</p>
            <p>
              Cela équivaut à réaliser de façon quotidienne l'une des activités suivantes :
              <ul v-if="loaded">
                <li>{{ exempleDepenseMix.marche }} minutes de <u :title="detailMarche.detail">marche</u></li>
                <li>{{ exempleDepenseMix.course }} minutes de <u :title="detailCourse.detail">course</u></li>
                <li>{{ exempleDepenseMix.cyclisme }} minutes de <u :title="detailCyclisme.detail">vélo</u></li>
                <li>{{ exempleDepenseMix.natation }} minutes de <u :title="detailNatation.detail">natation</u></li>
                <li>{{ exempleDepenseMix.aerobic }} minutes d'aérobic</li>
              </ul>
            </p>
            <p>Réduction calorique : {{ reductionMix }}Kcal.</p>
            <p>Vous aurez donc besoin d'un apport calorique quotidien de {{ besoinCaloriqueActuel - reductionMix }} Kcal.</p>
          </li>
        </ul>
      </b-card-text>
      <b-card-text class="mb-3 text-left">
        <h4>J'en serai où à l'issue de ce régime ?</h4>
        <p>Vous nécessiterez d'un apport calorique quotidien de {{ besoinCaloriqueFinal }}Kcal, si toutefois vous maintenez le même rythme (activités physiques de base et sportives) qu'auparavant.</p>
        <p>Si vous maintenez une activité physique adoptée pendant le régime, les calories dépensées pourront s'ajouter à votre apport quotiden.</p>
        <p>Vous pouvez simuler une nouvelle inscription, en remplissant vos données personnelles, pour avoir un aperçu de votre besoin calorique quotidien.</p>
      </b-card-text>
      <button class="btn btn-dark" type="button" @click="$emit('cancel')">
        Modifier mon choix
      </button>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import conversionSemainesEnDureeText from "../services/ConversionSemainesEnDureeText";
import { besoinCalorique, strategieDeficit } from "../services/RegimeService";
import { readSportDepenseForExamples } from "../services/SportDepense";

export default {
  name: "GoalSynthese",
  data() {
    return {
      sportDepenseListe: [],
      loaded: false,
    };
  },
  props: {
    perteCaloriqueMax: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapActions(["setOrUnsetGoal"]),
    determinerDepensePhysique(depense) {
      // détermine le temps d'activité pour chaque 'sport' en fonction du poids, pour atteindre une dépense donnée
      const rapportDepensePoidsMinute = depense / (this.userData.poids / 60);
      const marche = this.detailMarche;
      const course = this.detailCourse;
      const cyclisme = this.detailCyclisme;
      const natation = this.detailNatation;
      const aerobic = this.detailAerobic;

      return {
        marche: Math.round(rapportDepensePoidsMinute / marche?.coef),
        course: Math.round(rapportDepensePoidsMinute / course?.coef),
        cyclisme: Math.round(rapportDepensePoidsMinute / cyclisme?.coef),
        natation: Math.round(rapportDepensePoidsMinute / natation?.coef),
        aerobic: Math.round(rapportDepensePoidsMinute / aerobic?.coef),
      };
    },
  },
  computed: {
    ...mapState(["userData"]),
    detailMarche() {
      return this.sportDepenseListe.find((sport) => sport?.sport === "Marche");
    },
    detailCourse() {
      return this.sportDepenseListe.find((sport) => sport?.sport === "Course");
    },
    detailCyclisme() {
      return this.sportDepenseListe.find(
        (sport) => sport?.sport === "Cyclisme"
      );
    },
    detailNatation() {
      return this.sportDepenseListe.find(
        (sport) => sport?.sport === "Natation"
      );
    },
    detailAerobic() {
      return this.sportDepenseListe.find((sport) => sport?.sport === "Aérobic");
    },
    besoinCaloriqueActuel() {
      return besoinCalorique(this.userData, this.userData.poids);
    },
    besoinCaloriqueFinal() {
      return besoinCalorique(this.userData);
    },
    goalTimeText() {
      return conversionSemainesEnDureeText(this.userData.goalTime);
    },
    depenseMax() {
      return strategieDeficit(
        this.perteCaloriqueMax,
        this.userData.goalDeficit,
        "depense"
      ).depense;
    },
    depenseMix() {
      return strategieDeficit(this.perteCaloriqueMax, this.userData.goalDeficit)
        .depense;
    },
    depenseMin() {
      return strategieDeficit(
        this.perteCaloriqueMax,
        this.userData.goalDeficit,
        "reduction"
      ).depense;
    },
    reductionMax() {
      return strategieDeficit(
        this.perteCaloriqueMax,
        this.userData.goalDeficit,
        "reduction"
      ).reduction;
    },
    reductionMix() {
      return strategieDeficit(this.perteCaloriqueMax, this.userData.goalDeficit)
        .reduction;
    },
    reductionMin() {
      return strategieDeficit(
        this.perteCaloriqueMax,
        this.userData.goalDeficit,
        "depense"
      ).reduction;
    },
    exempleDepenseMax() {
      return this.determinerDepensePhysique(this.depenseMax);
    },
    exempleDepenseMix() {
      return this.determinerDepensePhysique(this.depenseMix);
    },
    exempleDepenseMin() {
      return this.determinerDepensePhysique(this.depenseMin);
    },
  },
  created() {
    this.loaded = false;
    readSportDepenseForExamples()
      .then((result) => {
        this.sportDepenseListe = result.data.results;
        this.loaded = true;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style>
</style>