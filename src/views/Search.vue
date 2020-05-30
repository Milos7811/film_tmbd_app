<template>
	<div class="container">
		<div class="search-what">
			<h1
				v-bind:class="{ active: movies }"
				@click=";(movies = true), (people = false), (series = false)"
			>
				Filmy
			</h1>
			<h1
				v-bind:class="{ active: people }"
				@click=";(movies = false), (people = true), (series = false)"
			>
				Herci
			</h1>
			<h1
				v-bind:class="{ active: series }"
				@click=";(movies = false), (people = false), (series = true)"
			>
				Seriály
			</h1>
		</div>

		<div class="wrapper-search">
			<transition name="fade " mode="out-in">
				<search-movies v-if="this.movies" />
				<search-people v-if="this.people" />
			</transition>
		</div>
	</div>
</template>

<script>
import SearchPeople from '../components/SearchPeople'
import SearchMovies from '../components/SearchMovies'
export default {
	components: { SearchMovies, SearchPeople },
	data() {
		return {
			movies: true,
			people: false,
			series: false
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
.active {
	border-bottom: 1px solid $primary-text;
}
.search-what {
	display: inline-flex;
	flex-wrap: wrap;
	margin-bottom: em(40);
	& > * {
		margin: em(0) em(20);
		font-size: em(20);
		cursor: pointer;
	}
}
.input {
	width: em(150);
	height: em(48);
	background-color: white;
	border-radius: em(20);
	outline: none;
}

.fade-enter {
	transform: translateX(10px);
	opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.2s ease;
}

.fade-leave-to {
	transform: translateX(-10px);
	opacity: 0;
}
</style>