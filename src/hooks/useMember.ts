import {reactive} from '@vue/reactivity'
import {ElMessage} from 'element-plus'
import http from '../http'

export const info = () => {
    const userInfo = reactive({})

    const info = async () => {
        const res = await http.get('/ucenter/member/info')
        if (res.data.code === 20000) {
            Object.assign(userInfo, res.data.data)
            ElMessage.success('获取信息成功')
        }
    }
    info()
    return userInfo
}
export const simpleInfo = async (memberId) => {
    const res = await http.get(`/ucenter/member/info/${memberId}`)
    if (res.data.code === 20000) {
        return {memberAvatar: res.data.data.avatar, memberNickname: res.data.data.nickname}
    } else {
        ElMessage.error(res.data.msg)
    }
}
export const getMemberId = async () => {
    const res = await http.get(`/ucenter/member/getId`)
    if (res.data.code === 20000) {
        return res.data.data
    } else {
        ElMessage.error(res.data.msg)
    }
}

export const listMember = (current: number, limit: number, memberQuery) => {
    const memberRes = reactive({memberList: [], total: 0})
    const listMember = async () => {
        const res = await http.post(`/ucenter/member/list/${current}/${limit}`, memberQuery)
        if (res.data.code === 20000) {
            memberRes.memberList = res.data.data.rows
            memberRes.total = res.data.data.total
        } else {
            ElMessage.error(res.data.msg)
        }
    }
    listMember()
    return memberRes
}
export const listMemberAsync = async (current: number, limit: number, memberQuery) => {
    const res = await http.post(`/ucenter/member/list/${current}/${limit}`, memberQuery)
    if (res.data.code === 20000) {
        return {memberList: res.data.data.rows, total: res.data.data.total}
    } else {
        ElMessage.error(res.data.msg)
    }
}
export const updateMember = async (member) => {
    const res = await http.put(`/ucenter/member/update`, member)
    if (res.data.code === 20000) {
        ElMessage.success('修改成功')
    } else {
        ElMessage.error(res.data.msg)
    }
}
