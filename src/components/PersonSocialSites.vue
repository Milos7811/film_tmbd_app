<template>
	<div class="main-wrapper">
		<div
			class="wrapper"
			v-if="
				this.result.facebook_id ||
					this.result.twitter_id ||
					this.result.instagram_id
			"
		>
			<a
				v-if="this.result.facebook_id"
				:href="'https://www.facebook.com/' + this.result.facebook_id"
			>
				<v-icon class="icon" size="35">{{ iconFacebook }}</v-icon>
			</a>
			<a
				v-if="this.result.instagram_id"
				:href="'https://www.instagram.com/' + this.result.instagram_id"
			>
				<v-icon class="icon" size="35">{{ iconInstagram }}</v-icon>
			</a>
			<a
				v-if="this.result.twitter_id"
				:href="'https://www.twitter.com/' + this.result.twitter_id"
			>
				<v-icon class="icon" size="35">{{ iconTwitter }}</v-icon>
			</a>
		</div>
	</div>
</template>

<script>
import { mdiFacebook, mdiInstagram, mdiTwitter } from '@mdi/js'
export default {
	props: ['personId'],
	data() {
		return {
			iconFacebook: mdiFacebook,
			iconInstagram: mdiInstagram,
			iconTwitter: mdiTwitter,
			result: ''
		}
	},
	watch: {
		personId() {
			this.getResult()
		}
	},
	methods: {
		async getResult() {
			await this.$axios
				.get(
					`
https://api.themoviedb.org/3/person/${this.personId}/external_ids?api_key=810893a24970b82571f7a24c2decfab4&language=en-US`
				)
				.then(response => {
					this.result = response.data
				})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';

.main-wrapper {
	width: em(300);
}

.wrapper {
	border: 1px solid $primary-text;
	.icon {
		color: $primary-text !important;
		margin: em(5);
	}
	.icon:hover {
		color: darken($primary-text, 30%) !important;
	}
}
</style>
