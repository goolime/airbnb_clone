import { BiSearch } from "react-icons/bi"
import { FcHome } from "react-icons/fc"

import { useEffect, useState } from "react"
import { DynamicDropDown } from "./DynamicDropDown"
import { Capacity } from "./search/Capacity"
import { DatePicker } from "./search/DatePicker"
import { Location } from "./search/Location"
import { MobileFilterModal } from "./MobileFilterModal"
import { propertiesService } from "../services/properties.service.js"
import { useLocation, useNavigate } from 'react-router-dom'
import { FilterIcon } from "./util/Icons.jsx"




export function AppFilter() {
    const [filterData, setFilterData] = useState(propertiesService.getDefaultFilter());

    const [totalCapacity, setTotalCapacity] = useState(null)
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDateModalOpen, setIsDateModalOpen] = useState(false)
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)

    const [scrollPosition, setScrollPosition] = useState(0);
    const navigate = useNavigate()
    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {

        window.addEventListener('scroll', HandleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', HandleScroll);
        };

    }, []);

    function HandleScroll() {

        const position = window.pageYOffset;
        setScrollPosition(position);
    }

    function handleFilterPropertyChange(field, value) {

        setFilterData((prevData) => ({
            ...prevData,
            [field]: value,
        }))
    }

    function navigateToSearch() {
        //const searchParams = createSearchParams();
        navigate({ pathname: '/search', search: `?${propertiesService.getSearchParamsFromFilter(filterData).toString()}` });
    }

    function handleFilterModal() {
        setIsFilterModalOpen(true)
    }

    function onCloseFilterModal() {
        setIsFilterModalOpen(false)
    }

    function handleOpenModal() {
        setIsModalOpen(true)
    }

    function onCloseModal() {

        setIsModalOpen(false)
    }


    return <>
        {scrollPosition > 0
            ?
            <div className="hidden sm:flex flex-row items-center justify-center">
                <div className={`flex flex-row items-center rounded-full w-105 h-12 bg-white shadow-md shadow-gray-200 
                border border-gray-200 hover:shadow-gray-300 cursor-pointer transition-all duration-300 ease-in-out origin-center
                    ${scrollPosition > 0
                        ? 'w-105 opacity-100 scale-x-100'
                        : 'w-0 opacity-0 scale-x-0 pointer-events-none'
                    }`}>
                    <div className="grid grid-cols-[40px_repeat(3,minmax(0,1fr))] w-full text-center font-semibold items-center text-sm">
                        <FcHome size={30} className="ml-2" />
                        <span className="pr-4">Homes nearby</span>
                        <span className="border-x border-gray-200 px-4">Any week</span>
                        <span className="px-4">Add guests</span>
                    </div>
                    <div className="pr-2">
                        <div className="flex h-8 w-8 bg-rose-500 rounded-full items-center justify-center shrink-0">
                            <BiSearch size={20} className="text-white" />
                        </div>
                    </div>
                </div>

                {currentPath === '/search' &&
                    <button className="flex flex-row justify-between items-center rounded-full ml-4 px-4 h-10 w-24 
                                   bg-white shadow-md shadow-gray-200 border border-gray-200 hover:shadow-gray-300 
                                   hover:border-gray-500 cursor-pointer">
                        <FilterIcon className="h-6 w-6 text-gray-800 " />
                        <span className="font-semibold text-sm text-gray-800">Filters</span>
                    </button>
                }
            </div>
            :
            // {currentPath === '/search' &&

            // }
            <div className="w-full max-w-4xl mx-auto lg:mt-3 lg:mb-5">
                <div className={`
                relative
                flex
                flex-row
                justify-between
                items-center
                w-full 
                border
                border-gray-200 
                bg-white
                py-2 
                mx-auto
                rounded-full 
                shadow-lg 
                transition 
                cursor-pointer
                h-16
                transition-all 
                duration-300 
                ease-in-out 
                origin-center
                ${scrollPosition === 0
                        ? 'w-full max-w-4xl opacity-100 scale-x-100'
                        : 'w-0 opacity-0 scale-x-0 pointer-events-none absolute'
                    }
            `}>
                    {isGuestModalOpen &&
                        <DynamicDropDown isOpen={isModalOpen} onClose={onCloseModal} width={'w-md'} direction={'right-0'} position={'absolute'}>
                            <Capacity onFilterChange={(value) => handleFilterPropertyChange('guests', value)} />
                        </DynamicDropDown>
                    }
                    {isDateModalOpen &&
                        <DynamicDropDown isOpen={isModalOpen} onClose={onCloseModal} width={'w-full'} direction={'right-0'} position={'absolute'}>
                            <DatePicker onFilterChange={(value) => handleFilterPropertyChange('dates', value)} />
                        </DynamicDropDown>
                    }
                    {isLocationModalOpen &&
                        <DynamicDropDown isOpen={isModalOpen} onClose={onCloseModal} width={'w-md'} direction={'left-0'} position={'absolute'}>
                            <Location onFilterChange={(value) => handleFilterPropertyChange('loc', value)} />
                        </DynamicDropDown>
                    }
                    <div className="hidden sm:grid grid-cols-3 items-center w-full">
                        <div onClick={() => {
                            setIsDateModalOpen(false)
                            setIsGuestModalOpen(false)
                            setIsLocationModalOpen(true)
                            handleOpenModal()
                        }}
                            className="flex flex-col text-sm font-semibold relative hover:bg-gray-200 hover:rounded-full text-start py-3 px-6">
                            <label className="cursor-pointer">Where</label>
                            <input
                                type="text"
                                className="focus:outline-none placeholder:font-light placeholder:text-gray-500"
                                placeholder="Search destinations"
                                value={GetLocationString(filterData.loc) === "I'm flexible" ? undefined : GetLocationString(filterData.loc)}
                            />
                        </div>

                        <div className="relative hover:bg-gray-200 hover:rounded-full">
                            <div onClick={() => {
                                setIsDateModalOpen(true)
                                setIsGuestModalOpen(false)
                                setIsLocationModalOpen(false)
                                handleOpenModal()
                            }}
                                className="
                        flex 
                        flex-row 
                        pl-6 
                        pr-2 
                        py-3
                        items-center 
                        justify-between 
                        gap-3
                        cursor-pointer
                        ">
                                <div className="flex flex-col text-sm text-start w-full px-6 border-x border-gray-200 font-semibold">
                                    <label className="cursor-pointer">When</label>
                                    <span className="font-light text-gray-500">{getDatesString(filterData.dates)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative hover:bg-gray-200 hover:rounded-full">
                            <div onClick={() => {
                                setIsDateModalOpen(false)
                                setIsGuestModalOpen(true)
                                setIsLocationModalOpen(false)
                                handleOpenModal()
                            }}
                                className="
                        flex 
                        flex-row 
                        pl-6 
                        pr-2 
                        py-3
                        items-center 
                        justify-between 
                        gap-3
                        cursor-pointer
                        ">
                                <div className="flex flex-col text-sm text-start font-semibold">
                                    <label className="cursor-pointer">Who</label>
                                    <span className="font-light text-gray-500">{getGuestsString(filterData.guests, GuestStringLength.LONG)}</span>
                                </div>
                                <button className="p-2 bg-rose-500 rounded-full text-white group flex flex-row items-center hover:z-20" onClick={(ev) => {
                                    ev.stopPropagation()
                                    navigateToSearch()
                                }
                                }   >
                                    <BiSearch size={24} />
                                    <span className="hidden group-hover:block">Search</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile */}
                    <div className="sm:hidden w-full">
                        <div className="flex flex-row items-center justify-center px-5" onClick={handleFilterModal}>
                            <BiSearch size={18} />
                            <span className="font-semibold text-gray-800 ml-2">Start your search</span>
                        </div>
                        <div className="z-50">
                            <MobileFilterModal submitSearch={navigateToSearch}
                                handleFilterPropertyChange={handleFilterPropertyChange}
                                isFilterModalOpen={isFilterModalOpen}
                                onFilterModalClose={onCloseFilterModal}
                                isOpen={isModalOpen}
                                onClose={onCloseModal}
                                locationString={GetLocationString(filterData.loc)}
                                datesString={getDatesString(filterData.dates)}
                                guestsString={getGuestsString(filterData.guests, GuestStringLength.LONG)}
                            />
                        </div>

                    </div>
                </div>
            </div>
        }
    </>
}

