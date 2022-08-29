<template>
	<div class="category">
		<h2>{{title}}分类</h2>
		<!-- 定义插槽并取名 -->
		<slot name="firstSlot">插槽默认值1</slot>
		<slot name="secondSlot" :slotGames="slotGames">插槽默认值2</slot>
	</div>
</template>

<script>
	export default {
		name:'Category',
		data(){
			return {
				slotGames:['天天酷跑','卡丁车'],
			}
		},
		props:['title']
	}
</script>

<style scoped>
	.category{
		background-color: skyblue;
		width: 200px;
	}
</style>