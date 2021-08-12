import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementPlus from './plugins/element-plus'
import qrcode from './plugins/qrcode'

createApp(App)
    .use(router)
    .use(store)
    .use(elementPlus)
    .use(qrcode)
    .mount('#app')

