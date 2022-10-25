<template> 
  <div class="theLogin">
    <BlackBackground/>
    <div class="loginAndRegister">
      <transition name="loginImg">
        <a class="theLoginA" v-show="imgFlag && theWidthFlag" @click.prevent="imgChange()" href=""> 
            <img class="theImg" src="../assets/TheLogin/1.png">
        </a>
      </transition>
      <transition name="registerImg">
        <a class="theLoginA2" v-show="!imgFlag && theWidthFlag" @click.prevent="imgChange()" href="">
            <img class="theImg" src="../assets/TheLogin/2.png">
        </a>
      </transition>
      <transition name="loginAndRegister">
        <div class="login" v-show="imgFlag" :style="{'transform':loginChange}">
          <form action="GET" novalidate>
              <img  @mouseleave="logoChange()" class="logo" src="../assets/Header/logo-hover2.png">
            <div id="tel" class="wrapper">
              <div class="input-data">
                  <input v-model="loginTelValue" 
                    type="text"
                    ref="loginTel"
                    required>
                  <div class="underline"></div>
                  <label>{{loginTel}}</label>
              </div>
            </div>

            <div id="password" class="wrapper">
              <div class="input-data">
                  <input v-model="loginPasswordValue"
                    :type="passwordInput" 
                    ref="loginPassword"
                    @mouseenter="passwordInput = 'text'" @mouseleave="passwordInput = 'password'" 
                   required>
                  <div class="underline"></div>
                  <label>{{loginPassword}}</label>
              </div>
            </div>

            <div class="btn">
              <button @click.prevent="loginCheck()">登&nbsp&nbsp录</button>
            </div>

            <div class="change">
              <a @click.prevent="imgChange()" href="">没有账号？</a>
            </div>
          </form>
        </div>
      </transition>
      <transition name="loginAndRegister">
        <div class="register" v-show="!imgFlag">
          <form action="GET" novalidate>
            <div id="tel2" class="wrapper">
              <div class="input-data">
                  <input 
                  type="text" 
                  v-model="registerTelValue" 
                  ref="registerTel"
                  required>
                  <div class="underline"></div>
                  <label>{{registerTel}}</label>
              </div>
            </div>
            
            <div id="password2" class="wrapper">
              <div class="input-data" id="passwordInput">
                  <input 
                  v-model="registerPasswordValue"
                  ref="registerPassword"
                  :type="passwordInput" 
                  @mouseenter="passwordInput = 'text'" 
                  @mouseleave="passwordInput = 'password'" 
                  required>
                  <div class="underline"></div>
                  <label>{{registerPassword}}</label>
              </div>
            </div>

            <div id="password3" class="wrapper">
              <div class="input-data" id="passwordInput">
                  <input 
                  v-model="registerPasswordReValue"
                  ref="registerPasswordRe"
                  :type="passwordInput"
                  @mouseenter="passwordInput = 'text'" 
                  @mouseleave="passwordInput = 'password'" 
                  required>
                  <div class="underline"></div>
                  <label>{{registerPasswordRe}}</label>
              </div>
            </div>

            <div id="checkWord2" class="wrapper">
              <div class="input-data">
                  <input 
                  v-model="registerCheckWordValue" 
                  type="text" 
                  ref="registerCheckWord"
                  required>
                  <div class="underline"></div>
                  <label>{{registerCheckWord}}</label>
                  <div class="btn2">
                    <button @click.prevent="createCheckWord()" id="send2">发&nbsp&nbsp&nbsp&nbsp送</button>
                  </div>
              </div>
            </div>

            <div id="btn2" class="btn">
              <button @click.prevent="registerCheck()">注&nbsp&nbsp册</button>
            </div>

            <div class="change">
              <a @click.prevent="imgChange()" href="">已有账号？</a>
            </div>
          </form>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import BlackBackground from '../components/BlackBackground.vue'
import {registerApi} from '../api'

