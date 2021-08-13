import http from '../../../../../http'
import {ElMessage} from 'element-plus'

/* 提交当然统计信息 */
export const create = async (day) => {
    const res = await http.post(`/statistics/daily/count/${day}`)
    if (res.data.code === 20000) {
        ElMessage.success(day + '统计数据已更新')
    } else {
        ElMessage.error('统计数据生成失败')
    }
}

/* 获取时间段内统计信息 */
export const list = async (begin, end) => {
    const res = await http.get(`/statistics/daily/list/${begin}/${end}`)
    if (res.data.code === 20000) {
        return res.data.data
    } else {
        ElMessage.error(res.data.msg)
    }
}
