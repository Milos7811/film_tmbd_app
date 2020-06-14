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
		async getResult() {
			try {
				const response = await this.$axios.get(
					`https://api.themoviedb.org/3/person/${this.$route.query.id}?api_key=${this.$apiKey}&language=en-US`
				)
				this.result = response.data
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>

<style lang="scss" scoped></style>
