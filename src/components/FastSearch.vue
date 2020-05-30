<template>
	<div class="search">
		<ul class="list">
			<a
				tag="li"
				:to="`/single`"
				v-for="result in results"
				:key="result.id"
				@click="goToUrl(result.title, result.id)"
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
							v-bind:src="
								'http://image.tmdb.org/t/p/w500/' +
									result.poster_path
							"
							width="150px"
						/>
						<average-vote
							class="vote-average"
							:voteAverage="result.vote_average"
						/>
						<p class="fast-title">{{ shorten(result.title) }}</p>
					</div>
				</v-card>
			</a>
		</ul>
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
			// year: '',
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
					`https://api.themoviedb.org/3/search/movie?api_key=810893a24970b82571f7a24c2decfab4&query=${this.query}&year=2000-2020`
				)
				.then(response => {
					this.results = response.data.results.filter(data => {
						if (data.poster_path && data.overview) {
							return data
						}
					})
				})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';

ul {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
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
	}
}

.fast-title {
	// clear: both;
	@include clearfix;
}
</style>
