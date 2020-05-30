<template>
	<div>
		<h1>HERCI SU TI</h1>
		<input v-model="query" type="text" class="input" @keydown="search" />
		<person-list :results="this.results" />
	</div>
</template>

<script>
import { debounce } from 'lodash'
import PersonList from '../components/PersonList'
export default {
	components: { PersonList },
	data() {
		return {
			query: '',
			results: ''
		}
	},

	methods: {
		search: debounce(function() {
			this.getResult()
		}, 500),
		getResult() {
			this.$axios
				.get(
					`https://api.themoviedb.org/3/search/person?api_key=810893a24970b82571f7a24c2decfab4&language=en-US&query=${this.query}&page=1&include_adult=false`
				)
				.then(response => {
					this.results = response.data.results
					console.log(response.data)
					// this.person = response.data.results
					// response.data.results.forEach(element => {
					// 	this.person.push(element.id)
					// })
				})
		}
	}
}
</script>

<style lang="scss" scoped>
//
</style>