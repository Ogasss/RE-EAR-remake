<template>
  <div class="box">
    <div class="user1">
        <div class="title1">
            <p>更改邮箱：</p>
        </div>
        <div id="email" class="wrapper">
            <div class="input-data">
                <input
                    v-model="userEmail"
                    ref="userEmail"
                    type="text" 
                    required>
                <div class="underline"></div>
                <label>{{userEmailText}}</label>
            </div>
            <div class="input-data">
                <input
                    v-model="checkWord"
                    ref="checkWord"
                    type="text" 
                    required>
                <div class="underline"></div>
                <label>{{checkWordText}}</label>
            </div>
            <div @click.stop="stop()" style="display:flex">
                <div class="btn2">
                    <button @click="createCheckWord()">发送</button>
                </div>
                <div class='i'></div>
                <div class="btn2">
                    <button @click="changeEmailCheck()">确定</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {changeUsernameApi} from '../api'
export default {
name:'ChangeEmail',
data() {
    return {
        userTel:'',
        userList:'',

        userEmail:'',
        checkWord:'',

        userEmailValue:'',

        TheCheckWord:'',

        checkWordText:'',
        userEmailText:'',
    }
},
methods: {
    stop(){

    },
    createCheckWord(){
        if(this.userEmailText != '邮箱 √'){
            this.$refs.userEmail.focus()
        }else{
            var num = '';
            for(let i=0;i<6;i++){
                num += Math.floor(Math.random()*10);
            }
            this.TheCheckWord = num
            setTimeout(() => {
                const str = '验证码：'+this.TheCheckWord +''
                this.newAlert(false,str)
            }, 400);
        }
    },
    checkWordCheck(value){
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
    userEmailCheck(){
        const str = this.userEmail
        var flag
        var i
        var arr
        var arr0
        for(i=0;i<str.length;i++){
            if(str[i] == '@'){
                flag = i
                // console.log(flag)
            }
        }
        if(flag === undefined){
            // console.log(flag)
            return '邮箱应包含@！'
        }else{
            flag = undefined
            arr = str.split('@')
            // console.log(str)
            // console.log(arr[0],'   ',arr[1])
            if(arr[0] == ''){
                return '邮箱不能以@开头！'
            }else{
                for(i=0;i<arr[1].length;i++){
                    if(arr[1][i] == '.'){
                        flag = i
                    }
                }
                if(flag === undefined){
                    return '邮箱应该以.com结尾！'
                }else{
                    arr0 = arr[1].split('.')
                    if(arr0[1] != 'com'){
                        return '邮箱应该以.com结尾！'
                    }else if(arr0[0] == ''){
                        return '@后不能紧接.com！'
                    }else{
                        return '邮箱 √'
                    }
                }
            }
        }
    },

    newAlert(btnSBoolean,content){
        this.$store.state.NewAlertContent = content
        this.$store.state.NewAlertBtnS = btnSBoolean
        this.$store.state.NewAlertShowFlagInPerson = true
    },
    changeEmailCheck(){
        if(this.userEmailText != '邮箱 √'){
            this.$refs.userEmail.focus()
        }else if(this.checkWordText != '验证码 √'){
            this.$refs.checkWord.focus()
        }else{
            this.userEmailValue = this.userEmail
            this.userTel = localStorage.getItem('tel')
            this.$store.dispatch('getLoginTel',this.userTel)
            setTimeout(() => {
                this.userList = this.$store.state.login.loginTel
                this.userList.userEmail = this.userEmailValue
                changeUsernameApi(this.userTel,this.userList)
                setTimeout(() => {
                    this.$router.push('/person/message')
                }, 600);
            }, 600);
        }
    }
},
watch:{
    checkWord:{
        immediate: true,
        handler(){
        if(this.checkWord == ''){
            this.checkWordText = '请输入验证码：'
        }else{
            this.checkWordText = this.checkWordCheck(this.checkWord)
        }
        }
    },
    userEmail:{
        immediate: true,
            handler(){
            if(this.userEmail == ''){
                this.userEmailText = '请输入新的邮箱：'
            }else{
                this.userEmailText = this.userEmailCheck()
                /*
                    是否有@
                        以@拆分为两个字符串
                            前段不为空
                            后段有点
                                以点拆分为两个字符串
                                    前段不为空
                                    后段为com
                */
            }
        }
    }
}
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