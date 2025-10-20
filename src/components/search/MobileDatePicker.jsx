import { useState } from "react"
import { DayPicker } from "react-day-picker"

export function MobileDatePicker() {
    const [date, setDate] = useState(new Date(Date.now()));
    const [numberOfMonths, setNumberOfMonths] = useState(3);
    const now= new Date(Date.now());
    const endMonth=new Date(now.getFullYear()+2,now.getMonth()-1);
    const startMonth=new Date(now.getFullYear(), now.getMonth());

    return <>
        <div className="flex flex-col  w-full h-[65vh] justify-center">
            <DayPicker
            mode="range"
            selected={date}
            onSelect={setDate}
            numberOfMonths={numberOfMonths}
            hideNavigation={true}
            navLayout="around"
            fixedWeeks={true}
            disabled={{ before: now, after: new Date(now.getFullYear() + 2, now.getMonth(), now.getDate()) }}
            startMonth={startMonth}
            endMonth={endMonth}
            className="overflow-scroll scrollbar-hide w-full h-[55vh]"
            classNames={{
                months: "flex flex-col gap-4",
                caption_label: "font-semibold text-gray-900 text-lg mb-2",
                day_button: "w-full h-full rounded-full hover:border hover:border-2 hover:border-gray-700",
                button_previous: "m-2 p-2 rounded-full hover:bg-gray-200 absolute left-0 top-1/2 -translate-y-1/2 aria-disabled:hidden ",
                button_next: "m-2 p-2 rounded-full hover:bg-gray-200 absolute right-0 top-1/2 -translate-y-1/2 aria-disabled:hidden ",
                day: "size-[10dvw] text-center",
                range_start: "rounded-l-full text-white rangeStart",
                range_end: "rounded-r-full text-white rangeEnd",
                selected: "has-[button]:bg-gray-200 selected",
                disabled: "opacity-20",
            }}
            components={
                {
                Day:(props) => {
                    const{day,modifiers,...tdProps}=props;
                    const Month=day.date.getMonth()
                    if(day.date.getDate()===1){
                    tdProps.className+=" start-of-month"
                    }
                    if (Month!==(new Date(day.date.getTime()+1000*60*60*24)).getMonth()){
                    tdProps.className+=" end-of-month"
                    }
                    return <td {...tdProps}/>
                }
                }
            }
            footer={
                <button className={`${numberOfMonths>=24 ? "hidden" : ""} w-full py-2  text-gray-900 border-2 border-gray-900 rounded-lg text-lg font-semibold `}  onClick={() => setNumberOfMonths((prev) => Math.min(prev + 3))}>Load more dates</button>
            }
            />
            
        </div>
    </>
}