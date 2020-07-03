<template>
	<div
		class="person-playing"
		v-if="this.movieRoles && this.movieRoles.length > 0"
	>
		<h1 class="main-title">Hral/-a</h1>
		<div class="wrapper">
			<ul class="list">
				<li
					class="info-wrapper"
					v-for="movie in sortedMovies"
					:key="movie.id"
				>
					<!-- <div class="info-wrapper"> -->
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
					<span v-if="movie.character" class="info-how"> ako </span>
					<p>{{ movie.character }}</p>
					<!-- </div> -->
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Mixins from '../../mixins/Mixins'
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
@import '../../scss/app.scss';
.person-playing {
	margin-top: em(30);
}
.main-title {
	text-align: center;
	font-size: em(20);
	margin-bottom: em(23);
}
.wrapper {
	margin: em(10);
	display: flow-root;
	border: 1px solid $primary-text;
	padding: em(20);
}

.info-wrapper {
	display: inline-flex;
	flex-wrap: wrap;
	text-align: left;
	line-height: em(20);
	margin-bottom: em(10);
	.info-title {
		cursor: pointer;
		display: inline-table;
		&:hover,
		:focus {
			border-bottom: 1px solid $primary-text;
		}
	}
	.info-date {
		width: em(117);
		padding: em(3);
		margin: 0px;
	}
	.info-dot {
		margin: em(0) em(6);
	}
	.info-how {
		margin: em(0) em(6);
		opacity: 0.4;
	}
}
.list {
	padding: 0px;
	display: flex;
	flex-direction: column;
}
</style>
