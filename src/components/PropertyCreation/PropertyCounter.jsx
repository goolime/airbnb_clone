import { Minus, Plus } from "../util/Icons.jsx";

export function PropertyCounter({ label, count, onChange, min=0, max=Infinity }) {
  

  return <>
    <div className="flex justify-between items-center my-3">
      <span className="font-semibold text-gray-700">{label}</span>
      <div className="flex items-center text-gray-700">
        <button className="border border-gray-600 p-2 rounded-full disabled:opacity-25 disabled:cursor-not-allowed opacity-60 hover:opacity-100" disabled={count === min} onClick={() => onChange(Math.max(min, count - 1))}><Minus className="!size-[1rem]" /></button>
        <span className="mx-3 w-[2rem] text-center font-semibold">{count}</span>
        <button className="border border-gray-600 p-2 rounded-full disabled:opacity-25 disabled:cursor-not-allowed opacity-60 hover:opacity-100" disabled={count === max} onClick={() => onChange(Math.min(max, count + 1))}><Plus className="!size-[1rem]" /></button>
      </div>
    </div>
  </>
}