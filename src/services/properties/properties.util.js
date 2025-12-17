

export const propertiesUtil = {
    getEmptyProperty,
    getDefaultFilter,
    getSearchParamsFromFilter,
    getFilterFromSearchParams,
    totalPricePerNight,
    getNightsFromDateRange,
    formatLongDate,
    formatShortDate,
    getFreeCancelationDate,
    getOneWeekBeforeCheckInDate
}

function getEmptyProperty(name = '',
    type = null,
    imgUrls = [],
    price = 0,
    summary = '',
    capacity = { adults: 1, kids: 0, infants: 0, pets: 0 },
    amenities = [],
    accessibility = [],
    bathrooms = 1,
    bedrooms = 1,
    beds = 1,
    rules = [],
    labels = [],
    host = undefined,
    loc = { country: null, countryCode: null, city: null, address: null, lat: 0, lng: 0 },
    reviews = []) {
    return {
        name,
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
        dates: { from: null, to: null },
        loc: { countryCode: '', city: '', maxLat: 90, minLat: -90, maxLng: 180, minLng: -180 },
        raiting: 0,
    }
}

function getSearchParamsFromFilter(filterBy) {
    const searchParams = new URLSearchParams()
    for (const field in filterBy) {
        if (Array.isArray(filterBy[field])) {
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
        if (Array.isArray(defaultFilter[field])) {
            //console.log('array field parse:', field, filterBy[field], JSON.parse(searchParams.get(field)))
            filterBy[field] = searchParams.get(field) ? JSON.parse(searchParams.get(field)) : defaultFilter[field]
            continue
        }
        else if (defaultFilter[field] instanceof Object) {
            for (const subField in defaultFilter[field]) {
                const key = `${field}.${subField}`
                filterBy[field] = filterBy[field] || {}
                if (field === 'dates') {
                    filterBy[field][subField] = (searchParams.get(key) && searchParams.get(key) !== "null") ? new Date(searchParams.get(key)) : defaultFilter[field][subField]
                }
                else if (field === 'guests') {
                    filterBy[field][subField] = +searchParams.get(key) || defaultFilter[field][subField]
                }
                else if (field === 'loc') {
                    if (subField === 'countryCode' || subField === 'city') {
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
    if (filterBy.caseSensitive) {
        if (filterBy.caseSensitive === 'true') filterBy.caseSensitive = true
        else filterBy.caseSensitive = false
    }
    return filterBy
}

export function totalPricePerNight(price, nights) {
    return (price * nights).toFixed(2)
}

export function getNightsFromDateRange(from, to) {
    if (!from || !to) return 0;
    const startDay = new Date(from);
    const endDay = new Date(to);
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = endDay.getTime() - startDay.getTime();
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
}

export function formatLongDate(date) {
    if (!date) return '';

    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export function formatShortDate(date) {
    if (!date) return ''
    const d = date instanceof Date ? date : new Date(date)
    if (isNaN(d)) return ''
    return d.toLocaleDateString('en-GB', { day: '2-digit', year: '2-digit', month: '2-digit' })
}

export function getFreeCancelationDate(checkInDate) {

    if (!checkInDate) {
        return null
    }

    const cancelationDate = new Date(checkInDate);

    if (isNaN(cancelationDate.getTime())) {
        return null
    }

    cancelationDate.setDate(cancelationDate.getDate() - 1);

    return cancelationDate;
}

export function getOneWeekBeforeCheckInDate(checkInDate) {

    if (!checkInDate) {
        return null
    }

    const latePaymentDate = new Date(checkInDate);

    if (isNaN(latePaymentDate.getTime())) {
        return null
    }

    latePaymentDate.setDate(latePaymentDate.getDate() - 7);

    return latePaymentDate;
}
