<template>
<div class="box">
    <div class="newAlert" :style="{'margin-left':marginLeft,'margin-top':marginTop}">
        <div class="title"><p>{{title}}</p></div>
        <div class="content"><p>{{content}}</p></div>
        <div v-if="!btnS" class="btn">
            <button @click="cancelMethod()">确认</button>
        </div>
        <div v-if="btnS" class="btn">
            <button @click="btnMethod()">确认</button>
            <button @click="cancelMethod()">取消</button>
        </div>
    </div>
</div>
</template>

<script>
export default {
name:'NewAlert',
data() {
    return {
        marginLeft:'',
        marginTop:'',
    }
},
computed:{
    title(){
        return this.$store.state.NewAlertTitle
    },
    content(){
        return this.$store.state.NewAlertContent
    },
    btnS(){
        return this.$store.state.NewAlertBtnS
    },
},
methods:{
    cancelMethod(){
        this.$store.state.NewAlertShowFlag = false
        this.$store.state.NewAlertShowFlagInPerson = false
        if(this.$store.state.NewAlertF5Flag == true){
            location.reload()
        }
    },
},
props:[
    'btnMethod',
],
mounted() {
    const that = this
    that.marginLeft = window.innerWidth/2 - 200 + 'px'
    that.marginTop = window.innerHeight/2 - 120 + 'px'
    window.addEventListener('resize',()=>{
        that.marginLeft = window.innerWidth/2 - 200 + 'px'
        that.marginTop = window.innerHeight/2 - 120 + 'px'
  })
},
}
</script>

<style scoped>
.box{
    height: 100%;
    width: 100%;
    
}
.newAlert{
    position: fixed;
    margin-left: 50vw - 380px;
    margin-top: 50vh - 120px;
    height: 180px;
    width: 380px;
    color: white;
    background-color: rgb(25, 25, 25);
    opacity: 0.9;
    z-index: 10000;
    border-radius: 5px;
    box-shadow: 0px 6px 14px 0px rgb(0 0 0 / 80%);
}
.title{
    height: 20%;
    display: flex;
}
.title p{
    margin-left: 5%;
    margin-top: 5%;
}
.content{
    height: 50%;
    display: flex;
    font-size: 18px;
}
.content p{
    margin: auto;
}
.btn{
    height: 50%;
    display: flex;
}
.btn button{
    height: 40px;
    width: 80px;
    margin-left: auto;
    margin-right: auto;
    background-color: rgb(25, 25, 25);
  color: gray;
}
.btn button:hover{
  color: rgb(200, 200, 200);
  box-shadow: 0px 6px 14px 0px rgb(240 240 240 /20%);
  text-shadow: 0 0 10px rgb(240, 240, 240), 0 0 20px rgb(240, 240, 240), 0 0 40px rgb(240, 240, 240);
  transition: 0.3s all ease;
}
</style>