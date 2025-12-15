import { useEffect, useState } from "react";
import { UserInteruction } from "../util/UserInteruaction";
import { showServiceAnimalInfo } from "../../services/event-bus.service.js";

export function Capacity({ onFilterChange, initialCapacity }) {

    const [adultsCount, setAdultsCount] = useState(initialCapacity?.adults || 0);
    const [childrenCount, setChildrenCount] = useState(initialCapacity?.kids || 0);
    const [infantsCount, setInfantsCount] = useState(initialCapacity?.infants || 0);
    const [petsCount, setPetsCount] = useState(initialCapacity?.pets || 0);
    const [totalGuests, setTotalGuests] = useState(
        (initialCapacity?.adults || 0) + (initialCapacity?.kids || 0)
    );

    const minAdults = (childrenCount > 0 || infantsCount > 0) ? 1 : 0;

    // Update state when initialCapacity changes (from URL params)
    // Use individual properties as dependencies to avoid object reference issues
    useEffect(() => {
        if (initialCapacity) {
            setAdultsCount(initialCapacity.adults || 0);
            setChildrenCount(initialCapacity.kids || 0);
            setInfantsCount(initialCapacity.infants || 0);
            setPetsCount(initialCapacity.pets || 0);
            setTotalGuests((initialCapacity.adults || 0) + (initialCapacity.kids || 0));
        }
    }, [initialCapacity?.adults, initialCapacity?.kids, initialCapacity?.infants, initialCapacity?.pets]);

    useEffect(() => {
        onFilterChange({
            adults: adultsCount,
            kids: childrenCount,
            infants: infantsCount,
            pets: petsCount
        });
    }, [adultsCount, childrenCount, infantsCount, petsCount])

    function onIncrementAdults() {
        setAdultsCount(adultsCount + 1)
        setTotalGuests(totalGuests + 1)
    }


    function onDecrementAdults() {

        if (adultsCount > minAdults) {
            setAdultsCount(adultsCount - 1)
            setTotalGuests(totalGuests - 1)
        }
    }

    function onIncrementChildren() {
        if (adultsCount === 0)
            onIncrementAdults()
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
        if (adultsCount === 0)
            onIncrementAdults()
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
                <label className="font-semibold text-[#222222] text-md">Adults</label>
                <label className="text-sm text-[#6a6a6a]">Ages 13 or above</label>
            </div>
            <div className="flex flex-row items-center justify-between">
                <button disabled={adultsCount <= minAdults} onClick={onDecrementAdults} className="
                                flex 
                                justify-center
                                items-center
                                w-8 h-8
                                border-1 border-gray-400 
                                rounded-full 
                                cursor-pointer 
                                text-lg
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
                                w-8 h-8
                                border-1 border-gray-400 
                                rounded-full 
                                cursor-pointer 
                                text-lg 
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
                <label className="font-semibold text-[#222222] text-md">Children</label>
                <label className="text-sm text-[#6a6a6a]">Ages 2 - 12</label>
            </div>
            <div className="flex flex-row items-center justify-between">
                <button disabled={childrenCount <= 0} onClick={onDecrementChildren} className="
                                flex 
                                justify-center 
                                items-center 
                                w-8 h-8 
                                border-1 border-gray-400 
                                rounded-full 
                                cursor-pointer 
                                text-lg 
                                font-semibold 
                                text-gray-400
                                hover:border-black
                                hover:text-black
                                disabled:cursor-not-allowed
                                disabled:text-gray-200
                                disabled:border-gray-200
                                ">-</button>
                <div className="flex font-semibold w-10 h-10 justify-center items-center text-black-100">
                    <label className="text-md text-[#222222]">{childrenCount}</label>
                </div>
                <button disabled={totalGuests === 16} onClick={onIncrementChildren} className="
                                flex 
                                justify-center 
                                items-center 
                                w-8 h-8
                                border-1 border-gray-400 
                                rounded-full 
                                cursor-pointer 
                                text-lg
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
                <label className="font-semibold text-[#222222] text-md">Infants</label>
                <label className="text-sm text-[#6a6a6a]">Under 2</label>
            </div>
            <div className="flex flex-row items-center justify-between">
                <button disabled={infantsCount <= 0} onClick={onDecrementInfants} className="
                                flex 
                                justify-center 
                                items-center 
                                w-8 h-8 
                                border-1 border-gray-400 
                                rounded-full 
                                cursor-pointer 
                                text-lg
                                font-semibold 
                                text-gray-400
                                hover:border-black
                                hover:text-black
                                disabled:cursor-not-allowed
                                disabled:text-gray-200
                                disabled:border-gray-200
                                ">-</button>
                <div className="flex font-semibold w-10 h-10 justify-center items-center text-black-100">
                    <label className="text-md text-[#222222]">{infantsCount}</label>
                </div>
                <button disabled={infantsCount === 5} onClick={onIncrementInfants} className="
                                flex 
                                justify-center 
                                items-center 
                                w-8 h-8 
                                border-1 border-gray-400 
                                rounded-full 
                                cursor-pointer 
                                text-lg
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
                <label className="font-semibold text-[#222222] text-md">Pets</label>
                <a href="#" className="text-[#6a6a6a] text-sm font-semibold underline underline-offset-2" onClick={() => showServiceAnimalInfo()}>Bringing a service animal?</a>
            </div>

            <div className="flex flex-row items-center justify-between">
                <button disabled={petsCount <= 0} onClick={onDecrementPets} className="
                                flex 
                                justify-center 
                                items-center 
                                w-8 h-8 
                                border-1 border-gray-400 
                                rounded-full 
                                cursor-pointer 
                                text-lg 
                                font-semibold 
                                text-gray-400
                                hover:border-black
                                hover:text-black
                                disabled:cursor-not-allowed
                                disabled:text-gray-200
                                disabled:border-gray-200
                                ">-</button>
                <div className="flex font-semibold w-10 h-10 justify-center items-center text-black-100">
                    <label className="text-md text-[#222222]">{petsCount}</label>
                </div>
                <button disabled={petsCount === 5} onClick={onIncrementPets} className="
                                flex 
                                justify-center 
                                items-center 
                                w-8 h-8
                                border-1 border-gray-400 
                                rounded-full 
                                cursor-pointer 
                                text-lg
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