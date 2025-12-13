import { EditIcon } from "../util/Icons";
import { UserOrders } from "./UserOrders.jsx";
import { useEffect, useState } from "react";
import { store } from "../../store/store.js";

export function UserData() {
    const [user, setUser] = useState(null);

    useEffect(() => {
            const storeState= store.getState();
            setUser(storeState.userModule.loggedInUser);
        }, []);


    if (!user) return null;
    return <>
        <div className="">
            <div className="flex flex-col items-center justify-center border border-gray-300 rounded-2xl gap-2 p-6 m-4 shadow-md max-w-[1400px] h-[80vh] ">
                <img src={user.imgUrl} alt="User Avatar" className="rounded-full size-[12rem] object-cover justify-self-center" />
                <h2 className="text-lg font-bold">{user.fullname} <EditIcon className="inline-block mx-1" /></h2>
                <p className="text-gray-600">{user.username}<EditIcon className="inline-block mx-1" /></p>
            </div>
        </div>
    </>
}