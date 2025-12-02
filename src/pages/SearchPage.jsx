import { ListPreview } from "../components/preview/ListPreview.jsx"
import { AppMap } from "../components/maps/AppMap.jsx"
import { useSearchParams } from "react-router"
import { useEffect, useRef, useState } from "react"
import { propertiesService } from "../services/properties/index.js"
import { getProperties } from "../actions/explore.actions.js"
import { BsMapFill } from "react-icons/bs"
import { IoListOutline } from "react-icons/io5"
import { ListPlaceholder } from "../components/preview/ListPlaceholder.jsx"

export function SearchPage() {
    const [searchParams] = useSearchParams()
    const [filterData, setFilterData] = useState(null)
    const [properties, setProperties] = useState([])
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [mapVisible, setMapVisible] = useState(false)
    const [totalProperties, setTotalProperties] = useState(0)

    useEffect(() => {
        const filter = propertiesService.getFilterFromSearchParams(searchParams)
        console.log('Location data from URL:', filter.loc)
        setFilterData(filter)
    }, [searchParams])

    useEffect(() => {
        if (!filterData) return
        console.log('Filter Data:', filterData); // Add this line
        getProperties(filterData, 1).then(({ newProperties, newMaxPage, totalProperties }) => {
            setPage(1)
            setProperties(newProperties)
            setMaxPage(newMaxPage)
            setTotalProperties(totalProperties)
            setLoading(false)
        })
    }, [filterData])

    const mapRef = useRef(null);

    function handleToggleMap() {
        setMapVisible(!mapVisible);

        if (!mapVisible) {
            setTimeout(() => {
                console.log('Attempting to scroll to map');
                if (mapRef.current) {
                    mapRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    console.log('Map ref not found');
                }
            }, 100);
        }
    }

    if (loading) return <>
        <div className="relative  animate-pulse h-[80vh] overflow-hidden mask-luminance mask-b-from-white mask-b-from-50% mask-b-to-black">
            <div className=" md:grid md:grid-cols-2">
                <div className="px-12 py-5 overflow-y-auto animate-pulse">
                    <ListPlaceholder />
                </div>
                <div className="max-md:hidden">
                    <div className="w-1/1 h-[80vh] bg-gray-300 rounded-3xl mt-5" />
                </div>
            </div>
        </div>
    </>

    return (
        <div className="relative">
            <div className="hidden md:grid md:grid-cols-2 gap-6">
                <div className="p-5">
                    <span className="font-semibold mb-5 block">{properties.length} homes</span>
                    <ListPreview
                        properties={properties}
                        checkIn={filterData.dates.from}
                        checkOut={filterData.dates.to}
                        guests={filterData.guests}
                    />
                </div>

                <div className="relative">
                    <div className="sticky pl-5 pr-3 top-37 pb-6 h-[calc(95vh-7rem)]">
                        <AppMap
                            searchResults={properties}
                            location={filterData?.loc}
                            checkIn={filterData.dates.from}
                            checkOut={filterData.dates.to}
                        />
                    </div>
                </div>
            </div>

            <div className="md:hidden">
                {!mapVisible ? (
                    <div className="px-6 py-5">
                        <span className="font-semibold my-5 block">{totalProperties} homes</span>
                        <ListPreview
                            properties={properties}
                            checkIn={filterData.dates.from}
                            checkOut={filterData.dates.to}
                        />
                    </div>
                ) : (
                    <div ref={mapRef} className="h-screen fixed inset-0">
                        <AppMap
                            searchResults={properties}
                            location={filterData?.loc}
                            checkIn={filterData.dates.from}
                            checkOut={filterData.dates.to}
                        />
                    </div>
                )}
            </div>

            <button
                onClick={handleToggleMap}
                className="
                md:hidden 
                fixed 
                bottom-8 
                left-1/2 
                -translate-x-1/2 
                z-10 
                flex flex-row 
                gap-2
                h-12 
                justify-center 
                items-center 
                bg-neutral-950 
                py-2 px-6 
                text-white 
                rounded-full 
                shadow-lg
                "
            >
                {mapVisible ? (
                    <>
                        <span className="text-sm font-semibold">Show list</span>
                        <IoListOutline size={20} />
                    </>
                ) : (
                    <>
                        <span className="text-sm font-semibold">Show map</span>
                        <BsMapFill />
                    </>
                )}
            </button>
        </div>
    )
}