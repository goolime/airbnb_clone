import { useState } from "react"
import { BiSearch } from "react-icons/bi"
import { GoChevronDown } from "react-icons/go"
import { getCitiesName } from "../actions/explore.actions"
import { Capacity } from "./search/Capacity"
import { MobileDatePicker } from "./search/MobileDatePicker"

const sections = Object.freeze({
    WHERE: 1,
    WHEN: 2,
    WHO: 3,
})

export function MobileFilterModal({ isFilterModalOpen, onFilterModalClose }) {
    const [activeSection, setActiveSection] = useState(sections.WHERE);

    if (!isFilterModalOpen) return null;

    const cities = getCitiesName();

    return (
        <div className="fixed inset-0 bg-gray-100 z-50 overflow-hidden">
            <button
                onClick={onFilterModalClose}
                className="fixed top-4 right-4 flex bg-white h-10 w-10 shadow-md border-2 border-gray-200 justify-center items-center rounded-full z-50 hover:bg-gray-50 transition"
            >
                ✕
            </button>

            {/* Main Content */}
            <div className="max-w-md mx-auto px-4 pt-16 pb-24">
                {activeSection !== sections.WHERE &&
                    <button
                        onClick={() => setActiveSection(sections.WHERE)}
                        className="bg-white rounded-2xl shadow-lg px-6 py-4 mb-4 w-full flex justify-between items-center hover:shadow-xl transition"
                    >
                        <span className="font-semibold text-gray-500">Where</span>
                        <span className="font-semibold">I'm flexible</span>
                    </button>
                }
                {/* Where Section */}
                {activeSection === sections.WHERE && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
                        <h1 className="text-2xl font-semibold mb-4">Where?</h1>

                        {/* Search Input */}
                        <div className="flex items-center gap-3 border-1 border-gray-400 rounded-xl px-4 py-3 mb-6 focus-within:ring-2 focus-within:ring-black transition">
                            <BiSearch size={20} className="text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search destinations"
                                className="flex-1 focus:outline-none"
                            />
                        </div>

                        {/* Recent Searches */}
                        <div className="mb-6">
                            <label className="text-sm font-semibold text-gray-500 mb-3 block">Recent searches</label>
                            <button className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-xl transition">
                                <img
                                    height={48}
                                    width={48}
                                    className="rounded-lg object-cover flex-shrink-0"
                                    src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-hawaii-autosuggest-destination-icons-1/original/c9333e22-1d8d-4d6c-80db-615f4c2d4cc4.png"
                                    alt="Bucharest"
                                />
                                <div className="flex flex-col text-left">
                                    <span className="font-semibold">Bucharest</span>
                                    <span className="text-sm text-gray-500">Nov 9-22 • 8 guests</span>
                                </div>
                            </button>
                        </div>

                        {/* Suggested Destinations */}
                        <div>
                            <label className="text-sm font-semibold text-gray-500 mb-3 block">Suggested destinations</label>
                            <div className="space-y-2 max-h-80 overflow-y-auto">

                                <button className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-xl transition">
                                    <img
                                        height={48}
                                        width={48}
                                        className="rounded-lg object-cover flex-shrink-0"
                                        src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-hawaii-autosuggest-destination-icons-2/original/ea5e5ee3-e9d8-48a1-b7e9-1003bf6fe850.png"
                                        alt="Nearby"
                                    />
                                    <div className="flex flex-col text-left">
                                        <span className="font-semibold">Nearby</span>
                                        <span className="text-sm text-gray-500">Find what's around you</span>
                                    </div>
                                </button>

                                {cities && cities.map((city, idx) => (
                                    <button key={idx} className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-xl transition">
                                        <img
                                            height={48}
                                            width={48}
                                            className="rounded-lg object-cover flex-shrink-0"
                                            src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-hawaii-autosuggest-destination-icons-1/original/c9333e22-1d8d-4d6c-80db-615f4c2d4cc4.png"
                                            alt={city}
                                        />
                                        <div className="flex flex-col text-left">
                                            <span className="font-semibold">{city}</span>
                                            <span className="text-sm text-gray-500">Popular destination</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button className="flex justify-center items-center w-full mt-4 py-2 hover:bg-gray-50 rounded-lg transition">
                            <GoChevronDown size={20} className="text-gray-600" />
                        </button>
                    </div>
                )}

                {/* When Section */}
                {activeSection !== sections.WHEN &&
                    <button
                        onClick={() => setActiveSection(sections.WHEN)}
                        className="bg-white rounded-2xl shadow-lg px-6 py-4 mb-4 w-full flex justify-between items-center hover:shadow-xl transition"
                    >
                        <span className="font-semibold text-gray-500">When</span>
                        <span className="font-semibold">Add dates</span>
                    </button>
                }
                {activeSection === sections.WHEN &&
                <div className="flex flex-col">
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
                    <h1 className="text-2xl font-semibold mb-4">When?</h1>
                        <MobileDatePicker />
                    </div>
                </div>
                }

                {/* Who Section */}
                {activeSection !== sections.WHO &&
                    <button
                        onClick={() => setActiveSection(sections.WHO)}
                        className="bg-white rounded-2xl shadow-lg px-6 py-4 mb-4 w-full flex justify-between items-center hover:shadow-xl transition"
                    >
                        <span className="font-semibold text-gray-500">Who</span>
                        <span className="font-semibold">Add guests</span>
                    </button>
                }
                {activeSection === sections.WHO &&
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
                        <h1 className="text-2xl font-semibold mb-4">Who?</h1>
                        <Capacity />
                    </div>
                }
            </div>

            {/* Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 bg-gray-100 px-4 py-4 flex items-center justify-between max-w-md mx-auto">
                <button className="text-sm font-semibold underline">
                    Clear all
                </button>
                <button onClick={() => {
                    if (activeSection === sections.WHO) {
                        return;
                    }
                    setActiveSection(currentSection => currentSection+1)
                    }} className={`px-6 py-3 ${activeSection === sections.WHO ? "bg-gradient-to-r from-rose-500 to-pink-600" : "bg-gray-700"} text-white font-semibold rounded-lg hover:shadow-xl transition`}>
                    {activeSection === sections.WHO ? "Search" : "Next"}
                </button>
            </div>
        </div>
    );
}