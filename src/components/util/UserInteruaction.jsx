import { useEffect, useState } from "react";
import { Xicon } from "./Icons.jsx";

export function UserInteruction({ className,mobileHeight= '75%', isOpen=true, onClose=() => {}, children }) {
    const [animation, setAnimation] = useState(true);

    useEffect(() => {
        if (isOpen) {
            setAnimation(false);
        }  
    }, [isOpen]);

    function handleClose(e) {
        e.preventDefault();
        setAnimation(true);
        setTimeout(() => {
            onClose();
        }, 300);
    }

  return <>
    <div className={`fixed inset-0 ${isOpen ? '' : 'hidden'} ${animation ? 'opacity-0' : ''} duration-300 z-999`}>
        <div className={`fixed inset-0 bg-gray-900/40 backdrop-blur-xs z-1000 duration-300`} onClick={handleClose}/>
        <div className={`absolute bottom-0 bg-white p-6 max-sm:rounded-t-3xl sm:rounded-3xl shadow-lg max-sm:w-full sm:max-w-2xl sm:mx-auto opacity-100 z-1001 sm:relative sm:top-[8%] h-[${mobileHeight}] sm:h-[80%] overflow-y-auto  ${animation ? 'translate-y-[20px] opacity-0' : ''} duration-300 ${className}`}>
            <button onClick={handleClose} className="rounded-full hover:bg-gray-200 p-1 absolute top-2 right-3 m-2 duration-300" ><Xicon /></button>
            <div className="mt-5"/>
            {children}
        </div>
    </div>
    </>
}
