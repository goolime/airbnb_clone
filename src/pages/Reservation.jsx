import { useNavigate } from "react-router"
import { FaArrowLeft } from "react-icons/fa6";



export function Reservation() {

    const navigate = useNavigate()

    return (

        <>
            <div className="relative mx-50 pt-8 pb-12">
                <h2 className="text-3xl font-semibold">Request to book</h2>
                <button
                    onClick={() => { navigate('') }}
                    className="absolute top-8 -left-17 w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-300 cursor-pointer flex items-center justify-center"
                >
                    <FaArrowLeft size={16} />

                </button>
                <div className="flex flex-cols-2 mt-6">
                    <div className="">
dsfdsf
                    </div>
                    <div className="">
sdfdsf
                    </div>
                </div>
            </div>
        </>
    )
}