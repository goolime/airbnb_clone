import { Carousel } from "../util/Carousel";
import { calculateRating } from "../../services/util.service";
import { useNavigate } from "react-router";

export function PropertyPreview({ property, checkIn = null, checkOut = null, guests = null, styles }) {

    const ratingString = `★${calculateRating(property.reviews)}${property.reviews ? `(${property.reviews.length})` : ''}`;
    const priceString = getPricingString(checkIn, checkOut, property.price);
    const navigate = useNavigate()

    return <>
        <div className="snap-start cursor-pointer" onClick={() => {
            const params = new URLSearchParams();
            if (checkIn) {
                params.append('checkIn', checkIn);
                params.append('checkOut', checkOut);
            }
            if (guests) {
                params.append('adults', guests.adults);
                params.append('kids', guests.kids);
                params.append('infants', guests.infants);
                params.append('pets', guests.pets);
            }
            const queryString = params.toString();
            navigate(`/rooms/${property._id}${queryString ? `?${queryString}` : ''}`);
        }}>
            <Carousel slides={property.imgUrls} className={styles.carousel} auto="hover" />
            <div className={`items-center pt-2 pb-1 text-gray-900 ${styles.header}`}>
                <div className="font-semibold">{property.type} | {property.loc.city}</div>
            </div>
            <div className={`text-gray-600 ${styles.text}`}>{property.summary}</div>
            <div className={`text-gray-600 ${styles.text}`}>{property.bedrooms} Bedrooms - {property.beds} Beds</div>
            <div className={`flex text-gray-600 ${styles.text}`}>
                <div>{priceString}</div>
                <div className="mx-1 font-semibold">&middot;</div>
                <div>{ratingString}</div>
            </div>
        </div>
    </>
}

function getPricingString(checkIn, checkOut, price) {
    if (!checkIn || !checkOut) return `${price}€ per night`
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const time = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
    return `${Math.ceil(price * time)}€ for ${time} nights`
}