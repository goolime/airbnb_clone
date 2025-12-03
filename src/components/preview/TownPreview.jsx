import { OnHoverFlipIcon } from "../util/onHoverFlipIcon";
import { TbSquareRoundedArrowRightFilled, TbSquareRoundedArrowLeftFilled , TbSquareRoundedArrowRight, TbSquareRoundedArrowLeft } from "react-icons/tb";
import { IoChevronBackCircle, IoChevronBackCircleOutline, IoChevronForwardCircle, IoChevronForwardCircleOutline  } from "react-icons/io5";
import { useRef, useState } from "react";
import { PropertyPreview } from "./PropertyPreview";
import { ChevronRight } from "../util/Icons.jsx";
import { useNavigate  } from 'react-router-dom'
import { propertiesService } from "../../services/properties/index.js";

/**
 * @param {Array} properties - exactly 8 properties 
 */
export function TownPreview({city,properties,idx}){
    const [scrollX,setScrollX]=useState(0)
    const containerRef= useRef(null)
    const navigate= useNavigate()

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
        carousel:"size-[40dvw] sm:size-[21.8dvw] md:size-[17.05dvw] lg:size-[14.5dvw] xl:size-[178px]",
        header:"sm:text-[1.7dvw] md:text-[1.2dvw] lg:text-[1dvw] xl:text-[13.5px]",
        text:"sm:text-[1.6dvw] md:text-[1.2dvw] lg:text-[1dvw] xl:text-[13px]"
    }

    return <>
        <div className="w-100vw h-fit py-1 mt-4">
            <div className="flex justify-between">
                <div className="flex flex-row items-center cursor-pointer max-xl:px-5 m-1" onClick={()=>{
                    const filter={...propertiesService.getDefaultFilter(),loc:city}
                    navigate({pathname: '/search', search: `?${propertiesService.getSearchParamsFromFilter(filter).toString()}`});
                }}>
                    <h1 className="text-lg font-semibold  ">{`${getRandomHeader(idx)} ${city.city}`}</h1>
                    <ChevronRight className="text-lg" />
                </div>
                <div className="flex-row hidden sm:flex text-3xl mr-2">
                    <OnHoverFlipIcon onHoverIcon={<IoChevronBackCircle />} regIcon={<IoChevronBackCircleOutline />} onClick={handleScrollLeft} disabled={scrollX === 0.0} className={`text-gray-400 duration-300 ${scrollX === 0 ? 'opacity-20 cursor-not-allowed ' : 'opacity-60 hover:text-gray-500 hover:opacity-100 hover:scale-110'}`} />
                    <OnHoverFlipIcon onHoverIcon={<IoChevronForwardCircle />} regIcon={<IoChevronForwardCircleOutline />} onClick={handleScrollRight} disabled={scrollX === 1.0} className={`text-gray-400 duration-300 ${scrollX === 1 ? 'opacity-20 cursor-not-allowed ' : 'opacity-60 hover:text-gray-500 hover:opacity-100 hover:scale-110'}`} />
                </div>
            </div>
            <div ref={containerRef} onScroll={handleScroll} className={`flex w-100% snap-x overflow-x-scroll mt-3 scrollbar-hide gap-5 max-sm:x-5`}>
                <div className="snap-start"  />
                {properties.map(property=><>
                    <PropertyPreview property={property} key={property._id} styles={styles} />
                </>)}
                <div />
            </div>
        </div>
    </>
}

function getRandomHeader(idx){
    const labels=['Popular homes in','Stay in','Guests also checked out','Homes in']
    const index=  (idx) % labels.length
    return labels[index]
}
