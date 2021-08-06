import {reactive} from '@vue/reactivity'
import http from '../../../http'
import {ElMessage} from 'element-plus'
import {onActivated} from 'vue'
import {onBeforeRouteUpdate} from 'vue-router'

export default (limit: number) => {
    const bannerList = reactive([])
    const listBanner = async (limit: number) => {
        const res = await http.get(`/educms/banner/list/${limit}`)
        if (res.data.code === 20000) {
            bannerList.push(...res.data.data)
        } else {
            ElMessage.error(res.data.msg)
        }
    }
    listBanner(limit)

    // 在setup周期执行即可.
    return bannerList
}