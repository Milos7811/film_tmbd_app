<template>
	<div>
		<h1 class="name">{{ this.result.name }}</h1>
		<div class="main-wrapper">
			<img
				max-width="300"
				class="profile-image"
				v-if="this.result.profile_path"
				:src="
					`https://image.tmdb.org/t/p/w500/${this.result.profile_path} `
				"
			/>
			<img
				class="profile-image"
				max-width="300"
				v-else
				src="../../assets/default_avatar.jpg"
				alt=""
			/>
			<person-social-sites
				class="social-sites"
				:personId="this.result.id"
			/>
			<person-information :result="this.result" />
			<!-- </div> -->
			<article v-if="this.result.biography" class="biography">
				<h2 class="biography-title">Biografia</h2>
				<p class="biography-text">{{ this.result.biography }}</p>
			</article>
			<div
				v-if="this.movieCredit && this.movieCredit.length > 0"
				class="movieCredit"
			>
				<h1 class="movieCredit-title">Známy/-a vďaka</h1>
				<slider
					class="movieCredit-slider"
					:results="this.movieCredit"
				/>
			</div>
			<person-playing-in :movieRoles="this.movieRoles" />
		</div>
	</div>
</template>

<script>
import PersonPlayingIn from './PersonPlayingIn'
import PersonSocialSites from './PersonSocialSites'
import Slider from '../Slider'
import PersonInformation from './PersonInformation'
import PersonPlayingInVue from './PersonPlayingIn.vue'
export default {
	props: ['result'],
	components: {
		Slider,
		PersonInformation,
		PersonSocialSites,
		PersonPlayingIn
	},
	data() {
		return {
			movieCredit: [],
			movieRoles: []
		}
	},
	watch: {
		result() {
			this.getResult()
		}
	},

	methods: {
		async getResult() {
			try {
				const response = await this.$axios.get(
					`https://api.themoviedb.org/3/person/${this.result.id}/movie_credits?api_key=${this.$apiKey}&language=en-US`
				)
				response.data.cast.forEach(item => {
					if (item.popularity > 10) {
						this.movieCredit.push(item)
					} else if (!this.movieCredit) {
						this.movieCredit = item
					}
				})
				response.data.cast.forEach(item => {
					if (item.release_date) {
						this.movieRoles.push(item)
					}
				})
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../scss/app.scss';

// .main-wrapper {
// 	// height: em(450);
// }
.social-sites {
	max-height: em(59);
	clear: both;
	float: left;
	margin-right: em(15);
	@media (max-width: 706px) {
		float: none;
		margin: auto;
	}
}

.movieCredit {
	margin: em(15);
	@media (max-width: 900px) {
		clear: both;
	}
	.movieCredit-title {
		font-size: em(20);
		text-align: left;
	}
	.movieCredit-slider {
		margin-top: em(10);
		display: contents;
	}
}
.biography {
	min-width: em(250);
	text-align: left;
	display: flow-root;

	.biography-title {
		font-size: em(20);
		margin: em(15);
	}
}
.name {
	font-size: em(30);
	margin: em(15);
}

.profile-image {
	max-width: em(350);
	max-height: em(450);
	float: left;
	margin: em(0) em(15) em(30) em(0);
	@media (max-width: 706px) {
		float: none;
		margin: auto;
	}
}
</style>
