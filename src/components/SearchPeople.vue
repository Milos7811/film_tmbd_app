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
import iso3311a2 from 'iso-3166-1-alpha-2'
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
			if (this.query) {
				this.getResult()
			} else if (!this.query) {
				this.getPopular()
			}
		},
		query() {
			if (!this.query) {
				this.getPopular()
			}
		}
	},
	created() {
		this.getPopular()
	},
	methods: {
		search: debounce(function() {
			if (this.query) {
				this.getResult()
			}
		}, 500),
		async getResult() {
			try {
				const response = await this.$axios.get(
					`https://api.themoviedb.org/3/search/person?api_key=${this.$apiKey}&language=en-US&query=${this.query}&page=${this.page}&include_adult=false`
				)
				this.results = response.data.results
				this.pageLength = response.data.total_pages
			} catch (error) {
				console.log(error)
			}
		},
		async getPopular() {
			try {
				const response = await this.$axios.get(
					`https://api.themoviedb.org/3/person/popular?api_key=${this.$apiKey}&language=en-US&page=${this.page}`
				)
				this.results = response.data.results
				this.pageLength = response.data.total_pages
			} catch (error) {
				console.log(error)
			}
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
