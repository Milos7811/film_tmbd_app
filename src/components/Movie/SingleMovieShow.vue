<template>
	<transition name="rerender" mode="out-in">
		<div v-cloak class="content">
			<h2 class="title-name">{{ this.result.title }}</h2>
			<main class="main">
				<div class="image-wrapper">
					<img
						v-if="this.result.poster_path"
						class="image"
						v-bind:src="this.fullImagePath"
					/>
					<div v-else class="image empty-image ">
						<p class="text">Neobsahuje</p>
						<p>obrázok</p>
					</div>
				</div>
				<article class="overview">
					<h1 class="overview-title">Obsah</h1>
					<p v-if="result.overview" class="overview-text">
						{{ result.overview }}
					</p>
					<p v-else>Neobsahuje žiadny obsah .</p>
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
						<strong>Žáner:</strong>
						<ul>
							<li
								class="one-genre"
								v-for="genre in this.result.genres"
								:key="genre.id"
							>
								{{ genre.name }}
							</li>
						</ul>
					</article>
					<p v-if="this.result.release_date" class="release-date">
						<strong> Dátum vydania: </strong
						>{{ this.result.release_date }}
					</p>
					<p class="runtime" v-if="this.result.runtime">
						<Strong>Dĺžka filmu:</Strong>
						{{ this.result.runtime }} min.
					</p>
				</div>
			</main>
			<div class="video-wraper" v-if="this.fulllVideoPath">
				<iframe
					class="video-player"
					frameborder="0"
					:src="this.fulllVideoPath"
				></iframe>
			</div>

			<movie-crew class="crew" :movieId="result.id" type="movie" />

			<movie-similar type="movie" :movieId="result.id" />
		</div>
	</transition>
</template>

<script>
import moment from 'moment'
import Mixins from '../../mixins/Mixins.js'
import AverageVote from '../AverageVote.vue'
import MovieCrew from './MovieCrew.vue'
import MovieSimilar from './MovieSimilar'
export default {
	name: 'SingleMovieShow',
	mixins: [Mixins],
	components: { AverageVote, MovieCrew, MovieSimilar },
	data() {
		return {
			youtubeURL: 'https://www.youtube.com/embed/',
			video: '',
			fulllVideoPath: '',
			fullImagePath: '',
			result: '',
			language: 'sk'
		}
	},
	computed: {
		releaseData() {
			return moment(this.result.release_date).format('DD MMM YYYY')
		}
	},

	created() {
		this.getResult()
	},

	watch: {
		$route: {
			handler: function(id) {
				this.reset()
			}
		}
	},

	methods: {
		reset() {
			Object.assign(this.$data, this.$options.data())
			this.getResult()
		},
		async getResult() {
			try {
				const response = await this.$axios.get(
					`https://api.themoviedb.org/3/movie/${this.$route.query.id}?api_key=${this.$apiKey}&language=${this.language}&append_to_response=videos`
				)
				if (!response.data.overview && this.language == 'sk-SK') {
					this.language = 'en'
					this.getResult()
				} else if (
					response.data.videos.results[0] &&
					!this.fulllVideoPath
				) {
					this.getVideo(response.data.videos.results[0].key)
					this.getResult()
				} else {
					this.result = response.data
					this.getImage()
				}
			} catch (error) {
				console.log(error)
			}
		},
		genreLine(index) {
			return this.data
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../scss/app.scss';

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
.main {
	min-height: em(450);
}
.release-date {
	margin: em(15) em(0);
	text-align: left;
}
.runtime {
	margin: em(15) em(0);
	text-align: left;
}
.title-name {
	font-size: em(30);
}
.image {
	// max-width: em(300);
	width: 100%;
	max-width: 300px;
	float: left;
	margin: em(0) em(15) em(0) em(0);
	@media (max-width: 701px) {
		float: none;
		margin: auto;
	}
}
.overview {
	min-width: em(245);
	margin: em(15);
	text-align: left;
	display: flow-root;
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
	margin-top: em(30);
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
			margin-right: em(4);
			height: 22px;
			display: flex;
			// white-space: nowrap;
		}
	}
}
.crew {
	clear: both;
}
.video-wraper {
	max-width: 960px;
	max-height: 565px;
	margin: em(50) auto;
	position: relative;
	overflow: hidden;
	padding-top: 44.18%;
	.video-player {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}
}
</style>
