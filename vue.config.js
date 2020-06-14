process.env.VUE_APP_VERSION = require('./package.json').version
module.exports = {
	css: {
		loaderOptions: {
			sass: {
				prependData: `
        @import "@/scss/app.scss";
        @import "@/scss/colors.scss";
        `
			}
		}
	},
	transpileDependencies: ['vuetify']
}
