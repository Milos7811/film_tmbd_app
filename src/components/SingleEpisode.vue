<template>
	<div>
		<v-card class="card" tag="li">
			<div class="top-content">
				<v-skeleton-loader
					v-if="!this.result.still_path"
					class="mx-auto image"
					max-width="300"
					type="image"
				></v-skeleton-loader>
				<img
					v-if="this.result.still_path"
					class="image"
					:src="
						`http://image.tmdb.org/t/p/w500/${this.result.still_path}`
					"
					alt=""
				/>

				<div class="info-group">
					<average-vote
						class="average"
						:voteAverage="parseInt(this.result.vote_average)"
					/>
					<p class="date">
						<strong> Dátum vydania:</strong>
						{{ airDate(this.result.air_date) }}
					</p>
				</div>
			</div>

			<article class="content">
				<h1 class="name">
					<h1 class="episode-count" v-if="this.episodeNumber">
						{{ this.result.episode_number }}
					</h1>
					{{ this.result.name }}
				</h1>
				<p class="overview">{{ this.result.overview }}</p>
			</article>
		</v-card>
	</div>
</template>

<script>
import AverageVote from '../components/AverageVote'
import moment from 'moment'

export default {
	props: ['season_number', 'episode_number'],
	components: { AverageVote },
	data() {
		return {
			result: '',
			isActive: false,
			language: 'sk-SK'
		}
	},
	mounted() {
		this.getResult()
	},
	watch: {
		result(newValue, oldValue) {
			this.episodeNumber()
		}
	},
	methods: {
		async getResult() {
			try {
				const response = await this.$axios.get(
					`https://api.themoviedb.org/3/tv/${this.$route.query.id}/season/${this.season_number}/episode/${this.episode_number}?api_key=${this.$apiKey}&language=${this.language}`
				)

				// if (!response.data.overview && this.language == 'sk-SK') {
				// 	this.language = 'en-US'
				// 	this.getResult()
				// } else {
				this.result = response.data
				// }
			} catch (error) {
				console.log(error)
			}
		},
		airDate(date) {
			return moment(date).format('DD  MMM  YYYY')
		},

		episodeNumber() {
			const episodeName = this.result.name.includes('Episode')
			return episodeName
		}
	}
}
</script>
<style lang="scss" scoped>
@import '../scss/app.scss';
.card {
	background-color: $primary !important;
	color: $primary-text;
	padding: em(10);

	box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
		0px 8px 10px 1px rgba(0, 0, 0, 0.14),
		0px 3px 14px 2px rgba(0, 0, 0, 0.12) !important;
	&:hover {
		box-shadow: 0px 8px 8px -3px rgba(0, 0, 0, 0.6),
			0px 10px 16px 1px rgba(0, 0, 0, 0.18),
			0px 4px 20px 3px rgba(0, 0, 0, 0.2) !important;
	}
}
.content {
	width: 100%;
	text-align: center;
}
.top-content {
	width: 100%;
	// min-width: em(360);
	padding-bottom: em(10);
	border-bottom: 1px solid darken(#f2f2f2, 30%);
	display: flex;
	justify-content: space-between;
	@media (max-width: 800px) {
		& {
			flex-direction: column;
			align-items: center;
			margin-bottom: em(10);
		}
	}
	.info-group {
		display: flex;
		align-items: center;
		.average {
			margin: em(0) em(20);
		}
		@media (max-width: 615px) {
			flex-direction: column;
			.average {
				margin: em(5) em(0);
			}
		}
	}
	.image {
		max-width: em(150);
	}

	.date {
		margin: 0px;
	}
}
.wrapper {
	width: 70%;
	margin: auto;
	overflow: hidden;
	ul {
		list-style: none;
		li {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: flex-start;
			align-items: center;
			align-content: center;
			margin: em(30) auto;
			// border-bottom: 1px solid $primary-text;
		}
	}
}

.name {
	margin: em(0) em(20);
	.episode-count {
		display: inline;
		margin-right: em(5);
	}
}

.episode-enter-active,
.episode-leave-active {
	transition: all 0.5s ease;
	overflow: hidden;
}
.episode-enter,
.episode-leave-to {
	transform: scaleY(0);
	opacity: 0;
}
// .episode-leave
.episode-enter-to {
	transform: scaleY(1);
	opacity: 1;
}
</style>
