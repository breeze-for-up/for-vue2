<template>
  <div>
    <h2 ref="sch">学校名称: {{ schoolName }}</h2>
    <h2 id="address">地址: {{ address }}</h2>
    <button @click="showName">提示学校名</button><br />
    <button @click="showDom">获取Dom元素</button><br />
    <button @click="sendSchoolName">传递学校名字</button>
  </div>
</template>

<script>
import pubsub from "pubsub-js";

export default {
  name: "School",
  data() {
    return {
      schoolName: "清华大学",
      address: "北京某某某位置",
    };
  },
  methods: {
    showName() {
      alert(this.schoolName);
    },
    showDom() {
      console.log("@", this.$refs.sch);
      console.log("@", document.getElementById("address"));
    },
    sendSchoolName() {
      this.selfName(this.schoolName);
    },
  },
  props: ["selfName"],
  mounted() {
    // 在全局总线上绑定事件，当其他组件触发事件时，当前组件就能接收到回调信息
    this.$bus.$on("hello", (param) => {
      console.log("事件总线 - School组件收到数据:", param);
    });

    // pubsub订阅消息
    this.pubId = pubsub.subscribe("hello", (msgName, data) => {
      console.log("pubsub - School组件收到数据:", msgName, data);
    });
  },
  // 组件销毁之前解绑事件
  beforeDestroy() {
    this.$bus.$off("hello");

    pubsub.unsubscribe(this.pubId);
  },
};
</script>

<style>
</style>