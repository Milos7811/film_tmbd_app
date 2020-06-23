import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import vuetify from './plugins/vuetify'
import Vuetify from 'vuetify'
import '../src/scss/app.scss'

Vue.prototype.$apiKey = process.env.VUE_APP_APIKEY
Vue.prototype.$axios = axios
Vue.use(Vuetify)
Vue.config.productionTip = true

new Vue({
	router,
	vuetify,
	render: h => h(App)
}).$mount('#app')

// router.onReady(() =>
