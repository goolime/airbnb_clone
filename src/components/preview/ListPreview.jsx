import { OnHoverFlipIcon } from "../util/onHoverFlipIcon";
import { PropertyPreview } from "./PropertyPreview";
import { TbSquareRoundedArrowRightFilled, TbSquareRoundedArrowLeftFilled, TbSquareRoundedArrowRight, TbSquareRoundedArrowLeft } from "react-icons/tb";
import { useRef, useState } from "react";

/**
 * @param {Array} properties - exactly 8 properties 
 */
export function ListPreview({ properties, checkIn = null, checkOut = null }) {
    const containerRef = useRef(null)

    const styles = {
        
        carousel: "size-[83dvw] sm:size-[42.5dvw] md:size-[18dvw] lg:size-[19dvw] xl:size-[181.25px]",
        header: "sm:text-[1.7dvw] md:text-[1.2dvw] lg:text-[1.1dvw] xl:text-[13.5px]",
        text: "sm:text-[1.6dvw] md:text-[1.2dvw] lg:text-[1dvw] xl:text-[13px]"
    }

    return <>
        <div className="py-4">
            <div ref={containerRef} className={`grid sm:grid-cols-2 xl:grid-cols-3 align-center w-100% snap-y overflow-y-scroll scrollbar-hide gap-5`}>
                {properties.map(property => <>
                    <PropertyPreview property={property} key={property._id} styles={styles} checkIn={checkIn} checkOut={checkOut} />
                </>)}
            </div>
        </div>
    </>
}
