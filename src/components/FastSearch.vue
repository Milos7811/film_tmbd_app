<template>
	<div class="search">
		<ul class="list">
			<a
				tag="li"
				:to="`/single`"
				v-for="result in results"
				:key="result.id"
				@click="goUrl(result)"
			>
				<v-card
					class="mx-auto card"
					max-width="150"
					height="300"
					v-on:mouseover="showHovered(result.id)"
					v-on:mouseout="stopHovering"
				>
					<div class="content">
						<img
							class="image"
							v-if="result.poster_path"
							v-bind:src="
								'https://image.tmdb.org/t/p/w500/' +
									result.poster_path
							"
							width="150px"
						/>
						<img
							v-else-if="result.profile_path"
							class="image"
							v-bind:src="
								'https://image.tmdb.org/t/p/w500/' +
									result.profile_path
							"
							width="150px"
						/>
						<div v-else class="empty-image">
							<p class="text">Neobsahuje</p>
							<p>obrázok</p>
						</div>
						<average-vote
							v-if="result.vote_average"
							class="vote-average"
							:voteAverage="result.vote_average"
						/>
						<p
							v-if="result.media_type == 'movie'"
							class="fast-title"
						>
							{{ shorten(result.title) }}
						</p>
						<p v-if="result.media_type == 'tv'" class="fast-title">
							{{ shorten(result.name) }}
						</p>
						<p
							v-if="result.media_type == 'person'"
							class="fast-title"
						>
							{{ shorten(result.name) }}
						</p>
					</div>
				</v-card>
			</a>
		</ul>
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
import Mixins from '../mixins/Mixins.js'
import AverageVote from './AverageVote'

export default {
	mixins: [Mixins],
	components: { AverageVote },
	data() {
		return {
			query: '',
			results: '',
			pageLength: '',
			page: 1
		}
	},
	mounted() {
		this.$root.$on('send-query-for-search', data => {
			this.query = data
		})
	},
	watch: {
		query(value) {
			if (value) {
				this.page = 1
				this.search()
			}
		},
		page() {
			this.paginate()
		}
	},
	methods: {
		paginate: debounce(function() {
			this.getResult()
		}, 300),
		search: debounce(function() {
			this.getResult()
		}, 500),
		async getResult() {
			try {
				const response = await this.$axios.get(
					`https://api.themoviedb.org/3/search/multi?api_key=${this.$apiKey}&language=sk-SK&query=${this.query}&page=${this.page}&include_adult=false`
				)
				this.results = response.data.results
				this.pageLength = response.data.total_pages
			} catch (error) {
				console.log(error)
			}
		},
		goUrl(result) {
			if (result.media_type == 'movie') {
				this.goToUrl(result.title, result.id)
			} else if (result.media_type == 'tv') {
				this.goToUrlSeries(result.name, result.id)
			} else if (result.media_type == 'person') {
				this.goToUrlPerson(result.name, result.id)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
.pagination {
	margin-top: em(30);
	color: $navbar;
}
.empty-image {
	width: em(150);
	height: em(225);
	background-color: $navbar;
	display: flex;
	flex-direction: column;
	justify-content: center;

	align-items: center;
	p {
		display: flex;
	}
	@media (max-width: 600px) {
		& {
			max-width: 100px !important;
			height: 200px !important;
		}
	}
}
.image {
	max-width: 100%;
}

.list {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-start;
	align-content: space-between;
	a {
		margin-top: em(15);
		margin-right: em(15);
		&:hover {
			transform: scale(1.05);
		}
	}
	.card {
		background-color: $navbar !important;
		color: $primary-text;
		@media (max-width: 600px) {
			& {
				max-width: 100px !important;
				height: 200px !important;
			}
		}
	}
}

.fast-title {
	@include clearfix;
	@media (max-width: 600px) {
		font-size: em(12) !important;
	}
}
</style>
