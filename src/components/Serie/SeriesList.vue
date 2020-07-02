<template>
	<ul class="list">
		<a
			tag="li"
			:to="`/single`"
			v-for="result in results"
			:key="result.id"
			@click="goToUrlSeries(result.name, result.id)"
		>
			<v-card
				class="mx-auto card"
				max-width="150"
				height="300"
				v-on:mouseover="showHovered(result.id)"
				v-on:mouseout="stopHovering"
			>
				<div class="content">
					<img
						class="image"
						v-if="result.poster_path"
						v-bind:src="
							'https://image.tmdb.org/t/p/w500/' +
								result.poster_path
						"
						width="150px"
					/>
					<div v-else class="empty-image">
						<p class="text">Neobsahuje</p>
						<p>obrázok</p>
					</div>
					<average-vote
						class="vote-average"
						:voteAverage="result.vote_average"
					/>
					<p class="fast-title">
						{{ shorten(result.name) }}
					</p>
				</div>
			</v-card>
		</a>
	</ul>
</template>

<script>
import AverageVote from '../AverageVote'
import Mixins from '../../mixins/Mixins'
export default {
	props: ['results'],
	mixins: [Mixins],
	components: { AverageVote }
}
</script>

<style lang="scss" scoped>
@import '../../scss/app.scss';
.empty-image {
	width: em(150);
	height: em(225);
	background-color: $navbar;
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-bottom: 1px solid $primary;
	align-items: center;
	p {
		display: flex;
	}
	@media (max-width: 600px) {
		& {
			max-width: 100px !important;
			height: 200px !important;
			max-height: em(150);
		}
	}
}
.image {
	max-width: 100%;
}
.image-holder {
	width: em(150);
	height: em(225);
}
.search {
	display: block;
}
ul {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-start;
	align-content: space-between;
	border-bottom: 1px solid $primary;

	a {
		margin-top: em(15);
		margin-right: em(15);
		&:hover {
			transform: scale(1.05);
		}
	}
	.card {
		background-color: $navbar !important;
		color: $primary-text;
		@media (max-width: 600px) {
			& {
				max-width: 100px !important;
				height: 200px !important;
			}
		}
	}
}

.fast-title {
	@include clearfix;
	@media (max-width: 600px) {
		font-size: em(12) !important;
	}
	@media (max-width: 600px) {
		height: em(47);
		font-size: em(12) !important;
		overflow: hidden;
	}
}
</style>
