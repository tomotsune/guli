/**
 * 二维码渲染组件, 此项目中用于显示微信支付二维码
 * github地址: https://github.com/tomotsune/vue-qrcode
 */
import VueQrcode from '@chenfengyuan/vue-qrcode';
export default (app)=>{
    // 全局注册组件, 详见: https://vue3js.cn/docs/zh/guide/component-basics.html
    app.component(VueQrcode.name, VueQrcode);
}