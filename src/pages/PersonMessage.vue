<template>
  <div class="box">
    <div class="user1">
      <div class="title1">
        <p>账号信息：</p>
      </div>
      <br>
      <div class="message">
        <div class="messageP">
          <p>&nbsp手机号：</p>
          <p>{{userTel}}</p>
        </div>
      </div>
      <div class="message">
        <div class="messageP">
          <p>&nbsp邮箱：&nbsp&nbsp</p>
          <p>{{userEmail}}</p>
        </div>
      </div>
      <div class="message">
        <div class="messageP">
          <p>&nbsp名称：&nbsp&nbsp</p>
          <p>{{username}}</p>
        </div>
      </div>
      <br>
    </div>
    <br>
    <div class="user2" id="user2-1">
      <div class="title1">
        <p>信息更改：</p>
      </div>
      <div :style="{'margin-top':user2top1}" class="btn2">
          <router-link to="/person/forgetPassword"><button>忘记密码</button></router-link>
      </div>
      <div :style="{'margin-top':user2top1}"  class="btn2">
          <router-link to="/person/changePassword"><button>修改密码</button></router-link>
      </div>
    </div>
    <div class="user2" id="user2-2">
      <div :style="{'margin-top':user2top2}" class="btn3">
          <router-link to="/person/changeTel"><button>更改手机</button></router-link>
      </div>
      <div :style="{'margin-top':user2top2}"  class="btn3">
          <router-link to="/person/changeEmail"><button>更改邮箱</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlackBackground from "../components/BlackBackground.vue"
export default {
name:'PersonMessage',
data() {
    return {
        old:0,

        userTel:'',
        username:'',
        userEmail:'',

        user2top1:'',
        user2top2:'',

        userList:''
    }
},
components:{
  BlackBackground,
},
methods: {
  setUser2top(){
    if(window.innerWidth < 800){
      this.user2top1 = '10%'
      this.user2top2 = '5%'
    }else if(window.innerWidth < 1300){
      this.user2top1 = '8%'
      this.user2top2 = '2%'
    }else{
      this.user2top1 = '6%'
      this.user2top2 = '3%'
    }
  }
},
mounted() {
  this.userTel = localStorage.getItem('tel')
  this.$store.dispatch('getLoginTel',this.userTel)
  setTimeout(() => {
    this.userList = this.$store.state.login.loginTel
    this.username = this.userList.username
    this.userEmail = this.userList.userEmail
  }, 200);
  this.setUser2top()
  window.addEventListener('resize',()=>{
    var now = new Date().getTime()
    if(now - this.old > 200 || this.old == 0){
      this.setUser2top()
      this.old=now
    }
  })
},
}
</script>

<style scoped>
  .box{
    margin-top: 90px;
    width: 100%;
    height: 85%;
    /* background-color: white; */
  }
  .title1{
    position: absolute;
    transform: translate(10px,10px);
    font-size: 16px;
    color: white;
    z-index: 1000;
    text-shadow: 0 0 10px rgb(200, 200, 200), 0 0 20px rgb(200, 200, 200), 0 0 40px rgb(200, 200, 200);
  }
  .user1{
    margin: auto;
    width: 80%;
    border-radius: 10px;
    background-color: rgb(55, 55, 55);
  }
  .user2{
    margin: auto;
    width: 80%;
    height: 18%;
    background-color: rgb(55, 55, 55);
    display: flex;
  }
  #user2-1{
    border-radius: 10px 10px 0px 0px;
  }
  #user2-2{
    border-radius: 0px 0px 10px 10px;
  }
  .btn2{
    margin: auto;
    margin-top: 10%;
  }
  .btn2 button{
    border-radius: 5px;
    margin-top: 0%;
    border: 0px;
    font-size: 16px;
    width: 100px;
    height: 50px;
    background-color: rgb(25, 25, 25);
    color: rgb(200, 200, 200);
  }
  .btn2 button:hover{
    color: rgb(200, 200, 200);
    box-shadow: 0px 6px 14px 0px rgb(25 25 25 / 160%);
    text-shadow: 0 0 10px rgb(200, 200, 200), 0 0 20px rgb(200, 200, 200), 0 0 40px rgb(200, 200, 200);
    transition: 0.3s all ease;
  }
  .btn3{
    margin: auto;
    margin-top: 5%;
  }
  .btn3 button{
    border-radius: 5px;
    margin-top: 0%;
    border: 0px;
    font-size: 16px;
    width: 100px;
    height: 50px;
    background-color: rgb(25, 25, 25);
    color: rgb(200, 200, 200);
  }
  .btn3 button:hover{
    color: rgb(200, 200, 200);
    box-shadow: 0px 6px 14px 0px rgb(25 25 25 / 160%);
    text-shadow: 0 0 10px rgb(200, 200, 200), 0 0 20px rgb(200, 200, 200), 0 0 40px rgb(200, 200, 200);
    transition: 0.3s all ease;
  }
  .message{
    color: white;
    margin: auto;
    margin-top: 5%;
    width: 45%;
    min-width: 220px;
    height: 50px;
    box-shadow:0px 0px 10px rgba(0, 0, 0, 0.6);
    background-color:rgb(25, 25, 25);
    display: flex;
    opacity: 0.9;
  }
  .messageP{
    margin-top: auto;
    margin-bottom: auto;
    font-size: 14px;
    display: flex;
  }

</style>