import { httpService } from "../http.service.js"

const USER_URL = 'user/'
const AUTH_URL = 'auth/'

export const usersService = {
    query,
    login,
    remove,
    save,
    getById,
    getHost,
    setNewPropertyToHost
}

function query(filterBy={}) {
    const queryParams = new URLSearchParams(filterBy).toString()
    return httpService.get(USER_URL + '?' + queryParams)
}

function login(username, password) {
    return httpService.post(AUTH_URL + 'login', { username, password })
}

function remove(userId) {
    return httpService.delete(USER_URL + userId)
}

function save(user) {
    if (user._id) {
        return httpService.put(USER_URL + user._id, user)
    } else {
        return httpService.post(AUTH_URL, user)
    }
}

async function getById(id) {
    return await httpService.get(USER_URL + id)
}

async function getHost(hostId) {
    getById(hostId)
}

async function setNewPropertyToHost(hostId, propertyId) {
    return hostId+'_'+propertyId
}