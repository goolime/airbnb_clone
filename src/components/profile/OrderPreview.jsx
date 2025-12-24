import { BiArrowFromLeft } from "react-icons/bi"
import { Carousel } from "../util/Carousel";
import { EditIcon, Xicon } from "../util/Icons";
import { BiMessage } from "react-icons/bi";
import { chatService } from "../../services/chat/chat.service.remote";
import { useNavigate } from "react-router"; // ADD THIS
import { useState } from "react"; // ADD THIS

export function OrderPreview({ order, onRemoveOrder, host = false }) {
    const navigate = useNavigate(); // ADD THIS
    const [creatingChat, setCreatingChat] = useState(false); // ADD THIS

    const overdue = new Date(order.checkOut) < Date.now();
    const inTheFuture = new Date(order.checkIn) > Date.now();
    const checkInDate = new Date(order.checkIn)
    const checkOutDate = new Date(order.checkOut)
    const person = host ? order.guest : order.host;

    return <div className={`${overdue ? 'grayscale' : ''} snap-center snap-always md:snap-start border border-gray-300 rounded-2xl p-4 shadow-md md:grid md:grid-cols-[15rem_1fr] md:grid-rows-[auto_auto_auto] md:gap-4 max-md:flex max-md:flex-col max-md:gap-2 items-center justify-center`}>
        <Carousel slides={order.property.imgUrl} className="max-md:size-[50vw] md:w-full md:h-64 md:col-span-2 md:col-start-1 md:row-start-1" />
        <div className="font-semibold text-lg mb-2 md:col-span-2 md:col-start-1 md:row-start-2">{order.property.name}</div>
        <div className="flex flex-row md:col-start-1 md:row-start-3">
            <div>{checkInDate.toLocaleDateString()}</div>
            ️<BiArrowFromLeft className="text-[1.5rem] inline mx-2 text-gray-500" />
            <div>{checkOutDate.toLocaleDateString()}</div>
        </div>
        <div className="flex flex-row gap-4 mt-2">
            <div>
                Adults: {order.guests.adults}
            </div>
            <div>
                Kids: {order.guests.kids}
            </div>
            <div>
                Infants: {order.guests.infants}
            </div>
            <div>
                Pets: {order.guests.pets}
            </div>
            {inTheFuture && <EditIcon className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" />}
        </div>
        <div className="md:col-start-2 md:row-start-2">
            <img src={person.imgUrl} alt={person.fullname} className="w-8 h-8 rounded-full inline-block mr-2 object-cover " />
            <span>{person.fullname}</span>
            <span className="ml-4 text-sm text-gray-500 ">({host ? 'Guest' : 'Host'})</span>
        </div>
        <div className="mt-2">Total Price: <span className="font-semibold">${order.totalPrice.toFixed(2)}</span></div>
        <div className="flex flex-row gap-4">
            <button
                disabled={creatingChat}
                onClick={async () => {
                    try {
                        setCreatingChat(true)
                        const otherPersonId = host ? order.guest._id : order.host._id;
                        const chat = await chatService.findOrCreate(
                            order.property._id,
                            otherPersonId
                        )
                        navigate('/messages', {
                            state: { chatId: chat._id }
                        })
                    } catch (error) {
                        console.error('Failed to start conversation:', error); // ADD LOGGING
                        alert('Failed to start conversation: ' + error.message)
                    } finally {
                        setCreatingChat(false)
                    }
                }}
                className="mt-2 px-6 py-3 bg-gradient-to-r from-[#FF385C] to-[#E61E4D] text-white rounded-lg font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed">
                <BiMessage size={20} className="group-hover:rotate-12 transition-transform duration-200" />
                {creatingChat ? 'Starting chat...' : `Contact ${host ? 'Guest' : 'Host'}`}
            </button>
            {inTheFuture && <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded-2xl opacity-75 hover:opacity-100 ease-in-out duration-300 flex items-center gap-2" onClick={() => onRemoveOrder(order._id)}><Xicon />Cancel Booking</button>}
        </div>
    </div>
}