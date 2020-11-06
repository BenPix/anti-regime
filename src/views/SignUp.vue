<template>
  <div id="sign-up" class="text-left">
    <div>
      <img src="../assets/fat-people-icon-vector.jpg" alt="fat-people-icon" />
    </div>
    <b-card bg-variant="light">
      <p class="text-center font-weight-bold text-dark lead" v-if="submited">
        Votre compte a été créé.
      </p>
      <p class="text-center font-weight-bold text-dark lead" v-if="submited">
        Bienvenue dans l'aventure !
      </p>
      <b-form @submit.stop.prevent="onSubmit" v-else>
        <h3>Données de connexion</h3>
        <b-form-group
          id="email-group"
          label="Adresse email:"
          label-for="email"
          description="Votre adresse email restera confidentielle"
        >
          <b-form-input
            id="email"
            name="email"
            type="email"
            required
            v-model="$v.form.email.$model"
            :state="validateState('email')"
            aria-describedby="email-feedback"
            @input="resetEmailValidation"
          >
          </b-form-input>
          <b-form-invalid-feedback id="email-feedback"
            >Votre adresse email n'est pas valide</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group
          id="password-group"
          label="Mot de passe:"
          label-for="password"
        >
          <b-form-input
            id="password"
            name="password"
            type="password"
            required
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
            required
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
          label="Entrez votre prénom:"
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
            >Votre prénom est requis et doit avoir une longueur maximale de 50
            caractères</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group
          id="naissance-group"
          label="Saisissez votre date de naissance:"
          label-for="naissance"
        >
          <b-form-input
            id="naissance"
            type="date"
            placeholder="jj/mm/aaaa"
            required
            v-model="$v.form.naissance.$model"
            :state="validateState('naissance')"
            aria-describedby="naissance-feedback"
          >
          </b-form-input>
          <b-form-invalid-feedback id="naissance-feedback"
            >Votre date de naissance doit être valide</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group label="Saisissez votre genre:">
          <b-form-radio-group id="sexe-group" name="sexe" v-model="form.sexe">
            <b-form-radio value="M">Masculin</b-form-radio>
            <b-form-radio value="F">Féminin</b-form-radio>
          </b-form-radio-group>
        </b-form-group>

        <b-form-group
          id="taille-group"
          label="Saisissez votre taille en cm:"
          label-for="taille"
        >
          <b-form-input
            id="taille"
            type="number"
            min="0"
            max="300"
            placeholder="ex: 175"
            required
            v-model="$v.form.taille.$model"
            :state="validateState('taille')"
            aria-describedby="taille-feedback"
          >
          </b-form-input>
          <b-form-invalid-feedback id="taille-feedback"
            >Votre taille doit être comprise entre 0 et
            300cm</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group
          id="poids-group"
          label="Saisissez votre poids en kg (arrondi à l'unité):"
          label-for="poids"
        >
          <b-form-input
            id="poids"
            type="number"
            min="0"
            max="600"
            placeholder="ex: 85"
            required
            v-model="$v.form.poids.$model"
            :state="validateState('poids')"
            aria-describedby="poids-feedback"
          >
          </b-form-input>
          <b-form-invalid-feedback id="poids-feedback"
            >Votre poids doit être compris entre 0 et
            600kg</b-form-invalid-feedback
          >
        </b-form-group>

        <h3>Activités physiques</h3>
        <b-form-group
          id="activite-physique-base-group"
          label="Quelle est votre activité physique de base ?"
          label-for="activite-physique-base"
        >
          <b-form-select
            id="activite-physique-base"
            v-model="form.activitePhysiqueBase"
            :options="form.activitesPhysiquesBase"
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="activite-faible-group"
          label="Saisissez le nombre d'heures / semaine d'activités (sportives) de faible intensité:"
          label-for="activite-faible"
          description="(marche lente, yoga, billard, etc)"
        >
          <b-form-input
            id="activite-faible"
            type="number"
            min="0"
            max="70"
            required
            v-model="$v.form.activiteFaible.$model"
            :state="validateState('activiteFaible')"
            aria-describedby="activite-faible-feedback"
          >
          </b-form-input>
          <b-form-invalid-feedback id="activite-faible-feedback"
            >Cette durée d'activité doit être comprise entre 0 et 70
            heures</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group
          id="activite-moyenne-group"
          label="Saisissez le nombre d'heures / semaine d'activités (sportives) de moyenne intensité:"
          label-for="activite-moyenne"
          description="(marche rapide, vélo, etc)"
        >
          <b-form-input
            id="activite-moyenne"
            type="number"
            min="0"
            max="70"
            required
            v-model="$v.form.activiteMoyenne.$model"
            :state="validateState('activiteMoyenne')"
            aria-describedby="activite-moyenne-feedback"
          >
          </b-form-input>
          <b-form-invalid-feedback id="activite-moyenne-feedback"
            >Cette durée d'activité doit être comprise entre 0 et 70
            heures</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group
          id="activite-forte-group"
          label="Saisissez le nombre d'heures / semaine d'activités (sportives) de forte intensité:"
          label-for="activite-forte"
          description="(jogging, squash, etc)"
        >
          <b-form-input
            id="activite-forte"
            type="number"
            min="0"
            max="70"
            required
            v-model="$v.form.activiteForte.$model"
            :state="validateState('activiteForte')"
            aria-describedby="activite-forte-feedback"
          >
          </b-form-input>
          <b-form-invalid-feedback id="activite-forte-feedback"
            >Cette durée d'activité doit être comprise entre 0 et 70
            heures</b-form-invalid-feedback
          >
        </b-form-group>

        <BasicButton :type="buttonType" :text="buttonText"></BasicButton>
        <span class="warning-email-error" v-if="form.invalidEmail"
          >Ce compte existe déjà.</span
        >
      </b-form>
    </b-card>
    <div id="calories" v-if="!submited">
      <p>Votre besoin énergétique quotidien</p>
      <h3>{{ besoinCalorique }} kCal</h3>
    </div>
  </div>
