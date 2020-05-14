<template>
	<div>
		<h2 class="title">Prichádzajúce</h2>
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
		this.$axios
			.get(
				`https://api.themoviedb.org/3/movie/upcoming?api_key=810893a24970b82571f7a24c2decfab4&language=sk-US&page=1`
			)
			.then(response => {
				this.results = response.data.results
			})
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
.title {
	float: left;
}
.slider {
	clear: both;
}
</style>
