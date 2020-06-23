<template>
	<div class="home container">
		<home-logo />
		<FastSearch v-show="this.searchQuery" />
		<div class="sliders" v-show="!this.searchQuery">
			<popular />
			<top-rated />
			<movie-upcoming />
		</div>
	</div>
</template>

<script>
import FastSearch from '../components/FastSearch.vue'
import Popular from '../components/Popular.vue'
import TopRated from '../components/TopRated'
import MovieUpcoming from '../components/MovieUpcoming'
import HomeLogo from '../components/HomeLogo'
export default {
	components: {
		FastSearch,
		Popular,
		TopRated,
		MovieUpcoming,
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
