<template>
  <body id="paper">
  <el-form class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">用户注册</h3>
    <el-form-item>
      <el-input type="text" v-model="registerForm.mobile"
                auto-complete="off" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="registerForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="registerForm.nickname"
                auto-complete="off" placeholder="昵称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="registerForm.code"
                auto-complete="off" placeholder="验证码">
        <template #append>
          <el-button @click="sendCode">{{ btnText }}</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" @click="register(registerForm)">注册
      </el-button>
      <router-link to="login">
        <el-button type="primary" style="width: 40%;background: #505458;border: none">登录</el-button>
      </router-link>
    </el-form-item>
  </el-form>
  </body>
</template>
<script setup>
import {reactive, ref} from '@vue/reactivity'
import {useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'
import http from '../http'

const router = useRouter()
const registerForm = reactive({})
const btnText = ref('发送验证码')

const register = async registerForm => {
  const res = await http.post('/ucenter/member/register', registerForm)
  if (res.data.code === 20000) {
    ElMessage.success('注册成功')
    await router.replace('/login')
  } else {
    ElMessage.error(res.data.msg)
  }
}


const sendCode = async () => {
  const res = await http.get(`/msm/send/${registerForm.mobile}`)
  if (res.data.code === 20000) {
    ElMessage.success('发送成功')
    timeDown()
  } else {
    ElMessage.error(res.data.msg)
  }
}

const timeDown = () => {
  let second = 300
  const Interval = setInterval(() => {
    --second
    btnText.value = second.toString()
    if (second < 1) {
      clearInterval(Interval)
      btnText.value = '获取验证码'
    }
  }, 1000)
}
</script>
<style scoped>
#paper {
  background: url("../assets/photo/bg/eva1.jpg") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  margin: -5px 0;
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
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>