import { useState,useEffect } from 'react';
import {store } from '../store/store.js';
import { showLoginModal } from '../services/event-bus.service';
import { Outlet, Link, useNavigate, NavLink } from 'react-router-dom';
import { UserPlaceholder } from '../components/profile/UserPlaceholder.jsx';
import { Suitcase, PropertyIcon, BookingIcon } from '../components/util/Icons.jsx';
import userImage from '../assets/images/user.png'
import { useLocation } from 'react-router-dom';
import { BiHeart } from 'react-icons/bi';


export function ProfilePage() {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const [isProfile, setIsProfile] = useState(currentPath.startsWith('/profile'));

    useEffect(() => {
        const storeState= store.getState();
        console.log('ProfilePage store state:', storeState);
        setUser(storeState.userModule.loggedInUser);
        setIsLoading(false);
    }, []);
    
    useEffect(() => {
        console.log('User state changed:', user, isLoading);
    }, [user, isLoading]);
    
    if (!user && isLoading) {
        return <UserPlaceholder />;
    }

    if (!user && !isLoading) {
        navigate('/');
        showLoginModal();
    }

    
    return <>
     <div className='flex flex-col md:flex-row max-w-[1400px] px-auto text-gray-700 '>
        <nav className='hidden md:flex md:flex-col pt-1 pr-4 md:border-r max-md:border-b max-md:justify-center border-gray-300 min-w-[250px] md:h-[80vh] align-center'>
            <div className='flex flex-row md:items-start mb-4 md:mb-8 w-full max-md:hidden gap-1 justify-around w-full'>
                <div className={`w-1/2 font-bold text-2xl mt-2 mb-1 p-2 border-t-2 border-r-2 border-l-2 border-gray-300 rounded-t-2xl mask-luminance mask-b-from-white mask-b-from-70% mask-b-to-black ${!isProfile ? 'opacity-50' : 'bg-white'}`} onClick={() => setIsProfile(true)}>Profile</div>
                {user.properties && <div className={`w-1/2 font-bold text-2xl mt-2 mb-1 p-2 border-t-2 border-r-2 border-l-2 border-gray-300 rounded-t-2xl mask-luminance mask-b-from-white mask-b-from-70% mask-b-to-black ${isProfile ? 'opacity-50' : 'bg-white'}`} onClick={() => setIsProfile(false)}>Host</div>}
            </div>
            <div className='flex flex-col gap-2 w-full'>

            {isProfile ? <>
            <Option to="/profile/user" >
                <div className='w-[3rem] flex items-center justify-center'>
                    <img src={user.imgUrl} alt={<img src={userImage} className='size-[2rem] rounded-full inline-block object-cover'/>} className="size-[1.8rem] rounded-full inline-block object-cover" />
                </div>
                <div>
                    About me
                </div>
            </Option>
            <Option to="/profile/wishlist" >
                <div className='w-[3rem] flex items-center justify-center'>
                    <BiHeart className="size-[2rem] md:size-[1.5rem] inline-block object-cover" />
                </div>
                <div>
                    My Wishlist
                </div>
            </Option>
            <Option to="/profile/orders" >
                <div className='w-[3rem] flex items-center justify-center'>
                    <Suitcase className="size-[2rem] md:size-[1.5rem] inline-block object-cover" />
                </div>
                <div>
                    My orders
                </div>
            </Option>
            { !user.properties &&  <Option to="/profile/properties" >
                <div className='w-[3rem] flex items-center justify-center'>
                    <PropertyIcon className="size-[2rem] md:size-[1.5rem] inline-block object-cover" />
                </div>
                <div>
                    Become a host
                </div>
            </Option>
            }
            </>
            :
            <>
                <Option to="/host/properties" >
                    <div className='w-[3rem] flex items-center justify-center'>
                        <PropertyIcon className="size-[2rem] md:size-[1.5rem] inline-block  object-cover" />
                    </div>                
                    <div>
                        My properties
                    </div>
                </Option>
                <Option to="/host/orders">
                    <div className='w-[3rem] flex items-center justify-center'>

                    <BookingIcon className="size-[2rem] md:size-[1.5rem] inline-block object-cover" />
                    </div>
                    <div>
                        Bookings
                    </div>
                </Option> 
            </>
            }
            </div>
        </nav>
        <nav>
        <div className='md:hidden flex flex-row items-center mb-4 gap-4 justify-center w-full'>
            <Option to="/profile/user" >
                <div className='w-[3rem] flex items-center justify-center'>
                    <img src={user.imgUrl} alt={<img src={userImage} className='size-[2rem] rounded-full inline-block object-cover'/>} className="size-[1.8rem] rounded-full inline-block object-cover" />
                </div>
                <div>
                    About me
                </div>
            </Option>
            <Option to="/profile/wishlist" >
                <div className='w-[3rem] flex items-center justify-center'>
                    <BiHeart className="size-[2rem] md:size-[1.5rem] inline-block object-cover" />
                </div>
                <div>
                    My Wishlist
                </div>
            </Option>
            <Option to="/profile/orders" >
                <div className='w-[3rem] flex items-center justify-center'>
                    <Suitcase className="size-[2rem] md:size-[1.5rem] inline-block object-cover" />
                </div>
                <div>
                    My orders
                </div>
            </Option>
            { user.properties ?
            <>
                <div className='!w-[1px] h-[2rem] bg-gray-300'/>
                <Option to="/host/properties" >
                    <div className='w-[3rem] flex items-center justify-center'>
                        <PropertyIcon className="size-[2rem] md:size-[1.5rem] inline-block  object-cover" />
                    </div>                
                    <div>
                        My properties
                    </div>
                </Option>
                <Option to="/host/orders">
                    <div className='w-[3rem] flex items-center justify-center'>

                    <BookingIcon className="size-[2rem] md:size-[1.5rem] inline-block object-cover" />
                    </div>
                    <div>
                        Bookings
                    </div>
                </Option> 
            </>
            :
             <Option to="/profile/properties" >
                <div className='w-[3rem] flex items-center justify-center'>
                    <PropertyIcon className="size-[2rem] md:size-[1.5rem] inline-block object-cover" />
                </div>
                <div>
                    Become a host
                </div>
            </Option>
            }
        </div>
        </nav>
        <section className='w-[100%]'>
            <Outlet />
        </section>
     </div>
    </>
}

function Option({children, to}){
    return <NavLink to={to} className="rounded-md px-5 py-3 hover:bg-gray-100 flex items-center flex-col md:flex-row option">
        {children}
    </NavLink>
}