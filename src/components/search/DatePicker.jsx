import { useState } from "react"
import { DayPicker } from "react-day-picker"


export function DatePicker() {

    const [selected, setSelected] = useState(new Date())

    return <>
        <DayPicker
        className="cursor-pointer"
            animate
            mode="range"
            defaultMonth={new Date()}
            selected={selected}
            onSelect={setSelected}
            footer={
                selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
            }
        />

    </>
}