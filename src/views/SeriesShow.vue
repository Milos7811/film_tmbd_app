<template>
	<div>
		<single-series-show :result="this.result" />
	</div>
</template>

<script>
import SingleSeriesShow from '../components/SingleSeriesShow'
export default {
	components: { SingleSeriesShow },
	data() {
		return {
			result: '',
			language: 'sk-SK'
		}
	},
	mounted() {
		this.getResult()
	},
	methods: {
		getResult() {
			this.$axios
				.get(
					`https://api.themoviedb.org/3/tv/${this.$route.query.id}?api_key=810893a24970b82571f7a24c2decfab4&language=${this.language}&append_to_response=videos`
				)
				.then(response => {
					// console.log(response.data.seasons[0].overview)
					if (!response.data.overview) {
						this.language = 'en-US'
						this.getResult()
					} else if (
						response.data.overview &&
						!response.data.seasons[0].overview &&
						this.language == 'sk-SK'
					) {
						this.result = response.data
						this.language = 'en-US'

						this.getResult()
					} else {
						this.result.seasons = response.data.seasons
					}
				})
		}
	}
}
</script>

<style lang="scss" scoped>
</style>