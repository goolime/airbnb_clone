import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const PROPERTIES_KEY = 'propertiesDB'



export const propertiesService = {
    query,
    get,
    remove,
    save,
    getById,
    getEmptyProperty,
    getDefaultFilter,
    getFilterFromSearchParams,
}
// For Debug (easy access from console):
window.cs = propertiesService

function query(filterBy,orderBy = { field: 'name', direction: 1 }) {
    return storageService.query(PROPERTIES_KEY)
        .then(properties => {
            return properties
        })
}


function get(propertyId) {
    return storageService.get(PROPERTIES_KEY, propertyId)
        .then(property => {
            property = _setNextPrevPropertyId(property)
            return property
        })
}

function remove(propertyId) {
    return storageService.remove(PROPERTIES_KEY, propertyId)
}

function save(property) {
    if (property._id) {
        property.updatedAt = Date.now()
        return storageService.put(PROPERTIES_KEY, property)
    } else {
        property.createdAt = property.updatedAt = Date.now()

        return storageService.post(PROPERTIES_KEY, property)
    }
}

function getEmptyProperty( name = '', 
                           type= 'House',
                           imgUrls= [], 
                           price = 0, 
                           summary= '', 
                           capacity= {adults:0,kids:0,infants:0,pets:0},
                           amenities= [],
                           accessibility= [],
                           bathrooms= 0,
                           bedrooms= 0,
                           beds= 0,
                           rules= [],
                           labels= [],
                           host= undefined,
                           loc= {country: 'Portugal', countryCode: 'PT', city: 'Lisbon', address: '17 Kombo st', lat: -8.61308, lng: 41.1413},
                           reviews= []) {
    return { name,
             type,
             imgUrls,
             price,
             summary,
             capacity,
             amenities,
             accessibility,
             bathrooms,
             bedrooms,
             beds,
             rules,
             labels,
             host,
             loc,
             reviews
         }
}

async function getDefaultFilter() {
    return { 
        txt: '',
        type: 'All',
        maxPrice: 0,
        minPrice: 0,
        guests: { adults: 0, kids: 0, infants: 0, pets: 0 },
        amenities: [],
        accessibility: [],
        rules: [],
        labels: [],
        bathrooms: 0,
        bedrooms: 0,
        beds: 0,
        host: undefined,
        loc: { countryCode: '', city: '', maxLat: 90, minLat: -90, maxLng: 180, minLng: -180},
        raiting: 0,
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
    return await storageService.get(PROPERTIES_KEY, id)
}

