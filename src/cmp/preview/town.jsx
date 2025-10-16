import { PropertyPreview } from "./property";
import { TbSquareRoundedArrowRightFilled, TbSquareRoundedArrowLeftFilled } from "react-icons/tb";

/**
 * @param {Array} properties - exactly 8 properties 
 */
export function TownPreview({name,properties}){

    return <>
        <div className="overflow-hidden">
            <div className="flex justify-between">
                <h1>{name}</h1>
                <div className="flex">
                    <TbSquareRoundedArrowLeftFilled />
                    <TbSquareRoundedArrowRightFilled />
                </div>
            </div>
            <div className="flex">
                {properties.map(property=><>
                    <PropertyPreview property={property} key={property._id} className="basis-/6"/>
                </>)}
            </div>
        </div>
    </>

}