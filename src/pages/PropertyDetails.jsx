import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { propertiesService } from '../services/properties.service.js'
import { avg } from "../services/util.service.js"

import { FiChevronRight, FiShare } from "react-icons/fi"
import { IoHeartOutline } from "react-icons/io5"
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
    const [selectedDates, setSelectedDates] = useState(undefined)
    const { propertyId } = useParams()
    useEffect(() => {

        loadProperty()
    }, [])

    async function loadProperty() {
        try {
            const property = await propertiesService.getById(propertyId)
            console.log(property)
            setProperty(property)

        } catch (err) {
            console.log('Cannot load property')
        }
    }

    function getPropertyRankAvg() {
        const rates = []
        property.reviews.map(review => rates.push(review.rate))
        return avg(rates)
    }

    function handleDateChange(dateRange) {
        setSelectedDates(dateRange)
    }

    return <>
        {property &&
            <div className="px-4 md:px-10 lg:px-20">
                <div className="flex flex-row justify-between items-start pt-6">
                    <h1 className="text-xl md:text-2xl font-semibold">
                        {property.summary} - {property.name}
                    </h1>

                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 p-2 underline cursor-pointer font-semibold hover:bg-gray-100 rounded-md transition">
                            <FiShare size={18} />
                            <span className="hidden text-sm sm:inline">Share</span>
                        </button>
                        <button className="flex items-center gap-2 p-2 underline cursor-pointer font-semibold hover:bg-gray-100 rounded-md transition">
                            <IoHeartOutline size={18} />
                            <span className="hidden text-sm sm:inline">Save</span>
                        </button>
                    </div>
                </div>

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
                    <div className="hidden sm:grid grid-cols-2 grid-rows-2 gap-2">
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
                                    bg-white hover:bg-gray-100 border border-black rounded-md shadow-md transition">
                                        <PiDotsNineBold size={20} />
                                        <span className="text-sm font-semibold cursor-pointer">Show all photos</span>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid grid-cols-5 text-[#222222]">
                    <div className="col-span-3 flex flex-col">
                        <div className="justify-center py-8 border-b border-gray-200">
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
                        <div className="flex flex-row gap-6 py-6 border-b border-gray-200">
                            <img src={property.host.imgUrl} width={40} />
                            <div className="flex flex-col gap-1">
                                <span className="text-md font-semibold">Hosted By {property.host.fullname}</span>
                                <span className="text-sm text-gray-600">3 years hosting</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-8 py-8 border-b border-gray-200">
                            <div className="flex flex-row gap-6">
                                <PiDoorOpen size={24} />
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold">Self check-in</span>
                                    <span className="text-sm">Check yourself in with the lockbox.</span>
                                </div>
                            </div>
                            <div className="flex flex-row gap-6">
                                <CiLocationOn size={24} />
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold">Calm and convenient location</span>
                                    <span className="text-sm">Guests say this area is peaceful and it’s easy to get around.</span>
                                </div>
                            </div>
                            <div className="flex flex-row gap-6">
                                <LuCalendarFold size={24} />
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
                                <button className="bg-gray-100 py-3 rounded-xl px-6 font-semibold cursor-pointer hover:bg-gray-200">Show more</button>
                            </div>
                        </div>
                        <div className="flex flex-col py-12 border-b border-gray-200">
                            <h2 className="font-semibold text-2xl pb-6">Where you'll sleep</h2>
                            <div className="flex flex-row gap-4">
                                <div className="flex flex-col flex-1">
                                    <div className="relative aspect-[4/3] w-full">
                                        <img src={property.imgUrls[3]} alt="bedroom image" className="w-full h-full object-cover cursor-pointer rounded-lg" />
                                    </div>
                                    <span className="font-semibold mt-4">Bedroom</span>
                                    <span className="mt-1">1 king size bed</span>
                                </div>
                                <div className="flex flex-col flex-1">
                                    <div className="relative aspect-[4/3] w-full">
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
                                <button className="mt-6 bg-white border border-gray-900 py-3 px-6 rounded-lg font-semibold cursor-pointer hover:bg-gray-50">
                                    Show all {property.amenities.length} amenities
                                </button>
                            )}
                        </div>
                        <div className="flex flex-col py-12 border-b border-gray-200">
                            <h2 className="text-2xl font-semibold">6 nights in {property.loc.city}</h2>
                            <label className="pt-2">Dates</label>
                            <DetailsDatePicker onFilterChange={handleDateChange} selectedRange={selectedDates} />
                        </div>
                    </div>
                    <div className="relative col-span-2 md:pl-8 lg:pl-14 mt-8 border-b border-gray-200">
                        <div className="sticky top-40 mb-12 self-start">
                            <div className="flex flex-col border border-gray-200 p-6 shadow-lg w-full rounded-lg">
                                <div className="flex flex-row items-end mb-6">
                                    <span className="font-semibold text-xl underline mr-1 cursor-pointer">₪2,885</span>
                                    <span>for 3 nights</span>
                                </div>
                                <div className="cursor-pointer">
                                    <div className="border rounded-md">
                                        <div className="grid grid-cols-2">
                                            <div className="flex flex-col pt-4 px-3 pb-3 border-r">
                                                <span className="text-xs font-semibold">CHECK-IN</span>
                                                <span className="text-sm">12/14/25</span>
                                            </div>
                                            <div className="flex flex-col pt-4 px-3 pb-3">
                                                <span className="text-xs font-semibold">CHECK-OUT</span>
                                                <span className="text-sm">12/14/25</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-row border-t pt-4 px-3 pb-3">
                                            <div className="flex-1">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-semibold">GUESTS</span>
                                                    <span className="text-sm">1 guest, 1 infant</span>
                                                </div>
                                            </div>
                                            <div className="flex-none flex items-center">
                                                <MdOutlineKeyboardArrowDown size={28} />
                                            </div>
                                        </div>
                                    </div>
                                    <button className="bg-rose-500 text-white w-full rounded-full text-lg mt-4 h-12 font-semibold">Reserve</button>
                                </div>
                                <span className="text-center mt-2 text-sm">You won't be charged yet</span>
                            </div>
                            <div className="flex flex-row mt-6 justify-center items-center gap-2 cursor-pointer">
                                <MdFlag className="text-gray-500" />
                                <span className="underline font-semibold text-gray-500">Report this listing</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col py-12 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <span><RxStarFilled size={26} /></span>
                        <span className="text-3xl font-semibold">{getPropertyRankAvg()} &middot; {property.reviews.length} Reviews</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-8">
                        {
                            property.reviews.slice(0, 6).map((review) => (
                                <div key={review.id} className="flex flex-col py-6">
                                    <div className="flex items-start gap-3 mb-3">
                                        <img src={review.by.imgUrl} alt={review.by.fullname} className="w-12 h-12 rounded-full object-cover" />
                                        <div className="flex-1">
                                            <span className="font-semibold block">{review.by.fullname}</span>
                                            <div className="py-2">
                                                <StarRating rating={review.rate} />
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700">{review.txt}</p>
                                </div>
                            ))
                        }
                    </div>
                    {/* {property.reviews.length > 6 &&  */}
                    <div className="mt-4">
                        <button className="bg-gray-100 py-3 rounded-xl px-6 font-semibold cursor-pointer hover:bg-gray-200">Show all {property.reviews.length} reviews</button>
                    </div>
                    {/* )} */}
                </div>
                <div className=" py-12 border-b border-gray-200">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold pb-6">Where you’ll be</h2>
                        <span>{property.loc.city}, {property.loc.countryCode}</span>
                    </div>
                    <div className="h-[480px]">
                        <DetailsMap property={property} />
                    </div>
                    <p className="text-md py-4">This listing's location is verified and the exact location will be provided after booking.</p>
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
                                <div className="flex gap-2 items-center">
                                    <GrLanguage size={24} />
                                    <p>Speaks English</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <PiGlobeStand size={24} />
                                    <p>Lives in {property.loc.city}, {property.loc.countryCode}</p>
                                </div>
                            </div>
                            <div className="flex items-center cursor-pointer hover:underline mb-6">
                                <span className="text-md font-semibold underline">Show more</span>
                                <FiChevronRight size={18} />
                            </div>
                            <button className="bg-gray-100 w-fit py-3 rounded-xl px-6 font-semibold cursor-pointer hover:bg-gray-200 mb-6">
                                Contact host
                            </button>
                            <div className="text-md space-y-1">
                                <p>Response rate: 100%</p>
                                <p>Response within an hour</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }

    </>
}