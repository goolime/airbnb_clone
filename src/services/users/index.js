const { DEV, VITE_LOCAL } = import.meta.env

import { usersService as local } from './users.service.local.js'
import { usersService as remote } from './users.service.remote.js'

const usersServiceToUse = VITE_LOCAL === 'true' ? local : remote

export const usersService = {
    ...usersServiceToUse,
    getEmptyUser,
    getDefaultFilter,
    getFilterFromSearchParams,
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

if (DEV) window.usersService = usersService