export default {
name:"Login",
data() {
    return {
        logoFlag: true,
        theWidthFlag: true,
        passwordInput:'password',
        loginChange: '',
        old: 0,

        loginTelValue:'',
        loginPasswordValue:'',

        registerTelValue:'',
        registerPasswordValue:'',
        registerPasswordReValue:'',
        registerCheckWordValue:'',
        TheCheckWord:'',

        theLoginTel:'',
        theLoginTelOld:'',
        theLoginPassword:'',
        theRegisterTel:'',
        theRegisterPassword:'',


        loginTel:'手机号',
        loginPassword:'密码',
        registerTel:'手机号',
        registerPassword:'密码',
        registerPasswordRe:'确认密码',
        registerCheckWord:'验证码',
    }
},
methods: {
  logoChange(){
    this.logoFlag = !this.logoFlag
  },
  imgChange(){
    this.$store.state.loginAndRegisterChoice = !this.$store.state.loginAndRegisterChoice
  },
  lARchange(){
    this.lARflag = !this.lARflag
    this.imgChange()
  },
  widthFlag(){
    if(window.innerWidth < 650){
      this.loginChange = 'translateX(15%)'
      this.theWidthFlag = false
      return this.logoChange
    }
    if(window.innerWidth > 650){
      this.loginChange = 'translateX(100%)'
      this.theWidthFlag = true
      return this.logoChange
    }
  },
  createCheckWord(){
    var num = '';
    for(let i=0;i<6;i++){
      num += Math.floor(Math.random()*10);
    }
    this.TheCheckWord = num
    
    setTimeout(() => {
      const str = '验证码：'+this.TheCheckWord +''
      this.AlertShow(str)
    }, 800);
  },

  TelCheck(value){
    if(value.length != 11){
      return '请输入十一位手机号！'
    }else{
      if(isNaN(value)){
        return '手机号含有非数字！'
      }else{
        if(value[0] != 1){
          return '手机号格式不正确！'
        }else{
          return '手机号 √'
        }
      }
    }
  },

  PasswordCheck(value){
    const ruler = /[A-Z0-9a-z]/
    if(value.length < 8){
      return '密码至少需要八位！'
    }else if(value.length >16){
      return '密码应小于十六位！'
    }else{
      var str = '密码 √'
      for(let i=0;i<value.length;i++){
        if(!ruler.test(value[i])){
          str = '密码含有非法字符！'
        }
      }
      return str
    }
  },

  PasswordReCheck(){
    if(this.registerPasswordValue != this.registerPasswordReValue){
      return '两次输入密码不一致！'
    }else{
      return '确认密码 √'
    }
  },

  CheckWordCheck(value){
    const that = this
    if(value.length != 6){
      return '请输入六位验证码！'
    }else{
      if(value !== that.TheCheckWord){
        return '验证码不正确！'
      }else{
        return '验证码 √'
      }
    }
  },


  loginCheck(){
    if(this.loginTelValue == ''){
      this.loginTel = '请输入手机号！'
      this.$refs.loginTel.focus()
      setTimeout(() => {
        this.loginTel = '手机号'
      }, 1200)
    }else if(this.loginPasswordValue == ''){
      this.loginPassword = '请输入密码！'
      this.$refs.loginPassword.focus()
      setTimeout(() => {
        this.loginPassword = '密码'
      }, 1200)
    }else if(this.theLoginTel !== '' && this.theLoginPassword !== ''){
      if(this.theLoginTel == this.loginTelValue && this.theLoginPassword == this.loginPasswordValue){
        // console.log('旧：'+this.theLoginTelOld)
        // console.log('新：'+this.theLoginTel)
        if(this.theLoginTelOld == this.theLoginTel){
          // console.log('执行show')
          this.Show()
        }else{
          this.$store.dispatch('getLoginTel',this.theLoginTel)
          setTimeout(() => {
            let telList = this.$store.state.login.loginTel
            console.log(telList)
            console.log(telList.id)
            console.log(telList.password)
            if(telList.id == this.theLoginTel && telList.password == this.theLoginPassword){
              this.AlertShow('登录成功！',true)
              this.$store.state.logined = true
              localStorage.setItem('tel',this.theLoginTel)
              localStorage.setItem('logined',this.$store.state.logined)
              setTimeout(() => {
                this.$router.push('/home')
                location.reload()
              }, 1200);
              // console.log(this.$store.state)
            }else if(telList.id == undefined || telList.id != this.theLoginTel){
              this.AlertShow('账号不存在！',false)
              this.theLoginTelOld = this.theLoginTel
            }else if(telList.id != undefined && telList.password != this.theLoginPassword){
              this.AlertShow('密码错误！',false)
              this.theLoginTelOld = this.theLoginTel
            }
          }, 1200);
        }
    }
    }
  },

  registerCheck(){
    if(this.registerTelValue == ''){
      this.registerTel = '请输入手机号！'
      this.$refs.registerTel.focus()
      setTimeout(() => {
        this.registerTel = '手机号'
      }, 1200)
    }else if(this.registerPasswordValue == ''){
      this.registerPassword = '请输入密码！'
      this.$refs.registerPassword.focus()
      setTimeout(()=>{
        this.registerPassword = '密码'
      },1200)
    }else if(this.registerPasswordReValue == ''){
      this.registerPasswordRe = '请确认密码！'
      this.$refs.registerPasswordRe.focus()
      setTimeout(()=>{
        this.registerPasswordRe = '确认密码'
      },1200)
    }else if(this.registerCheckWordValue == ''){
      this.registerCheckWord = '请输入验证码！'
      this.$refs.registerCheckWord.focus()
      setTimeout(()=>{
        this.registerCheckWord = '验证码'
      },1200)
    }else if(this.theRegisterTel !=='' && this.theRegisterPassword !==''){
      if(this.theRegisterTel == this.registerTelValue && this.theRegisterPassword == this.registerPasswordValue && this.theRegisterPassword == this.registerPasswordReValue){
        const registerTel = this.theRegisterTel
        const registerPassword = this.theRegisterPassword
        var flag = true
        this.$store.dispatch('getLoginTel',this.theRegisterTel)
        setTimeout(()=>{
          let telList = this.$store.state.login.loginTel
          if(telList == undefined){
            flag = true
          }else if(telList.id == this.theRegisterTel){
            flag = false
          }

          if(flag){
            registerApi({
              id:registerTel,
              password:registerPassword,
              username:registerTel,
              userEmail:'',
              IconId:1,
            })
            this.AlertShow('注册成功！',false)
            this.$store.state.loginAndRegisterChoice = true
            setTimeout(() => {
              location.reload()
            }, 1200);
          }else{
            this.AlertShow('账号已存在！',false)
          }
        },1200)
      }
    }
  },

  AlertShow(value,boolean){
    this.$store.state.NewAlertShowFlag = true
    this.$store.state.NewAlertBtnS = false
    this.$store.state.NewAlertContent = value
    if(boolean){
      this.$store.state.NewAlertF5Flag = true
    }else if(!boolean){
      this.$store.state.NewAlertF5Flag = false
    }
  },
  Show(){
    const that = this
    setTimeout(() => {
      that.$store.state.NewAlertShowFlag = true
    }, 800);
  },
  exit(){
    this.$store.state.NewAlertShowFlag = false
  }
},
components:{
  BlackBackground,
  alert
},
watch:{
  loginTelValue:{
    immediate:true,
    handler(){
      if(this.loginTelValue == ''){
        this.loginTel = '手机号'
      }else{
        this.loginTel = this.TelCheck(this.loginTelValue)
        if(this.loginTel === '手机号 √'){
          this.theLoginTel = this.loginTelValue
        }
      }
    }
  },
  loginPasswordValue:{
    immediate:true,
    handler(){
      if(this.loginPasswordValue == ''){
        this.loginPassword = '密码'
      }else{
        this.loginPassword = this.PasswordCheck(this.loginPasswordValue)
        if(this.loginPassword === '密码 √'){
          this.theLoginPassword = this.loginPasswordValue
        }
      }
    }
  },
  registerTelValue:{
    immediate:true,
    handler(){
      if(this.registerTelValue == ''){
        this.registerTel = '手机号'
      }else{
        this.registerTel = this.TelCheck(this.registerTelValue)
        if(this.registerTel === '手机号 √'){
          this.theRegisterTel = this.registerTelValue
        }
      }
    }
  },
  registerPasswordValue:{
    immediate:true,
    handler(){
      if(this.registerPasswordValue == ''){
        this.registerPassword = '密码'
      }else{
        this.registerPassword = this.PasswordCheck(this.registerPasswordValue)
        this.registerPasswordRe = this.PasswordReCheck()
      }
    }
  },
  registerPasswordReValue:{
    immediate:true,
    handler(){
      if(this.registerPasswordReValue == ''){
        this.registerPasswordRe = '确认密码'
      }else{
        this.registerPasswordRe = this.PasswordReCheck()
        if(this.registerPassword === '密码 √' && this.registerPasswordRe === '确认密码 √'){
          this.theRegisterPassword = this.registerPasswordReValue
        }
      }
    }
  },
  registerCheckWordValue:{
    immediate: true,
    handler(){
      if(this.registerCheckWordValue == ''){
        this.registerCheckWord = '验证码'
      }else{
        this.registerCheckWord = this.CheckWordCheck(this.registerCheckWordValue)
      }
    }
  },
},
computed:{
  imgFlag(){
    return this.$store.state.loginAndRegisterChoice
  }
},
mounted() {
  this.widthFlag()
  window.addEventListener('resize',()=>{
    var now = new Date().getTime()
    if(now - this.old > 200 || this.old == 0){
      // console.log('内容执行')
      this.widthFlag()
      this.old=now
    }
  })
},
}
</script>

