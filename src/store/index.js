import Vue from "vue";
import Vuex from "vuex";
import { findUser } from "../services/UserService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: "Anti-Régime",
    mainTitle: "",
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
  },
  mutations: {
    // synchrone
    SIGN_IN(state, id) {
      state.userData.id = id;
    },
    SIGN_OUT(state) {
      state.userData = {};
    },
    SET_USER_ID(state, userId) {
      state.userData.id = userId;
    },
    SET_USER_PRENOM(state, prenom) {
      state.userData.prenom = prenom;
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
      state.userData.activitePhysiqueBase = activitePhysiqueBase;
    },
    SET_USER_LOW_ACTIVITY(state, activiteFaible) {
      state.userData.activiteFaible = activiteFaible;
    },
    SET_USER_MIDDLE_ACTIVITY(state, activiteMoyenne) {
      state.userData.activiteMoyenne = activiteMoyenne;
    },
    SET_USER_HIGH_ACTIVITY(state, activiteForte) {
      state.userData.activiteForte = activiteForte;
    },
    SET_USER_WEIGHT(state, poids) {
      state.userData.poids = poids;
    },
    SET_USER_SIZE(state, taille) {
      state.userData.taille = taille;
    },
    SET_GOAL_WEIGHT(state, weight) {
      state.userData.goalWeight = weight;
    },
    SET_GOAL_DEFICIT(state, deficit) {
      state.userData.goalDeficit = deficit;
    },
    SET_GOAL_TIME(state, weeks) {
      state.userData.goalTime = weeks;
    },
    SET_GOAL_DEFINED(state) {
      localStorage.setItem("goalIsDefined", true);
      state.userData.goalIsDefined = true;
    },
    SET_GOAL_UNDEFINED(state) {
      localStorage.removeItem("goalIsDefined");
      state.userData.goalIsDefined = false;
    },
    TO_CHECK_GOAL(state) {
      if (localStorage.getItem("goalIsDefined")) {
        state.userId = localStorage.getItem("userId");
      }
    },
    ADD_TO_TITLE(state, pageTitle) {
      state.mainTitle = state.title + " | " + pageTitle;
    },
  },
  actions: {
    // asynchrone => appel API ici
    toSignIn(context, id) {
      localStorage.setItem("userId", id);
      context.commit("SIGN_IN", id);
    },
    toSignOut(context) {
      localStorage.removeItem("userId");
      context.commit("SIGN_OUT");
    },
    initUserData(context) {
      // try something else than localStorage to have userId (token, session, ...)
      if (localStorage.getItem("userId")) {
        findUser(localStorage.getItem("userId"))
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
        })
      }
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
  },
  modules: {},
});
