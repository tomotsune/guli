import http from '../http'
import {reactive} from '@vue/reactivity'
import {ElMessage} from 'element-plus'

export const listRole = () => {
    const roleList = reactive([])
    const listRole = async () => {
        const res = await http.get(`/ucenter/role/listAll`)
        if (res.data.code === 20000) {
            roleList.push(...res.data.data)
        } else {
            ElMessage.error(res.data.msg)
        }
    }
    listRole()
    return roleList
}
export const updateRole = async (memberId, roleList) => {
    const memberRoleList = roleList.map(x => {
        return {roleId: x, memberId}
    })
    const res = await http.put(`/ucenter/role/update`, memberRoleList)
    if (res.data.code === 20000) {
        ElMessage.success('角色变更成功')
    } else {
        ElMessage.error(res.data.msg)
    }
}