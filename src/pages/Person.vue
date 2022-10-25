<template>
  <div @click="AlertClear()" class="person">
    <transition name="newAlert">
      <div @click.stop="stop()" class="Alert" v-if="this.$store.state.NewAlertShowFlagInPerson">
        <NewAlert :btnMethod='btnMethod'/>
      </div>
    </transition>
    <transition name="userIcon">
      <div v-show="UserIconFlag">
      <UserIcon :changeUserIcon='changeUserIcon' :choiceUserIcon='choiceUserIcon'/>
    </div>
    </transition>
    <BlackBackground/>
    <div class="personBox">
      <transition name="personMessage">
        <div @click="usernameChange2()" v-show="startFlag1" class="personMessage">
        <div @click="changeUserIcon()" class="personImg">
          <img class="personMessageImg" v-show="imgId==1" src="../assets/Person/img_1.png">
          <img class="personMessageImg" v-show="imgId==2" src="../assets/Person/img_2.png">
          <img class="personMessageImg" v-show="imgId==3" src="../assets/Person/img_3.png">
          <img class="personMessageImg" v-show="imgId==4" src="../assets/Person/img_4.png">
          <img class="personMessageImg" v-show="imgId==5" src="../assets/Person/img_5.png">
          <img class="personMessageImg" v-show="imgId==6" src="../assets/Person/img_6.png">
          <img class="personMessageImg" v-show="imgId==7" src="../assets/Person/img_7.png">
          <img class="personMessageImg" v-show="imgId==8" src="../assets/Person/img_8.png">
        </div>
        <transition name='usernameM'>
          <div v-show="!usernameChangeFlag1" @click="usernameChange1()" class="message">
            <div class="messageP">
              <p>名称：{{username}}</p>
            </div>
          </div>
        </transition>
        <transition name='usernameC'>
          <div @click.stop="stop()" v-show="usernameChangeFlag2" id="username" class="wrapper">
            <div class="input-data">
                <input v-model="usernameNew"
                  type="text" 
                  required>
                <div class="underline"></div>
                <label>名称：</label>
                <div class="btn2">
                    <button @click.prevent="newAlert(true,'确定更改用户名？')">更改</button>
                </div>
            </div>
          </div>
        </transition>
          <div class="message">
            <div class="messageP">
              <p>手机号：{{userTel}}</p>
            </div>
          </div>
        </div>
      </transition>
      <transition name='header'>
        <div v-show="startFlag2" :style="{'width':headerWidth,'left':headerLeft}" class="headerBox">
          <div class="personAction">
            <router-link to="/person/message">个人信息</router-link>
          </div>
          <div class="personAction">
            <router-link to="/person/dynamic">暂未开发</router-link>
          </div>
        </div>
      </transition>
        <div :style="{'width':routerWidth}" class="routerView">
          <transition name="routerView">
            <router-view v-show="startFlag2"></router-view>
          </transition>
        </div>
    </div>
  </div>
</template>

<script>
import BlackBackground from "../components/BlackBackground.vue"
import NewAlert from '../components/NewAlert.vue'
import UserIcon from '../components/UserIcon.vue'

import {changeUsernameApi} from '../api'

