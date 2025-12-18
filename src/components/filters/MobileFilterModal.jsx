import { useState } from "react"
import { MobileWherePicker } from "../search/MobileWherePicker.jsx"
import { Capacity } from "../search/Capacity.jsx"
import { MobileDatePicker } from "../search/MobileDatePicker.jsx"



const sections = Object.freeze({
    WHERE: 1,
    WHEN: 2,
    WHO: 3,
})

export function MobileFilterModal({
    isFilterModalOpen,
    onFilterModalClose,
    handleFilterPropertyChange,
    clearFilters,
    submitSearch,
    locationString = "I'm flexible",
    datesString = "Add dates",
    guestsString = "Add guests"
}) {
    const [activeSection, setActiveSection] = useState(sections.WHERE);
    if (!isFilterModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-100 z-100 overflow-hidden">
            <button
                onClick={onFilterModalClose}
                className="fixed top-4 right-4 flex bg-white h-10 w-10 shadow-md border-2 border-gray-200 justify-center items-center rounded-full z-50 hover:bg-gray-50 transition"
            >
                ✕
            </button>

            {/* Main Content */}
            <div className="max-w-md mx-auto px-4 pt-16 pb-24 text-[#222222]">
                {activeSection !== sections.WHERE &&
                    <button
                        onClick={() => setActiveSection(sections.WHERE)}
                        className="bg-white rounded-2xl shadow-lg px-6 py-4 mb-4 w-full flex justify-between items-center hover:shadow-xl transition"
                    >
                        <span className="font-semibold text-md text-[#6a6a6a]">Where</span>
                        <span className="font-semibold text-md text-[#222222]">{locationString}</span>
                    </button>
                }
                {/* Where Section */}
                {activeSection === sections.WHERE && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
                        <h1 className="text-2xl font-semibold mb-4">Where?</h1>
                        <MobileWherePicker onFilterChange={(value) => {
                            handleFilterPropertyChange("loc", value)
                            setActiveSection(sections.WHEN)
                        }} />
                    </div>
                )}

                {/* When Section */}

                {activeSection !== sections.WHEN &&
                    <button
                        onClick={() => setActiveSection(sections.WHEN)}
                        className="bg-white rounded-2xl shadow-lg px-6 py-4 mb-4 w-full flex justify-between items-center hover:shadow-xl transition"
                    >
                        <span className="font-semibold text-md text-[#6a6a6a]">When</span>
                        <span className="font-semibold text-md text-[#222222]">{datesString}</span>
                    </button>
                }

                {activeSection === sections.WHEN &&
                    <div className="flex flex-col">
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
                            <h1 className="text-2xl font-semibold mb-4">When?</h1>
                            <MobileDatePicker onFilterChange={(value) => handleFilterPropertyChange("dates", value)} />
                        </div>
                    </div>
                }
                {/* Who Section */}
                {activeSection !== sections.WHO &&
                    <button
                        onClick={() => setActiveSection(sections.WHO)}
                        className="bg-white rounded-2xl shadow-lg px-6 py-4 mb-4 w-full flex justify-between items-center hover:shadow-xl transition"
                    >
                        <span className="font-semibold text-[#6a6a6a]">Who</span>
                        <span className="font-semibold">{guestsString}</span>
                    </button>
                }
                {activeSection === sections.WHO &&
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
                        <h1 className="text-2xl font-semibold mb-4">Who?</h1>
                        <Capacity onFilterChange={(value) => handleFilterPropertyChange('guests', value)} />

                    </div>
                }
            </div>

            {/* Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 bg-gray-100 px-4 py-4 flex items-center justify-between max-w-md mx-auto">
                <button className="text-md font-semibold underline text-[#222222]"
                onClick={clearFilters}>
                    Clear all
                </button>
                <button onClick={() => {
                    if (activeSection === sections.WHO) {
                        submitSearch()
                        onFilterModalClose()
                    }
                    setActiveSection(currentSection => currentSection + 1)
                }} className={`flex px-6 py-3 ${activeSection === sections.WHO ? "bg-gradient-to-r from-rose-500 to-pink-600" : "bg-[#222222]"} 
                text-white text-lg font-semibold rounded-lg hover:shadow-xl transition h-11.5 w-35 justify-center items-center`}>
                    {activeSection === sections.WHO ? "Search" : "Next"}
                </button>
            </div>
        </div>
    );
}