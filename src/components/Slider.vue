<template>
	<div>
		<!-- <v-progress-circular
			v-if="!this.results"
			:size="50"
			color="primary"
			indeterminate
		></v-progress-circular> -->
		<v-sheet
			class="mx-auto "
			elevation="12"
			dark
			:max-width="this.windowWidth"
		>
			<v-slide-group class="slider-group" center-active>
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
						<v-skeleton-loader
							v-show="skeleton"
							ref="skeleton"
							type="image"
							class=" ma-5"
							width="100"
							height="150"
						></v-skeleton-loader>
						<v-card
							v-show="!skeleton"
							dark
							class="ma-3"
							height="150"
							width="100"
							v-on:mouseover="showHovered(result.id)"
							v-on:mouseout="stopHovering"
						>
							<img
								class="image"
								v-bind:src="
									'http://image.tmdb.org/t/p/w500/' +
										result.poster_path
								"
								ref="cardMouseOver"
							/>
							<average-vote
								class="vote-average"
								:voteAverage="result.vote_average"
							></average-vote>
						</v-card>
					</div>
				</v-slide-item>
			</v-slide-group>
		</v-sheet>
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
			windowWidth: '',
			hovering: false,
			hoveredImageId: '',
			skeleton: true
		}
	},
	watch: {
		hovering() {
			this.sendId
		}
	},
	mounted() {
		setTimeout(() => {
			this.skeleton = false
		}, 2000)
	},

	methods: {
		showHovered(image) {
			this.timeout = setTimeout(() => {
				this.hovering = true
				this.hoveredImageId = image
				this.sendId()
			}, 2000)
		},
		stopHovering() {
			setTimeout(() => {
				this.hovering = false
				this.hoveredImageId = ''
				this.sendId()
			}, 500)
			clearTimeout(this.timeout)
		},
		sendId() {
			this.$root.$emit('hovering-image-id', this.hoveredImageId)
		}
	}
}
</script>
<style lang="scss" scoped>
@import '../scss/app.scss';
.vote-average {
	margin-top: em(-30);
}
.slider-group {
	padding: 0px;
}
v-item-group {
	height: 150px;
}
.image {
	width: 100px;
	height: 150px;
	&:hover {
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
</style>
