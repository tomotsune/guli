/**
 * markdown编辑器组件
 * npm地址: https://www.npmjs.com/package/@kangc/v-md-editor
 */
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';


export default (app)=>{
    VMdEditor.use(githubTheme, {
        Hljs: hljs,
    });
    app.use(VMdEditor)
}

