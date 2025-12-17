import { useSearchParams } from "react-router";
import { UserInteruction } from "./util/UserInteruaction";
import { useEffect, useState } from "react";
import { Capacity } from "./search/Capacity";
import { eventBusService } from "../services/event-bus.service";

export function CapacitySelectorModal({ handleCapacityChange, initialCapacity }) {

    const [isCapacitySelectorModalOpen, setIsCapacitySelectorModalOpen] = useState(false);
    const [tempCapacity, setTempCapacity] = useState(initialCapacity)
    const [searchParams, setSearchParams] = useSearchParams()


    useEffect(() => {
        setTempCapacity(initialCapacity)
        const unsubscribe = eventBusService.on('show-capacity-selector', () => {
            setIsCapacitySelectorModalOpen(true);
        });

        return () => {
            if (unsubscribe) unsubscribe()
        };

    }, [initialCapacity])

    function handleTempCapacityChange({ adults, kids, infants, pets }) {
        setTempCapacity({ 
            adults: adults || 0, 
            kids: kids || 0, 
            infants: infants || 0, 
            pets: pets || 0 
        });
    }

    function handleSave() {
        handleCapacityChange(tempCapacity)

        const newParams = new URLSearchParams(searchParams)
        newParams.set('adults', tempCapacity.adults || 0)
        newParams.set('kids', tempCapacity.kids || 0)
        newParams.set('infants', tempCapacity.infants || 0)
        newParams.set('pets', tempCapacity.pets || 0)

        setSearchParams(newParams)

        setIsCapacitySelectorModalOpen(false)
    }

    function handleClose() {
        setTempCapacity(initialCapacity)
        setIsCapacitySelectorModalOpen(false)
    }

    return <>
        <UserInteruction isOpen={isCapacitySelectorModalOpen} onClose={handleClose}>
            <div className="flex flex-col h-full justify-between overflow-y-auto">
                <div className="pb-6">
                    <h2 className="text-[#222222] font-bold text-2xl mb-6">Change guests</h2>
                    <Capacity 
                        onFilterChange={handleTempCapacityChange} 
                        initialCapacity={tempCapacity} 
                    />
                </div>
                <div className="flex justify-between items-center pt-6 mb-6 border-t border-gray-200">
                    <button
                        className="text-[#222222] text-base font-semibold hover:bg-gray-100 px-2 py-2 rounded-lg transition cursor-pointer"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-[#222222] w-30 hover:bg-black text-white px-8 py-3 rounded-xl font-semibold transition cursor-pointer"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </UserInteruction>
    </>
}