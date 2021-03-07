// Import user interface libs
import './assets/css/tailwind.css'
import './assets/sass/app.scss'

// Import Libraries for DI
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import VModal from 'vue-js-modal'
import VeeValidate from 'vee-validate'
import Unicon from 'vue-unicons'

// Import in app files
import { uniPlus, uniLayerGroup, uniAngleDown } from 'vue-unicons/src/icons'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupLoggedInUser } from './api/user'

// DI
Vue.use(VueCookies)
Vue.use(VeeValidate)
Vue.use(VModal, { dynamic: true, dynamicDefaults: { clickToClose: false } })
Unicon.add([uniPlus, uniLayerGroup, uniAngleDown])
Vue.use(Unicon)

// Common Configs
Vue.config.productionTip = false

// Cookies Configs
Vue.$cookies.config('7d')

// Actions
setupLoggedInUser(router, store)

// Vue Instance
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
