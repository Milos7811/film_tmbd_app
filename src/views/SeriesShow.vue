<template>
	<div>
		<single-series-show :result="this.result" />
	</div>
</template>

<script>
import SingleSeriesShow from '../components/SingleSeriesShow'
export default {
	name: 'SeriesShow',
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
		async getResult() {
			try {
				const response = await this.$axios.get(
					`https://api.themoviedb.org/3/tv/${this.$route.query.id}?api_key=${this.$apiKey}&language=${this.language}`
				)
				if (!this.result) {
					this.overviewFilter(response.data)
				} else {
					this.seasonsFilter(response.data.seasons)
				}
			} catch (error) {
				console.log(error)
			}
		},
		overviewFilter(response) {
			if (!response.overview) {
				this.language = 'en-US'
				this.getResult()
			} else {
				this.result = response
				this.language = 'sk-SK'
				this.getResult()
			}
		},
		seasonsFilter(response) {
			let items = []

			response.forEach(item => {
				if (!item.overview && this.language == 'sk-SK') {
					items.push(item)
					this.language = 'en-US'
					this.getResult()
				} else {
					items.push(item)
				}
			})
			this.result.seasons = items
			// console.log(this.result.seasons)
		}
	}
}
</script>

<style lang="scss" scoped></style>
