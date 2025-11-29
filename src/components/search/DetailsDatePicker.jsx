import { useState } from "react"
import { DayPicker } from "react-day-picker"
import { ChevronLeft, ChevronRight } from "../util/Icons";



export function DetailsDatePicker({ onFilterChange, selectedRange = undefined }) {

    const [selected, setSelected] = useState(selectedRange);

    // FOR DEBUGGING PURPOSES ONLY
    /*
    const defaultClassNames = getDefaultClassNames();
    console.log('defaultClassNames', defaultClassNames);
    */

    function handleSelectedChange(selectedRange) {
        onFilterChange(selectedRange);
        setSelected(selectedRange);
    }
    const now = new Date(Date.now());

    return <>
        <div className="relative flex justify-center">
            <DayPicker
                mode="range"
                selected={selected}
                onSelect={handleSelectedChange}
                numberOfMonths={2}
                navLayout="around"
                fixedWeeks={true}
                disabled={{ before: now, after: new Date(now.getFullYear() + 2, now.getMonth(), now.getDate()) }}
                startMonth={new Date(now.getFullYear(), now.getMonth())}
                endMonth={new Date(now.getFullYear() + 2, now.getMonth())}
                classNames={{
                    months: "flex flex-col sm:flex-row gap-8",
                    month_caption: "flex justify-center items-center h-12 font-semibold text-base mb-4",
                    nav: "flex items-center justify-between",
                    button_previous: "absolute left-4 top-3 p-2 rounded-full hover:bg-gray-100 transition-colors",
                    button_next: "absolute right-4 top-3 p-2 rounded-full hover:bg-gray-100 transition-colors",
                    month_grid: "border-collapse",
                    weekdays: "flex",
                    weekday: "text-gray-500 font-medium text-xs w-12 h-8 flex items-center justify-center",
                    week: "flex",
                    day: "w-12 h-12 flex items-center justify-center relative",
                    day_button: "w-10 h-10 rounded-full hover:border-1 hover:border-gray-700 flex items-center justify-center font-normal text-sm",
                    range_start: "!bg-black !text-white hover:!bg-black",
                    range_end: "!bg-black !text-white hover:!bg-black",
                    range_middle: "!bg-gray-100 rounded-none",
                    selected: "bg-gray-100",
                    disabled: "text-gray-300 line-through cursor-not-allowed hover:border-0",
                    outside: "text-gray-300",
                    today: "font-bold",
                }}
                components={{
                    Day: (props) => {
                        const { day, ...tdProps } = props;
                        const currentDate = day.date;
                        const nextDate = new Date(currentDate);
                        nextDate.setDate(nextDate.getDate() + 1);

                        if (currentDate.getDate() === 1) {
                            tdProps.className = `${tdProps.className || ''} start-of-month`;
                        }
                        if (currentDate.getMonth() !== nextDate.getMonth()) {
                            tdProps.className = `${tdProps.className || ''} end-of-month`;
                        }

                        return <td {...tdProps} />;
                    }
                }}
            />
        </div>
    </>
}