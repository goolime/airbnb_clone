
import { AiOutlineMenu } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'

import logoImage from '../assets/images/logo.jpeg'
import userImage from '../assets/images/user.png'


export function AppHeader() {

    return <>

        <div className='
        fixed 
        grid 
        lg:grid-cols-[auto_minmax(700px,850px)_auto] 
        lg:grid-rows-none 
        sm:grid-cols-2 
        sm:grid-rows-2 
        w-full 
        bg-white 
        items-center 
        z-10 
        border-x-[1px] 
        border-gray-100 
        shadow-sm px-5
        '>
            <div className='hidden sm:block py-4'>
                <img
                    src={logoImage}
                    className='hidden sm:block cursor-pointer'
                    alt="logo-image"
                    height="50"
                    width="50"
                />
            </div>
            {/* Search Bar */}
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
                    <BiSearch size={18}/>
                    <span className='font-semibold ml-2'>Start your search</span>
                </div>
            </div>
            <div className='flex flex-row items-center justify-end gap-3 sm:col-[2/3] sm:row-[1/2] lg:col-[3/4]'>
                <div onClick={() => { }} className='hidden lg:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
                    Become a host
                </div>
                <div className='hidden sm:block'>
                    <img src={userImage} className='rounded-full' height={40} width={40} alt='user-image' />
                </div>
                <div onClick={() => { }} className='hidden sm:block p-4 sm:py-1 sm:py-2 bg-gray-300 flex flex row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'>
                    <AiOutlineMenu />
                </div>
            </div>
        </div>
    </>
}