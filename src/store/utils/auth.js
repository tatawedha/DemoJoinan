import axios from 'axios'

export function setToken(token) {
    axios.defaults.headers.common['token'] = token
}

export function removeToken() {
    delete axios.defaults.headers.common['token']
}