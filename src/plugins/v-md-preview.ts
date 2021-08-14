/**
 * markdown本文预览器组件
 * npm地址: https://www.npmjs.com/package/@kangc/v-md-editor
 */
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

// highlightjs
import hljs from 'highlight.js'

// 显示代码行数
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index'
// 快速复制代码
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';



export default (app) => {
    VMdPreview.use(githubTheme, {Hljs: hljs})
        .use(createLineNumbertPlugin())
        .use(createCopyCodePlugin())
    app.use(VMdPreview)
}