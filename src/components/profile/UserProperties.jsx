import { useEffect, useState } from 'react';
import { store } from '../../store/store.js';
import { showPropertyCreation } from '../../services/event-bus.service.js';
import { ListPlaceholder } from '../preview/ListPlaceholder.jsx';
import { PropertyCreation } from '../PropertyCreation.jsx';
import { propertiesService } from '../../services/properties/index.js';
import { ListPreview } from '../preview/ListPreview.jsx';

export function UserProperties() {
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
            if (user && user.properties) {
                const tempProperties= user.properties.map(propId=> propertiesService.getById(propId))
                setProperties(await Promise.all(tempProperties))
            }
        }
        fetchProperties();
    }, [user]);

    useEffect(() => {
        if (properties.length > 0) {
            setLoading(false);
        }
    }, [properties]);

    return <>
        <PropertyCreation />
        <div className={`max-w-[1400px] h-[80vh] overflow-y-auto scrollbar-hide ${loading ? 'animate-pulse mask-b-from-white mask-b-from-50% mask-b-to-black' : ''}`}>
        {
            (!user || !user.properties || loading) ?
            <div className="px-12 py-5 overflow-y-auto animate-pulse">
                <ListPlaceholder className="sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-5" />
            </div>
            :
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">My Properties</h2>
                <ListPreview properties={properties} className="sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-5" addProperty={true} />
            </div>
        }
        </div>
    </>
}