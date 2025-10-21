import { useEffect, useState } from "react";
import { getTownsPreviews } from "../actions/explore.actions.js";
import { TownPreview } from "../components/preview/TownPreview.jsx";

export function ExplorePage() {

    const [towns, setTowns] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        getTownsPreviews().then (townsPreviews=>{
        setTowns(townsPreviews);
        setIsLoading(false);
        })
    }, [])

    if (isLoading) return <div>Loading...</div>;
    return <>
        {towns.map((town,i)=><TownPreview idx={i} city={town.city} properties={town.properties} key={i}/>)}
    </>
}