

export const propertiesUtil = {
    getEmptyProperty,
    getDefaultFilter,
    getSearchParamsFromFilter,
    getFilterFromSearchParams
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