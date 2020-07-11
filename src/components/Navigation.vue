<template>
	<nav id="nav" class="navigation">
		<div class="nav-content ">
			<div @click="goToHome()" class="nav-logo border-animate">
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
				<router-link class="route" to="/about">O mne</router-link>
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
	animation: borderanimation;
	.logo-text {
		display: inline-flex;
		p {
			// font-size: em(30, 25);
			color: $navbar;
			margin: 0px;
		}
	}
	@media (max-width: 1100px) {
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
	@media (max-width: 1100px) {
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

	margin: auto;
	a {
		text-decoration: none;
		font-size: em(20);
		color: $primary-text;
		&:last-child {
			margin-right: 0px;
			@media (max-width: 396px) {
				margin: em(4) auto;
			}
		}
		@media (min-width: 502px) {
			margin-right: em(40, 20) !important;
		}
		@media (max-width: 502px) and (min-width: 442px) {
			margin-right: em(20, 20) !important;
		}
		@media (max-width: 442px) and (min-width: 397px) {
			margin-right: em(5, 20) !important;
		}
		@media (max-width: 396px) {
			margin: em(4) auto;
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
	@media (max-width: 396px) {
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
	@media (max-width: 1100px) {
		& {
			margin-bottom: em(10);
		}
	}
}
.route {
	padding: em(5);
	border-radius: em(2);
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
	@media (max-width: 396px) {
		& {
			// margin: 0px auto 5px;
			// margin-bottom: em(5);
		}
	}
}

.border-animate:before {
	position: absolute;
	content: '';
	height: 0;
	width: 0;
	left: 0;
	top: 0;
	border: 2px solid transparent;
}
.border-animate:after {
	position: absolute;
	content: '';
	height: 0;
	width: 0;
	right: 0;
	bottom: 0;
	border: 2px solid transparent;
}
.border-animate:hover:before,
:focus:before {
	height: 40px;
	width: 200px;
	border: 2px solid $primary-text;
	border-right: none;
	border-bottom: none;
	transition: height 0.5s linear, width 0.5s linear 0.5s;
}
.border-animate:hover:after,
:focus:after {
	height: 40px;
	width: 200px;
	border: 2px solid $primary-text;
	border-left: none;
	border-top: none;
	transition: height 0.5s linear, width 0.5s linear 0.5s;
}
</style>
