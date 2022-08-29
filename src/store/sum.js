export default {
	namespaced:true,
	actions:{
		addSum(context, value){
			console.log("actions被调用 === ", context, value);
			context.commit('ADD_SUM', value);
		},
		subSum(context, value){
			console.log("actions被调用 === ", context, value);
			context.commit('SUB_SUM', value);
		}
	},
	mutations:{
		ADD_SUM(state, payload){
			console.log("mutations被调用 === ", state, payload);
			state.sum += payload;
		},
		SUB_SUM(state, payload){
			console.log("mutations被调用 === ", state, payload);
			state.sum -= payload;
		}
	},
	state:{
		sum: 0
	},
	getters:{
		bigSum(state){
			return state.sum * 10;
		}
	}
}