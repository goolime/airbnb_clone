import { useState } from "react";

export function Capacity() {

    const [adultsCount, setAdultsCount] = useState(0);
    const [childrenCount, setChildrenCount] = useState(0);
    const [infantsCount, setInfantsCount] = useState(0);
    const [petsCount, setPetsCount] = useState(0);
    const [totalGuests, setTotalGuests] = useState(0);

    function onIncrementAdults() {
        setAdultsCount(adultsCount + 1)
        setTotalGuests(totalGuests + 1)
    }

    function onDecrementAdults() {
        if (adultsCount > 0) {
            setAdultsCount(adultsCount - 1)
            setTotalGuests(totalGuests - 1)
        }
    }

    function onIncrementChildren() {
        setChildrenCount(childrenCount + 1)
        setTotalGuests(totalGuests + 1)
    }

    function onDecrementChildren() {
        if (childrenCount > 0) {
            setChildrenCount(childrenCount - 1)
            setTotalGuests(totalGuests - 1)
        }
    }

    function onIncrementInfants() {
        setInfantsCount(infantsCount + 1)
    }

    function onDecrementInfants() {
        if (infantsCount > 0) {
            setInfantsCount(infantsCount - 1)
        }
    }

    function onIncrementPets() {
        setPetsCount(petsCount + 1)
    }

    function onDecrementPets() {
        if (petsCount > 0) {
            setPetsCount(petsCount - 1)
        }
    }

    return <>
        <div className="flex flex-row justify-between py-6 pr-1 border-b-1 border-gray-200 z-1000">
            <div className="flex flex-col text-start">
                <label className="font-semibold text-lg">Adults</label>
                <label>Ages 13 or above</label>
            </div>
            <div className="flex flex-row items-center justify-between">
                <button disabled={adultsCount <= 0} onClick={onDecrementAdults} className="
                                flex 
                                justify-center 
                                items-center 
                                w-10 h-10
                                border-2 border-gray-400 
                                rounded-full 
                                cursor-pointer 
                                text-xl 
                                font-semibold 
                                text-gray-400
                                hover:border-black
                                hover:text-black
                                disabled:cursor-not-allowed
                                disabled:text-gray-200
                                disabled:border-gray-200
                                ">-</button>
                <div className="flex font-semibold text-lg w-10 h-10 justify-center items-center text-black-100">
                    <label>{adultsCount}</label>
                </div>
                <button disabled={totalGuests === 16} onClick={onIncrementAdults} className="
                                flex 
                                justify-center 
                                items-center 
                                w-10 h-10
                                border-2 border-gray-400 
                                rounded-full 
                                cursor-pointer 
                                text-xl 
                                font-semibold 
                                text-gray-400
                                hover:border-black
                                hover:text-black
                                disabled:cursor-not-allowed
                                disabled:text-gray-200
                                disabled:border-gray-200
                                ">+</button>
            </div>
        </div>
        <div className="flex flex-row justify-between py-6 pr-1 border-b-1 border-gray-200 ">
            <div className="flex flex-col text-start">
                <label className="font-semibold text-lg">Children</label>
                <label>Ages 2 - 12</label>
            </div>
            <div className="flex flex-row items-center justify-between">
                <button disabled={childrenCount <= 0} onClick={onDecrementChildren} className="
                                flex 
                                justify-center 
                                items-center 
                                w-10 h-10 
                                border-2 border-gray-400 
                                rounded-full 
                                cursor-pointer 
                                text-xl 
                                font-semibold 
                                text-gray-400
                                hover:border-black
                                hover:text-black
                                disabled:cursor-not-allowed
                                disabled:text-gray-200
                                disabled:border-gray-200
                                ">-</button>
                <div className="flex font-semibold text-lg w-10 h-10 justify-center items-center text-black-100">
                    <label>{childrenCount}</label>
                </div>
                <button disabled={totalGuests === 16} onClick={onIncrementChildren} className="
                                flex 
                                justify-center 
                                items-center 
                                w-10 h-10 
                                border-2 border-gray-400 
                                rounded-full 
                                cursor-pointer 
                                text-xl 
                                font-semibold 
                                text-gray-400
                                hover:border-black
                                hover:text-black
                                disabled:cursor-not-allowed
                                disabled:text-gray-200
                                disabled:border-gray-200
                                ">+</button>
            </div>
        </div>
        <div className="flex flex-row justify-between py-6 pr-1 border-b-1 border-gray-200 ">
            <div className="flex flex-col text-start">
                <label className="font-semibold text-lg">Infants</label>
                <label>Under 2</label>
            </div>
            <div className="flex flex-row items-center justify-between">
                <button disabled={infantsCount <= 0} onClick={onDecrementInfants} className="
                                flex 
                                justify-center 
                                items-center 
                                w-10 h-10 
                                border-2 border-gray-400 
                                rounded-full 
                                cursor-pointer 
                                text-xl 
                                font-semibold 
                                text-gray-400
                                hover:border-black
                                hover:text-black
                                disabled:cursor-not-allowed
                                disabled:text-gray-200
                                disabled:border-gray-200
                                ">-</button>
                <div className="flex font-semibold text-lg w-10 h-10 justify-center items-center text-black-100">
                    <label>{infantsCount}</label>
                </div>
                <button disabled={infantsCount === 5} onClick={onIncrementInfants} className="
                                flex 
                                justify-center 
                                items-center 
                                w-10 h-10 
                                border-2 border-gray-400 
                                rounded-full 
                                cursor-pointer 
                                text-xl 
                                font-semibold 
                                text-gray-400
                                hover:border-black
                                hover:text-black
                                disabled:cursor-not-allowed
                                disabled:text-gray-200
                                disabled:border-gray-200
                                ">+</button>
            </div>
        </div>
        <div className="flex flex-row justify-between py-6 pr-1 ">
            <div className="flex flex-col text-start">
                <label className="font-semibold text-lg">Pets</label>
                <a href="#" className="text-gray-500 font-semibold underline underline-offset-2">Bringing a service animal?</a>
            </div>
            <div className="flex flex-row items-center justify-between">
                <button disabled={petsCount <= 0} onClick={onDecrementPets} className="
                                flex 
                                justify-center 
                                items-center 
                                w-10 h-10 
                                border-2 border-gray-400 
                                rounded-full 
                                cursor-pointer 
                                text-xl 
                                font-semibold 
                                text-gray-400
                                hover:border-black
                                hover:text-black
                                disabled:cursor-not-allowed
                                disabled:text-gray-200
                                disabled:border-gray-200
                                ">-</button>
                <div className="flex font-semibold text-lg w-10 h-10 justify-center items-center text-black-100">
                    <label>{petsCount}</label>
                </div>
                <button disabled={petsCount === 5} onClick={onIncrementPets} className="
                                flex 
                                justify-center 
                                items-center 
                                w-10 h-10 
                                border-2 border-gray-400 
                                rounded-full 
                                cursor-pointer 
                                text-xl 
                                font-semibold 
                                text-gray-400
                                hover:border-black
                                hover:text-black
                                disabled:cursor-not-allowed
                                disabled:text-gray-200
                                disabled:border-gray-200
                                ">+</button>
            </div>
        </div>
    </>
}