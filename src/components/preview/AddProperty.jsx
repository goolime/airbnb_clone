import { PropertyPlaceholder } from "./PropertyPlaceholder";
import { Plus } from "../util/Icons.jsx";
import { showPropertyCreation } from "../../services/event-bus.service.js";

export function AddProperty( {styles}) {

    return <>
        <div className="relative add-property-hover" onClick={()=>showPropertyCreation()}>
            <div className="z-10 absolute text-gray-100 top-5/12 sm:top-1/3 xl:top-1/4 left-1/2 bg-gray-400 p-4 rounded-full cursor-pointer -translate-x-1/2 transition-all add-property-icon" >
                <Plus />
            </div>
            <div className="add-property-placeholder opacity-50">
                <PropertyPlaceholder styles={styles} />
            </div>
        </div>
    </>
}