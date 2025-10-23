import { ListPreview } from "../components/preview/ListPreview.jsx"
import { AppMap } from "../components/AppMap.jsx"
import { useSearchParams } from "react-router"
import { useEffect, useState } from "react"
import { propertiesService } from "../services/properties.service.js"
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
        setFilterData(filter)
    }, [searchParams])

    useEffect(() => {
        if (!filterData) return
            getProperties(filterData, 1).then(({ newProperties, newMaxPage, totalProperties }) => {
                setPage(1)
                setProperties(newProperties)
                setMaxPage(newMaxPage)
                setTotalProperties(totalProperties)
                setLoading(false)
            })
    }, [filterData])

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
            <div className="md:grid md:grid-cols-2">
                <div className="px-12 py-5 overflow-y-auto">
                    <span className="font-semibold my-5 block">{properties.length} homes</span>
                    <ListPreview
                        properties={properties}
                        checkIn={filterData.dates.from}
                        checkOut={filterData.dates.to}
                    />
                </div>

                <div className="sticky top-0 h-screen py-5">
                    <AppMap
                        searchResults={properties}
                        location={filterData?.loc}
                        checkIn={filterData.dates.from}
                        checkOut={filterData.dates.to}
                    />
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
                    <div id="map" className="h-screen">
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
                onClick={() => setMapVisible(!mapVisible)}
                className="md:hidden sticky bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-row gap-2 h-12 justify-center items-center bg-neutral-950 py-2 px-6 text-white rounded-full shadow-lg"
            >
                {mapVisible ? (
                    <>
                        <span className="text-sm font-semibold">Show list</span>
                        <IoListOutline size={20} />
                    </>
                ) : (
                    <>
                        <span className="text-sm font-semibold"><a href="#map">Show map</a></span>
                        <BsMapFill />
                    </>
                )}
            </button>
        </div>
    )
}