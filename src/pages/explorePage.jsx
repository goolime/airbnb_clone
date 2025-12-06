import { useEffect, useState } from "react";
import { getTownsPreviews } from "../actions/explore.actions.js";
import { TownPreview } from "../components/preview/TownPreview.jsx";
import { TownPlaceholder } from "../components/preview/TownPlaceholder.jsx";

export function ExplorePage() {

    const [towns, setTowns] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getTownsPreviews().then(townsPreviews => {
            setTowns(townsPreviews);
            setIsLoading(false);
        })
    }, [])

    if (isLoading) return <div className="animate-pulse h-[80vh] overflow-hidden mask-luminance mask-b-from-white mask-b-from-50% mask-b-to-black">
        {[1, 2, 3, 4, 5, 6, 7].map(i => <TownPlaceholder key={i} />)}
    </div>

    return <>
        <div className="py-4">
            {towns.map((town, i) => <TownPreview idx={i} city={town.city} properties={town.properties} key={i} />)}
        </div>
    </>
}