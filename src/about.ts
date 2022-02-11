import Vue from 'vue'
import About from './About.vue'
import store from './store'
import VueCompositionApi from "@vue/composition-api"

Vue.use(VueCompositionApi)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(About)
}).$mount('#app')
