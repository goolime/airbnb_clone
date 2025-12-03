import 'mapbox-gl/dist/mapbox-gl.css'

import { Map, Popup, Marker } from 'react-map-gl/mapbox'
import { getCenter } from 'geolib'
import { useRef, useState, useEffect } from 'react'
import { PropertyPreview } from '../preview/PropertyPreview'

export function AppMap({ searchResults, location, checkIn = null, checkOut = null, guests = null }) {

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
                            guests={guests}
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

function Tag({ property, checkIn = null, checkOut = null, guests = null, selectedLocation, setSelectedLocation }) {

    const isSelected = selectedLocation?._id === property._id
    const styles = {
        carousel: "aspect-[3/2] w-full rounded-b-none",
        header: "text-lg font-semibold px-2 bg-white",
        text: "text-sm text-gray-600 px-2 bg-white"
    }

    const handleClick = (e) => {
        if (e?.stopPropagation) e.stopPropagation()
        if (e?.preventDefault) e.preventDefault()
        setSelectedLocation(property)
    }

    return (
        <>
            <Marker
                longitude={property.loc.lng}
                latitude={property.loc.lat}
                offsetLeft={-33}
                offsetTop={-14}
                onClick={handleClick}
            >
                <div
                    onClick={handleClick}
                    onMouseDown={handleClick}
                    className={`
                        relative
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
                            ? 'bg-gray-900 text-white border-gray-900 scale-110 shadow-lg z-50'
                            : 'bg-white text-gray-900 border-gray-300 hover:scale-105 hover:shadow-md shadow-sm'
                        }
                    `}
                >
                    <span className='text-sm font-semibold'>
                        €{getPricingString(checkIn, checkOut, property.price)}
                    </span>
                </div>
            </Marker>
            {isSelected && (
                <Popup
                    latitude={property.loc.lat}
                    longitude={property.loc.lng}
                    onClose={() => {
                        setSelectedLocation(null)
                    }}
                    closeOnClick={true}
                    closeButton={false}
                    anchor="top"
                    offset={35}
                    className="property-popup"
                >
                    <div className='rounded-xl overflow-hidden shadow-2xl' style={{ width: '320px' }}>
                        <PropertyPreview property={property} key={property._id} styles={styles} checkIn={checkIn} checkOut={checkOut} guests={guests}/>
                        <div className='pt-2 bg-white'></div>
                    </div>
                </Popup>
            )}
        </>
    )
}