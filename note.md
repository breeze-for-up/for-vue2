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


## Element UI
### 按需引入
1. 安装`npm install babel-plugin-component -D`
2. 在脚手架的`babel.config.js`文件中增加官网示例配置