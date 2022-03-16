const Request = new class {

  async fetch(method, url) {
    return await fetch(url, {
        method,
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      try { res = res.json() } catch(err) {}
      return res;
    })
  }

  async GET(url) {
    return await this.fetch('GET', url);
  }

  async DELETE(url) {
    return await this.fetch('DELETE', url);
  }
}

export default Request
