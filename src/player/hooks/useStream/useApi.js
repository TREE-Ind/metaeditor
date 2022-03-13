const useApi = new class {

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

  async get(url) {
    return await this.fetch('GET', url);
  }

  async delete(url) {
    return await this.fetch('DELETE', url);
  }
}

export default useApi
