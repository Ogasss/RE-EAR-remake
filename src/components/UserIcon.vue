<template>
  <div @click="changeUserIcon()" class="UserIcon">
    <div class="box1">
        <img @click="choiceUserIcon(1)" class="personMessageImg" src="../assets/Person/img_1.png">
        <img @click="choiceUserIcon(2)" class="personMessageImg" src="../assets/Person/img_2.png">
        <img @click="choiceUserIcon(3)" class="personMessageImg" src="../assets/Person/img_3.png">
        <img @click="choiceUserIcon(4)" class="personMessageImg" src="../assets/Person/img_4.png">
    </div>
    <div class="box2">
        <img @click="choiceUserIcon(5)" class="personMessageImg" src="../assets/Person/img_5.png">
        <img @click="choiceUserIcon(6)" class="personMessageImg" src="../assets/Person/img_6.png">
        <img @click="choiceUserIcon(7)" class="personMessageImg" src="../assets/Person/img_7.png">
        <img @click="choiceUserIcon(8)" class="personMessageImg" src="../assets/Person/img_8.png">
    </div>
  </div>
</template>

<script>
import BlackBackground from "../components/BlackBackground.vue"
export default {
name:'UserIcon',
data() {
    return {
        
    }
},
props:[
    'changeUserIcon',
    'choiceUserIcon'
],
components:{
    BlackBackground
}
}
</script>

<style scoped>
.UserIcon{
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0%;
    left: 0%;
    background-color: black;
    z-index: 100;
}
.personMessageImg{
  margin: auto;
  width: 200px;
  height: 200px;
  border: 5px solid gray;
}
.personMessageImg:hover{
  border: 5px solid white;
  box-shadow: 0px 6px 14px 0px rgb(240 240 240 / 80%);
  transition: 0.3s all ease;
}
.box1{
    margin-top: 10%;
    display: flex;
}
.box2{
    margin-top: 10%;
    display: flex;
}
</style>