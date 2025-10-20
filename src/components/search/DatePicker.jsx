import { useState } from "react"
import { DayPicker, /*getDefaultClassNames*/ } from "react-day-picker"


export function DatePicker() {

    const [date, setDate] = useState(new Date(Date.now()));
    // FOR DEBUGGING PURPOSES ONLY
    /*
    const defaultClassNames = getDefaultClassNames();
    console.log('defaultClassNames', defaultClassNames);
    */
    const now= new Date(Date.now());
    return <>
        <div className="flex justify-center">
            <DayPicker
            mode="range"
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            navLayout="around"
            fixedWeeks={true}
            disabled={{ before: now, after: new Date(now.getFullYear() + 2, now.getMonth()-1, now.getDate()) }}
            startMonth={new Date(now.getFullYear(), now.getMonth())}
            endMonth={new Date(now.getFullYear()+2,now.getMonth()-1)}
            classNames={{
              months: "flex sm:flex-row gap-4",
              day_button: "w-full h-full rounded-full hover:border hover:border-2 hover:border-gray-700",
              button_previous: "m-2 p-2 rounded-full hover:bg-gray-200 absolute left-0 top-1/2 -translate-y-1/2 aria-disabled:hidden ",
              button_next: "m-2 p-2 rounded-full hover:bg-gray-200 absolute right-0 top-1/2 -translate-y-1/2 aria-disabled:hidden ",
              day: "sm:size-[6dvw] sm:min-w-[45.06px] sm:min-h-[45.05px] md:size-[57.88px] lg:size-[3.8dvw]  lg:min-w-[42.95px] lg:min-h-[42.95px] xl:size-[54.55px] text-center",
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
            />
        </div>
    </>
}