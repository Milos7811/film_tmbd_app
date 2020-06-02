<template>
	<!-- <div v-if="this.show"></div> -->
	<div>
		<h1>TOTO JE EPISODA</h1>
	</div>
</template>

<script>
export default {
	props: ['seasion', 'show'],
	data() {
		return {
			results: []
		}
	},
	created() {
		this.getResult()
	},
	methods: {
		getResult() {
			this.$axios
				.get(
					`https://api.themoviedb.org/3/tv/${this.$route.query.id}/season/${this.seasion}?api_key=810893a24970b82571f7a24c2decfab4&language=sk-SK`
				)
				.then(response => {
					// Object.assign(response.data, { show: false })
					this.results = response.data
					// console.log(this.results)
				})
		}
	}
}
</script>

<style lang="scss" scoped>
</style>