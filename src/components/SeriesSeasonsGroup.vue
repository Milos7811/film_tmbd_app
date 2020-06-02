<template>
	<div class="season-wrapper">
		<h1 class="title">Série</h1>
		<ul class="season-list" v-if="this.result">
			<li
				class="season-item"
				v-for="season in result"
				v-bind:key="season.id"
				@click="season.show = true"
			>
				<h1 class="item-title">{{ season.name }}</h1>
				<img
					class="image"
					:src="
						`http://image.tmdb.org/t/p/w500/${season.poster_path}`
					"
					alt=""
				/>
				<article class="article">
					<p class="overview">{{ season.overview }}</p>
					<p class="episode-count">
						Počet epizód: {{ season.episode_count }}
					</p>
					<p>
						Dátum prvého vydania:
						{{ firstAirDate(season.air_date) }}
					</p>
					<p>{{ season.show }}</p>
				</article>
				<series-episode
					v-if="season.show"
					:seasion="season.season_number"
				/>
			</li>
		</ul>
	</div>
</template>

<script>
import SeriesEpisode from '../components/SeriesEpisode'
import moment from 'moment'
export default {
	components: { SeriesEpisode },
	props: ['result'],
	data() {
		return {
			show: false
		}
	},
	// watch: {
	// 	result() {
	// 		this.filterSeasons()
	// 	}
	// },

	methods: {
		firstAirDate(date) {
			return moment(date).format('DD MMM YYYY')
		}
		// filterSeasons() {
		// 	let filteredItem = []
		// 	this.result.seasons.forEach(item => {
		// 		if (item.season_number > 0) {
		// 			Object.assign(item, { show: false })
		// 			filteredItem.push(item)
		// 			// this.filterItems.push(item)
		// 		}
		// 	})
		// 	// return filteredItem
		// 	this.filterItems = filteredItem
		// }
		// toogle(season) {
		// 	// console.log(season)
		// 	this.filterItems.forEach(item => {
		// 		if (item.id == season && item.show == false) {
		// 			item.show = true
		// 			console.log(item.show)
		// 		} else if (item.id == season && item.show == true) {
		// 			item.show = false
		// 			console.log(item.show)
		// 		}
		// 	})
		// }
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';

.season-wrapper {
	margin-top: em(30);
}
.season-list {
	list-style: none;
}
.season-item {
	height: em(240);
	display: flex;
	border: 1px solid $primary-text;
	margin-top: em(20);
	padding: em(5);
	cursor: pointer;
	&:hover {
		border: 1px solid darken($primary-text, 30%);
	}
	.item-title {
		display: flex;
		align-items: center;
		margin: em(30);
		white-space: nowrap;
	}
	.image {
		width: em(100);
		max-height: em(154);
		display: flex;
		align-items: center;
		float: left;
		margin: auto em(10);
	}
	article {
		text-align: left;
		padding: em(5);
	}
}
</style>