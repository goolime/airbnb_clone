import { useState, useEffect } from "react"
import { store } from "../../store/store.js"
import { ordersService } from "../../services/orders/index.js"
import CalenderImg  from "../../assets/images/calendar.png"
import { OrdersList } from "./OrdersList.jsx"

export function PropertyOrders() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        async function fetchOrders() {
            const storeState = store.getState()
            const user = storeState.userModule.loggedInUser
            if (user) {
                const AllOrders = []
                for (const propertyId of user.properties) {
                    const propertyOrders = await ordersService.getOrdersByPropertyId(propertyId)
                    AllOrders.push(...propertyOrders)
                }
                setOrders(AllOrders)
            }
        }

        fetchOrders();
    }, [])

    if (!orders.length) {
        return <>
            <div className="flex flex-col items-center justify-center border border-gray-300 rounded-2xl gap-2 p-6 m-4 shadow-md">
                <img src={CalenderImg} alt="No Orders" className="w-[24rem] mb-4" />
                <h2 className="text-2xl font-semibold text-gray-600">No one has booked your properties yet</h2>
                <p className="text-gray-500 mt-2">Try adding photos to your properties to attract bookings.</p>
            </div>
        </>
    }

    return <>
        <div className="flex flex-col p-4">
            <OrdersList orders={orders} />
        </div>
    </>
}