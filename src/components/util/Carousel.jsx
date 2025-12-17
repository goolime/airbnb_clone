import { useEffect, useRef, useState } from "react";
import { TbSquareRoundedArrowRightFilled, TbSquareRoundedArrowLeftFilled } from "react-icons/tb";

export function Carousel({ slides, className, auto = false }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const intervalRef = useRef(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const nextSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        setTimeout(() => setIsTransitioning(false), 500);
    };

    const prevSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
        setTimeout(() => setIsTransitioning(false), 500);
    };

    // Touch swipe handlers
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current - touchEndX.current > 50) {
            nextSlide();
        }
        if (touchStartX.current - touchEndX.current < -50) {
            prevSlide();
        }
    };

    useEffect(() => {
        if (auto === false || auto === "hover") return;
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    function handleMouseLeave() {
        if (auto !== "hover") return;
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
        <div 
            className={`overflow-hidden relative ${className} group`} 
            onMouseLeave={handleMouseLeave} 
            onMouseEnter={handleMouseEnter}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div 
                className="flex h-full w-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((s, index) => {
                    return (
                        <img 
                            className="min-w-full h-full object-cover" 
                            key={index} 
                            src={s}
                            alt={`Slide ${index + 1}`}
                        />
                    );
                })}
            </div>

            <div className="absolute top-0 h-full w-full flex justify-between items-center text-white text-3xl px-[5px]">
                <button onClick={prevSlide} disabled={isTransitioning}>
                    <TbSquareRoundedArrowLeftFilled className="duration-200 opacity-0 group-hover:opacity-30 hover:opacity-100 hover:scale-110" />
                </button>
                <button onClick={nextSlide} disabled={isTransitioning}>
                    <TbSquareRoundedArrowRightFilled className="duration-200 opacity-0 group-hover:opacity-30 hover:opacity-100 hover:scale-110" />
                </button>
            </div>

            <div className="absolute bottom-0 flex justify-center py-3 w-full">
                <div className="flex gap-2">
                    {slides.map((_, index) => (
                        <div 
                            key={index} 
                            className={`rounded-full size-[1dvw] md:size-[0.5dvw] bg-white opacity-0 ${currentIndex === index ? 'group-hover:opacity-100' : 'group-hover:opacity-30'} hover:scale-110 hover:opacity-100 duration-200 cursor-pointer`} 
                            onClick={() => { 
                                if (!isTransitioning) {
                                    setIsTransitioning(true);
                                    setCurrentIndex(index);
                                    setTimeout(() => setIsTransitioning(false), 500);
                                }
                            }} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}