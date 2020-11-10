<template>
  <div id="sign-up" class="text-left">
    <div v-if="submitedWithNoError">
      <v-alert type="success"
        >Ton compte a été créé avec succès. Bienvenue dans l'aventure ! <br />Tu
        vas être redirigé vers ton tableau de bord.</v-alert
      >
    </div>
    <b-form @submit.stop.prevent.self="onSubmit" v-else>
      <v-stepper v-model="currentStep">
        <!-- header du dynamique form -->

        <v-stepper-header>
          <v-stepper-step v-show="currentStep === 1" step="1">
            Type de compte
          </v-stepper-step>
          <v-stepper-step
            v-show="currentStep === 2"
            step="2"
            :rules="[() => validateState('email')]"
          >
            Adresse email
            <small>Données de connexion</small>
          </v-stepper-step>
          <v-stepper-step
            v-show="currentStep === 3"
            step="3"
            :rules="[() => validateState('password')]"
          >
            Mot de passe
            <small>Données de connexion</small>
          </v-stepper-step>
          <v-stepper-step
            v-show="currentStep === 4"
            step="4"
            :rules="[() => validateState('passwordConfirm')]"
          >
            Confirmation du mot de passe
            <small>Données de connexion</small>
          </v-stepper-step>
          <v-stepper-step
            v-show="currentStep === 5"
            step="5"
            :rules="[() => validateState('prenom')]"
          >
            Prénom
            <small>Données personnelles</small>
          </v-stepper-step>
          <v-stepper-step
            v-show="currentStep === 6"
            step="6"
            :rules="[() => validateState('naissance')]"
          >
            Date de naissance
            <small>Données personnelles</small>
          </v-stepper-step>
          <v-stepper-step v-show="currentStep === 7" step="7">
            Genre
            <small>Données personnelles</small>
          </v-stepper-step>
          <v-stepper-step
            v-show="currentStep === 8"
            step="8"
            :rules="[() => validateState('taille')]"
          >
            Taille
            <small>Données personnelles</small>
          </v-stepper-step>
          <v-stepper-step
            v-show="currentStep === 9"
            step="9"
            :rules="[() => validateState('poids')]"
          >
            Poids
            <small>Données personnelles</small>
          </v-stepper-step>
          <v-stepper-step v-show="currentStep === 10" step="10">
            Activité physique de base
            <small>Activités physiques</small>
          </v-stepper-step>
          <v-stepper-step
            v-show="currentStep === 11"
            step="11"
            :rules="[() => validateState('activiteFaible')]"
          >
            Activité sportive faible
            <small>Activités physiques</small>
          </v-stepper-step>
          <v-stepper-step
            v-show="currentStep === 12"
            step="12"
            :rules="[() => validateState('activiteMoyenne')]"
          >
            Activité sportive moyenne
            <small>Activités physiques</small>
          </v-stepper-step>
          <v-stepper-step
            v-show="currentStep === 13"
            step="13"
            :rules="[() => validateState('activiteForte')]"
          >
            Activité sportive forte
            <small>Activités physiques</small>
          </v-stepper-step>
          <v-stepper-step
            :rules="[
              () => validateState('prenom'),
              () => validateState('naissance'),
              () => validateState('taille'),
              () => validateState('poids'),
              () => validateState('activiteFaible'),
              () => validateState('activiteMoyenne'),
              () => validateState('activiteForte'),
            ]"
            v-show="currentStep === 14"
            step="14"
          >
            Validation
          </v-stepper-step>
        </v-stepper-header>

        <!-- contenu du dynamique form -->

        <v-stepper-items>
          <b-card bg-variant="light">
            <!-- étape 1 -->

            <v-stepper-content step="1">
              <b-form-group
                id="account-type-group"
                label="Choisis ton type de compte:"
                label-for="account-type"
              >
                <b-form-radio-group
                  id="account-type"
                  name="account-type"
                  v-model="accountType"
                >
                  <b-form-radio value="local">Local</b-form-radio>
                  <b-form-radio value="remote">Externe</b-form-radio>
                </b-form-radio-group>
                <small class="text-muted"
                  >Un compte local n'enregistre les données que localement, sur
                  l'appareil.<br /><u>Avantage:</u> pas de connexion internet
                  nécessaire, inscription simplifiée (nul besoin de fournir un
                  mot de passe ni d'adresse email).<br /><u>Désavantage:</u>
                  impossible d'utiliser ce compte sur un autre appareil.</small
                >
              </b-form-group>
              <v-btn
                color="primary"
                @click="changeStep(accountType === 'local' ? 5 : 2)"
              >
                Continuer
              </v-btn>
            </v-stepper-content>

            <!-- étape 2 -->

            <v-stepper-content step="2">
              <b-form-group
                id="email-group"
                label="Saisis ton adresse email:"
                label-for="email"
                description="Votre adresse email restera confidentielle"
              >
                <b-form-input
                  id="email"
                  name="email"
                  type="email"
                  :required="accountType == 'remote'"
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
              <v-btn color="primary" @click="changeStep(3)"> Continuer </v-btn>
              <v-btn text @click="changeStep(1)"> Retour </v-btn>
            </v-stepper-content>

            <!-- étape 3 -->

            <v-stepper-content step="3">
              <b-form-group
                id="password-group"
                label="Choisis un mot de passe:"
                label-for="password"
              >
                <b-form-input
                  id="password"
                  name="password"
                  type="password"
                  :required="accountType == 'remote'"
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
              <v-btn color="primary" @click="changeStep(4)"> Continuer </v-btn>
              <v-btn text @click="changeStep(2)"> Retour </v-btn>
            </v-stepper-content>

            <!-- étape 4 -->

            <v-stepper-content step="4">
              <b-form-group
                id="password-confirm-group"
                label="Confirme ton mot de passe:"
                label-for="password-confirm"
              >
                <b-form-input
                  id="password-confirm"
                  name="password-confirm"
                  type="password"
                  :required="accountType == 'remote'"
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
              <v-btn color="primary" @click="changeStep(5)"> Continuer </v-btn>
              <v-btn text @click="changeStep(3)"> Retour </v-btn>
            </v-stepper-content>

            <!-- étape 5 -->

            <v-stepper-content step="5">
              <b-form-group
                id="prenom-group"
                label="Saisis ton prénom:"
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
                  >Votre prénom est requis et doit avoir une longueur maximale
                  de 50 caractères</b-form-invalid-feedback
                >
              </b-form-group>
              <v-btn color="primary" @click="changeStep(6)"> Continuer </v-btn>
              <v-btn v-if="accountType == 'local'" text @click="changeStep(1)">
                Retour
              </v-btn>
              <v-btn v-else text @click="changeStep(4)"> Retour </v-btn>
            </v-stepper-content>

            <!-- étape 6 -->

            <v-stepper-content step="6">
              <b-form-group
                id="naissance-group"
                label="Saisis ta date de naissance:"
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
                  >Votre date de naissance doit être
                  valide</b-form-invalid-feedback
                >
              </b-form-group>
              <v-btn color="primary" @click="changeStep(7)"> Continuer </v-btn>
              <v-btn text @click="changeStep(5)"> Retour </v-btn>
            </v-stepper-content>

            <!-- étape 7 -->

            <v-stepper-content step="7">
              <b-form-group label="Sélectionne ton genre:">
                <b-form-radio-group
                  id="sexe-group"
                  name="sexe"
                  v-model="form.sexe"
                >
                  <b-form-radio value="M">Masculin</b-form-radio>
                  <b-form-radio value="F">Féminin</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
              <v-btn color="primary" @click="changeStep(8)"> Continuer </v-btn>
              <v-btn text @click="changeStep(6)"> Retour </v-btn>
            </v-stepper-content>

            <!-- étape 8 -->

            <v-stepper-content step="8">
              <b-form-group
                id="taille-group"
                label="Saisis ta taille en cm:"
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
              <v-btn color="primary" @click="changeStep(9)"> Continuer </v-btn>
              <v-btn text @click="changeStep(7)"> Retour </v-btn>
            </v-stepper-content>

            <!-- étape 9 -->

            <v-stepper-content step="9">
              <b-form-group
                id="poids-group"
                label="Saisis ton poids en kg (arrondi à l'unité):"
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
              <v-btn color="primary" @click="changeStep(10)"> Continuer </v-btn>
              <v-btn text @click="changeStep(8)"> Retour </v-btn>
            </v-stepper-content>

            <!-- étape 10 -->

            <v-stepper-content step="10">
              <b-form-group
                id="activite-physique-base-group"
                label="Quelle est ton activité physique de base ?"
                label-for="activite-physique-base"
              >
                <b-form-select
                  id="activite-physique-base"
                  v-model="form.activitePhysiqueBase"
                  :options="form.activitesPhysiquesBase"
                ></b-form-select>
              </b-form-group>
              <v-btn color="primary" @click="changeStep(11)"> Continuer </v-btn>
              <v-btn text @click="changeStep(9)"> Retour </v-btn>
            </v-stepper-content>

            <!-- étape 11 -->

            <v-stepper-content step="11">
              <b-form-group
                id="activite-faible-group"
                label="Saisis le nombre d'heures / semaine d'activités (sportives) de faible intensité:"
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
              <v-btn color="primary" @click="changeStep(12)"> Continuer </v-btn>
              <v-btn text @click="changeStep(10)"> Retour </v-btn>
            </v-stepper-content>

            <!-- étape 12 -->

            <v-stepper-content step="12">
              <b-form-group
                id="activite-moyenne-group"
                label="Saisis le nombre d'heures / semaine d'activités (sportives) de moyenne intensité:"
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
              <v-btn color="primary" @click="changeStep(13)"> Continuer </v-btn>
              <v-btn text @click="changeStep(11)"> Retour </v-btn>
            </v-stepper-content>

            <!-- étape 13 -->

            <v-stepper-content step="13">
              <b-form-group
                id="activite-forte-group"
                label="Saisis le nombre d'heures / semaine d'activités (sportives) de forte intensité:"
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
              <v-btn color="primary" @click="changeStep(14)"> Continuer </v-btn>
              <v-btn text @click="changeStep(12)"> Retour </v-btn>
            </v-stepper-content>

            <!-- étape 14 -->

            <v-stepper-content step="14">
              <div v-if="submited && !submitedWithNoError">
                <p>Il y a une erreur dans le formulaire.</p>
              </div>
              <div v-else>
                <p>
                  Tes besoins caloriques actuels sont de
                  <strong>{{ besoinCalorique }} Kcal / jour</strong>.<br />Si
                  tes données sont correctes, clic sur le bouton ci-dessous et
                  ton profil sera créé.
                </p>
              </div>
              <v-btn color="primary" @click="onSubmit()"> Valider </v-btn>
              <v-btn text @click="changeStep(13)"> Retour </v-btn>
              <span class="warning-email-error" v-if="form.invalidEmail"
                >Ce compte existe déjà.</span
              >
            </v-stepper-content>
          </b-card>
        </v-stepper-items>
      </v-stepper>
    </b-form>
  </div>
</template>

<script>
import { dateValidation } from "../services/ValidationRules";
import { createUser, checkUserExists } from "../services/UserService";
import { besoinCalorique } from "../services/RegimeService";
import {
  required,
  requiredIf,
  minLength,
  maxLength,
  email,
  sameAs,
  between,
} from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  name: "SignUp",
  data() {
    return {
      submitedWithNoError: false,
      submited: false,
      currentStep: 1,
      accountType: "local",
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
            text: "Faible (secrétaire, enseignant, coiffeur, etc)",
          },
          {
            value: 1.6,
            text: "Modéré (femme de ménage, serveur, kinésithérapeute, etc)",
          },
          {
            value: 1.7,
            text: "Important (déménageur, agriculteur, bûcheron, etc)",
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
    ...mapActions(["toCompleteTitle", "userRegistrationOnLocal"]),
    changeStep(step) {
      this.currentStep = step;
    },
    onSubmit() {
      this.submited = true;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      if (this.accountType === "local") {
        this.submitedWithNoError = true;
        // stockage des userData sur le localStorage
        this.userRegistrationOnLocal(this.form);
        // redirection apres 3 sec
        setTimeout(() => this.$router.push({ name: "dashboard" }), 3000);
      } else {
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
                this.submitedWithNoError = true;
                this.$router.push({ name: "sign-in" });
              })
              .catch((err) => {
                console.log(err); // deal with error
              });
          });
      }
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
    isRemoteData() {
      return this.accountType === "remote";
    },
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
  watch: {
    form: {
      handler() {
        this.submited = false;
      },
      deep: true,
    },
  },
  mounted() {
    this.toCompleteTitle("Inscription");
    // pour initialiser les champs du form avec la couleur verte ou rouge selon rule = true
    this.$v.form.$touch();
  },
  validations: {
    form: {
      email: {
        required: requiredIf("isRemoteData"),
        maxLength: maxLength(50),
        email,
      },
      password: {
        required: requiredIf("isRemoteData"),
        minLength: minLength(1),
      },
      passwordConfirm: {
        required: requiredIf("isRemoteData"),
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