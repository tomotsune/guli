import {reactive, ref} from '@vue/reactivity'
import http from '../http'
import {ElMessage, ElMessageBox} from 'element-plus'
import {h} from 'vue'
import {getMemberId, simpleInfo} from './useMember'

export const getArticle = (articleId) => {
    const article = reactive({})
    const getArticle = async () => {
        const articleRes = await http.get(`/cms/article/info/${articleId}`)
        if (articleRes.data.code === 20000) {
            Object.assign(article, articleRes.data.data)
        } else {
            ElMessage.error(articleRes.data.msg)
        }
        const memberRes = await simpleInfo(articleRes.data.data.memberId)
        Object.assign(article, memberRes)
    }
    getArticle()
    return article
}
export const listArticle = (current: number, limit: number, articleQuery) => {
    const articleRes = reactive({articleList: [], total: 0})
    const listArticle = async () => {
        let res = null
        if (articleQuery == undefined) {
            const memberId = await getMemberId()
            res = await http.post(`/cms/article/list/${current}/${limit}`, {memberId})
        } else {
            res = await http.post(`/cms/article/list/${current}/${limit}`, articleQuery)
        }
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
    const memberId = await getMemberId()
    const res = await http.post(`/cms/article/list/${current}/${limit}`, {memberId})
    if (res.data.code === 20000) {
        return {articleList: res.data.data.rows, total: res.data.data.total}
    } else {
        ElMessage.error(res.data.msg)
    }
}
export const saveOrUpdateArticle = async (article) => {
    if (article.id) {
        const res = await http.put(`/cms/article/update`, article)
        if (res.data.code === 20000) {
            ElMessage.success('????????????')
        } else {
            ElMessage.error(res.data.msg)
        }
    } else {
        const res = await http.post(`/cms/article/save`, article)
        if (res.data.code === 20000) {
            ElMessage.success('????????????')
        } else {
            ElMessage.error(res.data.msg)
        }
    }
}
export const removeArticle = async (articles) => {
    const confirm = await ElMessageBox.confirm('?????????????????????????????????, ?????????????', '??????', {
        confirmButtonText: '??????',
        cancelButtonText: '??????',
        type: 'warning'
    })
    if (confirm === 'confirm') {
        const res = await http.delete(`/cms/article/delete/${articles}`)
        if (res.data.code === 20000) {
            ElMessage.success('????????????')
        } else {
            ElMessage.error(res.data.msg)
        }
    }
}