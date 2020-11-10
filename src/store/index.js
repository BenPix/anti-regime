import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { findUser } from "../services/UserService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: "Anti-Régime",
    mainTitle: "",
    accountType: "",
    userData: {
      id: 0,
      prenom: "",
      email: "",
      sexe: "",
      naissance: "",
      activitePhysiqueBase: 0,
      activiteFaible: 0,
      activiteMoyenne: 0,
      activiteForte: 0,
      poids: 0,
      taille: 0,
      goalWeight: 0,
      goalDeficit: 0,
      goalTime: 0,
      goalIsDefined: false,
    },
      userWeighings: [],
    weighingsAutoIncrementId: 0,
  },
  mutations: {
    // synchrone
    SIGN_OUT(state) {
      state.userData = {};
      state.accountType = "";
      state.userWeighings = [];
      state.weighingsAutoIncrementId = 0;
    },
    SET_ACCOUNT_TYPE_LOCAL(state) {
      state.accountType = "local";
    },
    SET_ACCOUNT_TYPE_REMOTE(state) {
      state.accountType.id = "remote";
    },
    SET_USER_ID(state, userId) {
      Vue.set(state.userData, 'id', parseInt(userId));
    },
    SET_USER_PRENOM(state, prenom) {
      Vue.set(state.userData, 'prenom', prenom);
    },
    SET_USER_EMAIL(state, email) {
      state.userData.email = email;
    },
    SET_USER_SEX(state, sexe) {
      state.userData.sexe = sexe;
    },
    SET_USER_BIRTHDATE(state, naissance) {
      state.userData.naissance = naissance;
    },
    SET_USER_BASIC_ACTIVITY(state, activitePhysiqueBase) {
      state.userData.activitePhysiqueBase = parseInt(activitePhysiqueBase);
    },
    SET_USER_LOW_ACTIVITY(state, activiteFaible) {
      state.userData.activiteFaible = parseInt(activiteFaible);
    },
    SET_USER_MIDDLE_ACTIVITY(state, activiteMoyenne) {
      state.userData.activiteMoyenne = parseInt(activiteMoyenne);
    },
    SET_USER_HIGH_ACTIVITY(state, activiteForte) {
      state.userData.activiteForte = parseInt(activiteForte);
    },
    SET_USER_WEIGHT(state, poids) {
      state.userData.poids = parseInt(poids);
    },
    SET_USER_SIZE(state, taille) {
      state.userData.taille = parseInt(taille);
    },
    SET_GOAL_WEIGHT(state, weight) {
      Vue.set(state.userData, 'goalWeight', parseInt(weight));
    },
    SET_GOAL_DEFICIT(state, deficit) {
      Vue.set(state.userData, 'goalDeficit', parseInt(deficit));
    },
    SET_GOAL_TIME(state, weeks) {
      state.userData.goalTime = parseInt(weeks);
    },
    SET_GOAL_DEFINED(state) {
      Vue.set(state.userData, 'goalIsDefined', true);
    },
    SET_GOAL_UNDEFINED(state) {
      Vue.set(state.userData, 'goalIsDefined', false);
    },
    ADD_TO_TITLE(state, pageTitle) {
      state.mainTitle = state.title + " | " + pageTitle;
    },
    REGISTER_WEIGHT(state, weightData) {
      state.userWeighings.push({
        id: state.weighingsAutoIncrementId,
        poids: weightData.poids,
        date: weightData.date,
      });
    },
    INCREMENT_WEIGHINGS_ID(state) {
      state.weighingsAutoIncrementId++;
    },
    DELETE_WEIGHT(state, weightId) {
      state.userWeighings.forEach((weighing, key, arr) => {
        if (weighing.id === weightId) {
          arr.splice(key, 1);
          return;
        }
      });
    },
    SORT_WEIGHINGS(state) {
      state.userWeighings.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    },
  },
  actions: {
    // asynchrone => appel API ici
    toSignIn(context, id) {
       return findUser(id)
        .then((res) => {
          context.commit("SET_USER_ID", res.data.user.id);
          context.commit("SET_USER_EMAIL", res.data.user.email);
          context.commit("SET_USER_PRENOM", res.data.user.prenom);
          context.commit("SET_USER_SEX", res.data.user.sexe);
          context.commit("SET_USER_BIRTHDATE", res.data.user.naissance);
          context.commit("SET_USER_BASIC_ACTIVITY", res.data.user.act_phys_base);
          context.commit("SET_USER_LOW_ACTIVITY", res.data.user.act_phys_faible);
          context.commit("SET_USER_MIDDLE_ACTIVITY", res.data.user.act_phys_moy);
          context.commit("SET_USER_HIGH_ACTIVITY", res.data.user.act_phys_forte);
          context.commit("SET_USER_WEIGHT", res.data.user.poids);
          context.commit("SET_USER_SIZE", res.data.user.taille);
          context.commit("SET_GOAL_WEIGHT", res.data.user.goal_weight);
          context.commit("SET_GOAL_DEFICIT", res.data.user.deficit);
          /* set goal time ?? mettre la valeur de départ et la garder ?
          la calculer a chaque instant ?
          réflexion à avoir ... (comme elle peut etre calculée a tout moment, peu de raison de stoquer)
          pour le moment, le goal time est enregistré lors du choix du programme
          mais rien en BDD ni dans localstorage, donc dès qu'on refresh ou reco,
          cette donnée disparait
          */
         if (res.data.user.goal_weight && res.data.user.deficit) {
          context.commit("SET_GOAL_DEFINED");
         }
        })
        .catch((err) => {
          console.log(err); // deal with this error
        });
    },
    toSignOut(context) {
      context.commit("SIGN_OUT");
    },
    setOrUnsetGoal(context, goalData) {
      if (goalData.goalIsDefined) {
        context.commit("SET_GOAL_DEFINED");
        context.commit("SET_GOAL_WEIGHT", goalData.goalWeight);
        context.commit("SET_GOAL_DEFICIT", goalData.goalDeficit);
        context.commit("SET_GOAL_TIME", goalData.goalTime);
      } else {
        context.commit("SET_GOAL_UNDEFINED");
        context.commit("SET_GOAL_WEIGHT", 0);
        context.commit("SET_GOAL_DEFICIT", 0);
        context.commit("SET_GOAL_TIME", 0);
      }
    },
    toCompleteTitle(context, pageTitle) {
      context.commit("ADD_TO_TITLE", pageTitle);
    },
    toUpdateUser(context, prenom) {
      context.commit("SET_USER_PRENOM", prenom);
    },
    userRegistrationOnLocal(context, formData) {
      context.commit("SET_ACCOUNT_TYPE_LOCAL");
      context.commit("SET_USER_ID", 1);
      context.commit("SET_USER_PRENOM", formData.prenom);
      context.commit("SET_USER_SEX", formData.sexe);
      context.commit("SET_USER_BIRTHDATE", formData.naissance);
      context.commit("SET_USER_BASIC_ACTIVITY", formData.activitePhysiqueBase);
      context.commit("SET_USER_LOW_ACTIVITY", formData.activiteFaible);
      context.commit("SET_USER_MIDDLE_ACTIVITY", formData.activiteMoyenne);
      context.commit("SET_USER_HIGH_ACTIVITY", formData.activiteForte);
      context.commit("SET_USER_WEIGHT", formData.poids);
      context.commit("SET_USER_SIZE", formData.taille);
    },
    toRegisterWeight(context, weightData) {
      context.commit("REGISTER_WEIGHT", weightData);
      context.commit("INCREMENT_WEIGHINGS_ID");
      context.commit("SORT_WEIGHINGS");
    },
    toDeleteWeight(context, weighId) {
      context.commit("DELETE_WEIGHT", weighId);
    }
  },
  getters: {
    getUserWeighings: state => {
      let userWeighingsCopy = JSON.parse(JSON.stringify(state.userWeighings));

      userWeighingsCopy.forEach((weighing) => {
        const weighingDate = new Date(weighing.date);
        const dayNumber =
        (weighingDate.getDate() > 9 ? "" : "0") + weighingDate.getDate();
        const monthNumber =
        ((weighingDate.getMonth() + 1) > 9 ? "" : "0") + (weighingDate.getMonth() + 1);
        weighing.date = (
          dayNumber + "/" + monthNumber + "/" + weighingDate.getFullYear()
        );
      });

      return userWeighingsCopy;
    }
  },
  plugins: [createPersistedState()],
  modules: {},
});
