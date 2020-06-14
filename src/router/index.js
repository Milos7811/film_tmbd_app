import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Search from '../views/Search.vue'
import Popular from '../components/Popular.vue'
import MovieShow from '../views/MovieShow.vue'
import PersonShow from '../views/Person'
import SeriesShow from '../views/SeriesShow.vue'
import SearchMovies from '../components/SearchMovies.vue'
import SearchPeople from '../components/SearchPeople.vue'
import SearchSeries from '../components/SearchSeries.vue'

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
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/search',
		name: 'Search',
		component: () =>
			import(/* webpackChunkName: "search" */ '../views/Search.vue')
		// component: Search,
		// children: [
		// 	{
		// 		path: 'movies',
		// 		name: 'Movies',
		// 		component: SearchMovies
		// 	},
		// 	{
		// 		path: 'people',
		// 		name: 'People',
		// 		component: SearchPeople
		// 	},
		// 	{
		// 		path: 'seasons',
		// 		name: 'Seasons',
		// 		component: SearchSeries
		// 	}
		// ]
	},
	{
		path: '/person/*',
		name: 'Person',
		component: PersonShow,
		props: true
	},
	{
		path: '/movie/*',
		name: 'Movie',
		component: MovieShow,
		props: true
	},
	{
		path: '/series/*',
		name: 'Series',
		component: SeriesShow,
		props: true
	}
	// {
	// 	path: '/search/movies',
	// 	name: 'SearchMovies',
	// 	component: SearchMovies,
	// 	props: true
	// }
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
