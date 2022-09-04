import Vue from 'vue'
import App from './App.vue'
import hunru from './mixin'
import plugins from './plugins'
import store from './store/index-modules'
import VueRouter from 'vue-router'
// 引入路由器
import router from './router'
import {Row, Button} from 'element-ui'

Vue.config.productionTip = false
Vue.component(Row.name, Row);
Vue.component(Button.name, Button);

// 全局注册混入
Vue.mixin(hunru);
// 使用插件
Vue.use(plugins);
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
	// 注册全局事件总线
  	Vue.prototype.$bus = this;
  }
}).$mount('#app')
