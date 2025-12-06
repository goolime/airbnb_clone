import { httpService } from "../http.service.js"

const ORDER_URL = 'order/'

export const ordersService = {
    get,
    remove,
    save,
    getById,
    getOrdersByUserId,
    getOrdersByPropertyId
}

function get(orderId) {
    return httpService.get(ORDER_URL + orderId)
}

function remove(orderId) {
    return httpService.delete(ORDER_URL + orderId)
}

function save(order) {
    if (order._id) {
        return httpService.put(ORDER_URL + order._id, order)
    } else {
        return httpService.post(ORDER_URL, order)
    }   
}

async function getById(id) {
    return await httpService.get(ORDER_URL + id)
}

async function getOrdersByUserId(userId) {
    return await httpService.get(`user/${userId}/orders`)
}

async function getOrdersByPropertyId(propertyId) {
    return await httpService.get(`property/${propertyId}/orders`)
}