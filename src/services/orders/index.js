const { DEV, VITE_LOCAL } = import.meta.env

import { ordersService as local } from './orders.service.local.js'
import { ordersService as remote } from './orders.service.remote.js'

const ordersServiceToUse = VITE_LOCAL === 'true' ? local : remote

export const ordersService = {
    ...ordersServiceToUse,
    getEmptyOrder,
    getDefaultFilter,
    getFilterFromSearchParams
}

function getEmptyOrder(host= undefined ,guest= undefined , totalPrice= 0 , startDate= '' , endDate= '' , guests= { adults: 0, kids: 0 , infants: 0, pets: 0 } , property= undefined , msgs= [] , status= 'pending') {
	return {
		host,
		guest,
		totalPrice,
		startDate,
		endDate,
		guests,
		property,
		msgs,
		status
	}
}

async function getDefaultFilter() {
    return {
        host: undefined,
        guest: undefined,
        startDate: '',
        endDate: '',
        guests: { adults: 0, kids: 0, infants: 0, pets: 0 },
        property: undefined,
        status: 'all'
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

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.ordersService = ordersService