<style scoped>

.theLogin{
  width: 100vw;
  height: 100vh;
  min-height: 600px;
  display: flex;
  background-image: url("../assets/TheLogin/bg.jpg");
}
.theLoginA{
  position: absolute;
  z-index: 5;
  transform: translate(20%,-6%);
}
.theLoginA2{
  position: absolute;
  z-index: 5;
  transform: translate(150%,-6%);
}
.theLoginA2:hover{
  box-shadow: 0px 6px 14px 0px rgb(240 240 240 / 100%);
}
.theLoginA:hover{
  box-shadow: 0px 6px 14px 0px rgb(240 240 240 / 100%);
}
.theImg{
  height: 620px;
  border-radius: 5px;
  box-shadow: 0px 6px 14px 0px rgb(0 0 0 / 100%);
}
.loginAndRegister{
  margin: auto;
  width: 845px;
  min-width: 845px;
  height: 520px;
  background-color: rgb(65, 65, 65);
  border-radius: 15px;
  box-shadow: 0px 12px 28px 0px rgb(0 0 0 / 200%);
  opacity: 0.9;
}
.login{
  width: 50%;
  height: 100%;
  transform: translateX(100%);
}
.register{
  width: 50%;
  height: 100%;
  transform: translateX(15%);
}
.login div{
  position: absolute;
  z-index: 1;
}
.register div{
  position: absolute;
  z-index: 1;
}


