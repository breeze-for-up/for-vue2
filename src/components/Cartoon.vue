<template>
	<div>
		<transition-group
			appear
			name="animate__animated animate__bounce"
			enter-active-class="animate__backInUp"
			leave-active-class="animate__backOutUp"
		>
			<h2 v-show="!isShow" key="1">你好啊</h2>
			<h2 v-show="isShow" key="2">干咩呀你</h2>
		</transition-group>
		<button @click="isShow = !isShow">显示/隐藏</button>
	</div>
</template>

<script>
	import 'animate.css'
	
	export default {
		name:'Cartoon',
		data(){
			return {
				isShow:true
			}
		}
	}
</script>

<style lang="less" scoped>
	h2{
		background-color: orange;
	}
</style>