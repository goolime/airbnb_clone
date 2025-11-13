import { EditIcon } from "../util/Icons";
import { UserOrders } from "./UserOrders.jsx";

export function UserData({ user }) {

    if (!user) return null;
    return <>
        <div className="grid grid-cols-[minmax(12rem,30dvh)_1fr] justify-items-start items-center p-4">
            <img src={user.imgUrl} alt="User Avatar" className="rounded-full size-[12rem] object-cover col-start-1 col-end-2 relative start-[calc(50%-6rem)] justify-self-center" />
            <div className="col-start-2 col-end-3 px-4" >
                <h2 className="text-lg font-bold">{user.fullname} <EditIcon className="inline-block mx-1" /></h2>
                <p className="text-gray-600">{user.username}<EditIcon className="inline-block mx-1" /></p>
            </div>
        </div>
        <div>
            <UserOrders userId={user._id} />
        </div>
    </>
}