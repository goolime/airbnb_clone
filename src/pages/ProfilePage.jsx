import { useState,useEffect } from 'react';
import {store } from '../store/store.js';
import { showLoginModal } from '../services/event-bus.service';
import { Outlet, Link, useNavigate, NavLink } from 'react-router-dom';
import { UserPlaceholder } from '../components/profile/UserPlaceholder.jsx';
import { Suitcase, PropertyIcon, BookingIcon } from '../components/util/Icons.jsx';
import userImage from '../assets/images/user.png'


export function ProfilePage() {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

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
     <div className='flex flex-col md:flex-row max-w-[1400px] mx-auto'>
        <nav className='flex md:flex-col gap-4 p-4 md:border-r max-md:border-b max-md:justify-center border-gray-300 min-w-[250px] md:h-[80vh] align-center'>
            <div className='font-bold text-2xl mt-2 mb-1 max-md:hidden'>Profile</div>
            <Option to="/profile/user" >
                <img src={user.imgUrl} alt={<img src={userImage} className='size-[2rem] rounded-full inline-block mr-2 object-cover'/>} className="size-[2rem] rounded-full inline-block mr-2 object-cover" />
                About me
            </Option>
            <Option to="/profile/myorders" >
                <Suitcase className="size-[1.5rem] inline-block mr-2 object-cover" />
                My orders
            </Option>
            { user.properties ?
            <>
                <div className='font-bold text-2xl mt-2 mb-1 max-md:hidden'>Host</div>
                <Option to="/profile/properties" >
                    <PropertyIcon className="size-[1.5rem] inline-block mr-2 object-cover" />
                    My properties
                </Option>
                <Option to="/profile/orders">
                    <BookingIcon className="size-[1.5rem] inline-block mr-2 object-cover" />
                    Bookings
                </Option> 
            </>
            :
            <Option to="/profile/properties" >
                <PropertyIcon className="size-[1.5rem] inline-block mr-2 object-cover" />
                Become a host
            </Option>
    }
        </nav>
        <section>
            <Outlet />
        </section>
     </div>
    </>
}

function Option({children, to}){
    return <NavLink to={to} className="rounded-md px-5 py-3 hover:bg-gray-100 option">
        {children}
    </NavLink>
}