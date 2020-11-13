import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import Home from "../views/Home.vue";
import SignUp from "../views/SignUp.vue";
import SignIn from "../views/SignIn.vue";
import SignOut from "../views/SignOut.vue";
import Profile from "../views/Profile.vue";
import Dashboard from "../views/Dashboard.vue";
import Goal from "../views/Goal.vue";
import Help from "../views/Help.vue";

Vue.use(VueRouter);

// we set if a page is public, to be sure that an oversight will not let access to a private page
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      public: true,
    },
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: SignUp,
    meta: {
      public: true,
      onlyWhenLoggedOut: true,
    },
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: SignIn,
    meta: {
      public: true,
      onlyWhenLoggedOut: true,
    },
  },
  {
    path: "/sign-out",
    name: "sign-out",
    component: SignOut,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/goal",
    name: "goal",
    component: Goal,
  },
  {
    path: "/help",
    name: "help",
    component: Help,
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

// intercepteur de naviguation, protège les pages non public
router.beforeEach(async (to, from, next) => {
  const isPublic = to.matched.some((record) => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(
    (record) => record.meta.onlyWhenLoggedOut
  );
  // store inaccessible malgré await import(store) ou router.beforeResolve donc utilisation de localStorage
  const loggedIn = Boolean(store.state.userData.id);

  if (!isPublic && !loggedIn) {
    next("/sign-in");
  } else if (onlyWhenLoggedOut && loggedIn) {
    next("/");
  } else {
    next();
  }
});

export default router;
