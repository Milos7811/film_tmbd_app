<template>
	<div class="wrapper">
		<div v-for="result in this.results" :key="result.id">
			<single-network class="network" :result="result" />
		</div>
	</div>
</template>

<script>
import SingleNetwork from './SingleNetwork'
export default {
	components: { SingleNetwork },
	props: ['results']
}
</script>

<style lang="scss" scoped>
@import '../../scss/app.scss';
.wrapper {
	width: em(300);
	height: 50px;
	clear: both;
	float: left;
	background-color: white;
	border: 2px solid $navbar;
	border-top: 0px;
	display: flex;
	justify-content: center;
	align-items: center;
	justify-content: space-around;
	@media (max-width: 741px) {
		float: none;
		margin: auto;
	}
}
</style>