import {reactive} from '@vue/reactivity'
import {ElMessage} from 'element-plus'
import http from '../http'

export const listTeacher = (current: number, limit: number, teacherQuery) => {
    const teacherRes = reactive({teacherList: [], total: 0})
    const listTeacher = async () => {
        const res = await http.post(`/edu/teacher/list/${current}/${limit}`, teacherQuery)
        if (res.data.code === 20000) {
            teacherRes.teacherList = res.data.data.rows
            teacherRes.total = res.data.data.total
        } else {
            ElMessage.error(res.data.msg)
        }

    }
    listTeacher()
    return teacherRes
}

export const listTeacherAsync = async (current: number, limit: number, teacherQuery) => {
    const res = await http.post(`/edu/teacher/list/${current}/${limit}`, teacherQuery)
    if (res.data.code === 20000) {
        return {teacherList: res.data.data.rows, total: res.data.data.total}
    } else {
        ElMessage.error(res.data.msg)
    }
}

export const getTeacher = (teacherId: number) => {
    const teacher = reactive({})
    const getTeacher = async () => {
        const res = await http.get(`/edu/teacher/info/${teacherId}`)
        if (res.data.code === 20000) {
            Object.assign(teacher, res.data.data)
        } else {
            ElMessage.error(res.data.msg)
        }
    }
    getTeacher()
    return teacher
}