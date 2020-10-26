<template>
  <div id="sign-in" class="text-left">
    <div>
      <img src="../assets/fat-people-icon-vector.jpg" alt="fat-people-icon" />
    </div>
    <b-card bg-variant="light">
      <b-form @submit.stop.prevent="onSubmit">
        <h3>Se connecter</h3>
        <b-form-group id="email-group" label="Adresse email:" label-for="email">
          <b-form-input
            id="email"
            name="email"
            type="email"
            required
            v-model="email"
          >
          </b-form-input>
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
            v-model="password"
          >
          </b-form-input>
        </b-form-group>
        <BasicButton :type="buttonType" :text="buttonText"></BasicButton>
        <p class="text-danger mt-3" v-if="connexionFailed">
          Identifiants de connexion incorrects, veuillez recommencer.
        </p>
        <p class="text-danger mt-3" v-if="serverError">
          La connexion au serveur a échoué, veuillez recommencer.
        </p>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import BasicButton from "../components/BasicButton";
import { connectUser } from "../services/UserService";
import { mapActions } from "vuex";

export default {
  name: "SignIn",
  data() {
    return {
      buttonText: "Je me connecte",
      buttonType: "submit",
      email: "",
      password: "",
      connexionFailed: false,
      serverError: false,
    };
  },
  methods: {
    ...mapActions(["toSignIn", "toCompleteTitle"]),
    onSubmit() {
      this.serverError = false;

      connectUser(this.email, this.password)
        .then((res) => {
          this.connexionFailed = !res.data.result.success;
          if (!this.connexionFailed) {
            this.toSignIn(res.data.result.user_id);
            this.$router.push({ name: "dashboard" });
          }
        })
        .catch(() => {
          this.connexionFailed = false;
          this.serverError = true;
        });
    },
  },
  components: {
    BasicButton,
  },
  mounted() {
    this.toCompleteTitle("Connexion");
  },
};
</script>

<style scoped>
#sign-in {
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