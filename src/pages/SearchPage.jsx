import { ListPreview } from "../components/preview/ListPreview.jsx"
import { AppMap } from "../components/AppMap.jsx"
import { useSearchParams } from "react-router"
import { useEffect, useState } from "react"
import { propertiesService } from "../services/properties.service.js"
import { getProperties } from "../actions/explore.actions.js"
import { BsMapFill } from "react-icons/bs"
import { IoListOutline } from "react-icons/io5"

export function SearchPage() {
    const [searchParams] = useSearchParams()
    const [filterData, setFilterData] = useState(null)
    const [properties, setProperties] = useState([])
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [mapVisible, setMapVisible] = useState(false)

    useEffect(() => {
        const filter = propertiesService.getFilterFromSearchParams(searchParams)
        setFilterData(filter)
    }, [searchParams])

    useEffect(() => {
        if (!filterData) return
        getProperties(filterData, 1).then(({ newProperties, newMaxPage }) => {
            setPage(1)
            setProperties(newProperties)
            setMaxPage(newMaxPage)
            setLoading(false)
        })
    }, [filterData])

    if (loading) return <div>Loading...</div>

    return (
        <div className="relative">
            <div className="hidden md:grid md:grid-cols-2">
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
                        <span className="font-semibold my-5 block">{properties.length} homes</span>
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