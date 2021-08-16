import {reactive, ref} from '@vue/reactivity'
import http from '../http'
import {ElMessage, ElMessageBox} from 'element-plus'
import {h} from 'vue'

export const getArticle = (articleId) => {
    const article = reactive({})
    const getArticle = async () => {
        const res = await http.get(`/cms/article/info/${articleId}`)
        if (res.data.code === 20000) {
            Object.assign(article, res.data.data)
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
export const saveArticle = async (article) => {
    const res = await http.post(`/cms/article/saveOrUpdate`, article)
    if (res.data.code === 20000) {
        ElMessage.success('保存成功')
    } else {
        ElMessage.error(res.data.msg)
    }
}
export const removeArticle = async (articles) => {
    const confirm = await ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
    if (confirm === 'confirm') {
        const res = await http.delete(`/cms/article/delete/${articles}`)
        if (res.data.code === 20000) {
            ElMessage.success('保存成功')
        } else {
            ElMessage.error(res.data.msg)
        }
    }
}