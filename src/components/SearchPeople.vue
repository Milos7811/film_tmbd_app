<template>
	<div>
		<input
			placeholder="Meno"
			v-model="query"
			type="text"
			class="input"
			@keydown="search"
		/>
		<person-list :results="this.results" />
		<v-pagination
			class="pagination"
			v-if="this.pageLength"
			v-model="page"
			:length="pageLength"
			:total-visible="7"
			color="rgb(155, 46, 46)"
		></v-pagination>
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
			results: '',
			pageLength: '',
			page: 1
		}
	},
	watch: {
		page() {
			this.getResult()
		}
	},

	methods: {
		search: debounce(function() {
			this.getResult()
		}, 500),
		getResult() {
			this.$axios
				.get(
					`https://api.themoviedb.org/3/search/person?api_key=810893a24970b82571f7a24c2decfab4&language=en-US&query=${this.query}&page=${this.page}&include_adult=false`
				)
				.then(response => {
					this.results = response.data.results
					this.pageLength = response.data.total_pages
				})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
.input {
	width: em(200);
	height: em(48);
	color: $primary;
	background-color: white;
	border-radius: em(20);
	outline: none;
	padding: em(5);
}
</style>