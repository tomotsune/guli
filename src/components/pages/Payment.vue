<template>
  <div class="Page Confirm">
    <div class="Title">
      <h1 class="fl f18">订单确认</h1>
      <img src="../../assets/img/cart_setp2.png" class="fr">
      <div class="clear"></div>
    </div>
    <form name="flowForm" id="flowForm" method="post" action="">
      <table class="GoodList">
        <tbody>
        <tr>
          <th class="name">商品</th>
          <th class="price">原价</th>
          <th class="priceNew">价格</th>
        </tr>
        </tbody>
        <tbody>
        <!-- <tr>
          <td colspan="3" class="Title red f18 fb"><p>限时折扣</p></td>
        </tr> -->
        <tr>
          <td colspan="3" class="teacher">
            <!--课程讲师信息-->
          </td>
        </tr>
        <tr class="good">
          <td class="name First">
            <el-link target="_blank" :href="`#/curriculum/${order.courseId}`">
              <img :src="order.courseCover"></el-link>
            <div class="goodInfo">
              <input type="hidden" class="ids ids_14502" value="14502">
              <el-link target="_blank" :href="`#/curriculum/${order.courseId}`">
                {{ order.courseTitle }}
              </el-link>
            </div>
          </td>
          <td class="price">
            <p>￥<strong>{{ order.totalFee }}</strong></p>
            <!-- <span class="discName red">限时8折</span> -->
          </td>
          <td class="red priceNew Last">￥<strong>{{ order.totalFee }}</strong></td>
        </tr>
        <tr>
          <td class="Billing tr" colspan="3">
            <div class="tr">
              <p>共 <strong class="red">1</strong> 件商品，合计
                <span class="red f20">￥<strong>{{ order.totalFee }}</strong></span>
              </p>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="Finish">
        <div class="fr" id="AgreeDiv">
          <label for="Agree">
            <p class="on">
              <input id="Agree" type="checkbox" checked="checked">
              我已阅读并同意<a href="javascript:" target="_blank">《谷粒学院购买协议》</a>
            </p>
          </label>
        </div>
        <div class="clear"></div>
        <div class="Main fl">
          <div class="fl">
            <a :href="'/course/'+order.courseId">返回课程详情页</a>
          </div>
          <div class="fr">
            <p>共 <strong class="red">1</strong> 件商品，合计<span class="red f20">￥<strong
                id="AllPrice">{{ order.totalFee }}</strong></span></p>
          </div>
        </div>
        <input name="score" value="0" type="hidden" id="usedScore">
        <button class="fr redb" type="button" id="submitPay" @click="toPay">去支付</button>
        <div class="clear"></div>
      </div>
    </form>
  </div>
  <el-dialog
      v-model="dialogVisible"
      destroy-on-close width="30%">
    <el-card :body-style="{ padding: '0px' }">
      <vue-qrcode :value="qrInfo.code_url" :options="{ width: 200 }"></vue-qrcode>
      <div style="padding: 14px;">
        <span>微信扫码支付</span>
        <div class="bottom">
          <span>订单号:{{ qrInfo.out_trade_no }}</span>
          <br>
          <el-button type="text" class="button" @click="checkPayment(order.orderNo,order.courseId)">确认支付</el-button>
        </div>
      </div>
    </el-card>
  </el-dialog>
</template>
<script setup>
import {checkPayment, infoOrder, qr} from '../../hooks/useOrder.ts'
import {useRoute} from 'vue-router'
import {reactive, ref} from '@vue/reactivity'

const route = useRoute()
const dialogVisible = ref(false)
const qrInfo = reactive({})
const order = infoOrder(route.params.orderNo)
const toPay = async () => {
  const res = await qr(order.orderNo)
  Object.assign(qrInfo, res)
  dialogVisible.value = true
}
</script>
