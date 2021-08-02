import {reactive} from '@vue/reactivity'
import http from '../../../http'

export default (limit: number) => {
    const courseList = reactive([])
    const listTeacher = async (limit: number) => {
        try {
            const res = await http.get(`/eduservice/course/list/${limit}`)
            courseList.push(...res.data.data)
        } catch (e) {
            console.log(e.message)
        }
    }
    listTeacher(limit)
    return courseList
}