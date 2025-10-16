
import { AiOutlineMenu } from 'react-icons/ai'
import { BiHeart, BiMessage, BiSearch, BiUser } from 'react-icons/bi'

import logoImage from '../assets/images/logo.jpeg'
import userImage from '../assets/images/user.png'

import { AppFilter } from './AppFilter.jsx'


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
            <AppFilter />
            <div className='flex flex-row items-center justify-end gap-3 sm:col-[2/3] sm:row-[1/2] lg:col-[3/4]'>
                <div onClick={() => { }} className='hidden lg:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
                    Become a host
                </div>
                <div className='hidden sm:block'>
                    <img src={userImage} className='rounded-full' height={40} width={40} alt='user-image' />
                </div>
                <button className='
                hidden 
                sm:block 
                p-4 
                sm:py-3
                bg-gray-300 
                flex flex-row 
                items-center 
                gap-3 
                rounded-full 
                cursor-pointer 
                hover:shadow-md 
                transition
                group
                relative
                '>
                    <AiOutlineMenu />
                    <div className='
                    absolute 
                    top-full 
                    right-0 
                    bg-white 
                    w-60 
                    rounded-lg 
                    p-3 
                    mt-3 
                    shadow-sm 
                    border-x-[1px] 
                    border-gray-200
                    scale-y-0
                    group-focus:scale-y-100
                    origin-top
                    duration-200
                    '>
                        <a href='#' className='flex flex-row p-2 text-gray-600'>
                            <BiSearch size={20} className='cursor-pointer' />
                            <span className='font-semibold text-sm px-2'>Explore</span>
                        </a>
                        <a href='#' className='flex flex-row p-2 text-gray-600'>
                            <BiHeart size={20} className='cursor-pointer' />
                            <span className='font-semibold text-sm px-2'>Wishlists</span>
                        </a>
                        <a href='#' className='flex flex-row p-2 text-gray-600'>
                            <img
                                src={logoImage}
                                className='cursor-pointer'
                                alt="logo-image"
                                height="20"
                                width="20"
                            />
                            <span className='font-semibold self-center text-sm px-2'>Trips</span>
                        </a>
                        <a href='#' className='flex flex-row p-2 text-gray-600'>
                            <BiMessage size={20} className='cursor-pointer' />
                            <span className='font-semibold text-sm px-2'>Messages</span>
                        </a>
                        <a href='#' className='flex flex-row p-2 text-gray-600'>
                            <BiUser size={20} className='cursor-pointer' />
                            <span className='font-semibold text-sm px-2'>Profile</span>
                        </a>
                    </div>
                </button>
            </div>
        </div>
        <div className='sm:hidden fixed grid grid-cols-5 w-full place-items-center bottom-0 left-0 right-0 bg-white border-gray-100 border-y-[2px]'>
            <a href='#' className='grid place-items-center p-2 text-gray-500 active:text-rose-500 focus:text-rose-500'>
                <BiSearch size={30} className='cursor-pointer' />
                <span className='font-thin text-sm'>Explore</span>
            </a>
            <a href='#' className='grid place-items-center p-2 text-gray-500 active:text-rose-500 focus:text-rose-500'>
                <BiHeart size={30} className='cursor-pointer' />
                <span className='font-thin text-sm'>Wishlists</span>
            </a>
            <a href='#' className='grid place-items-center p-2 text-gray-500 active:text-rose-500 focus:text-rose-500'>
                <img
                    src={logoImage}
                    className='cursor-pointer'
                    alt="logo-image"
                    height="30"
                    width="30"
                />
                <span className='font-thin text-sm'>Trips</span>
            </a>
            <a href='#' className='grid place-items-center p-2 text-gray-500 active:text-rose-500 focus:text-rose-500'>
                <BiMessage size={30} className='cursor-pointer' />
                <span className='font-thin text-sm'>Messages</span>
            </a>
            <a href='#' className='grid place-items-center p-2 text-gray-500 active:text-rose-500 focus:text-rose-500'>
                <BiUser size={30} className='cursor-pointer' />
                <span className='font-thin text-sm'>Profile</span>
            </a>
        </div>
    </>
}