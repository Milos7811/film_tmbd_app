import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

// import Search from '../views/Search.vue'
// import Popular from '../components/Popular.vue'
// import MovieShow from '../views/MovieShow.vue'
// import PersonShow from '../views/Person'
// import SeriesShow from '../views/SeriesShow.vue'
// import SearchMovies from '../components/SearchMovies.vue'
// import SearchPeople from '../components/SearchPeople.vue'
// import SearchSeries from '../components/SearchSeries.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () =>
			import(/* webpackChunkName: "home" */ '../views/Home.vue')
	},
	{
		path: '/about',
		name: 'About',
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/search',
		name: 'Search',
		component: () =>
			import(/* webpackChunkName: "search" */ '../views/Search.vue')
	},
	{
		path: '/person/*',
		name: 'Person',
		component: () =>
			import(/* webpackChunkName: "person" */ '../views/Person.vue'),
		props: true
	},
	{
		path: '/movie/*',
		name: 'Movie',
		component: () =>
			import(
				/* webpackChunkName: "MovieShow" */ '../views/MovieShow.vue'
			),
		props: true
	},
	{
		path: '/series/*',
		name: 'Series',
		component: () =>
			import(
				/* webpackChunkName: "SeriesShow" */ '../views/SeriesShow.vue'
			),
		props: true
	},

	{
		path: '*',
		name: 'NotFound',
		component: () =>
			import(/* webpackChunkName: "notFound" */ '../views/NotFound.vue')
	}
]

const router = new VueRouter({
	scrollBehavior() {
		setTimeout(() => {
			window.scrollTo(0, 0)
		}, 200)
	},
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
