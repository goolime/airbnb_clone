import { useState } from "react"
import { BiSearch } from "react-icons/bi"
import { DynamicDropDown } from "./DynamicDropDown"
import { Capacity } from "./search/Capacity"
import { DatePicker } from "./search/DatePicker"




export function AppFilter() {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDateModalOpen, setIsDateModalOpen] = useState(false)
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)

    function handleOpenModal() {
        setIsModalOpen(true)
    }

    function onCloseModal() {
        setIsModalOpen(false)
    }

    return <>
        <div className="w-full max-w-4xl mx-auto mt-3 mb-5">
            <div className="
                relative
                w-full 
                border
                border-gray-200 
                bg-white
                py-2 
                rounded-full 
                shadow-lg 
                transition 
                cursor-pointer
            ">

                {isGuestModalOpen &&
                    <DynamicDropDown isOpen={isModalOpen} onClose={onCloseModal} width={'w-md'}>
                        <Capacity />
                    </DynamicDropDown>
                }
                {isDateModalOpen &&
                    <DynamicDropDown isOpen={isModalOpen} onClose={onCloseModal} width={'w-full'}>
                        <DatePicker />
                    </DynamicDropDown>
                }
                {isLocationModalOpen &&
                    <DynamicDropDown isOpen={isModalOpen} onClose={onCloseModal} width={'w-full'}>

                    </DynamicDropDown>
                }
                <div className="hidden sm:grid grid-cols-3 items-center justify-between">
                    <button className="flex flex-col text-sm font-semibold text-start px-6">
                        <label className="cursor-pointer">Where</label>
                        <input
                            type="text"
                            className="focus:outline-none placeholder:font-light placeholder:text-gray-500"
                            placeholder="Search destinations"
                        />
                    </button>

                    <div className="relative hover:bg-gray-200 hover:rounded-full">
                        <div onClick={() => {
                            setIsDateModalOpen(true)
                            setIsGuestModalOpen(false)
                            setIsLocationModalOpen(false)
                            handleOpenModal()
                        }}
                            className="
                        flex 
                        flex-row 
                        pl-6 
                        pr-2 
                        py-3
                        items-center 
                        justify-between 
                        gap-3
                        cursor-pointer
                        ">
                            <div className="flex flex-col text-sm text-start w-full px-6 border-x border-gray-200 font-semibold">
                                <label className="cursor-pointer">When</label>
                                <span className="font-light text-gray-500">Add dates</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative hover:bg-gray-200 hover:rounded-full">
                        <div onClick={() => {
                            setIsDateModalOpen(false)
                            setIsGuestModalOpen(true)
                            setIsLocationModalOpen(false)
                            handleOpenModal()
                        }}
                            className="
                        flex 
                        flex-row 
                        pl-6 
                        pr-2 
                        py-3
                        items-center 
                        justify-between 
                        gap-3
                        cursor-pointer
                        ">
                            <div className="flex flex-col text-sm text-start font-semibold">
                                <label className="cursor-pointer">Who</label>
                                <span className="font-light text-gray-500">Add guests</span>
                            </div>
                            <span className="p-2 bg-rose-500 rounded-full text-white">
                                <BiSearch size={24} />
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-center sm:hidden">
                    <BiSearch size={18} />
                    <span className="font-semibold text-gray-800 ml-2">Start your search</span>
                </div>
            </div>
        </div>
    </>
}