import { customFetch } from "./customFetch.js";

const responseOutput = document.getElementById("responseOutput");
const submit = document.getElementById("fetchSubmit");

submit.addEventListener("click", async (e) => {
  e.preventDefault();

  // Get values on submit
  const baseUrlInput = document.getElementById("baseUrlInput");
  const urlInput = document.getElementById("urlInput");
  const methodSelect = document.getElementById("methodSelect");
  const bodyInput = document.getElementById("bodyInput");

  const baseUrl = baseUrlInput.value.trim();
  const url = urlInput.value.trim();
  const method = methodSelect.value;
  let body = null;

  //check if the method is post or put to update the body
  if (method === "POST" || method === "PUT") {
    try {
      body = JSON.parse(bodyInput.value);
    } catch {
      alert("Invalid JSON in request body");
      return;
    }
  }

  // Create customFetch instance
  const fetchAPI = new customFetch({
    baseUrl,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  });

  // Request methods
  const requestMethods = {
    GET: () => fetchAPI.get(url),
    POST: () => fetchAPI.post(url, body),
    PUT: () => fetchAPI.put(url, body),
    DELETE: () => fetchAPI.delete(url),
  };

  try {
    const response = await requestMethods[method]();
    responseOutput.textContent = JSON.stringify(response, null, 2);
  } catch (err) {
    responseOutput.textContent = `Error: ${err.message}`;
  }
});
