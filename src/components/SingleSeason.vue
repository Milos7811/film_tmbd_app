<template>
	<v-lazy
		v-model="isActive"
		:options="{
			threshold: 0.5
		}"
		min-height="200"
		transition="slide-x-transition"
	>
		<div class="season-wrapper">
			<ul class="season-list" v-if="this.result">
				<li
					:class="{ colaps: this.activeSeason }"
					class="full-wrapper"
					@click="activeSeason = !activeSeason"
				>
					<div class="season-item">
						<h1 class="item-title">{{ this.result.name }}</h1>
						<v-skeleton-loader
							v-show="skeleton"
							ref="skeleton"
							type="image"
							class="my-auto"
							width="100"
							height="150"
						></v-skeleton-loader>
						<img
							v-if="this.result.poster_path"
							class="image"
							:src="
								`http://image.tmdb.org/t/p/w500/${this.result.poster_path}`
							"
							alt=""
						/>
						<article class="article">
							<p class="overview">{{ this.result.overview }}</p>
							<p class="episode-count">
								Počet epizód: {{ this.result.episodes.length }}
							</p>
							<p>
								Dátum prvého vydania:
								{{ firstAirDate(this.result.air_date) }}
							</p>
							<p>{{ this.result.show }}</p>
						</article>
					</div>
					<div class="container">
						<transition name="episode" mode="in-out">
							<series-episode
								v-show="activeSeason"
								class="series-episopde"
								:season="this.result.season_number"
							/>
						</transition>
					</div>
				</li>
			</ul>
		</div>
	</v-lazy>
</template>

<script>
import Mixins from '../mixins/Mixins'
import SeriesEpisode from '../components/SeriesEpisode'
import moment from 'moment'
export default {
	mixins: [Mixins],
	components: { SeriesEpisode },
	props: ['season'],
	data() {
		return {
			isActive: false,
			activeSeason: false,
			collapsed: false,
			language: 'sk-SK',
			result: '',
			skeleton: true
		}
	},
	watch: {
		isActive(newValue, oldValue) {
			console.log(this.isActive)
		}
	},
	mounted() {
		this.getResult()
	},

	methods: {
		firstAirDate(date) {
			return moment(date).format('DD MMM YYYY')
		},
		activeSeasonsToogle(id) {
			if (this.activeSeasons == id) {
				this.activeSeasons = null
			} else {
				this.activeSeasons = id
			}
		},
		async getResult() {
			try {
				const response = await this.$axios
					.get(
						`https://api.themoviedb.org/3/tv/${this.$route.query.id}/season/${this.season}?api_key=${this.$apiKey}&language=${this.language}`
					)
					.then(response => {
						if (
							!response.data.overview &&
							this.language == 'sk-SK'
						) {
							this.language = 'en-US'
							this.getResult()
						}
						this.result = response.data
					})
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';

.container {
	// height: auto;
	padding: 0px;
	overflow: hidden;
	max-height: 10000px;
}
.full-wrapper {
	max-height: 300px;
	transition: all 0.9s linear;
	border: 1px solid $navbar;
	border-radius: em(10);
	margin-top: em(20);
	padding: em(5);
	cursor: pointer;

	&:hover {
		border: 1px solid darken($navbar, 20%);
	}
}
.colaps {
	max-height: 10000px !important;
}

.overview {
	margin-top: em(20);
	height: em(130);
	overflow: auto;
}
.season-wrapper {
	margin: em(30) em(0);
}
.season-list {
	list-style: none;
}
.season-item {
	height: em(240);
	display: flex;
	// border: 1px solid $primary-text;

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

.episode-enter-active,
.episode-leave-active {
	transition: all 1s linear;
	// position: relative;
}
.episode-enter,
.episode-leave-to {
	transform: translateY(-100%);
	opacity: 0;
}
.episode-leave .episode-enter-to {
	transform: translateY(100%);
	opacity: 1;
}
</style>
