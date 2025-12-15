import { useEffect, useState } from "react"
import { DayPicker, /*getDefaultClassNames*/ } from "react-day-picker"


export function DatePicker({ onFilterChange, selectedRange = undefined }) {

  const [selected, setSelected] = useState(selectedRange);

  // FOR DEBUGGING PURPOSES ONLY
  /*
  const defaultClassNames = getDefaultClassNames();
  console.log('defaultClassNames', defaultClassNames);
  */

  useEffect(() => {
    setSelected(selectedRange);
  }, [selectedRange]);

  function handleSelectedChange(selectedRange) {
    onFilterChange(selectedRange);
    setSelected(selectedRange);
  }

  const now = new Date(Date.now());
  return <>
    <div className="relative flex justify-center w-full">
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={handleSelectedChange}
        numberOfMonths={2}
        navLayout="around"
        fixedWeeks={false}
        disabled={{ before: now, after: new Date(now.getFullYear() + 2, now.getMonth() - 1, now.getDate()) }}
        startMonth={new Date(now.getFullYear(), now.getMonth())}
        endMonth={new Date(now.getFullYear() + 2, now.getMonth() - 1)}
        classNames={{
          months: "flex sm:flex-row gap-4",
          month_caption: "flex justify-center items-end h-12 font-semibold text-base mb-4",
          weekdays: "flex",
          weekday: "text-gray-500 font-medium text-xs w-12 h-8 flex items-center justify-center",
          week: "flex mb-1",
          day_button: "w-full h-full rounded-full hover:border hover:border-1 hover:border-gray-700",
          button_previous: "absolute left-4 top-2 p-2 m-1 rounded-full hover:bg-gray-100 aria-disabled:hidden",
          button_next: "absolute right-4 top-2 p-2 m-1 rounded-full hover:bg-gray-100 aria-disabled:hidden",
          day: "w-12 h-12 flex text-sm items-center justify-center relative",
          range_start: "rounded-l-full text-white rangeStart",
          range_end: "rounded-r-full text-white rangeEnd",
          selected: "has-[button]:bg-gray-200 selected",
          disabled: "opacity-20 line-through",
        }}
        components={
          {
            Day: (props) => {
              const { day, modifiers, ...tdProps } = props;
              const Month = day.date.getMonth()
              if (day.date.getDate() === 1) {
                tdProps.className += " start-of-month"
              }
              if (Month !== (new Date(day.date.getTime() + 10006060 * 24)).getMonth()) {
                tdProps.className += " end-of-month"
              }
              return <td {...tdProps} />
            }
          }
        }
      />
    </div>
  </>
}