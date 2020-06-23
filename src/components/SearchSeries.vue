<template>
	<div>
		<div class="inputs-wrapper">
			<search-genres class="select" />
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
			<search-sort-by class="select" />
		</div>
		<series-list :results="this.results" />
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
import SearchGenres from '../components/SearchGenres'
import SearchSortBy from '../components/SearchSortBy'
import SeriesList from '../components/SeriesList'
export default {
	components: { SearchGenres, SearchSortBy, SeriesList },
	data() {
		return {
			pageLength: '',
			selectYear: '',
			sortBy: 'popularity.desc',
			genresId: 80,
			page: 1,
			results: ''
		}
	},
	watch: {
		page() {
			this.getResult()
		},
		sortBy() {
			this.getResult()
		},
		selectYear() {
			this.getResult()
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
		async getResult() {
			let resultsArray = []
			try {
				const response = await this.$axios.get(
					`https://api.themoviedb.org/3/discover/tv?api_key=${this.$apiKey}&language=en-US&sort_by=${this.sortBy}&first_air_date_year=${this.selectYear}&page=${this.page}&with_genres=${this.genresId}&include_null_first_air_dates=false`
				)

				response.data.results.forEach(element => {
					if (element.overview) {
						resultsArray.push(element)
					}
				})
				this.pageLength = response.data.total_pages

				this.results = resultsArray
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
.inputs-wrapper {
	display: flex;
	.select {
		margin: em(0) em(10);
	}
	@media (max-width: 500px) {
		& {
			// display: flex;
			flex-direction: column;
			align-items: center;
		}
		.select {
			margin: em(10) em(0);
			// margin: em(0) em(10);
			// color: $primary;
			// padding: em(10);
			// box-sizing: border-box;
			// margin: em(10) auto;
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
</style>