</template>

<script>
import { dateValidation } from "../services/ValidationRules";
import { createUser, checkUserExists } from "../services/UserService";
import { besoinCalorique } from "../services/RegimeService";
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs,
  between,
} from "vuelidate/lib/validators";
import BasicButton from "../components/BasicButton";
import { mapActions } from "vuex";

export default {
  components: {
    BasicButton,
  },
  name: "SignUp",
  data() {
    return {
      buttonText: "Je crée mon compte",
      buttonType: "submit",
      submited: false,
      form: {
        email: "",
        password: "",
        passwordConfirm: "",
        prenom: "",
        naissance: "2000-01-01",
        sexe: "M",
        taille: 175,
        poids: 75,
        activitePhysiqueBase: 1.4,
        activitesPhysiquesBase: [
          {
            value: 1.4,
            text:
              "Très faible (programmeur informatique, chauffeur de taxi, caissier, etc)",
          },
          {
            value: 1.5,
            text:
              "Faible (programmeur informatique, chauffeur de taxi, caissier, etc)",
          },
          {
            value: 1.6,
            text:
              "Modéré (programmeur informatique, chauffeur de taxi, caissier, etc)",
          },
          {
            value: 1.7,
            text:
              "Important (programmeur informatique, chauffeur de taxi, caissier, etc)",
          },
        ],
        activiteFaible: 0,
        activiteMoyenne: 0,
        activiteForte: 0,
        invalidEmail: false,
      },
    };
  },
  methods: {
    ...mapActions(["toCompleteTitle"]),
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      checkUserExists(this.form.email)
        .then((res) => {
          if (Object.keys(res.data.user).length !== 0) {
            this.form.invalidEmail = true;
          }
        })
        .catch((err) => {
          console.log(err); // deal with error
        })
        .finally(() => {
          if (this.form.invalidEmail) {
            return;
          }
          createUser(this.form)
            .then(() => {
              this.submited = true;
            })
            .catch((err) => {
              console.log(err); // deal with error
            });
        });
    },
    resetEmailValidation() {
      this.form.invalidEmail = false;
      this.$v.$reset;
    },
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];

      if (name === "email") {
        return ($dirty ? !$error : null) ? !this.form.invalidEmail : null;
      }

      return $dirty ? !$error : null;
    },
  },
  computed: {
    besoinCalorique() {
      return besoinCalorique(
        {
          goalWeight: 0,
          sexe: this.form.sexe,
          naissance: this.form.naissance,
          activitePhysiqueBase: this.form.activitePhysiqueBase,
          activiteFaible: this.form.activiteFaible,
          activiteMoyenne: this.form.activiteMoyenne,
          activiteForte: this.form.activiteForte,
          taille: this.form.taille,
        },
        this.form.poids
      );
    },
  },
  mounted() {
    this.toCompleteTitle("Inscription");
  },
  validations: {
    form: {
      email: {
        required,
        maxLength: maxLength(50),
        email,
      },
      password: {
        required,
        minLength: minLength(1),
      },
      passwordConfirm: {
        required,
        sameAsPassword: sameAs("password"),
      },
      prenom: {
        required,
        maxLength: maxLength(50),
      },
      naissance: {
        required,
        dateValidation,
      },
      taille: {
        required,
        between: between(0, 300),
      },
      poids: {
        required,
        between: between(0, 600),
      },
      activiteFaible: {
        required,
        between: between(0, 70),
      },
      activiteMoyenne: {
        required,
        between: between(0, 70),
      },
      activiteForte: {
        required,
        between: between(0, 70),
      },
    },
  },
};
</script>

<style scoped>
#sign-up {
  padding: 10%;
}
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  max-width: 20%;
}
#calories {
  position: fixed;
  right: 50px;
  top: 100px;
  background-color: green;
  padding: 10px;
  color: white;
}
@media only screen and (max-width: 600px) {
  #calories {
    font-size: 0.7em;
    right: 15px;
    top: 70px;
    max-width: 40%;
  }
  form {
    margin-bottom: 50px;
  }
}
.warning-email-error {
  margin-left: 20px;
  color: red;
}
</style>