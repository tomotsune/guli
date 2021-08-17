<template>
  <el-row style="margin: 18px 0px 0px 18px ">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>管理中心</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    </el-breadcrumb>
  </el-row>
  <el-card style="margin: 18px 2%;width: 95%">
    <el-table
        :data="orderList"
        style="width: 100%">
      <el-table-column prop="orderNo" label="订单号" width="100"></el-table-column>
      <el-table-column prop="courseTitle" label="课程名" fit></el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" fit></el-table-column>
      <el-table-column prop="status" label="状态" width="100" :formatter="(row, column, cellValue, index)=>cellValue?'已支付':'未支付'">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import {listOrder} from 'hooks/useOrder.ts'

const orderList = listOrder()


</script>