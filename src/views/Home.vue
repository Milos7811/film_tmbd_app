<template>
	<div class="home container" v-cloak>
		<search />
		<popular />
		<now-playing />
		<top-rated />
		<movie-upcoming />
		<!-- <v-progress-circular
      :size="70"
      :width="7"
      color="blue"
      indeterminate
    ></v-progress-circular> -->
	</div>
</template>

<script>
import Search from '../components/Search.vue'
import Popular from '../components/Popular.vue'
import NowPlaying from '../components/NowPlaying'
import TopRated from '../components/TopRated'
import MovieUpcoming from '../components/MovieUpcoming'
// import FastMoviePrwview from "../components/FastMoviePreview.vue";

export default {
	components: { Search, Popular, NowPlaying, TopRated, MovieUpcoming }
}
</script>
<style lang="scss" scoped>
// [v-cloak] {
//   display: none;
// }
</style>
