import { FaHeart, FaRegHeart } from 'react-icons/fa';
import {store} from '../../store/store';
import {useEffect, useState} from 'react';
import { usersService } from '../../services/users/index.js';
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '../../store/user.reducer.js';

export function Wishlisted({propertyId, className}) {
    const [isWishlisted, setIsWishlisted] = useState(false);


    useEffect(() => {
        const state = store.getState();
        const user = state.userModule.loggedInUser;
        if (user) {
            setIsWishlisted(user.wishlist.includes(propertyId));
        } else {
            setIsWishlisted(false);
        }
    }, []);

    

    return <>
            <div className={`${className}`} 
                onClick={
                    (isWishlisted ?
                    ()=>{
                        const state = store.getState();
                        const user = state.userModule.loggedInUser;
                        if(user){
                            usersService.removeFromWishlist(user,propertyId)
                                .then(() => store.dispatch({ type: REMOVE_FROM_WISHLIST, propertyId }))
                                .then(() => setIsWishlisted(false))
                        }
                    }
                    :
                    ()=>{
                        const state = store.getState();
                        const user = state.userModule.loggedInUser;
                        if(user){
                        usersService.addToWishlist(user,propertyId)
                            .then(() => store.dispatch({ type: ADD_TO_WISHLIST, propertyId }))
                            .then(() => setIsWishlisted(true))
                        }
                    }
                    )

                }
            >
                <div className="relative">
                    <FaRegHeart className={`absolute size-[1.5rem] fill-gray-100 scale-102`} />
                    <FaHeart className={`${isWishlisted ? 'fill-red-500' : 'fill-gray-500'} size-[1.5rem]`} />
                </div>
                
            </div>
    </>
}