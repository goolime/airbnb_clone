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
        setScrollX(0)
        containerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }

    function handleScrollRight(){
        setScrollX(1)
        containerRef.current.scrollTo({ left: containerRef.current.scrollWidth, behavior: 'smooth' })
    } 

    function handleScroll(){
        const scrollLeft = containerRef.current.scrollLeft
        const scrollWidth = containerRef.current.scrollWidth - containerRef.current.clientWidth
        const scrollPos = scrollLeft / scrollWidth
        setScrollX(scrollPos)
    }

    return <>
        <div className="w-100% h-fit py-1">
            <div className="flex justify-between">
                <h1 className="px-5  text-lg font-semibold">{`${getRandomHeader(idx)} ${name} >`}</h1>
                <div className="flex-row px-5 hidden sm:flex text-3xl">
                    <OnHoverFlipIcon onHoverIcon={<TbSquareRoundedArrowLeftFilled />} regIcon={<TbSquareRoundedArrowLeft />} onClick={handleScrollLeft} disabled={scrollX === 0} className={`text-gray-400 opacity-60 duration-300 ${scrollX === 0 ? '' : 'hover:text-gray-900 hover:opacity-100 hover:scale-110'}`} />
                    <OnHoverFlipIcon onHoverIcon={<TbSquareRoundedArrowRightFilled />} regIcon={<TbSquareRoundedArrowRight/>} onClick={handleScrollRight} disabled={scrollX === 1} className={`text-gray-400 opacity-60 duration-300 ${scrollX === 1 ? '' : 'hover:text-gray-900 hover:opacity-100 hover:scale-110'}`} />
                </div>
            </div>
            <div ref={containerRef} onScroll={handleScroll} className={`flex w-100% overflow-x-scroll scrollbar-hide`}>
                {properties.map(property=><>
                    <PropertyPreview property={property} key={property._id}/>
                </>)}
            </div>
        </div>
    </>
}

function getRandomHeader(idx){
    const labels=['Popular homes in','Stay in','Guests also checked out','Homes in']
    const index= labels.length % (idx+1)
    return labels[index]
}