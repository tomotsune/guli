import {reactive} from '@vue/reactivity'
import {ElMessage} from 'element-plus'
import http from '../http'

export default (current: number, limit: number, teacherQuery) => {
    const teacherRes = reactive({teacherList:[],total:0})
    const listTeacher = async () => {
        const res = await http.post(`/eduservice/teacher/list/${current}/${limit}`, teacherQuery)
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