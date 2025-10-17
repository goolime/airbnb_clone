import { useState } from "react";

export function OnHoverFlipIcon({regIcon,onHoverIcon, disabled,onClick, className }){
    const [isHovered,setIsHovered] = useState(false)

    function handleMouseEnter(){
        setIsHovered(true)
    }

    function handleMouseLeave(){
        setIsHovered(false)
    }

    return <>
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={onClick} className={className}>
            { (!disabled && isHovered) ? onHoverIcon : regIcon}
        </div>
    </>
}