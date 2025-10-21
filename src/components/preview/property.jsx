import { Carousel } from "../util/Carousel";
import { calculateRating } from "../../services/util.service";

export function PropertyPreview({ property , checkIn=null, checkOut=null ,styles}) {
    const raitingString = `★${calculateRating(property.reviews)}${property.reviews ? `(${property.reviews.length})`: ''}`;
    const priceString = getPricingString(checkIn,checkOut,property.price);
    return <>
        <div className="snap-start">
            <Carousel slides={property.imgUrls} className={styles.carousel} auto="hover" />
            <div className={`flex justify-between items-center mt-2 mb-1 text-gray-900 ${styles.header}`}>
                <div className="font-semibold">{property.type}|{property.loc.city}</div>
                <div>{raitingString}</div>
            </div>
            <div className={`text-gray-600 ${styles.text}`}>{property.summary}</div>
            <div className={`text-gray-600 ${styles.text}`}>{property.bedrooms} Bedrooms - {property.beds} Beds</div>
            <div className={`text-gray-600 ${styles.text}`}>{priceString}</div>
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