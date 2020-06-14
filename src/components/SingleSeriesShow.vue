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
		<div v-else class="image empty-image ">
			<p class="text">Neobsahuje</p>
			<p>obrázok</p>
		</div>
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
				<h1>{{ this.result.status }}</h1>
				<article class="genres-release-date">
					<strong>Žáner: </strong>
					<p
						class="one-genre"
						v-for="genre in this.result.genres"
						:key="genre.id"
					>
						{{ genre.name }}
					</p>
					<!-- <p class="dot">•</p> -->
				</article>
				<p class="air-date">
					<strong> Dátum prvého vydania:</strong> {{ firstAirDate }}
				</p>
				<p class="original-name">
					<strong> Pôvodný názov:</strong>
					{{ this.result.original_name }}
				</p>
			</div>
		</main>
		<movie-crew class="crew" :movieId="this.result.id" type="tv" />
		<h1 class="title">Série</h1>
		<div v-for="season in filterItems" :key="season.id">
			<single-season :season="season.season_number" />
		</div>
	</div>
</template>

<script>
import SingleSeason from '../components/SingleSeason'
import MovieCrew from '../components/MovieCrew'
import moment from 'moment'
import AverageVote from '../components/AverageVote'
import Mixins from '../mixins/Mixins'
export default {
	components: { AverageVote, MovieCrew, SingleSeason },
	mixins: [Mixins],
	props: ['result'],
	data() {
		return {
			filterItems: '',
			showSeasons: true
		}
	},
	watch: {
		result(newValue, oldValue) {
			setTimeout(() => {
				this.filterSeasons()
			}, 500)
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
					filteredItem.push(item)
				}
			})
			this.filterItems = filteredItem
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
.empty-image {
	width: em(300);
	height: em(450);
	background-color: $primary;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	max-width: em(300);
	float: left;
	margin: em(0) em(15) em(0) em(0);
	box-shadow: 0px 8px 8px -3px rgba(0, 0, 0, 0.6),
		0px 10px 16px 1px rgba(0, 0, 0, 0.18),
		0px 4px 20px 3px rgba(0, 0, 0, 0.2) !important;
	p {
		display: flex;
	}
}
.title {
	margin: em(30);
}
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