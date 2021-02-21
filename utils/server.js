function getServerApiUrl() {
  /* return process.env.BASE_API_URL; */
  return "/api";
}

const callFetchAsync = async (url, method, body, headers = {}) => {
  try {
    const options = {
      headers: new Headers({
        "Content-Type": "application/json",
        ...headers,
      }),
      body,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }
    const response = await fetch(`${getServerApiUrl()}${url}`, {
      method,
      credentials: "same-origin",
      ...options,
    });
    return await response.json();
  } catch (err) {
    return {
      ok: false,
      data: err,
    };
  }
};

/**
 *
 * @param {string} url
 * @param {object} body
 */
const putAsync = (url, body) => {
  return callFetchAsync(url, "PUT", body);
};

/**
 *
 * @param {string} url
 * @param {object} body
 */
const postAsync = (url, body) => {
  return callFetchAsync(url, "POST", body);
};

/**
 *
 * @param {string} url
 * @param {object} body
 */
const getAsync = (url) => {
  return callFetchAsync(url, "GET", null);
};

/**
 *
 * @param {string} url
 * @param {object} body
 */
const deleteAsync = (url) => {
  return callFetchAsync(url, "DELETE", null);
};

export {postAsync, getAsync, putAsync, deleteAsync};
