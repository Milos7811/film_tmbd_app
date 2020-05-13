<template>
  <v-app id="app" dark>
    <navigation />
    <v-container>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
      <fast-movie-preview />
    </v-container>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation";
import FastMoviePreview from "./components/FastMoviePreview";

export default {
  name: "App",
  data() {
    return {
      // showPreview: false,
    };
  },
  components: {
    Navigation,
    FastMoviePreview,
  },
  // methods: {
  //   showFastPreview() {
  //     this.showPreview = true;
  //   },
  //   showFastPreviewTurn() {
  //     if (this.showPreview) {
  //       this.showPreview = false;
  //     } else {
  //       this.showPreview = true;
  //     }
  //     // console.log(this.showPreview);
  //   },
  // },
};
</script>

<style lang="scss" scoped>
@import "./scss/app.scss";

#app {
  width: 100%;
  height: 100%;
  font-family: "Open Sans", sans-serif;

  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
