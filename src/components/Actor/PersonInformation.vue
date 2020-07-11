<template>
	<div>
		<div class="person-information">
			<h1 class="main-title">Osobne informacie</h1>
			<h3 v-if="this.result.birthday" class="person-information-title">
				Dátum narodenia
			</h3>
			<p v-if="this.result.birthday" class="person-information-text">
				{{ dataBirthday }}
			</p>
			<h3 v-if="this.result.birthday" class="person-information-title">
				Vek
			</h3>
			<p v-if="this.result.birthday" class="person-information-text">
				{{ this.personOld(this.result.birthday) }}
			</p>
			<h3 v-if="this.result.deathday" class="person-information-title">
				Dátum úmrtia
			</h3>
			<p v-if="this.result.deathday" class="person-information-text">
				{{ dateDeath }}
			</p>

			<h3
				v-if="this.result.place_of_birth"
				class="person-information-title"
			>
				Miesto narodenia
			</h3>
			<p class="person-information-text">
				{{ this.result.place_of_birth }}
			</p>
			<h3 class="person-information-title">Popularita</h3>
			<p class="person-information-text">
				{{ this.result.popularity }}
			</p>
			<h3
				v-if="
					this.result.also_known_as &&
						this.result.also_known_as.length > 0
				"
				class="person-information-title"
			>
				Tiež známy/-a ako
			</h3>

			<p
				v-for="(know, i) in this.result.also_known_as"
				:key="i"
				class="person-information-text"
			>
				{{ know }}
			</p>
		</div>
	</div>
</template>

<script>
import moment from 'moment'
export default {
	props: ['result'],

	computed: {
		dataBirthday() {
			return moment(this.result.birthday).format('DD.MM.YYYY')
		},
		dateDeath() {
			return moment(this.result.deathday).format('DD.MM.YYYY')
		}
	},
	methods: {
		personOld(born) {
			let d = new Date().getFullYear()
			let n = new Date(born).getFullYear()
			return d - n
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../scss/app.scss';
.person-information {
	width: em(300);
	margin-right: em(15);
	clear: both;
	float: left;
	text-align: left;
	.main-title {
		font-size: em(25);
		margin-top: em(30, 25);
	}
	.person-information-title {
		margin-top: em(20);
		font-size: em(18);
	}
	.person-information-text {
		margin-bottom: em(7);
	}
}
</style>
