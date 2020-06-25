<template>
	<nav id="nav" class="navigation">
		<div class="container nav-content ">
			<div class="nav-logo">
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
					>Vyhladavanie</router-link
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
	margin-left: em(30);
	white-space: nowrap;
	background-color: $primary;
	border-radius: em(20, 25);
	.logo-text {
		display: inline-flex;
		p {
			color: $navbar;
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
	margin: em(0) auto !important ;
	@media (max-width: 950px) {
		& {
			flex-direction: column;
		}
	}
}
nav {
	// position: relative;
	background-color: $navbar;
	width: 100%;
	min-height: 60px;
	color: white;
	margin-bottom: em(10);
	position: relative;
	a {
		text-decoration: none;
		font-size: em(20);
		margin-right: em(40, 20);
		color: $primary-text;
		&:last-child {
			margin-right: 0px;
			@media (max-width: 390px) {
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
	float: left;
	margin: auto;
	color: $primary-text;
	background: transparent;
	@media (max-width: 390px) {
		& {
			display: flex;
			flex-direction: column;
			& > * {
				margin-bottom: em(4);
			}
		}
	}
	@media (max-width: 355px) {
		& > * {
			display: inline-block;
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
	@media (max-width: 390px) {
		& {
			margin: auto;
			margin-bottom: em(5);
		}
	}
}
.search-bar {
	width: 35%;
	margin-bottom: em(20);
	float: right;

	.search-input {
		width: 90%;
		background-color: white;
		border-radius: em(20);
		outline: none;
		padding: em(8);
		color: black;
		transition: all 0.5 ease-in;
	}
	.magnify-icon {
		font-size: em(35);
		float: right;
		color: white;
		cursor: pointer;
	}

	.fade-enter-active {
		transition: all 0.3s ease-in;
	}
	.fade-leave-active {
		transition: all 0.3s ease-out;
	}
	.fade-enter {
		transform-origin: right;
		transform: scaleX(0);
		opacity: 0;
	}
	.fade-leave-to {
		opacity: 0;
	}
}
</style>
