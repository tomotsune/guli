import {reactive} from '@vue/reactivity'
import http from '../http'
import {ElMessage} from 'element-plus'

export default (current: number, limit: number, courseQuery) => {
    const courseRes = reactive({courseList: [], total: 0})
    const listCourse = async () => {
        const res = await http.post(`/eduservice/course/list/${current}/${limit}`, courseQuery)
        if (res.data.code === 20000) {
            courseRes.courseList = res.data.data.rows
            courseRes.total = res.data.data.total
        } else {
            ElMessage.error(res.data.msg)
        }
    }
    listCourse()
    return courseRes
}