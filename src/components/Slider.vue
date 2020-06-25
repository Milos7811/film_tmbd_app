<template>
	<div>
		<v-lazy
			v-model="isActive"
			:options="{
				threshold: 0.5
			}"
			min-height="200"
			transition="fade-transition"
		>
			<v-sheet class="mx-auto sheet " elevation="8" dark max-width="1240">
				<v-slide-group
					mobile-break-point="560"
					class="slider-group"
					aria-hidden="false"
				>
					<v-slide-item
						v-for="result in results"
						:key="result.id"
						v-slot:default="{}"
					>
						<div
							@click="
								goToUrl(result.title, result.id), stopHovering()
							"
						>
							<v-card
								dark
								class="ma-3 card"
								height="150"
								width="100"
								v-on:mouseover="showHovered(result.id)"
								v-on:mouseout="stopHovering"
							>
								<v-skeleton-loader
									v-if="skeleton"
									ref="skeleton"
									type="image"
									class=" ma-5 card"
									width="100"
									height="150"
								></v-skeleton-loader>
								<img
									v-if="result.poster_path && !skeleton"
									class="image"
									v-bind:src="
										'https://image.tmdb.org/t/p/w500/' +
											result.poster_path
									"
									ref="cardMouseOver"
								/>
								<div
									v-else-if="!result.poster_path && !skeleton"
									class="empty-image"
								>
									<p class="text">Neobsahuje</p>
									<p>obrázok</p>
								</div>
								<!-- <img
								v-if="!result.poster_path"
								class="image"
								src="../assets/empty_image.png"
								alt=""
							/> -->
								<average-vote
									class="vote-average"
									:voteAverage="result.vote_average"
								></average-vote>
							</v-card>
						</div>
					</v-slide-item>
				</v-slide-group>
			</v-sheet>
		</v-lazy>
	</div>
</template>

<script>
import { trim, deburr, debounce } from 'lodash'
import Mixins from '../mixins/Mixins.js'
import AverageVote from './AverageVote.vue'
export default {
	mixins: [Mixins],
	props: ['results'],
	components: { AverageVote },

	data() {
		return {
			showArrow: false,
			skeleton: true,
			isActive: false
		}
	},
	watch: {
		hovering() {
			this.sendId
		}
	},
	created() {
		setTimeout(() => {
			this.skeleton = false
		}, 1500)
	}
}
</script>
<style lang="scss" scoped>
@import '../scss/app.scss';
// .card {
// 	margin: em(3);
// }
.empty-image {
	width: 100%;
	height: em(150);
	background-color: $navbar;
	display: flex;
	flex-direction: column;
	justify-content: center;
	&:hover {
		transition: all 0.2s;
		transform: scale(1.1);
	}

	align-items: center;
	p {
		display: flex;
	}
}
.sheet {
	display: flex;
}
.slider-group {
	padding: 0px;
}
v-item-group {
	height: 150px;
}
.image {
	width: 100%;
	height: 150px;
	&:hover,
	:focus {
		transition: all 0.2s;
		transform: scale(1.1);
	}
}
.v-icon {
	color: black;
	font-size: 40px;
}
.theme--dark.v-sheet {
	background-color: $primary;
}

// @media (max-width: 600px) {
// 	.card {
// 		width: 70px !important;
// 		height: 100px !important;
// 		margin: 3px !important;
// 	}
// }
</style>
