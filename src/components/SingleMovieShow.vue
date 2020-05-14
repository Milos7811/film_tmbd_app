<template>
	<div v-cloak class="content">
		<h2 class="title-name">{{ this.result.title }}</h2>
		<img
			v-if="!this.fulllVideoPath"
			class="image"
			v-bind:src="this.fullImagePath"
		/>
		<iframe
			v-if="this.fulllVideoPath"
			class="video-player"
			frameborder="0"
			:src="this.fulllVideoPath"
		></iframe>
		<article class="genres">
			<div class="about">
				<p class="about-time">{{ result.runtime }} min.</p>
				<p class="dot">•</p>

				<p class="about-date">{{ result.release_date }}</p>
				<p class="dot">•</p>

				<p v-for="(genre, i) in result.genres" :key="i">
					{{ genre.name }} |
				</p>
			</div>
			<p class="vote-average">
				Hodnotenie:
				<average-vote
					v-show="result.id"
					class="vote-average-vote"
					:voteAverage="result.vote_average"
				/>
			</p>
		</article>
		<main>
			<img
				v-if="this.fulllVideoPath"
				class="side-image"
				v-bind:src="this.fullImagePath"
			/>
			<p class="overview">{{ result.overview }}</p>
		</main>

		<movie-crew class="movie-crew" :movieId="result.id" />
	</div>
</template>

<script>
import Mixins from '../mixins/Mixins.js'
import AverageVote from './AverageVote.vue'
import MovieCrew from './MovieCrew.vue'
export default {
	name: 'SingleMovieShow',
	mixins: [Mixins],
	components: { AverageVote, MovieCrew },
	data() {
		return {
			youtubeURL: 'https://www.youtube.com/embed/',
			video: '',
			fulllVideoPath: '',
			fullImagePath: '',
			result: '',
			language: 'sk',
			isActive: false
		}
	},
	watch: {
		// isActive(value) {
		// 	if (value) {
		// 		console.log(this.isActive)
		// 	}
		// }
	},
	created() {
		this.getResult()
	},
	methods: {
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
	height: 35%;
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
	.vote-average {
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

.video-player {
	width: 70%;
	height: 41%;
	margin: auto;
	display: block;
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
	width: 15%;
}
</style>
