    import { FilterCheckMark } from "../ExtndedFilter/FilterCheckMark.jsx"
    import { OrderPreview } from "./OrderPreview.jsx"
    import { useEffect, useState } from "react"

    export function OrdersList({ orders,onRemoveOrder, host=false }) {
        const [filterOldOrders, setFilterOldOrders] = useState(true)
        const [showByCheckInOrCheckOut, setShowByCheckInOrCheckOut] = useState(true) // true for check-in, false for check-out
        const [showedOrders, setShowedOrders] = useState([])
        

        function toggleFilter() {
            setFilterOldOrders((oldValue) => !oldValue)
        }

        function filterOrders(orders) {
            const currentDate = new Date()
            return orders.filter(order => {
                const checkInDate = new Date(order.checkIn)
                const checkOutDate = new Date(order.checkOut)
                if (filterOldOrders) {
                    return showByCheckInOrCheckOut ? checkInDate >= currentDate : checkOutDate >= currentDate
                }   
                return true
            }).sort((a, b) => {
                const dateA = new Date(showByCheckInOrCheckOut ? a.checkIn : a.checkOut)
                const dateB = new Date(showByCheckInOrCheckOut ? b.checkIn : b.checkOut)
                return dateA - dateB
            })
        }

        useEffect(() => {
            const filtered = filterOrders(orders)
            setShowedOrders(filtered)
        }, [])


        useEffect(() => {
            const filtered = filterOrders(orders)
            setShowedOrders(filtered)
        }, [filterOldOrders, showByCheckInOrCheckOut, orders])

        return (
            <>
                <div className="flex flex-row items-center align-center mx-auto gap-4 mb-4 w-full">
                        Order by: 
                        <div className="w-[400px]">
                        <div className="relative w-[100%] border mx-auto border-gray-300 rounded-xl grid py-2 px-3 grid-cols-2 ">
                            <div className={`absolute w-59/128 h-[2.5rem] duration-500 top-1/8 ${showByCheckInOrCheckOut ? 'left-1/32' : 'left-65/128'} rounded-xl scale-110 z-5 border-2 border-gray-700 `}></div>
                            <button className={`h-[2.5rem] text-gray-700 text-[1rem] ${showByCheckInOrCheckOut ? 'bg-gray-100 font-semibold scale-105 rounded-xl z-10;' : ''} `} onClick={() => { setShowByCheckInOrCheckOut(true) }}><div>Check-In</div></button>
                            <button className={`h-[2.5rem] text-gray-700 text-[1rem] ${!showByCheckInOrCheckOut ? 'bg-gray-100 font-semibold scale-105 rounded-xl z-10;' : ''}`} onClick={() => { setShowByCheckInOrCheckOut(false) }}><div>Check-Out</div></button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <FilterCheckMark isChecked={!filterOldOrders} onClick={() => toggleFilter()}/>
                        <div>Show Old Orders</div>
                    </div>
                </div>
                <div className="flex flex-row md:flex-col gap-4 h-[70vh] overflow-hidden max-md:overflow-x-scroll md:overflow-y-scroll max-md:snap-x md:snap-y snap-mandatory ">
                    {showedOrders.map(order => <OrderPreview key={order._id} order={order} host={host} onRemoveOrder={onRemoveOrder} />)}
                </div>
            </>
        )
    }