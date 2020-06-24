<template>
	<div class="home container">
		<home-logo />
		<FastSearch v-show="this.searchQuery" />
		<div class="sliders" v-show="!this.searchQuery">
			<popular />
			<top-rated />
			<movie-upcoming />
			<popular-series />
			<top-rated-series />
		</div>
	</div>
</template>

<script>
import FastSearch from '../components/FastSearch.vue'
import Popular from '../components/Movie/Popular.vue'
import TopRated from '../components/Movie/TopRated'
import TopRatedSeries from '../components/Serie/TopRatedSeries'
import MovieUpcoming from '../components/Movie/MovieUpcoming'
import PopularSeries from '../components/Serie/PopularSeries'
import HomeLogo from '../components/HomeLogo'
export default {
	components: {
		FastSearch,
		Popular,
		TopRated,
		TopRatedSeries,
		MovieUpcoming,
		PopularSeries,
		HomeLogo
	},
	data() {
		return {
			searchQuery: ''
		}
	},
	mounted() {
		this.$root.$on('send-query-for-search', data => {
			this.searchQuery = data
		})
	}
}
</script>
<style lang="scss" scoped></style>
