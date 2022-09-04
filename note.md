# Vue 2.x
## 脚手架介绍
1. 创建脚手架项目`vue create <projectName>`
2. 项目结构
	1. public：一般放置第三方静态资源（基本不会变动），在`public`文件夹中的资源，经`webpack`打包后会原封不动的到`dist`文件夹中
	2. src：源代码
		1. assets：也是静态资源，多用于存放业务级公共资源，可以分化出不同的子目录存放
		2. components：放置非路由组件、全局组件等
		3. store：`Vuex`状态管理信息
		4. App.vue：唯一的根组件
		5. main.js：项目入口文件，最先执行
3. 常见配置
	1. 项目运行后，浏览器自动打开<br>
		在`package.json`文件中`vue-cli-service serve` 后加`--open`;<br>
		在`vue.config.js`中增加`devServer:{host:'localhost'}`
	2. 关闭`eslint`语法校验<br>
		在`vue.config.js`中增加`lintOnSave:false`
	3. 给`src`文件夹配置别名，引用时更方便<br>
		在`jsconfig.json`中配置`paths`，脚手架默认已配置
		
	

## ref属性
1. 被用来给元素或者子组件注册引用信息（id的替代者）
2. 加在`html`标签上获取的是真实DOM信息，加在组件标签上获取的是组件实例对象（vc）

## props配置项
1. 让组件接收外部传来的数据，且与`data`中重名时，优先级比`data`中高，控制台会有重名警告
2. `props`属性是只读的，若对其修改则控制会有警告信息

## mixin(混入)
1. 将多个组件共用的配置提取成一个混入对象

## plugins(插件)
1. 用于增强Vue
2. 本质是包含`install`方法的一个对象，第一个参数是`Vue`，第二个以后是使用者传递的参数

## 组件间通信
### 全局事件总线
1. 一种组件通信方式，适用于任意组件间通信
2. 例如，A组件想接收数据，则A组件在`$bus`中绑定自定义事件，由B组件中触发此事件，可以传递参数给A组件中的事件回调
```javascript
// 安装全局事件总线
new Vue({
  // ...
  beforeCreate() {
  	Vue.prototype.$bus = this;
  }
}).$mount('#app') 
// 发送者: 触发总线上的事件
this.$bus.$emit('hello', this.studentName);
// 接收者: 在总线上绑定回调事件
this.$bus.$on('hello',param=>{
	console.log('事件总线 - School组件收到数据:', param);
});
```

### 订阅与发布
1. 安装`pubsub-js`三方库:`npm -i pubsub-js`
2. 发布者需要发布消息，订阅者订阅消息
```javascript
// 发布者
pubsub.publish('hello', '无敌的学生');
// 订阅者
this.pubId = pubsub.subscribe('hello',(msgName,data)=>{
	console.log('pubsub - School组件收到数据:', msgName, data);
});
```

## nextTick
1. 在下一次`DOM`更新结束后执行指定的回调；当改变数据后，要基于更新后的`DOM`进行某些操作时，要在`nextTick`指定的函数中执行
```javascript
this.$nextTick(function(){
	this.$refs.inputTitle.focus();
})
```

## 第三方动画
1. 安装`npm install animate.css`
2. 使用相关属性
```javascript
<transition-group
	appear
	name="animate__animated animate__bounce"
	enter-active-class="animate__backInUp"
	leave-active-class="animate__backOutUp"
>
	<h2 v-show="!isShow" key="1">你好啊</h2>
	<h2 v-show="isShow" key="2">干咩呀你</h2>
</transition-group>
```

## ajix
1. 安装`npm i axios`
2. 发起请求，配置代理
```javascript
devServer: {
proxy: {
	'/api': {
	  target: 'http://localhost:8000', // 注意直接指向目标服务器
	  // pathRewrite:{'^/test':''}, // 路径重写
	  ws: true, // 用于支持websocket
	  changeOrigin: true // 用于控制请求头中的host
	}
}
}
```

## 插槽
1. 相当于在模板中添加一个占位，根据使用者传入形式展示不同的效果
2. 分类：默认插槽、具名插槽、作用域插槽（数据在组件自身，但是可以传给调用者控制形式）
```javascript
<Category title="神秘">
	// 收到插槽回传的数据，结构赋值
	<template slot="secondSlot" scope="{slotGames}">
		<ul>
			<li v-for="(item,index) in slotGames" :key="index">{{item}}</li>
		</ul>
	</template>
</Category>
```

## Vuex
1. 安装`npm i vuex@3`

## 路由
1. 安装`npm i vue-router@3`
2. 基本路由:
	1. 使用`<router-link>`指定跳转的页面
	2. 使用`<router-view>`指定组件显示位置，当有多个`<router-view>`时，指定`name`属性区分展示对应的视图，`name`属性的值与路由器中的组件`key`对应
