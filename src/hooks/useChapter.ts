import {reactive} from '@vue/reactivity'
import http from '../http'
import {ElMessage} from 'element-plus'

export const listOutline = (courseId: number) => {
    const subjectTree = reactive([])
    const listOutline = async () => {
        const res = await http.get(`/edu/chapter/listOutline/${courseId}`)
        if (res.data.code === 20000) {
            subjectTree.push(...res.data.data)
        } else {
            ElMessage.error(res.data.msg)
        }
    }
    listOutline()
    return subjectTree
}