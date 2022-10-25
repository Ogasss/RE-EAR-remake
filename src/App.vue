<template>
<div class="Box">
  <div v-show="start" class="appStartIndex"><StartIndex :changeStart="changeStart"/></div>
  <div v-show="!start" class="appHeader"><Header :showLogin="showLogin"/></div>
  <div @click="NewAlertCancel()" v-if="!start" class="appRouterView"><router-view></router-view></div>
  <div @click="NewAlertCancel()" v-show="footerFlag && !start && this.$route.path == '/home'" class="appFooter"><Footer/></div>
</div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import StartIndex from './components/StartIndex.vue'


export default {
name:'app',
data() {
  return {
    loginFlag: true,
    footerFlag: true,
    start: true,
    old: 0
  }
},
methods: {
  footerShow(){
    if(window.innerHeight < 535 || window.innerWidth < 700){
      this.footerFlag = false
    }else{
      this.footerFlag = true
    }
  },
  changeStart(){
    this.start = !this.start
  },
  showLogin(){
    this.loginFlag = true
  },
  NewAlertCancel(){
    this.$store.state.NewAlertShowFlag = false
  }
},
components:{
  Header,
  Footer,
  StartIndex,
},
mounted() {
  if(localStorage.getItem('logined')==='false'){
    this.start = true
  }else if(localStorage.getItem('logined')==='true'){
    this.start = false
  }
  this.footerShow()
  window.addEventListener('resize',()=>{
    var now = new Date().getTime()
    // console.log(now - this.old)
    if(now - this.old > 200 || this.old == 0){
      this.footerShow()
      // console.log('检测')
      this.old=now
    }
  })
},
}
</script>

<style>
.Box{
  background-color: rgb(25, 25, 25);
}
.appHeader{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}
.appFooter{
  position: fixed;
  bottom: 5%;
  left: 5%;
  z-index: 1000;
  background-color: rgb(36, 36, 36);
  opacity: 0.6;
  box-shadow: 0px 6px 14px 0px rgb(0 0 0 / 80%);
}
.appRouterview{
  position: fixed;
  z-index: -1;
}
.appStartIndex{
  width: 100vw;
  height: 100vh;
  background-color: rgb(25, 25, 25);
  z-index: 10000;
}
.appTheLogin{
  position: fixed;
  z-index: 100;
}
</style>