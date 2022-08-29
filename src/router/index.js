import VueRouter from 'vue-router'
import School from '../components/School'
import Student from '../components/Student'

// 创建一个路由器
const router = new VueRouter({
	routes:[
		{
			path:'/school',
			component:School
		},
		{
			path:'/student',
			component:Student
		}
	]
})