import { OnHoverFlipIcon } from "../util/onHoverFlipIcon";
import { PropertyPreview } from "./property";
import { TbSquareRoundedArrowRightFilled, TbSquareRoundedArrowLeftFilled , TbSquareRoundedArrowRight, TbSquareRoundedArrowLeft } from "react-icons/tb";
import { useRef, useState } from "react";

/**
 * @param {Array} properties - exactly 8 properties 
 */
export function TownPreview({name,properties,idx}){
    const [scrollX,setScrollX]=useState(0)
    const containerRef= useRef(null)

    function handleScrollLeft(){
        containerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }

    function handleScrollRight(){
        containerRef.current.scrollTo({ left: containerRef.current.scrollWidth, behavior: 'smooth' })
    } 

    function handleScroll(){
        const scrollLeft = containerRef.current.scrollLeft
        const scrollWidth = containerRef.current.scrollWidth - containerRef.current.clientWidth
        const scrollPos = scrollLeft / scrollWidth
        setScrollX(scrollPos)
    }

    const styles={
        carousel:"size-[40dvw] sm:size-[22dvw] md:size-[17.5dvw] lg:size-[14.7dvw] xl:size-[181.25px]",
        header:"sm:text-[1.7dvw] md:text-[1.2dvw] xl:text-[13.5px]",
        text:"sm:text-[1.6dvw] md:text-[1.2dvw] lg:text-[1dvw] xl:text-[13px]"
    }

    return <>
        <div className="w-100vw h-fit py-1">
            <div className="flex justify-between">
                <h1 className="text-lg font-semibold max-sm:px-5">{`${getRandomHeader(idx)} ${name} >`}</h1>
                <div className="flex-row hidden sm:flex text-3xl">
                    <OnHoverFlipIcon onHoverIcon={<TbSquareRoundedArrowLeftFilled />} regIcon={<TbSquareRoundedArrowLeft />} onClick={handleScrollLeft} disabled={scrollX === 0.0} className={`text-gray-400 opacity-60 duration-300 ${scrollX === 0 ? '' : 'hover:text-gray-900 hover:opacity-100 hover:scale-110'}`} />
                    <OnHoverFlipIcon onHoverIcon={<TbSquareRoundedArrowRightFilled />} regIcon={<TbSquareRoundedArrowRight/>} onClick={handleScrollRight} disabled={scrollX === 1.0} className={`text-gray-400 opacity-60 duration-300 ${scrollX === 1 ? '' : 'hover:text-gray-900 hover:opacity-100 hover:scale-110'}`} />
                </div>
            </div>
            <div ref={containerRef} onScroll={handleScroll} className={`flex w-100% snap-x overflow-x-scroll scrollbar-hide gap-5 max-sm:x-5`}>
                {properties.map(property=><>
                    <PropertyPreview property={property} key={property._id} styles={styles} />
                </>)}
            </div>
        </div>
    </>
}

function getRandomHeader(idx){
    const labels=['Popular homes in','Stay in','Guests also checked out','Homes in']
    const index=  (idx) % labels.length
    return labels[index]
}