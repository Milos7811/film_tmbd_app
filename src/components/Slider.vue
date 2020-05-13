<template>
	<div>
		<v-progress-circular
			v-if="!this.results"
			:size="50"
			color="primary"
			indeterminate
		></v-progress-circular>
		<v-sheet
			class="mx-auto "
			elevation="12"
			dark
			:max-width="this.windowWidth"
			v-if="this.results"
		>
			<v-slide-group class="pa-4" center-active dark>
				<v-slide-item
					v-for="result in results"
					:key="result.id"
					v-slot:default="{ active }"
				>
					<div
						@click="
							goToUrl(result.title, result.id), stopHovering()
						"
					>
						<v-card
							dark
							:color="active ? 'primary' : 'grey lighten-1'"
							class="ma-4"
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
							<v-row
								class="fill-height"
								align="center"
								justify="center"
							>
							</v-row>
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
// import ProgresCircle from "../components/ProgresCircle";
export default {
	mixins: [Mixins],
	props: ['results'],

	data() {
		return {
			showArrow: false,
			windowWidth: '',
			hovering: false,
			hoveredImageId: ''
		}
	},
	watch: {
		hovering() {
			this.sendId
		}
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
v-item-group {
	height: 150px;
}
.image {
	width: 100px;
	height: 150px;
	border: 1px solid $border-color;
	border-radius: em(10);
	&:hover {
		transform: scale(1.1);
		border: em(2) solid $border-color;
		border-radius: em(10);
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
