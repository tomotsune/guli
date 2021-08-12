import {reactive} from '@vue/reactivity'
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {ElMessage} from 'element-plus'
import http from '../http'

export default () => {
    const route = useRoute()
    const router = useRouter()
    const userInfo = reactive({})

    const info = async () => {
        const res = await http.get('/ucenter/member/info')
        if (res.data.code === 20000) {
            Object.assign(userInfo, res.data.data)
            ElMessage.success('获取信息成功')
        } /*else {
            ElMessage.error(res.data.msg)
            // @ts-ignore
            // await router.replace(route.query.redirect)
        }*/
    }
    info()
    return userInfo
}
