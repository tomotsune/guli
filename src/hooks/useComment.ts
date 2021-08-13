import {reactive} from '@vue/reactivity'
import {ElMessage} from 'element-plus'
import http from '../http'
import store from '../store'
import router from '../router'

export const listComment = (current: number, limit: number, commentQuery) => {
    const CommentRes = reactive({commentList: [], total: 0})
    const listComment = async () => {
        const res = await http.post(`/edu/comment/list/${current}/${limit}`, commentQuery)
        if (res.data.code === 20000) {
            CommentRes.commentList = res.data.data.rows
            CommentRes.total = res.data.data.total
        } else {
            ElMessage.error(res.data.msg)
        }

    }
    listComment()
    return CommentRes
}

export const listCommentAsync = async (current: number, limit: number, commentQuery) => {
    const res = await http.post(`/edu/comment/list/${current}/${limit}`, commentQuery)
    if (res.data.code === 20000) {
        return {commentList: res.data.data.rows, total: res.data.data.total}
    } else {
        ElMessage.error(res.data.msg)
    }
}

export const saveComment = async (comment) => {
    console.log(comment)
    // 检查登录状态
    if (store.state.token) {
        const res = await http.post(`/edu/comment/save`, comment)
        if (res.data.code === 20000) {
            ElMessage.success('评论成功')
        } else {
            ElMessage.error(res.data.msg)
        }
    } else {
        await router.replace({path: '/login', query: {redirect: `/curriculum/${comment.courseId}`}})
        ElMessage.warning('请先登录')
    }

}
