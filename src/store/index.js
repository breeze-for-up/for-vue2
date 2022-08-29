// 创建Vuex中的store
import Vue from 'vue'
import Vuex from 'vuex'
// 创建store之后必须先应用Vuex
Vue.use(Vuex)

// 准备actions - 用于相应组件中的动作
const actions = {
	addSum(context, value){
		console.log("actions被调用 === ", context, value);
		context.commit('ADD_SUM', value);
	},
	subSum(context, value){
		console.log("actions被调用 === ", context, value);
		context.commit('SUB_SUM', value);
	}
};
// 准备mutations - 用于操作数据
const mutations = {
	ADD_SUM(state, payload){
		console.log("mutations被调用 === ", state, payload);
		state.sum += payload;
	},
	SUB_SUM(state, payload){
		console.log("mutations被调用 === ", state, payload);
		state.sum -= payload;
	}
};
// 准备state - 存储数据
const state = {
	sum: 0
};
// 准备getters - 用于将state中数据作加工后返回
const getters = {
	bigSum(state){
		return state.sum * 10;
	}
}

export default new Vuex.Store({
	actions,
	mutations,
	state,
	getters
})