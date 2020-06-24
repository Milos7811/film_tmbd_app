<template>
	<div v-if="this.results[0]" class="movie-similiar-wrapper">
		<h1 class="title">Podobné seriály</h1>

		<slider-series :results="this.results" />
	</div>
</template>

<script>
import SliderSeries from './SliderSeries'
export default {
	components: { SliderSeries },
	data() {
		return {
			isActive: false,
			results: ''
		}
	},
	created() {
		this.getResult()
	},
	methods: {
		async getResult(value) {
			try {
				const response = await this.$axios.get(
					`https://api.themoviedb.org/3/tv/${this.$route.query.id}/similar?api_key=${this.$apiKey}&language=en-US&page=1`
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
.movie-similiar-wrapper {
	min-height: em(250);
	margin: em(20);
	// margin-top: 300px;
}
.title {
	text-align: center;
}
</style>
