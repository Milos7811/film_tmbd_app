<template>
	<v-select
		v-model="select"
		:items="genres"
		item-text="name"
		item-value="id"
		return-object
		:menu-props="{ top: false, offsetY: true }"
		label="Žáner"
		height="48"
		class="select"
		solo
	>
	</v-select>
</template>

<script>
export default {
	data() {
		return {
			genres: [],
			select: ''
		}
	},
	created() {
		this.getGenres()
	},
	watch: {
		select() {
			this.$root.$emit('search-genres-id', this.select.id)
		}
	},
	methods: {
		async getGenres() {
			try {
				const response = await this.$axios.get(
					`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.$apiKey}&language=sk-SK`
				)
				response.data.genres.forEach(element => {
					this.genres.push(element)
				})
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
.select {
	border-radius: em(20);
	max-width: em(150);
	height: em(48);
	margin-top: em(5);
	padding: em(0) !important;
}
</style>
