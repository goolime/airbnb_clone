import { storageService } from './async-storage.service.js'

const ORDER_KEY = 'ordersDB'

export const ordersService = {
    query,
    get,
    remove,
    save,
    getById,
    getEmptyOrder,
    getDefaultFilter,
    getFilterFromSearchParams
}
// For Debug (easy access from console):
window.cs = ordersService

function query(filterBy,orderBy = { field: 'name', direction: 1 }) {
    return storageService.query(ORDER_KEY)
        .then(orders => {
            return orders
        })
}


function get(orderId) {
    return storageService.get(ORDER_KEY, orderId)
        .then(order => {
            //order = _setNextPrevOrderId(order)
            return order
        })
}

function remove(orderId) {
    return storageService.remove(ORDER_KEY, orderId)
}

function save(order) {
    if (order._id) {
        order.updatedAt = Date.now()
        return storageService.put(ORDER_KEY, order)
    } else {
        order.createdAt = order.updatedAt = Date.now()

        return storageService.post(ORDER_KEY, order)
    }
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

async function getById(id) {
    return await storageService.get(ORDER_KEY, id)
}
