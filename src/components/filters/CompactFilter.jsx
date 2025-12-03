import { BiSearch } from "react-icons/bi"
import { FcHome } from "react-icons/fc"
import { FilterIcon } from "../util/Icons"

export function CompactFilter({ currentPath, handleLargeFilterVisibility, onOpenLocationModal, onOpenDateModal, onOpenGuestModal }) {

    function handleSearchClick() {
        handleLargeFilterVisibility(true);
    }

    function handleLocationClick() {
        handleLargeFilterVisibility(true);
        setTimeout(() => {
            onOpenLocationModal();
        }, 300);
    }

    function handleDateClick() {
        handleLargeFilterVisibility(true);
        setTimeout(() => {
            onOpenDateModal();
        }, 300);
    }

    function handleGuestClick() {
        handleLargeFilterVisibility(true);
        setTimeout(() => {
            onOpenGuestModal();
        }, 300);
    }

    return (
        <div className="flex flex-row items-center justify-center">
            <div className="flex flex-row items-center rounded-full w-105 h-12 bg-white shadow-md shadow-gray-200 
                border border-gray-200 hover:shadow-gray-300 cursor-pointer">
                <div className="grid grid-cols-[40px_repeat(3,minmax(0,1fr))] w-full text-center font-semibold items-center text-sm">
                    <FcHome size={30} className="ml-2" />
                    <span className="pr-4" onClick={handleLocationClick}>
                        Homes nearby
                    </span>
                    <span className="border-x border-gray-200 px-4" onClick={handleDateClick}>
                        Any week
                    </span>
                    <span className="px-4" onClick={handleGuestClick}>
                        Add guests
                    </span>
                </div>
                <div className="pr-2">
                    <button
                        onClick={handleSearchClick}
                        aria-label="Open search filters"
                        className="flex h-8 w-8 bg-rose-500 rounded-full items-center justify-center shrink-0 hover:bg-rose-600 transition-colors cursor-pointer">
                        <BiSearch size={20} className="text-white" />
                    </button>
                </div>
            </div>

            {currentPath === '/search' &&
                <button className="flex flex-row justify-between items-center rounded-full ml-4 px-4 h-10 w-24 
                                   bg-white shadow-md shadow-gray-200 border border-gray-200 hover:shadow-gray-300 
                                   hover:border-gray-500 hover:bg-gray-100 cursor-pointer">
                    <FilterIcon className="h-6 w-6 text-gray-800" />
                    <span className="font-semibold text-sm text-gray-800">Filters</span>
                </button>
            }
        </div>
    )
}