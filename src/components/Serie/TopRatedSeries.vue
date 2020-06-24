<template>
	<div>
		<h2 v-if="this.results" class="title">Najlepšie hodnoteńe seriály</h2>
		<slider-series class="slider" :results="this.results" />
	</div>
</template>

<script>
import SliderSeries from './SliderSeries'
export default {
	components: {
		SliderSeries
	},
	data() {
		return {
			results: ''
		}
	},
	created() {
		this.getResult()
	},
	methods: {
		async getResult() {
			try {
				const response = await this.$axios.get(
					`https://api.themoviedb.org/3/tv/top_rated?api_key=${this.$apiKey}&language=en-US&page=1`
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
