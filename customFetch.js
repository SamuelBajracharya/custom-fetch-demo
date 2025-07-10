class customFetch {
  constructor(url, headers = {}) {
    this.baseUrl = url;
    this.headers = headers;
  }

  async fetchWrapper(url, options = {}) {
    const response = fetch(this.baseUrl + url, options);

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
  post(url, body){
    return this.fetchWrapper(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
    })
  }

  //put method for custom fetch
  put(url, body) {
    return this.fetchWrapper(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  //delete method foro custom fetch
  delete(url){
    return this.fetchWrapper(url, {
        method: "DELETE",
    })
  }
}

