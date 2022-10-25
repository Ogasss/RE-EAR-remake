<template>
<div>
  <transition name="newAlert">
    <div v-if="this.$store.state.NewAlertShowFlag">
      <NewAlert :btnMethod="exit"/>
    </div>
  </transition>
  <div class="header">
    <div @click="NewAlertCancel()" @mouseenter="change()" @mouseleave="change()">
      <router-link to="/home">
        <img v-show="!logoHoverFlag" src="../assets/Header/logo.png">
        <transition name="logo">
          <img v-show="logoHoverFlag" src="../assets/Header/logo-hover.png">
        </transition>
      </router-link>
      <transition name="list">
        <div v-show="logoHoverFlag" class="headerTwo">
          <div class="headerTwoDiv"><router-link to="/news">情报资讯<div class="underline"></div></router-link></div>
        </div>
      </transition>
    </div> 

      <div @click="NewAlertCancel()" class="i"></div>
    <div @click="NewAlertCancel()" v-if="!logined" class="loginAndRegister">
      <router-link class="routerLink"
      @click.native="choiceLogin()"
       to="/login">登录</router-link>
      <div class="borderBox"></div>
      <router-link class="routerLink"
      @click.native="choiceRegister()"
       to="/login">注册</router-link>
    </div>
    <div v-if="logined" class="loginAndRegister">
      <router-link @click="NewAlertCancel()" class="routerLink"
       to="/person/message">我的</router-link>
      <div @click="NewAlertCancel()" class="borderBox"></div>
      <a href="" @click.prevent="exitShow()"
      class="routerLink"
       to="./">退出</a>
    </div>
  </div>

</div>
</template>

<script>
import NewAlert from './NewAlert.vue'
export default {
  name:'Header',
  data() {
    return {
      logoHoverFlag: false,
      loginFlag:false,
      exitFlag:false,
    }
  },
  methods: {
    change(){
      this.logoHoverFlag = !this.logoHoverFlag
    },
    choiceLogin(){
      this.$store.state.loginAndRegisterChoice = true
    },
    choiceRegister(){
      this.$store.state.loginAndRegisterChoice = false
    },
    exitShow(){
      this.$store.state.NewAlertTitle = ''
      this.$store.state.NewAlertContent = '是否要退出已登录的账号？'
      this.$store.state.NewAlertBtnS = true
      this.$store.state.NewAlertShowFlag = !this.$store.state.NewAlertShowFlag
      this.$store.state.NewAlertF5Flag = false
    },
    exit(){
      this.$store.state.NewAlertShowFlag = !this.$store.state.NewAlertShowFlag
      this.$store.state.logined = false;
      localStorage.setItem('logined',this.$store.state.logined)
      localStorage.setItem('tel','')
      this.$store.state.login = {};
      this.$router.push('/home')
      location.reload()
    },
    NewAlertCancel(){
    this.$store.state.NewAlertShowFlag = false
  }
  },
  components:{
    NewAlert
  },
  computed:{
    logined(){
      let value
      if(localStorage.getItem('logined')==='false'){
        value = false
      }else if(localStorage.getItem('logined')==='true'){
        value = true
      }
      return value
    }
  },
  props:[
    'showLogin'
  ],
}
</script>

<style scoped>
.header{
  opacity: 0.9;
  display: flex;
  background-color: rgb(25, 25, 25);
  box-shadow: 0px 6px 14px 0px rgb(0 0 0 / 80%);
  height: 60px;
}
.header img{
  height: 60px;
  position: fixed;
  left: 20px
}
.i{
  width: 90%;
}
.borderBox{
  height: 18px;
  border-left: 2px solid #fff;
  margin:auto;
}
.loginAndRegister{
  width: 8%;
  min-width: 125px;
  display: flex;
}
.routerLink{
  margin: auto;
  color:white;
  font-size: 18px;
}
a:hover{
  color:white;
  text-shadow: 0 0 10px white, 0 0 20px white, 0 0 40px white;
  transition: text-shadow 0.3s ease;
  text-decoration: none;
}
.headerTwo{
  opacity: 0.65;
  color: rgb(255, 255, 255);
  font-size: 16px;
  position: fixed;
  top:60px;
  left:0px;
}
.headerTwoDiv{
    background-color: rgb(25, 25, 25);
    height: 60px;
    width: 200px;
    box-shadow: 0px 6px 14px 0px rgb(0 0 0 / 80%);
    display: flex;
}
.headerTwo div a{
    margin: auto;
    border-bottom: 2px solid rgb(25, 25, 25);
}
.headerTwo div a:hover{
    color:white;
    text-shadow: 0 0 10px rgb(210, 210, 210), 0 0 20px rgb(210, 210, 210), 0 0 40px rgb(210, 210, 210);
    text-decoration: none; 
    transform: translateX(10px);
    transition: all 0.3s ease;
}

.logo-enter{
  opacity: 0.6;
}
.logo-enter-to{
  opacity: 1;
}
.logo-enter-active{
  transition: 0.6s all ease;
}

.list-enter{
  transform: translateX(-200px);
}
.list-enter-to{
  transform: translateX(0px);
}
.list-enter-active{
  transition: 0.6s all ease;
}
.list-leave{
  transform: translateX(0px);
}
.list-leave-to{
  transform: translateX(-200px);
}
.list-leave-active{
  transition: 0.6s all ease;
}
.newAlert-enter{
  transform: translateY(-40px);
  opacity: 0;
}
.newAlert-enter-to{
  transform: translateY(0px);
  opacity: 1;
}
.newAlert-enter-active{
  transition: 0.3s all ease;
}
.newAlert-leave{
  transform: translateY(0px);
  opacity: 1;
}
.newAlert-leave-to{
  transform: translateY(-40px);
  opacity: 0;
}
.newAlert-leave-active{
  transition: 0.3s all ease;
}
</style>