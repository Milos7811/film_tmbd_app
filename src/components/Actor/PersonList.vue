<template>
	<div class="person-list-wrapper">
		<v-card
			v-for="result in results"
			:key="result.id"
			dark
			class="ma-3 card"
			height="300"
			width="150"
			@click="goToUrlPerson(result.name, result.id)"
		>
			<img
				v-if="result.profile_path"
				class="image"
				v-bind:src="
					'http://image.tmdb.org/t/p/w500/' + result.profile_path
				"
				ref="cardMouseOver"
			/>
			<img v-else src="../../assets/default_avatar.jpg" class="image" />
			<h5 class="real-name">
				{{ shorten(result.name) }}
			</h5>
		</v-card>
	</div>
</template>

<script>
import Mixins from '../../mixins/Mixins'
export default {
	mixins: [Mixins],
	props: ['results']
}
</script>

<style lang="scss" scoped>
@import '../../scss/app.scss';
.person-list-wrapper {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: flex-start;
	align-content: center;
}
.card {
	overflow: hidden;
	background-color: $navbar !important;
	color: $primary-text !important;
}
.real-name {
	font-size: em(15);
}

.character-name {
	font-size: em(14);
}
.image {
	max-width: 150px;
	&:hover {
		transition: all 0.2s;
		transform: scale(1.1);
	}
}
</style>
