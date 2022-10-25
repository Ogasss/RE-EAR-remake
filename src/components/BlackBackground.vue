<template>
  <transition name="black"><img class="blackBackground" v-show="blackShow" src="../assets/Home/0.png"></transition>
</template>

<script>
export default {
name:'BlackBackground',
data() {
    return {
        blackShow:true,
    }
},
mounted() {
  setTimeout(()=>{
    this.blackShow = !this.blackShow
  },300);
},
}
</script>

<style scoped>
.blackBackground{
  height: 100vh;
  width: 100vw;
  position: fixed;
  bottom: 0%;
  right: 0%;
  z-index: 10;
}
.black-leave{
    opacity: 0.6;
}
.black-leave-to{
    opacity: 0;
} 
.black-leave-active{
    transition: 0.8s all ease;
}
</style>