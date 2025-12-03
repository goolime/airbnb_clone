import { OnHoverFlipIcon } from "../util/onHoverFlipIcon";
import { PropertyPreview } from "./PropertyPreview";
import { TbSquareRoundedArrowRightFilled, TbSquareRoundedArrowLeftFilled, TbSquareRoundedArrowRight, TbSquareRoundedArrowLeft } from "react-icons/tb";
import { useRef, useState } from "react";

/**
 * @param {Array} properties - exactly 8 properties 
 */
export function ListPreview({ properties, checkIn = null, checkOut = null, guests = null }) {
    const containerRef = useRef(null)

    const styles = {

        carousel: "size-[86dvw] sm:size-[45.5dvw] md:size-[21dvw] lg:size-[21.6dvw] xl:size-[200px]",
        header: "sm:text-[2dvw] md:text-[1.4dvw] lg:text-[1.1dvw] xl:text-[14.2px]",
        text: " sm:text-[1.93dvw] md:text-[1.4dvw] lg:text-[1.1dvw] xl:text-[14.2px]"
    }

    return <>
        <div className="py-4">
            <div ref={containerRef} className={`grid sm:grid-cols-2 xl:grid-cols-3 justify-center align-center w-100% snap-y overflow-y-scroll scrollbar-hide gap-5`}>
                {properties.map(property => <>
                    <PropertyPreview property={property} key={property._id} styles={styles} checkIn={checkIn} checkOut={checkOut} guests={guests} />
                </>)}
            </div>
        </div>
    </>
}
