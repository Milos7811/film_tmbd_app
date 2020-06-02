import { truncate } from 'lodash'

export default {
	data() {
		return {
			hovering: false,
			hoveredImageId: ''
		}
	},
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
					'http://image.tmdb.org/t/p/original/' +
					this.result.poster_path)
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
		},
		showHovered(image) {
			this.timeout = setTimeout(() => {
				this.hovering = true
				this.hoveredImageId = image
				this.sendId()
			}, 2000)
		},
		stopHovering() {
			setTimeout(() => {
				this.hovering = false
				this.hoveredImageId = ''
				this.sendId()
			}, 500)
			clearTimeout(this.timeout)
		},
		sendId() {
			this.$root.$emit('hovering-image-id', this.hoveredImageId)
		},
		goToUrlPerson(name, id) {
			let slug = _.trim(
				_.deburr(name.toLowerCase()) // diacrnpm uitics
					.replace(/[^\w\s]/gi, '') // special characters
					.replace(/ {2,}/g, ' ') // repeating spaces
					.replace(/ /g, '-'), // space to -
				'-' // trailing -
			)
			this.$router.push({ path: '/person/' + slug, query: { id } })
		},
		goToUrlSeries(name, id) {
			let slug = _.trim(
				_.deburr(name.toLowerCase()) // diacrnpm uitics
					.replace(/[^\w\s]/gi, '') // special characters
					.replace(/ {2,}/g, ' ') // repeating spaces
					.replace(/ /g, '-'), // space to -
				'-' // trailing -
			)
			this.$router.push({ path: '/series/' + slug, query: { id } })
		}
	}
}
