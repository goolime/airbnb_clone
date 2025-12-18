import { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router"
import { propertiesService } from '../services/properties/index.js'
import { avg } from "../services/util.service.js"
import { FiChevronRight, FiShare } from "react-icons/fi"
import { PiDoorOpen, PiDotsNineBold } from "react-icons/pi"
import { RxStarFilled } from "react-icons/rx"
import { LuCalendarFold } from "react-icons/lu"
import { CiLocationOn } from "react-icons/ci"
import { MdOutlineKeyboardArrowDown, MdFlag } from "react-icons/md"
import { AirConditioner, Tv, Kitchen, HotTub, Heating, WorkSpace, Wifi, Washer, Dryer, HairDryer, Iron, Pool, EvCharger, Parking, Crib, KingSizeBed, Gym, BBQGrill, Breakfast, FirePlace, Smoking, Beachfront, Waterfront, SmokeAlarm, CarbonMonoxideAlarm, ChevronDown, ChevronUp, ChevronRight } from "../components/util/Icons.jsx";
import { TbKey, TbPaw } from "react-icons/tb"
import { PiGlobeStand } from "react-icons/pi";
import { GrLanguage } from "react-icons/gr";
import { DetailsDatePicker } from "../components/search/DetailsDatePicker.jsx"
import { StarRating } from "../components/util/StarRating.jsx"
import { DetailsMap } from "../components/maps/DetailsMap.jsx"
import { DynamicDropDown } from "../components/DynamicDropDown.jsx"
import { Capacity } from "../components/search/Capacity.jsx"
import { getGuestsString, guestStringLength } from "../actions/filter.actions.js"
import { formatLongDate, formatShortDate } from "../services/properties/properties.util.js"
import { Wishlisted } from "../components/util/wishlisted.jsx"
import { store } from "../store/store.js"
import { showLoginModal } from "../services/event-bus.service.js"
import { Carousel } from "../components/util/Carousel.jsx"
import { FaArrowLeft } from "react-icons/fa"


export const amenityList = {
    "A/C": { icon: <AirConditioner className="size-[1.5rem]" />, label: "A/C" },
    "TV": { icon: <Tv className="size-[1.5rem]" />, label: "TV" },
    "Kitchen": { icon: <Kitchen className="size-[1.5rem]" />, label: "Kitchen" },
    "Hot tub": { icon: <HotTub className="size-[1.5rem]" />, label: "Hot tub" },
    "Heating": { icon: <Heating className="size-[1.5rem]" />, label: "Heating" },
    "Workspace": { icon: <WorkSpace className="size-[1.5rem]" />, label: "Dedicated workspace" },
    "Wifi": { icon: <Wifi className="size-[1.5rem]" />, label: "Wifi" },
    "Washer": { icon: <Washer className="size-[1.5rem]" />, label: "Washer" },
    "Dryer": { icon: <Dryer className="size-[1.5rem]" />, label: "Dryer" },
    "Hairdryer": { icon: <HairDryer className="size-[1.5rem]" />, label: "Hair dryer" },
    "Iron": { icon: <Iron className="size-[1.5rem]" />, label: "Iron" },
    "Pool": { icon: <Pool className="size-[1.5rem]" />, label: "Pool" },
    "EV charger": { icon: <EvCharger className="size-[1.5rem]" />, label: "EV charger" },
    "Free Parking": { icon: <Parking className="size-[1.5rem]" />, label: "Free parking" },
    "Crib": { icon: <Crib className="size-[1.5rem]" />, label: "Crib" },
    "King bed": { icon: <KingSizeBed className="size-[1.5rem]" />, label: "King bed" },
    "Gym": { icon: <Gym className="size-[1.5rem]" />, label: "Gym" },
    "Grill": { icon: <BBQGrill className="size-[1.5rem]" />, label: "BBQ Grill" },
    "Breakfast": { icon: <Breakfast className="size-[1.5rem]" />, label: "Breakfast" },
    "FirePlace": { icon: <FirePlace className="size-[1.5rem]" />, label: "Indoor fireplace" },
    "Smoking allowed": { icon: <Smoking className="size-[1.5rem]" />, label: "Smoking allowed" },
    "Beachfront": { icon: <Beachfront className="size-[1.5rem]" />, label: "Beachfront" },
    "Waterfront": { icon: <Waterfront className="size-[1.5rem]" />, label: "Waterfront" },
    "Smoke alarm": { icon: <SmokeAlarm className="size-[1.5rem]" />, label: "Smoke alarm" },
    "Carbon monoxide alarm": { icon: <CarbonMonoxideAlarm className="size-[1.5rem]" />, label: "Carbon monoxide alarm" },
    "Self check-in": { icon: <TbKey className="size-[1.5rem]" />, label: "Self check-in" },
    "Pets allowed": { icon: <TbPaw className="size-[1.5rem]" />, label: "Pets allowed" },
};


export function PropertyDetails() {

    const [property, setProperty] = useState()
    const [searchParams] = useSearchParams()
    const [selectedDates, setSelectedDates] = useState({ from: null, to: null })
    const [selectedCapacity, setSelectedCapacity] = useState({ adults: 0, children: 0, infants: 0, pets: 0 })
    const [isDateModalOpen, setIsDateModalOpen] = useState(false)
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { propertyId } = useParams()
    const [checkInActive, setCheckInActive] = useState(true)
    const [checkOutActive, setCheckOutActive] = useState(false)
    const [carouselIndex, setCarouselIndex] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        loadProperty()
    }, [])

    useEffect(() => {
        setSelectedDates(getDatesFromParams())
        setSelectedCapacity(getGuestsFromParams())
    }, [searchParams])


    async function loadProperty() {
        try {
            const property = await propertiesService.getById(propertyId)
            console.log(property)
            setProperty(property)
        } catch (err) {
            console.log('Cannot load property')
        }
    }

    function onOpenModal() {
        setIsModalOpen(true)
    }

    function onCloseModal() {
        setIsModalOpen(false)
    }

    function getDatesFromParams() {
        const from = searchParams.get('checkIn')
        const to = searchParams.get('checkOut')
        return {
            from: from ? new Date(from) : null,
            to: to ? new Date(to) : null
        }
    }

    function getGuestsFromParams() {
        const adults = parseInt(searchParams.get('adults')) || 0
        const kids = parseInt(searchParams.get('kids')) || 0
        const infants = parseInt(searchParams.get('infants')) || 0
        const pets = parseInt(searchParams.get('pets')) || 0
        return { adults, kids, infants, pets }
    }


    function getPropertyRankAvg() {
        const rates = []
        property.reviews.map(review => rates.push(review.rate))
        return avg(rates)
    }

    function clearDates() {
        setSelectedDates({ from: null, to: null })
    }

    function handleDateChange({ from, to }) {
        setSelectedDates({ from, to })
    }

    function handleCapacityChange({ adults, kids, infants, pets }) {
        setSelectedCapacity({ adults, kids, infants, pets })
    }

    const nights = propertiesService.getNightsFromDateRange(selectedDates.from, selectedDates.to)
    const totalPrice = propertiesService.totalPricePerNight(property?.price, nights)


    // Placeholder
    if (!property) return <>
        <div className="relative px-4 md:px-10 lg:px-20 overflow-y-hidden h-[80vh] animate-pulse">
            <div className="flex flex-row justify-between items-start pt-6">
                <div className="bg-gray-300 h-[2.5rem] w-3/5 rounded-2xl" />
                <div className="flex gap-2">
                    <div className="bg-gray-300 h-[2.5rem] w-12 rounded-2xl" />
                    <div className="bg-gray-300 h-[2.5rem] w-12 rounded-2xl" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-6">
                <div className="relative aspect-[4/3] sm:row-span-2 col-span-2">
                    <div className="bg-gray-300 h-full w-full rounded-l-xl" />
                </div>
                <div className="bg-gray-300 h-full w-full" />
                <div className="bg-gray-300 h-full w-full rounded-tr-xl" />
                <div className="bg-gray-300 h-full w-full" />
                <div className="bg-gray-300 h-full w-full rounded-br-xl" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 text-[#222222]">
                <div className="col-span-3 flex flex-col">
                    <div className="justify-center py-8 border-b border-gray-200">
                        <div className="bg-gray-300 h-[2rem] w-1/3 rounded-2xl mb-4" />
                        <div className="bg-gray-300 h-[1.5rem] w-1/4 rounded-2xl" />
                        <div className="flex flex-row gap-1 items-center mt-2">
                            <div className="bg-gray-300 h-[1.5rem] w-12 rounded-2xl" />
                            <div className="bg-gray-300 h-[1.5rem] w-12 rounded-2xl" />
                            <div className="bg-gray-300 h-[1.5rem] w-12 rounded-2xl" />
                        </div>
                    </div>
                </div>
                <div className="relative col-span-2 md:pl-8 lg:pl-14 mt-8 border-b border-gray-200">
                    <div className="sticky top-40 mb-13 self-start">
                        <div className="bg-gray-300 h-[10rem] w-full rounded-2xl mb-4" />
                    </div>
                </div>
            </div>
        </div>
    </>

    return <>
        {property &&
            <div className="text-[#222222] bg-white">
                {/* Mobile Carousel - Full Width */}
                <div className="sm:hidden relative">
                    <Carousel
                        slides={property.imgUrls}
                        className="aspect-[4/3] w-full"
                        auto={false}
                        currentIndex={carouselIndex}
                        setCurrentIndex={setCarouselIndex}
                    />
                    {/* Image Counter */}
                    <div className="absolute bottom-8 right-4 bg-[#222222]/60 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg backdrop-blur-sm z-10 pointer-events-none">
                        {carouselIndex + 1} / {property.imgUrls.length}
                    </div>

                    {/* Back and Action Buttons*/}
                    <div className="absolute top-4 left-4">
                        <button className="flex justify-center items-center bg-white/60 hover:bg-white rounded-full w-10 h-10 sm:w-8 sm:h-8 shadow-md transition" onClick={() => navigate(-1)}>
                            <FaArrowLeft size={18} />
                        </button>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button className="flex justify-center items-center bg-white/60 hover:bg-white rounded-full w-10 h-10 sm:w-8 sm:h-8 shadow-md transition">
                            <FiShare size={18} />
                        </button>
                        <button className="flex justify-center items-center bg-white/60 hover:bg-white rounded-full w-10 h-10 sm:w-8 sm:h-8 shadow-md transition">
                            <Wishlisted propertyId={property._id} />
                        </button>
                    </div>
                </div>

                {/* Mobile Info Card - Rounded top overlapping carousel */}
                <div className="sm:hidden flex flex-col items-center bg-white -mt-5 relative z-20 pt-6 px-4 rounded-t-3xl">
                    <h1 className="text-2xl font-semibold mb-2">
                        {property.name}
                    </h1>
                    <p className="text-sm text-[#6c6c6c] mb-1">
                        Entire {property.type} in {property.loc.city}, {property.loc.countryCode}
                    </p>
                    <p className="text-sm text-[#6c6c6c] mb-3">
                        {property.capacity.adults + property.capacity.children} guests · {property.bedrooms} bedroom · {property.beds} beds · {property.bathrooms} bath
                    </p>
                    <div className="flex items-center gap-1 pb-6 border-gray-200">
                        <RxStarFilled size={14} />
                        <span className="text-sm font-semibold">{getPropertyRankAvg()}</span>
                        <span className="text-sm">· {property.reviews.length} reviews</span>
                    </div>
                </div>

                {/* Desktop Content Wrapper */}
                <div className="hidden sm:block px-4 md:px-10 lg:px-20">
                    {/* Desktop Header */}
                    <div className="flex flex-row justify-between items-start pt-6">
                        <h1 className="text-xl md:text-2xl font-semibold">
                            {property.summary} - {property.name}
                        </h1>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 p-2 underline cursor-pointer font-semibold hover:bg-[#f7f7f7] rounded-md transition">
                                <FiShare size={18} />
                                <span className="text-sm">Share</span>
                            </button>
                            <button className="flex items-center gap-2 p-2 underline cursor-pointer font-semibold hover:bg-[#f7f7f7] rounded-md transition">
                                <Wishlisted propertyId={property._id} />
                                <span className="text-sm">Save</span>
                            </button>
                        </div>
                    </div>

                    {/* Desktop Images Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-6">
                        {/* Main large image */}
                        <div className="relative aspect-[4/3] sm:row-span-2">
                            <img
                                src={property.imgUrls[0]}
                                alt={`${property.name} main view`}
                                className="w-full h-full object-cover rounded-l-xl cursor-pointer hover:brightness-75 transition"
                            />
                        </div>

                        {/* Grid of smaller images */}
                        <div className="grid grid-cols-2 grid-rows-2 gap-2">
                            {property.imgUrls.slice(1, 5).map((url, index) => (
                                <div key={index} className="relative aspect-[4/3]">
                                    <img
                                        src={url}
                                        alt={`${property.name} view ${index + 2}`}
                                        className={`w-full h-full object-cover cursor-pointer hover:brightness-75 transition
                                        ${index === 1 ? 'rounded-tr-xl' : ''}
                                        ${index === 3 ? 'rounded-br-xl' : ''}`}
                                    />
                                    {index === 3 && (
                                        <button className="absolute w-41 h-8 bottom-4 right-4 flex items-center gap-2 px-4 py-2 
                                        bg-white hover:bg-[#f7f7f7] border border-black rounded-md shadow-md transition">
                                            <PiDotsNineBold size={20} />
                                            <span className="text-sm font-semibold cursor-pointer">Show all photos</span>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content - Both Mobile and Desktop */}
                <div className="px-4 md:px-10 lg:px-20">
                    <div className="grid grid-cols-1 sm:grid-cols-5 text-[#222222]">
                        <div className="col-span-3 flex flex-col">
                            {/* Desktop Property Info */}
                            <div className="hidden sm:flex flex-col justify-center py-8 border-b border-gray-200">
                                <h1 className="text-xl md:text-2xl font-semibold">Entire {property.type} in {property.loc.city}, {property.loc.countryCode}</h1>
                                <span className="flex flex-row items-center">
                                    {property.capacity.adults + property.capacity.children} guests &middot; {property.bedrooms} bedrooms &middot; {property.beds} beds &middot; {property.bathrooms} bathrooms
                                </span>
                                <div className="flex flex-row gap-1 items-center mt-2">
                                    <span><RxStarFilled size={10} /></span>
                                    <span className="text-lg font-semibold">{getPropertyRankAvg()} &middot;</span>
                                    <span className="text-md font-semibold underline cursor-pointer hover:text-black">{property.reviews.length} Reviews</span>
                                </div>
                            </div>
                            <div className="flex flex-row gap-6 py-6 border-y border-gray-200">
                                <img
                                    src={property.host.imgUrl}
                                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                    alt="host-image"
                                />
                                <div className="flex flex-col gap-1">
                                    <span className="text-md font-semibold">Hosted By {property.host.fullname}</span>
                                    <span className="text-sm text-gray-600">3 years hosting</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-8 py-8 border-b border-gray-200">
                                <div className="flex flex-row gap-6">
                                    <PiDoorOpen size={24} className="flex-shrink-0" />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold">Self check-in</span>
                                        <span className="text-sm">Check yourself in with the lockbox.</span>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-6">
                                    <CiLocationOn size={24} className="flex-shrink-0" />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold">Calm and convenient location</span>
                                        <span className="text-sm">Guests say this area is peaceful and its easy to get around.</span>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-6">
                                    <LuCalendarFold size={24} className="flex-shrink-0" />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold">Free cancellation for 24 hours</span>
                                        <span className="text-sm">Get a full refund if you change your mind.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="py-12 border-b border-gray-200">
                                <article className="text-md">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci inventore sunt facere natus repudiandae optio ex ipsa iste,
                                    fuga pariatur animi, veritatis et modi! Temporibus, beatae. Eum inventore beatae accusamus?
                                    <br />
                                    <br />
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    <br />
                                    <br />
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit:
                                    <br />
                                    - Lorem sddfsf...
                                </article>
                                <div className="mt-4">
                                    <button className="bg-gray-100 py-3 rounded-xl px-6 font-semibold cursor-pointer hover:bg-gray-200 transition">Show more</button>
                                </div>
                            </div>

                            <div className="flex flex-col py-12 border-b border-gray-200">
                                <h2 className="font-semibold text-2xl pb-6">Where you'll sleep</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <div className="relative aspect-[4/4] w-full">
                                            <img src={property.imgUrls[3]} alt="bedroom image" className="w-full h-full object-cover cursor-pointer rounded-lg" />
                                        </div>
                                        <span className="font-semibold mt-4">Bedroom</span>
                                        <span className="mt-1">1 king size bed</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="relative aspect-[4/4] w-full">
                                            <img src={property.imgUrls[4]} alt="living room image" className="w-full h-full object-cover cursor-pointer rounded-lg" />
                                        </div>
                                        <span className="font-semibold mt-4">Living room</span>
                                        <span className="mt-1">1 sofa bed, 1 crib</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col py-12 border-b border-gray-200">
                                <h2 className="text-2xl font-semibold pb-6">What this place offers</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {property.amenities.map((amenity, index) => (
                                        <div key={index} className="flex flex-row items-center gap-4">
                                            {amenityList[amenity]?.icon || <PiDoorOpen size={20} />}
                                            <span>{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                                {property.amenities.length > 10 && (
                                    <button className="mt-6 bg-white border border-gray-900 py-3 px-6 rounded-lg font-semibold cursor-pointer hover:bg-gray-50 transition">
                                        Show all {property.amenities.length} amenities
                                    </button>
                                )}
                            </div>

                            <div className="flex flex-col justify-start py-12 border-b border-gray-200">
                                <h2 className="text-2xl font-semibold">{nights} nights in {property.loc.city}</h2>
                                <label className="pt-2 text-gray-500">{selectedDates?.from && selectedDates?.to ? `${formatLongDate(selectedDates?.from)} - ${formatLongDate(selectedDates?.to)}` : 'Add your travel dates for exact pricing'}</label>
                                <div className="hidden lg:block">
                                    <DetailsDatePicker onFilterChange={handleDateChange} selectedRange={selectedDates} monthNum={2} />
                                </div>
                                <div className="lg:hidden">
                                    <DetailsDatePicker onFilterChange={handleDateChange} selectedRange={selectedDates} monthNum={1} />
                                </div>
                            </div>
                        </div>

                        <div className="relative hidden sm:block col-span-2 md:pl-8 lg:pl-14 mt-8 border-b border-gray-200">
                            <div className="sticky top-40 mb-13 self-start">
                                <div className="flex flex-col border border-gray-200 p-6 shadow-lg w-full rounded-lg">
                                    <div className="flex flex-row items-end mb-6">
                                        <span className="font-semibold text-2xl underline mr-1 cursor-pointer">€{totalPrice}</span>
                                        <span>for {nights} nights</span>
                                    </div>
                                    <div className="cursor-pointer">
                                        <div className='border rounded-md'>
                                            <div
                                                className='relative grid grid-cols-2 transition-colors'
                                                onClick={() => {
                                                    setIsDateModalOpen(!isDateModalOpen)
                                                    setIsGuestModalOpen(false)
                                                    onOpenModal()
                                                }}
                                            >
                                                {isDateModalOpen &&
                                                    <DynamicDropDown isModalOpen={isModalOpen} onCloseModal={onCloseModal} width={'w-auto'} direction={'-right-10'} position={'absolute'} className={'!-top-6'}>
                                                        <div className="flex justify-between gap-4">
                                                            <div className="flex flex-1 flex-col">
                                                                <span className="font-semibold text-2xl">{nights} nights</span>
                                                                <span className="text-sm pt-2 text-gray-500">
                                                                    {selectedDates?.from && selectedDates?.to ? `${formatLongDate(selectedDates?.from)} - ${formatLongDate(selectedDates?.to)}` : 'Add your travel dates for exact pricing'}
                                                                </span>
                                                            </div>
                                                            <div className={`flex flex-1 justify-around rounded-lg overflow-hidden ${checkInActive ? 'border-l-0 border-1' : 'border-r-0 border-1'}`}>
                                                                <div className={`flex justify-between items-center pt-4 px-3 pb-3 w-1/2 cursor-pointer ${checkInActive ? 'border-2 border-black rounded-lg bg-white' : 'bg-white'}`}>
                                                                    <div className='flex flex-col'
                                                                        onClick={() => {
                                                                            setCheckInActive(true)
                                                                            setCheckOutActive(false)
                                                                        }}>
                                                                        <span className="text-xs font-semibold">CHECK-IN</span>
                                                                        <span className="text-sm">{formatShortDate(selectedDates?.from) || 'Add date'}</span>
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        className="rounded-full w-7 h-7 flex text-gray-700 font-semibold justify-center cursor-pointer hover:bg-gray-200"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation()
                                                                            clearDates()
                                                                        }}>x
                                                                    </button>
                                                                </div>

                                                                <div className={`flex justify-between items-center pt-4 px-3 pb-3 w-1/2 cursor-pointer ${checkOutActive ? 'border-2 border-black rounded-lg bg-white' : 'bg-white'}`}>
                                                                    <div className='flex flex-col'
                                                                        onClick={() => {
                                                                            setCheckInActive(false)
                                                                            setCheckOutActive(true)
                                                                        }}>
                                                                        <span className="text-xs font-semibold">CHECK-OUT</span>
                                                                        <span className="text-sm">{formatShortDate(selectedDates?.to) || 'Add date'}</span>
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        className="rounded-full w-7 h-7 flex text-gray-700 font-semibold justify-center cursor-pointer hover:bg-gray-200"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation()
                                                                            clearDates()
                                                                        }}>x
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <DetailsDatePicker onFilterChange={handleDateChange} selectedRange={selectedDates} />
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-sm font-semibold rounded-lg hover:bg-gray-100 p-2 underline cursor-pointer" onClick={() => { clearDates() }}>Clear dates</span>
                                                            <button onClick={() => { onCloseModal() }} className="cursor-pointer rounded-lg bg-gray-800 hover:bg-black text-white py-2 px-4 text-sm transition">Close</button>
                                                        </div>
                                                    </DynamicDropDown>
                                                }
                                                <div className={`flex flex-col pt-4 px-3 pb-3 border-r`}>
                                                    <span className="text-xs font-semibold">CHECK-IN</span>
                                                    <span className="text-sm">{formatShortDate(selectedDates?.from) || 'Add date'}</span>
                                                </div>
                                                <div className={`flex flex-col pt-4 px-3 pb-3`}>
                                                    <span className="text-xs font-semibold">CHECK-OUT</span>
                                                    <span className="text-sm">{formatShortDate(selectedDates?.to) || 'Add date'}</span>
                                                </div>
                                            </div>
                                            <div className={`relative flex flex-row border-t pt-4 px-3 pb-3 transition-colors ${isGuestModalOpen && 'border-1 border border-t-2'}`}
                                                onClick={() => {
                                                    setIsDateModalOpen(false)
                                                    setIsGuestModalOpen(!isGuestModalOpen)
                                                    onOpenModal()
                                                }}
                                            >
                                                {isGuestModalOpen &&
                                                    <DynamicDropDown isModalOpen={isModalOpen} onCloseModal={onCloseModal} width={'w-full'} direction={'right-0'} position={'absolute'}>
                                                        <Capacity onFilterChange={handleCapacityChange} initialCapacity={selectedCapacity} />
                                                    </DynamicDropDown>
                                                }
                                                <div className="flex-1">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-semibold">GUESTS</span>
                                                        <span className="text-sm">{getGuestsString(selectedCapacity, guestStringLength.LONG)}</span>
                                                    </div>
                                                </div>
                                                <div className="flex-none flex items-center">
                                                    <MdOutlineKeyboardArrowDown size={28} />
                                                </div>
                                            </div>
                                        </div>
                                        <button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white w-full rounded-lg text-lg mt-4 h-12 font-semibold cursor-pointer transition"
                                            onClick={() => {
                                                if (store.getState().userModule.loggedInUser) {
                                                    const formatDate = (date) => {
                                                        const year = date.getFullYear();
                                                        const month = String(date.getMonth() + 1).padStart(2, '0');
                                                        const day = String(date.getDate()).padStart(2, '0');
                                                        return `${year}-${month}-${day}`;
                                                    };
                                                    const params = new URLSearchParams()
                                                    if (selectedDates.from && selectedDates.to) {
                                                        params.append('checkIn', formatDate(selectedDates.from))
                                                        params.append('checkOut', formatDate(selectedDates.to))
                                                    }
                                                    if (selectedCapacity.adults || selectedCapacity.kids || selectedCapacity.infants || selectedCapacity.pets) {
                                                        params.append('adults', selectedCapacity.adults)
                                                        params.append('kids', selectedCapacity.kids)
                                                        params.append('infants', selectedCapacity.infants)
                                                        params.append('pets', selectedCapacity.pets)
                                                    }
                                                    const queryString = params.toString()
                                                    navigate(`/reservation/${property._id}${queryString ? `?${queryString}` : ''}`)
                                                } else {
                                                    showLoginModal()
                                                }
                                            }}>
                                            Reserve
                                        </button>
                                    </div>
                                    <span className="text-center mt-2 text-sm text-gray-600">You won't be charged yet</span>
                                </div>
                                <div className="flex flex-row mt-6 justify-center items-center gap-2 cursor-pointer hover:underline">
                                    <MdFlag className="text-gray-500" size={16} />
                                    <span className="underline font-semibold text-gray-500 text-sm">Report this listing</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col py-12 border-b border-gray-200">
                        <div className="flex items-center gap-2 mb-8">
                            <span><RxStarFilled size={26} /></span>
                            <span className="text-2xl sm:text-3xl font-semibold">{getPropertyRankAvg()} &middot; {property.reviews.length} Reviews</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                            {property.reviews.slice(0, 6).map((review) => (
                                <div key={review.id} className="flex flex-col">
                                    <div className="flex items-start gap-3 mb-3">
                                        <img src={review.by.imgUrl} alt={review.by.fullname} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0" />
                                        <div className="flex-1">
                                            <span className="font-semibold block text-sm sm:text-base">{review.by.fullname}</span>
                                            <div className="py-2">
                                                <StarRating rating={review.rate} />
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-sm sm:text-base">{review.txt}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6">
                            <button className="bg-gray-100 py-3 rounded-xl px-6 font-semibold cursor-pointer hover:bg-gray-200 transition">Show all {property.reviews.length} reviews</button>
                        </div>
                    </div>

                    <div className="py-12 border-b border-gray-200">
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold pb-6">Where you'll be</h2>
                            <span>{property.loc.city}, {property.loc.countryCode}</span>
                        </div>
                        <div className="h-64 sm:h-96 lg:h-[480px] rounded-xl overflow-hidden">
                            <DetailsMap property={property} />
                        </div>
                        <p className="text-sm sm:text-base py-4 text-gray-600">This listing's location is verified and the exact location will be provided after booking.</p>
                    </div>

                    <div className="py-12">
                        <h2 className="text-2xl font-semibold mb-6">Meet your host</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="grid rounded-3xl border border-gray-200 shadow-lg bg-white p-8 max-w-md items-center">
                                <div className="grid grid-cols-2 gap-8 items-center">
                                    <div className="flex flex-col justify-center items-center">
                                        <img src={property.host.imgUrl} alt={property.host.fullname} className="w-20 h-20 object-cover rounded-full" />
                                        <h3 className="text-xl font-semibold text-center my-2">{property.host.fullname}</h3>
                                        <p className="text-xs text-gray-600">Host</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="border-b border-gray-200 pb-4 mb-4">
                                            <p className="text-2xl font-semibold">{property.reviews.length}</p>
                                            <p className="text-xs text-gray-600">Reviews</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-1">
                                                <span className="text-lg font-semibold">{getPropertyRankAvg()}</span>
                                                <RxStarFilled size={15} />
                                            </div>
                                            <p className="text-xs text-gray-600">Rating</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col text-gray-900">
                                <div className="flex flex-col gap-4 mb-6">
                                    <div className="flex gap-2 items-center text-sm sm:text-base">
                                        <GrLanguage size={24} className="flex-shrink-0" />
                                        <p>Speaks English</p>
                                    </div>
                                    <div className="flex gap-2 items-center text-sm sm:text-base">
                                        <PiGlobeStand size={24} className="flex-shrink-0" />
                                        <p>Lives in {property.loc.city}, {property.loc.countryCode}</p>
                                    </div>
                                </div>
                                <div className="flex items-center cursor-pointer hover:underline mb-6">
                                    <span className="text-sm sm:text-base font-semibold underline">Show more</span>
                                    <FiChevronRight size={18} />
                                </div>
                                <button className="bg-gray-100 w-fit py-3 rounded-xl px-6 font-semibold cursor-pointer hover:bg-gray-200 mb-6 transition">
                                    Contact host
                                </button>
                                <div className="text-sm sm:text-base space-y-1">
                                    <p>Response rate: 100%</p>
                                    <p>Response within an hour</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Mobile Footer */}
                <div className="sm:hidden fixed bottom-0 h-25 left-0 right-0 flex justify-between items-center px-6 py-5 bg-white border-t border-gray-200 w-full shadow-lg z-50">
                    <div className="flex flex-col">
                        <label className="font-semibold text-[#222222] text-md underline mr-1">€{totalPrice}</label>
                        <label className="text-[#6a6a6a] text-xs">for {nights} nights · {formatShortDate(selectedDates?.from)}-{formatShortDate(selectedDates?.to)}</label>
                    </div>
                    <button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 
    text-white w-40 h-12 rounded-full text-lg font-semibold cursor-pointer transition"
                        onClick={() => {
                            if (store.getState().userModule.loggedInUser) {
                                const formatDate = (date) => {
                                    const year = date.getFullYear();
                                    const month = String(date.getMonth() + 1).padStart(2, '0');
                                    const day = String(date.getDate()).padStart(2, '0');
                                    return `${year}-${month}-${day}`;
                                };
                                const params = new URLSearchParams()
                                if (selectedDates.from && selectedDates.to) {
                                    params.append('checkIn', formatDate(selectedDates.from))
                                    params.append('checkOut', formatDate(selectedDates.to))
                                }
                                if (selectedCapacity.adults || selectedCapacity.kids || selectedCapacity.infants || selectedCapacity.pets) {
                                    params.append('adults', selectedCapacity.adults)
                                    params.append('kids', selectedCapacity.kids)
                                    params.append('infants', selectedCapacity.infants)
                                    params.append('pets', selectedCapacity.pets)
                                }
                                const queryString = params.toString()
                                navigate(`/reservation/${property._id}${queryString ? `?${queryString}` : ''}`)
                            } else {
                                showLoginModal()
                            }
                        }}>
                        Reserve
                    </button>
                </div>
            </div>
        }
    </>
}