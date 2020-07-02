<template>
	<div class="container">
		<article>
			<p class="text">
				Táto stránka bola vytvorená za účelom vytvoriť svoj vlastný
				projekt kde si budem môcť rozširovať svoje znalosti a skúsenosti
				ohľadom programovania webových stránok .
			</p>
			<p>
				Použité technológie:
				<v-icon class="vue-icon" alt="Vue"> {{ mdiVue }} </v-icon>
			</p>
			<p>
				Použitá databáza:
				<img
					class="tmdb-icon"
					src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
					alt=""
				/>
			</p>
		</article>
	</div>
</template>
<script>
import { mdiVuejs } from '@mdi/js'

export default {
	data() {
		return {
			openOnHover: true,
			mdiVue: mdiVuejs
		}
	},
	watch: {
		isActive(newValue, oldValue) {
			console.log(this.isActive)
		}
	}
}
</script>
<style lang="scss" scoped>
.tmdb-icon {
	width: 50px;
}
.vue-icon {
	color: #41b883;
}
.text {
	max-width: 50%;
	margin: auto;
	text-align: left;
}
</style>
