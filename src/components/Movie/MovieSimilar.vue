<template>
	<v-responsive v-if="this.results[0]" class="movie-similiar-wrapper">
		<h1 class="title">Podobné filmy</h1>

		<slider :results="this.results" />
	</v-responsive>
</template>

<script>
import Slider from '../Slider'
export default {
	props: ['movieId', 'type'],
	components: { Slider },
	data() {
		return {
			isActive: false,
			results: ''
		}
	},

	watch: {
		movieId(value) {
			if (value) {
				this.getResult(value)
			}
		}
	},

	methods: {
		async getResult(value) {
			try {
				const response = await this.$axios.get(
					`https://api.themoviedb.org/3/${this.type}/${this.movieId}/similar?api_key=${this.$apiKey}&language=en-US&page=1`
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
	text-align: left;
}
</style>
