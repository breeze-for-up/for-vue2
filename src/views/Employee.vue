<template>
    <div>
        <h1>Employee View</h1>
        <p>{{msg}}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg:'员工页面'
            }
        },
        mounted() {
            console.log('===员工', this.$route)
        },
    }
</script>

<style>

</style>