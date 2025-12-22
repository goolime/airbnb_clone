import { useState, useEffect } from 'react';
import { store } from '../store/store.js';
import { showLoginModal } from '../services/event-bus.service';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { UserPlaceholder } from '../components/profile/UserPlaceholder.jsx';
import { Suitcase, PropertyIcon, BookingIcon } from '../components/util/Icons.jsx';
import userImage from '../assets/images/user.png';
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
        const storeState = store.getState();
        setUser(storeState.userModule.loggedInUser);
        setIsLoading(false);
    }, []);

    // Update isProfile when route changes
    useEffect(() => {
        setIsProfile(currentPath.startsWith('/profile'));
    }, [currentPath]);

    if (!user && isLoading) {
        return <UserPlaceholder />;
    }

    if (!user && !isLoading) {
        navigate('/');
        showLoginModal();
        return null;
    }

    return (
        <div className="flex flex-col md:flex-row max-w-[1400px] mx-auto text-gray-700">
            {/* Desktop Sidebar */}
            <nav className="hidden md:flex md:flex-col pt-1 pr-4 md:border-r border-gray-300 min-w-[250px] md:min-h-[80vh]">
                {/* Profile/Host Tabs */}
                <div className="flex flex-row items-start mb-4 md:mb-8 w-full gap-1">
                    <div
                        className={`w-1/2 font-semibold text-xl lg:text-2xl mt-2 mb-1 p-2 border-t-2 border-r-2 border-l-2 border-gray-300 rounded-t-2xl cursor-pointer transition ${
                            !isProfile ? 'opacity-50 hover:opacity-70' : 'bg-white'
                        }`}
                        onClick={() => {
                            setIsProfile(true);
                            navigate('/profile/user');
                        }}
                    >
                        Profile
                    </div>
                    {user.properties && (
                        <div
                            className={`w-1/2 font-semibold text-xl lg:text-2xl mt-2 mb-1 p-2 border-t-2 border-r-2 border-l-2 border-gray-300 rounded-t-2xl cursor-pointer transition ${
                                isProfile ? 'opacity-50 hover:opacity-70' : 'bg-white'
                            }`}
                            onClick={() => {
                                setIsProfile(false);
                                navigate('/host/properties');
                            }}
                        >
                            Host
                        </div>
                    )}
                </div>

                {/* Navigation Options */}
                <div className="flex flex-col gap-2 w-full">
                    {isProfile ? (
                        <>
                            <Option to="/profile/user">
                                <div className="w-12 flex items-center justify-center">
                                    <img
                                        src={user.imgUrl || userImage}
                                        alt="Profile"
                                        className="w-7 h-7 rounded-full object-cover"
                                    />
                                </div>
                                <div>About me</div>
                            </Option>
                            <Option to="/profile/wishlist">
                                <div className="w-12 flex items-center justify-center">
                                    <BiHeart className="w-6 h-6" />
                                </div>
                                <div>My Wishlist</div>
                            </Option>
                            <Option to="/profile/orders">
                                <div className="w-12 flex items-center justify-center">
                                    <Suitcase className="w-6 h-6" />
                                </div>
                                <div>My orders</div>
                            </Option>
                            {!user.properties && (
                                <Option to="/profile/properties">
                                    <div className="w-12 flex items-center justify-center">
                                        <PropertyIcon className="w-6 h-6" />
                                    </div>
                                    <div>Become a host</div>
                                </Option>
                            )}
                        </>
                    ) : (
                        <>
                            <Option to="/host/properties">
                                <div className="w-12 flex items-center justify-center">
                                    <PropertyIcon className="w-6 h-6" />
                                </div>
                                <div>My properties</div>
                            </Option>
                            <Option to="/host/orders">
                                <div className="w-12 flex items-center justify-center">
                                    <BookingIcon className="w-6 h-6" />
                                </div>
                                <div>Bookings</div>
                            </Option>
                        </>
                    )}
                </div>
            </nav>

            {/* Mobile Navigation */}
            <nav className="md:hidden overflow-x-auto border-b border-gray-300 py-4 mb-4">
                <div className="flex flex-row items-center justify-center gap-3 px-4 min-w-max">
                    <Option to="/profile/user">
                        <div className="w-12 flex items-center justify-center">
                            <img
                                src={user.imgUrl || userImage}
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        </div>
                        <div className="text-xs">About me</div>
                    </Option>
                    <Option to="/profile/wishlist">
                        <div className="w-12 flex items-center justify-center">
                            <BiHeart className="w-8 h-8" />
                        </div>
                        <div className="text-xs">Wishlist</div>
                    </Option>
                    <Option to="/profile/orders">
                        <div className="w-12 flex items-center justify-center">
                            <Suitcase className="w-8 h-8" />
                        </div>
                        <div className="text-xs">Orders</div>
                    </Option>
                    {user.properties ? (
                        <>
                            <div className="w-px h-8 bg-gray-300" />
                            <Option to="/host/properties">
                                <div className="w-12 flex items-center justify-center">
                                    <PropertyIcon className="w-8 h-8" />
                                </div>
                                <div className="text-xs">Properties</div>
                            </Option>
                            <Option to="/host/orders">
                                <div className="w-12 flex items-center justify-center">
                                    <BookingIcon className="w-8 h-8" />
                                </div>
                                <div className="text-xs">Bookings</div>
                            </Option>
                        </>
                    ) : (
                        <Option to="/profile/properties">
                            <div className="w-12 flex items-center justify-center">
                                <PropertyIcon className="w-8 h-8" />
                            </div>
                            <div className="text-xs">Host</div>
                        </Option>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <section className="w-full md:pl-8">
                <Outlet />
            </section>
        </div>
    );
}

function Option({ children, to }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `rounded-md px-4 py-3 hover:bg-gray-100 flex items-center flex-col md:flex-row gap-2 transition ${
                    isActive ? 'bg-gray-100' : ''
                }`
            }
        >
            {children}
        </NavLink>
    );
}