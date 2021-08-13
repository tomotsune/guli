import {reactive} from '@vue/reactivity'
import http from '../http'
import {ElMessage} from 'element-plus'

export default () => {
    const subjectTree = reactive([])
    const listSubject = async () => {
        const res = await http.get(`/edu/subject/listWithTree`)
        if (res.data.code === 20000) {
            subjectTree.push(...res.data.data)
        } else {
            ElMessage.error(res.data.msg)
        }
    }
    listSubject()
    return subjectTree
}