export function FilterButton({ className, isActive, children, onClick }) {
  return <>
    <button onClick={onClick} className={`p-2 px-4 rounded-full active:scale-90 scale-100 duration-300 ${isActive ? 'border-gray-700 border-2' : 'border-1 border-gray-300'} ${className}`}>
      {children}
    </button>
  </>
}