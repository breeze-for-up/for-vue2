<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <button @click="sendRequest">发起请求</button>

    <h1>{{ msg }} : {{ name }}</h1>
    <!-- 向子组件传递一个函数，函数名:selfName -->
    <School :selfName="getSchoolName" />

    <!-- 1.第一种绑定方式 - 自定义一个事件，事件名:selfName -->
    <!-- 	<Student 
		studentName="李四" 
		:age="12"
		v-on:selfName="getStudentName"
	/> -->

    <!-- 2.第二种绑定方式 -->
    <Student studentName="李四" :age="12" ref="stu" />

    <Cartoon />

    <div class="category">
      <Category title="图片">
        <img slot="firstSlot" src="./assets/719a.jpg" alt="测试图片" />
      </Category>

      <Category title="列表">
        <ul slot="secondSlot">
          <li v-for="(item, index) in games" :key="index">{{ item }}</li>
        </ul>
      </Category>

      <Category title="神秘">
        // 收到插槽回传的数据，解构赋值
        <template slot="secondSlot" scope="{slotGames}">
          <ul>
            <li v-for="(item, index) in slotGames" :key="index">{{ item }}</li>
          </ul>
        </template>
      </Category>
    </div>

    <Count />

    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>

    <div>
      <router-link to="/customer?type=2&name=会员&id=111&title=无敌标题">跳转Customer</router-link>
      <router-link to="/employee?type=1&name=员工">跳转Employee</router-link>
      <router-link to="/person">跳转Person, 显示会员</router-link>
    </div>
    <router-view></router-view>
    <router-view name="cu"></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import School from "./components/School";
import Student from "./components/Student";
import Cartoon from "./components/Cartoon";
import Category from "./components/Category";
import Count from "./components/Count";

import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      msg: "你好啊",
      name: "a",
      games: ["王者荣耀", "穿越火线"],
    };
  },
  methods: {
    getSchoolName(name) {
      this.name = name;
    },
    getStudentName(name) {
      this.name = name;
    },
    sendRequest() {
      axios.get("http://localhost:8080/api/add").then(
        (response) => {
          console.log("完整response: ", response);
          console.log("请求成功:", response.data);
        },
        (error) => {
          console.log("完整error: ", error);
          console.log("请求失败:", error.message);
        }
      );
    },
  },
  components: {
    // HelloWorld
    School,
    Student,
    Cartoon,
    Category,
    Count,
  },
  mounted() {
    this.$refs.stu.$on("selfName", this.getStudentName);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.category {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
