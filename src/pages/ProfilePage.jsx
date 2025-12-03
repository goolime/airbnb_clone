import { useState,useEffect } from 'react';
import {store } from '../store/store.js';
import { showLoginModal } from '../services/event-bus.service';
import { Outlet, Link, useNavigate, NavLink } from 'react-router-dom';
import { UserPlaceholder } from '../components/profile/UserPlaceholder.jsx';
import { Suitcase, PropertyIcon, BookingIcon } from '../components/util/Icons.jsx';


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
     <div className='flex flex-row max-w-[1400px] mx-auto'>
        <nav className='flex flex-col gap-4 p-4 border-r border-gray-300 min-w-[250px] h-[80vh] align-center'>
            <div className='font-bold text-2xl mt-2 mb-1'>Profile</div>
            <Option to="/profile/user" >
                <img src={user.imgUrl} alt="User Avatar" className="size-[2rem] rounded-full inline-block mr-2 object-cover" />
                About me
            </Option>
            <Option to="/profile/myorders" >
                <Suitcase className="size-[2rem] inline-block mr-2 object-cover" />
                My orders
            </Option>
            <div className='font-bold text-2xl mt-2 mb-1'>Host</div>
            <Option to="/profile/properties" >
                <PropertyIcon className="size-[2rem] inline-block mr-2 object-cover" />
                My properties
            </Option>
            <Option to="/profile/orders">
                <BookingIcon className="size-[2rem] inline-block mr-2 object-cover" />
                Bookings
            </Option>
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