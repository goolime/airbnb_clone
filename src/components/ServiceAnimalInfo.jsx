import { eventBusService } from '../services/event-bus.service.js'
import serviceAnimalImage from '../assets/images/disabled.png'
import { UserInteruction } from './util/UserInteruaction.jsx'
import { useState } from 'react';

export function ServiceAnimalInfo() {
    const [isServiceAnimalInfoOpen, setIsServiceAnimalInfoOpen] = useState(false);

    eventBusService.on('show-service-animal-info', () => {
        setIsServiceAnimalInfoOpen(true);
    });

    return <>
        <UserInteruction isOpen={isServiceAnimalInfoOpen} onClose={() => setIsServiceAnimalInfoOpen(false)}>
            <div >
                <img src={serviceAnimalImage} alt="Service animal" className='size-[100%] sm:size-[70%] mx-auto mask-x-from-95% mask-x-to-100% mask-y-from-95% mask-y-to-100%'/>
                <h1 className='font-semibold text-3xl text-gray-900'>Service animals</h1>
                <p className='text-lg text-gray-800'>Service animals aren’t pets, so there’s no need to add them here.</p>
                <p className='text-lg text-gray-800'>Traveling with an emotional support animal? </p>
                <a href="#" className='text-gray-800 underline font-semibold'>Check out our accessibility policy.</a>
            </div>
        </UserInteruction>
    </>
}