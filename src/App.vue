<template>
	<v-app id="app" dark v-cloak>
		<v-icon
			size="30"
			v-show="!sideBar"
			class="icon-list"
			@click="sideBar = true"
			>{{ iconList }}</v-icon
		>
		<side-navbar v-show="sideBar" />
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
			<flash-message v-if="!this.loader" />
		</v-container>
		<footer-component />
	</v-app>
</template>

<script>
import FooterComponent from './components/FooterComponent'
import Navigation from './components/Navigation'
import FlashMessage from './components/FlashMessage'
import SideNavbar from './components/SideNavbar'
import { mdiViewList } from '@mdi/js'

// import FastMoviePreview from './components/FastMoviePreview'

export default {
	name: 'App',
	data() {
		return {
			loader: true,
			sideBar: false,
			iconList: mdiViewList
		}
	},
	components: {
		Navigation,
		// FastMoviePreview,
		FlashMessage,
		FooterComponent,
		SideNavbar
	},

	created() {
		setTimeout(() => {
			this.loader = false
		}, 2000)
	},
	mounted() {
		this.$root.$on('navBarStatus', data => {
			this.sideBar = data
		})
	}
}
</script>

<style lang="scss" scoped>
@import './scss/app.scss';

.icon-list {
	color: $primary-text;
	position: fixed;

	z-index: 30;
	top: 30px;
	right: 10px;
	border: 1px solid $primary;
	background-color: $primary;
	border-radius: 50px;
	@media (min-width: 443px) {
		display: none;
	}
}

.navigation {
	width: 100% !important;

	z-index: 20;
}
.router-view {
	margin-top: em(30) !important;
	min-height: 88%;
	@media (max-width: 1101px) {
		margin-top: em(58) !important;
	}
}

#app {
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
