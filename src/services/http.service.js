import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'

const axios = Axios.create({ withCredentials: true })

export const httpService = {
    get(endpoint, data, options = {}) {
        return ajax(endpoint, 'GET', data, options)
    },
    post(endpoint, data, options = {}) {
        return ajax(endpoint, 'POST', data, options)
    },
    put(endpoint, data, options = {}) {
        return ajax(endpoint, 'PUT', data, options)
    },
    delete(endpoint, data, options = {}) {
        return ajax(endpoint, 'DELETE', data, options)
    }
}

async function ajax(endpoint, method = 'GET', data = null, options = {}) {
    const url = `${BASE_URL}${endpoint}`
    const params = (method === 'GET') ? data : null

    const axiosOptions = { 
        url, 
        method, 
        data, 
        params,
        ...options
    }

    try {
        const res = await axios(axiosOptions)
        return res.data
    } catch (err) {
 
        if (err.name !== 'AbortError' && err.code !== 'ERR_CANCELED') {
            console.error(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data)
            console.dir(err)
        }
        
        if (err.response && err.response.status === 401) {
            sessionStorage.clear()
        }
        throw err
    }
}