import Vue from 'vue'
import App from './App.vue'

import VueSignature from 'vue-signature-pad';
Vue.use(VueSignature);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
