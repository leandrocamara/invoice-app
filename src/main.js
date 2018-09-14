// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

// router setup
import routes from './routes/routes'

// Plugins
import VueMask from 'v-mask'
import GlobalComponents from './config/globalComponents'
import GlobalDirectives from './config/globalDirectives'
import Notifications from './components/NotificationPlugin'

// Filters
import VueMoment from 'vue-moment'
import VueCurrencyFilter from 'vue-currency-filter'

// MaterialDashboard plugin
import MaterialDashboard from './config/material-dashboard'

import Chartist from 'chartist'

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: 'nav-item active'
})

Vue.use(VueRouter)
Vue.use(MaterialDashboard)
Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)
Vue.use(Notifications)
Vue.use(VueMoment)
Vue.use(VueCurrencyFilter)
Vue.use(VueMask)

// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get () {
    return this.$root.Chartist
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist
  }
})