3. 多级路由
	1. 在路由器中通过`children`属性指定子路由，注意子级路由路径中无须`/`开头
4. 路由传参
	1. 传`query`参数，直接在`<router-link>`中拼接，注意使用模板字符串，比如：
	```javascript
	// 字符串写法
	<li v-for="m in msgList" :key="m.id">
		<router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">{{m.title}}</router-link>
	</li>

	// 对象写法
	<router-link :to="{
		path:'/home/message/detail',
		query:{
			id:m.id,
			title:m.title
		}
	}">
		{{m.title}}
	</router-link>
	```
	2. 传`params`参数，需要在路由器中声明占位符
	```javascript
	// 路由器
	{
		path:'/customer/:id/:title',
		component:Customer
	}

	// 传参
	// 字符串写法
	<li v-for="m in msgList" :key="m.id">
		<router-link :to="`/home/message/detail/${m.id}/${m.title}`">{{m.title}}</router-link>
	</li>

	// 对象写法
	<router-link :to="{
		name:'huiyuan',
		params:{
			id:m.id,
			title:m.title
		}
	}">
		{{m.title}}
	</router-link>
	```
5. 命名路由<br>
	给路由起个名字，简化`<router-link>`中的写法
	```javascript
	// 在路由器中指定name名称,此处就可以用name可代替path
	// 注意若传递params参数,必须用name,不能用path
	<router-link :to="{
		name:'yuangong',
		query:{
			id:m.id,
			title:m.title
		}
	}">
		{{m.title}}
	</router-link>		
	```
6. 路由的`props`配置<br>
	在路由器中增加`props`属性，可以附带数据给组件，便于组件用更方便的写法取数据<br>
	函数写法:
	```javascript
	path:'/customer',
	component:Customer,
	// 函数形式，参数为$route,可以获取到路由中的信息
	// props($route){
	// 	return {id:$route.query.id, title:$route.query.title}
	// }

	// 解构赋值
	props({query:{id,title}}){
		return {id, title}
	}
	```
	在`Customer`组件中可以用`props`配置接收到`id`、`title`参数，从而在组件中可以直接取值使用
7. 编程式路由，通过`js`代码控制跳转
	1. 使用:
	```javascript
	this.$router.push({
		path:'/goods',
		query:{
			goodsId:12345
	}
	```
	> push模式: 累积页面调用记录<br>
	> replace模式：删除之间的调用记录
	2. 常用`API`
	```javascript
	// 前进
	this.$router.forward();
	// 后退
	this.$router.back();
	// 往前连续走n步
	this.$router.go(n);
	```
8. 缓存路由组件<br>
	正常情况下，当组件切换后，前面的组件就被销毁了；若要保持组件不被销毁：<br>
	使用`<keep-alive>`包裹`<router-view>`
	```javascript
	// include属性指定不被销毁的组件名，若不指定，则视图下所有组件都不销毁
	<keep-alive include='News'>
		<router-view></router-view>
	</keep-alive>

	// 多个的写法
	// <keep-alive :include=['News', 'xxx']>
	```
9. 生命周期函数<br>
	路由组件独有两个生命周期钩子函数:
	```javascript
	activated(){
		console.log('组件被激活');
	},
	deactivated(){
		console.log('组件失活');
	}
	```
10. 路由守卫
	1. 全局路由守卫
	```javascript
	// 前置路由守卫 === 组件初始化或者组件切换之前调用
	router.beforeEach((to,from,next)=>{
		console.log('===',next);
		if(to.name==='yuangong'){
			next();
		} else {
			alert('无权限查看');
		}
	})

	// 后置
	router.afterEach((to,from)=>[
		// 路由跳转成功之后修改页面标题
		document.title = to.meta.title || '默认标题',
	])
	```
	2. 独享路由守卫，注意独享路由守卫只有前置，没有后置
	```javascript
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
	```
	3. 组件内路由守卫
	```javascript
	// 通过路由规则，进入该组件时被调用
	beforeRouteEnter (to, from, next) {
		// ...
	},
	// 通过路由规则，离开该组件时被调用
	beforeRouteLeave (to, from, next) {
		// ...
	}
	```
11. 工作模式: `history`与`hash`<br>
	`history`：浏览器访问页面路径中不包含`#`，但是当项目打包上线后，刷新页面时会找不到路径，因为路径中包含组件名，实际并没有组件名页面资源，这是单页面应用；也可通过后端解决路径问题<br>
	`hash`：浏览器路径中包含`#`，`#`后面的值为`hash`值，`hash`值不会包含在`http`请求中



## Element UI
### 按需引入
1. 安装`npm install babel-plugin-component -D`
2. 在脚手架的`babel.config.js`文件中增加官网示例配置