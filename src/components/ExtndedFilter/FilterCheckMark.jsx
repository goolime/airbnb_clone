import { Checkmark } from "../util/Icons";

export function FilterCheckMark({ isChecked = true, onClick }) {
  return <>
    <div className={`border rounded-md size-[1.7rem] grid place-items-center border-gray-800 ${isChecked ? 'bg-gray-800 text-white' : ''}`} onClick={onClick}>
        {isChecked ? <Checkmark className={`size-[1.2rem]`} /> :"" }
    </div>
  </>
}
