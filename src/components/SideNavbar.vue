<template>
	<transition name="slide">
		<div class="wrapper">
			<div class="background"></div>
			<div class="router-wrapper">
				<v-icon @click="this.closeNav" class="close-icon">{{
					mdiClose
				}}</v-icon>
				<router-link @click="closeNav" class="route" to="/">
					<span @click="closeNav">Domov</span>
				</router-link>
				<router-link @click="closeNav" class="route" to="/search">
					<span @click="closeNav">Vyhľadávanie</span>
				</router-link>
				<router-link @click="closeNav" class="route" to="/about">
					<span @click="closeNav">O mne</span>
				</router-link>
			</div>
		</div>
	</transition>
</template>

<script>
import { mdiClose } from '@mdi/js'

export default {
	data() {
		return {
			mdiClose: mdiClose
		}
	},
	methods: {
		closeNav() {
			this.$root.$emit('navBarStatus', false)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
.wrapper {
	height: 100%;
	width: 100%;
	// background-color: $primary;
	// opacity: 0.7;
	position: fixed;
	z-index: 30;
}
.background {
	width: 100%;
	height: 100%;
	background-color: $primary;
	position: absolute;
	opacity: 0.95;
}
.router-wrapper {
	height: 100%;
	width: 100%;
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.route {
	font-size: em(20);
	opacity: 1;
	text-decoration: none;
	color: $primary-text;
	cursor: pointer;
}
.close-icon {
	position: absolute !important;
	color: $primary-text !important;
	background-color: $primary;
	border-radius: 50px;
	cursor: pointer;
	top: 30px;
	right: 30px;
}
.slide-enter-active,
.slide-leave-active {
	transition: all 0.5s;
}

.slide-leave-to,
.slide-enter {
	transform: translateX(-100%);
}
.slide-leave,
.slide-enter-to {
	transform: translateX(0px);
}
</style>