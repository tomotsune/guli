import {reactive} from '@vue/reactivity'
import http from '../http'
import {ElMessage} from 'element-plus'

export const auth = async (sourceId: number) => {
    const res = await http.get(`/vod/auth/${sourceId}`)
    if (res.data.code === 20000) {
        return res.data.data
    } else {
        ElMessage.error(res.data.msg)
    }
}