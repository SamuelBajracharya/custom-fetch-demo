export class customFetch {
  constructor({ baseUrl = "", headers = {}, timeout = 0 }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this.timeout = timeout;
  }

  //custom fetch wrapper
  async fetchWrapper(url, options = {}) {
    const controller = new AbortController();
    let timeoutId;
    if (this.timeout > 0) {
      timeoutId = setTimeout(() => {
        controller.abort();
      }, this.timeout);
    }

    const finalUrl = this.createFinalUrl(url);
    try {
      const response = await fetch(finalUrl, {
        ...options,
        signal: controller.signal,
      });

      if (timeoutId) clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (e) {
      if (timeoutId) clearTimeout(timeoutId);

      if (e.name === "AbortError") {
        throw new Error("Request timed out");
      }
      throw e;
    }
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
    let cleanBase = "";
    let cleanUrl = url.replace(/^\/+/, "");
    if (this.baseUrl != "") {
      cleanBase = this.baseUrl.replace(/\/+$/, "");
      return `${cleanBase}/${cleanUrl}`;
    } else {
      return cleanUrl;
    }
  }
}
