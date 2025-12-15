import { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { BiHeart, BiMessage, BiSearch, BiUser,BiUserX } from 'react-icons/bi'
import logoImage from '../assets/images/airdnd-logo.png'
import userImage from '../assets/images/user.png'
import { AppFilter } from './filters/AppFilter.jsx'
import { useNavigate } from 'react-router'
import { UserLogin } from './UserLogin.jsx'
import { useLocation } from 'react-router-dom'
import { store } from '../store/store.js'
import { showLoginModal } from '../services/event-bus.service.js'
import { logout } from '../actions/user.actions.js'



export function AppHeader() {
    
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation();
    const currentPath = location.pathname;

    const hideFilter= currentPath.startsWith('/profile')
    const user= store.getState().userModule.loggedInUser

    return (
        <>
            <div className={`
                sticky 
                top-0
                grid 
                grid-cols-2
                sm:grid-cols-2 
                ${!hideFilter ? 'sm:grid-rows-2' : ''}
                md:grid-cols-[auto_1fr_auto]
                md:grid-rows-1
                lg:grid-cols-[auto_minmax(700px,850px)_auto] 
                w-full 
                bg-[#fafafa]
                items-center 
                z-10 
                border-b 
                border-gray-200 
                shadow-sm 
                px-2
                sm:px-4
                lg:px-6
            `}>
                {/* Logo Section */}
                <div className='hidden sm:flex flex-row items-center py-3 sm:py-1 md:py-4 gap-2'>
                    <img
                        onClick={() => navigate('/')}
                        src={logoImage}
                        className='cursor-pointer w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24'
                        alt="airdnd logo"
                    />
                    <h1
                        onClick={() => navigate('/')}
                        className='hidden lg:block font-Montserrat font-semibold text-2xl lg:text-3xl text-rose-400 cursor-pointer hover:text-rose-500 transition'
                    >
                        airdnd
                    </h1>
                </div>
                {/* Search/Filter Section */}
                {!hideFilter && (
                <div className='
                    col-span-2 
                    sm:col-span-2 
                    sm:row-start-2
                    md:col-span-1
                    md:col-start-2
                    md:row-start-1
                    py-2
                    sm:py-1
                    md:py-4
                '>
                    <AppFilter />
                </div>
                )}
                {/* User Menu Section */}
                <div className='
                    hidden
                    sm:flex 
                    flex-row 
                    items-center 
                    justify-end 
                    gap-2
                    lg:gap-3 
                    col-start-2 
                    row-start-1
                    md:col-start-3
                '>
                { (!user || !user.properties) &&
                    <div
                        onClick={() => navigate('/profile/properties')}
                        className='
                        hidden 
                        lg:block 
                        text-sm 
                        xl:text-md 
                        font-semibold 
                        py-2 lg:py-3 px-3 lg:px-4 
                        rounded-full 
                        hover:bg-neutral-100 
                        transition 
                        cursor-pointer 
                        whitespace-nowrap'>
                        Become a host
                    </div>
                }
                    {user &&
                        <div className='hidden md:block'>
                            <img
                                src={user.imgUrl || userImage}
                                className='rounded-full w-8 h-8 lg:w-10 lg:h-10'
                                alt='user-image'
                                onClick={() => navigate('/profile/user')}
                                />
                        </div>
                    }

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        onBlur={() => setTimeout(() => setIsMenuOpen(false), 200)}
                        className='
                            p-3
                            lg:p-4
                            bg-gray-100
                            hover:bg-gray-200 
                            flex 
                            flex-row 
                            items-center 
                            gap-2
                            lg:gap-3 
                            rounded-full 
                            cursor-pointer 
                            hover:shadow-md 
                            transition
                            relative
                        '
                    >
                        <AiOutlineMenu size={18} className="lg:w-5 lg:h-5" />

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <div className='
                                absolute 
                                top-full 
                                right-0 
                                bg-white 
                                w-52
                                lg:w-60 
                                rounded-xl
                                p-2
                                lg:p-3 
                                mt-2
                                lg:mt-3 
                                shadow-lg 
                                border 
                                border-gray-200
                                z-50
                            '>
                                <a
                                    href='#'
                                    className='flex flex-row items-center p-2 lg:p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition'
                                    onClick={(e) => { e.preventDefault(); navigate('/explore') }}
                                >
                                    <BiSearch size={20} />
                                    <span className='font-semibold text-sm pl-3'>Explore</span>
                                </a>
                                <a
                                    href='#'
                                    className='flex flex-row items-center p-2 lg:p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition'
                                    onClick={(e) => { e.preventDefault(); navigate('/wishlists') }}
                                >
                                    <BiHeart size={20} />
                                    <span className='font-semibold text-sm pl-3'>Wishlists</span>
                                </a>
                                <a
                                    href='#'
                                    className='flex flex-row items-center p-2 lg:p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition'
                                    onClick={(e) => { e.preventDefault(); navigate('/trips') }}
                                >
                                    <img
                                        src={logoImage}
                                        className='w-5 h-5'
                                        alt="trips"
                                    />
                                    <span className='font-semibold text-sm pl-3'>Trips</span>
                                </a>
                                <a
                                    href='#'
                                    className='flex flex-row items-center p-2 lg:p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition'
                                    onClick={(e) => { e.preventDefault(); navigate('/messages') }}
                                >
                                    <BiMessage size={20} />
                                    <span className='font-semibold text-sm pl-3'>Messages</span>
                                </a>
                                <div className='border-t border-gray-200 my-2'></div>
                                {user 
                                ?
                                <>
                                    <a
                                        href='#'
                                        className='flex flex-row items-center p-2 lg:p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition'
                                        onClick={(e) => { e.preventDefault(); navigate('/profile/user') }}
                                        >
                                        <BiUser size={20} />
                                        <span className='font-semibold text-sm pl-3'>Profile</span>
                                    </a>
                                    <div className='flex flex-row items-center p-2 lg:p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition'
                                        onClick={() => {
                                            logout().then(() => {
                                                navigate('/');
                                            });
                                        }
                                    }
                                    >
                                        <BiUserX size={20} />
                                        <span 
                                        className='font-semibold text-sm pl-3'
                                        >Logout
                                        </span>
                                    </div>
                                </>
                                :
                                 <div className='flex flex-row items-center p-2 lg:p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition'
                                    onClick={() => showLoginModal()}
                                 >
                                    <BiUser size={20} />
                                    <span
                                        className='font-semibold text-sm pl-3'
                                        >Login / Sign up
                                    </span>
                                </div>
                                }
                            </div>
                        )}
                    </button>
                </div>
            </div>
            <UserLogin />

            {/* Mobile Bottom Navigation */}
            {/* <div className='sm:hidden z-50 fixed grid grid-cols-5 w-full place-items-center bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg'>
                <a
                    href='#'
                    className='grid place-items-center py-3 px-2 text-gray-500 active:text-rose-500 transition'
                    onClick={(e) => { e.preventDefault(); navigate('/explore') }}
                >
                    <BiSearch size={24} />
                    <span className='font-light text-xs mt-1'>Explore</span>
                </a>
                <a
                    href='#'
                    className='grid place-items-center py-3 px-2 text-gray-500 active:text-rose-500 transition'
                    onClick={(e) => { e.preventDefault(); navigate('/wishlists') }}
                >
                    <BiHeart size={24} />
                    <span className='font-light text-xs mt-1'>Wishlists</span>
                </a>
                <a
                    href='#'
                    className='grid place-items-center py-3 px-2 text-gray-500 active:text-rose-500 transition'
                    onClick={(e) => { e.preventDefault(); navigate('/trips') }}
                >
                    <img
                        src={logoImage}
                        className='w-6 h-6'
                        alt="trips"
                    />
                    <span className='font-light text-xs mt-1'>Trips</span>
                </a>
                <a
                    href='#'
                    className='grid place-items-center py-3 px-2 text-gray-500 active:text-rose-500 transition'
                    onClick={(e) => { e.preventDefault(); navigate('/messages') }}
                >
                    <BiMessage size={24} />
                    <span className='font-light text-xs mt-1'>Messages</span>
                </a>
                <a
                    href='#'
                    className='grid place-items-center py-3 px-2 text-gray-500 active:text-rose-500 transition'
                    onClick={(e) => { e.preventDefault(); navigate('/profile') }}
                >
                    <BiUser size={24} />
                    <span className='font-light text-xs mt-1'>Profile</span>
                </a>
            </div> */}
        </>
    )
}

