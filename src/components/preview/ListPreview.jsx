import { PropertyPreview } from "./PropertyPreview";
import { useRef } from "react";
import { AddProperty } from "./addProperty.jsx";

/**
 * @param {Array} properties - exactly 8 properties 
 */
export function ListPreview({ properties, checkIn = null, checkOut = null, guests = null, addProperty = false, className = '' }) {
    const containerRef = useRef(null)

    //console.log('ListPreview properties:', properties);

    const styles = {

        carousel: "size-[86dvw] rounded-xl sm:size-[45.5dvw] md:size-[21dvw] lg:size-[21.6dvw] xl:size-[200px]",
        header: "sm:text-[2dvw] md:text-[1.4dvw] lg:text-[1.1dvw] xl:text-[14.2px]",
        text: " sm:h-[1rem] md:h-[1rem] lg:h-[1rem] xl:h-[14.2px]"
    }

    return <>
        <div className="py-4">
            <div ref={containerRef} className={`grid sm:grid-cols-2 xl:grid-cols-3 justify-center align-center w-100% snap-y overflow-y-scroll scrollbar-hide gap-5 ${className}`}>
                {properties.map(property => <>
                    <PropertyPreview property={property} key={property._id} styles={styles} checkIn={checkIn} checkOut={checkOut} guests={guests} />
                </>)}
                {addProperty && <AddProperty styles={styles} />}
            </div>
        </div>
    </>
}
