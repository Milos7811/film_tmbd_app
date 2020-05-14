<template>
	<v-skeleton-loader
		ref="skeleton"
		type="image"
		class="mx-auto"
		width="150"
		height="200"
	></v-skeleton-loader>
</template>
<script>
// import AverageVote from '../components/AverageVote.vue'
export default {
	// components: { AverageVote },
	data() {
		return {
			loading: false
		}
	},
	watch: {
		isActive(value) {
			console.log(value)
		}
	}
}
</script>
<style lang="scss" scoped>
.ahoj {
	margin-top: 2000px;
}
.okno {
	// min-height: 100%;
}
</style>