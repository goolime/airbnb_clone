import { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { BiHeart, BiMessage, BiSearch, BiUser, BiUserX } from 'react-icons/bi'
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



    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const hideFilter = currentPath.startsWith('/profile') || currentPath.startsWith('/host') || currentPath.startsWith('/reservation')
    const hideMobileMenu = currentPath.startsWith('/rooms')

    return (
        <div className="w-full grid grid-cols-[5px_minmax(0,_1fr)_5px] sm:grid-cols-[1rem_minmax(0,_1fr)_1rem] xl:grid-cols-[1fr_1393px_1fr] sticky top-0 z-10  border-b 
                border-gray-200 
                bg-[#fafafa]
                shadow-xs ">
            <div className={`
                
                grid 
                grid-cols-2
                sm:grid-cols-2 
                ${!hideFilter ? 'sm:grid-rows-2' : ''}
                md:grid-cols-[auto_1fr_auto]
                md:grid-rows-1
                lg:grid-cols-[auto_minmax(700px,850px)_auto] 
                col-start-2 
                col-end-3 
                w-full 
                items-center 
                px-2
                sm:pl-4
                lg:pl-3
            `}>
                {/* Logo Section */}
                <div className='hidden sm:block'>
                    <Logo />
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
                <div className='hidden sm:block'>
                    <UserMenu />
                </div>
            </div>
            <UserLogin />

            {/* Mobile Bottom Navigation */}
            <div className={`sm:hidden z-50 fixed ${hideMobileMenu ? 'hidden' : 'grid'}  grid-cols-5 w-full place-items-center bottom-0 left-0 right-0 bg-white border-t border-gray-200`}>
                <a href='#'
                    className={`grid place-items-center py-3 px-2 text-gray-500 hover:text-gray-700 ${currentPath.startsWith('/explore') ? 'text-rose-500' : ''} transition`}
                    onClick={(e) => { e.preventDefault(); navigate('/explore') }}
                >
                    <BiSearch size={24} />
                    <span className='text-[10px] mt-1'>Explore</span>
                </a>

                <a href='#'
                    className={`grid place-items-center py-3 px-2 text-gray-500 hover:text-gray-700 ${currentPath.startsWith('/profile/wishlist') ? 'text-rose-500' : ''} transition`}
                    onClick={(e) => { e.preventDefault(); navigate('/profile/wishlist') }}
                >
                    <BiHeart size={24} />
                    <span className='text-[10px] mt-1'>Wishlists</span>
                </a>

                <a href='#'
                    className={`grid place-items-center py-3 px-2 text-gray-500 hover:text-gray-700 ${currentPath.endsWith('/profile/orders') ? 'text-rose-500' : ''} transition`}
                    onClick={(e) => { e.preventDefault(); navigate('/profile/orders') }}
                >
                    <img
                        src={logoImage}
                        className='w-6 h-6'
                        alt="trips"
                    />
                    <span className='text-[10px] mt-1'>Trips</span>
                </a>

                <a href='#'
                    className={`grid place-items-center py-3 px-2 text-gray-500 hover:text-gray-700 ${currentPath.endsWith('/profile/messages') ? 'text-rose-500' : ''} transition`}
                    onClick={(e) => { e.preventDefault(); navigate('/profile/messages') }}
                >
                    <BiMessage size={24} />
                    <span className='text-[10px] mt-1'>Messages</span>
                </a>

                <a href='#'
                    className={`grid place-items-center py-3 px-2 text-gray-500 hover:text-gray-700 ${currentPath.endsWith('/profile') ? 'text-rose-500' : ''} transition`}
                    onClick={(e) => { e.preventDefault(); navigate('/profile') }}
                >
                    <BiUser size={24} />
                    <span className='text-[10px] mt-1'>Profile</span>
                </a>
            </div>
        </div>
    )
}

function Logo() {
    const navigate = useNavigate()
    return <div className='sm:flex flex-row items-center py-3 sm:py-1 md:py-4 -translate-x-8 lg:-translate-x-8'>
        <img
            onClick={() => navigate('/')}
            src={logoImage}
            className='cursor-pointer w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24'
            alt="airdnd logo"
        />
        <h1
            onClick={() => navigate('/')}
            className='hidden -translate-x-5 -translate-y-1 lg:block font-Montserrat font-semibold text-2xl lg:text-3xl text-rose-400 cursor-pointer hover:text-rose-500 transition'
        >
            airdnd
        </h1>
    </div>
}

function UserMenu() {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const user = store.getState().userModule.loggedInUser


    return <div className='
                    sm:flex 
                    flex-row 
                    items-center 
                    justify-end 
                    gap-2
                    lg:gap-3 
                    col-start-2 
                    row-start-1
                    md:col-start-3
                    translate-x-2
                '>
        {(!user || !user.properties) &&
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
                    className='rounded-full size-10 lg:size-12 cursor-pointer object-cover hover:'
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
                        onClick={(e) => { e.preventDefault(); navigate('/profile/wishlist') }}
                    >
                        <BiHeart size={20} />
                        <span className='font-semibold text-sm pl-3'>Wishlists</span>
                    </a>
                    <a
                        href='#'
                        className='flex flex-row items-center p-2 lg:p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition'
                        onClick={(e) => { e.preventDefault(); navigate('/profile/orders') }}
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
}