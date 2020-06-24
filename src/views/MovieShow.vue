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
.content {
	height: 100%;
}
</style>
