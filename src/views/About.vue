<template>
	<div>
		<div class="pa-6 text-center">
			Scroll down
		</div>

		<!-- <v-responsive height="200vh" class="text-center pa-2"> -->
		<v-responsive min-height="50vh"></v-responsive>
		<div class="text-center body-2 mb-12">
			The card will appear below:
		</div>

		<v-lazy
			v-model="isActive"
			:options="{
				threshold: 0.5
			}"
			class="ahoj"
			min-height="200"
			transition="fade-transition"
		>
			<v-card class="mx-auto" max-width="336">
				<v-card-title>Card title</v-card-title>

				<v-card-text>
					Phasellus magna. Quisque rutrum. Nunc egestas, augue at
					pellentesque laoreet, felis eros vehicula leo, at malesuada
					velit leo quis pede. Aliquam lobortis. Quisque libero metus,
					condimentum nec, tempor a, commodo mollis, magna. In turpis.
					In dui magna, posuere eget, vestibulum et, tempor auctor,
					justo. In turpis. Pellentesque dapibus hendrerit tortor. Ut
					varius tincidunt libero.
				</v-card-text>
			</v-card>
		</v-lazy>
		<!-- </v-responsive> -->
	</div>
</template>
<script>
// import AverageVote from '../components/AverageVote.vue'
export default {
	// components: { AverageVote },
	data() {
		return {
			isActive: false
		}
	},
	watch: {
		isActive(newValue, oldValue) {
			console.log(this.isActive)
		}
	}
}
</script>
<style lang="scss" scoped>
.ahoj {
	margin-top: 400px;
}
.okno {
	// min-height: 100%;
}
</style>