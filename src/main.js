import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import "./assets/style.less"
import 'amfe-flexible'
import store from './store'

//官网安装的方法之后，已经把 axios 挂载在 vue 上了，如果你再安装 vue-axios 的话，app.vue 里面就会多了两行：
//import axios from "axios"
//Vue.prototype.axios = axios;
//推测他们两个代码冲突了，所以把上面两行代码删掉，问题就解决了
axios.defaults.baseURL = "http://d383aef4-a85f-4034-8534-fabe1d2c5575.bspapp.com/http"

//d383aef4-a85f-4034-8534-fabe1d2c5575.bspapp.com

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
