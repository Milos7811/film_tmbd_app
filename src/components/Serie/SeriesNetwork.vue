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
	border: 1px solid $navbar;
	border-top: 0px;
	display: flex;
	justify-content: center;
	align-items: center;
	justify-content: space-around;
}
// .network {
// display: flex;
// flex-wrap: wrap;
// align-items: center;
// align-content: stretch;
// }
</style>