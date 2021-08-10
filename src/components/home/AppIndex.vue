<template class="home">
  <div id="header-div">
    <div style="height: 20px"></div>
    <carousel></carousel>
  </div>
  <course-card/>
  <teacher-card style="margin-top: -100px;"/>
  <about id="about"/>
</template>
<script setup>
import Carousel from './Carousel.vue'
import About from '../common/About.vue'
import CourseCard from './CourseCard.vue'
import TeacherCard from './TeacherCard.vue'

</script>

<style scoped>
.home {
  width: 990px;
  margin-left: auto;
  margin-right: auto;
  /*margin-top: -20px;*/
  margin-top: -150px;
}

#header-div {
  padding-bottom: 20px;
  padding-left: 5px;
  background-color: white;
}

#side-menu {
  position: fixed;
  margin-left: 50%;
  left: -680px;
  top: 100px;
}

</style>