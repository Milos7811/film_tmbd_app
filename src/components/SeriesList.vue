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
							'http://image.tmdb.org/t/p/w500/' +
								result.poster_path
						"
						width="150px"
					/>
					<img
						class="image-holder"
						v-else
						src="../assets/empty_image.png"
						alt=""
					/>
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
import AverageVote from '../components/AverageVote'
import Mixins from '../mixins/Mixins'
export default {
	props: ['results'],
	mixins: [Mixins],
	components: { AverageVote }
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
.image {
	height: em(225);
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
	}
}

.fast-title {
	// clear: both;
	@include clearfix;
}
</style>