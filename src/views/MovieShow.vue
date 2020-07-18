<template>
	<div class="content">
		<single-movie-show />
	</div>
</template>

<script>
import SingleMovieShow from '../components/Movie/SingleMovieShow.vue'
export default {
	name: 'MovieShow',
	components: {
		SingleMovieShow
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
.content {
	@media (min-width: 450px) {
		padding: em(40) !important;
	}
}
</style>
