import { Carousel } from "../util/Carousel"
import { calculateRating } from "../../services/util.service"
import { useNavigate, useSearchParams } from "react-router"
import { Wishlisted } from "../util/wishlisted"

export function PropertyPreview({ property, checkIn = null, checkOut = null, guests = null, styles, showWishlistIcon = true }) {

    const ratingString = `★${calculateRating(property.reviews)}${property.reviews ? `(${property.reviews.length})` : ''}`
    const priceString = getPricingString(checkIn, checkOut, property.price)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    // Helper function to format date
    const formatDate = (date) => {
        if (!date) return null
        const d = new Date(date)
        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    return <>
        <div className={`relative`}>
            {showWishlistIcon && <Wishlisted propertyId={property._id} className="absolute top-1/15 right-1/9 z-5" />}
            <div className="snap-start cursor-pointer flex flex-col items-start text-[15px]"
                onClick={() => {
                    const params = new URLSearchParams(searchParams.toString())
                    
                    if (checkIn) {
                        params.set('checkIn', formatDate(checkIn))
                        params.set('checkOut', formatDate(checkOut))
                    }
                    if (guests) {
                        params.set('adults', guests.adults)
                        params.set('kids', guests.kids)
                        params.set('infants', guests.infants)
                        params.set('pets', guests.pets)
                    }
                    
                    const queryString = params.toString()
                    navigate(`/rooms/${property._id}${queryString ? `?${queryString}` : ''}`)
                }}>
                <Carousel slides={property.imgUrls} className={styles.carousel} auto="hover" />
                <div className={`items-center pt-2 pb-1 ${styles.header}`}>
                    <div className="font-semibold">{property.type} in {property.loc.city}</div>
                </div>
                <div className={`${styles.text} mb-1`}>{property.summary}</div>
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