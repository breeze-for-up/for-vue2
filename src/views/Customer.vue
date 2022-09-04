<template>
    <div>
        <h1>Customer View</h1>
        <p>{{msg}}</p>
        <h2>接收到参数id:{{id}}, 标题：{{title}}</h2>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg:'会员页面'
            }
        },
        props:['id', 'title'],
        mounted() {
            console.log('===会员', this.$route)
        },
        // 路由组件独有的生命周期钩子
        activated(){
            console.log('组件被激活');
        },
        deactivated(){
            console.log('组件失活');
        },
        // 通过路由规则，进入该组件时被调用
        beforeRouteEnter (to, from, next) {
            // ...
        },
        // 通过路由规则，离开该组件时被调用
        beforeRouteLeave (to, from, next) {
            // ...
        }
    }
</script>

<style>

</style>