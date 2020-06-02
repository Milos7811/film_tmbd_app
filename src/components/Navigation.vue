<template>
	<nav id="nav" class="navigation">
		<div class="container">
			<div class="links">
				<router-link to="/">Home</router-link>
				<router-link to="/about">About</router-link>
				<router-link to="/search">Search</router-link>
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
			iconMagnify: mdiMagnify
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

nav {
	background-color: $navbar;
	width: 100%;
	height: 60px;
	color: white;
	a {
		text-decoration: none;
		font-size: em(20);
		margin-right: em(40, 20);
		color: $primary-text;
		&:last-child {
			margin-right: 0px;
		}
	}
	.router-link-exact-active {
		color: $secondery-text;
	}
}
.links {
	margin-top: em(10, 20);
	float: left;
	margin: auto;
}
.search-bar {
	width: 35%;
	margin-bottom: em(20);
	float: right;
	// opacity: 1;
	.search-input {
		// transform: scaleX(0);
		width: 90%;
		background-color: white;
		border-radius: em(20);
		outline: none;
		padding: em(8);
		color: black;
		transition: all 0.5 ease-in;
		// display: inline-block;
		// position: relative;
	}
	.magnify-icon {
		font-size: em(35);
		float: right;
		// display: inline-block;
		// float: right;
		// position: relative;
		color: white;
		cursor: pointer;
	}
	// .fade-active .fade-leave-active {
	// 	transition: all 1s ease-in;
	// }
	// .fade-enter,
	// .fade-leave-to {
	// 	opacity: 0;
	// }
	// .fade-enter-to,
	// .fade-leave {
	// 	opacity: 1;
	// }
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
