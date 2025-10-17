import { useEffect, useRef, useState } from "react";
import { TbSquareRoundedArrowRightFilled, TbSquareRoundedArrowLeftFilled } from "react-icons/tb";

export function Carousel({slides, className , auto=false}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null);


    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        if (auto===false || auto==="hover") return;
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    function handleMouseLeave() {
        if (auto !== "hover" ) return;
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    function handleMouseEnter() {
        if (auto !== "hover") return;
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                nextSlide();
            }, 1500);  
        }
    }

    return (
        <div className={`overflow-hidden relative rounded-lg ${className}`} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} > 
            <div className="h-full w-full relative">
                {slides.map((s, index) => {
                    return <img className={`absolute h-full w-full object-cover bottom-0 duration-500 ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`} key={index} src={s} />;
                })}
            </div>
            <div className="absolute top-0 h-full w-full flex justify-between items-center text-white text-3xl px-[5px]">
                <button onClick={prevSlide}>
                    <TbSquareRoundedArrowLeftFilled className="duration-200 opacity-40 hover:opacity-100 hover:scale-110"/>
                </button>
                <button onClick={nextSlide}>
                    <TbSquareRoundedArrowRightFilled className="duration-200 opacity-40 hover:opacity-100 hover:scale-110"/>
                </button>
            </div>

            <div className="absolute bottom-0 flex justify-center py-5 w-full width-full" >
                <div className="flex gap-2">
                    {slides.map((_, index) =>  <div key={index} className={`rounded-full size-[10px] bg-white ${currentIndex === index ? 'opacity-100' : 'opacity-40'} hover:scale-110 hover:opacity-100 duration-200`} onClick={() => {setCurrentIndex(index)}}/>)}
                </div>
            </div>
        </div>
    );
}
