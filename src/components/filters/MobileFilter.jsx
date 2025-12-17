import { BiSearch } from "react-icons/bi"
import { MobileFilterModal } from "../filters/MobileFilterModal.jsx"
import { getDatesString, getGuestsString, getLocationString, guestStringLength } from "../../actions/filter.actions"
import { FilterIcon } from "../util/Icons.jsx"
import { FiArrowLeft } from "react-icons/fi"

export function MobileFilter({
    handleFilterPropertyChange,
    navigateToSearch,
    navigateToExplore,
    isFilterModalOpen,
    onCloseFilterModal,
    isModalOpen,
    onCloseModal,
    onOpenFilterModal,
    currentPath,
    filterData,
    clearFilters }) {

    return (
        <div className="w-full flex flex-row justify-between items-center px-4 py-2">
            {currentPath === '/search' &&
                <button className="w-12" onClick={() => { navigateToExplore() }}>
                    <FiArrowLeft className="h-6 w-6 text-gray-800" />
                </button>
            }

            <div className="
            w-full
            h-12
            flex flex-row 
            items-center 
            justify-center 
            px-5 
            cursor-pointer 
            border 
            border-gray-200 
            rounded-full 
            shadow-md 
            shadow-gray-200 
            bg-white"
                onClick={onOpenFilterModal}>
                <BiSearch size={18} />
                <span className="font-semibold text-gray-800 ml-2">Start your search</span>
            </div>

            {currentPath === '/search' &&
                <button className="w-12 flex justify-end" onClick={() => { }}>
                    <FilterIcon className="h-6 w-6 text-gray-800" />
                </button>
            }

            <MobileFilterModal
                submitSearch={navigateToSearch}
                handleFilterPropertyChange={handleFilterPropertyChange}
                isFilterModalOpen={isFilterModalOpen}
                onFilterModalClose={onCloseFilterModal}
                isOpen={isModalOpen}
                onClose={onCloseModal}
                locationString={getLocationString(filterData.loc)}
                datesString={getDatesString(filterData.dates)}
                guestsString={getGuestsString(filterData.guests, guestStringLength.LONG)}
                clearFilters={clearFilters}
            />
        </div>
    )
}