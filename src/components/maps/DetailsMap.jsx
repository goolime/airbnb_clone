import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef, useState } from "react";
import { Map, Marker } from 'react-map-gl/mapbox'

import { BsHouseCheckFill } from "react-icons/bs";


export function DetailsMap({ property }) {

    const [viewPort, setViewPort] = useState({
        longitude: property.loc.lng,
        latitude: property.loc.lat,
        zoom: 10
    });

    const mapRef = useRef(null);

    useEffect(() => {
        if (property?.loc) {
            setViewPort({
                longitude: property.loc.lng,
                latitude: property.loc.lat,
                zoom: 17
            });
        }
    }, [property?.loc?.lng, property?.loc?.lat]);

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
                <Marker
                    longitude={property.loc.lng}
                    latitude={property.loc.lat}
                    offsetLeft={-33}
                    offsetTop={-14}

                >
                    <div
                        className={`
                            flex
                    items-center
                    justify-center
                    h-10
                    w-10
                    rounded-full
                    bg-rose-500
                    transition-all
                    whitespace-nowrap
                `}
                    >
                        <BsHouseCheckFill className='text-white' size={22}/>

                    </div>
                </Marker>
            </Map>
        </>
    )
}