<template>
  <el-row style="margin: 18px 0px 0px 18px ">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>管理中心</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户信息</el-breadcrumb-item>
    </el-breadcrumb>
  </el-row>
  <el-card style="margin: 18px 2%;width: 95%">
    <el-table
        :data="memberRes.memberList"
        stripe
        style="width: 100%">
      <el-table-column prop="id" label="id" sortable width="100"></el-table-column>
      <el-table-column prop="nickname" label="用户名" fit></el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" fit></el-table-column>
      <!--      <el-table-column label="状态" sortable width="100">-->
      <!--        <template #default="scope">-->
      <!--          <el-switch-->
      <!--              v-model="scope.row.isDisabled"-->
      <!--              active-color="#13ce66"-->
      <!--              inactive-color="#ff4949"-->
      <!--              @change="(value) => commitStatusChange(value, scope.row)">-->
      <!--          </el-switch>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
    </el-table>
  </el-card>
  <el-pagination
      v-model:current-page="currentPage"
      onUpdate:currentPage
      :page-size="pageSize"
      :total="memberRes.total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
  />
</template>

<script setup>

import {ref} from '@vue/reactivity'
import {listMember, listMemberAsync} from '../../../hooks/useMember.ts'
import {watch} from 'vue'

const currentPage = ref(1)
const pageSize = ref(5)
const memberRes = listMember(currentPage.value, pageSize.value, {})
watch(currentPage, async () => {
  await updateMemberList()
})
const updateMemberList = async () => {
  const res = await listMemberAsync(currentPage.value, pageSize.value, {})
  memberRes.memberList = res.memberList
  memberRes.total = res.total
}
</script>