<template>
	<transition name="rerender" mode="out-in">
		<div v-cloak class="content">
			<h2 class="title-name">{{ this.result.title }}</h2>
			<!-- <div class="image" v-if="this.result.poster_path"> -->
			<img
				v-if="!this.fulllVideoPath && this.result.poster_path"
				class="image"
				v-bind:src="this.fullImagePath"
			/>
			<!-- </div>  -->
			<div class="video-wraper" v-if="this.fulllVideoPath">
				<iframe
					class="video-player"
					frameborder="0"
					:src="this.fulllVideoPath"
				></iframe>
			</div>
			<article class="genres">
				<div class="about">
					<p class="about-date" v-if="this.result.release_date">
						{{ releaseData }}
						<span class="dot">•</span>
					</p>

					<p class="about-time" v-if="this.result.runtime">
						{{ result.runtime }} min
						<span class="dot">•</span>
					</p>

					<p v-for="(genre, i) in result.genres" :key="i">
						{{ genre.name }} |
					</p>
				</div>
				<p class="vote-average-wrap">
					Hodnotenie:
					<average-vote
						v-show="result.id"
						class="vote-average-vote"
						:voteAverage="result.vote_average"
					/>
				</p>
			</article>
			<main class="overview-image">
				<img
					v-if="this.fulllVideoPath"
					class="side-image"
					v-bind:src="this.fullImagePath"
				/>
				<p class="overview">{{ result.overview }}</p>
			</main>

			<movie-crew class="movie-crew" :movieId="result.id" type="movie" />

			<movie-similar type="movie" :movieId="result.id" />
		</div>
	</transition>
</template>

<script>
import moment from 'moment'
import Mixins from '../mixins/Mixins.js'
import AverageVote from './AverageVote.vue'
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
		getResult() {
			this.$axios
				.get(
					`https://api.themoviedb.org/3/movie/${this.$route.query.id}?api_key=810893a24970b82571f7a24c2decfab4&language=${this.language}&append_to_response=videos`
				)

				.then(response => {
					if (!response.data.overview) {
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
				})
				.catch(error => {
					console.log('error v Axios', error)
				})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';

.movie-crew {
	margin-top: em(40);
}

main {
	margin-top: em(40);
	display: inline-flex;
	width: 100%;
	height: auto;
	.side-image {
		position: relative;
	}
	.overview {
		// @include clearfix;
		width: 50%;
		margin: auto;
		margin-top: em(0);
		line-height: em(30);
	}
}

.title-name {
	font-size: em(30) !important;
	margin: em(30, 30) em(0);
}

.genres {
	margin-top: em(30);
	.about {
		display: inline-flex;
		float: left;
		.dot {
			margin: 0 em(5);
		}
	}
	.vote-average-wrap {
		font-size: em(30);
		float: right;
		line-height: em(15);
		margin-right: em(10);
		.vote-average-vote {
			display: inline-grid;
			font-size: em(20, 30);
			transform: scale(1.5);
		}
	}
}
.video-wraper {
	max-width: 70%;
	height: 58%;
	margin: auto;
	.video-player {
		min-width: 100%;
		min-height: 100%;
		margin: auto;
		display: block;
	}
}
.content {
	width: 100%;
	height: 100%;
	display: block;
}
img {
	width: 20%;
}
.side-image {
	max-width: em(150);
	max-height: em(220);
}
.rerender-enter {
	transform: translateX(10px);
	opacity: 0;
}

.rerender-enter-active,
.rerender-leave-active {
	transition: all 0.2s ease;
}

.rerender-leave-to {
	transform: translateX(-10px);
	opacity: 0;
}
</style>
