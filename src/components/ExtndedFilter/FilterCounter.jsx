import { Minus, Plus } from "../util/Icons.jsx";

export function FilterCounter({ label, count, onChange }) {
  return <>
    <div className="flex justify-between items-center my-3">
      <span className="font-semibold text-gray-700">{label}</span>
      <div className="flex items-center text-gray-700">
        <button className="border border-gray-600 p-2 rounded-full disabled:opacity-25 disabled:cursor-not-allowed opacity-60 hover:opacity-100" disabled={count === 0} onClick={() => onChange(Math.max(0, count - 1))}><Minus className="!size-[1rem]" /></button>
        <span className="mx-3 w-[2rem] text-center font-semibold">{`${count===0 ? 'Any' : `${count}+`}`}</span>
        <button className="border border-gray-600 p-2 rounded-full disabled:opacity-25 disabled:cursor-not-allowed opacity-60 hover:opacity-100" disabled={count === 8} onClick={() => onChange(Math.min(8, count + 1))}><Plus className="!size-[1rem]" /></button>
      </div>
    </div>
  </>
}