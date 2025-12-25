import { useEffect, useCallback, useMemo, useRef, useState } from "react"
import { DynamicDropDown } from "../DynamicDropDown"
import { Capacity } from "../search/Capacity"
import { DatePicker } from "../search/DatePicker"
import { Location } from "../search/Location"
import { getDatesString, getGuestsString, getLocationString, guestStringLength } from "../../actions/filter.actions.js"
import { BiSearch } from "react-icons/bi"
import { propertiesService } from "../../services/properties/index.js"

const MODAL_TYPES = {
    LOCATION: 'location',
    DATE: 'date',
    GUEST: 'guest'
}

export function LargeFilter({
    filterData,
    handleFilterPropertyChange,
    onOpenModal,
    onCloseModal,
    isModalOpen,
    navigateToSearch,
    pendingModalType
}) {
    const [activeModal, setActiveModal] = useState(null)
    const [prevActiveModal, setPrevActiveModal] = useState(null)
    const [previousModalForPosition, setPreviousModalForPosition] = useState('')
    const [showIndicator, setShowIndicator] = useState(false)
    const [isLeftDivider, setIsLeftDivider] = useState(true)
    const [isRightDivider, setIsRightDivider] = useState(true)
    const [indicatorStyle, setIndicatorStyle] = useState({})

    const whereRef = useRef(null)
    const whenRef = useRef(null)
    const whoRef = useRef(null)

    // Memoized check functions
    const hasLocationValue = useMemo(() =>
        filterData.loc && getLocationString(filterData.loc) !== "I'm flexible"
        , [filterData.loc])

    const hasDateValue = useMemo(() =>
        filterData.dates && getDatesString(filterData.dates) !== 'Add dates'
        , [filterData.dates])

    const hasGuestValue = useMemo(() =>
        filterData.guests && getGuestsString(filterData.guests, guestStringLength.LONG) !== 'Add guests'
        , [filterData.guests])

    // Memoized modal configuration
    const modalConfig = useMemo(() => ({
        [MODAL_TYPES.LOCATION]: {
            ref: whereRef,
            Component: Location,
            props: {
                onFilterChange: (value) => handleFilterPropertyChange('loc', value),
                selectedLocation: filterData.loc
            }
        },
        [MODAL_TYPES.DATE]: {
            ref: whenRef,
            Component: DatePicker,
            props: {
                onFilterChange: (value) => handleFilterPropertyChange('dates', value),
                selectedRange: filterData.dates
            }
        },
        [MODAL_TYPES.GUEST]: {
            ref: whoRef,
            Component: Capacity,
            props: {
                onFilterChange: (value) => handleFilterPropertyChange('guests', value),
                initialCapacity: filterData.guests
            }
        }
    }), [filterData, handleFilterPropertyChange])

    // Calculate indicator position
    useEffect(() => {
        if (!activeModal || !isModalOpen) {
            setShowIndicator(false)
            return
        }

        const activeRef = modalConfig[activeModal]?.ref
        if (!activeRef?.current) return

        const rect = activeRef.current.getBoundingClientRect()
        const parentRect = activeRef.current.parentElement.getBoundingClientRect()

        setIndicatorStyle({
            width: rect.width,
            left: rect.left - parentRect.left,
            height: rect.height,
            top: rect.top - parentRect.top
        })

        setShowIndicator(false)
        setTimeout(() => setShowIndicator(true), 10)
    }, [activeModal, isModalOpen, modalConfig])

    // Reset state when modal closes
    useEffect(() => {
        if (!isModalOpen) {
            setActiveModal(null)
            setPrevActiveModal(null)
            setIsLeftDivider(true)
            setIsRightDivider(true)
        }
    }, [isModalOpen])

    // Handle pending modal
    useEffect(() => {
        if (pendingModalType) {
            setActiveModal(pendingModalType)
            onOpenModal()
        }
    }, [pendingModalType, onOpenModal])

    // Callbacks
    const handleTabClick = useCallback((modalType) => {
        setPrevActiveModal(activeModal)
        setActiveModal(modalType)
        setPreviousModalForPosition(activeModal)
        onOpenModal()

        // Update dividers
        if (modalType === MODAL_TYPES.LOCATION) {
            setIsLeftDivider(false)
            setIsRightDivider(true)
        } else if (modalType === MODAL_TYPES.DATE) {
            setIsLeftDivider(false)
            setIsRightDivider(false)
        } else if (modalType === MODAL_TYPES.GUEST) {
            setIsLeftDivider(true)
            setIsRightDivider(false)
        }
    }, [activeModal, onOpenModal])

    const getModalWidth = useCallback(() =>
        activeModal === MODAL_TYPES.DATE ? 'w-[800px]' : 'w-[400px]'
        , [activeModal])

    const getModalDirection = useCallback(() => {
        if (activeModal === MODAL_TYPES.LOCATION) return 'left-0'
        if (activeModal === MODAL_TYPES.DATE && previousModalForPosition === MODAL_TYPES.LOCATION) return 'left-0'
        return 'right-0'
    }, [activeModal, previousModalForPosition])

    const renderModalContent = useCallback(() => {
        if (!activeModal || !modalConfig[activeModal]) return null
        const { Component, props } = modalConfig[activeModal]
        return <Component {...props} />
    }, [activeModal, modalConfig])

    // Clear button component
    const ClearButton = useCallback(({ show, onClear }) => (
        <div className={`transition-all duration-300 ease-in-out ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
            }`}>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onClear()
                }}
                className="flex w-8 h-8 rounded-full justify-center items-center text-sm text-[#222222] 
                    font-semibold cursor-pointer hover:bg-[#f7f7f7] transition-colors"
            >
                ×
            </button>
        </div>
    ), [])

    return (
        <div className="max-w-4xl mx-auto lg:mt-3 lg:mb-5 px-4 pointer-events-none">
            <div className="relative flex flex-row justify-between items-center w-full min-w-[700px] 
                border border-[#DDDDDD] bg-white py-2 rounded-full shadow-lg transition cursor-pointer 
                h-16 pointer-events-auto z-50">

                {activeModal && (
                    <DynamicDropDown
                        isModalOpen={isModalOpen}
                        onCloseModal={onCloseModal}
                        width={getModalWidth()}
                        direction={getModalDirection()}
                        position="absolute"
                        className={`mt-2 ${activeModal === MODAL_TYPES.DATE ? 'w-full' : ''}`}
                        modalType={activeModal}
                        prevModalType={prevActiveModal}
                    >
                        {renderModalContent()}
                    </DynamicDropDown>
                )}

                {/* Dividers */}
                {isLeftDivider && (
                    <div className="absolute left-1/3 bg-[#DDDDDD] h-8 w-[1px] z-10" />
                )}
                {isRightDivider && (
                    <div className="absolute left-2/3 bg-[#DDDDDD] h-8 w-[1px] z-10" />
                )}

                <div className={`relative hidden sm:grid grid-cols-[1fr_1fr_1fr] gap-1 items-center w-full 
                    ${activeModal && isModalOpen ? 'bg-[#ebebeb] rounded-full' : ''}`}>

                    {/* White indicator */}
                    {activeModal && isModalOpen && (
                        <div
                            className={`absolute bg-white border-y-1 border-[#DDDDDD] rounded-full shadow-md transition-all duration-300 ease-out ${showIndicator ? 'scale-100 opacity-100' : 'scale-70 opacity-0'
                                }`}
                            style={{
                                ...indicatorStyle,
                                transformOrigin: 'center center',
                                zIndex: 10
                            }}
                        />
                    )}

                    {/* Where Tab */}
                    <div
                        ref={whereRef}
                        className={`relative w-full ${!activeModal ? 'hover:bg-[#ebebeb] hover:rounded-full' : ''} 
                            ${activeModal === MODAL_TYPES.LOCATION && isModalOpen ? 'z-20' : ''}`}
                        onMouseEnter={() => setIsLeftDivider(false)}
                        onMouseLeave={() => !isModalOpen && setIsLeftDivider(true)}
                    >
                        <div
                            data-filter-section
                            onClick={(e) => {
                                e.stopPropagation()
                                handleTabClick(MODAL_TYPES.LOCATION)
                            }}
                            className="flex flex-row text-sm w-full items-center text-start py-3 px-6 h-[64px]"
                        >
                            <div className="flex flex-row justify-between items-center w-full">
                                <div className="flex-col flex-1">
                                    <label className="cursor-pointer text-xs text-[#222222] font-medium">Where</label>
                                    <input
                                        type="text"
                                        className="focus:outline-none font-semibold text-[#222222] placeholder:font-light 
                                            placeholder:text-[#6a6a6a] placeholder:text-sm w-full bg-transparent"
                                        placeholder="Search destinations"
                                        value={getLocationString(filterData.loc) === "I'm flexible" ? '' : getLocationString(filterData.loc)}
                                        onChange={(e) => handleFilterPropertyChange('loc', e.target.value)}
                                    />
                                </div>
                                <ClearButton
                                    show={activeModal === MODAL_TYPES.LOCATION && isModalOpen && hasLocationValue}
                                    onClear={() => handleFilterPropertyChange('loc', propertiesService.getDefaultFilter().loc)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* When Tab */}
                    <div
                        ref={whenRef}
                        className={`relative w-full ${!activeModal ? 'hover:bg-[#ebebeb] hover:rounded-full' : ''} 
                            ${activeModal === MODAL_TYPES.DATE && isModalOpen ? 'z-20' : ''}`}
                        onMouseEnter={() => {
                            setIsLeftDivider(false)
                            setIsRightDivider(false)
                        }}
                        onMouseLeave={() => {
                            if (!isModalOpen) {
                                setIsLeftDivider(true)
                                setIsRightDivider(true)
                            }
                        }}
                    >
                        <div
                            data-filter-section
                            onClick={(e) => {
                                e.stopPropagation()
                                handleTabClick(MODAL_TYPES.DATE)
                            }}
                            className="flex flex-row px-6 py-3 items-center w-full cursor-pointer h-[64px]"
                        >
                            <div className="flex flex-row justify-between items-center w-full">
                                <div className="flex-1 flex-col text-sm text-start">
                                    <label className="cursor-pointer text-xs text-[#222222] font-medium">When</label>
                                    <span className={`${getDatesString(filterData.dates) === 'Add dates'
                                        ? 'font-light text-[#6a6a6a]'
                                        : 'font-semibold text-[#222222]'} text-sm truncate block`}>
                                        {getDatesString(filterData.dates)}
                                    </span>
                                </div>
                                <ClearButton
                                    show={activeModal === MODAL_TYPES.DATE && isModalOpen && hasDateValue}
                                    onClear={() => handleFilterPropertyChange('dates', propertiesService.getDefaultFilter().dates)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Who Tab */}
                    <div
                        ref={whoRef}
                        className={`relative w-full ${!activeModal ? 'hover:bg-[#ebebeb] hover:rounded-full' : ''} 
                            ${activeModal === MODAL_TYPES.GUEST && isModalOpen ? 'z-20' : ''}`}
                        onMouseEnter={() => setIsRightDivider(false)}
                        onMouseLeave={() => !isModalOpen && setIsRightDivider(true)}
                    >
                        <div
                            data-filter-section
                            onClick={(e) => {
                                e.stopPropagation()
                                handleTabClick(MODAL_TYPES.GUEST)
                            }}
                            className="flex flex-row pl-6 pr-2 py-3 items-center justify-between w-full cursor-pointer h-[64px]"
                        >
                            <div className="flex flex-row justify-between items-center w-full">
                                <div className="flex-1 flex-col text-sm text-start">
                                    <label className="cursor-pointer whitespace-nowrap text-xs text-[#222222] font-medium">Who</label>
                                    <span className={`${getGuestsString(filterData.guests, guestStringLength.LONG) === 'Add guests'
                                        ? 'font-light text-[#6a6a6a]'
                                        : 'font-semibold text-[#222222]'} text-sm truncate block`}>
                                        <span className="sm:hidden md:hidden">
                                            {getGuestsString(filterData.guests, guestStringLength.LONG).slice(0, 10)}
                                            {getGuestsString(filterData.guests, guestStringLength.LONG).length > 10 && '...'}
                                        </span>
                                        <span className="hidden sm:inline md:hidden">
                                            {getGuestsString(filterData.guests, guestStringLength.LONG).slice(0, 10)}
                                            {getGuestsString(filterData.guests, guestStringLength.LONG).length > 10 && '...'}
                                        </span>
                                        <span className="hidden md:inline">
                                            {getGuestsString(filterData.guests, guestStringLength.LONG).slice(0, 20)}
                                            {getGuestsString(filterData.guests, guestStringLength.LONG).length > 22 && '...'}
                                        </span>
                                    </span>
                                </div>
                                <div className={`relative flex justify-center items-center transition-all duration-300 ease-in-out ${activeModal === MODAL_TYPES.GUEST && isModalOpen && hasGuestValue
                                    ? 'opacity-100 scale-100'
                                    : 'opacity-0 scale-0 pointer-events-none'
                                    }`}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleFilterPropertyChange('guests', propertiesService.getDefaultFilter().guests)
                                        }}
                                        className="absolute right-2 flex w-8 h-8 rounded-full justify-center items-center text-sm text-[#222222] 
                                            font-semibold cursor-pointer hover:bg-[#f7f7f7] transition-colors"
                                    >
                                        ×
                                    </button>
                                </div>
                                <button
                                    className={`p-2 z-30 bg-rose-500 rounded-full text-white flex flex-row justify-center items-center 
                                        flex-shrink-0 transition-all duration-300 ease-out hover:bg-rose-700 cursor-pointer
                                        ${activeModal && isModalOpen ? 'max-w-[100px] bg-gradient-to-r from-[#E61E4D] to-[#E31C5F]' : ''}`}
                                    onClick={(ev) => {
                                        ev.stopPropagation()
                                        navigateToSearch()
                                        onCloseModal()
                                    }}
                                >
                                    <BiSearch size={24} className="flex-shrink-0" />
                                    <span className={`overflow-hidden transition-all duration-500 ease-out whitespace-nowrap font-medium 
                                        ${activeModal && isModalOpen ? 'max-w-[80px] ml-1' : 'max-w-0'}`}>
                                        Search
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}