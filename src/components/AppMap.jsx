import * as React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css'

import { Map, Popup, Marker } from 'react-map-gl/mapbox'
import { getCenter } from 'geolib'
import { useState } from 'react'

export function AppMap({ searchResults, location }) {

    const [selectedLocation, setSelectedLocation] = useState({})

    console.log('searchResults in AppMap:', searchResults);
    console.log('location in AppMap:', location);

    const coordinates = [
        { latitude: location.maxLat, longitude: location.minLng },
        { latitude: location.minLat, longitude: location.maxLng }
    ]

    const center = getCenter(coordinates)
    console.log('center in AppMap:', center);

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
                {/* {
                    <Marker
                        longitude={center.longitude}
                        latitude={center.latitude}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >

                        <div onClick={() => { setSelectedLocation() }} className='cursor-pointer shadow-sm animate-bounce flex flex-row justify-center items-center bg-(--headerBg) w-[66px] h-[28] border-1 border-gray-300 rounded-lg'>
                            <label className='text-md cursor-pointer'>3223$</label>
                            <p className=" text-sm cursor-pointer" aria-label="push-pin">📌</p>
                        </div>

                    </Marker>
                } */}
                {searchResults &&
                    searchResults.map(result => (
                        <div key={result.long}>
                            <Marker
                                longitude={result.lng}
                                latitude={result.lat}
                                offsetLeft={-20}
                                offsetTop={-10}
                            >
                                <div
                                    onClick={() => { setSelectedLocation(result) }}
                                    className='
                                    cursor-pointer 
                                    shadow-sm 
                                    animate-bounce 
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
                                    <label className='text-md cursor-pointer'>{result.price}</label>
                                    <p className=" text-sm cursor-pointer" aria-label="push-pin">📌</p>
                                </div>
                            </Marker>
                        </div>
                    ))
                }
            </Map>
        </>
    )
}