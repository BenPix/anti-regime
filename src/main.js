import Vue from "vue";
import App from "./App.vue";
import Vuelidate from "vuelidate";

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import router from "./router";
import store from './store'
import vuetify from './plugins/vuetify';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
