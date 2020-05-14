<template>
	<div height="200vh">
		<h2>Hlavne obsadenie</h2>
		<v-lazy
			v-model="isActive"
			:options="{
				threshold: 0.5
			}"
			min-height="200"
			transition="fade-transition"
		>
			<movie-crew-slider :results="this.results" />
		</v-lazy>
	</div>
</template>

<script>
import MovieCrewSlider from './MovieCrewSlider'
export default {
	props: ['movieId'],
	components: { MovieCrewSlider },
	data() {
		return {
			results: '',
			isActive: false
		}
	},
	watch: {
		movieId(value) {
			if (value) {
				this.getResult()
			}
		}
	},
	methods: {
		getResult() {
			this.$axios
				.get(
					`https://api.themoviedb.org/3/movie/${this.movieId}/credits?api_key=810893a24970b82571f7a24c2decfab4`
				)
				.then(response => {
					this.results = response.data
					// console.log(this.results)
				})
		}
	}
}
</script>

<style lang="scss" scoped>
</style>