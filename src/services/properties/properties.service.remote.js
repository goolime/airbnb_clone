import { httpService } from "../http.service.js"
import { clearCache, propertiesUtil } from "./properties.util.js"

const PROPERTIES_URL = 'property/'


const CACHE_CONFIG = {
    TTL: 5 * 60 * 1000, // 5 minutes - adjust as needed
}

const cache = {
    queries: new Map(),      
    cities: new Map(),       
    byId: new Map(),      
}

const activeRequests = new Map()

export const propertiesService = {
    query,
    remove,
    save,
    getById,
    getPropertiesByCity,
    clearCache
}

async function query(filterBy, orderBy = { field: 'name', direction: 1 }) {
    const queryParams = '?' + propertiesUtil.getSearchParamsFromFilter(filterBy, orderBy)
    const cacheKey = `query_${queryParams}`

    const cachedData = getFromCache(cache.queries, cacheKey)
    if (cachedData) {
        console.log('Cache hit for query:', queryParams)
        return Promise.resolve(cachedData)
    }

    cancelPendingRequest(cacheKey)

    const controller = new AbortController()
    activeRequests.set(cacheKey, controller)

    try {
        const data = await httpService
            .get(PROPERTIES_URL + queryParams, null, { signal: controller.signal })

            saveToCache(cache.queries, cacheKey, data)
        activeRequests.delete(cacheKey)
        console.log('Query data fetched and cached')
        return data
    } catch (error) {

        activeRequests.delete(cacheKey)

        if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
            console.log('Request cancelled:', queryParams)
        }

        throw error
    }
}

function remove(propertyId) {
    console.log('Removing property:', propertyId)

    cache.byId.delete(`byId_${propertyId}`)
    cache.queries.clear()
    cache.cities.clear()

    return httpService.delete(PROPERTIES_URL + propertyId)
}

function save(property) {
    console.log('Saving property:', property._id || 'new')

    if (property._id) {

        cache.byId.delete(`byId_${property._id}`)
        cache.queries.clear()
        cache.cities.clear()

        return httpService.put(PROPERTIES_URL + property._id, property)
    } else {

        clearCache()
        return httpService.post(PROPERTIES_URL, property)
    }
}

async function getById(id) {
    const cacheKey = `byId_${id}`

    const cachedData = getFromCache(cache.byId, cacheKey)
    if (cachedData) {
        console.log('Cache hit for property:', id)
        return cachedData
    }

    const data = await httpService.get(PROPERTIES_URL + id)

    saveToCache(cache.byId, cacheKey, data)
    console.log('Property fetched and cached:', id)

    return data
}

async function getPropertiesByCity(city) {
    const queryParams = `?countryCode=${city.countryCode}&city=${city.city}&minLat=${city.minLat}&maxLat=${city.maxLat}&minLng=${city.minLng}&maxLng=${city.maxLng}`
    const cacheKey = `city_${city.countryCode}_${city.city}`

    const cachedData = getFromCache(cache.cities, cacheKey)
    if (cachedData) {
        console.log('Cache hit for city:', city.city)
        return cachedData
    }

    cancelPendingRequest(cacheKey)

    const controller = new AbortController()
    activeRequests.set(cacheKey, controller)

    try {
        const data = await httpService.get(
            PROPERTIES_URL + "city/" + queryParams,
            null,
            { signal: controller.signal }
        )

        saveToCache(cache.cities, cacheKey, data)
        activeRequests.delete(cacheKey)
        console.log('City data fetched and cached:', city.city)

        return data
    } catch (error) {

        activeRequests.delete(cacheKey)

        if (error.name === 'AbortError' || error.code === 'ERR_CANCELED') {
            console.log('🚫 City request cancelled:', city.city)
        }

        throw error
    }
}


function getFromCache(cacheMap, key) {
    const cached = cacheMap.get(key)

    if (!cached) return null

    const age = Date.now() - cached.timestamp
    if (age < CACHE_CONFIG.TTL) {
        return cached.data
    }

    cacheMap.delete(key)
    return null
}

function saveToCache(cacheMap, key, data) {
    cacheMap.set(key, {
        data,
        timestamp: Date.now()
    })
}


function cancelPendingRequest(key) {
    const controller = activeRequests.get(key)
    if (controller) {
        controller.abort()
        activeRequests.delete(key)
    }
}

// ============================================
// DEVELOPMENT TOOLS
// ============================================

// Expose service to window in development for debugging
if (import.meta.env.DEV) {
    window.propertiesService = {
        ...propertiesService,
        // Debug helpers
        _debugCache: () => ({
            queries: Array.from(cache.queries.keys()),
            cities: Array.from(cache.cities.keys()),
            byId: Array.from(cache.byId.keys()),
            activeRequests: Array.from(activeRequests.keys()),
            cacheSize: {
                queries: cache.queries.size,
                cities: cache.cities.size,
                byId: cache.byId.size
            }
        }),
        _clearCache: clearCache,
        _setCacheTTL: (minutes) => {
            CACHE_CONFIG.TTL = minutes * 60 * 1000
            console.log(`Cache TTL set to ${minutes} minutes`)
        }
    }
    console.log('🔧 propertiesService available on window for debugging')
    console.log('   Try: window.propertiesService._debugCache()')
}