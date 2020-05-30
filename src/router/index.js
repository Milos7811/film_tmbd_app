import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Search from '../views/Search.vue'
import Popular from '../components/Popular.vue'
import MovieShow from '../views/MovieShow.vue'
import Person from '../views/Person'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/search',
		name: 'Search',
		component: Search
	},
	{
		path: '/person/*',
		name: 'Person',
		component: Person,
		props: true
	},
	{
		path: '/movie/*',
		name: 'movie',
		component: MovieShow,
		props: true
	}
]

const router = new VueRouter({
	scrollBehavior() {
		return { x: 0, y: 0 }
	},
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
