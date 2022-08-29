<template>
	<div class="stu">
		<h2 class="stuOne">学生: {{studentName}}</h2>
		<h2>职业: {{job}}</h2>
		<h2>年龄: {{age}}</h2>
		<h2>项目类型:{{projectType}}</h2>
		<button @click="globalErr">一点就错</button>
		<button @click="sendStudentName">传递学生名字</button>
		<button @click="unbindName">解绑事件</button>
		<button @click="toSchool">向School组件发送数据</button>
	</div>
</template>

<script>
	import pubsub from 'pubsub-js'
	
	export default {
		name:"Student",
		data(){
			return {
				// studentName:"小明",
				job:"医生"
			}
		},
		methods:{
			sendStudentName(){
				// 触发组件实例上的事件
				this.$emit('selfName', this.studentName);
			},
			unbindName(){
				this.$off('selfName'); // 解绑单个事件
				// this.$off(['selfName', 'xxx']); // 解绑多个事件
				// this.$off(); // 解绑所有事件
			},
			toSchool(){
				// 触发全局事件总线上绑定的事件
				// this.$bus.$emit('hello', this.studentName);
				
				// pubsub发布消息
				pubsub.publish('hello', '无敌的学生');
			}
		},
		props:{
			studentName:{
				type:String,  // 声明参数类型
				required:true // 参数必填
			},
			age:{
				type:Number,
				default:99
			}
		}
	}
</script>

<style lang="less" scoped>
	.stu{
		background-color: skyblue;
		.stuOne{
			font-size: 20px;
		}
	}
</style>