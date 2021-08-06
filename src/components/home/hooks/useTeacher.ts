import {reactive} from '@vue/reactivity'
import http from '../../../http'
import {ElMessage} from 'element-plus'

export default (limit: number) => {
    const teacherList = reactive([])
    const listTeacher = async (limit: number) => {
        const res = await http.post(`/eduservice/teacher/list/1/${limit}`, {level: 1})
        if (res.data.code === 20000) {
            teacherList.push(...res.data.data.rows)
        } else {
            ElMessage.error(res.data.msg)
        }
    }
    listTeacher(limit)
    return teacherList
}