import {reactive} from '@vue/reactivity'
import http from '../../../http'

export default (limit: number) => {
    const bannerList = reactive([])
    const listBanner = async (limit: number) => {
        try {
            const res = await http.get(`/educms/banner/list/${limit}`)
            bannerList.push(...res.data.data)
        } catch (e) {
            console.log(e.message)
        }
    }
    // 在setup周期执行即可.
    listBanner(limit)
    return bannerList
}