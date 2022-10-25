<template>
  <div class="box">
    <div class="user1">
        <div class="title1">
            <p>更改密码：</p>
        </div>
        <div id="email" class="wrapper">
            <div 
            @mouseenter="oldTypeChange('text')" 
            @mouseleave="oldTypeChange('password')"
            class="input-data">
                <input
                    v-model="oldPassword"
                    :type="oldType" 
                    required>
                <div class="underline"></div>
                <label>{{oldPasswordText}}</label>
            </div>
            <div
            @mouseenter="newTypeChange('text')" 
            @mouseleave="newTypeChange('password')"
            class="input-data">
                <input
                    v-model="newPassword"
                    :type="newType" 
                    required>
                <div class="underline"></div>
                <label>{{newPasswordText}}</label>
            </div>
            <div 
            @mouseenter="newTypeChange('text')" 
            @mouseleave="newTypeChange('password')"
            class="input-data">
                <input
                    v-model="rePassword"
                    :type="newType" 
                    required>
                <div class="underline"></div>
                <label>{{rePasswordText}}</label>
            </div>
            <div @click.stop="stop()" style="display:flex">
                <div class="btn2">
                    <button @click="check()">确定</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {changeUsernameApi} from '../api'
export default {
name:'ChangePassword',
data() {
    return {
        oldPassword:'',
        oldPasswordText:'',
        newPassword:'',
        newPasswordText:'',
        rePassword:'',
        rePasswordText:'',

        oldType:'',
        newType:'',

        userList:{},
    }
},
methods:{
    stop(){
    },
    newAlert(btnSBoolean,content){
        this.$store.state.NewAlertContent = content
        this.$store.state.NewAlertBtnS = btnSBoolean
        this.$store.state.NewAlertShowFlagInPerson = true
    },
    oldTypeChange(str){
        this.oldType = str
    },
    newTypeChange(str){
        this.newType = str
    },
    oldCheck(value){
        if(value != this.userList.password){
            return '密码错误！'
        }else{
            return '密码 √'
        }
    },
    newCheck(value){
        const ruler = /[A-Z0-9a-z]/
        if(value.length < 8){
            return '密码至少需要八位！'
        }else if(value.length >16){
            return '密码应小于十六位！'
        }else{
            var str = '新的密码 √'
            for(let i=0;i<value.length;i++){
                if(!ruler.test(value[i])){
                str = '密码含有非法字符！'
                }
            }
            return str
        }
    },
    reCheck(value){
        if(value != this.newPassword){
            return '密码不一致！'
        }else{
            return '确认密码 √'
        }
    },
    check(){
        if(
            this.oldPasswordText == '密码 √' &&
            this.newPasswordText == '新的密码 √' &&
            this.rePasswordText == '确认密码 √'
            ){
                if(this.newPassword == this.oldPassword){
                    this.newAlert(false,'新密码与旧密码相同！')
                }else{
                    this.userList.password = this.newPassword
                    changeUsernameApi(this.userList.id,this.userList)
                    setTimeout(() => {
                        this.newAlert(false,'修改密码成功！')
                        this.$router.push('/person/message')
                    }, 600);
                }
            }
    }
},
watch:{
    oldPassword:{
        immediate:true,
        handler(){
            if(this.oldPassword == ''){
                this.oldPasswordText = '密码'
            }else{
                this.oldPasswordText = this.oldCheck(this.oldPassword)
            }
        }
    },
    newPassword:{
        immediate:true,
        handler(){
            if(this.newPassword == ''){
                this.newPasswordText = '新的密码'
            }else{
                this.newPasswordText = this.newCheck(this.newPassword)
                this.rePasswordText = this.reCheck(this.rePassword)
            }
        }
    },
    rePassword:{
        immediate:true,
        handler(){
            if(this.rePassword == ''){
                this.rePasswordText = '确认新的密码'
            }else{
                this.rePasswordText = this.reCheck(this.rePassword)
            }
        }
    }
    
},
mounted() {
    const tel = localStorage.getItem('tel')
    this.$store.dispatch('getLoginTel',tel)
    setTimeout(() => {
        this.userList = this.$store.state.login.loginTel
    }, 600);
},
}
</script>

<style scoped>
.box{
    margin-top: 120px;
    width: 100%;
    height: 85%;
    /* background-color: white; */
}
.user1{
    margin: auto;
    height: 80%;
    width: 80%;
    border-radius: 10px;
    background-color: rgb(55, 55, 55);
    display: flex;
}
.title1{
    position: absolute;
    transform: translate(10px,10px);
    font-size: 16px;
    color: white;
    z-index: 1000;
    text-shadow: 0 0 10px rgb(200, 200, 200), 0 0 20px rgb(200, 200, 200), 0 0 40px rgb(200, 200, 200);
}
.wrapper{
    margin: auto;
    margin-top: 55px;
    width: 35%;
    min-width: 200px;
    box-shadow:0px 0px 10px rgba(0, 0, 0, 0.1);
}
.wrapper .input-data{
    height: 40px;
    margin-bottom: 20%;
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
margin: auto;
margin-top: 0%;
}
.btn2 button{
border-radius: 5px;
margin-top: 0%;
border: 0px;
font-size: 16px;
width: 80px;
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

.i{
    width: 200px;
    height: 20px;
}
</style>