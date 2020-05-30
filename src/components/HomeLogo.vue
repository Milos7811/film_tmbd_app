<template>
	<div class="wraper">
		<div class="image-wraper">
			<!-- <div class="color-layer"></div> -->
			<v-skeleton-loader
				v-if="!this.image"
				class="mx-auto image-skeleton"
				type="image"
			></v-skeleton-loader>
			<img
				v-if="this.image"
				class="image"
				:src="`http://image.tmdb.org/t/p/original/${this.image} `"
				alt=""
			/>
		</div>
		<div class="search-bar">
			<!-- <transition name="fade"> -->
			<input
				class="search-input"
				v-model="query"
				type="text"
				placeholder="Fast search"
				@keydown.esc="query = ''"
			/>
			<!-- </transition> -->
			<v-icon @click="toogleSearch" class="magnify-icon" right>{{
				iconClose
			}}</v-icon>
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
			// showSearch: false,
			iconClose: mdiClose
		}
	},
	mounted() {
		this.getResult()
	},
	watch: {
		query(value) {
			this.$root.$emit('send-query-for-search', value)
		}
	},
	methods: {
		async getResult() {
			await this.$axios
				.get(
					`https://api.themoviedb.org/3/trending/movie/week?api_key=810893a24970b82571f7a24c2decfab4`
				)
				.then(response => {
					this.image = response.data.results[0].backdrop_path
					this.result = response.data
				})
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
	width: 90%;
	height: em(350);
	margin: auto;
}
.image-wraper {
	overflow: hidden;
	width: 100%;
	height: 80%;
	margin: auto;
	.color-layer {
		width: 70%;
		position: relative;
		height: 100%;
		background-color: #3e2ea8;
		z-index: 10;
		opacity: 0;
		margin: auto;
	}
	.image {
		width: 70%;
		margin: auto;
		position: relative;
	}
	.image-skeleton {
		width: 70%;
		height: em(300) !important;
	}
}
.search-bar {
	max-width: 45%;
	min-width: em(260);
	// margin-bottom: em(20);
	margin: em(10) auto;
	// float: right;
	// opacity: 1;
	.search-input {
		// transform: scaleX(0);
		width: 80%;
		background-color: white;
		border-radius: em(20);
		outline: none;
		padding: em(8);
		color: black;
		transition: all 0.5 ease-in;
	}
	.magnify-icon {
		font-size: em(35);
		float: right;
		width: 10%;
		margin: em(5);

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