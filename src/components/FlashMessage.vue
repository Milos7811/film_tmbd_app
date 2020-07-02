<template>
	<transition name="flash">
		<div v-show="visible" class="alert" role="alert">
			<button class="btn delete" @click="hide">x</button>
			<p class="text">{{ messageText }}</p>
		</div>
	</transition>
</template>

<script>
export default {
	mounted() {},
	props: ['text'],
	data() {
		return {
			visible: false,
			messageText: 'Vitajte na Moje FIlmy'
		}
	},
	created() {
		this.show()
	},
	methods: {
		show() {
			this.visible = true
			setTimeout(() => this.hide(), 3000)
		},
		hide() {
			this.visible = false
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
.text {
	display: inline-block;
	margin: em(10);
}
.alert {
	border: 1px solid $primary;
	border-radius: em(5);
	background-color: $navbar;
	position: fixed;
	color: white;
	right: 2em;
	bottom: 2em;
	display: inline;
	.btn {
		float: right;
		line-height: em(7);
		color: white;
		margin: em(5);
	}
}
.flash-enter-active,
.flash-leave-active {
	transition: all 0.5s;
}
.flash-leave-to,
.flash-enter {
	opacity: 0;
	transform: translateX(110%);
}

.flash-enter-to {
	transform: translateX(0%);
}
</style>
