import { useNavigate, useParams, useSearchParams } from "react-router"
import { useEffect, useState } from "react"
import { propertiesService } from "../services/properties"
import { calculateRating } from "../services/util.service"
import { formatLongDate, getFreeCancelationDate, getNightsFromDateRange, getOneWeekBeforeCheckInDate } from "../services/properties/properties.util";

import { FaCreditCard } from "react-icons/fa6"
import { FaArrowLeft } from "react-icons/fa6"
import { FaLock } from "react-icons/fa"
import { FaGooglePay } from "react-icons/fa"
import VisaLogo from "../assets/images/visa-logo.png"
import MastercardLogo from "../assets/images/mastercard-logo.png"


export function Reservation() {

    const [property, setProperty] = useState(null)
    const [activeStep, setActiveStep] = useState(1)
    const [completedSteps, setCompletedSteps] = useState({
        step1: false,
        step2: false,
        step3: false
    })
    const { propertyId } = useParams()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    useEffect(() => {

        loadProperty()
    }, [])

    const ratingString = `★ ${calculateRating(property?.reviews)}${property?.reviews ? `(${property?.reviews.length})` : ''}`;
    async function loadProperty() {
        try {
            const property = await propertiesService.getById(propertyId)
            console.log(property)
            setProperty(property)

        } catch (err) {
            console.log('Cannot load property')
        }
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

        return (getNightsFromDateRange(dates.from, dates.to) * property.price) + getTax()
    }

    function getTotalPrice() {
        return getNightsFromDateRange(dates.from, dates.to) * property.price
    }

    function getTax() {
        return (getNightsFromDateRange(dates.from, dates.to) * property.price) * taxRate
    }

    function getFeePrice() {
        return getTotalPriceWithTax() * airDndFee
    }

    let activeOptionStageOne = ``
    function handlePaymentSelection() {


    }

    return (
        <>
            {property &&

                <div className="relative mx-50 pt-8 pb-12">
                    <h2 className="text-3xl font-semibold">Request to book</h2>
                    <button
                        onClick={() => { navigate('/rooms') }}
                        className="absolute top-8 -left-17 w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-300 cursor-pointer flex items-center justify-center"
                    >
                        <FaArrowLeft size={16} />
                    </button>
                    <div className="flex gap-20 mt-6">
                        <div className="w-[59%] flex flex-col gap-6">
                            {activeStep === 1 ? (
                                // EXPANDED VERSION - Full content with options
                                <div className="border-1 border-gray-200 shadow-md rounded-3xl p-6">
                                    <h2 className="text-xl font-semibold">1. Choose when to pay</h2>
                                    <div className="flex flex-col pt-4">
                                        <label className="flex justify-between pb-4 border-b-1 border-gray-200 cursor-pointer">
                                            <p>Pay €{(getTotalPriceWithTax() + getFeePrice()).toFixed(2)} now</p>
                                            <input type="radio" name="payment" value="now"
                                                className="appearance-none w-5 h-5 border-1 border-gray-400 rounded-full
                                            checked:border-black checked:shadow-[inset_0_0_0_2px_white,inset_0_0_0_10px_black] checked:border-[2px] 
                                            transition-all cursor-pointer" onChange={handlePaymentSelection} />
                                        </label>
                                        <label className="flex justify-between py-4 border-b-1 border-gray-200 cursor-pointer">
                                            <div>
                                                <p>Pay ₪0 now</p>
                                                <div className="text-xs text-gray-600">
                                                    <p>Reserve now, pay later with no extra fees.</p>
                                                    <p>You'll be charged €{(getTotalPriceWithTax() + getFeePrice()).toFixed(2)} on {formatLongDate(getOneWeekBeforeCheckInDate(dates.from))}.
                                                        We'll send a reminder 3 days in advance.</p>
                                                </div>
                                            </div>
                                            <input type="radio" name="payment" value="now"
                                                className="appearance-none w-5 h-5 border-1 border-gray-400 rounded-full 
                                            checked:border-black checked:shadow-[inset_0_0_0_2px_white,inset_0_0_0_10px_black] checked:border-[2px] 
                                            transition-all cursor-pointer"/>
                                        </label>
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <button
                                            className="px-6 bg-gray-900 hover:bg-black text-white rounded-xl font-semibold cursor-pointer w-1/4 h-12 flex items-center justify-center"
                                            onClick={() => {
                                                setCompletedSteps({ ...completedSteps, step1: true });
                                                setActiveStep(2);
                                            }}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // COLLAPSED VERSION - Summary only
                                <div className="rounded-xl p-6 border-1 border-gray-200">
                                    <div className="flex justify-between">
                                        <div>
                                            <h2 className="text-xl font-semibold">1. Choose when to pay</h2>
                                            <p className="text-sm text-gray-600">Pay €{(getTotalPriceWithTax() + getFeePrice()).toFixed(2)} now</p>
                                        </div>
                                        <button className="self-center py-2 px-4 bg-gray-100 rounded-lg w-19 h-8 font-semibold text-xs text-gray-900 hover:bg-gray-200 cursor-pointer"
                                            onClick={() => setActiveStep(1)}>
                                            Change
                                        </button>
                                    </div>
                                </div>
                            )}
                            {activeStep === 2 ? (
                                // EXPANDED VERSION - Full content with options
                                <div className="border-1 border-gray-200 shadow-md rounded-3xl p-6">
                                    <h2 className="text-xl font-semibold">1. Choose when to pay</h2>
                                    <div className="flex flex-col pt-4">
                                        <label className="flex justify-between items-center py-5 cursor-pointer">
                                            <div className="flex items-center gap-4 cursor-pointer">
                                                <FaCreditCard size={26} />
                                                <p>Credit or debit card
                                                    <div className="flex">
                                                        <img src={VisaLogo} alt="visa-logo" className="w-8 h-6" />
                                                        <img src={MastercardLogo} alt="mastercard-logo" className="w-8 h-6" />
                                                    </div>
                                                </p>
                                            </div>
                                            <input type="radio" name="payment" value="now"
                                                className="appearance-none w-5 h-5 border-1 border-gray-400 rounded-full
                                            checked:border-black checked:shadow-[inset_0_0_0_2px_white,inset_0_0_0_10px_black] checked:border-[2px] 
                                            transition-all cursor-pointer"/>
                                        </label>
                                        <div className="flex flex-col gap-3 pb-5 border-b-1 border-gray-200">
                                            <div className="border-1 border-gray-500 rounded-xl">
                                                <div className="relative py-3 px-3 border-b-1 border-gray-500">
                                                    <input type="number" placeholder="Card Number" className="w-full" />
                                                    <FaLock
                                                        size={13}
                                                        className="absolute left-28 top-1/2 -translate-y-1/2 text-gray-400"
                                                    />
                                                </div>
                                                <div className="flex">
                                                    <div className="py-3 px-3 w-1/2 border-r-1 border-gray-500">
                                                        <input type="number" placeholder="Expiration" className="w-full" />
                                                    </div>
                                                    <div className="py-3 px-3 w-1/2">
                                                        <input type="number" placeholder="CVV" className="w-full" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border-1 border-gray-500 rounded-xl">
                                                <div className="py-3 px-3 w-full">
                                                    <input type="number" placeholder="ZIP Code" className="w-full" />
                                                </div>
                                            </div>
                                            <div className="border-1 border-gray-500 rounded-xl">
                                                <div className="py-3 px-3 w-full">
                                                    <input type="number" placeholder="Country/Region" className="w-full" />
                                                </div>
                                            </div>
                                        </div>
                                        <label className="flex justify-between items-center py-5 cursor-pointer border-b-1 border-gray-200">
                                            <div className="flex justify-center items-center gap-4 cursor-pointer">
                                                <FaGooglePay size={36} />
                                                <p>Google Pay</p>
                                            </div>
                                            <input type="radio" name="payment" value="now"
                                                className="appearance-none w-5 h-5 border-1 border-gray-400 rounded-full
                                            checked:border-black checked:shadow-[inset_0_0_0_2px_white,inset_0_0_0_10px_black] checked:border-[2px] 
                                            transition-all cursor-pointer"/>
                                        </label>
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <button
                                            className="px-6 bg-gray-900 hover:bg-black text-white rounded-xl font-semibold cursor-pointer w-1/4 h-12 flex items-center justify-center"
                                            onClick={() => {
                                                setCompletedSteps({ ...completedSteps, step2: true });
                                                setActiveStep(3);
                                            }}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // COLLAPSED VERSION - Summary only
                                <div className="rounded-xl p-6 border-1 border-gray-200">
                                    <div className="flex justify-between">
                                        <div>
                                            <h2 className="text-xl font-semibold">2. Add a payment method</h2>
                                            <p className="text-sm text-gray-600">Pay with credit</p>
                                        </div>
                                        <button className="self-center py-2 px-4 bg-gray-100 rounded-lg w-19 h-8 font-semibold text-xs text-gray-900 hover:bg-gray-200 cursor-pointer"
                                            onClick={() => setActiveStep(1)}>
                                            Change
                                        </button>
                                    </div>
                                </div>
                            )}
                            {activeStep === 3 ? (
                                // EXPANDED VERSION - Full content with options
                                <div className="border-1 border-gray-200 shadow-md rounded-3xl p-6">
                                    <h2 className="text-xl font-semibold">3. Review your reservation</h2>
                                    <p className="flex text-sm text-gray-600">By selecting the button, I agree to the <p className="ml-1 font-semibold underline">booking terms</p>.</p>
                                    <div className="flex justify-end mt-4">
                                        <button
                                            className="px-6 bg-black text-white rounded-xl font-semibold cursor-pointer w-full h-12 flex items-center justify-center"
                                            onClick={() => {
                                                setCompletedSteps({ ...completedSteps, step1: true });
                                                setActiveStep(2);
                                            }}
                                        >
                                            Pay
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // COLLAPSED VERSION - Summary only
                                <div className="rounded-xl p-6 border-1 border-gray-200">
                                    <div className="flex justify-between">
                                        <div>
                                            <h2 className="text-xl font-semibold">3. Review your reservation</h2>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="w-[41%] flex flex-col p-6 border-1 border-gray-200 rounded-3xl">
                            <div className="flex flex-row">
                                <img src={property?.imgUrls[0]} className="w-27 h-27 rounded-lg object-cover flex-shrink-0 mr-4" />
                                <div className="flex-col">
                                    <h2 className="font-semibold text-lg">Chic duplex in Montmartre: Jacuzzi & Home Cinema</h2>
                                    <label className="text-xs font-semibold">{ratingString}</label>
                                </div>
                            </div>
                            <div className="flex flex-col border-b-1 border-gray-200 py-4">
                                <span className="text-sm font-semibold mb-1">Free cancelation</span>
                                <span className="text-sm">Cancel before {formatLongDate(getFreeCancelationDate(dates.from))} for a full refund.</span>
                            </div>
                            <div className="flex flex-row justify-between border-b-1 border-gray-200 py-4">
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold mb-2">Dates</span>
                                    <span className="text-sm">{formatLongDate(dates.from)}-{formatLongDate(dates.to)}</span>
                                </div>
                                <button className="py-2 px-4 bg-gray-100 rounded-lg w-19 h-8 font-semibold text-xs text-gray-900 hover:bg-gray-200 cursor-pointer">Change</button>
                            </div>
                            <div className="flex flex-row justify-between border-b-1 border-gray-200 py-4">
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold mb-2">Guests</span>
                                    <span className="text-sm">
                                        {`${getGuestsFromParams().adults} ${getGuestsFromParams().adults > 1 ? 'adults' : 'adult'}, 
                                    ${getGuestsFromParams().kids} ${getGuestsFromParams().kids > 1 ? 'children' : 'child'}, 
                                    ${getGuestsFromParams().infants} ${getGuestsFromParams().infants > 1 ? 'infants' : 'infant'}, 
                                    ${getGuestsFromParams().pets} ${getGuestsFromParams().pets > 1 ? 'pets' : 'pet'}`}
                                    </span>
                                </div>
                                <button className="py-2 px-4 bg-gray-100 rounded-lg w-19 h-8 font-semibold text-xs text-gray-900 hover:bg-gray-200 cursor-pointer">Change</button>
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
                </div>
            }
        </>
    )
}