.wrapper{
    margin-top:10px;
    width: 80%;
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
    transform: translateY(-40px);
    font-size: 15px;
    color: rgb(200, 200, 200);
    text-shadow: 0 0 10px rgb(210, 210, 210), 0 0 20px rgb(210, 210, 210), 0 0 40px rgb(210, 210, 210);
}
.wrapper .input-data input{
    width: 100%;
    height: 100%;
    border:none;
    font-size: 17px;
    border-bottom: 2px solid black;
    background-color:rgb(25, 25, 25);
    color:rgb(200, 200, 200);
}
.wrapper .input-data label{
    position: absolute;
    left: 0px;
    bottom: 10px;
    color: gray;
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
    background-color: gray;
    transform: scaleX(0);
    transition: transform 0.3s ease;
}
.input-data input:focus ~ .underline::before,
.input-data input:valid ~ .underline::before{
    transform: scaleX(1);
}
#tel{
  top:220px
}
#password{
  top:300px
}
#tel2{
  top:70px
}
#password2{
  top:150px
}
#password3{
  top:230px
}
#checkWord2{
  top: 310px;
  width: 50%;
}
.btn2{
  position: absolute;
  top: 0%;
  left: 110%;
}
.btn2 button{
  border-radius: 5px;
  font-size: 16px;
  width: 105px;
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
.btn{
  font-size:22px;
  top: 400px;
  margin-left: 22%;
}
.btn button{
  border-radius: 5px;
  width: 140px;
  height: 40px;
  background-color: rgb(25, 25, 25);
  color: gray;
}
.btn button:hover{
  color: rgb(200, 200, 200);
  box-shadow: 0px 6px 14px 0px rgb(25 25 25 / 160%);
  text-shadow: 0 0 10px rgb(240, 240, 240), 0 0 20px rgb(240, 240, 240), 0 0 40px rgb(240, 240, 240);
  transition: 0.3s all ease;
}
.logo{
  width: 300px;
  margin-left: 2%;
  margin-top: 60px;
  opacity: 0.8;
}
.change{
  position: absolute;
  right: 10%;
  bottom: 10%;
}
.change a{
  color: rgb(200, 200, 200);
  text-decoration: none;
}
.change a:hover{
  color: white;
  text-shadow: 0 0 10px rgb(240, 240, 240), 0 0 20px rgb(240, 240, 240), 0 0 40px rgb(240, 240, 240);
  transition: 0.3s all ease;
}
.logoTran-enter{
  opacity: 0.4;
}
.logoTran-enter-to{
  opacity: 0.8;
}
.logoTran-enter-active{
  transition: 0.6s all ease;
}
.registerImg-enter{
  transform: translate(20%,-6%);
}
.registerImg-enter-to{
  transform: translate(150%,-6%);
}
.registerImg-enter-active{
  transition: 0.6s all ease;
}
.loginImg-enter{
  transform: translate(150%,-6%);
}
.loginImg-enter-to{
  transform: translate(20%,-6%);
}
.loginImg-enter-active{
  transition: 0.6s all ease;
}
.loginAndRegister-enter{
  opacity: 0;
}
.loginAndRegister-enter-to{
  opacity: 1;
}
.loginAndRegister-enter-active{
  transition: 1.8s all ease;
}
</style>

