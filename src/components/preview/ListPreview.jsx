import { OnHoverFlipIcon } from "../util/onHoverFlipIcon";
import { PropertyPreview } from "./PropertyPreview";
import { TbSquareRoundedArrowRightFilled, TbSquareRoundedArrowLeftFilled, TbSquareRoundedArrowRight, TbSquareRoundedArrowLeft } from "react-icons/tb";
import { useRef, useState } from "react";

/**
 * @param {Array} properties - exactly 8 properties 
 */
export function ListPreview({ properties, checkIn = null, checkOut = null }) {
    const [scrollY, setScrollY] = useState(0)
    const containerRef = useRef(null)

    function handleScrollTop() {
        containerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }

    function handleScrollBottom() {
        containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' })
    }

    function handleScroll() {
        const scrollDown = containerRef.current.scrollTop
        const scrollHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight
        const scrollPos = scrollDown / scrollHeight
        setScrollY(scrollPos)
    }

    const styles = {
        
        carousel: "size-[87.5dvw] sm:size-[44dvw] md:size-[18dvw] lg:size-[19dvw] xl:size-[181.25px]",
        header: "sm:text-[1.7dvw] md:text-[1.2dvw] lg:text-[1.1dvw] xl:text-[13.5px]",
        text: "sm:text-[1.6dvw] md:text-[1.2dvw] lg:text-[1dvw] xl:text-[13px]"
    }

    return <>
        <div className="py-4">
            <div ref={containerRef} onScroll={handleScroll} className={`grid sm:grid-cols-2 xl:grid-cols-3 align-center w-100% snap-y overflow-y-scroll scrollbar-hide gap-5`}>
                {properties.map(property => <>
                    <PropertyPreview property={property} key={property._id} styles={styles} checkIn={checkIn} checkOut={checkOut} />
                </>)}
            </div>
        </div>
    </>
}
