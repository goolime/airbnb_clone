
import { AiOutlineMenu } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'

import logoImage from '../assets/images/logo.jpeg'
import userImage from '../assets/images/user.png'


export function AppHeader() {

    return <>

        <div className='fixed grid col lg:grid-cols-3 lg:grid-rows-none md:grid-cols-2 md:grid-rows-2 w-full max-h-30 bg-white items-center z-10 border-x-[1px] border-gray-100 shadow-sm px-5'>
            <div className='hidden md:block py-4'>
                <img
                    src={logoImage}
                    className='hidden md:block cursor-pointer'
                    alt="logo-image"
                    height="50"
                    width="50"
                />
            </div>
            {/* Search Bar */}
            <div className='w-full max-h-5px border-[1px] lg:col-[2/3] border-gray-100 py-2 sm:col-span-2 rounded-full shadow-md hover:shadow-lg transition cursor-pointer'>
                <div className="grid grid-cols-3 items-center justify-between">
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
            </div>
            <div className='flex flex-row items-center justify-end gap-3 md:col-[2/3] md:row-[1/2] lg:col-[3/4]'>
                <div onClick={() => { }} className='hidden lg:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
                    Become a host
                </div>
                <div className='hidden md:block'>
                    <img src={userImage} className='rounded-full' height={30} width={30} alt='user-image' />
                </div>
                <div onClick={() => { }} className='hidden md:block p-4 md:py-1 md:py-2 bg-gray-300 flex flex row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'>
                    <AiOutlineMenu />
                </div>
            </div>
        </div>
    </>
}