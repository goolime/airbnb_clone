import { useState, useEffect } from "react";
import { eventBusService } from "../services/event-bus.service";
import { UserInteruction } from "./util/UserInteruaction";
import { DetailsDatePicker } from "./search/DetailsDatePicker";
import { useSearchParams } from "react-router";

export function DateSelectorModal({ handleDateChange, selectedRange }) {

    const [isDateSelectorModalOpen, setIsDateSelectorModalOpen] = useState(false);
    const [tempDates, setTempDates] = useState(selectedRange);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-date-selector', () => {
            setIsDateSelectorModalOpen(true);
            setTempDates(selectedRange);
        });

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [selectedRange]);

    useEffect(() => {
        setTempDates(selectedRange);
    }, [selectedRange]);

    function handleTempDateChange({ from, to }) {
        setTempDates({ from, to });
    }

    function handleSave() {
        handleDateChange(tempDates);

        const newParams = new URLSearchParams(searchParams);
        if (tempDates.from && tempDates.to) {
            const formatDate = (date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };

            newParams.set('checkIn', formatDate(tempDates.from));
            newParams.set('checkOut', formatDate(tempDates.to));
        } else {
            newParams.delete('checkIn');
            newParams.delete('checkOut');
        }
        setSearchParams(newParams);

        setIsDateSelectorModalOpen(false);
    }

    function handleClear() {
        const clearedDates = { from: null, to: null };
        setTempDates(clearedDates);
        handleDateChange(clearedDates);

        const newParams = new URLSearchParams(searchParams);
        newParams.delete('checkIn');
        newParams.delete('checkOut');
        setSearchParams(newParams);
    }

    function handleClose() {
        setTempDates(selectedRange);
        setIsDateSelectorModalOpen(false);
    }

    return (
        <UserInteruction isOpen={isDateSelectorModalOpen} onClose={handleClose}>
            <div className="flex flex-col h-full justify-between overflow-y-auto">
                <div className="pb-6">
                    <h2 className="text-[#222222] font-bold text-2xl mb-6">Change dates</h2>
                    <DetailsDatePicker
                        onFilterChange={handleTempDateChange}
                        selectedRange={tempDates}
                        stacked={isMobile}
                        customStyles={{
                            months: "flex flex-row gap-12",
                            month_caption: "flex justify-center items-center h-8 font-semibold text-base mb-6",
                            weekdays: "flex gap-0",
                            weekday: "text-gray-500 font-medium text-xs w-10 h-8 flex items-center justify-center uppercase",
                            week: "flex gap-0 mb-1",
                            day_button: "w-full h-full hover:border hover:border-black rounded-full transition-all",
                            button_previous: "absolute left-0 top-0 p-2 rounded-full hover:bg-gray-100 hover:scale-110 transition-all",
                            button_next: "absolute right-0 top-0 p-2 rounded-full hover:bg-gray-100 hover:scale-110 transition-all",
                            day: "w-10 h-10 flex text-sm items-center justify-center relative font-normal",
                            range_start: "rounded-l-full text-white rangeStart",
                            range_end: "rounded-r-full text-white rangeEnd",
                            selected: "has-[button]:bg-gray-200 selected",
                            disabled: "opacity-25 text-gray-300 cursor-not-allowed",
                        }}
                    />
                </div>
                <div className="flex justify-between items-center pt-6 mb-6 border-t border-gray-200">
                    <button
                        className="text-[#222222] text-base font-semibold hover:bg-gray-100 px-2 py-2 rounded-lg transition cursor-pointer"
                        onClick={handleClear}
                    >
                        Clear dates
                    </button>
                    <button
                        className="bg-[#222222] w-30 hover:bg-black text-white px-8 py-3 rounded-xl font-semibold transition cursor-pointer"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </UserInteruction>
    )
}