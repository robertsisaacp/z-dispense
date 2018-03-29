const apiHost = 'http://172.20.1.79:3000';

class Api {
  _callApi(url, options = {}) {
    const fetchOptions = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    if (options.body) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    console.log( // eslint-disable-line
      `${fetchOptions.method} request \nto /${url}
${fetchOptions.body ? `with body: ${fetchOptions.body}` : ''}`);

    return fetch(`${apiHost}/${url}`, fetchOptions);
  }
  run(design, height) {
    return this._callApi(apiHost,  {method: 'POST', body: {design, height}});
  }
}
export default new Api();