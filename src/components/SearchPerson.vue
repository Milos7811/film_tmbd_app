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
	mounted() {
		this.$root.$on('search-people-id', data => {
			this.peopleId = data.toString()

			this.getResult()
		})
	},
	methods: {
		search: debounce(function() {
			this.getResult()
		}, 500),
		getResult() {
			this.$axios
				.get(
					`https://api.themoviedb.org/3/search/person?api_key=810893a24970b82571f7a24c2decfab4&language=en-US&query=${this.peopleId}&page=1&include_adult=false`
				)
				.then(response => {
					this.results = response.data.results
				})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
.input {
	width: em(150);
	height: em(48);
	background-color: white;
	border-radius: em(20);
	outline: none;
}
</style>