import VueRouter from 'vue-router'
import Employee from '../views/Employee'
import Customer from '../views/Customer'

// 创建一个路由器
const router =  new VueRouter({
	routes:[
		{
			name:'yuangong',
			path:'/employee',
			component:Employee,
			// children:[
			// 	// 多级路由
			// 	{
			// 		path:'list',
			// 		component:Customer
			// 	}
			// ]
		},
		{
			name:'huiyaun',
			path:'/customer',
			component:Customer,
			// 1.对象形式
			// props:{
			// 	a:'11'
			// }

			// 2.布尔值形式，若布尔值为真，会将params参数以props形式传递给组件
			// props:true

			// 3.函数形式，参数为$route,可以获取到路由中的信息
			// props($route){
			// 	return {id:$route.query.id, title:$route.query.title}
			// }

			// 解构赋值
			props({query:{id,title}}){
				return {id, title}
			}
		},
		{
			path:'/person',
			components:{
				em:Employee,
				cu:Customer

			},
			beforeEnter(to,from,next){
				console.log('独享路由守卫');
			}
		}
	]
});

// 全局前置路由守卫
router.beforeEach((to,from,next)=>{
	console.log('===',next);
	if(to.name==='yuangong'){
		next();
	} else {
		alert('无权限查看');
	}
});

// 全局后置路由守卫
router.afterEach((to,from)=>[
	// 路由跳转成功之后修改页面标题
	document.title = to.meta.title || '默认标题',
])

export default router;