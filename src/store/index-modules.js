// 创建Vuex中的store
import Vue from 'vue'
import Vuex from 'vuex'
import sumModule from './sum'
import userModule from './user'

// 创建store之后必须先应用Vuex
Vue.use(Vuex)

// 分模块
export default new Vuex.Store({
  modules: {
    sumModule,
    userModule
  }
})