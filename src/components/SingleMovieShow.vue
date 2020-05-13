<template>
	<div class="content">
		<h2 class="title">{{ this.result.title }}</h2>
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
			<p v-for="(genre, i) in result.genres" :key="i">
				{{ genre.name }} |
			</p>
			<p class="vote-average">Hodnotenie: {{ result.vote_average }}</p>
		</article>
		<main>
			<img
				v-if="this.fulllVideoPath"
				class="side-image"
				v-bind:src="this.fullImagePath"
			/>
			<p class="overview">{{ result.overview }}</p>
		</main>
	</div>
</template>

<script>
export default {
	name: 'SingleMovieShow',
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
		},
		getImage() {
			try {
				return (this.fullImagePath =
					'http://image.tmdb.org/t/p/w500/' + this.result.poster_path)
				console.log(this.result)
			} catch (error) {
				console.log(error)
			}
		},
		getVideo(videoPath) {
			try {
				return (this.fulllVideoPath =
					'https://www.youtube.com/embed/' +
					videoPath +
					'?autoplay=1&showinfo=0&enablejsapi=1&origin=http://localhost:9000')
			} catch (error) {
				console.log('Error v getVideo')
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';

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
		margin-top: em(80);
		line-height: em(30);
	}
}

h2 {
	.title {
		font-size: em(60) !important;
		margin: em(50, 40) em(0);
	}
}

.genres {
	margin-top: em(30);
	// float: left;
	p {
		display: inline-block;
		float: left;
	}
	.vote-average {
		font-size: em(30);
		float: right;
		line-height: em(15);
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
