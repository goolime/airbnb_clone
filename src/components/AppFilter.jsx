import { BiSearch } from "react-icons/bi";

export function AppFilter() {

    return <>

        <div className='
                w-full 
                max-h-5px 
                border-[1px] 
                my-3 
                lg:col-[2/3] 
                border-gray-200 
                py-2 
                sm:col-span-2 
                rounded-full 
                shadow-md 
                hover:shadow-md 
                transition 
                cursor-pointer'>
            <div className="hidden sm:grid grid-cols-3 items-center justify-between">
                <div className='flex flex-col text-sm font-semibold px-6'>
                    Where
                    <input type="text" className='focus:outline-none placeholder:font-thin placeholder:text-gray-400' placeholder='Search destinations' />
                </div>
                <div className='flex flex-col text-sm font-semibold px-6 border-x-[1px] border-gray-100'>
                    When
                    <label className='font-thin text-gray-400'>Add dates</label>
                </div>
                <div className='flex flex-row pl-6 pr-2 items-center justify-between gap-3'>
                    <div className='flex flex-col text-sm font-semibold'>
                        Who
                        <label className='font-thin text-gray-400'>Add guests</label>
                    </div>
                    <div className='p-2 bg-rose-500 rounded-full text-white'>
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
            <div className='flex flex-row items-center justify-center sm:hidden'>
                <BiSearch size={18} />
                <span className='font-semibold text-gray-800 ml-2'>Start your search</span>
            </div>
        </div>
    </>
}