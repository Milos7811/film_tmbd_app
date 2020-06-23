<template>
	<div class="main">
		<div class="inputs-wrapper">
			<search-genres class="input" />
			<v-select
				v-model="selectYear"
				:items="yearsGenerator"
				:menu-props="{ top: false, offsetY: true }"
				label="Rok "
				height="48"
				solo
				class="select"
			>
			</v-select>
			<search-sort-by />
		</div>
		<movie-list :results="this.results" />
		<v-pagination
			class="pagination"
			v-if="this.pageLength > 1"
			v-model="page"
			:length="pageLength"
			:total-visible="7"
			color="rgb(155, 46, 46)"
		></v-pagination>
	</div>
</template>

<script>
import { debounce } from 'lodash'
import SearchGenres from '../components/SearchGenres'
import MovieList from '../components/MovieList'
import SearchSortBy from '../components/SearchSortBy'
export default {
	components: { SearchGenres, MovieList, SearchSortBy },
	data() {
		return {
			results: '',
			movieName: '',
			genresId: 28,
			selectYear: '',
			pageLength: '',
			page: 1,
			sortBy: 'popularity.desc'
		}
	},
	watch: {
		selectYear() {
			this.getResult()
		},
		page() {
			this.getResult()
		},
		sortBy() {
			if (this.results) {
				this.getResult()
			}
		}
	},

	mounted() {
		this.$root.$on('search-genres-id', data => {
			this.genresId = data
			this.getResult()
		})
		this.$root.$on('search-sort-by', data => {
			this.sortBy = data
		})
		this.getResult()
	},
	methods: {
		search: debounce(function() {
			this.getResult()
		}, 500),
		async getResult() {
			try {
				const response = await this.$axios.get(
					`https://api.themoviedb.org/3/discover/movie?api_key=${this.$apiKey}&language=sk-SK&sort_by=${this.sortBy}&include_adult=false&include_video=false&page=1&primary_release_year=${this.selectYear}&with_genres=${this.genresId}&page=${this.page}`
				)
				this.results = response.data.results
				this.pageLength = response.data.total_pages
			} catch (error) {
				console.log(error)
			}
		}
	},
	computed: {
		yearsGenerator() {
			let d = new Date()
			let n = d.getYear() + 1900
			let yearArray = []
			for (let i = 1900; i <= n; i++) {
				yearArray.push(i)
			}

			return yearArray.reverse()
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
.select {
	border-radius: em(20);
	max-width: em(150);
	height: em(48);
	margin-top: em(5);
	padding: em(0) !important;
}
.pagination {
	margin-top: em(30);
	color: $navbar;
}
.main {
	display: block;
}
.inputs-wrapper {
	// height: em(48);
	display: flex;
	& > * {
		margin: em(0) em(10);
	}
	@media (max-width: 500px) {
		& {
			flex-direction: column;
		}
		& > * {
			margin: em(0) em(10);
			color: $primary;
			padding: em(10);
			box-sizing: border-box;
			@media (max-width: 500px) {
				& {
					margin: em(10) auto;
				}
			}
		}
	}
}
.input {
	width: em(150);
	height: em(48);
	background-color: white;
	border-radius: em(20);
	outline: none;
}
@media screen and (max-width: 500px) {
	.pagination {
		color: blue !important;
	}
}
</style>
