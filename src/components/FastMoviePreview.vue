<template>
	<transition name="slide">
		<main
			v-on:mouseover="hoveringAtElement = true"
			v-on:mouseleave="hoveringAtElement = false"
			class="content"
			v-show="show"
		>
			<div
				class="close-preview"
				v-on:click=";(show = false), resetResults()"
			>
				<v-icon class="close-icon">mdi-close</v-icon>
			</div>

			<article class="genres">
				<p v-for="(genre, i) in result.genres" :key="i">
					{{ genre.name }} |
				</p>
			</article>

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

			<article :to="`/single`">
				<h2
					@click="goToUrl(result.title, result.id), (show = false)"
					class="title"
				>
					{{ this.result.title }}
				</h2>
				<p class="overview">{{ this.result.overview }}</p>
				<h3 class="average-text">
					Hodnotenie:
				</h3>
				<average-vote
					class="average-vote"
					:voteAverage="result.vote_average"
				/>
			</article>
		</main>
	</transition>
</template>

<script>
import Mixins from '../mixins/Mixins.js'
import AverageVote from './AverageVote.vue'

export default {
	mixins: [Mixins],
	components: { AverageVote },
	data() {
		return {
			show: false,
			hoveringAtElement: false,
			hoveredElementId: '',
			result: '',
			fulllVideoPath: '',
			fullImagePath: '',
			language: 'sk',
			youtubeURL: 'https://www.youtube.com/embed/'
		}
	},
	// beforeMount() {
	// 	this.resetResults()
	// },
	mounted() {
		this.$root.$on(
			'hovering-image-id',
			data => (this.hoveredElementId = data)
		)
	},
	watch: {
		hoveredElementId(oldValue, newValue) {
			if (this.hoveredElementId) {
				this.fulllVideoPath = ''
				this.getResult()
				this.show = true
			} else if (this.hoveringAtElement) {
				this.show = true
			} else if (!this.hoveredElementId) {
				this.show = false
				this.resetResults()
			}
		}
	},
	methods: {
		resetResults() {
			setTimeout(() => {
				;(this.result = ''),
					(this.fulllVideoPath = ''),
					(this.fullImagePath = '')
			}, 500)
		},
		getResult() {
			this.$axios
				.get(
					`https://api.themoviedb.org/3/movie/${this.hoveredElementId}?api_key=810893a24970b82571f7a24c2decfab4&language=${this.language}&append_to_response=videos`
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
.genres {
	margin-top: em(30);
	// float: left;
	p {
		display: inline-block;
		float: left;
	}
}
.image {
	width: 60%;
	margin: auto;
	display: block;
	clear: both;
}
.video-player {
	max-width: 100%;
	margin: auto;
	position: relative;
	// z-index: 10;
	display: block;
	clear: both;
}
.close-icon {
	color: $primary-text !important;
	margin: em(10) em(5);
}
.content {
	cursor: pointer;
	height: 100%;
	width: 25%;
	background-color: $primary;
	color: $primary-text;
	float: left;
	left: 0px;
	top: em(60);
	position: absolute;
	z-index: 2;
	padding: em(10);
	border-right: 1px solid $border-color;
}
.close-preview {
	float: right;
	cursor: pointer;
}
.title {
	margin-top: em(20);
	&:hover {
		color: darken($primary-text, 20%);
	}
}
.overview {
	margin-top: em(30);
	line-height: em(25);
}
.average-text {
	margin-top: em(30);
	display: inline-grid;
}
.average-vote {
	display: inline-grid;
}
.slide-enter-active,
.slide-leave-active {
	transition: all 0.5s;
}
.slide-enter {
	transform: translateX(-100%);
}
.slide-enter-to {
	//   transform: translateX(25%);
	transform: translateX(0px);
}
.slide-leave-to {
	//   transform: translatex(-400px);
	transform: translateX(-100%);
}
</style>
