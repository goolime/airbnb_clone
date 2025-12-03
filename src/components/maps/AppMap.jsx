import 'mapbox-gl/dist/mapbox-gl.css'

import { Map, Popup, Marker } from 'react-map-gl/mapbox'
import { getCenter } from 'geolib'
import { useRef, useState, useEffect } from 'react'
import { Carousel } from '../util/Carousel.jsx'

export function AppMap({ searchResults, location, checkIn = null, checkOut = null }) {

    const [selectedLocation, setSelectedLocation] = useState(null)
    const mapRef = useRef(null);

    const coordinates = [
        { latitude: location.maxLat, longitude: location.minLng },
        { latitude: location.minLat, longitude: location.maxLng }
    ]

    const center = getCenter(coordinates)

    const [viewPort, setViewPort] = useState({
        longitude: center.longitude,
        latitude: center.latitude,
        zoom: 10
    })

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.getMap().flyTo({
                center: [center.longitude, center.latitude],
                zoom: 10,
                essential: true,
                duration: 3000,
            });
        }
    }, [center.longitude, center.latitude]);



    return (
        <>
            <Map
                mapboxAccessToken="pk.eyJ1IjoidGFwdWNoaXBzIiwiYSI6ImNtZ3l2bWljazE4dGMyanMycjRwcWtvdWUifQ.tadvkssqi_e58IHltgqa8A"
                {...viewPort}
                ref={mapRef}
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
                        <Tag
                            key={result._id}
                            property={result}
                            checkIn={checkIn}
                            checkOut={checkOut}
                            selectedLocation={selectedLocation}
                            setSelectedLocation={setSelectedLocation}
                        />
                    ))
                }
            </Map>
        </>
    )
}

function getPricingString(checkIn, checkOut, price) {
    if (checkIn === null || checkOut === null) return price
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const time = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
    return Math.ceil(price * time)
}

function Tag({ property, checkIn = null, checkOut = null, selectedLocation, setSelectedLocation }) {
    const isSelected = selectedLocation?._id === property._id
    const styles = {

        carousel: "size-[86dvw] sm:size-[45.5dvw] md:size-[21dvw] lg:size-[21.6dvw] xl:size-[200px]",
        header: "sm:text-[2dvw] md:text-[1.4dvw] lg:text-[1.1dvw] xl:text-[14.2px]",
        text: " sm:text-[1.93dvw] md:text-[1.4dvw] lg:text-[1.1dvw] xl:text-[14.2px]"
    }

    return (
        <Marker
            longitude={property.loc.lng}
            latitude={property.loc.lat}
            offsetLeft={-33}
            offsetTop={-14}
        >
            <div
                onClick={() => setSelectedLocation(property)}
                className={`
                    relative
                    z-40
                    cursor-pointer 
                    flex
                    justify-center 
                    items-center 
                    px-2.5
                    py-1.5
                    border
                    rounded-lg
                    transition-all
                    whitespace-nowrap
                    ${isSelected
                        ? 'bg-gray-900 text-white border-gray-900 scale-110 shadow-lg z-10'
                        : 'bg-white text-gray-900 border-gray-300 hover:scale-105 hover:shadow-md shadow-sm'
                    }
                `}
            >
                <span className='text-sm font-semibold'>
                    €{getPricingString(checkIn, checkOut, property.price)}
                </span>
            </div>
            {isSelected &&
                <div className='fixed z-50 right-0'>

                </div>
            }
        </Marker>
    )
}