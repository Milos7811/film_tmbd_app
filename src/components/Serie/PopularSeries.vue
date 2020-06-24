<template>
	<div>
		<div class="title" :v-model="timeWindow">
			Populárne seriály tento
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
		</div>
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
	created() {
		this.getResult()
	},
	methods: {
		async getResult() {
			try {
				const response = await this.$axios.get(
					`https://api.themoviedb.org/3/trending/tv/${this.timeWindow}?api_key=${this.$apiKey}`
				)
				this.results = response.data.results
			} catch (error) {
				console.log(error)
			}
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
@import '../../scss/app.scss';
.title {
	margin: auto;
	h2 {
		display: inline;

		cursor: pointer;
	}
}
.active-timeWindow {
	border-bottom: 1px solid darken($primary-text, 10%);
}
.slider {
	clear: both;
}
</style>
