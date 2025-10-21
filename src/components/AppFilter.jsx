import { useState } from "react"
import { BiSearch } from "react-icons/bi"
import { DynamicDropDown } from "./DynamicDropDown"
import { Capacity } from "./search/Capacity"
import { DatePicker } from "./search/DatePicker"
import { Location } from "./search/Location"
import { MobileFilterModal } from "./MobileFilterModal"
import { propertiesService } from "../services/properties.service.js"
import { useNavigate  } from 'react-router-dom'




export function AppFilter() {
    const [filterData, setFilterData] = useState(propertiesService.getDefaultFilter());

    const [totalCapacity, setTotalCapacity] = useState(null)

    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDateModalOpen, setIsDateModalOpen] = useState(false)
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)

    const navigate = useNavigate()

    

    function handleFilterPropertyChange(field, value) {
        console.log('filter change:', field, value, filterData)
        setFilterData((prevData) => ({
            ...prevData,
            [field]: value,
        }))
    }

    function navigateToSearch() {
        //const searchParams = createSearchParams();
        navigate({pathname: '/search', search: `?${propertiesService.getSearchParamsFromFilter(filterData).toString()}`});
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
        console.log('closing modal')
        setIsModalOpen(false)
    }

    return <>
        <div className="w-full max-w-4xl mx-auto mt-3 mb-5">
            <div className="
                relative
                w-full 
                border
                border-gray-200 
                bg-white
                py-2 
                rounded-full 
                shadow-lg 
                transition 
                cursor-pointer
            ">

                {isGuestModalOpen &&
                    <DynamicDropDown isOpen={isModalOpen} onClose={onCloseModal} width={'w-md'} direction={'right-0'} position={'absolute'}>
                        <Capacity onFilterChange={(value)=> handleFilterPropertyChange('guests',value)}/>
                    </DynamicDropDown>
                }
                {isDateModalOpen &&
                    <DynamicDropDown isOpen={isModalOpen} onClose={onCloseModal} width={'w-full'} direction={'right-0'} position={'absolute'}>
                        <DatePicker onFilterChange={(value)=> handleFilterPropertyChange('dates',value)} />
                    </DynamicDropDown>
                }
                {isLocationModalOpen &&
                    <DynamicDropDown isOpen={isModalOpen} onClose={onCloseModal} width={'w-md'} direction={'left-0'} position={'absolute'}>
                        <Location onFilterChange={(value)=> handleFilterPropertyChange('loc',value)} />
                    </DynamicDropDown>
                }
                <div className="hidden sm:grid grid-cols-3 items-center justify-between">
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
                                <span className="font-light text-gray-500">Add dates</span>
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
                                <span className="font-light text-gray-500">{totalCapacity ? totalCapacity : 'Add guests'}</span>
                            </div>
                            <span className="p-2 bg-rose-500 rounded-full text-white">
                                <BiSearch size={24} />
                            </span>
                        </div>
                    </div>
                </div>

                {/* Mobile */}
                <div className="sm:hidden">
                    <div className="flex flex-row items-center justify-center" onClick={handleFilterModal}>
                        <BiSearch size={18} />
                        <span className="font-semibold text-gray-800 ml-2">Start your search</span>
                    </div>
                    <MobileFilterModal submitSearch={navigateToSearch} handleFilterPropertyChange={handleFilterPropertyChange} isFilterModalOpen={isFilterModalOpen} onFilterModalClose={onCloseFilterModal} isOpen={isModalOpen} onClose={onCloseModal}/>
                </div>
            </div>
        </div>
    </>
}


