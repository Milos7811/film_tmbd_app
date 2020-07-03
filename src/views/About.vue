<template>
	<div class="container">
		<article class="wrapper">
			<p class="text">
				Táto stránka bola vytvorená za účelom vytvoriť svoj vlastný
				projekt kde si budem môcť rozširovať svoje znalosti a skúsenosti
				ohľadom programovania webových stránok . V prípade zistenia
				nejakých nedostatkov na stránke alebo bugov ma prosím
				kontaktujte.
			</p>
			<hr />
			<div class="technologies">
				<h1>
					Použité technológie
				</h1>
				<div class="tech-wrapper">
					<p>Vue</p>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://vuejs.org/"
					>
						<v-icon class="vue-icon scale" alt="Vue" size="35">
							{{ mdiVue }}
						</v-icon></a
					>
				</div>
				<div class="tech-wrapper">
					<p>
						Vuetify
					</p>
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://vuetifyjs.com "
					>
						<v-icon
							class="vuetify-icon scale"
							alt="Vuetify"
							size="35"
						>
							{{ mdiVuetify }}
						</v-icon></a
					>
				</div>
			</div>
			<hr />
			<h1>
				Použitá databáza
			</h1>
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://www.themoviedb.org/"
			>
				<img
					class="tmdb-icon scale"
					src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
					alt=""
			/></a>
			<hr />

			<div class="contact">
				<h1>Kontakt</h1>

				<p>
					E-mail:
					<a class="email" href="mailto: milosholba78@gmail.com"
						>milosholba78@gmail.com</a
					>
				</p>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://github.com/Milos7811"
				>
					<v-icon class="github-icon scale" size="35">{{
						mdiGithub
					}}</v-icon></a
				>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.linkedin.com/in/milo%C5%A1-holba-565a7b198/"
				>
					<v-icon class="linkedin-icon scale" size="35">{{
						mdiLinkedin
					}}</v-icon>
				</a>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.facebook.com/milos.holba/"
				>
					<v-icon class="facebook-icon scale" size="35">{{
						mdiFacebook
					}}</v-icon>
				</a>
			</div>
		</article>
	</div>
</template>
<script>
import { mdiVuejs } from '@mdi/js'
import { mdiVuetify } from '@mdi/js'
import { mdiGithub } from '@mdi/js'
import { mdiLinkedin } from '@mdi/js'
import { mdiFacebook } from '@mdi/js'

export default {
	data() {
		return {
			openOnHover: true,
			mdiVue: mdiVuejs,
			mdiVuetify: mdiVuetify,
			mdiGithub: mdiGithub,
			mdiLinkedin: mdiLinkedin,
			mdiFacebook: mdiFacebook
		}
	},
	watch: {
		isActive(newValue, oldValue) {
			console.log(this.isActive)
		}
	}
}
</script>
<style lang="scss" scoped>
@import '../scss/app.scss';
.scale:hover,
:focus {
	transition: all 0.2s ease-in;
	transform: scale(1.5);
}

.email {
	color: $primary-text;
}

.tech-wrapper {
	display: flex;
	margin: em(5) 0px;
}
.contact {
	margin-top: em(30);
	a {
		margin: em(10);
		&:hover,
		:focus {
			transform: scale(1.5);
		}
	}
	v-icon:hover,
	:focus {
		transform: scale(1.5);
	}
}
.facebook-icon {
	color: #0676e8 !important;
}
.linkedin-icon {
	color: #0077b5 !important;
}
.github-icon {
	width: em(30);
	color: $primary-text !important;
}

.wrapper {
	max-width: em(500);
	margin: auto;
	text-align: left;
	p {
		margin: em(10) 0px;
	}
}
// .technologies {
// 	margin: em(10) 0px;
// }
.tmdb-icon {
	width: 50px;
	margin: em(20) 0px;
}
.vue-icon {
	color: #41b883 !important;
}
.vuetify-icon {
	color: #1696f5 !important;
}
.text {
	// max-width: 50%;
}
</style>
