import {reactive} from '@vue/reactivity'
import http from '../http'
import {ElMessage} from 'element-plus'
/*
* It "just works". But make sure to call all lifecycle and watch methods before the first await
* since those rely on the presence of the current active instance
* (we have been discussing how to detect and guard against this via tooling)
* */
export const listCourse = (current: number, limit: number, courseQuery) => {
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

export const listCourseAsync = async (current: number, limit: number, courseQuery) => {
    const res = await http.post(`/eduservice/course/list/${current}/${limit}`, courseQuery)
    if (res.data.code === 20000) {
        return {courseList: res.data.data.rows, total: res.data.data.total}
    } else {
        ElMessage.error(res.data.msg)
    }
}

export const getCourse = (courseId: number) => {
    const course = reactive({})
    const getCourse = async () => {
        const res = await http.get(`/eduservice/course/show/${courseId}`)
        if (res.data.code === 20000) {
            Object.assign(course, res.data.data)
        } else {
            ElMessage.error(res.data.msg)
        }
    }
    getCourse()
    return course
}

// V2 可行
// export const listCourseAsync = async (current: number, limit: number, courseQuery) => {
//     const res = await http.post(`/eduservice/course/list/${current}/${limit}`, courseQuery)
//     if (res.data.code === 20000) {
//         return res.data.data
//     } else {
//         ElMessage.error(res.data.msg)
//     }
// }

// V1 可行
// export const listCourseAsync = async (current: number, limit: number, courseQuery) => {
//     const res = new Promise(((resolve, reject) => {
//         http.post(`/eduservice/course/list/${current}/${limit}`, courseQuery).then((res) => {
//             if (res.data.code === 20000)
//                 resolve(res.data.data)
//         })
//     }))
//     return res
// }