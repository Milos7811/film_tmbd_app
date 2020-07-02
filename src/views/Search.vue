<template>
	<div>
		<!-- <div class="search-what-container"> -->
		<div class="search-what">
			<v-tabs
				v-model="tabs"
				background-color="transparent"
				color="#d1e8e2"
				dark
				centered
			>
				<v-tab href="#movies">
					<h1>
						Filmy
					</h1></v-tab
				>
				<v-tab href="#actors">
					<h1>
						Herci
					</h1></v-tab
				>
				<v-tab href="#series">
					<h1>
						Seriály
					</h1></v-tab
				>
				<v-tabs-slider color="rgb(155, 46, 46)"></v-tabs-slider>
			</v-tabs>
			<!-- <h1
					v-bind:class="{ active: movies }"
					@click="
						;(movies = true), (people = false), (series = false)
					"
				>
					Filmy
				</h1>
				<h1
					v-bind:class="{ active: people }"
					@click="
						;(movies = false), (people = true), (series = false)
					"
				>
					Herci
				</h1>
				<h1
					v-bind:class="{ active: series }"
					@click="
						;(movies = false), (people = false), (series = true)
					"
				>
					Seriály
				</h1> -->
		</div>
		<!-- </div> -->

		<!-- <div class="wrapper-search"> -->
		<transition name="fade" mode="out-in">
			<search-movies id="movies" v-if="this.tabs === 'movies'" />
			<search-people id="people" v-if="this.tabs === 'actors'" />
			<search-series id="series" v-if="this.tabs === 'series'" />
		</transition>
		<!-- </div> -->
	</div>
</template>

<script>
import SearchPeople from '../components/Actor/SearchPeople'
import SearchMovies from '../components/Movie/SearchMovies'
import SearchSeries from '../components/Serie/SearchSeries'
export default {
	components: { SearchMovies, SearchPeople, SearchSeries },
	data() {
		return {
			movies: true,
			people: false,
			series: false,
			tabs: null
		}
	},
	methods: {
		toogle(element) {
			element = true
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';

a.v-tab {
	padding: 0px;
}

v-tab {
	margin: auto;
}

.search-what {
	display: inline-flex;
	flex-wrap: wrap;
	margin-bottom: em(40);
	font-size: em(15);
	& > * {
		margin-right: em(20);
		font-size: em(20);
		cursor: pointer;
		&:last-child {
			margin-right: 0px;
		}
	}
}
.input {
	width: em(150);
	height: em(48);
	background-color: white;
	border-radius: em(20);
	outline: none;
}
.fade-enter-active,
.fade-leave-active {
	transition: all 0.2s ease;
}

.fade-enter {
	transform: translateX(10%);
	opacity: 0;
}

.fade-leave-to {
	transform: translateX(-10%);
	opacity: 0;
}
</style>
