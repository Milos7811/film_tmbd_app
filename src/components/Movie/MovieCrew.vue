<template>
	<div
		v-if="this.results.cast && this.results.cast.length > 0"
		min-height="200"
	>
		<h1 class="title">Hlavne obsadenie</h1>
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
	props: ['movieId', 'type'],
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
		async getResult() {
			try {
				const response = await this.$axios.get(
					`https://api.themoviedb.org/3/${this.type}/${this.movieId}/credits?api_key=${this.$apiKey}`
				)

				this.results = response.data
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>

<style lang="scss" scoped></style>
