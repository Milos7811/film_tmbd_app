<template>
	<div>
		<p class="series-title">
			{{ this.result.name }}
		</p>
		<img
			class="series-image"
			v-if="this.result.poster_path"
			:src="
				`http://image.tmdb.org/t/p/original/${this.result.poster_path} `
			"
			:alt="this.result.name"
		/>
		<main>
			<article class="overview">
				<h1 class="overview-title">Obsah</h1>
				<p class="overview-text">{{ this.result.overview }}</p>
			</article>
			<div class="average">
				<h1 class="average-text">
					<p>Užívateľské</p>
					<p>hodnotenie</p>
				</h1>
				<average-vote
					class="series-vote-average"
					:voteAverage="this.result.vote_average"
				/>
				<article class="genres-release-date">
					<p
						class="one-genre"
						v-for="genre in this.result.genres"
						:key="genre.id"
					>
						{{ genre.name }}
					</p>
					<!-- <p class="dot">•</p> -->
				</article>
				<p class="air-date">Dátum prvého vydania: {{ firstAirDate }}</p>
				<p class="original-name">
					Pôvodný názov: {{ this.result.original_name }}
				</p>
			</div>
		</main>
		<movie-crew class="crew" :movieId="this.result.id" type="tv" />
		<series-seasons-group :result="filterItems" />
	</div>
</template>

<script>
import SeriesSeasonsGroup from '../components/SeriesSeasonsGroup'
import MovieCrew from '../components/MovieCrew'
import moment from 'moment'
import AverageVote from '../components/AverageVote'
import Mixins from '../mixins/Mixins'
export default {
	components: { AverageVote, MovieCrew, SeriesSeasonsGroup },
	mixins: [Mixins],
	props: ['result'],
	data() {
		return {
			filterItems: ''
		}
	},
	watch: {
		result(newValue, oldValue) {
			this.filterSeasons()
		}
	},
	computed: {
		firstAirDate() {
			return moment(this.result.first_air_date).format('DD MMM YYYY')
		}
	},
	methods: {
		filterSeasons() {
			let filteredItem = []
			this.result.seasons.forEach(item => {
				if (item.season_number > 0) {
					Object.assign(item, { show: false })
					filteredItem.push(item)
					// this.filterItems.push(item)
				}
			})
			// return filteredItem
			this.filterItems = filteredItem
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
.air-date {
	margin: em(20) em(0);
	text-align: left;
}
.original-name {
	margin: em(20) em(0);
	text-align: left;
}
.series-title {
	font-size: em(30);
}
.series-image {
	max-width: em(300);
	float: left;
	margin: em(0) em(15) em(0) em(0);
}
.overview {
	margin: em(15);
	text-align: left;
	// float: right;
	.overview-title {
		font-size: em(20);
		margin-bottom: em(10);
	}
}
.average {
	// height: em(50);
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	margin-top: em(40);
	.average-text {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		margin-left: em(80);
		p {
			margin-bottom: em(5);
		}
	}
	.series-vote-average {
		margin-top: em(10);
		position: absolute;
		transform: scale(1.5);
		// clear: both;
	}
	.genres-release-date {
		display: flex;
		margin-top: em(35);
		.one-genre {
			margin-right: em(10);
		}
		.dot {
			margin: em(0) em(10);
		}
	}
}
.crew {
	clear: both;
}
</style>