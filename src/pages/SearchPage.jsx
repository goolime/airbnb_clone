import { ListPreview } from "../components/preview/ListPreview.jsx"
import { property } from "../../templates/property.js"
import { AppMap } from "../components/AppMap.jsx"
import { useSearchParams } from "react-router"
import { useEffect, useRef, useState } from "react"
import { propertiesService } from "../services/properties.service.js"
import { getProperties } from "../actions/explore.actions.js"

import { BsMapFill } from "react-icons/bs";
import { IoListOutline } from "react-icons/io5";

export function SearchPage() {

    const [searchParams, setSearchParams] = useSearchParams()
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

    const screenSize = useRef();

    useEffect(() => {
        window.addEventListener("resize", () => {
            screenSize.current = window.innerWidth;
        });
        return () => {
            window.removeEventListener("resize", () => {
                screenSize.current = window.innerWidth;
            })
        }
    }, []);

    const isMediumScreen = screenSize.current >= 750 && screenSize.current < 950;
    if (loading) return <div>Loading...</div>
    
    return (
        <>
            
            <div className="grid sm:grid-cols-1 md:grid-cols-2">
                {!mapVisible &&
                    <div className="px-12 py-5">
                        <span className="font-semibold my-5">{properties.length} homes</span>
                        <ListPreview properties={properties} checkIn={filterData.dates.from} checkOut={filterData.dates.to} />
                    </div>
                }

                {mapVisible &&
                    <div className="md:block sticky top-0 h-screen py-5">
                        <AppMap searchResults={properties} location={filterData?.loc} checkIn={filterData.dates.from} checkOut={filterData.dates.to} />
                    </div>
                }

            </div>
            <button
                onClick={() => { mapVisible ? setMapVisible(false) : setMapVisible(true) }}
                className="
            hidden
            md:hidden
            sm:flex flex-row 
            w-30 h-12 
            justify-between items-center 
            bg-neutral-950 
            py-2 px-4 
            text-white 
            rounded-full
            fixed 
            bottom-8 
            left-1/2 
            -translate-x-1/2
            ">
                {mapVisible ?
                    <>
                        <span className="text-sm font-semibold">Show list</span>
                        <IoListOutline size={20} />
                    </>
                    :
                    <>

                        <span className="text-sm font-semibold">Show map</span>
                        <BsMapFill />
                    </>
                }

            </button>
        </>
    )
}