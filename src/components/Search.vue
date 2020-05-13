<template>
	<div class="search">
		<!-- <h1>Search</h1> -->
		<!-- <input
			type="text"
			v-model="query"
			@keyup="search()"
			placeholder="Name"
		/>
		<input
			type="text"
			v-model="year"
			@keyup="search()"
			placeholder="Year"
		/> -->
		<ul class="list">
			<a
				tag="li"
				:to="`/single`"
				v-for="result in results"
				:key="result.id"
				@click="goToUrl(result.title, result.id)"
			>
				<div class="content">
					<!-- <p class="title">{{ shorten(result.title) }}</p> -->
					<img
						v-bind:src="
							'http://image.tmdb.org/t/p/w500/' +
								result.poster_path
						"
						width="100px"
					/>
					<!-- <p>{{ result.vote_average }}</p> -->
				</div>
			</a>
		</ul>
	</div>
</template>
<script>
import { debounce } from 'lodash'
import Mixins from '../mixins/Mixins.js'

export default {
	mixins: [Mixins],
	data() {
		return {
			query: '',
			year: '',
			results: ''
		}
	},
	mounted() {
		this.$root.$on('send-query-for-search', data => {
			this.query = data
		})
	},
	watch: {
		query(value) {
			// console.log(value)
			this.search()
		}
	},
	methods: {
		search: debounce(function() {
			this.getResult()
		}, 500),
		getResult() {
			this.$axios
				.get(
					`https://api.themoviedb.org/3/search/movie?api_key=810893a24970b82571f7a24c2decfab4&query=${this.query}&include_adult=false&year=${this.year}`
				)
				.then(response => {
					this.results = response.data.results.filter(data => {
						if (data.poster_path) {
							return data
						}
					})
				})
		}
	}
}
</script>

<style lang="scss" scoped>
.list {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: center;
	align-content: flex-start;
	padding: 0px;
	li {
		position: relative;
		list-style: none;
		// border: 1px solid black;
		width: 200px;
		height: 250px;
		margin: 10px;
		padding: 5px;
		.title {
			// white-space: nowrap;
		}
		.content {
			margin: auto;
			position: inherit;
			top: 50%;
			transform: translateY(-50%);
		}
	}
}
</style>
