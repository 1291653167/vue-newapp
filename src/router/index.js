import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import { Dialog } from 'vant';
//import Layout from '../views/layout/index.vue'
//import login from '../views/login/index.vue'
//import Register from '../views/register/index.vue'
Vue.use(VueRouter)

const routes = [{
	path: '/',
	name: '',
	component: () => import('../views/layout/index.vue'),
	children: [{
			path: "user",
			component: () => import('../views/user/index.vue'),
			meta: {
				auth: true
			}
		}, {
			path: '',

			component: () => import('../views/index/index.vue')
		},
		{
			path: 'publish',

			component: () => import('../views/publish/index.vue'),
			meta: {
				auth: true
			}
		},
	]
}, {
	path: '/login',
	name: 'login',
	component: () => import("../views/login/index.vue"),
}, {
	path: '/register',
	name: 'register',
	// component:Register,    懒加载
	component: () => import("../views/register/index.vue")
}, {
	path: '/user-edit',
	name: 'user-edit',
	component: () => import('../views/user_edit/index.vue'),
	meta: {
		auth: true
	}
}, {
	path: '/detail/:id',
	name: 'detail',
	component: () => import('../views/article/index.vue')
}]

const router = new VueRouter({
	routes
})
router.beforeEach((to, from, next) => {
	if (to.meta.auth) {
		if (store.getters.getToken == null || store.getters.getToken == '') {
			Dialog.alert({title: '提示信息',	message: '请先登陆',})
			next('/login');
		} else {
			next();
		}

	} else {
		next();
	};

})
export default router
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}