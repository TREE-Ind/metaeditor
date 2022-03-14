import packageJson from '../../package.json'


class BaseClass {
	constructor() {
		const isDev = process.env.isDev || process.env.NODE_ENV !== 'production'
		this.isDev = isDev
		this.isProd = !isDev
	}

}

class ConfigClass extends BaseClass {
	constructor(...args) {
		super(...args)

		this.staticPath = (...v) => `/static/${v.join('/')}`
		// this.staticUrl = (...v) => this.config.web_host + this.staticPath(...v)
		this.staticUrl = (...v) => this.data.homepage + this.staticPath(...v)
		this.apiPath = (...v) => `${this.config.api_host}/api/${this.namespace}/${v.join('/')}`
	}

	get languages() {
		return {
			en: 'English',
		  ru: 'Russian',
		};
	}

	get routing() {
		return {
			home: '/',
		  // auth: '/auth',
		  // auth_signup: '/auth/signup',
		  // auth_reset: '/auth/reset',
		  // auth_success: '/',
		  // cabinet: '/cabinet',
			// cabinet_profile: '/cabinet/profile',
			// contacts: '/contacts',
		}
	}

	get data() {
		let res = {
			siteLogoName: 'MetaEditor',
			defaultTitle: 'MetaEditor',
			host: 'metaeditor.io',
			homepage: '',
			favicons: {
				default: this.staticPath('favicons', 'favicon.png'),
				small: this.staticPath('favicons', '16.png'),
				normal: this.staticPath('favicons', '48.png'),
				large: this.staticPath('favicons', '128.png'),
			},
			logo_svg: {
				icon: this.staticPath('logo_icon.svg'),
				white: this.staticPath('logo_white.svg'),
			},
		}

		if(this.isProd) {
			res.homepage = packageJson.homepage
		}

		return res;
	}

	get seo() {
		return {
			og_image: this.staticUrl('seo', `og_default.jpg?v=${packageJson.version}`),
		};
	}

	get credentials() {
		let res = {
			// GOOGLE_RECAPTCHA: '',
			// GOOGLE_TAG_ID: 'G-*****',
			// GOOGLE_MAP_API_KEY: '',
			// CHATRA_ID: false,
		}

		return res;
	}

	get config() {

		let res = {
			web_host: 'https://' + this.data.host,
			api_host: 'https://' + this.data.host,
		}

		if(this.isDev) {
			const host_ip = '127.0.0.1'
			res.web_host = `http://${host_ip}:3000`
			res.api_host = `https://${host_ip}:8000`
		}

		return res;
	}

}


module.exports = new ConfigClass()