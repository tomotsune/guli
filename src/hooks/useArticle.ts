import {reactive, ref} from '@vue/reactivity'
import http from '../http'
import {ElMessage} from 'element-plus'
export const getArticle = (articleId) => {
    const article = reactive({})
    const getArticle = async () => {
        const res = await http.get(`/cms/article/info/${articleId}`)
        if (res.data.code === 20000) {
            Object.assign(article,res.data.data)
        } else {
            ElMessage.error(res.data.msg)
        }
    }
    getArticle()
    return article
}
export const listArticle = (current: number, limit: number, articleQuery) => {
    const articleRes = reactive({articleList: [], total: 0})
    const listArticle = async () => {
        const res = await http.post(`/cms/article/list/${current}/${limit}`, articleQuery)
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
export const listArticleAsync = async (current: number, limit: number, articleQuery) => {
    const res = await http.post(`/cms/article/list/${current}/${limit}`, articleQuery)
    if (res.data.code === 20000) {
        return {articleList: res.data.data.rows, total: res.data.data.total}
    } else {
        ElMessage.error(res.data.msg)
    }
}