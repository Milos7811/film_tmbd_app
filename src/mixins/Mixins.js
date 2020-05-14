import { truncate } from 'lodash'

export default {
	methods: {
		shorten(text, len = 25) {
			return truncate(text, { length: len })
		},
		goToUrl(title, id) {
			let slug = _.trim(
				_.deburr(title.toLowerCase()) // diacrnpm uitics
					.replace(/[^\w\s]/gi, '') // special characters
					.replace(/ {2,}/g, ' ') // repeating spaces
					.replace(/ /g, '-'), // space to -
				'-' // trailing -
			)
			this.$router.push({ path: '/movie/' + slug, query: { id } })
			// this.$root.$emit("single-movie-show-id", id);
		},
		getImage() {
			try {
				return (this.fullImagePath =
					'http://image.tmdb.org/t/p/w500/' + this.result.poster_path)
				console.log(this.result)
			} catch (error) {
				console.log(error)
			}
		},
		getVideo(videoPath) {
			try {
				return (this.fulllVideoPath =
					'https://www.youtube.com/embed/' +
					videoPath +
					'?autoplay=1&showinfo=0&enablejsapi=1&origin=http://localhost:9000')
			} catch (error) {
				console.log('Error v getVideo')
			}
		}
	}
}
