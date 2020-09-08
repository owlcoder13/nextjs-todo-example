import qs from 'qs';

class Api {
    async request(url, method, query = {}, body = {}) {

        let queryString = Object.keys(query).length > 0 ? "?" + qs.stringify(query) : '';

        let response = await fetch('http://localhost:3000' + url + queryString, {
            method: method,
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: method === 'POST' ? JSON.stringify(body) : null,
        })

        return response.json();
    }

    async post(url, body = {}, params = {}) {
        return this.request(url, 'POST', params, body);
    }

    async get(url, params = {}) {
        return this.request(url, 'GET', params);
    }
}

export default new Api();