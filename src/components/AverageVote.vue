<template>
	<div>
		<v-progress-circular
			class="circle"
			:rotate="360"
			:size="40"
			:width="2"
			:value="percentageValue"
			:color="colorCircle()"
		>
			{{ percentageValue }}
			<p>%</p>
		</v-progress-circular>
	</div>
</template>

<script>
export default {
	props: ['voteAverage'],

	computed: {
		percentageValue() {
			let value = this.voteAverage * 10
			return value
		}
	},
	methods: {
		colorCircle() {
			if (this.percentageValue >= 70) {
				return 'teal'
			} else if (this.percentageValue < 70) {
				return 'yellow'
			} else if (this.percentageValue <= 30) {
				return 'red'
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';

.circle {
	font-size: em(14);
	height: em(40);
	background-color: black;
	border-radius: em(100);
	float: left;
	width: em(40);
	margin-left: em(10);
	font-weight: 600;
	p {
		font-size: em(8, 14);
		margin-top: em(20);
		font-weight: 600;
	}
}
</style>
