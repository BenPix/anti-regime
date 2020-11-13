<template>
  <div id="profile" class="text-left">
    <div>
      <img src="../assets/fat-people-icon-vector.jpg" alt="fat-people-icon" />
    </div>
    <h1 class="text-center mb-5">Profil de {{ userData.prenom }}</h1>
    <b-card bg-variant="light">
      <b-form-group
        label="Adresse email:"
        label-for="email"
        v-if="accountType === 'remote'"
      >
        <b-form-input name="email" :value="userData.email" disabled>
        </b-form-input>
      </b-form-group>

      <b-form-group label="Sexe:" label-for="sexe">
        <b-form-input name="sexe" :value="userData.sexe" disabled>
        </b-form-input>
      </b-form-group>

      <b-form-group label="Date de naissance:" label-for="naissance">
        <b-form-input name="naissance" :value="naissanceFormated" disabled>
        </b-form-input>
      </b-form-group>

      <b-form-group label="Poids:" label-for="poids">
        <b-form-input name="poids" :value="userData.poids" disabled>
        </b-form-input>
      </b-form-group>

      <b-form-group label="Taille:" label-for="taille">
        <b-form-input name="taille" :value="userData.taille" disabled>
        </b-form-input>
      </b-form-group>

      <b-form-group
        label="Activité physique de base:"
        label-for="activitePhysiqueBase"
      >
        <b-form-input
          name="activitePhysiqueBase"
          :value="activitesPhysiquesBase"
          disabled
        >
        </b-form-input>
      </b-form-group>

      <b-form-group
        label="Activité physique de faible intensité: (en heures par semaine)"
        label-for="activiteFaible"
      >
        <b-form-input
          name="activiteFaible"
          :value="userData.activiteFaible"
          disabled
        >
        </b-form-input>
      </b-form-group>

      <b-form-group
        label="Activité physique de moyenne intensité: (en heures par semaine)"
        label-for="activiteMoyenne"
      >
        <b-form-input
          name="activiteMoyenne"
          :value="userData.activiteMoyenne"
          disabled
        >
        </b-form-input>
      </b-form-group>

      <b-form-group
        label="Activité physique de forte intensité: (en heures par semaine)"
        label-for="activiteForte"
      >
        <b-form-input
          name="activiteForte"
          :value="userData.activiteForte"
          disabled
        >
        </b-form-input>
      </b-form-group>

      <b-form-group label="Votre poids cible:" label-for="goalWeight">
        <b-form-input name="goalWeight" :value="userData.goalWeight" disabled>
        </b-form-input>
      </b-form-group>

      <b-form-group label="Votre déficit cible:" label-for="goalDeficit">
        <b-form-input name="goalDeficit" :value="userData.goalDeficit" disabled>
        </b-form-input>
      </b-form-group>
    </b-card>

    <div v-if="accountType === 'remote'">
      <div v-if="submited">
        <p class="text-white text-center h1">Profil modifié avec succès !</p>
        <button class="btn btn-lg btn-dark mt-4" @click="retour">
          Modifier à nouveau mes données
        </button>
      </div>
      <div v-else>
        <h1 class="text-center mt-5 mb-5">Modifier vos données</h1>

        <b-card bg-variant="light">
          <b-form @submit.stop.prevent="onSubmit">
            <h3>Données de connection</h3>
            <b-form-group
              id="password-group"
              label="Mot de passe:"
              label-for="password"
            >
              <b-form-input
                id="password"
                name="password"
                type="password"
                v-model="$v.form.password.$model"
                :state="validateState('password')"
                aria-describedby="password-feedback"
              >
              </b-form-input>
              <b-form-invalid-feedback id="password-feedback"
                >Votre mot de passe doit être composé de minimum 9
                caractères</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group
              id="password-confirm-group"
              label="Confirmez votre mot de passe:"
              label-for="password-confirm"
            >
              <b-form-input
                id="password-confirm"
                name="password-confirm"
                type="password"
                v-model="$v.form.passwordConfirm.$model"
                :state="validateState('passwordConfirm')"
                aria-describedby="password-confirm-feedback"
              >
              </b-form-input>
              <b-form-invalid-feedback id="password-confirm-feedback"
                >Vous n'avez pas confirmé votre mot de
                passe</b-form-invalid-feedback
              >
            </b-form-group>

            <h3>Données personnelles</h3>
            <b-form-group
              id="prenom-group"
              label="Modifiez votre prénom:"
              label-for="prenom"
            >
              <b-form-input
                id="prenom"
                name="prenom"
                required
                v-model="$v.form.prenom.$model"
                :state="validateState('prenom')"
                aria-describedby="prenom-feedback"
              >
              </b-form-input>
              <b-form-invalid-feedback id="prenom-feedback"
                >Votre prénom est requis et doit avoir une longueur maximale de
                50 caractères</b-form-invalid-feedback
              >
            </b-form-group>

            <BasicButton :type="buttonType" :text="buttonText"></BasicButton>
            <span class="warning-email-error" v-if="form.invalidEmail"
              >Ce compte existe déjà.</span
            >
          </b-form>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import {
  required,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";
import BasicButton from "../components/BasicButton";
import { updateUser } from "../services/UserService";

export default {
  name: "Profile",
  components: {
    BasicButton,
  },
  data() {
    return {
      buttonText: "Modifier mes données",
      buttonType: "submit",
      submited: false,
      form: {
        id: 0,
        password: "",
        passwordConfirm: "",
        prenom: "",
      },
    };
  },
  methods: {
    ...mapActions(["toCompleteTitle", "toUpdateUser"]),
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      updateUser(this.form)
        .then(() => {
          this.toUpdateUser(this.form.prenom);
          this.submited = true;
          this.$v.form.password.$model = "";
          this.$v.form.passwordConfirm.$model = "";
        })
        .catch((err) => {
          console.log(err); // deal with error
        });
    },
    retour() {
      this.submited = false;
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];

      return $dirty ? !$error : null;
    },
  },
  computed: {
    ...mapState(["userData", "accountType"]),
    naissanceFormated() {
      console.log(this.userData.naissance);
      let naissance = this.userData.naissance.split("");

      return (
        naissance[8] +
        naissance[9] +
        "/" +
        naissance[5] +
        naissance[6] +
        "/" +
        naissance[0] +
        naissance[1] +
        naissance[2] +
        naissance[3]
      );
    },
    activitesPhysiquesBase() {
      const value = this.userData.activitePhysiqueBase;

      if (value === 1.4)
        return "Très faible (programmeur informatique, chauffeur de taxi, caissier, etc)";
      else if (value === 1.5)
        return "Faible (programmeur informatique, chauffeur de taxi, caissier, etc)";
      else if (value === 1.6)
        return "Modéré (programmeur informatique, chauffeur de taxi, caissier, etc)";
      else if (value === 1.7)
        return "Important (programmeur informatique, chauffeur de taxi, caissier, etc)";

      return "Donnée invalide";
    },
  },
  mounted() {
    this.toCompleteTitle("Profil");
    this.form.prenom = this.userData.prenom;
    this.form.id = this.userData.id;
  },
  validations: {
    form: {
      password: {
        minLength: minLength(1),
      },
      passwordConfirm: {
        sameAsPassword: sameAs("password"),
      },
      prenom: {
        required,
        maxLength: maxLength(50),
      },
    },
  },
};
</script>

<style scoped>
#profile {
  padding: 10%;
}
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  max-width: 20%;
}
@media only screen and (max-width: 600px) {
  form {
    margin-bottom: 50px;
  }
}
</style>