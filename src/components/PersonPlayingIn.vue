<template>
	<div class="person-laying">
		<h1 class="main-title">Hral/-a</h1>
		<div class="wrapper">
			<ul>
				<li
					class="movie-info"
					v-for="movie in sortedMovies"
					:key="movie.id"
				>
					<div class="info-wrapper">
						<p class="info-date">
							{{ releaseDate(movie.release_date) }}
						</p>
						<span class="info-dot">•</span>
						<h2
							@click="goToUrl(movie.title, movie.id)"
							class="info-title"
						>
							{{ movie.title }}
						</h2>
						<span class="info-how"> ako </span>
						<p>{{ movie.character }}</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Mixins from '../mixins/Mixins'
import moment from 'moment'
import { orderBy } from 'lodash'
export default {
	props: ['movieRoles'],
	mixins: [Mixins],

	//
	computed: {
		sortedMovies() {
			return orderBy(this.movieRoles, ['release_date'], ['desc'])
		}
	},
	methods: {
		releaseDate(date) {
			return moment(date).format('YYYY / MMM / DD')
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
.person-laying {
	margin-top: em(30);
}
.main-title {
	text-align: left;
	font-size: em(20);
}
.wrapper {
	margin: em(10);
	display: flow-root;
	border: 1px solid $primary-text;
	padding: em(20);
}
.movie-info {
	list-style: none;
	text-align: left;
}
.info-wrapper {
	display: inline-flex;
	height: em(20);
	margin-bottom: em(15);
	.info-title:hover {
		border-bottom: 1px solid $primary-text;
	}
	.info-date {
		width: em(117);
		padding: em(3);
	}
	.info-dot {
		margin: em(0) em(6);
	}
	.info-how {
		margin: em(0) em(6);
		opacity: 0.4;
	}
}
</style>