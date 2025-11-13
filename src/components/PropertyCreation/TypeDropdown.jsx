import { useState } from "react";
import { HouseIcon, ApartmentIcon, GuesthouseIcon, HotelIcon, ChevronDown } from "../util/Icons";

const propertyTypeOptions = [
    { value: 'House', icon: HouseIcon },
    { value: 'Apartment', icon: ApartmentIcon },
    { value: 'Guesthouse', icon: GuesthouseIcon },
    { value: 'Hotel', icon: HotelIcon }
];

export function TypeDropdown({  selectedOption, onSelect,className, placeholder }) {
    const [isOpen, setIsOpen] = useState(false);

    function handleSelect(option) {
        onSelect(option);
        setIsOpen(false);
    }

    const currOption = propertyTypeOptions.find(option => option.value === selectedOption); 


    return <>
        <button className={`${className} text-start ${currOption ? 'text-gray-800' : 'text-gray-400'}`} onClick={() => setIsOpen(!isOpen)} >
            <div className="flex flex-row items-center justify-between w-full">
                {currOption? 
                    <div className='flex flex-row items-center gap-2'><currOption.icon className="w-4 h-4"/> {currOption.value} <span className="text-gray-500">{currOption.code}</span></div> 
                    : 
                    <div>{placeholder}</div>
                }
                <ChevronDown className="w-4 h-4 inline-block ml-2" />
            </div>

        </button>
        {isOpen && <>
            <div className="relative">
                <ul className="absolute bottom-[-10px] z-10 bg-white border border-gray-300 rounded-lg mt-1">
                    {propertyTypeOptions.map(option => (
                        <li key={option.value} onClick={() => handleSelect(option.value)} className="px-4 py-2 hover:bg-gray-100 flex flex-row items-center gap-2 hover:scale-105 hover:border-gray-800 cursor-pointer">
                            <option.icon className="w-4 h-4"/>
                            {option.value}
                        </li>
                    ))}
                </ul>
            </div>
            <div className='fixed inset-0 z-5' onClick={()=>setIsOpen(false)} />
        </>
        }
    </>
}