function GetLocationString({ countryCode, city, maxLat, minLat, maxLng, minLng }) {
    if (city !== '') return city;
    if (maxLat != 90 && minLat != -90 && maxLng != 180 && minLng != -180) return 'Homes in map area';
    return "I'm flexible";
}

function getDatesString({ from, to }) {

    if (from === null || to === null) return 'Add dates';
    if (from.getYear() === to.getYear()) {
        if (from.getMonth() === to.getMonth()) {
            return `${from.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${to.toLocaleDateString('en-US', { day: 'numeric' })}`;
        }
        else {
            return `${from.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${to.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
        }
    }
    else {
        return `${from.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${to.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }
}

const GuestStringLength = Object.freeze({
    SHORT: 'short',
    LONG: 'long',
})

function getGuestsString({ adults, kids, infants, pets }, length) {
    if (adults + kids + infants + pets === 0) return 'Add guests';
    const guests = adults + kids;
    switch (length) {
        case GuestStringLength.SHORT:
            return `${guests === 16 ? `${guests}+` : guests} guest`;
        case GuestStringLength.LONG:
            return `${guests === 16 ? `${guests}+` : guests} guests${infants > 0 ? `, ${infants} infant${infants > 1 ? 's' : ''}` : ''}${pets > 0 ? `, ${pets} pet${pets > 1 ? 's' : ''}` : ''}`;
    }
}