<template>
	<div>
		<h2 class="title">Najlepšie hodnoteńe</h2>
		<slider class="slider" :results="this.results" />
	</div>
</template>

<script>
import Slider from './Slider'
export default {
	components: {
		Slider
	},
	data() {
		return {
			results: ''
		}
	},
	mounted() {
		this.getResult()
	},
	methods: {
		async getResult() {
			await this.$axios
				.get(
					`https://api.themoviedb.org/3/movie/top_rated?api_key=810893a24970b82571f7a24c2decfab4&page=1&region=sk`
				)
				.then(response => {
					this.results = response.data.results
				})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
.title {
	margin: auto;
}
.slider {
	clear: both;
}
</style>
