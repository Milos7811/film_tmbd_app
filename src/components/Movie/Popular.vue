<template>
	<transition out-in>
		<div class="popular">
			<div class="title" :v-model="timeWindow">
				Populárne filmy tento
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

			<slider class="slider" :results="this.results" />
		</div>
	</transition>
</template>

<script>
import Mixins from '../../mixins/Mixins.js'
import Slider from '../Slider.vue'

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
	created() {
		this.getResult()
	},
	methods: {
		async getResult() {
			try {
				const response = await this.$axios.get(
					`https://api.themoviedb.org/3/trending/movie/${this.timeWindow}?api_key=${this.$apiKey}`
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
.slider {
	clear: both;
}
.active-timeWindow {
	border-bottom: 1px solid darken($primary-text, 10%);
}
</style>