export default {
name:'Person',
data() {
  return {
    old:0,

    imgId: 1,
    
    username:'',
    usernameNew:'',
    usernameChangeFlag1:false,
    usernameChangeFlag2:false,
    changeUsername: true,
    
    startFlag1:false,
    startFlag2:false,

    UserIconFlag: false,

    headerWidth:'',
    headerLeft:'',
    routerWidth:'',

    userTel:'',

    userList:{}
  }
},
components:{
  BlackBackground,
  NewAlert,
  UserIcon
},
methods:{
  stop(){
  },
  usernameChange1(){
    setTimeout(() => {
        this.usernameChangeFlag1 = true
      setTimeout(() => {
        this.usernameChangeFlag2 = true
      }, 10);
    }, 30);
  },
  usernameChange2(){
    this.usernameChangeFlag2 = false
    setTimeout(() => {
      this.usernameChangeFlag1 = false
    }, 10);
  },
  newAlert(btnSBoolean,content){
    this.$store.state.NewAlertContent = content
    this.$store.state.NewAlertBtnS = btnSBoolean
    this.$store.state.NewAlertShowFlagInPerson = true
  },
  btnMethod(){
    this.userList.username = this.usernameNew
    // console.log(this.userList)
    changeUsernameApi(this.userTel,this.userList)
    this.$store.state.NewAlertShowFlagInPerson = !this.$store.state.NewAlertShowFlagInPerson
    setTimeout(() => {
      location.reload()
    }, 1200);
  },
  personMessageShow(){
    if(window.innerWidth > 1650){
      this.headerWidth = '50%'
      this.headerLeft = '36%'
      this.routerWidth = '60%'
      this.startFlag1 = true
    }else if(window.innerWidth > 1200){
      this.headerWidth = '50%'
      this.headerLeft = '40%'
      this.routerWidth = '60%'
      this.startFlag1 = true
      // console.log('触发')
    }else{
      this.headerWidth = '80%'
      this.headerLeft = '10%'
      this.routerWidth = '95%'
      this.startFlag1 = false
      // console.log('触发')
    }
  },
  changeUserIcon(){
    this.UserIconFlag = !this.UserIconFlag
    this.startFlag1 = !this.startFlag1
    this.startFlag2 = !this.startFlag2
  },
  choiceUserIcon(value){
    this.imgId = value
    this.userList.IconId = this.imgId
    changeUsernameApi(this.userTel,this.userList)
  },
  AlertClear(){
    this.$store.state.NewAlertShowFlagInPerson = false
    // console.log(this.$store.state.NewAlertShowFlagInPerson)
  }
},
mounted() {
  this.userTel = localStorage.getItem('tel')
  this.$store.dispatch('getLoginTel',this.userTel)
  setTimeout(() => {
    this.username = this.$store.state.login.loginTel.username
    this.userList = this.$store.state.login.loginTel
    this.imgId = this.userList.IconId
  }, 400);
  setTimeout(() => {
    this.personMessageShow()
  }, 400);
  setTimeout(() => {
    this.startFlag2 = true
  }, 1200);
  window.addEventListener('resize',()=>{
    var now = new Date().getTime()
    if(now - this.old > 200 || this.old == 0){
      // console.log('检测')
      this.personMessageShow()
      this.old=now
    }
  })
},
}
</script>

<style scoped>
.Alert{
  z-index: 10000;
}
.person{
  height: 100vh;
  min-height: 680px;
  width: 100vw;
  background-image: url("../assets/Person/1.png");
  display: flex;
}
.personBox{
  width: 80vw;
  min-width: 500px;
  height: 650px;
  margin:auto;
  background-color: rgb(25, 25, 25);
  opacity: 0.9;
  border-radius: 5px;
  box-shadow: 0px 6px 14px 0px rgb(0 0 0 / 80%);
  display: flex;
}
.personMessage{
  margin-top: 3vh;
  margin-left: 2vw;
  height: 90%;
  width: 380px;
  background-color: rgb(0, 0, 0);
  opacity: 0.8;
  box-shadow: 0px 6px 14px 0px rgb(0 0 0 / 80%);
  color: white;
}
.personMessageImg{
  margin-left: 22%;
  margin-top: 150px;
  width: 200px;
  height: 200px;
  border: 5px solid gray;
}
.personMessageImg:hover{
  border: 5px solid white;
  box-shadow: 0px 6px 14px 0px rgb(240 240 240 / 80%);
  transition: 0.3s all ease;
}
.message{
  margin-left:82px;
  margin-top:10px;
  width: 56%;
  height: 40px;
  box-shadow:0px 0px 10px rgba(0, 0, 0, 0.6);
  background-color:rgb(25, 25, 25);
  display: flex;
  opacity: 0/9;
}
.messageP{
  margin-top: auto;
  margin-bottom: auto;
  font-size: 14px;
}
.headerBox{
  position: absolute;
  height: 60px;
  display: flex;
  z-index: 1000;
  transition: 0.2s all ease;
}
.personAction{
  margin-top: 50px;
  height: 60px;
  width: 20%;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(0, 0, 0);
  display: flex;
  opacity: 0.9;
  border-radius: 5px;
  font-size: 16px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
}
.personAction a{
  margin: auto;
}
.personAction a:hover{
  color: white;
  text-shadow: 0 0 10px white, 0 0 20px white, 0 0 40px white;
  transition: 0.3s all ease;
  text-decoration: none;
}
.routerView{
  margin-top: 3vh;
  margin-left: auto;
  margin-right: auto;
  height: 90%;
  width: 100%;
  background-color: rgb(45, 45, 45);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
  opacity: 0.8;
}



