export function PropertyTypeSelector({ selectedType, onChange }) {
  return <>
    <div className="relative w-8/10 border mx-auto border-gray-300 rounded-xl grid py-2 px-3 grid-cols-3 ">
      <div className={`absolute w-1/3 h-[3.5rem] duration-300 top-1/8 ${selectedType === 'any' ? 'right-83/128' : ''} ${selectedType === 'home' ? 'right-1/64' : ''} ${selectedType === 'room' ? 'right-43/128' : ''} rounded-xl scale-110 z-20 border-2 border-gray-700 `}></div>
      <button className={`p-[1rem] h-[3.5rem] text-gray-700 text-center text-[1em] ${selectedType === 'any' ? 'filter-place-selected' : 'border-r filter-place'}`} onClick={() => { onChange('any'); }}>Any type</button>
      <button className={`p-[1rem] h-[3.5rem] text-gray-700 text-center text-[1em] ${selectedType === 'room' ? 'filter-place-selected' : 'border-x filter-place'}`} onClick={() => { onChange('room'); }}>Room</button>
      <button className={`p-[1rem] h-[3.5rem] text-gray-700 text-center text-[1em] ${selectedType === 'home' ? 'filter-place-selected' : 'border-l filter-place'}`} onClick={() => { onChange('home'); }}>Entire home</button>
    </div>  
  </>
}