import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { propertiesService } from '../services/properties.service.js'
import { avg } from "../services/util.service.js"

import { FiShare } from "react-icons/fi"
import { IoHeartOutline } from "react-icons/io5"
import { PiDoorOpen, PiDotsNineBold } from "react-icons/pi"
import { RxStarFilled } from "react-icons/rx"
import { LuCalendarFold } from "react-icons/lu"
import { CiLocationOn } from "react-icons/ci"
import { TbToolsKitchen, TbToolsKitchen2 } from "react-icons/tb"



export function PropertyDetails() {

    const [property, setProperty] = useState()
    const propertyId = useParams()
    console.log(propertyId)
    useEffect(() => {
        loadProperty()
    }, [])

    async function loadProperty() {
        try {
            const property = await propertiesService.getById('dDlgWU')
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

    return <>
        {property &&
            <div className="px-4 md:px-10 lg:px-20">
                <div className="flex flex-row justify-between items-start pt-6">
                    <h1 className="text-xl md:text-2xl font-semibold">
                        {property.summary} - {property.name}
                    </h1>

                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 p-2 underline font-semibold hover:bg-gray-100 rounded-md transition">
                            <FiShare size={20} />
                            <span className="hidden sm:inline">Share</span>
                        </button>
                        <button className="flex items-center gap-2 p-2 underline font-semibold hover:bg-gray-100 rounded-md transition">
                            <IoHeartOutline size={20} />
                            <span className="hidden sm:inline">Save</span>
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

                <div className="grid grid-cols sm:grid grid-cols-5 text-[#222222]">
                    <div className="col-span-3 flex flex-col">
                        <div className="justify-center py-8 border-b border-gray-200">
                            <h1 className="text-lg md:text-xl font-semibold">Entire {property.type} in {property.loc.city}, {property.loc.countryCode}</h1>
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
                            <h2 className="font-semibold text-xl pb-6">Where you'll sleep</h2>
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
                            <h2 className="text-xl font-semibold pb-6">What this place offers</h2>
                            <div className="grid grid-cols-2">
                                <div className="col-span-1">
                                    <TbToolsKitchen2 />
                                </div>
                                <div className="col-span-1">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative col-span-2 ml-auto">
                        <div className="sticky flex flex-col border border-gray-200 p-6 shadow-lg w-full max-w-sm rounded-lg top-40 mt-8">
                            <div className="flex flex-row items-end">
                                <span className="font-semibold text-xl underline mr-1">₪2,885</span>
                                <span>for 3 nights</span>
                            </div>
                            <div className="border-1 rounded-md">
                                <div className="flex flex-cols-2">
                                    <div className="flex flex-col">
                                        <span className="text-xs">CHECK-IN</span>
                                        <span>12/14/25</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs">CHECK-OUT</span>
                                        <span>12/14/25</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }

    </>
}