.wrapper{
    margin-left:82px;
    margin-top:10px;
    width: 35%;
    box-shadow:0px 0px 10px rgba(0, 0, 0, 0.1);
}
.wrapper .input-data{
    height: 40px;
    position: relative;
    color: white;
}
.input-data input:focus ~ label,
.input-data input:valid ~ label{
    /*
        focus输入框被激活
        valid输入框有内容
    */
    transform: translateX(-40px);
    font-size: 15px;
    color: white;
    text-shadow: 0 0 10px rgb(210, 210, 210), 0 0 20px rgb(210, 210, 210), 0 0 40px rgb(210, 210, 210);
}
.wrapper .input-data input{
    width: 100%;
    height: 100%;
    border:none;
    font-size: 17px;
    border-bottom: 2px solid black;
    background-color:rgb(25, 25, 25);
    color:white;
}
.wrapper .input-data label{
    position: absolute;
    left: 0px;
    bottom: 10px;
    color: white;;
    pointer-events: none;
    transition: all 0.3s ease;
}
.wrapper .input-data .underline{
    position: absolute;
    bottom: 0px;
    height: 2px;
    width: 100%;
}
.input-data .underline:before{
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    background-color: white;
    transform: scaleX(0);
    transition: transform 0.3s ease;
}
.input-data input:focus ~ .underline::before,
.input-data input:valid ~ .underline::before{
    transform: scaleX(1);
}
.btn2{
  position: absolute;
  top: 0%;
  left: 110%;
}
.btn2 button{
  font-size: 16px;
  width:70px;
  height: 40px;
  background-color: rgb(25, 25, 25);
  color: gray;
}
.btn2 button:hover{
  color: rgb(200, 200, 200);
  box-shadow: 0px 6px 14px 0px rgb(25 25 25 / 160%);
  text-shadow: 0 0 10px rgb(240, 240, 240), 0 0 20px rgb(240, 240, 240), 0 0 40px rgb(240, 240, 240);
  transition: 0.3s all ease;
}





.usernameM-enter{
  transform: translateX(20px);
  opacity: 1;
}
.usernameM-enter-to{
  transform: translateX(0px);
  opacity: 0;
}
.usernameM-enter-active{
  transition: 0.3s all ease;
}
.usernameC-enter{
  transform: translate(-20px,0px);
  opacity: 0;
}
.usernameC-enter-to{
  transform: translate(0px,0px);
  opacity: 1;
}
.usernameC-enter-active{
  transition: 0.3s all ease;
}


.personMessage-enter{
  transform: translateX(-40px);
  opacity: 0;
}
.personMessage-enter-to{
  transform: translateY(0px);
  opacity: 1;
}
.personMessage-enter-active{
  transition: 0.6s all ease;
}



.header-enter{
  transform: translateY(-40px);
  opacity: 0;
}
.header-enter-to{
  transform: translateY(0px);
  opacity: 1;
}
.header-enter-active{
  transition: 0.6s all ease;
}

.routerView-enter{
  transform: translateY(-40px);
  opacity: 0;
}
.routerView-enter-to{
  transform: translateY(0px);
  opacity: 1;
}
.routerView-enter-active{
  transition: 0.3s all ease;
}

.userIcon-enter{
  opacity: 0;
}
.userIcon-enter-to{
  opacity: 1;
}
.userIcon-enter-active{
  transition: 0.3s all ease-in;
}
.userIcon-leave{
  opacity: 1;
}
.userIcon-leave-to{
  opacity: 0;
}
.userIcon-leave-active{
  transition: 0.3s all ease-in;
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