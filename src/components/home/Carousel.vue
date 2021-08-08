<template>
  <el-card class="card-carousel">
    <el-carousel class="push" :interval="4000" arrow="always">
      <el-carousel-item v-for="banner in bannerList" :key="banner.id">
        <a :href=banner.linkUrl target="_blank">
          <img :src=banner.imageUrl alt="banner.title" class="carousel_img">
        </a>
        <h3>{{ banner.title }}</h3>
      </el-carousel-item>
    </el-carousel>
  </el-card>
</template>

<script setup>
import useBanner from '../../hooks/useBanner.ts'

const bannerList = useBanner(2)

</script>

<style scoped>
.el-carousel__item h3 {
  color: black;
  font-size: 15px;
  /*line-height: 300px;*/
  bottom: 43px;
  float: left;
  position: relative;
}

.card-carousel {
  margin: 0 auto;
  /*margin-left: 20px;*/
  /*width: 680px;*/
  width: 100%;
  /* height: 320px;*/
  height: 100%
}

.push {
  /*margin-left: -15px;*/
}

.el-carousel__item:nth-child(2n) {
  background: black;
}

.el-carousel__item:nth-child(2n+1) {
  background: black;
}

.carousel_img {
  height: 100%;
  width: 100%;
  text-align: center;
}
</style>