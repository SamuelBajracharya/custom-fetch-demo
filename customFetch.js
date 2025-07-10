export class customFetch {
  constructor({ baseUrl = "", headers = {} }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  //custom fetch wrapper
  async fetchWrapper(url, options = {}) {
    const finalUrl = this.createFinalUrl(url);
    const response = await fetch(finalUrl, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  //get method for custom fetch
  get(url) {
    return this.fetchWrapper(url, {
      method: "GET",
    });
  }

  //post method for custom fetch
  post(url, body) {
    return this.fetchWrapper(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  }

  //put method for custom fetch
  put(url, body) {
    return this.fetchWrapper(url, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(body),
    });
  }

  //delete method for custom fetch
  delete(url) {
    return this.fetchWrapper(url, {
      method: "DELETE",
    });
  }
  //method for creating final url
  createFinalUrl(url) {
    const cleanBase = this.baseUrl.replace(/\/+$/, '');
    const cleanUrl = url.replace(/^\/+/, '');
    return `${cleanBase}/${cleanUrl}`;
  }
}
