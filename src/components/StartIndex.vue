<template>
  <div>
    <a @click.prevent="changeStart" href="">
      <img src="../assets/StartIndex/logo-black.png" v-show="flag" @mouseenter="change()">
      
      
      <transition name="logo">
        <img src="../assets/Header/logo-hover2.png" v-show="!flag" @mouseleave="change()">
      </transition>
    </a>
  </div>
</template>

<script>
export default {
name:'StartIndex',
data() {
  return {
    flag: true,
  }
},
methods: {
  change(){
    this.flag = !this.flag
  }
},
props:[
  'changeStart'
]
}
</script>

<style scoped>
  div{
    background-color: rgb(25, 25, 25);
  }
  div a img{
    position: fixed;
    width: 50vw;
    height: 20vw;
    margin-left: 26vw;
    margin-right: 24vw;
    margin-top: 30vh;
  }
  .logo-enter{
    opacity: 0;
  }
  .logo-enter-to{
    opacity: 1;
  }
  .logo-enter-active{
    transition: 0.8s all ease;
  }
</style>