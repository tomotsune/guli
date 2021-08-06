import {reactive} from '@vue/reactivity'
import http from '../../../http'
import {ElMessage} from 'element-plus'

export default (limit: number) => {
    const courseList = reactive([])
    const listTeacher = async (limit: number) => {
        const res = await http.get(`/eduservice/course/list/${limit}`)
        if (res.data.code === 20000) {
            courseList.push(...res.data.data)
        } else {
            ElMessage.error(res.data.msg)
        }
    }
    listTeacher(limit)
    return courseList
}