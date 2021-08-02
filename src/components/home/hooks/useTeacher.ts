import {reactive} from '@vue/reactivity'
import http from '../../../http'
import {ElMessage} from 'element-plus'

export default (limit: number) => {
    const teacherList = reactive([])
    const listTeacher = async (limit: number) => {
        try {
            const res = await http.post(`/eduservice/teacher/list/1/${limit}`, {level: 1})
            console.log(res)
            if (res.data.code !== 20000) ElMessage.error(res.data.msg)
            teacherList.push(...res.data.data.rows)
        } catch (e) {
            console.log(e.message)
        }
    }
    listTeacher(limit)
    return teacherList
}