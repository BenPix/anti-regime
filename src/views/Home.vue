<template>
  <div id="home">
    <v-main>
      <!-- présentation 1 -->
      <div class="bg-container" style="margin-top: -64px; margin-bottom: 64px">
        <v-parallax
          dark
          :src="require('@/assets/3.jpg')"
          :height="$vuetify.breakpoint.height - 60"
        >
          <div class="bg-container-end" style="padding-top: 64px">
            <v-container :style="windowHeight">
              <v-row class="mt-16">
                <v-col col="12">
                  <h1 class="cover-heading text-capitalize font-weight-black">
                    Retrouve ton poids de forme pour de bon
                  </h1>
                  <p class="lead detail mb-5">
                    Le secret, c'est de contrôler ta perte de poids. La science
                    l'a démontré. Je vais t'aider à maîtriser ta perte de poids
                    grâce à une méthode basée sur des études scientifiques.
                  </p>
                  <v-btn x-large color="red" elevation="4">
                    <router-link
                      class="text-decoration-none text-white"
                      v-if="Boolean(userData.id)"
                      :to="'/dashboard'"
                    >
                      Tableau de bord
                    </router-link>
                    <router-link
                      class="text-decoration-none text-white"
                      v-else
                      :to="'/sign-up'"
                    >
                      Je veux essayer !
                    </router-link>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-parallax>
      </div>

      <!-- présentation 2 -->

      <v-container :style="windowHeight" class="my-16">
        <v-row>
          <v-col col="12">
            <h1 class="cover-heading text-capitalize font-weight-black">
              Suis la méthode inspirée de cet ouvrage de référence
            </h1>
            <a
              href="https://www.belin-editeur.com/lantiregime"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="Vue logo"
                src="../assets/livre.jpg"
                height="200px"
                class="mb-5"
            /></a>
            <p class="lead detail">
              Je vais t'aider à suivre cette méthode le plus simplement
              possible. Tu n'auras qu'à choisir ton programme, te peser, et
              vérifier ta courbe. C'est tout&nbsp;! Si tu as suffisamment de
              patience, tu y arriveras.
            </p>
          </v-col>
        </v-row>
      </v-container>

      <!-- cards -->

      <div class="bg-container mt-n16 mb-16">
        <v-parallax
          dark
          :src="require('@/assets/4.jpg')"
          :height="$vuetify.breakpoint.height"
        >
          <div class="bg-container-end pt-16 pb-16 mt-16 mb-16">
            <v-container :style="windowHeight">
              <v-row class="mt-16">
                <v-col cols="12" md="6">
                  <v-card width="80%" class="m-auto">
                    <v-icon x-large color="red" class="mt-3"
                      >mdi-weight-lifter</v-icon
                    >
                    <v-card-title class="justify-center text-h4"
                      >Programme personnalisé</v-card-title
                    >
                    <v-card-text class="text-subtitle-1"
                      >Tu auras le choix entre 3 programmes plus ou moins
                      rapide. Donc plus ou moins contraignant.</v-card-text
                    >
                  </v-card>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card width="80%" class="m-auto">
                    <v-icon x-large color="purple" class="mt-3"
                      >mdi-chart-line</v-icon
                    >
                    <v-card-title class="justify-center text-h4"
                      >Graphique de progression</v-card-title
                    >
                    <v-card-text class="text-subtitle-1"
                      >Ce graphique dynamique sera ton outil principal pour
                      déterminer si tu es sur la bonne voie.</v-card-text
                    >
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-card width="80%" class="m-auto">
                    <v-icon x-large color="green" class="mt-3"
                      >mdi-target-account</v-icon
                    >
                    <v-card-title class="justify-center text-h4"
                      >Bilan personnel</v-card-title
                    >
                    <v-card-text class="text-subtitle-1"
                      >Ton bilan personnel sera dressé selon ton profil. Il te
                      permettra d'y voir plus clair.</v-card-text
                    >
                  </v-card>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card width="80%" class="m-auto">
                    <v-icon x-large color="blue" class="mt-3"
                      >mdi-weight-kilogram</v-icon
                    >
                    <v-card-title class="justify-center text-h4"
                      >Pesées en ligne</v-card-title
                    >
                    <v-card-text class="text-subtitle-1"
                      >Tu pourras enregistrer tes pesées directement sur le
                      site. Les moyennes sont calculées
                      automatiquement.</v-card-text
                    >
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-parallax>
      </div>

      <!-- avis client -->

      <v-container class="mb-15" :style="windowHeight">
        <v-row class="mt-16">
          <v-col col="12">
            <h1 class="cover-heading text-capitalize font-weight-black">
              Ils y sont arrivés
            </h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-avatar size="100" color="orange darken-3" class="mb-5 text-white"
              >Amandine</v-avatar
            >
            <v-rating
              length="5"
              readonly
              size="30"
              :value="5"
              color="yellow darken-3"
              class="mb-5"
            ></v-rating>
            <v-card shaped>
              <v-card-title>Un livre qui m'a ouvert les yeux</v-card-title>
              <v-card-text class="font-italic">
                "Je suis tombée par hasard sur le livre de Michel Desmurget, et
                celui-ci a changé ma vie. Après avoir enchaîné les régimes
                restrictifs pendant des années, j'ai enfin trouvé le moyen de
                perdre du poids lentement mais sûrement, sans frustration ni
                régime. Complet et compréhensif, ce livre est plein de bons
                conseils pour qui souhaite perdre du poids sans effet yoyo. Je
                recommande !"
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-avatar size="100" color="green darken-4" class="mb-5 text-white"
              >Anne D.</v-avatar
            >
            <v-rating
              length="5"
              readonly
              size="30"
              :value="5"
              color="yellow darken-3"
              class="mb-5"
            ></v-rating>
            <v-card shaped>
              <v-card-title>Excellent livre</v-card-title>
              <v-card-text class="font-italic">
                "Très efficace lorsque l'on suit les conseils."
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-avatar
              size="100"
              color="light-blue darken-4"
              class="mb-5 text-white"
              >Chantal R.</v-avatar
            >
            <v-rating
              length="5"
              readonly
              size="30"
              :value="5"
              color="yellow darken-3"
              class="mb-5"
            ></v-rating>
            <v-card shaped>
              <v-card-title
                >Enfin un livre traitant un sujet avec sérieux.</v-card-title
              >
              <v-card-text class="font-italic">
                "Enfin une étude scientifique pour aider à maigrir loin du
                charlatanisme habituel. Ce livre apporte un éclairage nouveau
                sur le fonctionnement du corps humain très intéressant.
                N’hesitez pas à le lire."
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      testing: 0,
      height: "",
    };
  },
  methods: {
    ...mapActions(["toCompleteTitle"]),
    test() {
      if (this.testing === 0) this.testing = 1;
      else if (this.testing === 1) this.testing = 2;
      else this.testing = 0;
    },
  },
  computed: {
    ...mapState(["userData"]),
    windowHeight() {
      return "min-height:" + this.$vuetify.breakpoint.height + "px";
    },
  },
  mounted() {
    this.toCompleteTitle("Accueil");
  },
};
</script>

<style scoped>
.detail {
  width: 50%;
  margin: 0 25% 0 25%;
}
h1 {
  font-size: 3em;
  width: 80%;
  margin: auto;
  margin-bottom: 30px;
}
p {
  font-size: 1.5em;
}
</style>