import {reactive} from '@vue/reactivity'
import http from '../http'
import {ElMessage} from 'element-plus'
import router from '../router'
import store from '../store'

export const createOrder = async (order) => {
    if (store.state.token) {
        const res = await http.post(`/deal/order/create`, order)
        if (res.data.code === 20000) {
            const orderNo = res.data.data
            // 进入需要权限页面时自动添加redirect
            await router.replace(`/payment/${orderNo}`)
        } else {
            ElMessage.error(res.data.msg)
        }
    } else {
        // 进入登录页前记录原地址
        await router.replace({path: '/login', query: {redirect: `/curriculum/${order.courseId}`}})
        ElMessage.warning('请先登录')
    }

}
export const infoOrder = (orderNo) => {
    const order = reactive({})
    const infoOrder = async () => {
        const res = await http.get(`/deal/order/info/${orderNo}`)
        if (res.data.code === 20000) {
            Object.assign(order, res.data.data)
        } else {
            ElMessage.error(res.data.msg)
        }
    }
    infoOrder()
    return order
}
export const qr = async (orderNo) => {
    const res = await http.get(`/deal/paylog/QR/${orderNo}`)
    if (res.data.code === 20000) {
        if (res.data.data.result_code === 'SUCCESS') {
        } else {
            res.data.date.code_url = '二维码获取失败,详情请联系管理员'
        }
        return res.data.data
    } else {
        ElMessage.error(res.data.msg)
    }
}
export const checkPayment = async (orderNo, courseId) => {
    const res = await http.get(`/deal/paylog/check/${orderNo}`)
    if (res.data.code === 20000) {
        // 跳转到订单课程详情页
        if (res.data.date === 'SUCCESS') {
            await router.replace(`/curriculum/${courseId}`)
            ElMessage.success('支付完成')
        } else if (res.data.date === 'NOTPAY') {
            ElMessage.warning('未完成支付')
        }else if (res.data.data === 'NULL') {
            await router.replace(`/curriculum/${courseId}`)
            ElMessage.warning('订单不存在,请重新提交订单后再试')
        }
    } else {
        ElMessage.error(res.data.msg)
    }
}
export const checkOrder = async (courseId) => {
    const res = await http.get(`/deal/order/check/${courseId}`)
    return res.data.code === 20000
}
