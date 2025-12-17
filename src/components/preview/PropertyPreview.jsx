import { Carousel } from "../util/Carousel";
import { calculateRating } from "../../services/util.service";
import { useNavigate } from "react-router";
import { Wishlisted } from "../util/wishlisted";

export function PropertyPreview({ property, checkIn = null, checkOut = null, guests = null, styles, showWishlistIcon = true }) {

    const ratingString = `★${calculateRating(property.reviews)}${property.reviews ? `(${property.reviews.length})` : ''}`;
    const priceString = getPricingString(checkIn, checkOut, property.price);
    const navigate = useNavigate()

    return <>
        <div className={`relative`}>
            {showWishlistIcon && <Wishlisted propertyId={property._id} className="absolute top-1/15 right-1/9 z-5" />}
            <div className="snap-start cursor-pointer flex flex-col items-start"
                onClick={() => {
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
                <div className={`items-center pt-2 pb-1 ${styles.header}`}>
                    <div className="font-semibold">{property.type} in {property.loc.city}</div>
                </div>
                <div className={`${styles.text}`}>{property.summary}</div>
                <div className={`${styles.text}`}>{property.bedrooms} Bedroom{property.bedrooms !== 1 ? 's' : ''} &middot; {property.beds} Bed{property.beds !== 1 ? 's' : ''}</div>
                <div className={`flex mb-2 mt-1 ${styles.text}`}>
                    <div className="text-[#222222] font-semibold">{priceString}</div>
                    <div className="mx-1 font-semibold">&middot;</div>
                    <div>{ratingString}</div>
                </div>
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