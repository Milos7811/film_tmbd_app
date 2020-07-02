<template>
	<nav id="nav" class="navigation">
		<div class="nav-content ">
			<div @click="goToHome()" class="nav-logo">
				<div class="logo-text">
					<p>M</p>
					oje-
					<p>F</p>
					ilmy
				</div>
			</div>
			<div class="links">
				<router-link class="route" to="/">Domov</router-link>
				<router-link class="route" to="/search"
					>Vyhľadávanie</router-link
				>
				<router-link class="route" to="/about">O nás</router-link>
			</div>
		</div>
	</nav>
</template>

<script>
import { mdiMagnify } from '@mdi/js'
export default {
	data() {
		return {
			query: '',
			showSearch: false,
			iconMagnify: mdiMagnify,
			openOnHover: true
		}
	},
	watch: {
		query(value) {
			this.$root.$emit('send-query-for-search', value)
		}
	},
	methods: {
		toogleSearch() {
			this.showSearch = !this.showSearch
		},
		goToHome() {
			if (this.$route.path != '/') {
				this.$router.push({ path: '/' })
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';

.nav-logo {
	font-size: em(25);
	height: em(40, 25);
	width: em(200, 25);
	justify-content: center;
	position: absolute;
	display: flex;
	cursor: pointer;
	margin-left: em(30);
	white-space: nowrap;
	background-color: $primary;
	border-radius: em(20, 25);
	.logo-text {
		display: inline-flex;
		p {
			// font-size: em(30, 25);
			color: $navbar;
			margin: 0px;
		}
	}
	@media (max-width: 950px) {
		& {
			position: relative;
			margin: auto;
			margin-bottom: em(10);
		}
	}
}
.nav-content {
	display: flex;
	margin: em(15) 0px;
	@media (max-width: 980px) {
		& {
			flex-direction: column;
			margin: em(10) 0px;
		}
	}
}
.navigation {
	position: absolute;
	background-color: $navbar;
	width: 100% !important;
	min-height: 60px;
	color: white;
	padding: 0px em(50);
	// margin-bottom: em(10);
	margin: auto;
	a {
		text-decoration: none;
		font-size: em(20);
		color: $primary-text;
		@media (min-width: 456px) {
			margin-right: em(40, 20);
		}
		&:last-child {
			margin-right: 0px;
			@media (max-width: 455px) {
				margin: auto;
			}
		}
	}
	.router-link-exact-active {
		color: $secondery-text;
	}
}
.links {
	margin-top: em(10, 20);
	margin: auto;
	color: $primary-text;
	background: transparent;
	@media (max-width: 455px) {
		& {
			display: flex;
			flex-direction: column;
		}
	}
	@media (max-width: 355px) {
		& > * {
			display: inline-block;
		}
	}
	@media (max-width: 950px) {
		& {
			margin-bottom: em(10);
		}
	}
}
.route {
	padding: em(5);
	border-radius: em(10);
	transition: all 0.2s ease-in;
	box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
		0px 8px 10px 1px rgba(0, 0, 0, 0.14),
		0px 3px 14px 2px rgba(0, 0, 0, 0.12) !important;
	&:hover,
	:focus {
		box-shadow: 0px 8px 8px -3px rgba(0, 0, 0, 0.6),
			0px 10px 16px 1px rgba(0, 0, 0, 0.18),
			0px 4px 20px 3px rgba(0, 0, 0, 0.2) !important;
	}
	@media (max-width: 455px) {
		& {
			margin: 0px auto 5px;
			// margin-bottom: em(5);
		}
	}
}
</style>
