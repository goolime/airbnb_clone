import { useEffect, useState } from "react"
import { DayPicker } from "react-day-picker"

export function DetailsDatePicker({ 
    onFilterChange, 
    selectedRange = undefined, 
    stacked = false,
    customStyles = {},
    monthNum
}) {
    const [selected, setSelected] = useState(selectedRange);

    function handleSelectedChange(selectedRange) {
        onFilterChange(selectedRange);
        setSelected(selectedRange);
    }

    useEffect(() => {
        setSelected(selectedRange);
    }, [selectedRange]);

    const now = new Date();

    // Default styles
    const defaultStyles = {
        months: "flex sm:flex-row gap-4",
        month_caption: "flex justify-center items-end h-12 font-semibold text-base mb-4",
        weekdays: "flex",
        weekday: "text-gray-500 font-medium text-xs w-12 h-8 flex items-center justify-center",
        week: "flex mb-1",
        day_button: "w-full h-full rounded-full hover:border hover:border-1 hover:border-gray-700",
        button_previous: "absolute left-4 top-1 p-2 mt-2 rounded-full hover:bg-gray-100 aria-disabled:hidden",
        button_next: "absolute right-4 top-1 p-2 mt-2 rounded-full hover:bg-gray-100 aria-disabled:hidden",
        day: "w-12 h-12 flex text-sm items-center justify-center relative",
        range_start: "rounded-l-full text-white rangeStart",
        range_end: "rounded-r-full text-white rangeEnd",
        selected: "has-[button]:bg-gray-200 selected",
        disabled: "opacity-20 line-through"
    };

    // Merge custom styles with defaults
    const mergedStyles = { ...defaultStyles, ...customStyles };

    // Override months style if stacked
    if (stacked) {
        mergedStyles.months = "flex flex-col gap-8";
    }

    return (
        <div className="relative flex justify-center">
            <DayPicker
                mode="range"
                selected={selected}
                onSelect={handleSelectedChange}
                numberOfMonths={monthNum}
                navLayout="around"
                fixedWeeks={false}
                disabled={{ before: now, after: new Date(now.getFullYear() + 2, now.getMonth() - 1, now.getDate()) }}
                startMonth={new Date(now.getFullYear(), now.getMonth())}
                endMonth={new Date(now.getFullYear() + 2, now.getMonth() - 1)}
                classNames={mergedStyles}
                components={{
                    Day: (props) => {
                        const { day, modifiers, ...tdProps } = props;
                        const Month = day.date.getMonth()
                        if (day.date.getDate() === 1) {
                            tdProps.className += " start-of-month"
                        }
                        if (Month !== (new Date(day.date.getTime() + 1000*60*60 * 24)).getMonth()) {
                            tdProps.className += " end-of-month"
                        }
                        return <td {...tdProps} />
                    }
                }}
            />
        </div>
    )
}