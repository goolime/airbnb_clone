import { useEffect, useState } from "react"
import { DynamicDropDown } from "../DynamicDropDown"
import { Capacity } from "../search/Capacity"
import { DatePicker } from "../search/DatePicker"
import { Location } from "../search/Location"
import { getDatesString, getGuestsString, getLocationString, guestStringLength } from "../../actions/filter.actions.js"
import { BiSearch } from "react-icons/bi"


export function LargeFilter({
    filterData,
    handleFilterPropertyChange,
    onOpenModal,
    onCloseModal,
    isModalOpen,
    navigateToSearch,
    pendingModalType }) {

    const [isDateModalOpen, setIsDateModalOpen] = useState(false)
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)

    // Open the appropriate modal when pendingModalType changes
    useEffect(() => {
        if (pendingModalType === 'location') {
            setIsDateModalOpen(false);
            setIsGuestModalOpen(false);
            setIsLocationModalOpen(true);
            onOpenModal();
        } else if (pendingModalType === 'date') {
            setIsDateModalOpen(true);
            setIsGuestModalOpen(false);
            setIsLocationModalOpen(false);
            onOpenModal();
        } else if (pendingModalType === 'guest') {
            setIsDateModalOpen(false);
            setIsGuestModalOpen(true);
            setIsLocationModalOpen(false);
            onOpenModal();
        }
    }, [pendingModalType, onOpenModal]);

    return (
        <div className="w-full max-w-4xl mx-auto lg:mt-3 lg:mb-5">
            <div className="
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
                rounded-full 
                shadow-lg 
                transition 
                cursor-pointer
                h-16
            ">
                {isGuestModalOpen &&
                    <DynamicDropDown isModalOpen={isModalOpen} onCloseModal={onCloseModal} width={'w-md'} direction={'right-0'} position={'absolute'} className={'mt-2'}>
                        <Capacity
                            onFilterChange={(value) => handleFilterPropertyChange('guests', value)}
                            initialCapacity={filterData.guests}
                        />
                    </DynamicDropDown>
                }
                {isDateModalOpen &&
                    <DynamicDropDown isModalOpen={isModalOpen} onCloseModal={onCloseModal} width={'w-full'} direction={'right-0'} position={'absolute'} className={'mt-2'}>
                        <DatePicker
                            onFilterChange={(value) => handleFilterPropertyChange('dates', value)}
                            selectedRange={filterData.dates}
                        />
                    </DynamicDropDown>
                }
                {isLocationModalOpen &&
                    <DynamicDropDown isModalOpen={isModalOpen} onCloseModal={onCloseModal} width={'w-md'} direction={'left-0'} position={'absolute'} className={'mt-2'}>
                        <Location
                            onFilterChange={(value) => handleFilterPropertyChange('loc', value)}
                            selectedLocation={filterData.loc}
                        />
                    </DynamicDropDown>
                }
                <div className="hidden sm:grid grid-cols-[1fr_1.5fr_1.5fr] items-center w-full">
                    <div onClick={() => {
                        setIsDateModalOpen(false)
                        setIsGuestModalOpen(false)
                        setIsLocationModalOpen(true)
                        onOpenModal()
                    }}
                        className="flex flex-row text-sm font-semibold relative hover:bg-gray-200 hover:rounded-full text-start py-3 px-6">
                        <div className="flex flex-col">
                            <label className="cursor-pointer">Where</label>
                            <input
                                type="text"
                                className="focus:outline-none placeholder:font-light placeholder:text-gray-500 w-full bg-transparent"
                                placeholder="Search destinations"
                                value={getLocationString(filterData.loc) === "I'm flexible" ? undefined : getLocationString(filterData.loc)}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="relative hover:bg-gray-200 hover:rounded-full">
                        <div onClick={() => {
                            setIsDateModalOpen(true)
                            setIsGuestModalOpen(false)
                            setIsLocationModalOpen(false)
                            onOpenModal()
                        }}
                            className="flex flex-row pl-6 pr-2 py-3 items-center justify-between gap-3 cursor-pointer">
                            <div className="flex flex-col text-sm text-start w-full px-6 border-x border-gray-200 font-semibold min-w-0">
                                <label className="cursor-pointer whitespace-nowrap">When</label>
                                <span className="font-light text-gray-500 truncate block">{getDatesString(filterData.dates)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative hover:bg-gray-200 hover:rounded-full">
                        <div onClick={() => {
                            setIsDateModalOpen(false)
                            setIsGuestModalOpen(true)
                            setIsLocationModalOpen(false)
                            onOpenModal()
                        }}
                            className="flex flex-row pl-6 pr-2 py-3 items-center justify-between gap-3 cursor-pointer">
                            <div className="flex flex-col text-sm text-start font-semibold min-w-0 flex-1">
                                <label className="cursor-pointer whitespace-nowrap">Who</label>
                                <span className="font-light text-gray-500 truncate block">{getGuestsString(filterData.guests, guestStringLength.LONG)}</span>
                            </div>
                            <button
                                className="p-2 bg-rose-500 rounded-full text-white group flex flex-row items-center hover:z-20 flex-shrink-0 transition-all duration-200 hover:px-4"
                                onClick={(ev) => {
                                    ev.stopPropagation()
                                    navigateToSearch()
                                }}
                            >
                                <BiSearch size={24} />
                                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-200 group-hover:ml-2 whitespace-nowrap">Search</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}