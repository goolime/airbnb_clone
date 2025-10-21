import * as React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css'

import { Map, Popup, Marker } from 'react-map-gl/mapbox'
import { getCenter } from 'geolib'
import { useState } from 'react'

export function AppMap({ searchResults, location, checkIn = null, checkOut = null }) {

    const [selectedLocation, setSelectedLocation] = useState({})

    const coordinates = [
        { latitude: location.maxLat, longitude: location.minLng },
        { latitude: location.minLat, longitude: location.maxLng }
    ]

    const center = getCenter(coordinates)

    const [viewPort, setViewPort] = useState({
        longitude: center.longitude,
        latitude: center.latitude,
        zoom: 12
    })

    return (
        <>
            <Map
                mapboxAccessToken="pk.eyJ1IjoidGFwdWNoaXBzIiwiYSI6ImNtZ3l2bWljazE4dGMyanMycjRwcWtvdWUifQ.tadvkssqi_e58IHltgqa8A"
                {...viewPort}
                onMove={event => setViewPort(event.viewState)}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '15px'
                }}
                mapStyle="mapbox://styles/tapuchips/cmgyvwabb007c01quf1ng3u4d"
            >
                {searchResults &&
                    searchResults.map(result => (

                        <Tag key={result._id} property={result} checkIn={checkIn} checkOut={checkOut} />
                    ))
                }
            </Map>
        </>
    )
}

function getPricingString(checkIn, checkOut, price) {

    if (checkIn === null || checkOut === null) return  price 
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const time = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
    return Math.ceil(price * time)
}

function Tag({ property, checkIn = null, checkOut = null }) {


    return <>
        <div key={property._id}>
            <Marker
                longitude={property.loc.lng}
                latitude={property.loc.lat}
                offsetLeft={-20}
                offsetTop={-10}
            >
                <div
                    onClick={() => { setSelectedLocation(property) }}
                    className='
                                    cursor-pointer 
                                    shadow-sm
                                    flex flex-row 
                                    justify-center 
                                    items-center 
                                    bg-(--headerBg) 
                                    w-[66px] 
                                    h-[28] 
                                    border-1 
                                    border-gray-300 
                                    rounded-lg'
                >
                    <label className='text-md font-semibold cursor-pointer'>{getPricingString(checkIn, checkOut, property.price)}€</label>
                </div>
            </Marker>
        </div>
    </>
}