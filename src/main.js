import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueYouTubeEmbed from "vue-youtube-embed";
import vuetify from "./plugins/vuetify";
import Vuetify from "vuetify";
import "../src/scss/app.scss";

Vue.prototype.$axios = axios;
Vue.use(Vuetify);
Vue.use(VueYouTubeEmbed, { global: true });
Vue.config.productionTip = true;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
