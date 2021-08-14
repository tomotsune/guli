import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementPlus from './plugins/element-plus'
import qrcode from './plugins/qrcode'
import vMdEditor from './plugins/v-md-editor'
import vMdPreview from './plugins/v-md-preview'

createApp(App)
    .use(router)
    .use(store)
    .use(elementPlus)
    .use(qrcode)
    .use(vMdEditor)
    .use(vMdPreview)
    .mount('#app')

