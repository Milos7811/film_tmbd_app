<template>
	<div class="wraper">
		<div class="image-wraper">
			<!-- <div class="color-layer"> -->
			<v-skeleton-loader
				v-if="this.skeleton"
				class="mx-auto image-skeleton"
				type="image"
				transition="scale-transition"
				height="450"
			></v-skeleton-loader>
			<img
				v-show="this.image && !this.skeleton"
				v-if="this.image"
				class="image"
				:src="`https://image.tmdb.org/t/p/original/${this.image} `"
				alt=""
			/>
			<!-- </div> -->
		</div>
		<div class="search-bar">
			<!-- <transition name="fade"> -->
			<input
				class="search-input"
				v-model="query"
				type="text"
				placeholder="Filmy, Seriály, Herci "
				@keydown.esc="query = ''"
			/>
			<!-- </transition> -->
			<v-icon
				v-if="this.query"
				@click="query = ''"
				class="magnify-icon"
				right
				>{{ iconClose }}</v-icon
			>
		</div>
	</div>
</template>

<script>
import { mdiClose } from '@mdi/js'

export default {
	data() {
		return {
			image: '',
			result: '',
			query: '',
			iconClose: mdiClose,
			skeleton: true
		}
	},
	created() {
		this.getResult()
	},
	mounted() {
		setTimeout(() => {
			this.skeleton = false
		}, 2000)
	},
	watch: {
		query(value) {
			this.$root.$emit('send-query-for-search', value)
		}
	},
	methods: {
		async getResult() {
			try {
				const response = await this.$axios
					.get(
						`https://api.themoviedb.org/3/trending/movie/week?api_key=${this.$apiKey}`
					)
					.then(response => {
						this.image = response.data.results[0].backdrop_path
						if (!this.image) {
							this.image = response.data.results[1].backdrop_path
						}
						this.result = response.data
					})
			} catch (error) {
				console.log(error)
			}
		},
		toogleSearch() {
			this.showSearch = !this.showSearch
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
.wraper {
	width: 100%;
	height: 33%;
	max-height: em(450);
	margin: auto;
	margin-top: em(-25);
}
.image-wraper {
	overflow: hidden;
	width: 100%;
	height: 100%;
	max-height: em(450);
	margin: auto;

	.image {
		width: 100%;
		margin: auto;
		position: relative;
	}
	.image-skeleton {
		width: 100% !important;
		height: 100% !important;
		// height: em(450) !important;
	}
}
.v-skeleton-loader__image {
	height: 450px !important;
}
.search-bar {
	max-width: 45%;
	min-width: em(260);
	margin: em(10) auto;
	margin-top: -50px;
	z-index: 5;
	position: relative;
	.search-input {
		// transform: scaleX(0);
		width: 80%;
		background-color: white;
		border-radius: em(20);
		outline: none;
		padding: em(8);
		color: black;
		border: 1px solid $primary;
		transition: all 0.5 ease-in;
	}
	.magnify-icon {
		font-size: em(35);
		float: right;
		margin: em(5);
		position: absolute;
		color: white;
		cursor: pointer;
	}

	.fade-enter-active {
		transition: all 0.3s ease-in;
	}
	.fade-leave-active {
		transition: all 0.3s ease-out;
	}
	.fade-enter {
		transform-origin: right;
		transform: scaleX(0);
		opacity: 0;
	}
	.fade-leave-to {
		opacity: 0;
	}
}
</style>
