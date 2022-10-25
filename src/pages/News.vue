<template>
  <div class="news">
    <BlackBackground/>
    <div class="theP">
      待开发
    </div>
  </div>
</template>

<script>
import BlackBackground from "../components/BlackBackground.vue"
export default {
name:'News',
data() {
  return {
  }
},
components:{
  BlackBackground
}
}
</script>

<style scoped>
.news{
  width: 100vw;
  height: 100vh;
  display: flex;
}
.theP{
  margin: auto;
  font-size: 22px;
  color: white;
}
</style>