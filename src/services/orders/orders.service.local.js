import { storageService } from '../async-storage.service.js'

const ORDER_KEY = 'ordersDB'

export const ordersService = {
    get,
    remove,
    save,
    getById
}

/*
function query(filterBy,orderBy = { field: 'name', direction: 1 }) {
    return storageService.query(ORDER_KEY)
        .then(orders => {
            return orders
        })
}
*/


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

async function getById(id) {
    return await storageService.get(ORDER_KEY, id)
}
