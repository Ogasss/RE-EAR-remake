<template>
<div>
    <div class="bigImg">
        <transition name="black"><img class="blackBackground" v-show="blackShow" src="../assets/Home/0.png"></transition>
        <img v-show="imgId==1" src="../assets/Home/1.png">
        <img v-show="imgId==2" src="../assets/Home/2.png">
        <img v-show="imgId==3" src="../assets/Home/3.png">
        <img v-show="imgId==4" src="../assets/Home/4.png">
    </div>
    <div class="home">
        <img v-show="!lFlag" @mouseenter="changeL()"
            class="homeImgLeft" id="img" src="../assets/Home/箭头-左.png">
        
        <a @click.prevent="changeImgL()" href="">
            <transition name="arrows">
                <img v-show="lFlag" @mouseleave="changeL()"
                    class="homeImgLeft" id="img" src="../assets/Home/箭头-左-白-悬浮.png">
            </transition>
        </a>
        
        <img v-show="!rFlag" @mouseenter="changeR()"
            class="homeImgRight" id="img" src="../assets/Home/箭头-右.png">
        
        <a @click.prevent="changeImgR()" href="">
            <transition name="arrows">
                <img v-show="rFlag" @mouseleave="changeR()"
                    class="homeImgRight" id="img" src="../assets/Home/箭头-右-白-悬浮.png">
            </transition>
        </a>
    
    </div>
</div>
</template>

<script>
export default {
name:'home',
data() {
    return {
        lFlag: false,
        rFlag: false,
        imgId:1,
        blackShow:true,
    }
},
methods: {
    changeL(){
        this.lFlag = !this.lFlag
    },
    changeR(){
        this.rFlag = !this.rFlag
    },
    changeImgL(){
        if(this.imgId == 1){
            this.imgId = 4
        }else{
            this.imgId--
        }
    },
    changeImgR(){
        if(this.imgId == 4){
            this.imgId = 1
        }else{
            this.imgId++
        }
    },
},
watch:{
    imgId:{
        handler(){
            setTimeout(()=>{
            this.blackShow = !this.blackShow
            },100);
            this.blackShow = !this.blackShow
        }
    },
},
mounted() {
    setTimeout(()=>{
        this.blackShow = !this.blackShow
      },300);
    setInterval(() => {
        this.changeImgR()
    }, 5000);
},
}
</script>

<style scoped>
    .home{
        width: 100%;
        height: 100%;
    }
    .bigImg{
        width:100%;
        height: 100%;
        overflow: hidden;
    }
    .bigImg img{
    }
    #img{
        width: 45px;
        height: 100px;
        opacity: 0.8;
        position: fixed;
        top:50%;
        z-index: 2;
    }
    .homeImgLeft{
        left:20px;
    }
    .homeImgRight{
        right: 20px;
    }
    .bigImg img{
        height: 100vh;
        /* position: relative; */
        transform: translateX(-50%);
        margin-left: 50%;
    }

    .blackBackground{
        position: absolute;
        z-index: 9;
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

    .arrows-enter{
        opacity: 0;
    }
    .arrows-enter-to{
        opacity: 1;
    }
    .arrows-enter-active{
        transition: 1s all ease;
    }
</style>
