import {createApp} from 'vue'
import App from './App.vue'
import './style.less'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
import 'ant-design-vue/dist/reset.css'


// font
import './mono.less'


const app = createApp(App)

app.use(router).use(store).use(Antd).mount('#app')