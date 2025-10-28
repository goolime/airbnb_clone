import { useState,useEffect } from 'react';
import {store } from '../store/store.js';
import { showLoginModal } from '../services/event-bus.service';
import { useNavigate } from 'react-router-dom';
import { UserPlaceholder } from '../components/profile/UserPlaceholder.jsx';
import { UserData } from '../components/profile/UserData.jsx';

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
    
    if (!user && !isLoading) {
        navigate('/');
        showLoginModal();
    }

    if (!user && isLoading) {
        return <UserPlaceholder />;
    }
    return <>
        <UserData user={user} />
    </>
}