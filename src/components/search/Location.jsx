import { getCities } from "../../actions/explore.actions.js"
import { BsBank } from "react-icons/bs"
import { TbLocation } from "react-icons/tb"

const citiesAdvantages = [

    'Family friendly',
    'For beautiful sites',
    'For its stunning architecture',
    'For bustling night life',
    'For a trip abroad'
]

export function Location({ onFilterChange }) {

    const cities = getCities()

    function handleCityClick(city) {
        onFilterChange(city);

    }

    function getRandomAdvantage() {
        return citiesAdvantages[Math.floor(Math.random() * citiesAdvantages.length)];
    }

    return (
        <div className="h-100 overflow-y-auto">
            <div className="flex flex-col">
                <label className="px-6 mb-2 w-full text-sm text-[#222222]">Suggested destinations</label>
                <div className="flex flex-row p-2 mx-4 hover:bg-gray-200 rounded-lg cursor-pointer">
                    <div className="flex w-14 h-14 justify-center items-center bg-blue-50 rounded-lg mr-3">
                        <TbLocation className="text-blue-400 w-6 h-6" />
                    </div>
                    <div className="flex flex-col justify-center text-sm">
                        <label className="font-semibold cursor-pointer">Nearby</label>
                        <span className="text-gray-500">Find what's around you</span>
                    </div>
                </div>
            </div>
            <ul>
                {cities &&
                    cities.map((city, idx) => (
                        <li key={idx} className="flex flex-row p-2 mx-4 hover:bg-gray-200 rounded-lg cursor-pointer mb-1" onClick={() => handleCityClick(city)}>
                            <div className="flex w-14 h-14 justify-center items-center bg-rose-50 rounded-lg mr-3">
                                <BsBank className="text-rose-400 w-6 h-6" />
                            </div>
                            <div className="flex flex-col justify-center text-sm">
                                <label className="font-semibold cursor-pointer">{city.city}, {city.countryCode}</label>
                                <span className="text-gray-500">{getRandomAdvantage()}</span>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}