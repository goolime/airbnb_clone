import { useNavigate, useParams, useSearchParams } from "react-router"
import { useEffect, useState } from "react"
import { propertiesService } from "../services/properties"
import { calculateRating } from "../services/util.service"
import { formatLongDate, getFreeCancelationDate, getNightsFromDateRange, getOneWeekBeforeCheckInDate } from "../services/properties/properties.util";
import { ordersService } from "../services/orders/index.js";
import { FaCreditCard } from "react-icons/fa6"
import { FaArrowLeft } from "react-icons/fa6"
import { FaLock } from "react-icons/fa"
import { FaGooglePay } from "react-icons/fa"
import VisaLogo from "../assets/images/visa-logo.png"
import MastercardLogo from "../assets/images/mastercard-logo.png"
import { store } from "../store/store.js";
import { showCapacitySelector, showDateSelector } from "../services/event-bus.service.js";
import { DateSelectorModal } from "../components/DateSelectorModal.jsx";
import { CapacitySelectorModal } from "../components/CapacitySelectorModal.jsx";


export function Reservation() {

    const [property, setProperty] = useState(null)
    const [selectedDates, setSelectedDates] = useState({ from: null, to: null })
    const [selectedCapacity, setSelectedCapacity] = useState({ adults: 0, kids: 0, infants: 0, pets: 0 })
    const [activeStep, setActiveStep] = useState(1)
    const [paymentTiming, setPaymentTiming] = useState("now")
    const [paymentMethod, setPaymentMethod] = useState("credit")
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "4532015112830366",
        expiration: "12/25",
        cvv: "123",
        zipCode: "10001",
        country: "United States"
    })
    const { propertyId } = useParams()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        loadProperty()
    }, [])

    useEffect(() => {
        setSelectedCapacity(getGuestsFromParams());
        setSelectedDates(getDatesFromParams());
    }, [searchParams]);

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    const ratingString = `★ ${calculateRating(property?.reviews)}${property?.reviews ? ` (${property?.reviews.length})` : ''}`;

    async function loadProperty() {
        try {
            const property = await propertiesService.getById(propertyId)
            setProperty(property)

        } catch (err) {
            console.log('Cannot load property')
        }
    }


    function handleDateChange({ from, to }) {
        setSelectedDates({ from, to })
    }

    function handleCapacityChange({ adults, kids, infants, pets }) {

        setSelectedCapacity({ adults, kids, infants, pets })
    }

    function getDatesFromParams() {
        const from = searchParams.get('checkIn')
        const to = searchParams.get('checkOut')
        return {
            from: from ? new Date(from) : null,
            to: to ? new Date(to) : null
        }
    }

    const dates = getDatesFromParams()

    function getGuestsFromParams() {
        const adults = parseInt(searchParams.get('adults')) || 0
        const kids = parseInt(searchParams.get('kids')) || 0
        const infants = parseInt(searchParams.get('infants')) || 0
        const pets = parseInt(searchParams.get('pets')) || 0
        return { adults, kids, infants, pets }
    }

    const taxRate = 0.18
    const airDndFee = 0.10

    function getTotalPriceWithTax() {
        if (!dates.from || !dates.to) return 0;
        return (getNightsFromDateRange(dates.from, dates.to) * property.price) + getTax()
    }

    function getTotalPrice() {
        if (!dates.from || !dates.to) return 0;
        return getNightsFromDateRange(dates.from, dates.to) * property.price
    }

    function getTax() {
        if (!dates.from || !dates.to) return 0;
        return (getNightsFromDateRange(dates.from, dates.to) * property.price) * taxRate
    }

    function getFeePrice() {
        return getTotalPriceWithTax() * airDndFee
    }

    function handlePayment() {

        ordersService.save({
            propertyId: propertyId,
            guest: store.getState().userModule.loggedInUser._id,
            checkIn: getDatesFromParams().from,
            checkOut: getDatesFromParams().to,
            guests: {
                adults: selectedCapacity.adults,
                kids: selectedCapacity.kids,
                infants: selectedCapacity.infants,
                pets: selectedCapacity.pets
            }
        })

        navigate('/')
    }

    const params = new URLSearchParams();
    if (getDatesFromParams().from) {
        params.append('checkIn', getDatesFromParams().from);
        params.append('checkOut', getDatesFromParams().to);
    }
    if (getGuestsFromParams()) {
        params.append('adults', getGuestsFromParams().adults);
        params.append('kids', getGuestsFromParams().kids);
        params.append('infants', getGuestsFromParams().infants);
        params.append('pets', getGuestsFromParams().pets);
    }
    const queryString = params.toString();

    return (
        <>
            {property &&
                <div className="relative sm:mx-50 text-[#222222] md:mx-17 lg:mx-25 xl:40 2xl:50 pt-8 pb-12">
                    <div className="relative mx-24 sm:mx-0">
                        <h2 className="text-3xl font-semibold">Request to book</h2>
                        <button
                            onClick={() => { navigate(`/rooms/${property._id}${queryString ? `?${queryString}` : ''}`) }}
                            className="absolute top-0 -left-17 w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-300 cursor-pointer flex items-center justify-center"
                        >
                            <FaArrowLeft size={16} />
                        </button>
                    </div>
                    <div className="flex flex-col-reverse p-8 sm:p-0 md:flex md:flex-row gap-10 lg:gap-15 xl:gap-20 mt-6">
                        <div className="w-full md:w-[59%] flex flex-col gap-6">
                            {activeStep === 1 ? (
                                <div className="border-1 border-gray-200 shadow-md rounded-3xl p-6 animate-[slideIn_0.3s_ease-out]">
                                    <h2 className="text-xl font-semibold">1. Choose when to pay</h2>
                                    <div className="flex flex-col pt-4">
                                        <label className="flex justify-between pb-4 border-b-1 border-gray-200 cursor-pointer">
                                            <p>Pay €{(getTotalPriceWithTax() + getFeePrice()).toFixed(2)} now</p>
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="now"
                                                checked={paymentTiming === 'now'}
                                                onChange={(e) => setPaymentTiming(e.target.value)}
                                                className="appearance-none w-5 h-5 border-1 border-gray-400 rounded-full
                                                    checked:border-black checked:shadow-[inset_0_0_0_2px_white,inset_0_0_0_10px_black] checked:border-[2px] 
                                                    transition-all cursor-pointer"
                                            />
                                        </label>
                                        <label className="flex justify-between py-4 border-b-1 border-gray-200 cursor-pointer">
                                            <div>
                                                <p>Pay €0 now</p>
                                                <div className="text-xs text-gray-600">
                                                    <p>Reserve now, pay later with no extra fees.</p>
                                                    {dates.from && dates.to ? (
                                                        <>
                                                            <p>You'll be charged €{(getTotalPriceWithTax() + getFeePrice()).toFixed(2)} on {formatLongDate(getOneWeekBeforeCheckInDate(dates.from))}.</p>
                                                            <p>We'll send a reminder 3 days in advance.</p>
                                                        </>
                                                    ) : (
                                                        <p>Please select dates to see payment schedule.</p>
                                                    )}
                                                </div>
                                            </div>
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="later"
                                                checked={paymentTiming === 'later'}
                                                onChange={(e) => setPaymentTiming(e.target.value)}
                                                className="appearance-none w-5 h-5 border-1 border-gray-400 rounded-full 
                                                checked:border-black checked:shadow-[inset_0_0_0_2px_white,inset_0_0_0_10px_black] checked:border-[2px] 
                                                transition-all cursor-pointer"
                                            />
                                        </label>
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <button
                                            className="px-6 bg-[#222222] hover:bg-black text-white rounded-xl font-semibold cursor-pointer w-1/4 h-12 flex items-center justify-center"
                                            onClick={() => setActiveStep(2)}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-xl p-6 border-1 border-gray-200 transition-all duration-700">
                                    <div className="flex justify-between">
                                        <div>
                                            <h2 className="text-xl font-semibold">1. Choose when to pay</h2>
                                            <p className="text-sm text-gray-600">
                                                {paymentTiming === 'now' ? `Pay €${(getTotalPriceWithTax() + getFeePrice()).toFixed(2)} now` : 'Pay €0 now'}
                                            </p>
                                        </div>
                                        <button className="self-center py-2 px-4 bg-[#f2f2f2] rounded-lg w-19 h-8 font-semibold text-xs text-[#222222] hover:bg-[#ebebeb] cursor-pointer"
                                            onClick={() => setActiveStep(1)}>
                                            Change
                                        </button>
                                    </div>
                                </div>
                            )}
                            {activeStep === 2 ? (
                                <div className="border-1 border-gray-200 shadow-md rounded-3xl p-6 animate-[slideIn_0.3s_ease-out]">
                                    <h2 className="text-xl font-semibold">2. Add a payment method</h2>
                                    <div className="flex flex-col pt-4">
                                        <label className="flex justify-between items-center py-5 cursor-pointer">
                                            <div className="flex items-center gap-4 cursor-pointer">
                                                <FaCreditCard size={26} />
                                                <div>Credit or debit card
                                                    <div className="flex">
                                                        <img src={VisaLogo} alt="visa-logo" className="w-8 h-6" />
                                                        <img src={MastercardLogo} alt="mastercard-logo" className="w-8 h-6" />
                                                    </div>
                                                </div>
                                            </div>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="credit"
                                                checked={paymentMethod === 'credit'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="appearance-none w-5 h-5 border-1 border-gray-400 rounded-full
                                                    checked:border-black checked:shadow-[inset_0_0_0_2px_white,inset_0_0_0_10px_black] checked:border-[2px] 
                                                    transition-all cursor-pointer"
                                            />
                                        </label>
                                        {paymentMethod === 'credit' && (
                                            <div className="flex flex-col gap-3 pb-5 border-b-1 border-gray-200">
                                                <div className="border-1 border-gray-500 rounded-xl">
                                                    <div className="relative py-3 px-3 border-b-1 border-gray-500">
                                                        <input
                                                            type="text"
                                                            placeholder="Card Number"
                                                            value={cardDetails.cardNumber}
                                                            onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                                                            className="w-full"
                                                        />
                                                        <FaLock
                                                            size={13}
                                                            className="absolute left-40 top-1/2 -translate-y-1/2 text-gray-400"
                                                        />
                                                    </div>
                                                    <div className="flex">
                                                        <div className="py-3 px-3 w-1/2 border-r-1 border-gray-500">
                                                            <input
                                                                type="text"
                                                                placeholder="Expiration"
                                                                value={cardDetails.expiration}
                                                                onChange={(e) => setCardDetails({ ...cardDetails, expiration: e.target.value })}
                                                                className="w-full"
                                                            />
                                                        </div>
                                                        <div className="py-3 px-3 w-1/2">
                                                            <input
                                                                type="text"
                                                                placeholder="CVV"
                                                                value={cardDetails.cvv}
                                                                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="border-1 border-gray-500 rounded-xl">
                                                    <div className="py-3 px-3 w-full">
                                                        <input
                                                            type="text"
                                                            placeholder="ZIP Code"
                                                            value={cardDetails.zipCode}
                                                            onChange={(e) => setCardDetails({ ...cardDetails, zipCode: e.target.value })}
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="border-1 border-gray-500 rounded-xl">
                                                    <div className="py-3 px-3 w-full">
                                                        <input
                                                            type="text"
                                                            placeholder="Country/Region"
                                                            value={cardDetails.country}
                                                            onChange={(e) => setCardDetails({ ...cardDetails, country: e.target.value })}
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <label className="flex justify-between items-center py-5 cursor-pointer border-b-1 border-gray-200">
                                            <div className="flex justify-center items-center gap-4 cursor-pointer">
                                                <FaGooglePay size={36} />
                                                <p>Google Pay</p>
                                            </div>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="google"
                                                checked={paymentMethod === 'google'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="appearance-none w-5 h-5 border-1 border-gray-400 rounded-full
                                                    checked:border-black checked:shadow-[inset_0_0_0_2px_white,inset_0_0_0_10px_black] checked:border-[2px] 
                                                    transition-all cursor-pointer"
                                            />
                                        </label>
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <button
                                            className="px-6 bg-[#222222] hover:bg-black text-white rounded-xl font-semibold cursor-pointer w-1/4 h-12 flex items-center justify-center"
                                            onClick={() => setActiveStep(3)}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            ) : activeStep > 2 ? (
                                <div className="rounded-xl p-6 border-1 border-gray-200 transition-all duration-700">
                                    <div className="flex justify-between">
                                        <div>
                                            <h2 className="text-xl font-semibold">2. Add a payment method</h2>
                                            <p className="text-sm text-gray-600">
                                                {paymentMethod === 'credit' ? 'Credit or debit card' : 'Google Pay'}
                                            </p>
                                        </div>
                                        <button className="self-center py-2 px-4 bg-[#f2f2f2] rounded-lg w-19 h-8 font-semibold text-xs text-[#222222] hover:bg-[#ebebeb] cursor-pointer"
                                            onClick={() => setActiveStep(2)}>
                                            Change
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-xl p-6 border-1 border-gray-200 transition-all duration-700 opacity-50">
                                    <h2 className="text-xl font-semibold text-gray-400">2. Add a payment method</h2>
                                </div>
                            )}
                            {activeStep === 3 ? (
                                <div className="border-1 border-gray-200 shadow-md rounded-3xl p-6 animate-[slideIn_0.3s_ease-out]">
                                    <h2 className="text-xl font-semibold">3. Review your reservation</h2>
                                    <p className="text-sm text-gray-600">
                                        By selecting the button, I agree to the{' '}
                                        <span className="font-semibold underline">booking terms</span>.
                                    </p>
                                    <div className="flex justify-end mt-4">
                                        <button
                                            className="px-6 bg-black text-white rounded-xl font-semibold cursor-pointer w-full h-12 flex items-center justify-center"
                                            onClick={handlePayment}
                                        >
                                            Pay €{(getTotalPriceWithTax() + getFeePrice()).toFixed(2)}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-xl p-6 border-1 border-gray-200 transition-all duration-700 opacity-50">
                                    <div className="flex justify-between">
                                        <div>
                                            <h2 className="text-xl font-semibold">3. Review your reservation</h2>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="w-full md:w-[41%] text-[#222222] flex flex-col p-6 border-1 border-gray-200 rounded-3xl">
                            <div className="flex flex-row">
                                <img src={property?.imgUrls[0]} className="w-27 h-27 rounded-lg object-cover flex-shrink-0 mr-4" />
                                <div className="flex-col">
                                    <h2 className="font-semibold text-lg">{property.name} in {property.loc.city}: {property.summary}</h2>
                                    <label className="text-xs font-semibold">{ratingString}</label>
                                </div>
                            </div>
                            <div className="flex flex-col border-b-1 border-gray-200 py-4">
                                <span className="text-sm font-semibold mb-1">Free cancelation</span>
                                <span className="text-sm">
                                    {dates.from ? (
                                        `Cancel before ${formatLongDate(getFreeCancelationDate(dates.from))} for a full refund.`
                                    ) : (
                                        'Select dates to see cancellation policy.'
                                    )}
                                </span>
                            </div>
                            <div className="flex flex-row justify-between border-b-1 border-gray-200 py-4">
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold mb-2">Dates</span>
                                    <span className="text-sm">
                                        {dates.from && dates.to
                                            ? `${formatLongDate(dates.from)}-${formatLongDate(dates.to)}`
                                            : 'Add dates'
                                        }
                                    </span>
                                </div>
                                <button className="py-2 px-4 bg-[#f2f2f2] rounded-lg w-19 h-8 text-[#222222] font-semibold text-xs hover:bg-[#ebebeb] cursor-pointer"
                                    onClick={() => showDateSelector()}>
                                    Change
                                </button>
                            </div>
                            <div className="flex flex-row justify-between border-b-1 border-gray-200 py-4">
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold mb-2">Guests</span>
                                    <span className="text-sm">
                                        {`
                                            ${getGuestsFromParams().adults} ${getGuestsFromParams().adults > 1 ? 'adults' : 'adult'}, 
                                            ${getGuestsFromParams().kids} ${getGuestsFromParams().kids > 1 ? 'children' : 'child'}, 
                                            ${getGuestsFromParams().infants} ${getGuestsFromParams().infants > 1 ? 'infants' : 'infant'}, 
                                            ${getGuestsFromParams().pets} ${getGuestsFromParams().pets > 1 ? 'pets' : 'pet'}
                                        `}
                                    </span>
                                </div>
                                <button className="py-2 px-4 bg-[#f2f2f2] rounded-lg w-19 h-8 font-semibold text-xs text-[#222222] hover:bg-[#ebebeb] cursor-pointer"
                                    onClick={() => showCapacitySelector()}>
                                    Change
                                </button>
                            </div>
                            <div className="border-b-1 border-gray-200 py-4">
                                <span className="text-sm font-semibold mb-2 block">Price details</span>
                                <div className="flex flex-row justify-between">
                                    <span className="text-sm">{getNightsFromDateRange(dates.from, dates.to)} nights x €{property.price}</span>
                                    <span className="text-sm">€{getTotalPrice().toFixed(2)}</span>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <span className="text-sm">Taxes</span>
                                    <span className="text-sm">€{getTax().toFixed(2)}</span>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <span className="text-sm">Airdnd fee</span>
                                    <span className="text-sm">€{getFeePrice().toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="pt-4">
                                <div className="flex flex-row justify-between">
                                    <span className="text-sm font-semibold">Total EUR</span>
                                    <span className="text-sm font-semibold">€{(getTotalPriceWithTax() + getFeePrice()).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DateSelectorModal handleDateChange={handleDateChange} selectedRange={selectedDates} />
                    <CapacitySelectorModal handleCapacityChange={handleCapacityChange} initialCapacity={getGuestsFromParams()} />
                </div>
            }
        </>
    )
}