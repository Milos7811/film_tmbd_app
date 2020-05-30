<template >
	<v-responsive v-if="this.results[0]" class="movie-similiar-wrapper">
		<h1 class="title">Odporúčania</h1>
		<!-- <v-lazy
			v-model="isActive"
			:options="{
				threshold: 0.5
			}"
			transition="fade-transition"
			min-height="200"
		> -->
		<slider :results="this.results" />
		<!-- </v-lazy> -->
	</v-responsive>
</template>

<script>
import Slider from './Slider'
export default {
	props: ['movieId'],
	components: { Slider },
	data() {
		return {
			isActive: false,
			results: ''
		}
	},
	mounted() {
		// this.getResult()
	},
	watch: {
		movieId(value) {
			if (value) {
				this.getResult(value)
			}
		},

		isActive(value) {
			console.log(this.isActive)
		}
	},

	methods: {
		async getResult(value) {
			await this.$axios
				.get(
					`https://api.themoviedb.org/3/movie/${this.movieId}/similar?api_key=810893a24970b82571f7a24c2decfab4&language=en-US&page=1`
				)
				.then(response => {
					this.results = response.data.results
				})
				.catch(error => {
					console.log('tu je error')
				})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
.movie-similiar-wrapper {
	min-height: em(250);
	margin: em(20);
	// margin-top: 300px;
}
.title {
	text-align: left;
}
</style>