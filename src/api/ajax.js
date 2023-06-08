import axios from 'axios'

axios.defaults.withCredentials = false

export default class Ajax {
    static get(url, data = {}, headers = {}, success, failure) {
        const params = this.createParameter(data)
        axios
            .get(url, {params: params, headers: headers})
            .then(res => {
                if (success) success(res.data)
            })
            .catch(err => {
                if (failure) failure(err)
            })
    }

    static post(url, data = {}, success, failure) {
        axios
            .post(url, data, {
                // headers: headers
            })
            .then(res => {
                if (success) success(res.data)
            })
            .catch(err => {
                if (failure) failure(err)
            })
    }

    static put(url, data = {}, success, failure) {
        axios
            .put(url, data)
            .then(res => {
                if (success) success(res.data)
            })
            .catch(err => {
                if (failure) failure(err)
            })
    }

    static delete(url, data = {}, success, failure) {
        axios
            .delete(url, data)
            .then(res => {
                if (success) success(res.data)
            })
            .catch(err => {
                if (failure) failure(err)
            })
    }

    static createParameter(data = {}) {
        const params = new URLSearchParams();
        Object.keys(data).forEach(key => {
            if (data[key]) {
                params.append(key, data[key]);
            }
        });
        return params
    }
}