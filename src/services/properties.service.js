import { reduceList, utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { ordersService } from './orders.service.js'

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
    getSearchParamsFromFilter,
    getPropertiesByCity
}
// For Debug (easy access from console):
window.cs = propertiesService

function query(filterBy,orderBy = { field: 'name', direction: 1 }) {
    return storageService.query(PROPERTIES_KEY)
        .then(properties => {
            return properties.filter(async property => {
                for (const field in filterBy) {
                    switch (field) {
                        case 'type':
                            if (filterBy.type !== 'any' && filterBy.type !== 'room' && filterBy.type !== 'home') return false
                            else if (filterBy.type === 'room' && (property.type !== 'Guesthouse' && property.type !== 'Hotel')) return false
                            else if (filterBy.type === 'home' && (property.type !== 'House' && property.type !== 'Apartment')) return false
                            else continue
                        case 'types':
                        case 'amenities':
                        case 'accessibility':
                        case 'labels':
                        case 'rules':
                            for (const val of filterBy[field]) {
                                if (!property[field].includes(val)) return false
                            }
                            break
                        case 'minPrice':
                            if (property.price < filterBy.minPrice) return false
                            break
                        case 'maxPrice':
                            if (filterBy.maxPrice > 0 && property.price > filterBy.maxPrice) return false
                            break
                        case 'bedrooms':
                        case 'beds':
                        case 'raiting':
                        case 'bathrooms':
                            if (property[field] < filterBy[field]) return false
                            break
                        case 'guests':
                            for (const guestType in filterBy.guests) {
                                if (property.capacity[guestType] < filterBy.guests[guestType]) return false
                            }
                            break
                        case 'loc':
                            if(
                            property.loc.lat < filterBy.loc.minLat &&
                            property.loc.lat > filterBy.loc.maxLat &&
                            property.loc.lng >= filterBy.loc.minLng &&
                            property.loc.lng <= filterBy.loc.maxLng) return false
                            break
                        case 'dates':
                            if (!await _checkPropertyAvailability(property, filterBy.dates.from, filterBy.dates.to)) return false
                            break
                        default:
                            console.log('Unknown filter field:', field);
                            return false;
                    }
                }
                return true;
            }
        )
        })
}

async function _checkPropertyAvailability(property, startDate, endDate) {
    const orderFilter = ordersService.getDefaultFilter();
    orderFilter.propertyId = property._id;
    orderFilter.startDate = startDate;
    orderFilter.endDate = endDate;
    const orders = await ordersService.query(orderFilter)
    if (orders.length>0) return false
    return true
}

function get(propertyId) {
    return storageService.get(PROPERTIES_KEY, propertyId)
        .then(property => {
            //property = _setNextPrevPropertyId(property)
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
                           type= null,
                           imgUrls= [], 
                           price = 0, 
                           summary= '', 
                           capacity= {adults:1,kids:0,infants:0,pets:0},
                           amenities= [],
                           accessibility= [],
                           bathrooms= 1,
                           bedrooms= 1,
                           beds= 1,
                           rules= [],
                           labels= [],
                           host= undefined,
                           loc= {country: null, countryCode: null, city: null, address: null, lat: 0, lng: 0},
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

function getDefaultFilter() {
    return { 
        type: 'any',
        types: [],
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
        //host: null,
        dates: {from:null,to:null},
        loc: { countryCode: '', city: '', maxLat: 90, minLat: -90, maxLng: 180, minLng: -180},
        raiting: 0,
    }
}

function getSearchParamsFromFilter(filterBy) {
    const searchParams = new URLSearchParams()
    for (const field in filterBy) {
        if (Array.isArray(filterBy[field])){
            // console.log('array field:', field, filterBy[field], JSON.stringify(filterBy[field]))
            searchParams.set(field, JSON.stringify(filterBy[field]))
            continue
        }
        else if (filterBy[field] instanceof Object) {
            //console.log('object field:', field, filterBy[field])
            for (const subField in filterBy[field]) {
                searchParams.set(`${field}.${subField}`, filterBy[field][subField])
            }
            continue
        }
        //console.log('primitive field:', field, filterBy[field])
        searchParams.set(field, filterBy[field])
    }
    return searchParams
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        if (Array.isArray(defaultFilter[field])){
           //console.log('array field parse:', field, filterBy[field], JSON.parse(searchParams.get(field)))
            filterBy[field] = searchParams.get(field) ? JSON.parse(searchParams.get(field)) : defaultFilter[field]
            continue
        }
        else if (defaultFilter[field] instanceof Object) {
            for (const subField in defaultFilter[field]) {
                const key = `${field}.${subField}`
                filterBy[field] = filterBy[field] || {}
                if (field === 'dates') {
                   filterBy[field][subField] = ( searchParams.get(key) && searchParams.get(key) !== "null" ) ? new Date(searchParams.get(key)) : defaultFilter[field][subField]
                }
                else if( field === 'guests' ) {
                    filterBy[field][subField] = +searchParams.get(key) || defaultFilter[field][subField]
                }
                else if (field === 'loc') {
                    if(subField==='countryCode' || subField==='city'){
                        filterBy[field][subField] = searchParams.get(key) || defaultFilter[field][subField]
                    }
                    else {
                        filterBy[field][subField] = +searchParams.get(key) || defaultFilter[field][subField]
                    }
                }
                else {
                    
                    filterBy[field][subField] = searchParams.get(key) || defaultFilter[field][subField]
                }
            }
            continue
        }
        if (field === 'types' || field === 'txt') {
            filterBy[field] = searchParams.get(field) || defaultFilter[field]
        }
        else {
            filterBy[field] = +searchParams.get(field) || defaultFilter[field]
        }
    }
    if(filterBy.caseSensitive){
        if(filterBy.caseSensitive==='true') filterBy.caseSensitive=true
        else filterBy.caseSensitive=false
    }
    return filterBy
}

async function getById(id) {
    console.log(id)
    const property =  await storageService.get(PROPERTIES_KEY, id)
    console.log(property)
    return property
}


function getPropertiesByCity(city) {
    return storageService.query(PROPERTIES_KEY, 100)
        .then(properties => {
            return properties.filter(property => 
                property.loc.lat >= city.minLat &&
                property.loc.lat <= city.maxLat &&
                property.loc.lng >= city.minLng &&
                property.loc.lng <= city.maxLng
            )
        }).then(filteredProperties => {
            return reduceList(filteredProperties,8)
    })
}

