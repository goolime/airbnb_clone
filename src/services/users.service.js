import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const USERS_KEY = 'usersDB'



export const usersService = {
    query,
    get,
    remove,
    save,
    getById,
    getEmptyToy,
    getDefaultFilter,
    getFilterFromSearchParams
}
// For Debug (easy access from console):
window.cs = usersService

function query(filterBy) {
    return storageService.query(USERS_KEY)
        .then(users => {
            return users
        })
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

function getEmptyUser(fullname = '', imgUrl = '', username = '', properties = []) {
    return { fullname, imgUrl, username, properties }
}

async function getDefaultFilter() {

    return { 
        name: '',
        propertyid: '',
    }
}

async function getFilterFromSearchParams(searchParams) {
    const defaultFilter = await getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || defaultFilter[field]
    }
    if(filterBy.caseSensitive){
        if(filterBy.caseSensitive==='true') filterBy.caseSensitive=true
        else filterBy.caseSensitive=false
    }
    return filterBy
}

async function getById(id) {
    return await storageService.get(USERS_KEY, id)
}