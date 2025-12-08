import { UserInteruction } from "./util/UserInteruaction";
import { eventBusService } from "../services/event-bus.service";
import { useEffect,useState } from "react";
import { login } from "../actions/user.actions";
import { useNavigate } from "react-router-dom";

export function UserLogin() {
    const [isOpen, setIsOpen] = useState(false);
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigate = useNavigate();

    function handleLogin() {
        // Handle login logic here
        console.log('Logging in with:', loginUsername, loginPassword);
        login(loginUsername, loginPassword).then(() => {
            closeLoginModal();
            navigate('/');
        });
    }

    useEffect(() => {
        eventBusService.on('show-login-modal', () => {
            setIsOpen(true);
        });
    }, []);

    function closeLoginModal() {
        setIsOpen(false);
    }

    return <>
        <UserInteruction isOpen={isOpen} onClose={closeLoginModal} className="!p-0">
            <div className="grid grid-cols-[1rem_1fr_1rem] grid-rows-[auto]">
                <div className="w-[100%] col-span-full font-semibold text-xl text-gray-800 text-center border-b border-gray-300 pb-2"> Login or sign up</div>
                <div className="col-start-2 col-end-3 p-4 row-start-2 row-end-3">
                    <div>
                        <div className="text-2xl font-semibold">Welcome to Airdnd</div>
                        <div className="border-1 border-gray-300 rounded-lg mt-4">
                            <div className="grid grid-rows-[3rem_3rem]">
                                <input type="text" placeholder="Username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} className="w-full row-start-1 row-end-2 h-[3rem] border-b bg-white border-gray-300 px-2 focus:outline-none rounded-t-lg focus:rounded-lg focus:ring-2 focus:ring-gray-800 focus:scale-101" />
                                <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full row-start-2 row-end-3 h-[3rem] px-2 bg-white focus:outline-none rounded-b-lg focus:ring-2 focus:rounded-lg focus:ring-gray-800 focus:border-transparent focus:scale-101" />
                            </div>
                        </div>
                    </div>
                    <button className="bg-rose-600 w-full mx-auto text-white font-semibold py-2 my-4 rounded-lg hover:bg-rose-700 duration-200" onClick={handleLogin}>Login</button>
                    <div className="grid grid-cols-[1fr_auto_1fr] grid-rows-2">
                        <div className="col-start-1 col-end-2 row-start-1 row-end-2 border-b-1 border-gray-300"/>
                        <div className="col-start-3 col-end-4 row-start-1 row-end-2 border-b-1 border-gray-300"/>
                        <div className="col-start-2 col-end-3 row-start-1 row-end-3 p-2 items-center justify-center flex">
                            <div className="text-center justify-center pb-1 text-gray-800">or</div>
                        </div>
                        <div className="col-start-1 col-end-2 row-start-2 row-end-3"/>
                        <div className="col-start-3 col-end-4 row-start-2 row-end-3"/>
                    </div>
                    <div>
                        <div className="border-1 border-gray-300 rounded-lg mt-4">
                            <div className="grid grid-rows-[3rem_3rem_3rem_3rem]">
                                <input 
                                    type="text" 
                                    placeholder="Username" 
                                    className="w-full row-start-1 row-end-2 h-[3rem] bg-white px-2 focus:outline-none rounded-t-lg focus:rounded-lg focus:ring-2 focus:ring-gray-800 focus:scale-101" 
                                />
                                <input 
                                    type="email" 
                                    placeholder="Email address" 
                                    className="w-full row-start-2 row-end-3 h-[3rem] border-t border-b border-gray-300 px-2 bg-white  focus:outline-none focus:ring-2 focus:rounded-lg focus:ring-gray-800 focus:border-transparent focus:scale-101" 
                                />
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    className="w-full row-start-3 row-end-4 h-[3rem]  border-b border-gray-300 px-2 bg-white  focus:outline-none focus:ring-2 focus:rounded-lg focus:ring-gray-800 focus:border-transparent focus:scale-101" 
                                />
                                <input 
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    className="w-full row-start-4 row-end-5 h-[3rem] px-2 bg-white focus:outline-none rounded-b-lg focus:ring-2 focus:rounded-lg focus:ring-gray-800 focus:border-transparent focus:scale-101" 
                                />
                            </div>
                        </div>
                        <button className="bg-rose-600 w-full mx-auto text-white font-semibold py-2 my-4 rounded-lg hover:bg-rose-700 duration-200">Sign Up</button>
                    </div>
                </div>
            </div>
        </UserInteruction>
    </>
}