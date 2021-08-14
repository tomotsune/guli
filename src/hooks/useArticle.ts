import {reactive} from '@vue/reactivity'
import http from '../http'
import {ElMessage} from 'element-plus'

export const listArticle = (current: number, limit: number, articleQuery) => {
    const articleRes = reactive({articleList: [], total: 0})
    const listArticle = async () => {
        const res = await http.post(`edu/article/list/${current}/${limit}`, articleQuery)
        if (res.data.code === 20000) {
            articleRes.articleList = res.data.data.rows
            articleRes.total = res.data.data.total
        } else {
            ElMessage.error(res.data.msg)
        }
    }
    listArticle()
    return articleRes
}