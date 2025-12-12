import { TbSquareRoundedArrowRightFilled, TbSquareRoundedArrowLeftFilled , TbSquareRoundedArrowRight, TbSquareRoundedArrowLeft } from "react-icons/tb";
import { OnHoverFlipIcon } from "../util/onHoverFlipIcon";
import { PropertyPlaceholder } from "./PropertyPlaceholder";

export function TownPlaceholder() { 

    const styles={
        carousel:"size-[40dvw] sm:size-[21.8dvw] md:size-[17.05dvw] lg:size-[14.5dvw] xl:size-[178px]",
        header:"sm:text-[1.7dvw] md:text-[1.2dvw] lg:text-[1dvw] xl:text-[13.5px]",
        text:"sm:text-[1.6dvw] md:text-[1.2dvw] lg:text-[1dvw] xl:text-[13px]"
    }

    const len=300 + Math.floor(Math.random()*200);

    return <>
        <div className="w-100vw h-fit py-1 mt-4">
            <div className="flex justify-between">
                <div className={`h-[1.5rem] bg-gray-300 rounded-full max-xl:px-5 m-1`} style={{width: `${len}px`}}/>  
                <div className="flex-row hidden gap-1 sm:flex text-3xl mr-2">
                    <div className="size-[1.5rem] bg-gray-300 rounded-full " />
                    <div className="size-[1.5rem] bg-gray-300 rounded-full " />
                </div>
            </div>
            <div className={`flex w-100% overflow-hidden gap-5 mt-3 max-sm:x-5 -translate-x-4`}>
                <div className="snap-start"  />
                { [1,2,3,4,5,6,7,8].map(i=><PropertyPlaceholder styles={styles} key={i} />)
                }
                <div />
            </div>
        </div>
    </>
}