import { httpService } from "../http.service.js"
import { propertiesUtil } from "./properties.util.js"

const PROPERTIES_URL = 'property/'

export const propertiesService = {
    query,
    remove,
    save,
    getById,
    getPropertiesByCity
}

function query(filterBy,orderBy = { field: 'name', direction: 1 }) {
    const queryParams = '?' + propertiesUtil.getSearchParamsFromFilter(filterBy, orderBy)
    return httpService.get(PROPERTIES_URL + queryParams)
}


function remove(propertyId) {
    return httpService.delete(PROPERTIES_URL + propertyId)
}

function save(property) {
    if (property._id) {
        return httpService.put(PROPERTIES_URL + property._id, property)
    } else {
        return httpService.post(PROPERTIES_URL, property)
    }
}

async function getById(id) {
    return await httpService.get(PROPERTIES_URL + id)
}   

async function getPropertiesByCity(city) {
    const queryParams = `?countryCode=${city.countryCode}&city=${city.city}&minLat=${city.minLat}&maxLat=${city.maxLat}&minLng=${city.minLng}&maxLng=${city.maxLng}`
    return httpService.get(PROPERTIES_URL+"city/" + queryParams)
}

