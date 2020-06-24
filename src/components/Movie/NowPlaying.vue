<template>
	<div>
		<h2 class="title">Teraz hrané</h2>
		<slider class="slider" :results="this.results" />
	</div>
</template>

<script>
import Slider from '../Slider'
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
			try {
				const response = await this.$axios.get(
					`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.$apiKey}&language=sk&page=1&region=sk`
				)
				this.results = response.data.results
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../scss/app.scss';
.title {
	margin: auto;
}
.slider {
	clear: both;
}
</style>
