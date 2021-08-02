import {reactive} from '@vue/reactivity'
import http from '../../../http'

export default () => {
    const bannerList = reactive([])

    // 查询前两条banner数据
    const listBanner = async (limit: number) => {
        try {
            const res = await http.get(`/educms/banner/list/${limit}`)
            bannerList.push(...res.data.data)
        } catch (e) {
            console.log(e.message)
        }
    }

    // 在setup周期执行即可.
    listBanner(2)

    return bannerList
}