import 'core-js/stable'
import Vue from 'vue'
import "regenerator-runtime/runtime";
//import CoreuiVuePro from '@coreui/vue-pro'
import CoreuiVuePro from '../node_modules/@coreui/vue-pro/src/index.js'
import App from './App'
import router from './router/index'
import store from './store/store'
import index from './store/index'
import { iconsSet as icons } from './assets/icons/icons.js'
import i18n from './i18n.js'

Vue.use(CoreuiVuePro)
Vue.prototype.$log = console.log.bind(console)

new Vue({
  el: '#app',
  router,
  store,
  index,
  //CIcon component documentation: https://coreui.io/vue/docs/components/icon
  icons,
  i18n,
  template: '<App/>',
  components: {
    App
  }
})
