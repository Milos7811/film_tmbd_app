<template>
	<div>
		<v-progress-circular
			v-if="!this.results"
			:size="50"
			color="primary"
			indeterminate
		></v-progress-circular>
		<v-sheet class="mx-auto " elevation="12" dark v-if="this.results">
			<v-slide-group
				class="slider-group"
				center-active
				mobile-break-point="560"
				aria-hidden="false"
			>
				<v-slide-item
					v-for="(result, i) in results.cast"
					:key="i"
					v-slot:default="{}"
				>
					<v-card
						dark
						class="ma-3 card"
						height="250"
						width="100"
						@click="goToUrlPerson(result.name, result.id)"
					>
						<img
							v-if="result.profile_path"
							class="image"
							v-bind:src="
								'http://image.tmdb.org/t/p/w500/' +
									result.profile_path
							"
							ref="cardMouseOver"
						/>
						<img
							v-else
							src="../assets/default_avatar.jpg"
							class="image"
						/>
						<h5 class="real-name">
							{{ shorten(result.name) }}
						</h5>

						<p class="character-name">
							{{ shorten(result.character) }}
						</p>
					</v-card>
				</v-slide-item>
			</v-slide-group>
		</v-sheet>
	</div>
</template>

<script>
import Mixins from '../mixins/Mixins'
export default {
	props: ['results'],
	mixins: [Mixins],
	methods: {
		// goToUrlPerson(name, id) {
		// 	let slug = _.trim(
		// 		_.deburr(name.toLowerCase()) // diacrnpm uitics
		// 			.replace(/[^\w\s]/gi, '') // special characters
		// 			.replace(/ {2,}/g, ' ') // repeating spaces
		// 			.replace(/ /g, '-'), // space to -
		// 		'-' // trailing -
		// 	)
		// 	this.$router.push({ path: '/person/' + slug, query: { id } })
		// }
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';

.card {
	overflow: hidden;
}
.real-name {
	font-size: em(15);
}

.character-name {
	font-size: em(14);
	// white-space: nowrap;
}
.image {
	width: 100px;
	height: 150px;
	&:hover {
		transition: all 0.2s;
		transform: scale(1.1);
	}
}
</style>