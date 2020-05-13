<template>
	<div class="home" v-cloak>
		<search />
		<popular />
		<now-playing />
		<top-rated />
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
// import FastMoviePrwview from "../components/FastMoviePreview.vue";

export default {
	components: { Search, Popular, NowPlaying, TopRated }
}
</script>
<style lang="scss" scoped>
// [v-cloak] {
//   display: none;
// }
</style>
