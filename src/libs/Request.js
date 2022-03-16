const Request = new class {

  async request(method, url, params={}) {
		let options = {
        method,
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
    }

		try {
			options.body = JSON.stringify(params.body)
		} catch(err) {}

    return await fetch(url, options)
		.then(async res => {

			try {
        return {
  				status: res.status,
  				body: await res.json(),
  			};
			} catch (error) {
        return {
          status: res.status,
  				error,
        };
      }

		})
  }

  async GET(url) {
    return await this.request('GET', url);
  }

  async POST(url, body) {
    return await this.request('POST', url, {body});
  }

  async DELETE(url) {
    return await this.request('DELETE', url);
  }
}

export default Request
