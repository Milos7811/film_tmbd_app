<template>
	<div class="content">
		<single-series-show :result="this.result" />
	</div>
</template>

<script>
import SingleSeriesShow from '../components/Serie/SingleSeriesShow'
export default {
	name: 'SeriesShow',
	components: { SingleSeriesShow },
	data() {
		return {
			result: '',
			language: 'sk-SK'
		}
	},
	watch: {
		$route: {
			handler: function(id) {
				this.reset()
			}
		}
	},
	created() {
		this.getResult()
	},
	methods: {
		reset() {
			Object.assign(this.$data, this.$options.data())
			this.getResult()
		},
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

<style lang="scss" scoped>
@import '../scss/app.scss';
.content {
	@media (min-width: 450px) {
		padding: em(40) !important;
	}
}
</style>
