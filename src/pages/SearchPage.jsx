import { ListPreview } from "../components/preview/list"
import { property } from "../../templates/property.js"

export function SearchPage(){
    const properties =[property,property,property,property,property,property,property,property,property,property,property,property,property,property,property,property,property,property]

    return <div>
        <ListPreview properties={properties} />
    </div>
}