<template>
	<div>
		<h1 class="name">{{ this.result.name }}</h1>
		<!-- <div class="image-wrapper"> -->
		<v-img
			max-width="300"
			class="profile-image"
			v-if="this.result.profile_path"
			:src="`http://image.tmdb.org/t/p/w500/${this.result.profile_path} `"
		/>
		<v-img
			max-width="300"
			v-else
			src="../assets/default_avatar.jpg"
			alt=""
		/>
		<person-social-sites class="social-sites" :personId="this.result.id" />
		<person-information :result="this.result" />
		<!-- </div> -->
		<article v-if="this.result.biography" class="biography">
			<h2 class="biography-title">Biografia</h2>
			<p class="biography-text">{{ this.result.biography }}</p>
		</article>
		<div v-if="this.movieCredit" class="movieCredit">
			<h1 class="movieCredit-title">Známy/-a vďaka</h1>
			<slider class="movieCredit-slider" :results="this.movieCredit" />
			<person-playing-in :movieRoles="this.movieRoles" />
		</div>
	</div>
</template>

<script>
import PersonPlayingIn from '../components/PersonPlayingIn'
import PersonSocialSites from '../components/PersonSocialSites'
import Slider from './Slider'
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
			await this.$axios
				.get(
					`https://api.themoviedb.org/3/person/${this.result.id}/movie_credits?api_key=810893a24970b82571f7a24c2decfab4&language=en-US`
				)
				.then(response => {
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
				})
				.catch(error => {
					console.log(error)
				})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
.social-sites {
	clear: both;
	float: left;
	margin-right: em(15);
}

.movieCredit {
	margin: em(15);
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
	text-align: left;
	.biography-title {
		font-size: em(20);
		margin: em(15);
	}
}
.name {
	font-size: em(30);
	margin: em(15);
}
// .image-wrapper {
// 	max-width: em(300);
// 	max-height: auto;
// position: relative !important;
.profile-image {
	float: left;
	margin: em(0) em(15) em(30) em(0);
	// margin: auto;
	max-width: 100%;
	max-height: 100%;
	// }
}
</style>
