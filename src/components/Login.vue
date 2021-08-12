<template>
  <body id="poster">
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">系统登录</h3>
    <el-form-item>
      <el-input type="text" v-model="loginForm.mobile"
                placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <router-link to="register" style="margin-left: 60%; color: #606266">还没有账户? 点击注册</router-link>
      <el-button type="primary" style="width: 100%;background: #505458;border: none" @click="login">登录</el-button>
    </el-form-item>
    <!--      TODO 地址改为nginx的-->
    <a :href="`http://tomotsune.asia:8160/ucenter/wx/login/${path === '/' || path === undefined ? '/index' : path}`">
      <svg style="margin-left: 45%" t="1628239751800" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           p-id="2126" width="32" height="32">
        <path
            d="M1010.8 628c0-141.2-141.3-256.2-299.9-256.2-168 0-300.3 115.1-300.3 256.2 0 141.4 132.3 256.2 300.3 256.2 35.2 0 70.7-8.9 106-17.7l96.8 53-26.6-88.2c70.9-53.2 123.7-123.7 123.7-203.3zM618 588.8c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40c0 22-17.9 40-40 40z m194.3-0.3c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"
            fill="#00C800" p-id="2127"></path>
        <path
            d="M366.3 106.9c-194.1 0-353.1 132.3-353.1 300.3 0 97 52.9 176.6 141.3 238.4l-35.3 106.2 123.4-61.9c44.2 8.7 79.6 17.7 123.7 17.7 11.1 0 22.1-0.5 33-1.4-6.9-23.6-10.9-48.3-10.9-74 0-154.3 132.5-279.5 300.2-279.5 11.5 0 22.8 0.8 34 2.1C692 212.6 539.9 106.9 366.3 106.9zM247.7 349.2c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z m246.6 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"
            fill="#00C800" p-id="2128"></path>
      </svg>
    </a>
  </el-form>
  </body>
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router'
import {reactive} from '@vue/reactivity'
import {ElMessage} from 'element-plus'
import {useStore} from 'vuex'
import http from '../http'

const router = useRouter()
const route = useRoute()
const store = useStore()
const loginForm = reactive({})
const path = route.query.redirect
const login = async () => {
  const res = await http.post('/ucenter/member/login', loginForm)
  if (res.data.code === 20000) {
    ElMessage.success('登录成功')
    store.commit('login', res.data.data)
    await router.replace(path === '/' || path === undefined ? '/index' : path)
  } else {
    ElMessage.error(res.data.msg)
  }
}
</script>

<style scoped>
#poster {
  background: url("../assets/photo/bg/eva1.jpg") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  margin: 0px;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>