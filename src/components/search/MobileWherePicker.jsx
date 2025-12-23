import { BsBank } from "react-icons/bs";
import { getCities } from "../../actions/explore.actions"
import { BiSearch } from "react-icons/bi"
import { TbLocation } from "react-icons/tb";

export function MobileWherePicker({ onFilterChange }) {
    const cities = getCities();
    return <>
        {/* Search Input */}
        <div className="flex items-center gap-3 border-1 border-gray-400 rounded-xl px-4 py-3 mb-6 focus-within:ring-2 focus-within:ring-black transition">
            <BiSearch size={20} className="text-[#6a6a6a]" />
            <input
                type="text"
                placeholder="Search destinations"
                className="flex-1 focus:outline-none"
            />
        </div>

        {/* Recent Searches */}
        <div className="mb-6">
            <label className="text-sm font-semibold text-[#6a6a6a] mb-3 block">Recent searches</label>
            <LatestSearches />
        </div>

        {/* Suggested Destinations */}
        <div>
            <label className="text-sm font-semibold text-[#6a6a6a] mb-3 block">Suggested destinations</label>
            <div className="space-y-2 max-h-80 overflow-y-auto">
                <NearBy />
                {cities && cities.map((city, idx) => (
                    <CreateCityButton city={city.city} idx={idx} onClick={() => onFilterChange(city)} />
                ))}
            </div>
        </div>
        {/*
        <button className="flex justify-center items-center w-full mt-4 py-2 hover:bg-gray-50 rounded-lg transition">
            <GoChevronDown size={20} className="text-gray-600" />
        </button>
        */}
    </>
}

function NearBy() {
    return <>
        <button className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-xl transition">
            <div className="flex w-14 h-14 justify-center items-center bg-blue-50 rounded-lg mr-3">
                <TbLocation className="text-blue-400 w-6 h-6" />
            </div>
            <div className="flex flex-col text-left">
                <span className="font-semibold">Nearby</span>
                <span className="text-sm text-[#6a6a6a]">Find what's around you</span>
            </div>
        </button>
    </>
}

function CreateCityButton({ city, idx, onClick }) {
    return <>
        <button key={idx} className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-xl transition" onClick={onClick}>
            <div className="flex w-14 h-14 justify-center items-center bg-rose-50 rounded-lg mr-3">
                <BsBank className="text-rose-400 w-6 h-6" />
            </div>
            <div className="flex flex-col text-left">
                <span className="font-semibold">{city}</span>
                <span className="text-sm text-gray-500">Popular destination</span>
            </div>
        </button>
    </>
}

function LatestSearches() {
    return <>
        <button className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-xl transition">
            <div className="flex w-14 h-14 justify-center items-center bg-rose-50 rounded-lg mr-3">
                <BsBank className="text-rose-400 w-6 h-6" />
            </div>
            <div className="flex flex-col text-left">
                <span className="font-semibold">Bucharest</span>
                <span className="text-sm text-gray-500">Nov 9-22 • 8 guests</span>
            </div>
        </button>
    </>
}