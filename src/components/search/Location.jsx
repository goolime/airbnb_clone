import { getCities } from "../../actions/explore.actions.js"

export function Location({ onFilterChange }) {

    const cities = getCities()

    function handleCityClick(city) {
        onFilterChange(city);

    }

    return (
        <div className="h-100 overflow-y-auto">
            <div className="flex flex-col">
                <label className="px-6 mb-2 w-full text-xs text-[#222222]">Suggested destinations</label>
                <div className="flex flex-row p-2 mx-4 hover:bg-gray-200 rounded-lg cursor-pointer">
                    <img height={55} width={55} className="mr-3" src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-hawaii-autosuggest-destination-icons-2/original/ea5e5ee3-e9d8-48a1-b7e9-1003bf6fe850.png" alt="icon" />
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
                            <img height={55} width={55} className="mr-3" src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-hawaii-autosuggest-destination-icons-1/original/c9333e22-1d8d-4d6c-80db-615f4c2d4cc4.png" alt="icon" />
                            <div className="flex flex-col justify-center text-sm">
                                <label className="font-semibold cursor-pointer">{city.city}, {city.countryCode}</label>
                                <span className="text-gray-500">City advantage description</span>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}