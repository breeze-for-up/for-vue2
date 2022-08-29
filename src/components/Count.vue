<template>
	<div>
		<h2>求和：{{sum}}</h2>
		<h2>sum放大十倍：{{bigSum}}</h2>
		<select v-model.number="n">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
		</select>
		<button @click="addSum(n)">增加</button>
		<button @click="subSum(n)">减少</button>
	</div>
</template>

<script>
	import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
	
	export default {
		name:'Count',
		data() {
			return {
				n: 1
			}
		},
		computed:{
			// sum(){
			// 	return this.$store.state.sum;
			// },
			// bigSum(){
			// 	return this.$store.getters.bigSum;
			// }
			
			// mapState、mapGetters分别生成方法映射到state、getters
			...mapState('sumModule', ['sum', 'bigSum']),
			...mapGetters('sumModule', ['bigSum'])
		},
		methods:{
			// addSum(){
			// 	this.$store.dispatch('addSum', this.n);
			// },
			// subSum(){
			// 	this.$store.dispatch('subSum', this.n);
			// }
			
			// 注意mapActions、mapMutations中方法都必须指定要传的参数，否则默认传递的点击事件参数event
			// 借助mapActions会生成对应方法，方法中调用dispatch联系到Actions中的方法
			...mapActions('sumModule', ['addSum', 'subSum']),
			
			// 同理，mapMutations会生成方法联系到Mutations中的方法
			...mapMutations('sumModule', ['ADD_SUM', 'SUB_SUM'])
		}
	}
</script>

<style>
</style>