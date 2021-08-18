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
        style="width: 100%" @sort-change="sortChange">
      <el-table-column prop="id" label="id" width="100"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column label="角色">
        <template #default="scope">
          <div>
            <ul>
              <li v-for="role in scope.row.roleList">
                {{ role.name }}
              </li>
              <el-button
                  @click="roleChange(scope.row)"
                  size="small">
                变更
              </el-button>
            </ul>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" sortable="custom"></el-table-column>
      <el-table-column label="状态" width="100" align="right">
        <template #header>
          <el-input
              v-model="memberQuery.nickname"
              size="mini"
              placeholder="输入昵称进行模糊匹配"/>
        </template>
        <template #default="scope">
          <el-switch
              v-model="scope.row.isDisabled"
              active-color="#ff4949" inactive-color="#13ce66"
              @change="(value) => statusChange(scope.row.id,value)">
          </el-switch>
        </template>
      </el-table-column>
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
  <el-dialog
      v-model="dialogVisible" destroy-on-close>
    <el-divider content-position="left">角色变更</el-divider>
    <el-transfer v-model="memberRoleList"
                 :props="{
                    key: 'id',
                    label: 'name'
                 }"
                 :data="roleList"/>
    <template #footer>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="save()">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import {listRole} from 'hooks/useRole.ts'
import {reactive, ref} from '@vue/reactivity'
import {listMember, listMemberAsync, updateMember} from 'hooks/useMember.ts'
import {watch} from 'vue'
import {updateRole} from 'hooks/useRole.ts'

// 1. 用户展示及分页
const currentPage = ref(1)
const pageSize = ref(7)
const memberQuery = reactive({})
const memberRes = listMember(currentPage.value, pageSize.value, memberQuery)
// 2. 用户权限控制
const dialogVisible = ref(false)
/* 系统所有角色 */
const roleList = listRole()
/* 目标用户 */
const memberId = ref()
/* 目标用户角色, el-transfer绑定reactive无效 */
const memberRoleList = ref([])
watch(currentPage, async () => {
  await updateMemberList()
})
const statusChange = async (memberId, status) => {
  await updateMember({id: memberId, isDisabled: status})
  await updateMemberList()
}
const updateMemberList = async () => {
  const res = await listMemberAsync(currentPage.value, pageSize.value, memberQuery)
  memberRes.memberList = res.memberList
  memberRes.total = res.total
}
const sortChange = async (column) => {
  memberQuery.gmtCreateSort = column.order
  await updateMemberList()
}
const roleChange = (row) => {
  console.log(row)
  memberRoleList.value = row.roleList.map(x => x.id)
  memberId.value = row.id
  dialogVisible.value = true
}
const save = async () => {
  dialogVisible.value = false
  await updateRole(memberId.value, memberRoleList.value)
  await updateMemberList()
}
watch(() => memberQuery.nickname, updateMemberList)
</script>