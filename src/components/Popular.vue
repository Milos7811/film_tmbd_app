<template>
	<div class="popular">
		<h2 class="title" :v-model="timeWindow">
			Populárne tento
			<h2
				@click=";(timeWindow = 'day'), toogleDay()"
				:class="{ 'active-timeWindow': timeWindowDay }"
			>
				deň
			</h2>
			|
			<h2
				@click="
					;((timeWindow = 'week'), toogleWeek()),
						(timeWindowWeek = true)
				"
				v-bind:class="{ 'active-timeWindow': timeWindowWeek }"
			>
				týždeň
			</h2>
		</h2>

		<slider class="slider" :results="this.results" />
	</div>
</template>

<script>
import Mixins from '../mixins/Mixins.js'
import Slider from '../components/Slider.vue'

export default {
	components: { Slider },
	mixins: [Mixins],
	data() {
		return {
			results: '',
			timeWindow: 'day',
			timeWindowDay: true,
			timeWindowWeek: false
		}
	},
	watch: {
		timeWindow() {
			this.getResult()
		}
	},
	mounted() {
		this.getResult()
	},
	methods: {
		getResult() {
			this.$axios
				.get(
					`https://api.themoviedb.org/3/trending/movie/${this.timeWindow}?api_key=810893a24970b82571f7a24c2decfab4`
				)
				.then(response => {
					this.results = response.data.results
				})
		},
		toogleDay() {
			this.timeWindowDay = true
			this.timeWindowWeek = false
		},
		toogleWeek() {
			this.timeWindowDay = false
			this.timeWindowWeek = true
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
.title {
	float: left;
	h2 {
		display: inline;

		cursor: pointer;
	}
}
.slider {
	clear: both;
}
.active-timeWindow {
	border-bottom: 1px solid darken($primary-text, 10%);
}
</style>
