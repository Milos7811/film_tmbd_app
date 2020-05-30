<template class="container">
	<div>
		<single-person :result="this.result" />
	</div>
</template>

<script>
import SinglePerson from '../components/SinglePerson'
export default {
	components: { SinglePerson },
	data() {
		return {
			result: ''
		}
	},
	mounted() {
		this.getResult()
	},
	methods: {
		getResult() {
			this.$axios
				.get(
					`https://api.themoviedb.org/3/person/${this.$route.query.id}?api_key=810893a24970b82571f7a24c2decfab4&language=en-US`
				)
				.then(response => {
					this.result = response.data
					// console.log(this.result)
				})
		}
	}
}
</script>

<style lang="scss" scoped>
</style>