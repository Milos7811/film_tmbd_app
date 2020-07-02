<template>
	<div>
		<search-people class="input" @keydown="search" />
	</div>
</template>

<script>
export default {
	data() {
		return {
			people: ''
		}
	},
	created() {
		this.getResult()
	},
	mounted() {
		this.$root.$on('search-people-id', data => {
			this.peopleId = data.toString()
		})
	},
	methods: {
		search: debounce(function() {
			this.getResult()
		}, 500),
		async getResult() {
			try {
				const response = await this.$axios.get(
					`https://api.themoviedb.org/3/search/person?api_key=${this.$apiKey}&language=en-US&query=${this.peopleId}&page=1&include_adult=false`
				)
				this.results = response.data.results
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../scss/app.scss';
.input {
	width: em(150);
	height: em(48);
	background-color: white;
	border-radius: em(20);
	outline: none;
}
</style>
