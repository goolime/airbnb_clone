import { Carousel } from "../util/Carousel";
import { calculateRating } from "../../services/util.service";

export function PropertyPreview({ property , checkIn=null, checkOut=null }) {
    const raitingString = `★${calculateRating(property.reviews)}${property.reviews ? `(${property.reviews.length})`: ''}`;
    const priceString = getPricingString(checkIn,checkOut,property.price);
    return <>
        <div className="px-5 sm:px-[2dvw] lg:px-[1dvw] ">
            <Carousel slides={property.imgUrls} className="size-[40dvw] sm:size-[21dvw] md:size-[16dvw] lg:size-[14.5dvw] xl:size-[12.2dvw]"  auto="hover" />
            <div className="flex justify-between items-center mt-2 mb-1 text-gray-900 sm:text-[1.2dvw]">
                <div className="font-semibold ">{property.type}|{property.loc.city}</div>
                <div>{raitingString}</div>
            </div>
            <div className="text-gray-600 sm:text-[1.1dvw]">{property.summary}</div>
            <div className="text-gray-600 sm:text-[1.1dvw]">{property.bedrooms} Bedrooms - {property.beds} Beds</div>
            <div className="text-gray-600 sm:text-[1.1dvw]">{priceString}</div>
        </div>
    </>
}

function getPricingString(checkIn,checkOut,price){
    if (!checkIn || !checkOut) return `${price}€ per night`
    const checkInDate=new Date(checkIn)
    const checkOutDate=new Date(checkOut)
    const time = Math.ceil((checkOutDate-checkInDate)/(1000 * 60 * 60 * 24))
    return `${price * time}€ for ${time} nights`
}