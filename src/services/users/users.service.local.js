//import { utilService } from './util.service.js'
import { storageService } from '../async-storage.service.js'

const USERS_KEY = 'usersDB'



export const usersService = {
    query,
    login,
    remove,
    save,
    getById,
    getHost,
    setNewPropertyToHost
}
// For Debug (easy access from console):
window.cs = usersService

function query(filterBy={}) {
    return storageService.query(USERS_KEY)
        .then(users => {
            return users
        })
}

function login(userName, password) {
    return storageService.query(USERS_KEY, 0)
        .then(users => {
            const user = users.find(user => user.username === userName )//&& user.password === password);
            if (user) {
                return user;
            } else {
                throw new Error('Invalid username or password');
            }
        });
}

function get(userId) {
    return storageService.get(USERS_KEY, userId)
        .then(user => {
            //user = _setNextPrevUserId(user)
            return user
        })
}

function remove(userId) {
    return storageService.remove(USERS_KEY, userId)
}

function save(user) {
    if (user._id) {
        // TODO - updatable fields
        user.updatedAt = Date.now()
        return storageService.put(USERS_KEY, user)
    } else {
        user.createdAt = user.updatedAt = Date.now()

        return storageService.post(USERS_KEY, user)
    }
}



async function getById(id) {
    return await storageService.get(USERS_KEY, id)
}

function getHost(user) {
    const host = {
        _id: user._id,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
    }
    return host
}

function setNewPropertyToHost(propertyId, userId) {
    return get(userId).then(user => {
        if (!user.properties) user.properties = []
        user.properties.push(propertyId)
        return save(user)
    })
}