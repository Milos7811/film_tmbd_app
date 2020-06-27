<template>
	<v-app id="app" dark v-cloak>
		<navigation class="navigation" />
		<v-container class="router-view">
			<v-overlay z-index="10" opacity="1" v-show="loader">
				<v-progress-circular
					indeterminate
					size="64"
					color="rgb(155, 46, 46)"
				></v-progress-circular>
			</v-overlay>
			<transition name="fade" mode="out-in">
				<router-view class="router-view " />
			</transition>
			<!-- <fast-movie-preview /> -->
		</v-container>
		<footer-component />
	</v-app>
</template>

<script>
import FooterComponent from './components/FooterComponent'
import Navigation from './components/Navigation'
// import FastMoviePreview from './components/FastMoviePreview'

export default {
	name: 'App',
	data() {
		return {
			loader: true
		}
	},
	components: {
		Navigation,
		// FastMoviePreview,
		FooterComponent
	},

	created() {
		setTimeout(() => {
			this.loader = false
		}, 2000)
	}
}
</script>

<style lang="scss" scoped>
@import './scss/app.scss';
.navigation {
	position: fixed;
	z-index: 20;
}
.router-view {
	margin-top: em(60) !important;

	@media (max-width: 390px) {
		margin-top: em(120) !important;
	}
	// position: relative;
}

#app {
	width: 100%;
	// height: 100%;
	font-family: 'Open Sans', sans-serif;

	// font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
}
[v-cloak] {
	display: none;
}
[v-cloak]::before {
	content: 'loading...';
}
.fade-enter {
	transform: translateX(10px);
	opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.2s ease;
}

.fade-leave-to {
	transform: translateX(-10px);
	opacity: 0;
}
</style>
