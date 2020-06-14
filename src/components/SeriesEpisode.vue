<template>
	<div class="wrapper">
		<ul>
			<div v-for="result in results.episodes" :key="result.id" tag="li">
				<single-episode
					:season_number="result.season_number"
					:episode_number="result.episode_number"
				/>
			</div>
		</ul>
	</div>
</template>

<script>
import SingleEpisode from '../components/SingleEpisode'
import moment from 'moment'
export default {
	components: { SingleEpisode },
	props: ['season', 'show'],
	data() {
		return {
			results: '',
			elevation: 5,
			language: 'sk-SK'
		}
	},
	mounted() {
		this.getResult()
	},
	watch: {
		elevation(newValue, oldValue) {
			console.log(this.elevation)
		}
	},
	methods: {
		async getResult() {
			try {
				const response = await this.$axios.get(
					`https://api.themoviedb.org/3/tv/${this.$route.query.id}/season/${this.season}?api_key=${this.$apiKey}&language=${this.language}`
				)
				this.results = response.data
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
.card {
	background-color: $primary !important;
	color: $primary-text;
	padding: em(10);
	box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
		0px 8px 10px 1px rgba(0, 0, 0, 0.14),
		0px 3px 14px 2px rgba(0, 0, 0, 0.12) !important;
	&:hover {
		box-shadow: 0px 8px 8px -3px rgba(0, 0, 0, 0.6),
			0px 10px 16px 1px rgba(0, 0, 0, 0.18),
			0px 4px 20px 3px rgba(0, 0, 0, 0.2) !important;
	}
}
.top-content {
	width: 100%;
	min-width: em(360);
	display: flex;
	justify-content: space-between;

	.info-group {
		display: flex;
		align-items: center;
	}
	.image {
		max-width: em(150);
	}

	.date {
		margin: 0px;
	}
}
.wrapper {
	width: 70%;
	margin: auto;
	overflow: hidden;
	ul {
		list-style: none;
		li {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: flex-start;
			align-items: center;
			align-content: center;
			margin: em(30) auto;
			// border-bottom: 1px solid $primary-text;
		}
	}
}

.name {
	margin: em(0) em(20);
}
.average {
	margin: em(0) em(20);
}
.episode-enter-active,
.episode-leave-active {
	transition: all 0.5s ease;
	overflow: hidden;
}
.episode-enter,
.episode-leave-to {
	transform: scaleY(0);
	opacity: 0;
}
// .episode-leave
.episode-enter-to {
	transform: scaleY(1);
	opacity: 1;
}
</style>
