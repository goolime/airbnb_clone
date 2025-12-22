import { store } from "../../store/store.js";
import { useEffect, useState } from 'react';
import { showPropertyCreation } from '../../services/event-bus.service.js';
import { ListPlaceholder } from '../preview/ListPlaceholder.jsx';
import { PropertyCreation } from '../PropertyCreation.jsx';
import { propertiesService } from '../../services/properties/index.js';
import { ListPreview } from '../preview/ListPreview.jsx';
import lookingfor from '../../assets/images/lookingfor.jpg'

export function UserWishlist() {
    const [user, setUser] = useState(null);
        const [properties, setProperties] = useState([]);
        const [loading, setLoading] = useState(true);
        
        useEffect(() => {
                const storeState= store.getState();
                setUser(storeState.userModule.loggedInUser);
                if (!storeState.userModule.loggedInUser.properties) {
                     showPropertyCreation()
                }
            }, []);
        
        useEffect(() => {
            async function fetchProperties() {
                if (user && user.wishlist) {
                    const tempProperties= user.wishlist.map(propId=> propertiesService.getById(propId))
                    setProperties(await Promise.all(tempProperties))
                }
            }
            fetchProperties();
        }, [user]);
    
        useEffect(() => {
                setLoading(false);
        }, [properties]);

        console.log('User Wishlist:', user);

        if (loading){
            return <>
            <div className={`max-w-[1400px] h-[80vh] overflow-y-auto animate-pulse mask-b-from-white mask-b-from-50% mask-b-to-black scrollbar-hide`}>
                <div className="px-12 py-5 overflow-y-auto animate-pulse" onClick={() => showPropertyCreation()}>
                    <ListPlaceholder className="sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-5" />
                </div>
            </div>
        </>
        }

        if (!user.wishlist || user.wishlist.length === 0) {
            return <>
                <div className="flex flex-col items-center justify-center border border-gray-300 rounded-2xl gap-2 p-6 m-4 shadow-md max-w-[1400px] h-[80vh]">
                    <img src={lookingfor} alt="No Wishlist Items" className="w-[24rem] mb-4 mask-x-from-95% mask-x-to-100% mask-y-from-95% mask-y-to-100%" />
                    <h2 className="text-2xl font-semibold text-gray-600">Your wishlist is empty</h2>
                    <p className="text-gray-500 mt-2">Browse properties and add them to your wishlist!</p>
                </div>
            </>
        }
    
        return <>
            <PropertyCreation />
            <div className={`max-w-[1400px] h-[80vh] overflow-y-auto scrollbar-hide ${loading ? 'animate-pulse mask-b-from-white mask-b-from-50% mask-b-to-black' : ''}`}>
                <div className="p-4">
                    <h2 className="text-2xl font-semibold mb-4">My Wishlist</h2>
                    <ListPreview properties={properties} className="sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-5"/>
                </div>
            </div>
        </>
}