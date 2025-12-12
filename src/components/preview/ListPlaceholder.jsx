import { PropertyPreview } from "./PropertyPreview";
import { PropertyPlaceholder } from "./PropertyPlaceholder";

/**
 * @param {Array} properties - exactly 8 properties 
 */
export function ListPlaceholder({className=''}) {

    const styles = {
        
        carousel: "size-[83dvw] sm:size-[42.5dvw] md:size-[18dvw] lg:size-[19dvw] xl:size-[181.25px]",
        header: "sm:text-[1.7dvw] md:text-[1.2dvw] lg:text-[1.1dvw] xl:text-[13.5px]",
        text: "sm:h-[1rem] md:h-[1rem] lg:h-[1rem] xl:h-[13px]"
    }

    return <>
        <div className="">
            <div className={`grid sm:grid-cols-2 xl:grid-cols-3 align-center w-100% snap-y overflow-y-scroll scrollbar-hide gap-5 ${className}`}>
                { Array.from({ length: 18 }, ( v, index) => index).map(i=><PropertyPlaceholder styles={styles} key={i} />)}
            </div>
        </div>
    </>
}
