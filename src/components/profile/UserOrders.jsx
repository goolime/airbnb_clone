import { useState, useEffect } from "react"
import { store } from "../../store/store.js"
import { ordersService } from "../../services/orders/index.js"
import SuitcaseImg  from "../../assets/images/suitcase.png"
import { OrdersList } from "./OrdersList.jsx"
import { OrdersListPlaceholder } from "./OrdersListPlaceholder.jsx"

export function UserOrders() {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    function removerOrder(orderId) {
        ordersService.remove(orderId).then(() => {
            setOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
        });
    }

    useEffect(() => {
        async function fetchOrders() {
            const storeState = store.getState()
            const user = storeState.userModule.loggedInUser
            if (user) {
                const userOrders = await ordersService.getOrdersByUserId(user._id)
                console.log('Fetched user orders:', userOrders)
                setOrders(userOrders)
            }
            setIsLoading(false)
        }

        fetchOrders();
    }, [])

    if (isLoading) {
            return <div className="px-4 pt-4 overflow-y-auto animate-pulse">
                <OrdersListPlaceholder />
            </div>
    }

    if (!isLoading && !orders.length) {
        return <>
            <div className="flex flex-col items-center justify-center border border-gray-300 rounded-2xl gap-2 p-6 m-4 shadow-md max-w-[1400px] h-[80vh]">
                <img src={SuitcaseImg} alt="No Orders" className="w-[24rem] mb-4" />
                <h2 className="text-2xl font-semibold text-gray-600">You have no bookings yet</h2>
                <p className="text-gray-500 mt-2">Start exploring and book your first stay!</p>
            </div>
        </>
    }

    return <>
        <div className="flex flex-col pt-4 px-4 w-[100%]">
            <OrdersList orders={orders} onRemoveOrder={removerOrder} />
        </div>
    </>
}